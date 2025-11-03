# =============================================================================
# SCRIPT DE CONVERSIÓN DE IMÁGENES PNG/JPG → WebP
# Just Dev It Landing Page - Optimización de Performance
# =============================================================================

Write-Host "🖼️  OPTIMIZACIÓN DE IMÁGENES - Just Dev It" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Ruta base del proyecto
$projectPath = "c:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page"
$imagesPath = Join-Path $projectPath "assets\images"

# Verificar que existe la carpeta
if (!(Test-Path $imagesPath)) {
    Write-Host "❌ Error: No se encontró la carpeta de imágenes" -ForegroundColor Red
    Write-Host "   Ruta buscada: $imagesPath" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Carpeta de imágenes: $imagesPath" -ForegroundColor Green
Write-Host ""

# =============================================================================
# OPCIÓN 1: CONVERSIÓN CON IMAGEMAGICK (Si está instalado)
# =============================================================================

Write-Host "🔍 Verificando ImageMagick..." -ForegroundColor Yellow

if (Get-Command magick -ErrorAction SilentlyContinue) {
    Write-Host "✅ ImageMagick encontrado" -ForegroundColor Green
    Write-Host ""
    
    # Lista de archivos a convertir
    $files = @(
        @{Name="Aquaevo.png"; Quality=90; Priority="ALTA"},
        @{Name="Self.png"; Quality=90; Priority="ALTA"},
        @{Name="Proyecto1.png"; Quality=85; Priority="MEDIA"},
        @{Name="partner1.png"; Quality=85; Priority="BAJA"},
        @{Name="partner2.png"; Quality=85; Priority="BAJA"},
        @{Name="partner4.png"; Quality=85; Priority="BAJA"},
        @{Name="joaquin-espildora.jpg"; Quality=80; Priority="MEDIA"},
        @{Name="matias-canepa.jpg"; Quality=80; Priority="MEDIA"}
    )
    
    Write-Host "🔄 Iniciando conversión de $($files.Count) archivos..." -ForegroundColor Cyan
    Write-Host ""
    
    $totalOriginal = 0
    $totalWebP = 0
    $converted = 0
    
    foreach ($file in $files) {
        $inputPath = Join-Path $imagesPath $file.Name
        $outputPath = $inputPath -replace '\.(png|jpg|jpeg)$', '.webp'
        
        if (!(Test-Path $inputPath)) {
            Write-Host "⚠️  No encontrado: $($file.Name)" -ForegroundColor Yellow
            continue
        }
        
        Write-Host "Converting: $($file.Name) (Calidad: $($file.Quality)%) - Prioridad: $($file.Priority)" -ForegroundColor Cyan
        
        try {
            # Convertir con ImageMagick
            & magick convert $inputPath -quality $file.Quality $outputPath
            
            if (Test-Path $outputPath) {
                $sizeOriginal = (Get-Item $inputPath).Length / 1KB
                $sizeWebP = (Get-Item $outputPath).Length / 1KB
                $savings = [math]::Round(($sizeOriginal - $sizeWebP) / $sizeOriginal * 100, 1)
                
                $totalOriginal += $sizeOriginal
                $totalWebP += $sizeWebP
                $converted++
                
                Write-Host "   ✅ $([math]::Round($sizeOriginal, 1)) KB → $([math]::Round($sizeWebP, 1)) KB (-$savings%)" -ForegroundColor Green
            } else {
                Write-Host "   ❌ Error en conversión" -ForegroundColor Red
            }
        }
        catch {
            Write-Host "   ❌ Error: $_" -ForegroundColor Red
        }
        
        Write-Host ""
    }
    
    Write-Host "=============================================" -ForegroundColor Cyan
    Write-Host "📊 RESUMEN DE CONVERSIÓN" -ForegroundColor Cyan
    Write-Host "=============================================" -ForegroundColor Cyan
    Write-Host "Archivos convertidos: $converted de $($files.Count)" -ForegroundColor Green
    Write-Host "Tamaño original total: $([math]::Round($totalOriginal, 2)) KB" -ForegroundColor Yellow
    Write-Host "Tamaño WebP total: $([math]::Round($totalWebP, 2)) KB" -ForegroundColor Yellow
    Write-Host "Ahorro total: $([math]::Round($totalOriginal - $totalWebP, 2)) KB (-$([math]::Round(($totalOriginal - $totalWebP) / $totalOriginal * 100, 1))%)" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ Conversión completada! Archivos WebP guardados en:" -ForegroundColor Green
    Write-Host "   $imagesPath" -ForegroundColor White
    Write-Host ""
    Write-Host "📝 Próximo paso: Actualizar index.html con etiquetas <picture>" -ForegroundColor Cyan
    
} else {
    Write-Host "❌ ImageMagick no está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "📋 ALTERNATIVAS DE INSTALACIÓN:" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host ""
    Write-Host "OPCIÓN 1 - Chocolatey (Recomendado):" -ForegroundColor Cyan
    Write-Host "   choco install imagemagick" -ForegroundColor White
    Write-Host ""
    Write-Host "OPCIÓN 2 - Descarga Manual:" -ForegroundColor Cyan
    Write-Host "   https://imagemagick.org/script/download.php#windows" -ForegroundColor White
    Write-Host ""
    Write-Host "OPCIÓN 3 - Usar Herramientas Online (Más Rápido):" -ForegroundColor Cyan
    Write-Host "   🌐 Squoosh.app (Google) - https://squoosh.app/" -ForegroundColor White
    Write-Host "      → Arrastra imágenes, ajusta calidad, descarga WebP" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   🌐 Convertio - https://convertio.co/es/png-webp/" -ForegroundColor White
    Write-Host "      → Conversión batch, rápido y fácil" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   🌐 CloudConvert - https://cloudconvert.com/png-to-webp" -ForegroundColor White
    Write-Host "      → 25 conversiones gratis/día" -ForegroundColor Gray
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📂 ARCHIVOS A CONVERTIR (Orden de Prioridad):" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  🔴 ALTA PRIORIDAD (Mayor impacto en LCP):" -ForegroundColor Red
    Write-Host "     1. Aquaevo.png (1,211 KB) → Calidad 90" -ForegroundColor White
    Write-Host "     2. Self.png (380 KB) → Calidad 90" -ForegroundColor White
    Write-Host ""
    Write-Host "  🟡 MEDIA PRIORIDAD:" -ForegroundColor Yellow
    Write-Host "     3. Proyecto1.png (84 KB) → Calidad 85" -ForegroundColor White
    Write-Host "     4. joaquin-espildora.jpg (27 KB) → Calidad 80" -ForegroundColor White
    Write-Host "     5. matias-canepa.jpg (52 KB) → Calidad 80" -ForegroundColor White
    Write-Host ""
    Write-Host "  🟢 BAJA PRIORIDAD (Ya tienen lazy loading):" -ForegroundColor Green
    Write-Host "     6. partner1.png (13 KB) → Calidad 85" -ForegroundColor White
    Write-Host "     7. partner2.png (12 KB) → Calidad 85" -ForegroundColor White
    Write-Host "     8. partner4.png (9 KB) → Calidad 85" -ForegroundColor White
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📚 Guía completa de optimización:" -ForegroundColor Cyan
    Write-Host "   docs\GUIA-OPTIMIZACION-IMAGENES.md" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 CONSEJO: Usa Squoosh.app para conversión rápida sin instalación" -ForegroundColor Green
    Write-Host "   → Soporta arrastrar y soltar" -ForegroundColor Gray
    Write-Host "   → Comparación visual lado a lado" -ForegroundColor Gray
    Write-Host "   → Ajuste manual de calidad" -ForegroundColor Gray
    Write-Host "   → Funciona offline" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🎯 IMPACTO ESPERADO:" -ForegroundColor Magenta
Write-Host "   • Peso de imágenes: 1,791 KB → ~536 KB (-70%)" -ForegroundColor White
Write-Host "   • LCP: 4.2s → 2.7s (-1.5s)" -ForegroundColor White
Write-Host "   • Lighthouse: +8 puntos" -ForegroundColor White
Write-Host ""
