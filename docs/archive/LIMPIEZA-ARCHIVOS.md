# 🧹 Análisis de Limpieza de Archivos

**Fecha:** 30 de octubre de 2025

## 🔴 ARCHIVOS PARA ELIMINAR (Basura/Deprecados)

### **1. Archivos HTML Deprecados**

| Archivo | Tamaño | Motivo | Acción |
|---------|--------|--------|--------|
| `about-us.html` | ~50 KB | ⚠️ Página secundaria no usada | ❌ ELIMINAR |
| `test-images.html` | ~5-10 KB | 🧪 Archivo de testing/debug | ❌ ELIMINAR |

**Ahorro:** ~60 KB

---

### **2. Imágenes PNG Duplicadas (Ya optimizadas a WebP)**

| Archivo PNG | WebP Equivalente | Tamaño PNG | Tamaño WebP | Ahorro |
|-------------|------------------|------------|-------------|--------|
| `Proyecto3.png` | ✅ Proyecto3.webp | 1,431 KB | 290 KB | 1,141 KB |
| `Proyecto4.png` | ✅ Proyecto4.webp | 1,040 KB | 264 KB | 776 KB |
| `Proyecto5.png` | ✅ Proyecto5.webp | 796 KB | 161 KB | 635 KB |
| `Proyecto6.png` | ✅ Proyecto6.webp | 1,028 KB | 254 KB | 774 KB |
| `Proyecto7.png` | ✅ Proyecto7.webp | 1,354 KB | 311 KB | 1,043 KB |
| `Self.png` | ✅ Self.webp | 380 KB | 75 KB | 305 KB |

**Total a eliminar:** ~5,649 KB (5.5 MB)

---

### **3. Documentación Redundante/Deprecada**

| Archivo | Motivo | Acción |
|---------|--------|--------|
| `ACTUALIZACION-COMPLETADA.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `CHECKLIST-TRACKING.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `CONFIGURACION-FINAL.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `GUIA-RAPIDA-10MIN.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `GUIA-SEARCH-CONSOLE.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `INDICE-DOCUMENTACION-TRACKING.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `INDICE-DOCUMENTACION.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `LIGHTHOUSE-CHECKLIST.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `OPTIMIZACIONES-COMPLETAS.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `PLAN-SEGUIMIENTO.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `RESUMEN-TRACKING.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `SOLUCION-IMAGENES.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `TRANSFORMACION-RESUMEN.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |
| `VERIFICACION-IMAGENES.md` | Documentación temporal | ⚠️ ARCHIVAR o ELIMINAR |

**Total:** ~200-300 KB

---

### **4. Scripts Deprecados**

| Archivo | Motivo | Acción |
|---------|--------|--------|
| `diagnostico.js` | Script de debugging | ❌ ELIMINAR |
| `verificar-tracking.ps1` | Script temporal | ⚠️ ARCHIVAR |
| `update-site.ps1` | Script temporal | ⚠️ ARCHIVAR |

---

### **5. Archivos 3D No Utilizados**

| Archivo | Ubicación | Tamaño | Usado en HTML |
|---------|-----------|--------|---------------|
| `tinker.obj` | `assets/3d_models/` | ~500 KB | ❌ NO |
| `tinker.obj` | `assets/images/` | ~500 KB | ❌ NO (duplicado) |

**Ahorro:** ~1,000 KB

---

### **6. Carpetas con Recursos No Utilizados**

#### **`assets/Just Dev It/`**
Contiene recursos de branding que probablemente no se usan en la web:
- Brochures y Presentaciones/
- Fotografías/
- Recursos gráficos/
- Tipografías/ (fonts ya están en Google Fonts)

**Estimado:** 50-100 MB de archivos innecesarios

---

### **7. Config No Utilizado**

| Archivo | Motivo |
|---------|--------|
| `config/config.js` | Si no se usa, eliminar |

---

## ✅ ARCHIVOS QUE SE DEBEN MANTENER

### **HTML Activos**
- ✅ `index.html` - Página principal

### **Imágenes Activas (WebP optimizadas)**
- ✅ `Databam.png` - ⚠️ Pendiente optimizar a WebP
- ✅ `Aquaevo.png` / `Aquaevo.webp` - Mantener WebP
- ✅ `Proyecto1.png` - ⚠️ Pendiente optimizar a WebP
- ✅ `Recurso3.webp`, `Recurso7.webp`, `Recurso10.webp`
- ✅ `joaquin-espildora.jpg`, `matias-canepa.jpg`
- ✅ `logo-principal-blanco.svg`, `Isotipo_morado.svg`
- ✅ `partner1-4.png` - ⚠️ Considerar optimizar

### **Scripts Activos**
- ✅ `app-standalone.js`
- ✅ `conversion-tracking.js`
- ✅ `epic-preloader.js`
- ✅ `hero-background.js`
- ✅ `logo-3d-animation.js`
- ✅ `js/components/slider-cards.js`
- ✅ `js/components/intro-parallax.js`

### **Documentación Esencial**
- ✅ `README.md` - Principal
- ✅ `ANALISIS-RECURSOS.md` - Útil
- ✅ `OPTIMIZACION-COMPLETADA.md` - Útil
- ✅ `OPTIMIZACION-IMAGENES.md` - Útil
- ✅ `LIMPIEZA-ARCHIVOS.md` - Este documento

### **SEO/Config**
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `CNAME`
- ✅ `.htaccess`

### **Scripts Útiles**
- ✅ `minify.ps1` - Para minificación

---

## 🚀 PLAN DE LIMPIEZA PRIORITARIO

### **🔴 CRÍTICO - Hacer AHORA (5.5 MB)**

```powershell
# 1. Eliminar PNG duplicados (ya hay WebP)
Remove-Item "assets/images/Proyecto3.png"
Remove-Item "assets/images/Proyecto4.png"
Remove-Item "assets/images/Proyecto5.png"
Remove-Item "assets/images/Proyecto6.png"
Remove-Item "assets/images/Proyecto7.png"
Remove-Item "assets/images/Self.png"
```

**Ahorro inmediato:** 5.5 MB

---

### **🟡 IMPORTANTE - Esta Semana**

```powershell
# 2. Eliminar archivos HTML de testing
Remove-Item "about-us.html"
Remove-Item "test-images.html"

# 3. Eliminar 3D models no usados
Remove-Item "assets/3d_models/tinker.obj"
Remove-Item "assets/images/tinker.obj"

# 4. Eliminar scripts de debugging
Remove-Item "diagnostico.js"
```

**Ahorro:** ~1.6 MB

---

### **🟢 OPCIONAL - Archivar Documentación**

```powershell
# Crear carpeta de archivo
New-Item -ItemType Directory -Path "docs/archive" -Force

# Mover docs temporales
Move-Item "ACTUALIZACION-COMPLETADA.md" "docs/archive/"
Move-Item "CHECKLIST-TRACKING.md" "docs/archive/"
Move-Item "CONFIGURACION-FINAL.md" "docs/archive/"
Move-Item "GUIA-RAPIDA-10MIN.md" "docs/archive/"
Move-Item "INDICE-DOCUMENTACION*.md" "docs/archive/"
Move-Item "LIGHTHOUSE-CHECKLIST.md" "docs/archive/"
Move-Item "OPTIMIZACIONES-COMPLETAS.md" "docs/archive/"
Move-Item "PLAN-SEGUIMIENTO.md" "docs/archive/"
Move-Item "RESUMEN-TRACKING.md" "docs/archive/"
Move-Item "SOLUCION-IMAGENES.md" "docs/archive/"
Move-Item "TRANSFORMACION-RESUMEN.md" "docs/archive/"
Move-Item "VERIFICACION-IMAGENES.md" "docs/archive/"

# Mover scripts temporales
Move-Item "verificar-tracking.ps1" "docs/archive/"
Move-Item "update-site.ps1" "docs/archive/"
```

---

### **⚠️ CRÍTICO - Revisar Carpeta "Just Dev It"**

```powershell
# Ver contenido
Get-ChildItem "assets/Just Dev It" -Recurse | Measure-Object -Property Length -Sum

# Si no se usa en la web, considerar eliminar toda la carpeta
# Puede ahorrar 50-100 MB
```

---

## 📊 RESUMEN DE AHORRO

| Categoría | Archivos | Ahorro |
|-----------|----------|--------|
| **PNG duplicados** | 6 archivos | 5.5 MB |
| **HTML testing** | 2 archivos | 60 KB |
| **3D models** | 2 archivos | 1 MB |
| **Scripts debug** | 1 archivo | 10 KB |
| **Documentación** | 14 archivos | 300 KB |
| **"Just Dev It" folder** | ~100+ archivos | 50-100 MB |
| **TOTAL ESTIMADO** | | **57-107 MB** |

---

## ⚡ IMPACTO EN RENDIMIENTO

### **Antes de la Limpieza**
- 💾 Tamaño total del proyecto: ~110-160 MB
- ⏱️ Git clone: 2-3 minutos
- 🌐 Deploy: 1-2 minutos

### **Después de la Limpieza**
- 💾 Tamaño total del proyecto: ~10-20 MB ⬆️ **-90%**
- ⏱️ Git clone: 10-20 segundos ⬆️ **-85%**
- 🌐 Deploy: 10-15 segundos ⬆️ **-85%**

---

## 🎯 COMANDO DE LIMPIEZA COMPLETO

```powershell
# Script de limpieza automática
# GUARDAR COMO: cleanup.ps1

Write-Host "🧹 Iniciando limpieza de archivos..." -ForegroundColor Cyan

# 1. PNG duplicados
Write-Host "Eliminando PNG duplicados..." -ForegroundColor Yellow
$pngsToDelete = @(
    "assets/images/Proyecto3.png",
    "assets/images/Proyecto4.png",
    "assets/images/Proyecto5.png",
    "assets/images/Proyecto6.png",
    "assets/images/Proyecto7.png",
    "assets/images/Self.png"
)
foreach ($file in $pngsToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Eliminado: $file" -ForegroundColor Green
    }
}

# 2. HTML testing
Write-Host "Eliminando archivos HTML de testing..." -ForegroundColor Yellow
Remove-Item "about-us.html" -Force -ErrorAction SilentlyContinue
Remove-Item "test-images.html" -Force -ErrorAction SilentlyContinue

# 3. 3D models
Write-Host "Eliminando modelos 3D no usados..." -ForegroundColor Yellow
Remove-Item "assets/3d_models/tinker.obj" -Force -ErrorAction SilentlyContinue
Remove-Item "assets/images/tinker.obj" -Force -ErrorAction SilentlyContinue

# 4. Scripts debug
Write-Host "Eliminando scripts de debugging..." -ForegroundColor Yellow
Remove-Item "diagnostico.js" -Force -ErrorAction SilentlyContinue

# 5. Archivar documentación
Write-Host "Archivando documentación temporal..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "docs/archive" -Force | Out-Null
$docsToArchive = @(
    "ACTUALIZACION-COMPLETADA.md",
    "CHECKLIST-TRACKING.md",
    "CONFIGURACION-FINAL.md",
    "GUIA-RAPIDA-10MIN.md",
    "GUIA-SEARCH-CONSOLE.md",
    "LIGHTHOUSE-CHECKLIST.md",
    "OPTIMIZACIONES-COMPLETAS.md",
    "PLAN-SEGUIMIENTO.md",
    "RESUMEN-TRACKING.md",
    "SOLUCION-IMAGENES.md",
    "TRANSFORMACION-RESUMEN.md",
    "VERIFICACION-IMAGENES.md"
)
foreach ($doc in $docsToArchive) {
    if (Test-Path $doc) {
        Move-Item $doc "docs/archive/" -Force
        Write-Host "  ✓ Archivado: $doc" -ForegroundColor Green
    }
}

Write-Host "`n✅ Limpieza completada!" -ForegroundColor Green
Write-Host "📊 Ahorro estimado: 7-8 MB" -ForegroundColor Cyan
```

---

**Última actualización:** 30 de octubre de 2025  
**Estado:** 🔴 Pendiente de ejecución
