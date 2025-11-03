$ErrorActionPreference = 'Stop'

$file = "index.html"
$bytes = [System.IO.File]::ReadAllBytes($file)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Reemplazos seguros
$replacements = @(
    @('BÃSICAS', 'BÁSICAS'),
    @('CUÃNDO', 'CUÁNDO'),
    @('CÃ"MO', 'CÓMO')
)

foreach ($pair in $replacements) {
    $old = $pair[0]
    $new = $pair[1]
    if ($content.Contains($old)) {
        $content = $content.Replace($old, $new)
        Write-Host "Reemplazado: $old -> $new" -ForegroundColor Yellow
    }
}

# Guardar
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "`n✅ Proceso completado!" -ForegroundColor Green
