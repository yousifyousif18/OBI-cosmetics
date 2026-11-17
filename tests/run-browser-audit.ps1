param(
    [int[]]$Widths = @(390, 1440),
    [switch]$DisableSandbox
)
$ErrorActionPreference = 'Stop'
$workspacePath = Split-Path $PSScriptRoot -Parent
$outputPath = Join-Path $workspacePath '.review'
New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
$browserPath = @(
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
) | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (!$browserPath) { throw 'Install Chrome or Edge to run the browser audit.' }
$auditURL = [System.Uri]::new((Join-Path $PSScriptRoot 'browser-audit.html')).AbsoluteUri
$failed = $false
foreach ($width in $Widths) {
    $browserArgs = @('--headless=new', '--disable-gpu', '--disable-software-rasterizer', '--no-first-run', '--allow-file-access-from-files', "--user-data-dir=$(Join-Path $outputPath 'browser-profile')", '--virtual-time-budget=30000', '--dump-dom', "$auditURL`?width=$width")
    if ($DisableSandbox) { $browserArgs = @('--no-sandbox') + $browserArgs }
    $previousErrorPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    $dom = & $browserPath @browserArgs 2>$null | Out-String
    $ErrorActionPreference = $previousErrorPreference
    $match = [regex]::Match($dom, '(?s)<pre id="report">(.*?)</pre>')
    if (!$match.Success) { throw "Browser did not return a report at width $width." }
    $json = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
    $report = $json | ConvertFrom-Json
    if (!$report.total) { throw "Browser audit did not finish at width $width." }
    [System.IO.File]::WriteAllText((Join-Path $outputPath "audit-$width.json"), $json)
    Write-Output "$width px: $($report.total) checks, $($report.failures.Count) failures"
    if ($report.failures.Count) {
        $report.failures | ConvertTo-Json -Depth 8 | Write-Output
        $failed = $true
    }
}
if ($failed) { exit 1 }
