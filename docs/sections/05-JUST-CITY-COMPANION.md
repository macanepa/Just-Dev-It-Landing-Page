# 05 - Just City Companion

## 🎯 Propósito de la Sección
Extensión de Chrome que enriquece Portalinmobiliario.com con data de Databam. Muestra precio/m², propietario, propiedades comparables y capa de información al navegar avisos inmobiliarios.

---

## 🎨 Identidad Visual

### Paleta de Colores
```css
--primary: #8B5CF6    /* Morado/Violeta */
--secondary: #10B981  /* Verde Esmeralda */
--accent: #F43F5E     /* Rosa/Rojo */
--gradient: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)
```

### Tipografía
- **Headings**: Poppins (700-800)
- **Body**: Manrope (400-600)

### Iconografía
- 🏙️ Ciudad / Urban
- 🔍 Análisis / Inspección
- 📍 Ubicación / Geolocalización
- 💎 Premium / Calidad
- ⚡ Velocidad / Instantáneo

---

## 📋 Estructura de Contenido

### Hero Section
**Layout**: 2 columnas (60/40)

**Columna Izquierda**:
- **Badge**: `Just City Companion`
- **Título**: "Compra Propiedades con Información Real"
- **Subtítulo**: "Extensión de Chrome que agrega data de Databam a Portalinmobiliario. Precio/m², propietario, comparables y más."
- **CTA Principal**: "Instalar Extensión (Gratis)"
- **CTA Secundario**: "Ver Demo en Video"

**Columna Derecha**:
- Mockup visual de extensión activa en Portalinmobiliario
- Screenshot con overlay destacando features
- Indicador "Compatible con Chrome/Edge"

---

### Sección: ¿Qué Agrega la Extensión? (4 Features)

#### Feature 1: Precio por m² Real
**Icono**: 📐  
**Título**: "Precio/m² Calculado"  
**Descripción**: Muestra el precio por metro cuadrado real basado en avalúo fiscal y datos de transacciones comparables. Detecta si el precio publicado está sobre/bajo mercado.

**Visual**: Badge en esquina superior del aviso con:
```
💰 $45.000/m²
▲ 12% sobre mercado
```

---

#### Feature 2: Propietario y Contacto
**Icono**: 👤  
**Título**: "Dueño Verificado"  
**Descripción**: Identifica al propietario real de la propiedad cruzando rol de avalúo con data del Conservador de Bienes Raíces. Evita intermediarios fantasma.

**Visual**: Panel lateral con:
```
👤 Propietario: JUAN PÉREZ GONZÁLEZ
📧 Contacto: [Solicitar]
🏢 Tipo: Persona Natural
✓ Verificado con CBR
```

---

#### Feature 3: Propiedades Comparables
**Icono**: 🏘️  
**Título**: "Comparables en 500m"  
**Descripción**: Muestra 5-10 propiedades similares vendidas en los últimos 12 meses en un radio de 500 metros. Incluye precio de venta real.

**Visual**: Mini-mapa con pins + lista de cards:
```
🏠 Depto 2D+1B, 65m² → $95M (Vendido Feb 2024)
🏠 Depto 2D+2B, 72m² → $105M (Vendido Ene 2024)
```

---

#### Feature 4: Capa de Información Databam
**Icono**: 📊  
**Título**: "Datos del Barrio"  
**Descripción**: Overlay con data de la zona: plusvalía histórica, proyectos de construcción cercanos, índices de seguridad, colegios, metros más cercano.

**Visual**: Acordeón con secciones:
```
📈 Plusvalía (5 años): +28%
🏗️ Proyectos: 2 edificios en construcción a 300m
🚇 Metro: L3 Plaza Egaña a 800m (7 min caminando)
🏫 Colegios: Colegio X (★★★★☆) a 400m
```

---

### Sección: Cómo Funciona (3 Pasos)

#### Paso 1: Instala la Extensión
**Icono**: 📥  
**Descripción**: Descarga gratis desde Chrome Web Store. Compatible con Chrome y Edge.

#### Paso 2: Navega Portalinmobiliario
**Icono**: 🔍  
**Descripción**: La extensión detecta automáticamente cuando estás viendo un aviso inmobiliario.

#### Paso 3: Ve la Data Enriquecida
**Icono**: ✨  
**Descripción**: Badges y paneles aparecen automáticamente con información de Databam.

---

### Testimonios (3 Quote Cards)

**Testimonio 1**:
> "Compré mi depto después de ver que el precio/m² estaba 15% bajo mercado. La extensión me ahorró meses de investigación."  
> — *María Fernanda, Inversionista*

**Testimonio 2**:
> "Finalmente pude contactar directo al dueño y negociar sin corredora. Me ahorré la comisión."  
> — *Carlos Muñoz, Comprador*

**Testimonio 3**:
> "Los comparables me ayudaron a hacer una oferta competitiva. Cerré la compra en 2 semanas."  
> — *Rodrigo Silva, PropTech Enthusiast*

---

## 🔗 CTAs y Conversión

### CTA Principal
**Texto**: "Instalar Extensión (Gratis)"  
**Acción**: Redireccionar a Chrome Web Store  
**Destino**: `https://chrome.google.com/webstore/detail/just-city-companion/[ID]`

### CTA Secundario
**Texto**: "Ver Demo en Video"  
**Acción**: Modal con video embebido (YouTube/Vimeo)  
**Duración**: 2 min explicando features

### CTA Terciario (Footer)
**Texto**: "Reportar un Bug"  
**Destino**: Form de soporte o email a `support@justdev.it`

---

## 🛠️ Especificaciones Técnicas

### Tecnologías de la Extensión
**Frontend**:
- Vanilla JavaScript (o TypeScript)
- Manifest V3 (última versión de Chrome Extensions)
- Content Scripts para inyectar UI en Portalinmobiliario
- Background Service Worker para API calls

**Comunicación con Backend**:
- Fetch API a endpoints de Databam
- Caché local (IndexedDB) para reducir latency
- Autenticación con API key del usuario (post-registro)

**UI Components**:
- Shadow DOM para aislar estilos
- CSS-in-JS para evitar conflictos con Portalinmobiliario
- Animaciones sutiles (fade-in de badges)

### Arquitectura

```
┌─────────────────────────────────────────────┐
│  PORTALINMOBILIARIO.COM                     │
│  (DOM Original)                             │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │ Content Script (just-city.js)         │ │
│  │ - Detecta URL de aviso                │ │
│  │ - Extrae rol de avalúo                │ │
│  │ - Inyecta badges y paneles            │ │
│  └───────────┬───────────────────────────┘ │
│              │                              │
└──────────────┼──────────────────────────────┘
               │
               │ API Request
               ▼
┌─────────────────────────────────────────────┐
│  DATABAM API                                │
│  GET /api/v1/properties/{rol}               │
│  → {precio_m2, propietario, comparables}    │
└─────────────────────────────────────────────┘
```

### Endpoints de Databam Utilizados
```
GET /api/v1/properties/{rol}/enriched
→ Retorna: precio/m², propietario, comparables, datos barrio

GET /api/v1/comparables?lat={lat}&lng={lng}&radius=500
→ Retorna: 10 propiedades comparables en 500m

GET /api/v1/neighborhoods/{comuna}/stats
→ Retorna: plusvalía, proyectos, POIs (metro, colegios)
```

---

## 📊 KPIs y Métricas de Éxito

### Objetivos de Instalación
- **Installs**: 1,000 usuarios en primer mes
- **MAU (Monthly Active Users)**: 60% de installs (600 usuarios activos)
- **Conversión Databam**: 10% de usuarios de extensión se registran en Databam

### Métricas a Trackear (Google Analytics + Mixpanel)
- Número de instalaciones
- Páginas enriquecidas por usuario/mes
- Click-through rate en CTAs ("Solicitar Contacto", etc.)
- Tasa de desinstalación (churn)
- Bugs reportados por versión

---

## 🎬 Interacciones y Animaciones

### Aparición de Badges
- Fade-in suave (300ms) cuando carga la página
- Posición: esquina superior derecha del aviso
- Efecto pulse sutil para llamar atención

### Panel Lateral
- Slide-in desde la derecha (400ms)
- Acordeón para secciones expandibles
- Botón de cierre (X) en esquina

### Loading States
- Skeleton loaders mientras carga data de API
- Spinner en badges si latency > 1s

---

## 🔍 SEO y Metadata (Landing Page)

### Meta Tags
```html
<title>Just City Companion - Extensión Chrome para Portalinmobiliario</title>
<meta name="description" content="Extensión de Chrome que agrega precio/m², propietario y comparables a Portalinmobiliario. Data de Databam para comprar propiedades informado.">
<meta name="keywords" content="extensión Chrome inmobiliaria, Portalinmobiliario, precio m2, propietario propiedad, comparables Chile">
```

### Open Graph (para compartir en RRSS)
```html
<meta property="og:title" content="Just City Companion - Compra con Data Real">
<meta property="og:description" content="Extensión que enriquece Portalinmobiliario con precio/m², propietario y comparables.">
<meta property="og:image" content="/images/city-companion-og.jpg">
```

---

## 📐 Wireframe Conceptual

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + Badge "Just City Companion"            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO (2 Columnas)                                      │
│  ┌─────────────────────┬─────────────────────────┐     │
│  │ Título + Subtítulo  │ Mockup de Extensión     │     │
│  │ [Instalar Ext]      │ (Screenshot visual)     │     │
│  │ [Ver Demo]          │                         │     │
│  └─────────────────────┴─────────────────────────┘     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  4 FEATURES (Grid 2x2)                                  │
│  ┌───────────┬───────────┐                             │
│  │ Precio/m² │ Propietario│                            │
│  ├───────────┼───────────┤                             │
│  │Comparables│ Capa Info │                             │
│  └───────────┴───────────┘                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CÓMO FUNCIONA (3 Pasos con Números)                   │
│  ① Instala  →  ② Navega  →  ③ Ve Data                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  TESTIMONIOS (3 Quote Cards)                            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CTA FINAL                                              │
│  "Empieza a comprar informado hoy"                     │
│  [Instalar Extensión Gratis]                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

### Landing Page
- [ ] Diseño visual completo (Figma/mockup)
- [ ] Hero con mockup de extensión activa
- [ ] 4 feature cards con iconos
- [ ] Sección "Cómo Funciona" con 3 pasos
- [ ] 3 testimonios con avatars
- [ ] Video demo embebido
- [ ] CTAs con tracking de conversión

### Extensión de Chrome
- [ ] Manifest V3 configurado
- [ ] Content script que detecta Portalinmobiliario
- [ ] Parser de DOM para extraer rol de avalúo
- [ ] Integración con API de Databam
- [ ] UI components (badges, panel lateral)
- [ ] Caché local con IndexedDB
- [ ] Manejo de errores y estados de carga
- [ ] Tests E2E con Puppeteer
- [ ] Publicación en Chrome Web Store
- [ ] Sistema de analytics (GA/Mixpanel)

---

## 📌 Notas Adicionales

### Consideraciones Legales
- **Scraping**: La extensión NO scrapea Portalinmobiliario, solo lee el DOM público
- **Términos de Uso**: Verificar que inyectar UI no viola ToS de Portalinmobiliario
- **Privacidad**: No se recolecta data personal sin consentimiento
- **Disclaimer**: "Data de Databam, no afiliado a Portalinmobiliario"

### Diferenciadores
- **Primera extensión chilena** para enriquecimiento de propiedades
- **Data verificada** (CBR, SII) vs estimaciones
- **Gratis** (vs competencia que cobra)

### Riesgos Técnicos
- **Cambios en DOM de Portalinmobiliario**: Requiere mantención continua
- **Rate Limiting de Databam API**: Implementar caché agresivo
- **Latency**: Minimizar tiempo de carga con lazy loading

### Roadmap Futuro
- **Q1 2026**: Soporte para Yapo.cl y TocToc.com
- **Q2 2026**: Versión móvil (Android/iOS)
- **Q3 2026**: Alertas de propiedades nuevas que cumplen criterios
- **Q4 2026**: Exportar comparables a PDF para negociación
