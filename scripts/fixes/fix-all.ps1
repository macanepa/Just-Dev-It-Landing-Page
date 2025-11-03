$ErrorActionPreference = 'Stop'

Write-Host "Corrigiendo caracteres en index.html..." -ForegroundColor Cyan

$file = Join-Path $PSScriptRoot "index.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Contador de reemplazos
$count = 0

# Función helper
function Replace-If-Exists {
    param($old, $new)
    if ($script:content.Contains($old)) {
        $script:content = $script:content.Replace($old, $new)
        $script:count++
        Write-Host "  $old -> $new" -ForegroundColor Yellow
        return $true
    }
    return $false
}

# Realizar reemplazos
Replace-If-Exists 'BÃSICAS' 'BÁSICAS'
Replace-If-Exists 'mediciÃ³n' 'medición'
Replace-If-Exists 'obtÃ©n' 'obtén'
Replace-If-Exists 'UbicaciÃ³n' 'Ubicación'
Replace-If-Exists 'conversiÃ³n' 'conversión'
Replace-If-Exists 'bÃ¡sico' 'básico'
Replace-If-Exists 'CUÃNDO' 'CUÁNDO'
Replace-If-Exists 'CÃ"MO' 'CÓMO'
Replace-If-Exists 'AutomatizaciÃ³n' 'Automatización'
Replace-If-Exists 'EnergÃ­a' 'Energía'
Replace-If-Exists 'automatizaciÃ³n' 'automatización'
Replace-If-Exists 'transformaciÃ³n' 'transformación'
Replace-If-Exists 'consultorÃ­a' 'consultoría'
Replace-If-Exists 'tecnolÃ³gica' 'tecnológica'

# Emojis (usando códigos hex si fallan los caracteres directos)
$emojiReplacements = @{
    'âœ…' = '✅'
    'âš ï¸' = '⚠️'
    ([char]0xF0 + [char]0x9F + [char]0x92 + [char]0xA1) = '💡'
    ([char]0xF0 + [char]0x9F + [char]0x93 + [char]0x9D) = '📝'
}

foreach ($pair in $emojiReplacements.GetEnumerator()) {
    Replace-If-Exists $pair.Key $pair.Value | Out-Null
}

# Guardar
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "`n✅ Completado: $count reemplazos realizados" -ForegroundColor Green
