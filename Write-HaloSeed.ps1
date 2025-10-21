# Write-HaloSeed.ps1
# Usage:
#   pwsh -File .\Write-HaloSeed.ps1 -SeedPath .\halo.baby.seed.json
[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$SeedPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RepoRootFromSeed([string]$SeedFilePath) {
  # Example: E:\All\Repos\Halos\halo\halo.baby\halo.baby.seed.json
  $full = (Resolve-Path $SeedFilePath).Path
  $parts = $full -split [regex]::Escape([IO.Path]::DirectorySeparatorChar)
  $idx = [Array]::LastIndexOf($parts, 'Halos')
  if ($idx -lt 0) {
    # Fallback: seed directory
    return (Split-Path -Parent $full)
  }
  if ($idx -eq 0) {
    # Halos at root (unlikely), repo root becomes the drive root
    $drive = (Get-Item $full).PSDrive.Root
    return $drive
  }
  # Repo root is the directory one level above the 'Halos' folder
  $repoParts = $parts[0..($idx-1)]
  $repoRoot = [IO.Path]::Combine($repoParts)
  return $repoRoot
}

function Assert-Env {
  # PowerShell version check
  $psv = $PSVersionTable.PSVersion
  if (-not $psv) { Write-Warning "Unable to detect PowerShell version." }
  elseif ($psv.Major -lt 7) {
    Write-Warning "PowerShell $($psv) detected. PowerShell 7+ is recommended."
  }

  # Node version check
  try { $nodeVer = & node -v 2>$null } catch { $nodeVer = $null }
  if (-not $nodeVer) {
    Write-Warning "Node.js not found on PATH. Install Node 20+ to run validators."
    return
  }
  if ($nodeVer -match '^v(\d+)\.(\d+)\.(\d+)$') {
    $major = [int]$Matches[1]
    if ($major -lt 20) { Write-Warning "Node $nodeVer detected. Node 20+ is recommended." }
  } else {
    Write-Warning "Unexpected Node version format: $nodeVer"
  }
}

if (-not (Test-Path $SeedPath)) {
  throw "Seed file not found: $SeedPath"
}

Assert-Env

$seedFull = (Resolve-Path $SeedPath).Path
$seedJson = Get-Content -Raw -Path $seedFull | ConvertFrom-Json -Depth 200
if (-not $seedJson.bundled_files) {
  throw "No bundled_files found in seed."
}

$repoRoot = Get-RepoRootFromSeed -SeedFilePath $seedFull
$seedDir  = Split-Path -Parent $seedFull

$written = 0
foreach ($bundle in $seedJson.bundled_files) {
  # Write under repo root if path starts with Halos/..., else relative to seed folder
  if ($bundle.path -match '^(?i)Halos[\\/].*') {
    $outPath = Join-Path $repoRoot ($bundle.path -replace '/', [IO.Path]::DirectorySeparatorChar)
  } else {
    $outPath = Join-Path $seedDir ($bundle.path -replace '/', [IO.Path]::DirectorySeparatorChar)
  }

  $dir = Split-Path -Parent $outPath
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

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
    default { throw "Unknown kind '$($bundle.kind)' for path '$outPath'." }
  }
  Write-Host "[OK] $($bundle.kind.ToUpper()) → $outPath"
  $written++
}

Write-Host "[OK] Materialized $written files."

Write-Host "`nTo install and validate (from anywhere):"
Write-Host "  npm --prefix Halos/halo/halo.baby/gates install"
Write-Host "  npm --prefix Halos/halo/halo.baby/gates run next:validate:file -- --file Halos/halo/halo.baby/gates/samples/whatsnext.sample.json"
