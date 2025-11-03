# SCRIPT DE OPTIMIZACIÓN BALANCEADA
# Solo optimiza lo que realmente impacta performance

$sourcePath = "assets\images"
$outputPath = "assets\images\optimized"

# Crear carpeta de salida
New-Item -ItemType Directory -Force -Path $outputPath | Out-Null

Write-Host "`n🎯 OPTIMIZACIÓN BALANCEADA - MÁXIMO IMPACTO, MÍNIMO ESFUERZO`n" -ForegroundColor Cyan

# ===== PARTE 1: HERO BACKGROUNDS (CRÍTICO - Versiones Mobile + Desktop) =====
Write-Host "📱 Paso 1/3: Hero Backgrounds (mobile + desktop)..." -ForegroundColor Yellow

$heroImages = @("Recurso3.webp", "Recurso7.webp", "Recurso10.webp")
$heroCount = 0

foreach ($img in $heroImages) {
    if (Test-Path "$sourcePath\$img") {
        $name = [System.IO.Path]::GetFileNameWithoutExtension($img)
        
        # Desktop version (1920x1080)
        magick "$sourcePath\$img" -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 "$outputPath\$name-desktop.webp"
        
        # Mobile version (800x450) 
        magick "$sourcePath\$img" -resize 800x450^ -gravity center -extent 800x450 -quality 80 "$outputPath\$name-mobile.webp"
        
        $heroCount += 2
        Write-Host "  ✅ $name (desktop + mobile)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  $img no encontrado" -ForegroundColor Red
    }
}

# ===== PARTE 2: SLIDER CARDS (Solo Desktop Optimizado) =====
Write-Host "`n💳 Paso 2/3: Slider Cards (solo desktop 800x600)..." -ForegroundColor Yellow

$sliderCards = @(
    # Servicios
    "Recurso 4.webp", "Recurso 5.webp", "Recurso 6.webp",
    # Proyectos
    "Proyecto1.webp", "Proyecto3.webp", "Proyecto4.webp", "Proyecto5.webp", 
    "Proyecto6.webp", "Proyecto7.webp",
    "Recurso 1.webp", "Recurso 2.webp", "Recurso 8.webp", "Recurso 9.webp"
)

$cardsCount = 0
foreach ($img in $sliderCards) {
    if (Test-Path "$sourcePath\$img") {
        $name = [System.IO.Path]::GetFileNameWithoutExtension($img)
        
        # Solo desktop (mobile las escala automáticamente)
        magick "$sourcePath\$img" -resize 800x600^ -gravity center -extent 800x600 -quality 82 "$outputPath\$name-card.webp"
        
        $cardsCount++
        Write-Host "  ✅ $name" -ForegroundColor Green
    }
}

# ===== PARTE 3: CRÍTICOS (Imágenes demasiado pesadas) =====
Write-Host "`n⚠️  Paso 3/3: Optimizar imágenes críticas sobrepeso..." -ForegroundColor Yellow

$criticalImages = @(
    @{File="Recurso3 (1).webp"; Size="600x450"; Quality=80; Type="grid"},
    @{File="Aquaevo.webp"; Size="600x450"; Quality=80; Type="grid"},
    @{File="Recurso 5.webp"; Size="800x600"; Quality=82; Type="card"}
)

$criticalCount = 0
foreach ($img in $criticalImages) {
    if (Test-Path "$sourcePath\$($img.File)") {
        $name = [System.IO.Path]::GetFileNameWithoutExtension($img.File)
        $dimensions = $img.Size.Split('x')
        $width = $dimensions[0]
        $height = $dimensions[1]
        
        magick "$sourcePath\$($img.File)" -resize "$($img.Size)^" -gravity center -extent $img.Size -quality $img.Quality "$outputPath\$name-$($img.Type).webp"
        
        $criticalCount++
        Write-Host "  ✅ $name ($($img.Size))" -ForegroundColor Green
    }
}

# ===== REPORTE FINAL =====
Write-Host "`n📊 REPORTE DE OPTIMIZACIÓN:" -ForegroundColor Cyan

$originalSize = 0
$optimizedSize = 0

if (Test-Path $sourcePath) {
    $originalSize = (Get-ChildItem -Path $sourcePath -Filter "*.webp" -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1KB
}

if (Test-Path $outputPath) {
    $optimizedSize = (Get-ChildItem -Path $outputPath -Filter "*.webp" -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1KB
}

$totalFiles = $heroCount + $cardsCount + $criticalCount

Write-Host "  📁 Archivos procesados: $totalFiles" -ForegroundColor White
Write-Host "  📦 Hero backgrounds: $heroCount (mobile + desktop)" -ForegroundColor White
Write-Host "  💳 Slider cards: $cardsCount (solo desktop)" -ForegroundColor White
Write-Host "  ⚠️  Críticos: $criticalCount" -ForegroundColor White

if ($originalSize -gt 0 -and $optimizedSize -gt 0) {
    $savings = (($originalSize - $optimizedSize) / $originalSize) * 100
    Write-Host "`n  Original:   $([math]::Round($originalSize, 0)) KB" -ForegroundColor Red
    Write-Host "  Optimizado: $([math]::Round($optimizedSize, 0)) KB" -ForegroundColor Green
    Write-Host "  Ahorro:     $([math]::Round($savings, 1))% (-$([math]::Round($originalSize - $optimizedSize, 0)) KB)" -ForegroundColor Cyan
}

Write-Host "`n✅ OPTIMIZACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "📁 Archivos en: $outputPath`n" -ForegroundColor White

Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "  1. Revisa las imágenes en: $outputPath" -ForegroundColor White
Write-Host "  2. Reemplaza los archivos originales (haz backup primero)" -ForegroundColor White
Write-Host "  3. Actualiza index.html con <picture> tags para hero backgrounds" -ForegroundColor White
Write-Host "  4. Deploy y test PageSpeed`n" -ForegroundColor White
