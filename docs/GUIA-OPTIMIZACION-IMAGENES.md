# 🖼️ GUÍA DE OPTIMIZACIÓN DE IMÁGENES

## Just Dev It Landing Page - Task 4

**Fecha:** 31 de Octubre, 2025  
**Estado:** EN PROGRESO  
**Objetivo:** Reducir peso de imágenes en 60%, mejorar LCP en 1.5s

---

## 📊 ANÁLISIS DE IMÁGENES ACTUAL

### Imágenes que Requieren Optimización (PNG/JPG):

| Archivo                   | Formato | Tamaño Actual | Uso          | Prioridad |
| ------------------------- | ------- | ------------- | ------------ | --------- |
| **Aquaevo.png**           | PNG     | 1,211 KB      | Logo cliente | 🔴 ALTA   |
| **Self.png**              | PNG     | 380 KB        | Logo cliente | 🔴 ALTA   |
| **Proyecto1.png**         | PNG     | 84 KB         | Portfolio    | 🟡 MEDIA  |
| **joaquin-espildora.jpg** | JPG     | 27 KB         | Foto equipo  | 🟡 MEDIA  |
| **matias-canepa.jpg**     | JPG     | 52 KB         | Foto equipo  | 🟡 MEDIA  |
| **partner1.png**          | PNG     | 13 KB         | Logo cliente | 🟢 BAJA   |
| **partner2.png**          | PNG     | 12 KB         | Logo cliente | 🟢 BAJA   |
| **partner3.png**          | PNG     | 2 KB          | Logo cliente | ✅ OK     |
| **partner4.png**          | PNG     | 9 KB          | Logo cliente | 🟢 BAJA   |

**Total a optimizar:** 1,791 KB → Esperado: ~536 KB (-70%)

### Imágenes Ya Optimizadas (WebP):

✅ Aquaevo.webp  
✅ Self.webp  
✅ Proyecto3.webp  
✅ Proyecto4.webp  
✅ Proyecto5.webp  
✅ Proyecto6.webp  
✅ Proyecto7.webp  
✅ Recurso3.webp  
✅ Recurso7.webp  
✅ Recurso10.webp

---

## 🎯 PLAN DE OPTIMIZACIÓN

### Fase 1: Conversión PNG → WebP (PRIORITARIA)

#### Archivos Críticos (Above-the-fold):

1. **Aquaevo.png (1.2 MB)** → Aquaevo.webp

   - Peso esperado: ~150 KB (-88%)
   - Uso: Logo cliente visible inmediatamente
   - Impacto LCP: ALTO

2. **Self.png (380 KB)** → Self.webp

   - Peso esperado: ~50 KB (-87%)
   - Uso: Logo cliente visible
   - Impacto LCP: MEDIO

3. **Proyecto1.png (84 KB)** → Proyecto1.webp
   - Peso esperado: ~15 KB (-82%)
   - Uso: Imagen de portfolio
   - Impacto: MEDIO

#### Archivos Secundarios (Below-the-fold):

4. **partner1-4.png** → partner1-4.webp
   - Peso combinado: 37 KB → ~8 KB (-78%)
   - Uso: Logos de clientes (lazy load)
   - Impacto: BAJO (ya tiene lazy loading)

### Fase 2: Optimización JPG → WebP

5. **joaquin-espildora.jpg (27 KB)** → joaquin-espildora.webp

   - Peso esperado: ~12 KB (-56%)
   - Uso: Foto de equipo
   - Lazy load activado

6. **matias-canepa.jpg (52 KB)** → matias-canepa.webp
   - Peso esperado: ~22 KB (-58%)
   - Uso: Foto de equipo
   - Lazy load activado

---

## 🛠️ MÉTODOS DE CONVERSIÓN

### Opción 1: Herramientas Online (RECOMENDADO - Rápido)

#### A) Squoosh.app (Google)

**URL:** https://squoosh.app/

**Pasos:**

1. Abrir https://squoosh.app/
2. Arrastrar imagen PNG/JPG
3. Seleccionar "WebP" en el panel derecho
4. Ajustar calidad:
   - **Logos PNG:** Calidad 90-95 (para preservar transparencia)
   - **Fotos JPG:** Calidad 80-85 (balance calidad/peso)
5. Comparar lado-a-lado (zoom 1:1)
6. Descargar
7. Guardar en `assets/images/` con mismo nombre `.webp`

**Ventajas:**

- ✅ Gratis
- ✅ Sin instalación
- ✅ Comparación visual lado-a-lado
- ✅ Control total de calidad
- ✅ Funciona offline (PWA)

#### B) Convertio.co

**URL:** https://convertio.co/es/png-webp/

**Pasos:**

1. Subir archivo PNG/JPG
2. Seleccionar "WebP" como formato destino
3. Clic en "Convertir"
4. Descargar resultado

**Ventajas:**

- ✅ Batch conversion (múltiples archivos)
- ✅ Rápido
- ❌ Requiere internet
- ❌ Sin control de calidad

#### C) CloudConvert

**URL:** https://cloudconvert.com/png-to-webp

**Pasos:**

1. Subir archivos
2. Configurar calidad (80-95)
3. Convertir
4. Descargar ZIP

**Ventajas:**

- ✅ Batch processing
- ✅ Configuración de calidad
- ❌ Límite gratuito: 25 conversiones/día

---

### Opción 2: PowerShell Script (Si tienes ImageMagick)

**Requiere:** ImageMagick instalado
**Instalar:** `choco install imagemagick` o descargar de https://imagemagick.org/

```powershell
# Script de conversión masiva PNG/JPG → WebP
$source = "c:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\assets\images"
$files = @(
    "Aquaevo.png",
    "Self.png",
    "Proyecto1.png",
    "partner1.png",
    "partner2.png",
    "partner4.png",
    "joaquin-espildora.jpg",
    "matias-canepa.jpg"
)

foreach ($file in $files) {
    $input = Join-Path $source $file
    $output = $input -replace '\.(png|jpg|jpeg)$', '.webp'

    # Calidad 85 para balance óptimo
    magick convert $input -quality 85 $output

    Write-Host "✅ Convertido: $file → $(Split-Path $output -Leaf)" -ForegroundColor Green
}

# Mostrar comparación de tamaños
Write-Host "`nComparación de tamaños:" -ForegroundColor Cyan
foreach ($file in $files) {
    $original = Join-Path $source $file
    $webp = $original -replace '\.(png|jpg|jpeg)$', '.webp'

    if (Test-Path $webp) {
        $sizeOrig = (Get-Item $original).Length / 1KB
        $sizeWebP = (Get-Item $webp).Length / 1KB
        $savings = [math]::Round(($sizeOrig - $sizeWebP) / $sizeOrig * 100, 1)

        Write-Host "$file : $([math]::Round($sizeOrig, 1)) KB → $([math]::Round($sizeWebP, 1)) KB (-$savings%)" -ForegroundColor Yellow
    }
}
```

---

### Opción 3: VSCode Extension (Conveniente)

**Extensión:** "Image Optimizer" o "WebP Converter"

**Pasos:**

1. Instalar extensión en VSCode
2. Click derecho en imagen → "Convert to WebP"
3. Configurar calidad en settings

---

## 📝 FASE 3: ACTUALIZAR HTML

### A) Implementar `<picture>` con Fallback

**Patrón recomendado:**

```html
<picture>
  <source srcset="assets/images/nombre.webp" type="image/webp" />
  <source srcset="assets/images/nombre.png" type="image/png" />
  <img
    src="assets/images/nombre.png"
    alt="Descripción"
    width="200"
    height="80"
    loading="lazy"
    class="client-logo"
  />
</picture>
```

**Ventajas:**

- ✅ Navegadores modernos usan WebP (Chrome, Edge, Firefox, Safari 14+)
- ✅ Fallback automático a PNG para navegadores antiguos
- ✅ Sin JavaScript requerido

---

### B) Agregar Responsive Images con `srcset`

**Para imágenes grandes** (Aquaevo, Self, Proyecto1):

```html
<picture>
  <source
    srcset="
      assets/images/nombre-400w.webp   400w,
      assets/images/nombre-800w.webp   800w,
      assets/images/nombre-1200w.webp 1200w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    type="image/webp"
  />
  <img
    src="assets/images/nombre.png"
    alt="Descripción"
    width="1200"
    height="800"
    loading="lazy"
  />
</picture>
```

**Nota:** Solo para imágenes >100KB (Aquaevo.png, Self.png)

---

### C) Agregar Width/Height a TODAS las Imágenes

**Buscar imágenes sin dimensiones:**

```bash
# PowerShell
Select-String -Path "index.html" -Pattern '<img(?!.*width=)' | Select-Object Line
```

**Importancia:**

- ✅ Previene Layout Shift (CLS)
- ✅ Browser reserva espacio antes de cargar
- ✅ Mejora Lighthouse score (+5-10 puntos)

---

## 🎯 MÉTRICAS ESPERADAS

### Impacto en Performance:

| Métrica                    | Antes    | Después | Mejora                      |
| -------------------------- | -------- | ------- | --------------------------- |
| **Peso Total Imágenes**    | 1,791 KB | ~536 KB | **-70%**                    |
| **LCP (Mobile)**           | 4.2s     | 2.7s    | **-1.5s**                   |
| **Lighthouse Performance** | 78       | 86      | **+8 puntos**               |
| **CLS**                    | 0.15     | 0.05    | **-67%** (con width/height) |
| **Requests HTTP**          | 46       | 46      | Sin cambio                  |

### Ahorro de Ancho de Banda:

**Por visita:**

- Usuarios con WebP: -1,255 KB (-70%)
- Usuarios sin WebP: 0 KB (usan PNG/JPG original)

**Anual** (estimado 10,000 visitas):

- Datos transferidos: ~5.4 GB → ~1.6 GB
- Ahorro: **3.8 GB/año** (-70%)
- Costo CDN ahorrado: ~$0.20-0.50/mes

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Conversión (30 min)

- [ ] Convertir Aquaevo.png → Aquaevo.webp (Squoosh, calidad 90)
- [ ] Convertir Self.png → Self.webp (Squoosh, calidad 90)
- [ ] Convertir Proyecto1.png → Proyecto1.webp (Squoosh, calidad 85)
- [ ] Convertir partner1-4.png → webp (Batch con Convertio, calidad 85)
- [ ] Convertir joaquin-espildora.jpg → webp (Squoosh, calidad 80)
- [ ] Convertir matias-canepa.jpg → webp (Squoosh, calidad 80)
- [ ] Verificar tamaños: Total <600 KB

### Fase 2: Actualizar HTML (45 min)

- [ ] Buscar todas las referencias a PNG/JPG en index.html
- [ ] Reemplazar `<img src="*.png">` con `<picture>` + WebP
- [ ] Agregar `width` y `height` a imágenes sin dimensiones
- [ ] Verificar `loading="lazy"` en imágenes below-the-fold
- [ ] Mantener `loading="eager"` o sin atributo para hero/LCP
- [ ] Actualizar alt texts descriptivos

### Fase 3: Testing (15 min)

- [ ] Probar en Chrome DevTools:
  - [ ] Network tab: verificar WebP carga correctamente
  - [ ] Simular conexión 3G: LCP <3s
  - [ ] Layout Shift: CLS <0.1
- [ ] Probar en Firefox (soporte WebP)
- [ ] Probar en Safari (soporte WebP desde 14+)
- [ ] Validar fallback PNG funciona (deshabilitar WebP en DevTools)

### Fase 4: Optimización Avanzada (Opcional - 30 min)

- [ ] Crear versiones responsive (400w, 800w, 1200w) para Aquaevo y Self
- [ ] Implementar srcset para imágenes grandes
- [ ] Considerar lazy loading con intersection observer para portfolio
- [ ] Preload imagen LCP si es crítica

---

## 📈 ANTES vs DESPUÉS

### Ejemplo: Aquaevo.png

**ANTES:**

```html
<img
  src="assets/images/Aquaevo.png"
  alt="Aquaevo"
  loading="lazy"
  class="client-logo"
/>
```

- Peso: 1,211 KB
- Formato: PNG (sin compresión moderna)
- Sin dimensiones explícitas (causa CLS)

**DESPUÉS:**

```html
<picture>
  <source srcset="assets/images/Aquaevo.webp" type="image/webp" />
  <source srcset="assets/images/Aquaevo.png" type="image/png" />
  <img
    src="assets/images/Aquaevo.png"
    alt="Aquaevo - Sistema de Gestión"
    width="300"
    height="120"
    loading="lazy"
    class="client-logo"
  />
</picture>
```

- Peso: ~150 KB WebP (-88%)
- Formato moderno con fallback
- Dimensiones explícitas (previene CLS)
- Alt mejorado para SEO

**Ahorro:** 1,061 KB por imagen

---

## 🔧 TROUBLESHOOTING

### Problema: "WebP no se muestra en Safari antiguo"

**Solución:** El fallback a PNG funciona automáticamente con `<picture>`

### Problema: "Imágenes se ven borrosas"

**Solución:** Aumentar calidad en conversión (85 → 90 → 95)

### Problema: "CLS alto después de agregar dimensiones"

**Solución:** Verificar que width/height coincidan con aspect ratio real

### Problema: "LCP aún alto"

**Solución:**

1. Preload imagen LCP: `<link rel="preload" as="image" href="..." type="image/webp">`
2. Verificar que imagen LCP NO tenga `loading="lazy"`
3. Considerar inline critical image como data URI (solo <10KB)

---

## 🎓 RECURSOS ADICIONALES

### Herramientas de Compresión:

- **Squoosh:** https://squoosh.app/ (RECOMENDADO)
- **TinyPNG:** https://tinypng.com/ (PNG optimizer)
- **Convertio:** https://convertio.co/es/
- **CloudConvert:** https://cloudconvert.com/

### Verificación:

- **PageSpeed Insights:** https://pagespeed.web.dev/
- **WebP Test:** https://caniuse.com/webp
- **Image Analysis:** Chrome DevTools > Network > Img filter

### Documentación:

- **WebP Guide:** https://developers.google.com/speed/webp
- **Responsive Images:** https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- **Picture Element:** https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture

---

## 🚀 PRÓXIMOS PASOS

1. **Inmediato:** Convertir Aquaevo.png y Self.png (80% del ahorro)
2. **Hoy:** Actualizar HTML con `<picture>` para archivos convertidos
3. **Esta semana:** Convertir resto de PNG/JPG
4. **Siguiente sprint:** Implementar srcset responsive para imágenes grandes

---

**Tiempo estimado total:** 1.5-2 horas  
**Impacto esperado:** Lighthouse +8 puntos, LCP -1.5s, Peso -1.2MB  
**Prioridad:** ALTA (Task P1 - impacto crítico en performance)

---

_Documento generado por GitHub Copilot - Guía de Optimización de Imágenes_
_Última actualización: 31 de Octubre, 2025_
