# Write-HaloSeed.ps1 — deterministic materializer (repo-root aware, 'gates/' beside seed)
# Usage:
#   pwsh -File .\Write-HaloSeed.ps1 -SeedPath .\halo.baby.seed.json

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$SeedPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RepoRootFromSeed([string]$SeedFilePath) {
  $full = (Resolve-Path $SeedFilePath).Path
  $cur  = Split-Path -Parent $full
  while ($true) {
    $name = Split-Path -Leaf $cur
    if ($name -eq 'Halos') {
      $parent = Split-Path -Parent $cur
      if (-not $parent) { $parent = (Get-Item $cur).PSDrive.Root }
      return $parent
    }
    $up = Split-Path -Parent $cur
    if (-not $up -or $up -eq $cur) {
      return (Split-Path -Parent $full) # fallback
    }
    $cur = $up
  }
}

function Assert-Env {
  $psv = $PSVersionTable.PSVersion
  if ($psv -and $psv.Major -lt 7) { Write-Warning "PowerShell $($psv) detected. PowerShell 7+ is recommended." }
  try { $nodeVer = & node -v 2>$null } catch { $nodeVer = $null }
  if (-not $nodeVer) { Write-Warning "Node.js not found. Install Node 20+ to run validators."; return }
  if ($nodeVer -match '^v(\d+)\.(\d+)\.(\d+)$') {
    if ([int]$Matches[1] -lt 20) { Write-Warning "Node $nodeVer detected. Node 20+ is recommended." }
  }
}

if (-not (Test-Path $SeedPath)) { throw "Seed file not found: $SeedPath" }
Assert-Env

$seedFull = (Resolve-Path $SeedPath).Path
$seedDir  = Split-Path -Parent $seedFull
$seedJson = Get-Content -Raw -Path $seedFull | ConvertFrom-Json -Depth ([Math]::Min(100, 100))
if (-not $seedJson.bundled_files) { throw "No bundled_files found in seed." }

$repoRoot = Get-RepoRootFromSeed -SeedFilePath $seedFull

Write-Host "[INFO] Seed      : $seedFull"
Write-Host "[INFO] Seed Dir  : $seedDir"
Write-Host "[INFO] Repo Root : $repoRoot"
Write-Host ""

$written = 0
foreach ($bundle in $seedJson.bundled_files) {
  $bundlePath = $bundle.path -replace '/', [IO.Path]::DirectorySeparatorChar

  if ($bundle.path -match '^(?i)Halos[\\/].*') {
    $outPath = Join-Path $repoRoot $bundlePath
    Write-Host "[TRACE] mode=repo-root  in='$($bundle.path)'  out='$outPath'"
  } elseif ($bundle.path -match '^(?i)gates[\\/].*') {
    $outPath = Join-Path $seedDir $bundlePath
    Write-Host "[TRACE] mode=seed-local in='$($bundle.path)'  out='$outPath'"
  } else {
    $outPath = Join-Path $seedDir $bundlePath
    Write-Host "[TRACE] mode=default    in='$($bundle.path)'  out='$outPath'"
  }

  $dir = Split-Path -Parent $outPath
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  switch ($bundle.kind) {
    "json" {
      $json = $bundle.json | ConvertTo-Json -Depth 100
      $utf8 = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($outPath, $json, $utf8)
    }
    "text" {
      $utf8 = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($outPath, $bundle.text, $utf8)
    }
    default {
      throw "Unknown kind '$($bundle.kind)' for path '$($bundle.path)'."
    }
  }

  Write-Host "[OK] $($bundle.kind.ToUpper()) → $outPath"
  $written++
}

Write-Host ""
Write-Host "[OK] Materialized $written files."
Write-Host ""
Write-Host "To install and validate (from halo.baby):"
Write-Host "  cd .\gates"
Write-Host "  npm install"
Write-Host "  npm run seed:validate:all"
Write-Host "  npm run onboard:validate"
