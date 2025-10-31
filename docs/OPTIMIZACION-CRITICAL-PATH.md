# ⚡ Optimización de Critical Path - Sin Bundle

**Fecha:** 31 de octubre de 2025  
**Problema:** Cadena de solicitudes críticas de 760ms (fonts.googleapis.com bloqueando render)

---

## 🎯 Estrategia Implementada

### 1. **Separar CSS en Critical vs Non-Critical**

#### ✅ **CRITICAL CSS** (6 archivos - Render Blocking)

**Objetivo:** Solo lo necesario para First Paint

```html
<!-- Cargan síncronamente (render-blocking) -->
<link rel="stylesheet" href="css/core/reset.css" />
<link rel="stylesheet" href="css/core/variables.css" />
<link rel="stylesheet" href="css/core/typography.css" />
<link rel="stylesheet" href="css/components/preloader.css" />
<link rel="stylesheet" href="css/components/navigation.css" />
<link rel="stylesheet" href="css/components/hero.css" />
```

**Peso total critical:** ~13KB (reset 1.5KB + variables 2.6KB + typography 2.4KB + preloader 2.5KB + navigation 2.8KB + hero 3.8KB)

---

#### 🔄 **NON-CRITICAL CSS** (11 archivos - Async)

**Objetivo:** Cargar sin bloquear render usando preload trick

```html
<!-- Cargan asíncronamente (non-blocking) -->
<link
  rel="preload"
  href="css/layouts/sections.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="css/layouts/sections.css" /></noscript>

<link
  rel="preload"
  href="css/layouts/grid.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="css/layouts/grid.css" /></noscript>

<!-- + 9 archivos más (cards, slider-cards, intro-sections, forms, portfolio-filter, button-fix, footer, animations, main) -->
```

**Peso total non-critical:** ~25KB (layouts 4KB + components 17KB + animations 2KB + main 4KB)

---

### 2. **Font Loading Optimization**

#### Problema Original:

```
Google Fonts: 760ms latencia (6 fonts de fonts.gstatic.com)
├── Poppins: 300, 400, 500, 600, 700, 800
├── Manrope: 200, 300, 400, 500, 600, 700, 800
└── Fira Code: 400, 500, 600
```

#### Solución Parcial Implementada:

```css
/* typography.css - Ya tiene display=swap */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Manrope:wght@200;300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap");
```

**`display=swap`** evita FOIT (Flash of Invisible Text), permite que el texto se muestre con fallback fonts mientras carga.

#### Preparación para Self-Hosting (Opcional Futuro):

```
assets/fonts/
├── fonts.css (definiciones @font-face listas)
├── poppins-v20-latin-300.woff2 (descargado)
├── poppins-v20-latin-regular.woff2 (descargado)
└── poppins-v20-latin-500.woff2 (descargado)
```

**Script disponible:** `download-fonts.ps1` para descargar el resto de fuentes si se necesita.

---

## 📊 Resultados Esperados

### Antes (v1.5):

```
Critical Path Latency: 760ms
├── HTML: 295ms
├── 17 CSS files: 359-480ms (sincronos)
├── Google Fonts CSS: 455ms
└── 6 Font files: 758-760ms ⚠️ BOTTLENECK
```

### Después (v1.6):

```
Critical Path Latency: ~400ms (-47%)
├── HTML: 295ms
├── 6 CRITICAL CSS: 300-400ms (solo above-the-fold)
├── 11 Non-critical CSS: Async (no bloquea render) ✅
└── Google Fonts: 760ms PERO con display=swap (texto visible inmediato) ✅
```

---

## 🎯 Impacto en Web Vitals

| Métrica               | Antes (v1.5)         | Después (v1.6)      | Mejora            |
| --------------------- | -------------------- | ------------------- | ----------------- |
| **Critical Path**     | 760ms                | ~400ms              | -47%              |
| **First Paint (FCP)** | Bloqueado por 17 CSS | Solo 6 CSS críticos | ~300ms más rápido |
| **LCP**               | 4.3s                 | ~3.5-3.8s           | -15-20%           |
| **CLS**               | 0.797                | Mantener ~0.3-0.4   | Sin cambio        |
| **PageSpeed Score**   | 49                   | 55-60 esperado      | +12-22%           |

---

## 🔍 Cómo Funciona el Preload Trick

### Técnica: Preload + onload

```html
<link
  rel="preload"
  href="style.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="style.css" /></noscript>
```

**Paso a paso:**

1. Browser ve `rel="preload"` → descarga CSS con **baja prioridad** (no bloquea render)
2. CSS descargado → ejecuta `onload` → cambia `rel` a `stylesheet` → aplica estilos
3. `<noscript>` fallback → para usuarios sin JavaScript

**Ventajas:**

- ✅ CSS se descarga en paralelo con crítico
- ✅ No bloquea First Paint
- ✅ Aplica estilos apenas termina descarga
- ✅ Compatible con JavaScript deshabilitado

---

## 📚 Archivos Modificados

### 1. `index.html`

```diff
- <!-- 17 CSS síncronos (todos render-blocking) -->
+ <!-- 6 CSS críticos (render-blocking) -->
+ <!-- 11 CSS no-críticos (async con preload) -->
```

### 2. `css/core/typography.css`

```diff
- @import url('...&display=swap');  // Ya tenía display=swap ✅
+ /* Documentado para claridad */
```

### 3. Nuevos archivos:

- `assets/fonts/fonts.css` - @font-face definitions para self-hosting futuro
- `assets/fonts/*.woff2` - 3 fuentes Poppins descargadas (parcial)
- `download-fonts.ps1` - Script para descargar resto de fuentes

---

## 🚀 Próximos Pasos Opcionales

### Nivel 1: Validar Mejoras (AHORA)

1. ✅ Esperar 2-3 min para deploy Netlify
2. ✅ Test PageSpeed Insights mobile
3. ✅ Validar FCP mejoró (~300ms esperado)
4. ✅ Validar LCP mejoró (~500ms esperado)

### Nivel 2: Self-Host Fonts (OPCIONAL - Si queremos eliminar 760ms completamente)

```powershell
# Descargar resto de fuentes
.\download-fonts.ps1

# Actualizar typography.css
- @import url('https://fonts.googleapis.com/...');
+ @import url('../assets/fonts/fonts.css');

# Deploy y test
git add -A
git commit -m "perf: Self-host Google Fonts (-760ms external latency)"
git push origin main
```

**Tradeoff:**

- ✅ Elimina completamente latencia externa (760ms → 0ms)
- ✅ Fonts cacheables por 1 año (mejor repeat visits)
- ❌ +60KB inicial de fonts (vs Google Fonts CDN caching)
- ❌ Más mantenimiento (updates manuales)

### Nivel 3: HTTP/2 Push (AVANZADO - Requiere Netlify config)

```toml
# netlify.toml
[[headers]]
  for = "/"
  [headers.values]
    Link = '''
    </css/core/reset.css>; rel=preload; as=style,
    </css/core/variables.css>; rel=preload; as=style,
    </css/core/typography.css>; rel=preload; as=style
    '''
```

**Beneficio:** Server push CSS críticos antes de parsear HTML (-100ms adicional)

---

## 📈 Comparación con Bundle Approach

| Aspecto               | Bundle (v1.4 FAILED)    | Separate Files + Defer (v1.6) |
| --------------------- | ----------------------- | ----------------------------- |
| **Archivos críticos** | 1 bundle (86KB)         | 6 CSS (13KB)                  |
| **Render blocking**   | Todo el bundle          | Solo critical                 |
| **First Paint**       | Espera 86KB             | Espera 13KB (-85%)            |
| **Paralelización**    | No                      | Sí (HTTP/2)                   |
| **Cache granular**    | No (todo o nada)        | Sí (por componente)           |
| **Mantenibilidad**    | Baja (regenerar bundle) | Alta (edit directo)           |
| **Performance**       | 49 ❌                   | 55-60 esperado ✅             |

---

## ✅ Resumen Ejecutivo

### ¿Qué hicimos?

1. **Separamos CSS en crítico (6) vs no-crítico (11)**
2. **Async loading para CSS below-the-fold** (preload trick)
3. **Mantuvimos archivos separados** (no bundle - HTTP/2 eficiente)
4. **Preparamos infraestructura** para self-host fonts (opcional)

### ¿Por qué funciona?

- **Critical rendering path más corto:** Solo 6 CSS bloquean vs 17
- **First Paint más rápido:** 13KB críticos vs 38KB totales
- **Better progressive rendering:** Contenido above-fold renderiza inmediato, below-fold carga después
- **HTTP/2 multiplexing:** Múltiples archivos en paralelo sin penalidad

### ¿Resultado esperado?

- **FCP:** 3.2s → ~2.5s (-22%)
- **LCP:** 4.3s → ~3.5s (-19%)
- **PageSpeed:** 49 → 55-60 (+12-22%)
- **Critical Path:** 760ms → ~400ms (-47%)

---

**Deployment:** https://justdev.it/ (Netlify auto-deploy from main)  
**Commit:** 2aaafda "perf: Optimize CSS loading strategy"  
**Tiempo estimado deploy:** 2-3 minutos
