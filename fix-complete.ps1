$ErrorActionPreference = 'Stop'

Write-Host "`n=== CORRECCIÓN COMPLETA DE ENCODING UTF-8 ===" -ForegroundColor Cyan
Write-Host "Procesando index.html...`n" -ForegroundColor Yellow

$file = Join-Path $PSScriptRoot "index.html"

# Leer como bytes y convertir a UTF-8
$bytes = [System.IO.File]::ReadAllBytes($file)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Contador
$totalReplacements = 0

# Función de reemplazo con contador
function Replace-Text {
    param($old, $new, $description)
    
    $count = ([regex]::Matches($script:content, [regex]::Escape($old))).Count
    
    if ($count -gt 0) {
        $script:content = $script:content.Replace($old, $new)
        $script:totalReplacements += $count
        Write-Host "  [$count] $description" -ForegroundColor Green
    }
}

Write-Host "Aplicando correcciones..." -ForegroundColor Cyan

# === VOCALES CON ACENTO ===
Replace-Text 'Ã¡' 'á' 'á (a con acento)'
Replace-Text 'Ã©' 'é' 'é (e con acento)'
Replace-Text 'Ã­' 'í' 'í (i con acento)'
Replace-Text 'Ã³' 'ó' 'ó (o con acento)'
Replace-Text 'Ãº' 'ú' 'ú (u con acento)'

# === VOCALES MAYÚSCULAS CON ACENTO ===
Replace-Text 'Ã' 'Á' 'Á (A mayúscula con acento)'
Replace-Text 'Ã‰' 'É' 'É (E mayúscula con acento)'
Replace-Text 'Ã' 'Í' 'Í (I mayúscula con acento)'
Replace-Text 'Ã"' 'Ó' 'Ó (O mayúscula con acento)'
Replace-Text 'Ãš' 'Ú' 'Ú (U mayúscula con acento)'

# === Ñ ===
Replace-Text 'Ã±' 'ñ' 'ñ (eñe minúscula)'
Replace-Text 'Ã'' 'Ñ' 'Ñ (eñe mayúscula)'

# === PALABRAS COMPLETAS COMUNES ===
Replace-Text 'AutomatizaciÃ³n' 'Automatización' 'Automatización'
Replace-Text 'automatizaciÃ³n' 'automatización' 'automatización'
Replace-Text 'IntegraciÃ³n' 'Integración' 'Integración'
Replace-Text 'integraciÃ³n' 'integración' 'integración'
Replace-Text 'soluciÃ³n' 'solución' 'solución'
Replace-Text 'SoluciÃ³n' 'Solución' 'Solución'
Replace-Text 'InformaciÃ³n' 'Información' 'Información'
Replace-Text 'informaciÃ³n' 'información' 'información'
Replace-Text 'OptimizaciÃ³n' 'Optimización' 'Optimización'
Replace-Text 'optimizaciÃ³n' 'optimización' 'optimización'
Replace-Text 'TransformaciÃ³n' 'Transformación' 'Transformación'
Replace-Text 'transformaciÃ³n' 'transformación' 'transformación'
Replace-Text 'ConfiguraciÃ³n' 'Configuración' 'Configuración'
Replace-Text 'configuraciÃ³n' 'configuración' 'configuración'
Replace-Text 'ValidaciÃ³n' 'Validación' 'Validación'
Replace-Text 'validaciÃ³n' 'validación' 'validación'
Replace-Text 'MigraciÃ³n' 'Migración' 'Migración'
Replace-Text 'migraciÃ³n' 'migración' 'migración'
Replace-Text 'ImplementaciÃ³n' 'Implementación' 'Implementación'
Replace-Text 'implementaciÃ³n' 'implementación' 'implementación'
Replace-Text 'mediciÃ³n' 'medición' 'medición'
Replace-Text 'UbicaciÃ³n' 'Ubicación' 'Ubicación'
Replace-Text 'ubicaciÃ³n' 'ubicación' 'ubicación'
Replace-Text 'conversiÃ³n' 'conversión' 'conversión'
Replace-Text 'ConversiÃ³n' 'Conversión' 'Conversión'

# === PALABRAS CON Í ===
Replace-Text 'AnÃ¡lisis' 'Análisis' 'Análisis'
Replace-Text 'anÃ¡lisis' 'análisis' 'análisis'
Replace-Text 'tecnolÃ³gica' 'tecnológica' 'tecnológica'
Replace-Text 'TecnolÃ³gica' 'Tecnológica' 'Tecnológica'
Replace-Text 'lÃ³gica' 'lógica' 'lógica'
Replace-Text 'LÃ³gica' 'Lógica' 'Lógica'
Replace-Text 'EnergÃ­a' 'Energía' 'Energía'
Replace-Text 'energÃ­a' 'energía' 'energía'
Replace-Text 'consultorÃ­a' 'consultoría' 'consultoría'
Replace-Text 'ConsultorÃ­a' 'Consultoría' 'Consultoría'
Replace-Text 'baterÃ­a' 'batería' 'batería'
Replace-Text 'BaterÃ­a' 'Batería' 'Batería'
Replace-Text 'tecnologÃ­a' 'tecnología' 'tecnología'
Replace-Text 'TecnologÃ­a' 'Tecnología' 'Tecnología'

# === PALABRAS COMUNES ===
Replace-Text 'BÃSICAS' 'BÁSICAS' 'BÁSICAS (mayúscula)'
Replace-Text 'bÃ¡sico' 'básico' 'básico'
Replace-Text 'bÃ¡sica' 'básica' 'básica'
Replace-Text 'BÃ¡sico' 'Básico' 'Básico'
Replace-Text 'BÃ¡sica' 'Básica' 'Básica'
Replace-Text 'mÃ¡s' 'más' 'más'
Replace-Text 'MÃ¡s' 'Más' 'Más'
Replace-Text 'tambiÃ©n' 'también' 'también'
Replace-Text 'TambiÃ©n' 'También' 'También'
Replace-Text 'ademÃ¡s' 'además' 'además'
Replace-Text 'AdemÃ¡s' 'Además' 'Además'
Replace-Text 'despuÃ©s' 'después' 'después'
Replace-Text 'DespuÃ©s' 'Después' 'Después'
Replace-Text 'espaÃ±ol' 'español' 'español'
Replace-Text 'EspaÃ±ol' 'Español' 'Español'
Replace-Text 'aÃ±o' 'año' 'año'
Replace-Text 'AÃ±o' 'Año' 'Año'
Replace-Text 'diseÃ±o' 'diseño' 'diseño'
Replace-Text 'DiseÃ±o' 'Diseño' 'Diseño'
Replace-Text 'pequeÃ±o' 'pequeño' 'pequeño'
Replace-Text 'PequeÃ±o' 'Pequeño' 'Pequeño'

# === VERBOS ===
Replace-Text 'obtÃ©n' 'obtén' 'obtén'
Replace-Text 'tambiÃ©n' 'también' 'también'
Replace-Text 'serÃ¡' 'será' 'será'
Replace-Text 'estarÃ¡' 'estará' 'estará'
Replace-Text 'podrÃ¡' 'podrá' 'podrá'
Replace-Text 'tendrÃ¡' 'tendrá' 'tendrá'

# === PREGUNTAS ===
Replace-Text 'QuÃ©' 'Qué' 'Qué'
Replace-Text 'quÃ©' 'qué' 'qué'
Replace-Text 'CÃ³mo' 'Cómo' 'Cómo'
Replace-Text 'cÃ³mo' 'cómo' 'cómo'
Replace-Text 'DÃ³nde' 'Dónde' 'Dónde'
Replace-Text 'dÃ³nde' 'dónde' 'dónde'
Replace-Text 'CuÃ¡ndo' 'Cuándo' 'Cuándo'
Replace-Text 'cuÃ¡ndo' 'cuándo' 'cuándo'
Replace-Text 'CUÃNDO' 'CUÁNDO' 'CUÁNDO (mayúscula)'
Replace-Text 'CÃ"MO' 'CÓMO' 'CÓMO (mayúscula)'

# === EMOJIS ===
Replace-Text 'âœ…' '✅' 'emoji check'
Replace-Text 'âœ"' '✓' 'check mark'
Replace-Text 'âš ï¸' '⚠️' 'emoji warning'
Replace-Text 'âš ï¿½ï¿½' '⚠️' 'emoji warning (alt)'
Replace-Text 'âš¡' '⚡' 'emoji rayo'
Replace-Text 'ðŸ'¡' '💡' 'emoji bombilla'
Replace-Text 'ðŸ"' '📝' 'emoji lápiz'
Replace-Text 'ðŸš€' '🚀' 'emoji cohete'
Replace-Text 'ðŸ"§' '🔧' 'emoji herramienta'
Replace-Text 'ðŸ'¼' '💼' 'emoji maletín'
Replace-Text 'ðŸ"Š' '📊' 'emoji gráfica'
Replace-Text 'ðŸ'»' '💻' 'emoji laptop'
Replace-Text 'ðŸ"±' '📱' 'emoji móvil'
Replace-Text 'â­' '⭐' 'emoji estrella'
Replace-Text 'ðŸŽ¯' '🎯' 'emoji diana'

# === SÍMBOLOS ESPECIALES ===
Replace-Text 'â€"' '—' 'em dash'
Replace-Text 'â€œ' '"' 'comillas izquierda'
Replace-Text 'â€�' '"' 'comillas derecha'
Replace-Text 'â€™' ''' 'apóstrofe'
Replace-Text 'â€˜' ''' 'comilla simple izquierda'
Replace-Text 'â€¢' '•' 'bullet point'
Replace-Text 'Â°' '°' 'grado'
Replace-Text 'Â©' '©' 'copyright'
Replace-Text 'Â®' '®' 'registered'

# Guardar con UTF-8 sin BOM
Write-Host "`nGuardando archivo..." -ForegroundColor Cyan
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "`n=== ✅ COMPLETADO ===" -ForegroundColor Green
Write-Host "Total de reemplazos: $totalReplacements" -ForegroundColor Yellow
Write-Host "Archivo: index.html corregido exitosamente`n" -ForegroundColor Green
