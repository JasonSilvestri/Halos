# check-markdown-fences.ps1
# Scans Markdown for risky/mismatched code fences and appends warnings to a gate result JSON.

param(
  [string]$ScanRoot = "InCareSys.SelfHealth.Shared/wwwroot/docs",
  [string]$EmitWarningsPath # path to a gate result JSON to mutate (append warnings[])
)

$ErrorActionPreference = "Stop"

function Add-Warn([string]$msg) {
  if (-not $EmitWarningsPath) { Write-Output $msg; return }
  try {
    $gate = Get-Content -Raw -Path $EmitWarningsPath | ConvertFrom-Json
  } catch {
    Write-Warning "Failed to read result JSON at $EmitWarningsPath: $($_.Exception.Message)"
    return
  }
  if (-not $gate.warnings) { $gate | Add-Member -NotePropertyName warnings -NotePropertyValue @() -Force }
  $gate.warnings += $msg
  ($gate | ConvertTo-Json -Depth 12) | Out-File -FilePath $EmitWarningsPath -Encoding UTF8
}

$files = Get-ChildItem -Path $ScanRoot -Recurse -Include *.md -File -ErrorAction SilentlyContinue
foreach ($f in $files) {
  $text = Get-Content -Raw -Encoding UTF8 -Path $f.FullName

  # Track fences by length to detect mismatches/nesting.
  $rx = [regex] '(```+)'
  $stack = New-Object System.Collections.Stack

  foreach ($m in $rx.Matches($text)) {
    $fence = $m.Groups[1].Value
    $len = $fence.Length
    if ($stack.Count -eq 0) {
      $stack.Push($len)
    } else {
      $top = $stack.Peek()
      if ($len -eq $top) {
        $null = $stack.Pop()
      } elseif ($len -lt $top) {
        Add-Warn ("codeFence.mismatch: {0} closing {1} ticks while open was {2} at offset {3}" -f $f.FullName, $len, $top, $m.Index)
        $null = $stack.Pop()
      } else {
        Add-Warn ("codeFence.nested: {0} nested fence {1} inside {2} at offset {3}; consider outer 4-backtick wrapper" -f $f.FullName, $len, $top, $m.Index)
        $stack.Push($len)
      }
    }
  }

  if ($stack.Count -gt 0) {
    $opens = $stack -join ","
    Add-Warn ("codeFence.unclosed: {0} has {1} unclosed fence(s) [{2}]" -f $f.FullName, $stack.Count, $opens)
  }

  # Heuristic for renderer style confusion: multiple ```json blocks in same doc.
  if ($text -match '```json' -and ($text -split '```json').Count -gt 2) {
    Add-Warn ("ui.genericStylesRisk: {0} has multiple JSON fences; wrap larger excerpts with an outer 4-backtick fence" -f $f.FullName)
  }
}
