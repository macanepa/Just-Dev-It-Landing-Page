$file = "index.html"
$content = Get-Content $file -Raw -Encoding UTF8

# Limpiar caracteres corruptos
$content = $content -replace 'BÃSICAS', 'BÁSICAS'
$content = $content -replace 'âš ï¸', '⚠️'
$content = $content -replace 'ðŸ'¡', '💡'  
$content = $content -replace 'CUÃNDO', 'CUÁNDO'
$content = $content -replace 'ðŸ"', '📝'
$content = $content -replace 'CÃ"MO', 'CÓMO'

$Utf8NoBom = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText("$PSScriptRoot\$file", $content, $Utf8NoBom)

Write-Host "Reemplazos completados" -ForegroundColor Green
