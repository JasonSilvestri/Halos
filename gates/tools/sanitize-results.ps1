# InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/tools/sanitize-results.ps1
param(
  [string]$ResultsDir = "InCareSys.SelfHealth.Shared/wwwroot/docs/Architecture/Gates/results"
)

$files = Get-ChildItem -Path $ResultsDir -Filter "*.json" -File -ErrorAction SilentlyContinue
foreach ($f in $files) {
  try {
    $obj = Get-Content -Raw -Path $f.FullName | ConvertFrom-Json
    if ($obj.connection -and $obj.connection.resolvedString -and $obj.connection.resolvedString -ne "__REDACTED__") {
      $fp = (Get-FileHash -InputStream ([IO.MemoryStream]::new([Text.Encoding]::UTF8.GetBytes($obj.connection.resolvedString))) -Algorithm SHA256).Hash.ToLower()
      $obj.connection.resolvedString = "__REDACTED__"
      $obj.connection | Add-Member -NotePropertyName fingerprint -NotePropertyValue $fp -Force
      if (-not $obj.warnings) { $obj | Add-Member -NotePropertyName warnings -NotePropertyValue @() }
      $obj.warnings += "connectionString.redacted: fingerprint=$fp"
      ($obj | ConvertTo-Json -Depth 10) | Out-File -FilePath $f.FullName -Encoding UTF8
      Write-Host "Sanitized: $($f.Name)"
    }
  } catch {
    Write-Warning "Failed to sanitize $($f.FullName): $($_.Exception.Message)"
  }
}
