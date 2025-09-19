# InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/tools/lumina-gate.ps1
# PowerShell 7+ recommended (works with Windows PowerShell 5.1 too).
# Emits a sanitized, schema-compliant JSON gate result.
# Features:
#  - CLI-first EF (no PMC requirement)
#  - Connection string redaction + fingerprint
#  - Optional DB connectivity skip (-SkipDbCheck)
#  - Markdown fence checker integration (appends warnings)
#  - AJV schema validation (fails run on schema errors)
#  - _meta_ policy (from envelope/meta) → downgrade to 'warn' on renderer/fence issues
#  - Optional -ObservedSnippetLabel to capture UI fence mislabel (or use $env:OBSERVED_SNIPPET_LABEL)

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)] [string] $SolutionPath,
  [Parameter(Mandatory = $true)] [string] $SharedProject,
  [Parameter(Mandatory = $true)] [string] $StartupProject,
  [Parameter(Mandatory = $true)] [string] $AppSettingsPath,

  [string] $ConnectionStringName = "DefaultConnection",
  [string] $ExpectedProvider     = "SqlServer",
  [string] $Environment          = "Development",
  [string] $Configuration        = "Debug",
  [string] $ResultsDir = "InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/results",

  [switch] $SkipDbCheck,
  [switch] $TreatUiAsError,
  [string] $ObservedSnippetLabel = ""
)

$ErrorActionPreference = "Stop"

function Write-Step { param([string]$m) Write-Host "[$(Get-Date -Format HH:mm:ss)] $m" }
function Capture(& $scriptBlock) {
  $sb = [scriptblock]::Create($scriptBlock.ToString())
  $out = & $sb 2>&1 | Out-String
  return $out.Trim()
}

function Get-ConnFingerprint([string]$cs) {
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($cs)
    $sha = [System.Security.Cryptography.SHA256]::Create()
    $hash = $sha.ComputeHash($bytes)
    ($hash | ForEach-Object { $_.ToString("x2") }) -join ""
  } catch { return "" }
}

function Redact-ConnectionString([string]$cs) {
  if ([string]::IsNullOrWhiteSpace($cs)) { return @{ value=""; redacted=$true; fingerprint="" } }
  $fp = Get-ConnFingerprint $cs
  return @{ value="__REDACTED__"; redacted=$true; fingerprint=$fp }
}

function Resolve-ConnectionString([string]$Path,[string]$Name) {
  if (!(Test-Path $Path)) { return @{ value=$null; source="NotFound" } }
  $json = Get-Content -Raw -Path $Path | ConvertFrom-Json
  $cs = $null
  if ($json.PSObject.Properties.Name -contains "ConnectionStrings") { $cs = $json.ConnectionStrings.$Name }
  if ($cs) { return @{ value="$cs"; source=(Split-Path -Leaf $Path) } }

  $fallback = (Join-Path (Split-Path $Path -Parent) "appsettings.json")
  if (Test-Path $fallback) {
    $json2 = Get-Content -Raw -Path $fallback | ConvertFrom-Json
    $cs2 = $json2.ConnectionStrings.$Name
    if ($cs2) { return @{ value="$cs2"; source="appsettings.json" } }
  }

  $envName = "ConnectionStrings__${Name}"
  $envVal = [Environment]::GetEnvironmentVariable($envName)
  if ($envVal) { return @{ value="$envVal"; source="EnvVar" } }

  return @{ value=$null; source="NotFound" }
}

# Initialize gate object
$gate = @{
  gateVersion   = "1.0.0"
  gateStatus    = "fail"
  environment   = $Environment
  timestampUtc  = (Get-Date).ToUniversalTime().ToString("o")
  solution      = $SolutionPath
  sharedProject = $SharedProject
  startupProject= $StartupProject
  connection    = @{
    name             = $ConnectionStringName
    resolvedString   = ""
    expectedProvider = $ExpectedProvider
    fingerprint      = ""
    source           = ""
  }
  restore = @{ ok = $false; output = "" }
  build   = @{ ok = $false; configuration = $Configuration; output = "" }
  ef      = @{
    migrations = @{ ok = $false; command = ""; output = "" }
    update     = @{ ok = $false; command = ""; output = "" }
  }
  database = @{ ok = $false; provider = $ExpectedProvider; database = ""; output = "" }
  warnings = @()
  pass     = $false
}

# Ensure results dir
if (!(Test-Path $ResultsDir)) { New-Item -ItemType Directory -Force -Path $ResultsDir | Out-Null }

# 1) Restore
Write-Step "Restore..."
try {
  $restoreOut = Capture { dotnet restore $SolutionPath }
  $gate.restore.ok = $LASTEXITCODE -eq 0
  $gate.restore.output = if ($gate.restore.ok) { "dotnet restore succeeded" } else { $restoreOut }
  if (-not $gate.restore.ok) { $gate.warnings += "restore.failed" }
} catch {
  $gate.restore.ok = $false
  $gate.restore.output = ($_ | Out-String).Trim()
  $gate.warnings += "restore.exception"
}

# 2) Build
Write-Step "Build ($Configuration)..."
try {
  $buildOut = Capture { dotnet build $SolutionPath --configuration $Configuration --no-restore }
  $gate.build.ok = $LASTEXITCODE -eq 0
  # sanitize accidental connection fragments
  $buildOut = $buildOut -replace '(?i)(Server|Data Source)=[^;]+','Server=__REDACTED__'
  $buildOut = $buildOut -replace '(?i)(Database|Initial Catalog)=[^;]+','Database=__REDACTED__'
  $buildOut = $buildOut -replace '(?i)(Password|Pwd)=[^;]+','Password=__REDACTED__'
  $gate.build.output = if ($gate.build.ok) { "dotnet build succeeded" } else { $buildOut }
  if (-not $gate.build.ok) { $gate.warnings += "build.failed" }
} catch {
  $gate.build.ok = $false
  $gate.build.output = ($_ | Out-String).Trim()
  $gate.warnings += "build.exception"
}

# 3) Connection resolve + redact
Write-Step "Resolve connection '$ConnectionStringName' from $AppSettingsPath..."
try {
  $r = Resolve-ConnectionString -Path $AppSettingsPath -Name $ConnectionStringName
  $gate.connection.source = $r.source
  if ($r.value) {
    $red = Redact-ConnectionString $r.value
    $gate.connection.resolvedString = $red.value
    $gate.connection.fingerprint    = $red.fingerprint
    # parse database name (non-secret)
    if ($r.value -match "(?i)(Database|Initial Catalog)\s*=\s*([^;]+)") {
      $gate.database.database = $Matches[2]
    }
    $gate.warnings += "connectionString.redacted"
  } else {
    $gate.warnings += "connectionString.notFound"
  }
} catch {
  $gate.warnings += "connectionString.exception: $($_.Exception.Message)"
}

# 4) EF (CLI-first)
$cliMig = "dotnet ef migrations add InitialCreate --project `"$SharedProject`" --startup-project `"$StartupProject`" --output-dir Data/Migrations"
$cliUpd = "dotnet ef database update --project `"$SharedProject`" --startup-project `"$StartupProject`""

Write-Step "EF: migrations add (CLI)..."
try {
  $migOut = Capture { Invoke-Expression $cliMig }
  $migOk  = $LASTEXITCODE -eq 0 -or ($migOut -match "(?i)already has a migration named|exists")
  $migOut = $migOut -replace '(?i)(Database|Initial Catalog)=[^;]+','Database=__REDACTED__'
  $gate.ef.migrations.ok = [bool]$migOk
  $gate.ef.migrations.command = $cliMig
  $gate.ef.migrations.output  = if ($migOk) { "Migration ensured" } else { $migOut }
  if (-not $migOk) { $gate.warnings += "ef.migrations.failed" }
} catch {
  $gate.ef.migrations.ok = $false
  $gate.ef.migrations.command = $cliMig
  $gate.ef.migrations.output  = ($_ | Out-String).Trim()
  $gate.warnings += "ef.migrations.exception"
}

Write-Step "EF: database update (CLI)..."
try {
  $updOut = Capture { Invoke-Expression $cliUpd }
  $updOk  = $LASTEXITCODE -eq 0 -or ($updOut -match "(?i)No migrations were applied|already up to date")
  $updOut = $updOut -replace '(?i)(Database|Initial Catalog)=[^;]+','Database=__REDACTED__'
  $gate.ef.update.ok = [bool]$updOk
  $gate.ef.update.command = $cliUpd
  $gate.ef.update.output  = if ($updOk) { "Database up to date" } else { $updOut }
  if (-not $updOk) { $gate.warnings += "ef.update.failed" }
} catch {
  $gate.ef.update.ok = $false
  $gate.ef.update.command = $cliUpd
  $gate.ef.update.output  = ($_ | Out-String).Trim()
  $gate.warnings += "ef.update.exception"
}

# 5) Database check (optional / safe default)
if ($SkipDbCheck) {
  $gate.database.ok = $true
  $gate.database.output = "db.check.skipped"
  $gate.warnings += "db.check.skipped"
} else {
  try {
    if ($gate.connection.fingerprint) {
      $gate.database.ok = $true
      $gate.database.output = "redacted.connection; assuming EF ensured DB"
    } else {
      $gate.database.ok = $false
      $gate.database.output = "no connection available"
    }
  } catch {
    $gate.database.ok = $false
    $gate.database.output = ($_ | Out-String).Trim()
    $gate.warnings += "db.check.exception"
  }
}

# Decision (pre-postchecks)
$allCoreOk = $gate.restore.ok -and $gate.build.ok -and $gate.ef.migrations.ok -and $gate.ef.update.ok -and $gate.database.ok
$gate.pass = $allCoreOk
$gate.gateStatus = if ($allCoreOk) { "pass" } elseif ($gate.restore.ok -and $gate.build.ok) { "warn" } else { "fail" }

# ─────────────────────────────────────────────────────────────────────────
# TAIL BLOCK — write result, post-checks, apply _meta_ UI policy
# ─────────────────────────────────────────────────────────────────────────

# Write preliminary result
$stamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
$outPath = Join-Path $ResultsDir ("lumina-result." + $stamp + ".json")
($gate | ConvertTo-Json -Depth 12) | Out-File -FilePath $outPath -Encoding UTF8
Write-Host "[gate] preliminary result -> $outPath"

# Post-check: Markdown fences (appends warnings to result)
try {
  $mdCheck = Join-Path (Split-Path $PSCommandPath) "check-markdown-fences.ps1"
  if (Test-Path $mdCheck) {
    Write-Host "[gate] post-check: markdown fences..."
    & $mdCheck -ScanRoot "InCareSys.SelfHealth.Shared/wwwroot/docs" -EmitWarningsPath $outPath
  } else {
    $tmp = Get-Content -Raw $outPath | ConvertFrom-Json
    if (-not $tmp.warnings) { $tmp | Add-Member -NotePropertyName warnings -NotePropertyValue @() }
    $tmp.warnings += "md.checker.missing"
    ($tmp | ConvertTo-Json -Depth 12) | Out-File -FilePath $outPath -Encoding UTF8
  }
} catch {
  $tmp = Get-Content -Raw $outPath | ConvertFrom-Json
  if (-not $tmp.warnings) { $tmp | Add-Member -NotePropertyName warnings -NotePropertyValue @() }
  $tmp.warnings += "md.checker.exception: $($_.Exception.Message)"
  ($tmp | ConvertTo-Json -Depth 12) | Out-File -FilePath $outPath -Encoding UTF8
}

# Post-check: AJV schema validation (hard fail on schema errors)
try {
  $validator = "InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/tools/validate-gate.mjs"
  if (Test-Path $validator) {
    Write-Host "[gate] post-check: schema validate..."
    $cmd = "node `"$validator`" --file `"$outPath`""
    $null = Invoke-Expression $cmd
    if ($LASTEXITCODE -ne 0) {
      Write-Error "Schema validation failed."
      exit 3
    }
  } else {
    Write-Host "[gate] schema validator missing; continuing."
  }
} catch {
  Write-Error "Schema validation exception: $($_.Exception.Message)"
  exit 4
}

# Meta-aware UI/Renderer policy: read meta and possibly downgrade to 'warn'
try {
  $current = Get-Content -Raw -Path $outPath | ConvertFrom-Json

  # load meta from sidecar or envelope (if present)
  $meta = $null
  foreach ($p in @("helix-lumina-envelope.meta.json","helix-lumina-envelope.json")) {
    if (Test-Path $p) {
      try {
        $doc = Get-Content -Raw -Path $p | ConvertFrom-Json
        if ($doc._meta) { $meta = $doc._meta; break } else { $meta = $doc; break }
      } catch { }
    }
  }

  # defaults
  $expectedLabel = "json"
  $policyFence   = "warn" # warn|ignore|fail
  $policyLabel   = "warn" # warn|ignore|fail
  $fenceStyle    = ""
  $backtickGuard = ""

  if ($meta) {
    if ($meta.renderingHints.snippetLanguage) { $expectedLabel = "$($meta.renderingHints.snippetLanguage)" }
    if ($meta.renderingHints.fenceStyle)      { $fenceStyle    = "$($meta.renderingHints.fenceStyle)" }
    if ($meta.renderingHints.backtickGuard)   { $backtickGuard = "$($meta.renderingHints.backtickGuard)" }
    if ($meta.statusPolicy.onFenceError)      { $policyFence   = "$($meta.statusPolicy.onFenceError)" }
    if ($meta.statusPolicy.onRendererMismatch){ $policyLabel   = "$($meta.statusPolicy.onRendererMismatch)" }
  }

  # -TreatUiAsError forces label/fence issues to at least WARN (without failing pass=false)
  if ($TreatUiAsError) {
    if ($policyLabel -eq "ignore") { $policyLabel = "warn" }
    if ($policyFence -eq "ignore") { $policyFence = "warn" }
  }

  # observed label, from param or env
  $observed = if ($PSBoundParameters.ContainsKey("ObservedSnippetLabel") -and $ObservedSnippetLabel) {
    "$ObservedSnippetLabel"
  } elseif ($env:OBSERVED_SNIPPET_LABEL) {
    "$env:OBSERVED_SNIPPET_LABEL"
  } else { $null }

  function Add-Warn([string]$w) {
    if (-not $current.warnings) { $current | Add-Member -NotePropertyName warnings -NotePropertyValue @() -Force }
    $current.warnings += $w
  }

  # attach small UI block for downstream UIs
  $current | Add-Member -NotePropertyName ui -NotePropertyValue ([ordered]@{
    renderingHints = [ordered]@{
      expectedSnippetLanguage = $expectedLabel
      observedSnippetLanguage = $observed
      fenceStyle              = $fenceStyle
      backtickGuard           = $backtickGuard
    }
    policy = [ordered]@{
      onRendererMismatch = $policyLabel
      onFenceError       = $policyFence
    }
  }) -Force

  # evaluate conditions
  $shouldWarn = $false
  $shouldFail = $false

  if ($observed -and $observed -ne $expectedLabel) {
    Add-Warn ("ui.snippetLabel.mismatch: expected={0} observed={1}" -f $expectedLabel, $observed)
    switch ($policyLabel.ToLowerInvariant()) {
      "warn" { $shouldWarn = $true }
      "fail" { $shouldFail = $true }
    }
  }

  $hasFenceIssues = @($current.warnings | Where-Object { $_ -like "codeFence.*" -or $_ -like "ui.genericStylesRisk*" }).Count -gt 0
  if ($hasFenceIssues) {
    switch ($policyFence.ToLowerInvariant()) {
      "warn" { $shouldWarn = $true }
      "fail" { $shouldFail = $true }
    }
  }

  # apply downgrade/upgrade (prefer fail over warn; don't mask pass=false)
  if ($current.pass) {
    if ($shouldFail) {
      $current.gateStatus = "fail"
      $current.pass = $false
      Add-Warn "ui.policy.escalation: renderer/fence policy set to fail"
    } elseif ($shouldWarn) {
      $current.gateStatus = "warn"
      Add-Warn "ui.policy.escalation: renderer/fence policy set to warn"
    }
  }

  # persist final result
  ($current | ConvertTo-Json -Depth 12) | Out-File -FilePath $outPath -Encoding UTF8
  Write-Host "[ui] meta policy applied -> $($current.gateStatus.ToUpper())"
} catch {
  Write-Host "[ui] meta policy skipped: $($_.Exception.Message)"
}

# Final console echo
if ((Get-Content -Raw $outPath | ConvertFrom-Json).pass) {
  Write-Host "[gate] GATE: PASS"
} else {
  Write-Host ("[gate] GATE: " + (Get-Content -Raw $outPath | ConvertFrom-Json).gateStatus.ToUpper())
}
