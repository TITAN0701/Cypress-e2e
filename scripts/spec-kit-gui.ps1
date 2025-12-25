$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot
try {
    $localBin = Join-Path $env:USERPROFILE ".local\\bin"
    $specify = Get-Command specify -ErrorAction SilentlyContinue
    if ($null -eq $specify -and (Test-Path (Join-Path $localBin "specify.exe"))) {
        $env:Path = "$localBin;$env:Path"
        $specify = Get-Command specify -ErrorAction SilentlyContinue
    }
    if ($null -eq $specify) {
        Write-Host "specify not found. Add $localBin to PATH or install Spec-Kit CLI."
    } else {
        specify check
    }

    if (-not (Test-Path ".specify")) {
        Write-Host ".specify not found. Run: specify init --here --ai codex --script ps --force"
    }

    Write-Host "Note: /speckit.* are agent commands. Run them in the AI chat when needed."

    & "$PSScriptRoot\\dev.ps1"
} finally {
    Pop-Location
}
