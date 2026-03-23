param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,
  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

function Convert-InlineText {
  param([string]$Text)
  if ($null -eq $Text) { return '' }
  $escaped = $Text -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;'
  # Inline code
  $escaped = [regex]::Replace($escaped, '`([^`]+)`', '<code>$1</code>')
  # Bold
  $escaped = [regex]::Replace($escaped, '\*\*([^\*]+)\*\*', '<strong>$1</strong>')
  # Italic
  $escaped = [regex]::Replace($escaped, '\*([^\*]+)\*', '<em>$1</em>')
  # Links
  $escaped = [regex]::Replace($escaped, '\[([^\]]+)\]\(([^\)]+)\)', '<a href="$2">$1</a>')
  return $escaped
}

function Is-TableSeparator {
  param([string]$Line)
  if ($null -eq $Line) { return $false }
  $trimmed = $Line.Trim()
  return ($trimmed -match '^\|?[\-\s:|]+\|?$' -and $trimmed -match '-')
}

function Split-TableRow {
  param([string]$Line)
  $row = $Line.Trim()
  if ($row.StartsWith('|')) { $row = $row.Substring(1) }
  if ($row.EndsWith('|')) { $row = $row.Substring(0, $row.Length - 1) }
  $parts = $row.Split('|') | ForEach-Object { $_.Trim() }
  return $parts
}

$lines = Get-Content -Path $InputPath
$html = New-Object System.Collections.Generic.List[string]
$html.Add('<!DOCTYPE html>')
$html.Add('<html><head><meta charset="utf-8"><style>')
$html.Add('body{font-family:Calibri, Arial, sans-serif; font-size:11pt; color:#111;}')
$html.Add('h1{font-size:20pt;} h2{font-size:16pt;} h3{font-size:14pt;} h4{font-size:12pt;}')
$html.Add('table{border-collapse:collapse; width:100%; margin:12px 0;}')
$html.Add('th,td{border:1px solid #999; padding:6px 8px; vertical-align:top;}')
$html.Add('th{background:#f2f2f2;}')
$html.Add('code{font-family:Consolas, monospace; background:#f6f6f6; padding:1px 3px; border-radius:3px;}')
$html.Add('</style></head><body>')

$inList = $false
$listType = ''
$inTable = $false
$tableHeader = @()
$tableRows = @()
$inCodeBlock = $false

for ($i = 0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  $trim = $line.Trim()

  if ($trim.StartsWith('```')) {
    if (-not $inCodeBlock) {
      if ($inList) { $html.Add("</$listType>"); $inList = $false; $listType = '' }
      $html.Add('<pre><code>')
      $inCodeBlock = $true
    } else {
      $html.Add('</code></pre>')
      $inCodeBlock = $false
    }
    continue
  }

  if ($inCodeBlock) {
    $html.Add([System.Web.HttpUtility]::HtmlEncode($line))
    continue
  }

  # Detect table start
  if (-not $inTable -and $trim -match '\|' -and ($i + 1) -lt $lines.Count -and (Is-TableSeparator -Line $lines[$i + 1])) {
    $tableHeader = Split-TableRow -Line $line
    $tableRows = @()
    $inTable = $true
    $i++ # Skip separator line
    continue
  }

  if ($inTable) {
    if ($trim -match '\|') {
      $tableRows += ,(Split-TableRow -Line $line)
      continue
    } else {
      # Close table
      $html.Add('<table>')
      if ($tableHeader.Count -gt 0) {
        $html.Add('<thead><tr>' + (($tableHeader | ForEach-Object { "<th>$(Convert-InlineText $_)</th>" }) -join '') + '</tr></thead>')
      }
      if ($tableRows.Count -gt 0) {
        $html.Add('<tbody>')
        foreach ($row in $tableRows) {
          $cells = $row | ForEach-Object { "<td>$(Convert-InlineText $_)</td>" }
          $html.Add('<tr>' + ($cells -join '') + '</tr>')
        }
        $html.Add('</tbody>')
      }
      $html.Add('</table>')
      $inTable = $false
      $tableHeader = @()
      $tableRows = @()
    }
  }

  if ([string]::IsNullOrWhiteSpace($trim)) {
    if ($inList) { $html.Add("</$listType>"); $inList = $false; $listType = '' }
    continue
  }

  # Headings
  if ($trim -match '^(#+)\s+(.+)$') {
    if ($inList) { $html.Add("</$listType>"); $inList = $false; $listType = '' }
    $level = $matches[1].Length
    if ($level -gt 4) { $level = 4 }
    $content = Convert-InlineText $matches[2]
    $html.Add("<h$level>$content</h$level>")
    continue
  }

  # Ordered list
  if ($trim -match '^\d+\.\s+(.+)$') {
    if (-not $inList -or $listType -ne 'ol') {
      if ($inList) { $html.Add("</$listType>") }
      $html.Add('<ol>')
      $inList = $true
      $listType = 'ol'
    }
    $html.Add("<li>$(Convert-InlineText $matches[1])</li>")
    continue
  }

  # Unordered list
  if ($trim -match '^[-*]\s+(.+)$') {
    if (-not $inList -or $listType -ne 'ul') {
      if ($inList) { $html.Add("</$listType>") }
      $html.Add('<ul>')
      $inList = $true
      $listType = 'ul'
    }
    $html.Add("<li>$(Convert-InlineText $matches[1])</li>")
    continue
  }

  if ($inList) { $html.Add("</$listType>"); $inList = $false; $listType = '' }
  $html.Add("<p>$(Convert-InlineText $trim)</p>")
}

if ($inTable) {
  $html.Add('<table>')
  if ($tableHeader.Count -gt 0) {
    $html.Add('<thead><tr>' + (($tableHeader | ForEach-Object { "<th>$(Convert-InlineText $_)</th>" }) -join '') + '</tr></thead>')
  }
  if ($tableRows.Count -gt 0) {
    $html.Add('<tbody>')
    foreach ($row in $tableRows) {
      $cells = $row | ForEach-Object { "<td>$(Convert-InlineText $_)</td>" }
      $html.Add('<tr>' + ($cells -join '') + '</tr>')
    }
    $html.Add('</tbody>')
  }
  $html.Add('</table>')
}

if ($inList) { $html.Add("</$listType>") }

$html.Add('</body></html>')

$htmlPath = [IO.Path]::ChangeExtension($OutputPath, '.html')
$htmlText = $html -join "`r`n"
Set-Content -Path $htmlPath -Value $htmlText -Encoding UTF8

try {
  $word = New-Object -ComObject Word.Application
} catch {
  Write-Error "Microsoft Word is not available. HTML output saved at $htmlPath."
  exit 1
}

try {
  $word.Visible = $false
  $doc = $word.Documents.Open($htmlPath, $false, $true)
  $wdFormatDocumentDefault = 16
  $doc.SaveAs([ref]$OutputPath, [ref]$wdFormatDocumentDefault)
  $doc.Close()
  $word.Quit()
} finally {
  if ($doc) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null }
  if ($word) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null }
}

Write-Output "Saved DOCX: $OutputPath"
