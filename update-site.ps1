# Script para reemplazar el archivo HTML antiguo con el nuevo
# Ejecutar en PowerShell desde la raíz del proyecto

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Just Dev It - Actualización de Sitio Web" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-Not (Test-Path "index-new.html")) {
    Write-Host "❌ ERROR: No se encuentra index-new.html" -ForegroundColor Red
    Write-Host "   Asegúrate de ejecutar este script desde la raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Archivo index-new.html encontrado" -ForegroundColor Green

# Crear backup del archivo antiguo
if (Test-Path "index.html") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupName = "index.html.backup_$timestamp"
    
    Write-Host ""
    Write-Host "📦 Creando backup del archivo antiguo..." -ForegroundColor Yellow
    Copy-Item "index.html" $backupName
    Write-Host "✓ Backup creado: $backupName" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "ℹ️  No se encontró index.html antiguo (no hay problema)" -ForegroundColor Blue
}

# Reemplazar el archivo
Write-Host ""
Write-Host "🔄 Reemplazando index.html con el nuevo diseño..." -ForegroundColor Yellow
Copy-Item "index-new.html" "index.html" -Force
Write-Host "✓ Archivo reemplazado exitosamente" -ForegroundColor Green

# Verificar estructura de archivos
Write-Host ""
Write-Host "🔍 Verificando estructura de archivos..." -ForegroundColor Yellow

$requiredFiles = @(
    "index.html",
    "css/core/reset.css",
    "css/core/variables.css",
    "css/core/typography.css",
    "css/layouts/grid.css",
    "css/layouts/sections.css",
    "css/components/navigation.css",
    "css/components/cards.css",
    "css/components/forms.css",
    "css/components/footer.css",
    "css/main.css",
    "js/core/utils.js",
    "js/core/app.js",
    "js/components/navigation.js",
    "js/components/animations.js",
    "js/components/hero-3d.js",
    "js/components/form-validator.js"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file" -ForegroundColor Red
        $missingFiles += $file
    }
}

# Resultado final
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan

if ($missingFiles.Count -eq 0) {
    Write-Host "✅ ¡Actualización completada exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "   1. Abre index.html con Live Server o un servidor local" -ForegroundColor White
    Write-Host "   2. Verifica que todo funcione correctamente" -ForegroundColor White
    Write-Host "   3. Configura Google Analytics (opcional)" -ForegroundColor White
    Write-Host "   4. Actualiza el endpoint de Formspree" -ForegroundColor White
    Write-Host "   5. ¡Deploy a producción!" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 Documentación completa en README.md y IMPLEMENTATION_GUIDE.md" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Actualización completada con advertencias" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Archivos faltantes:" -ForegroundColor Red
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Por favor, revisa IMPLEMENTATION_GUIDE.md para crear los archivos faltantes" -ForegroundColor Yellow
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Preguntar si desea abrir con Live Server
$response = Read-Host "¿Deseas abrir el sitio ahora? (s/n)"
if ($response -eq "s" -or $response -eq "S") {
    Write-Host ""
    Write-Host "Iniciando servidor local..." -ForegroundColor Cyan
    
    # Intentar con diferentes métodos
    if (Get-Command http-server -ErrorAction SilentlyContinue) {
        Write-Host "Usando http-server..." -ForegroundColor Green
        http-server -p 5501 -o
    } elseif (Get-Command python -ErrorAction SilentlyContinue) {
        Write-Host "Usando Python HTTP Server..." -ForegroundColor Green
        python -m http.server 8000
    } else {
        Write-Host "⚠️  No se encontró un servidor HTTP instalado" -ForegroundColor Yellow
        Write-Host "   Opciones:" -ForegroundColor White
        Write-Host "   1. Usa Live Server de VS Code" -ForegroundColor White
        Write-Host "   2. Instala http-server: npm install -g http-server" -ForegroundColor White
        Write-Host "   3. Usa Python: python -m http.server 8000" -ForegroundColor White
    }
}
