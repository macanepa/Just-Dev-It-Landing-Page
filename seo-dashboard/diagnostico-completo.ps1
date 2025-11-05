# ============================================
# 🔍 DIAGNÓSTICO COMPLETO DE DATOS SEO
# ============================================
# Este script verifica todas las fuentes de datos del dashboard

Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔍 DIAGNÓSTICO DE FUENTES DE DATOS - SEO DASHBOARD" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"

$baseDir = "c:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\seo-dashboard"
cd $baseDir

# Función para mostrar estado
function Show-Status {
    param(
        [string]$Message,
        [string]$Status,
        [string]$Details = ""
    )
    
    $icon = switch ($Status) {
        "success" { "✅" }
        "error" { "❌" }
        "warning" { "⚠️" }
        "info" { "ℹ️" }
        default { "•" }
    }
    
    $color = switch ($Status) {
        "success" { "Green" }
        "error" { "Red" }
        "warning" { "Yellow" }
        "info" { "Cyan" }
        default { "White" }
    }
    
    Write-Host "$icon " -ForegroundColor $color -NoNewline
    Write-Host $Message -ForegroundColor White
    if ($Details) {
        Write-Host "   $Details" -ForegroundColor Gray
    }
}

# ============================================
# 1. VERIFICAR ARCHIVOS JSON LOCALES
# ============================================
Write-Host "`n📁 ARCHIVOS JSON LOCALES (Datos Actuales)" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor DarkGray

$keywordsFile = "keywords-database.json"
if (Test-Path $keywordsFile) {
    $keywords = Get-Content $keywordsFile -Raw | ConvertFrom-Json
    $keywordCount = $keywords.keywords.Count
    $fileSize = (Get-Item $keywordsFile).Length / 1KB
    Show-Status "keywords-database.json" "success" "$keywordCount keywords | $([math]::Round($fileSize, 2)) KB"
    
    # Mostrar primeras 3 keywords
    Write-Host "`n   Primeras 3 keywords:" -ForegroundColor Gray
    $keywords.keywords[0..2] | ForEach-Object {
        Write-Host "   • $($_.keyword) - Pos: $($_.position) | Clicks: $($_.clicks) | CTR: $($_.ctr)%" -ForegroundColor DarkGray
    }
} else {
    Show-Status "keywords-database.json" "error" "Archivo NO encontrado"
}

Write-Host ""

$improvementsFile = "data/improvements.json"
if (Test-Path $improvementsFile) {
    $improvements = Get-Content $improvementsFile -Raw | ConvertFrom-Json
    $impCount = $improvements.improvements.Count
    Show-Status "data/improvements.json" "success" "$impCount mejoras automáticas"
} else {
    Show-Status "data/improvements.json" "warning" "Archivo NO encontrado - ejecuta generar-mejoras-automaticas.py"
}

# ============================================
# 2. VERIFICAR CONFIGURACIÓN DE APIS
# ============================================
Write-Host "`n`n🔧 CONFIGURACIÓN DE APIs DE GOOGLE" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor DarkGray

$configFile = "config/config.json"
if (Test-Path $configFile) {
    Show-Status "config.json" "success" "Archivo de configuración encontrado"
    
    $config = Get-Content $configFile -Raw | ConvertFrom-Json
    
    # Verificar Search Console
    if ($config.propertyUrl) {
        Show-Status "Property URL" "success" "$($config.propertyUrl)"
    } else {
        Show-Status "Property URL" "error" "No configurado"
    }
    
    # Verificar Service Account
    if ($config.serviceAccountJson.client_email) {
        Show-Status "Service Account" "success" "$($config.serviceAccountJson.client_email)"
    } else {
        Show-Status "Service Account" "error" "No configurado"
    }
    
} else {
    Show-Status "config.json" "error" "Archivo NO encontrado"
    Write-Host "`n   Para crear la configuración, ejecuta:" -ForegroundColor Gray
    Write-Host "   python scripts/crear-config.py" -ForegroundColor Cyan
}

# ============================================
# 3. VERIFICAR SCRIPTS DISPONIBLES
# ============================================
Write-Host "`n`n🐍 SCRIPTS DE ACTUALIZACIÓN DISPONIBLES" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor DarkGray

$scripts = @(
    @{Name="actualizar-datos-manual.py"; Desc="Actualización manual desde Search Console"},
    @{Name="actualizar-datos-auto.py"; Desc="Actualización automática programada"},
    @{Name="generar-mejoras-automaticas.py"; Desc="Generar sugerencias de mejoras"},
    @{Name="diagnostico-conexion.py"; Desc="Probar conexión con APIs"}
)

foreach ($script in $scripts) {
    $path = "scripts/$($script.Name)"
    if (Test-Path $path) {
        Show-Status $script.Name "success" $script.Desc
    } else {
        Show-Status $script.Name "error" "Script NO encontrado"
    }
}

# ============================================
# 4. VERIFICAR CONEXIÓN A APIS (Simulado)
# ============================================
Write-Host "`n`n🌐 ESTADO DE APIs DE GOOGLE" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor DarkGray

# Verificar si Python está instalado
try {
    $pythonVersion = python --version 2>&1
    Show-Status "Python" "success" "$pythonVersion"
} catch {
    Show-Status "Python" "error" "Python NO instalado"
}

# Verificar bibliotecas necesarias
Write-Host "`n   Verificando bibliotecas Python..." -ForegroundColor Gray
$libraries = @("google-auth", "google-api-python-client", "oauth2client")
foreach ($lib in $libraries) {
    $installed = pip show $lib 2>&1 | Select-String "Name:"
    if ($installed) {
        Show-Status $lib "success" "Instalado"
    } else {
        Show-Status $lib "error" "NO instalado"
    }
}

# ============================================
# 5. ANÁLISIS DE DATOS ACTUALES
# ============================================
Write-Host "`n`n📊 ANÁLISIS DE DATOS CARGADOS" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor DarkGray

if (Test-Path $keywordsFile) {
    $keywords = Get-Content $keywordsFile -Raw | ConvertFrom-Json
    
    # Estadísticas
    $totalKeywords = $keywords.keywords.Count
    $withClicks = ($keywords.keywords | Where-Object { $_.clicks -gt 0 }).Count
    $topPositions = ($keywords.keywords | Where-Object { $_.position -le 10 }).Count
    $avgPosition = ($keywords.keywords | Measure-Object -Property position -Average).Average
    $totalClicks = ($keywords.keywords | Measure-Object -Property clicks -Sum).Sum
    $totalImpressions = ($keywords.keywords | Measure-Object -Property impressions -Sum).Sum
    
    Write-Host "`n   Resumen de Keywords:" -ForegroundColor Gray
    Write-Host "   • Total keywords: $totalKeywords" -ForegroundColor White
    Write-Host "   • Con clicks: $withClicks" -ForegroundColor White
    Write-Host "   • En Top 10: $topPositions" -ForegroundColor White
    Write-Host "   • Posición promedio: $([math]::Round($avgPosition, 2))" -ForegroundColor White
    Write-Host "   • Total clicks: $totalClicks" -ForegroundColor White
    Write-Host "   • Total impresiones: $totalImpressions" -ForegroundColor White
    
    # Fecha de última modificación
    $lastModified = (Get-Item $keywordsFile).LastWriteTime
    $daysSince = [math]::Round(((Get-Date) - $lastModified).TotalDays)
    
    Write-Host "`n   Última actualización:" -ForegroundColor Gray
    Write-Host "   • Fecha: $($lastModified.ToString('yyyy-MM-dd HH:mm:ss'))" -ForegroundColor White
    Write-Host "   • Hace: $daysSince días" -ForegroundColor $(if ($daysSince -gt 7) { "Yellow" } else { "Green" })
    
    if ($daysSince -gt 7) {
        Write-Host "`n   ⚠️  Los datos tienen más de 7 días. Considera actualizarlos." -ForegroundColor Yellow
    }
}

# ============================================
# 6. VERIFICAR SERVIDOR HTTP
# ============================================
Write-Host "`n`n🌍 SERVIDOR WEB LOCAL" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor DarkGray

$ports = @(8001, 8000, 5000, 3000)
$serverRunning = $false
foreach ($port in $ports) {
    $connection = Test-NetConnection -ComputerName localhost -Port $port -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($connection.TcpTestSucceeded) {
        Show-Status "Puerto $port" "success" "Servidor corriendo en http://localhost:$port"
        $serverRunning = $true
    }
}

if (-not $serverRunning) {
    Show-Status "Servidor HTTP" "warning" "No hay servidor corriendo"
    Write-Host "`n   Para iniciar el servidor:" -ForegroundColor Gray
    Write-Host "   python -m http.server 8001" -ForegroundColor Cyan
}

# ============================================
# 7. RESUMEN Y RECOMENDACIONES
# ============================================
Write-Host "`n`n" -NoNewline
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📋 RESUMEN Y RECOMENDACIONES" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Write-Host "`n🔍 CONCLUSIÓN:" -ForegroundColor Yellow
if (Test-Path $keywordsFile) {
    Write-Host "   El dashboard está usando DATOS ESTÁTICOS desde keywords-database.json" -ForegroundColor White
    Write-Host "   NO hay conexión en tiempo real a las APIs de Google." -ForegroundColor Yellow
} else {
    Write-Host "   ❌ El dashboard NO tiene datos. Genera datos mock o conecta con APIs." -ForegroundColor Red
}

Write-Host "`n💡 PARA OBTENER DATOS REALES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Opción 1: Actualizar datos manualmente (Recomendado)" -ForegroundColor Green
Write-Host "   ────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   1. Configura las credenciales de Google:" -ForegroundColor White
Write-Host "      python scripts/crear-config.py" -ForegroundColor Cyan
Write-Host ""
Write-Host "   2. Extrae datos de Search Console:" -ForegroundColor White
Write-Host "      python scripts/actualizar-datos-manual.py" -ForegroundColor Cyan
Write-Host ""
Write-Host "   3. Genera mejoras automáticas:" -ForegroundColor White
Write-Host "      python scripts/generar-mejoras-automaticas.py" -ForegroundColor Cyan
Write-Host ""
Write-Host "   4. Recarga el dashboard en el navegador" -ForegroundColor White

Write-Host "`n   Opción 2: Actualización automática programada" -ForegroundColor Green
Write-Host "   ────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   Configura tarea automática cada lunes:" -ForegroundColor White
Write-Host "   .\scripts\configurar-tarea-lunes.ps1" -ForegroundColor Cyan

Write-Host "`n   Opción 3: API Backend en tiempo real (Avanzado)" -ForegroundColor Green
Write-Host "   ────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   Inicia servidor API que consulta Google en tiempo real:" -ForegroundColor White
Write-Host "   python api-server-enterprise.py" -ForegroundColor Cyan
Write-Host "   Luego modifica el dashboard para usar http://localhost:5000/api/*" -ForegroundColor Gray

Write-Host "`n`n🔗 ENLACES ÚTILES:" -ForegroundColor Yellow
Write-Host "   • Google Search Console: https://search.google.com/search-console" -ForegroundColor Cyan
Write-Host "   • Google Cloud Console: https://console.cloud.google.com" -ForegroundColor Cyan
Write-Host "   • PageSpeed Insights: https://pagespeed.web.dev" -ForegroundColor Cyan
Write-Host "   • Dashboard local: http://localhost:8001" -ForegroundColor Cyan
Write-Host "   • Test de APIs: http://localhost:8001/test-api-connections.html" -ForegroundColor Cyan

Write-Host "`n`n"
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Diagnóstico completado - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n"
