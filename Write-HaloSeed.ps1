# Write-HaloSeed.ps1
# Usage:
#   pwsh -NoProfile -ExecutionPolicy Bypass -File .\Write-HaloSeed.ps1 -SeedPath .\halo.baby.seed.json
[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$SeedPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Assert-Env {
  # PowerShell version check
  $psv = $PSVersionTable.PSVersion
  if (-not $psv) {
    Write-Error "Unable to detect PowerShell version."
  }
  $isPwsh7OrHigher = ($psv.Major -ge 7)
  if (-not $isPwsh7OrHigher) {
    Write-Warning "PowerShell $($psv) detected. PowerShell 7+ is recommended."
    Write-Warning "You can still materialize files, but use Node to run validators."
  }

  # Node version check
  try {
    $nodeVer = & node -v 2>$null
  } catch {
    $nodeVer = $null
  }
  if (-not $nodeVer) {
    Write-Warning "Node.js not found on PATH. Install Node 20+ to run validators."
    return
  }

  # Parse Node vX.Y.Z
  if ($nodeVer -match '^v(\d+)\.(\d+)\.(\d+)$') {
    $major = [int]$Matches[1]
    if ($major -lt 20) {
      Write-Warning "Node $nodeVer detected. Node 20+ is recommended."
    }
  } else {
    Write-Warning "Unexpected Node version format: $nodeVer"
  }
}

if (-not (Test-Path $SeedPath)) {
  throw "Seed file not found: $SeedPath"
}

Assert-Env

$raw = Get-Content -Raw -Path $SeedPath
$seed = $raw | ConvertFrom-Json -Depth 200

if (-not $seed.bundled_files) {
  throw "No bundled_files found in seed."
}

foreach ($bundle in $seed.bundled_files) {
  $outPath = $bundle.path
  $dir = Split-Path -Parent $outPath
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  switch ($bundle.kind) {
    "json" {
      $json = $bundle.json | ConvertTo-Json -Depth 100
      $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($outPath, $json, $utf8NoBom)
    }
    "text" {
      $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($outPath, $bundle.text, $utf8NoBom)
    }
    default {
      throw "Unknown kind '$($bundle.kind)' for path '$outPath'."
    }
  }
}

Write-Host "[OK] Materialized $(($seed.bundled_files | Measure-Object).Count) files to 'Halos/halo.baby/gates/'."

# Show next commands but don't run them (safety-first)
Write-Host "`nTo install and validate (Node 20+):"
Write-Host "  npm --prefix Halos/halo.baby/gates install"
Write-Host "  npm --prefix Halos/halo.baby/gates run next:validate:file -- --file Halos/halo.baby/gates/samples/whatsnext.sample.json"