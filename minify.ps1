# Script de Minificación para Just Dev It
# Este script minifica todos los archivos CSS y JS del proyecto

Write-Host "🔧 Iniciando proceso de minificación..." -ForegroundColor Cyan

# Verificar si existe package.json
if (-Not (Test-Path "package.json")) {
    Write-Host "📦 Creando package.json..." -ForegroundColor Yellow
    
    $packageJson = @{
        name = "just-dev-it-landing"
        version = "1.0.0"
        description = "Just Dev It - Landing Page Optimizada"
        scripts = @{
            minify = "npm run minify-css && npm run minify-js"
            "minify-css" = "cleancss -o css/bundle.min.css css/core/*.css css/layouts/*.css css/components/*.css css/utils/*.css css/main.css"
            "minify-js" = "terser js/epic-preloader.js js/hero-background.js js/logo-3d-animation.js js/app-standalone.js -o js/bundle.min.js --compress --mangle"
        }
        devDependencies = @{
            "clean-css-cli" = "^5.6.3"
            terser = "^5.26.0"
        }
    } | ConvertTo-Json -Depth 10

    $packageJson | Out-File -FilePath "package.json" -Encoding UTF8
}

# Instalar dependencias
Write-Host "📥 Instalando dependencias de minificación..." -ForegroundColor Yellow
npm install --save-dev clean-css-cli terser

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
    
    # Minificar CSS
    Write-Host "🎨 Minificando archivos CSS..." -ForegroundColor Cyan
    npm run minify-css
    
    # Minificar JS
    Write-Host "⚡ Minificando archivos JavaScript..." -ForegroundColor Cyan
    npm run minify-js
    
    # Verificar tamaños
    Write-Host "`n📊 Resumen de optimización:" -ForegroundColor Magenta
    
    if (Test-Path "css/bundle.min.css") {
        $cssSize = (Get-Item "css/bundle.min.css").Length / 1KB
        Write-Host "CSS minificado: $([Math]::Round($cssSize, 2)) KB" -ForegroundColor Green
    }
    
    if (Test-Path "js/bundle.min.js") {
        $jsSize = (Get-Item "js/bundle.min.js").Length / 1KB
        Write-Host "JS minificado: $([Math]::Round($jsSize, 2)) KB" -ForegroundColor Green
    }
    
    Write-Host "`n✨ Minificación completada exitosamente!" -ForegroundColor Green
    Write-Host "`n📝 Próximo paso: Actualizar index-new.html para usar bundle.min.css y bundle.min.js" -ForegroundColor Yellow
} else {
    Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
    exit 1
}
