# Script para corregir caracteres UTF-8 corruptos

# Cargar el archivo con encoding UTF8
$content = Get-Content -Path "index.html" -Raw -Encoding UTF8

# Reemplazos de caracteres corruptos
$replacements = @{
    'BÃSICAS' = 'BÁSICAS'
    'mediciÃ³n' = 'medición'
    'obtÃ©n' = 'obtén'
    'UbicaciÃ³n' = 'Ubicación'
    'conversiÃ³n' = 'conversión'
    'âœ…' = '✅'
    'âš ï¸' = '⚠️'
    'bÃ¡sico' = 'básico'
    'ðŸ'¡' = '💡'
    'CUÃNDO' = 'CUÁNDO'
    'ðŸ"' = '📝'
    'CÃ"MO' = 'CÓMO'
    'AutomatizaciÃ³n' = 'Automatización'
    'EnergÃ­a' = 'Energía'
    'automatizaciÃ³n' = 'automatización'
    'transformaciÃ³n' = 'transformación'
    'consultorÃ­a' = 'consultoría'
    'tecnolÃ³gica' = 'tecnológica'
}

# Aplicar todos los reemplazos
foreach ($key in $replacements.Keys) {
    $content = $content -replace [regex]::Escape($key), $replacements[$key]
}

# Guardar con UTF-8 (sin BOM)
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText("$PWD\index.html", $content, $Utf8NoBomEncoding)

Write-Host "✅ Caracteres corregidos en index.html" -ForegroundColor Green
