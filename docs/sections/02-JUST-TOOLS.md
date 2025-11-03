# 🔧 JUST TOOLS - Documentación Completa

## 📋 Información General

**Nombre:** Just Tools  
**Tagline:** "Herramientas que Simplifican tu Día"  
**Categoría:** Dev Utilities / Productivity  
**URL:** `/tools`  
**Theme:** `data-theme="tools"`

---

## 🎨 Paleta de Colores

```css
--primary: #06B6D4;      /* Cyan vibrante */
--secondary: #22C55E;    /* Verde fresco */
--accent: #F59E0B;       /* Naranja cálido */
--gradient: linear-gradient(135deg, #06B6D4 0%, #22C55E 100%);
```

**Aplicación:**
- **Primario:** Iconos, botones principales, borders
- **Secundario:** Hover states, success messages
- **Énfasis:** Highlights, tooltips, badges

---

## 📐 Estructura de Contenido

### 1. Hero Section

**Badge:** "Dev Utilities"  
**H1:** "Herramientas que Simplifican tu Día"  
**Subtítulo:** "Generadores, conversores y viewers sin instalación. Gratis y sin registro."

**CTAs:**
- Primario: "Explorar herramientas"
- (Scroll down automático a grid)

---

### 2. Grid de Herramientas (7 tools)

Cada tool card contiene:
- **Icono grande** (SVG, 48x48px)
- **Título** de la herramienta
- **Descripción breve** (1 línea)
- **CTA:** "Abrir herramienta" o "Usar ahora"

---

#### Tool 1: Generador QR 📱

**Título:** Generador de Códigos QR  
**Descripción:** Genera códigos QR personalizados con logo y colores  
**Funcionalidad (Python):**
- Input: URL o texto
- Customización: Color, logo, tamaño
- Output: PNG de alta resolución

**CTA:** "Generar QR"

---

#### Tool 2: JSON Viewer 📋

**Título:** JSON Viewer & Formatter  
**Descripción:** Visualiza, formatea y valida JSON fácilmente  
**Funcionalidad (Python):**
- Input: JSON text/file
- Features: Syntax highlighting, tree view, minify/beautify
- Output: Formatted JSON

**CTA:** "Abrir viewer"

---

#### Tool 3: PDF → Excel 📄

**Título:** Convertidor PDF a Excel  
**Descripción:** Convierte PDFs con tablas a Excel editable  
**Funcionalidad (Python):**
- Input: PDF file (max 10MB)
- Extracción inteligente de tablas
- Output: .xlsx descargable

**CTA:** "Convertir PDF"

---

#### Tool 4: Image Editor 🖼️

**Título:** Editor de Imágenes  
**Descripción:** Recorta, redimensiona y optimiza imágenes al instante  
**Funcionalidad (Python):**
- Input: JPG, PNG, WEBP
- Features: Crop, resize, compress, format conversion
- Output: Imagen optimizada

**CTA:** "Editar imagen"

---

#### Tool 5: DWG Viewer 📐

**Título:** Visor de Archivos DWG  
**Descripción:** Visualiza archivos CAD/DWG en el navegador  
**Funcionalidad (Python):**
- Input: .dwg file
- Render: Canvas o SVG
- Features: Zoom, pan, medición

**CTA:** "Ver DWG"

---

#### Tool 6: Convertidor de Divisas 💱

**Título:** Convertidor de Divisas  
**Descripción:** Tipos de cambio en tiempo real de todas las monedas  
**Funcionalidad (Python):**
- API: Exchange rates (actualización diaria)
- Features: Histórico, comparación múltiple
- Monedas: USD, EUR, CLP, UF, UTM, BTC

**CTA:** "Convertir"

---

#### Tool 7: Convertidor de Hora UTC/Local 🕐

**Título:** Convertidor de Zonas Horarias  
**Descripción:** Convierte entre UTC y zonas horarias al instante  
**Funcionalidad (Python):**
- Input: Fecha/hora + timezone
- Output: Conversión a múltiples timezones
- Features: Detección automática

**CTA:** "Convertir hora"

---

### 3. Sección "Más Herramientas Próximamente"

**Copy:** "Estamos desarrollando más herramientas. ¿Qué te gustaría ver?"

**CTA:** "Sugerir herramienta" (abre form o email)

---

## 🔍 SEO y Meta Tags

### Title Tag
```html
<title>Just Tools | Herramientas Online Gratuitas | Just Dev It</title>
```

### Meta Description
```html
<meta name="description" content="Generador QR, JSON Viewer, PDF a Excel, Image Editor, DWG Viewer y más. Herramientas web gratuitas sin instalación ni registro.">
```

### Keywords
```
herramientas online gratis, generador qr, json viewer, convertidor pdf excel, 
editor imagenes online, visor dwg, convertidor divisas, zona horaria utc
```

---

## 🖼️ Assets Necesarios

### Iconos (SVG)
- [ ] QR code icon
- [ ] JSON brackets icon
- [ ] PDF to spreadsheet icon
- [ ] Image/picture icon
- [ ] Blueprint/CAD icon
- [ ] Currency exchange icon
- [ ] Clock/timezone icon

**Estilo:** Line icons, stroke 2px, monocromo (heredan color del theme)

---

## 📱 Consideraciones Responsive

### Mobile (375px - 767px)
- Grid: 1 columna
- Cards: Full width
- CTAs: Full width buttons

### Tablet (768px - 1023px)
- Grid: 2 columnas

### Desktop (1024px+)
- Grid: 3 columnas
- Max 3 herramientas por fila

---

## ⚙️ Notas de Implementación Técnica

### Arquitectura (Python Backend)

```
/tools/
  /qr-generator/
    app.py (Flask/FastAPI)
    requirements.txt
  /json-viewer/
  /pdf-to-excel/
  /image-editor/
  /dwg-viewer/
  /currency-converter/
  /timezone-converter/
```

### Librerías Python Sugeridas

```python
# QR Generator
qrcode, pillow

# JSON Viewer
json, pygments (syntax highlighting)

# PDF to Excel
camelot-py, tabula-py, pandas

# Image Editor
pillow, opencv-python

# DWG Viewer
ezdxf (convierte DWG a DXF)

# Currency Converter
requests (API externa como exchangerate-api.com)

# Timezone Converter
pytz, datetime
```

### Deployment

- **Option 1:** Cada tool como microservicio independiente
- **Option 2:** Monolito con rutas separadas
- **Hosting:** Render, Railway, o VM con Docker

---

## 🎯 Métricas de Éxito

### KPIs
- Uso mensual por herramienta: >100 conversiones/tool
- Bounce rate: <50%
- Tiempo promedio: >3 minutos
- Retorno (returning users): >30%

---

## 📝 Notas Importantes

1. **Gratuito y sin registro:** No pedir email ni login
2. **Límites razonables:** Max file size, rate limiting
3. **Privacy:** No guardar archivos subidos (delete after processing)
4. **Mobile-friendly:** Todas las tools deben funcionar en mobile

---

**Documento creado:** 3 de noviembre de 2025  
**Estado:** ✅ Listo para mockup
