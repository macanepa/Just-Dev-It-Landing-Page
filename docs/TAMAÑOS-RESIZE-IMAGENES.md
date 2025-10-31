# 📐 Guía de Tamaños Óptimos para Resize de Imágenes

**Fecha:** 31 de octubre de 2025  
**Objetivo:** Optimizar dimensiones y peso de todas las imágenes del sitio

---

## 🎯 Resumen Ejecutivo

| Categoría                | Cantidad | Peso Actual | Peso Objetivo | Ahorro Estimado |
| ------------------------ | -------- | ----------- | ------------- | --------------- |
| Hero Backgrounds         | 3        | 107KB       | 60KB          | ~44%            |
| Slider Cards (Servicios) | 6        | 315KB       | 180KB         | ~43%            |
| Slider Cards (Proyectos) | 10       | 433KB       | 250KB         | ~42%            |
| Team Photos              | 2        | 53KB        | 30KB          | ~43%            |
| Partners Logos           | 4        | 22KB        | 15KB          | ~32%            |
| Portfolio Extra          | 14       | 737KB       | 420KB         | ~43%            |
| **TOTAL**                | **39**   | **~1.7MB**  | **~955KB**    | **~44%**        |

---

## 📊 Categoría 1: Hero Backgrounds (Slider Principal)

**Uso:** Fondos fullscreen del slider de servicios  
**Viewport:** 1920x1080 desktop, 390x844 mobile  
**Lazy:** ✅ `loading="lazy"`

### Imágenes a Redimensionar:

| Archivo Original | Tamaño Actual | Dimensiones Actuales | **Dimensiones Objetivo**                        | Calidad WebP |
| ---------------- | ------------- | -------------------- | ----------------------------------------------- | ------------ |
| `Recurso3.webp`  | 52.7 KB       | ❌ Desconocido       | **1920x1080** (Desktop)<br>**800x450** (Mobile) | 85%          |
| `Recurso7.webp`  | 27.6 KB       | ❌ Desconocido       | **1920x1080** (Desktop)<br>**800x450** (Mobile) | 85%          |
| `Recurso10.webp` | 26.5 KB       | ❌ Desconocido       | **1920x1080** (Desktop)<br>**800x450** (Mobile) | 85%          |

**Estrategia Responsive:**

```html
<!-- Implementar srcset responsive -->
<img
  srcset="
    assets/images/Recurso3-mobile.webp   800w,
    assets/images/Recurso3-desktop.webp 1920w
  "
  sizes="(max-width: 768px) 800px, 1920px"
  src="assets/images/Recurso3-desktop.webp"
  alt="..."
  width="1920"
  height="1080"
/>
```

**Comando Resize (ejemplo con ImageMagick):**

```powershell
# Desktop version (1920x1080)
magick Recurso3.webp -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 Recurso3-desktop.webp

# Mobile version (800x450)
magick Recurso3.webp -resize 800x450^ -gravity center -extent 800x450 -quality 80 Recurso3-mobile.webp
```

---

## 📊 Categoría 2: Slider Cards - Servicios (6 imágenes)

**Uso:** Cards de servicios en el slider  
**Viewport Desktop:** 800x600 → optimizar a **800x600**  
**Viewport Mobile:** 400x300 → optimizar a **500x375**  
**Lazy:** ✅ `loading="lazy"`

### Imágenes a Redimensionar:

| Archivo Original            | Tamaño Actual | **Dimensiones Objetivo**                      | Calidad WebP |
| --------------------------- | ------------- | --------------------------------------------- | ------------ |
| `Recurso3.webp` (repetido)  | 52.7 KB       | **800x600** (Desktop)<br>**500x375** (Mobile) | 82%          |
| `Recurso7.webp` (repetido)  | 27.6 KB       | **800x600** (Desktop)<br>**500x375** (Mobile) | 82%          |
| `Recurso10.webp` (repetido) | 26.5 KB       | **800x600** (Desktop)<br>**500x375** (Mobile) | 82%          |
| `Recurso 4.webp`            | 47.9 KB       | **800x600** (Desktop)<br>**500x375** (Mobile) | 82%          |
| `Recurso 5.webp`            | 197.9 KB ⚠️   | **800x600** (Desktop)<br>**500x375** (Mobile) | 82%          |
| `Recurso 6.webp`            | 34.6 KB       | **800x600** (Desktop)<br>**500x375** (Mobile) | 82%          |

**⚠️ CRÍTICO:** `Recurso 5.webp` está usando **197KB** para una imagen de 800x600, es casi 4x más pesado de lo necesario.

**Comando Resize:**

```powershell
# Desktop version (800x600)
magick "Recurso 5.webp" -resize 800x600^ -gravity center -extent 800x600 -quality 82 "Recurso 5-card.webp"

# Mobile version (500x375)
magick "Recurso 5.webp" -resize 500x375^ -gravity center -extent 500x375 -quality 80 "Recurso 5-card-mobile.webp"
```

---

## 📊 Categoría 3: Slider Cards - Proyectos (10 imágenes)

**Uso:** Cards de proyectos en portfolio slider  
**Dimensiones:** 800x600 (igual que servicios)

### Imágenes a Redimensionar:

| Archivo Original | Tamaño Actual | **Dimensiones Objetivo**          | Calidad WebP |
| ---------------- | ------------- | --------------------------------- | ------------ |
| `Proyecto1.webp` | 16.2 KB ✅    | **800x600** (validar dimensiones) | 82%          |
| `Proyecto3.webp` | 47.5 KB       | **800x600**                       | 82%          |
| `Proyecto4.webp` | 66.1 KB       | **800x600**                       | 82%          |
| `Proyecto5.webp` | 31.4 KB       | **800x600**                       | 82%          |
| `Proyecto6.webp` | 37.4 KB       | **800x600**                       | 82%          |
| `Proyecto7.webp` | 38.4 KB       | **800x600**                       | 82%          |
| `Recurso 1.webp` | 70.9 KB       | **800x600**                       | 82%          |
| `Recurso 2.webp` | 89.8 KB       | **800x600**                       | 82%          |
| `Recurso 8.webp` | 38.2 KB       | **800x600**                       | 82%          |
| `Recurso 9.webp` | 26.1 KB       | **800x600**                       | 82%          |

**Comando Batch Resize:**

```powershell
# Procesar todos los Proyectos
Get-ChildItem -Filter "Proyecto*.webp" | ForEach-Object {
    $name = $_.BaseName
    magick $_.FullName -resize 800x600^ -gravity center -extent 800x600 -quality 82 "$name-optimized.webp"
}
```

---

## 📊 Categoría 4: Portfolio Grid Extra (14 imágenes)

**Uso:** Grid adicional de trabajos (pendiente de implementación)  
**Dimensiones:** 600x450 (más pequeñas que cards principales)

### Imágenes a Redimensionar:

| Archivo Original    | Tamaño Actual | **Dimensiones Objetivo** | Calidad WebP |
| ------------------- | ------------- | ------------------------ | ------------ |
| `Aquaevo.webp`      | 214.6 KB ⚠️   | **600x450**              | 80%          |
| `Recurso 10.webp`   | 30.7 KB       | **600x450**              | 80%          |
| `Recurso 11.webp`   | 81.1 KB       | **600x450**              | 80%          |
| `Recurso 12.webp`   | 83.7 KB       | **600x450**              | 80%          |
| `Recurso 13.webp`   | 30.1 KB       | **600x450**              | 80%          |
| `Recurso 14.webp`   | 36.2 KB       | **600x450**              | 80%          |
| `Recurso 15.webp`   | 17.2 KB ✅    | **600x450**              | 80%          |
| `Recurso 16.webp`   | 22.7 KB       | **600x450**              | 80%          |
| `Recurso 17.webp`   | 48.0 KB       | **600x450**              | 80%          |
| `Recurso 18.webp`   | 74.6 KB       | **600x450**              | 80%          |
| `Recurso3 (1).webp` | 827 KB ⚠️⚠️   | **600x450**              | 80%          |
| `Self.webp`         | 74.9 KB       | **600x450**              | 80%          |

**⚠️⚠️ ULTRA CRÍTICO:**

- `Recurso3 (1).webp` = **827KB** → debería ser ~30-40KB (reducción del 95%)
- `Aquaevo.webp` = **214KB** → debería ser ~40-50KB (reducción del 75%)

---

## 📊 Categoría 5: Team Photos (2 imágenes)

**Uso:** Fotos de equipo en sección "About"  
**Dimensiones:** 400x400 (avatares circulares)

### Imágenes a Redimensionar:

| Archivo Original         | Tamaño Actual | **Dimensiones Objetivo** | Calidad WebP |
| ------------------------ | ------------- | ------------------------ | ------------ |
| `joaquin-espildora.webp` | 13.6 KB ✅    | **400x400**              | 85%          |
| `matias-canepa.webp`     | 39.3 KB       | **400x400**              | 85%          |

**Comando Resize (circular crop):**

```powershell
# Resize + crop circular (si se necesita)
magick matias-canepa.webp -resize 400x400^ -gravity center -extent 400x400 -quality 85 matias-canepa-optimized.webp
```

---

## 📊 Categoría 6: Partners Logos (4 imágenes)

**Uso:** Logos de partners en footer/sección clientes  
**Dimensiones:** 200x80 (logos pequeños)

### Imágenes a Redimensionar:

| Archivo Original | Tamaño Actual | **Dimensiones Objetivo** | Calidad WebP |
| ---------------- | ------------- | ------------------------ | ------------ |
| `partner1.webp`  | 3.9 KB ✅     | **200x80**               | 90%          |
| `partner2.webp`  | 12.5 KB       | **200x80**               | 90%          |
| `partner3.webp`  | 1.9 KB ✅     | **200x80**               | 90%          |
| `partner4.webp`  | 4.3 KB ✅     | **200x80**               | 90%          |

---

## 📊 Categoría 7: Meta/SEO Images

**Uso:** Open Graph, Twitter Cards, favicons

### Imágenes a Crear/Optimizar:

| Archivo                | Dimensiones Actuales | **Dimensiones Objetivo**   | Formato  |
| ---------------------- | -------------------- | -------------------------- | -------- |
| `og-image.jpg`         | ❌ Unknown           | **1200x630** (FB/LinkedIn) | JPEG 85% |
| `twitter-image.jpg`    | ❌ Unknown           | **1200x675** (Twitter)     | JPEG 85% |
| `apple-touch-icon.png` | ❌ Unknown           | **180x180**                | PNG      |
| `Isotipo_morado.svg`   | Vector ✅            | **N/A** (mantener SVG)     | SVG      |

---

## 🚀 Script Automatizado de Resize

### Prerequisito: Instalar ImageMagick

```powershell
# Descargar e instalar desde: https://imagemagick.org/script/download.php
# O con winget:
winget install ImageMagick.ImageMagick
```

### Script PowerShell Completo:

```powershell
# SCRIPT DE OPTIMIZACIÓN MASIVA DE IMÁGENES
# Guarda como: optimize-all-images.ps1

$sourcePath = "c:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\assets\images"
$outputPath = "c:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\assets\images\optimized"

# Crear carpeta de salida
New-Item -ItemType Directory -Force -Path $outputPath

Write-Host "🎯 INICIANDO OPTIMIZACIÓN DE IMÁGENES..." -ForegroundColor Cyan

# 1. Hero Backgrounds (1920x1080 + 800x450 mobile)
Write-Host "`n📐 Procesando Hero Backgrounds..." -ForegroundColor Yellow
@("Recurso3.webp", "Recurso7.webp", "Recurso10.webp") | ForEach-Object {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($_)

    # Desktop
    magick "$sourcePath\$_" -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 "$outputPath\$name-desktop.webp"

    # Mobile
    magick "$sourcePath\$_" -resize 800x450^ -gravity center -extent 800x450 -quality 80 "$outputPath\$name-mobile.webp"

    Write-Host "  ✅ $name (desktop + mobile)" -ForegroundColor Green
}

# 2. Slider Cards Servicios + Proyectos (800x600)
Write-Host "`n📐 Procesando Slider Cards (800x600)..." -ForegroundColor Yellow
$sliderCards = @(
    "Recurso 4.webp", "Recurso 5.webp", "Recurso 6.webp",
    "Proyecto1.webp", "Proyecto3.webp", "Proyecto4.webp", "Proyecto5.webp",
    "Proyecto6.webp", "Proyecto7.webp",
    "Recurso 1.webp", "Recurso 2.webp", "Recurso 8.webp", "Recurso 9.webp"
)
$sliderCards | ForEach-Object {
    if (Test-Path "$sourcePath\$_") {
        $name = [System.IO.Path]::GetFileNameWithoutExtension($_)
        magick "$sourcePath\$_" -resize 800x600^ -gravity center -extent 800x600 -quality 82 "$outputPath\$name-card.webp"
        Write-Host "  ✅ $name" -ForegroundColor Green
    }
}

# 3. Portfolio Grid (600x450)
Write-Host "`n📐 Procesando Portfolio Grid (600x450)..." -ForegroundColor Yellow
$portfolioGrid = @(
    "Aquaevo.webp", "Recurso 10.webp", "Recurso 11.webp", "Recurso 12.webp",
    "Recurso 13.webp", "Recurso 14.webp", "Recurso 15.webp", "Recurso 16.webp",
    "Recurso 17.webp", "Recurso 18.webp", "Recurso3 (1).webp", "Self.webp"
)
$portfolioGrid | ForEach-Object {
    if (Test-Path "$sourcePath\$_") {
        $name = [System.IO.Path]::GetFileNameWithoutExtension($_)
        magick "$sourcePath\$_" -resize 600x450^ -gravity center -extent 600x450 -quality 80 "$outputPath\$name-grid.webp"
        Write-Host "  ✅ $name" -ForegroundColor Green
    }
}

# 4. Team Photos (400x400)
Write-Host "`n📐 Procesando Team Photos (400x400)..." -ForegroundColor Yellow
@("joaquin-espildora.webp", "matias-canepa.webp") | ForEach-Object {
    if (Test-Path "$sourcePath\$_") {
        $name = [System.IO.Path]::GetFileNameWithoutExtension($_)
        magick "$sourcePath\$_" -resize 400x400^ -gravity center -extent 400x400 -quality 85 "$outputPath\$name-avatar.webp"
        Write-Host "  ✅ $name" -ForegroundColor Green
    }
}

# 5. Partner Logos (200x80)
Write-Host "`n📐 Procesando Partner Logos (200x80)..." -ForegroundColor Yellow
@("partner1.webp", "partner2.webp", "partner3.webp", "partner4.webp") | ForEach-Object {
    if (Test-Path "$sourcePath\$_") {
        $name = [System.IO.Path]::GetFileNameWithoutExtension($_)
        magick "$sourcePath\$_" -resize 200x80 -quality 90 "$outputPath\$name-logo.webp"
        Write-Host "  ✅ $name" -ForegroundColor Green
    }
}

# Comparación de tamaños
Write-Host "`n📊 REPORTE DE OPTIMIZACIÓN:" -ForegroundColor Cyan
$originalSize = (Get-ChildItem -Path $sourcePath -Filter "*.webp" | Measure-Object -Property Length -Sum).Sum / 1MB
$optimizedSize = (Get-ChildItem -Path $outputPath -Filter "*.webp" | Measure-Object -Property Length -Sum).Sum / 1MB
$savings = (($originalSize - $optimizedSize) / $originalSize) * 100

Write-Host "  Original:   $([math]::Round($originalSize, 2)) MB" -ForegroundColor Red
Write-Host "  Optimizado: $([math]::Round($optimizedSize, 2)) MB" -ForegroundColor Green
Write-Host "  Ahorro:     $([math]::Round($savings, 1))%" -ForegroundColor Cyan

Write-Host "`n✅ OPTIMIZACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "📁 Imágenes optimizadas en: $outputPath" -ForegroundColor White
```

---

## 📋 Checklist de Implementación

### Fase 1: Preparación

- [ ] Instalar ImageMagick (`winget install ImageMagick.ImageMagick`)
- [ ] Hacer backup de `assets/images/` original
- [ ] Crear carpeta `assets/images/backup/`

### Fase 2: Optimización

- [ ] Ejecutar script: `.\optimize-all-images.ps1`
- [ ] Validar que todas las imágenes se generaron correctamente
- [ ] Revisar tamaños de archivo (target: ~955KB total)

### Fase 3: Integración

- [ ] Actualizar referencias en `index.html` con srcset responsive
- [ ] Implementar `<picture>` tags para hero backgrounds
- [ ] Agregar lazy loading a todas las imágenes below-the-fold
- [ ] Actualizar width/height attributes con dimensiones correctas

### Fase 4: Testing

- [ ] Test visual: todas las imágenes se ven correctas
- [ ] Test responsive: mobile, tablet, desktop
- [ ] Test performance: PageSpeed Insights (target: LCP <2.5s)
- [ ] Test network: verificar que se descargan las versiones correctas

### Fase 5: Deployment

- [ ] Commit: `git add assets/images/optimized/`
- [ ] Commit: `git commit -m "feat: optimize all images -44% (-750KB)"`
- [ ] Deploy a Netlify
- [ ] Validar PageSpeed improvement (+10-15 puntos esperados)

---

## 🎯 Resultados Esperados

### Performance Metrics:

- **LCP Improvement:** 4.3s → **2.5s** (-42%)
- **Total Image Weight:** 1.7MB → **955KB** (-44%)
- **First Load Time:** -750KB menos datos descargados
- **PageSpeed Score:** +10-15 puntos (mobile)

### Antes vs Después:

| Métrica      | Antes  | Después | Mejora |
| ------------ | ------ | ------- | ------ |
| Total Images | 1.7 MB | 955 KB  | -44%   |
| Hero BG      | 107 KB | 60 KB   | -44%   |
| Slider Cards | 748 KB | 430 KB  | -43%   |
| LCP          | 4.3s   | ~2.5s   | -42%   |
| PageSpeed    | 49     | 65-70   | +33%   |

---

## 🔧 Troubleshooting

### Error: "magick command not found"

```powershell
# Verificar instalación
magick --version

# Si no está instalado:
winget install ImageMagick.ImageMagick

# Reiniciar PowerShell después de instalar
```

### Error: "Access Denied"

```powershell
# Ejecutar PowerShell como Administrador
# O verificar permisos de carpeta
```

### Imágenes se ven pixeladas

```powershell
# Aumentar calidad (tradeoff: más peso)
# Cambiar -quality 82 a -quality 88
```

### Imágenes muy pesadas aún

```powershell
# Reducir calidad adicional
# Cambiar -quality 82 a -quality 75
# O reducir dimensiones 10-15%
```

---

## 📚 Referencias

- **WebP Best Practices:** https://developers.google.com/speed/webp/docs/using
- **Responsive Images:** https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- **ImageMagick Docs:** https://imagemagick.org/script/command-line-processing.php
- **PageSpeed Image Optimization:** https://developers.google.com/speed/docs/insights/OptimizeImages

---

**Última actualización:** 31 de octubre de 2025  
**Próximo review:** Después de implementar y validar métricas
