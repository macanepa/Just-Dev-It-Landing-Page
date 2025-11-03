# 📐 ARQUITECTURA DE SECCIONES - JUST DEV IT

## 🎯 OBJETIVO GENERAL

Crear **9 mini-páginas independientes** (secciones) para Just Dev It, cada una con:
- **Identidad visual propia** mediante paletas de color específicas
- **Estructura de contenido completa** y optimizada para conversión
- **Sistema de navegación intuitivo** (Launcher + Mega-menú)
- **Componentes reutilizables** y escalables
- **SEO y accesibilidad** de nivel producción

---

## 📊 ANÁLISIS DEL SISTEMA ACTUAL

### ✅ Assets y Recursos Disponibles

**Tipografías:**
- `Poppins` (headings): 300, 400, 500, 600, 700, 800
- `Manrope` (body): 200, 300, 400, 500, 600, 700, 800
- `Fira Code` (code): 400, 500, 600

**Variables CSS Core:**
- Espaciados: `--space-{1-32}` (4px a 128px)
- Radios: `--radius-{sm,md,lg,xl,2xl,full}`
- Sombras: `--shadow-{sm,md,lg,xl,2xl,brand}`
- Transiciones: `--transition-{fast,base,slow,smooth}`
- Breakpoints: 375px, 640px, 768px, 1024px, 1280px, 1536px

**Logos y Marca:**
- `/assets/Just Dev It/Isotipo/` → Isotipo_blanco.svg, Isotipo_morado.svg, Isotipo_Verde.svg
- `/assets/Just Dev It/Logo/` → Logo principal en PNG y SVG
- `/assets/images/Desktop/logo-principal-blanco.svg`

**Componentes Existentes:**
- Cards (card, project-card, service-card, stat-card)
- Buttons (btn-primary, btn-secondary, btn-outline)
- Navigation (nav-header, nav-menu)
- Slider (Swiper-based)
- Forms (contact forms)

---

## 🎨 SISTEMA DE THEMING

### Implementación con `data-theme` attribute

```html
<html data-theme="databam">
<!-- o tools, energy, data, city, investing, finance, ai, logistics -->
```

### Variables CSS por Sección

**Base (compartidas):**
```css
:root {
  --bg: #0f1020;
  --surface: #141527;
  --text: #e6e7ee;
  --muted: #9aa3af;
  --stroke: #2a2b3f;
  
  /* Mantener del sistema actual */
  --font-primary: 'Poppins';
  --font-secondary: 'Manrope';
  --radius: 16px;
  --shadow: 0 8px 24px rgba(0,0,0,.25);
  --gutter: 24px;
  --grid-max: 1200px;
}
```

**Paletas específicas (9 themes):**

```css
/* 1. DATABAM */
[data-theme="databam"] {
  --primary: #6B2CF5;
  --secondary: #2EC5FF;
  --accent: #F9C23C;
  --gradient: linear-gradient(135deg, #6B2CF5 0%, #2EC5FF 100%);
}

/* 2. JUST TOOLS */
[data-theme="tools"] {
  --primary: #06B6D4;
  --secondary: #22C55E;
  --accent: #F59E0B;
  --gradient: linear-gradient(135deg, #06B6D4 0%, #22C55E 100%);
}

/* 3. JUST ENERGY */
[data-theme="energy"] {
  --primary: #1479FF;
  --secondary: #00E0FF;
  --accent: #7DD3FC;
  --gradient: linear-gradient(135deg, #1479FF 0%, #00E0FF 100%);
}

/* 4. JUST DATA */
[data-theme="data"] {
  --primary: #4338CA;
  --secondary: #06B6D4;
  --accent: #84CC16;
  --gradient: linear-gradient(135deg, #4338CA 0%, #06B6D4 100%);
}

/* 5. JUST CITY COMPANION */
[data-theme="city"] {
  --primary: #8B5CF6;
  --secondary: #10B981;
  --accent: #F43F5E;
  --gradient: linear-gradient(135deg, #8B5CF6 0%, #10B981 100%);
}

/* 6. JUST INVESTING */
[data-theme="investing"] {
  --primary: #16A34A;
  --secondary: #0EA5E9;
  --accent: #F4C430;
  --gradient: linear-gradient(135deg, #16A34A 0%, #0EA5E9 100%);
}

/* 7. JUST FINANCE */
[data-theme="finance"] {
  --primary: #1E293B;
  --secondary: #14B8A6;
  --accent: #A78BFA;
  --gradient: linear-gradient(135deg, #1E293B 0%, #14B8A6 100%);
}

/* 8. JUST AI */
[data-theme="ai"] {
  --primary: #7C3AED;
  --secondary: #EC4899;
  --accent: #22D3EE;
  --gradient: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
}

/* 9. JUST LOGISTICS */
[data-theme="logistics"] {
  --primary: #F97316;
  --secondary: #0EA5E9;
  --accent: #22C55E;
  --gradient: linear-gradient(135deg, #F97316 0%, #0EA5E9 100%);
}
```

---

## 🧩 COMPONENTES TRANSVERSALES

### 1. **Section Wrapper** (`<section class="section-wrapper">`)
- Container con padding responsive
- Background con gradiente sutil del theme
- Max-width 1400px centrado

### 2. **Hero Template** (`<div class="hero-section">`)
- Badge/tag con categoría
- H1 con gradient text (usa `--gradient`)
- Subtítulo (1-2 líneas)
- CTA primario + secundario (opcional)
- Mockup/imagen (opcional)

### 3. **Card Genérica** (`<div class="card">`)
- Border con `--primary` al 20% opacity
- Hover: lift + glow con color del theme
- Icon slot (SVG inline, usa `currentColor`)
- Title, description, tags, CTA

### 4. **Metric/KPI** (`<div class="metric">`)
- Número grande con `--accent`
- Label pequeño en `--muted`
- Hover: pulse animation

### 5. **Tablist** (`<div class="tablist">`)
- Botones con border-bottom activo en `--primary`
- Contenido swappeable
- Navegación por teclado (← →)

### 6. **Chip/Badge** (`<span class="chip">`)
- Pill shape, background `--primary` al 15%
- Text en `--primary`
- Hover: darken

### 7. **Table** (`<table class="data-table">`)
- Header con background `--surface`
- Rows striped con `--stroke` al 5%
- Hover row: background `--primary` al 10%

### 8. **CTA Buttons**
- `.btn-primary` → background `--gradient`, text white
- `.btn-secondary` → outline `--secondary`, fill on hover
- `.btn-ghost` → transparent, underline on hover

### 9. **Breadcrumb** (`<nav class="breadcrumb">`)
- Home > Sección actual
- Links en `--muted`, current en `--text`

---

## 📄 ESTRUCTURA DE CONTENIDO POR SECCIÓN

### 🟣 1. DATABAM (databam/index.html)

**Theme:** `data-theme="databam"`  
**Paleta:** Primario #6B2CF5, Secundario #2EC5FF, Énfasis #F9C23C

**Estructura:**

```
├── Hero
│   ├── Logo Databam (custom)
│   ├── Badge: "PropTech Analytics"
│   ├── H1: "La plataforma de data inmobiliaria más completa de Chile"
│   ├── Resumen (2-3 bullets):
│   │   • +500K propiedades con precios de transacción
│   │   • Histórico completo + propietarios
│   │   • API en tiempo real para desarrolladores
│   ├── Mockup/screenshot plataforma
│   └── CTA: "Ir a Databam →" (https://databam.cl)
│
├── Bloque "¿Qué resuelve?" (3 cards)
│   ├── Card 1: "Valuación Precisa" → Precios reales de transacción
│   ├── Card 2: "Análisis de Mercado" → Comparables, tendencias
│   └── Card 3: "Due Diligence" → Propietarios, deudas, hipotecas
│
├── Bloque "Módulos" (grid 2x3)
│   ├── Buscador Avanzado
│   ├── Mapas Interactivos
│   ├── Dashboard Ejecutivo
│   ├── Alertas Automatizadas
│   ├── Exportación Data
│   └── Integraciones API
│
├── Bloque "En números" (4 KPIs)
│   ├── 500K+ Propiedades
│   ├── 15 años Histórico
│   ├── 99.9% Uptime
│   └── API REST
│
└── CTAs finales
    ├── Primario: "Ir a Databam →" (external)
    └── Secundario: "Solicitar demo"
```

**SEO:**
- Title: "Databam | Plataforma de Data Inmobiliaria Chile | Just Dev It"
- Description: "Accede a +500K propiedades con precios reales de transacción, propietarios y histórico completo. La data inmobiliaria más confiable de Chile."
- Keywords: databam, data inmobiliaria chile, proptech, valuación propiedades, api inmobiliaria

---

### 🔧 2. JUST TOOLS (tools/index.html)

**Theme:** `data-theme="tools"`  
**Paleta:** Primario #06B6D4, Secundario #22C55E, Énfasis #F59E0B

**Estructura:**

```
├── Hero
│   ├── Badge: "Dev Utilities"
│   ├── H1: "Herramientas que Simplifican tu Día"
│   ├── Subtítulo: "Generadores, conversores y viewers sin instalación"
│   └── CTA: "Explorar herramientas"
│
└── Grid de Herramientas (cards)
    ├── Generador QR
    │   ├── Icon: QR code
    │   ├── Copy: "Genera códigos QR personalizados"
    │   └── CTA: "Abrir herramienta"
    │
    ├── JSON Viewer
    │   ├── Icon: Brackets
    │   ├── Copy: "Visualiza y formatea JSON fácilmente"
    │   └── CTA: "Abrir herramienta"
    │
    ├── PDF → Excel
    │   ├── Icon: File transfer
    │   ├── Copy: "Convierte PDFs con tablas a Excel"
    │   └── CTA: "Abrir herramienta"
    │
    ├── Image Editor
    │   ├── Icon: Image
    │   ├── Copy: "Recorta, redimensiona, optimiza"
    │   └── CTA: "Abrir herramienta"
    │
    ├── DWG Viewer
    │   ├── Icon: Blueprint
    │   ├── Copy: "Visualiza archivos CAD en el navegador"
    │   └── CTA: "Abrir herramienta"
    │
    ├── Convertidor Divisas
    │   ├── Icon: Currency
    │   ├── Copy: "Tipos de cambio en tiempo real"
    │   └── CTA: "Abrir herramienta"
    │
    └── Convertidor Hora UTC/Local
        ├── Icon: Clock
        ├── Copy: "Convierte zonas horarias al instante"
        └── CTA: "Abrir herramienta"
```

**SEO:**
- Title: "Just Tools | Herramientas Online Gratuitas | Just Dev It"
- Description: "Generador QR, JSON Viewer, PDF a Excel, Image Editor y más. Herramientas web rápidas y sin instalación."
- Keywords: herramientas online, generador qr, json viewer, convertidor pdf excel

---

### ⚡ 3. JUST ENERGY (energy/index.html)

**Theme:** `data-theme="energy"`  
**Paleta:** Primario #1479FF, Secundario #00E0FF, Énfasis #7DD3FC

**Estructura:**

```
├── Hero
│   ├── Badge: "Sector Energético"
│   ├── H1: "Data Eléctrica de Chile en tu Dashboard"
│   ├── Subtítulo: "Costos marginales, SCADA, DGA y más"
│   └── CTA: "Ver casos de uso"
│
├── Tablist (2 tabs)
│   ├── Tab 1: "Data Diferida (Free)"
│   │   ├── Costos marginales históricos
│   │   ├── Datos DGA (caudales, niveles embalses)
│   │   └── Reportes mensuales
│   │
│   └── Tab 2: "Tiempo Real (Pro)"
│       ├── SCADA en vivo
│       ├── Alertas automatizadas
│       └── API con 99.9% uptime
│
├── Bloque "Casos de Uso" (3 cards)
│   ├── Card 1: "Visor de Data" → Dashboard ejecutivo para generadoras
│   ├── Card 2: "Automatización Tickets DGA" → RPA para trámites
│   └── Card 3: "Integración API Custom" → Conecta con tu ERP
│
└── CTA final: "Cotizar implementación"
```

**SEO:**
- Title: "Just Energy | Data Energética Chile | Costos Marginales y SCADA"
- Description: "Acceso a data del sector eléctrico chileno: costos marginales, SCADA, DGA. Dashboards y APIs para generadoras y comercializadoras."
- Keywords: data energética chile, costos marginales, scada, dga automatización

---

### 📊 4. JUST DATA (data/index.html)

**Theme:** `data-theme="data"`  
**Paleta:** Primario #4338CA, Secundario #06B6D4, Énfasis #84CC16

**Estructura:**

```
├── Hero
│   ├── Badge: "Datasets Públicos"
│   ├── H1: "Catálogo de Datos Listos para Usar"
│   ├── Subtítulo: "Bases de datos chilenas procesadas y actualizadas"
│   └── CTA: "Explorar catálogo"
│
└── Grid de Datasets (cards con preview)
    ├── Rutificador
    │   ├── Tag: "SII" | Size: "1.2M registros"
    │   ├── Preview: Tabla con RUTs de ejemplo
    │   └── CTA: "Ver muestra" / "Solicitar API"
    │
    ├── Nómina Contribuyentes
    │   ├── Tag: "SII" | Size: "500K empresas"
    │   ├── Preview: Empresas + representantes legales
    │   └── CTA: "Ver muestra" / "Solicitar API"
    │
    ├── Propiedades con Deuda (vínculo Databam)
    │   ├── Tag: "Databam" | Size: "100K propiedades"
    │   ├── Preview: Hipotecas, deudas, gravámenes
    │   └── CTA: "Ver en Databam →"
    │
    ├── Data Poder Judicial
    │   ├── Tag: "PJUD" | Size: "2M causas"
    │   ├── Preview: Histórico de causas civiles/penales
    │   └── CTA: "Ver muestra" / "Solicitar API"
    │
    └── Data INE
        ├── Tag: "INE" | Size: "Varios datasets"
        ├── Preview: Censos, empleo, vivienda
        └── CTA: "Ver muestra" / "Solicitar API"
```

**SEO:**
- Title: "Just Data | Datasets Chile | APIs y Bases de Datos"
- Description: "Catálogo de datasets chilenos: RUTs, contribuyentes, poder judicial, INE. Data procesada lista para integrar."
- Keywords: datasets chile, api rut, nómina contribuyentes, data pjud, data ine

---

### 🏙️ 5. JUST CITY COMPANION (city/index.html)

**Theme:** `data-theme="city"`  
**Paleta:** Primario #8B5CF6, Secundario #10B981, Énfasis #F43F5E

**Estructura:**

```
├── Hero
│   ├── Badge: "Chrome Extension"
│   ├── H1: "Compra Mejor con Data Real"
│   ├── Subtítulo: "Extensión para Portal Inmobiliario con datos de Databam"
│   ├── Mockup: Screenshot de la extensión en acción
│   └── CTA: "Agregar a Chrome" (Chrome Web Store)
│
├── Bloque "Qué verás en Portal Inmobiliario"
│   ├── Feature 1: "Precio/m² real" (histórico transacciones)
│   ├── Feature 2: "Propietario actual" (registro CBR)
│   ├── Feature 3: "Comparables" (propiedades similares vendidas)
│   └── Feature 4: "Capa Databam" (deudas, hipotecas, plusvalía)
│
├── Bloque "Cómo funciona" (3 pasos)
│   ├── Paso 1: Instala la extensión
│   ├── Paso 2: Navega Portal Inmobiliario
│   └── Paso 3: Ve data real automáticamente
│
└── CTA final: "Agregar a Chrome" (external link)
```

**SEO:**
- Title: "Just City Companion | Extensión Chrome para Inmobiliario"
- Description: "Extensión de Chrome que muestra precios reales, propietarios y comparables en Portal Inmobiliario. Powered by Databam."
- Keywords: extensión inmobiliaria, portal inmobiliario, precio m2 real, databam chrome

---

### 💹 6. JUST INVESTING (investing/index.html)

**Theme:** `data-theme="investing"`  
**Paleta:** Primario #16A34A, Secundario #0EA5E9, Énfasis #F4C430 (dorado)

**Estructura:**

```
├── Hero
│   ├── Badge: "FinTech Tools"
│   ├── H1: "Invierte con Data, no con Intuición"
│   ├── Subtítulo: "Herramientas de análisis financiero y portafolios"
│   ├── Buscador: Input grande para buscar activos
│   └── CTA: "Explorar herramientas"
│
├── Sección: Comparador de Vehículos
│   ├── Descripción: Compara acciones, ETFs, fondos mutuos side-by-side
│   ├── Features: Rendimiento, volatilidad, Sharpe, correlación
│   └── CTA: "Probar comparador"
│
├── Sección: Generador de Portafolios (Auto)
│   ├── Descripción: Algoritmo de optimización automática (Markowitz)
│   ├── Inputs: Monto, perfil de riesgo, horizonte
│   └── CTA: "Generar mi portafolio"
│
├── Sección: Valores Cuota Diarios CMF
│   ├── Descripción: Todos los fondos mutuos de Chile actualizados diariamente
│   ├── Preview: Tabla con top fondos + rentabilidad
│   └── CTA: "Ver tabla completa"
│
├── Sección: Acciones Chile
│   ├── Descripción: IPSA + Small Caps con datos históricos
│   ├── Preview: Tabla con precios, P/E, dividend yield
│   └── CTA: "Analizar acciones"
│
└── Sección: Divisas
    ├── Descripción: USD, EUR, UF, UTM actualizados en tiempo real
    ├── Preview: Gráfico histórico
    └── CTA: "Ver convertidor"
```

**SEO:**
- Title: "Just Investing | Herramientas Financieras Chile | Portafolios y Análisis"
- Description: "Comparador de activos, generador de portafolios automático, valores cuota CMF, acciones IPSA. Herramientas fintech para inversionistas chilenos."
- Keywords: herramientas inversión chile, portafolio automático, valores cuota cmf, acciones ipsa

---

### 💼 7. JUST FINANCE (finance/index.html)

**Theme:** `data-theme="finance"`  
**Paleta:** Primario #1E293B, Secundario #14B8A6, Énfasis #A78BFA

**Estructura:**

```
├── Hero
│   ├── Badge: "Business Finance"
│   ├── H1: "Automatiza las Finanzas de tu Negocio"
│   ├── Subtítulo: "Modelos, reportes y dashboards sin Excel manual"
│   └── CTA: "Ver soluciones"
│
├── Bloque: Modelos Financieros
│   ├── Estado de Resultados (ER)
│   ├── Flujo de Caja Libre (FCF)
│   ├── Proyecciones 3-5 años
│   ├── Sensibilidad y escenarios
│   └── CTA: "Armar mi modelo"
│
├── Bloque: Estados & Reportería
│   ├── Consolidación automática multi-entidad
│   ├── IFRS / Chilean GAAP
│   ├── Reportes gerenciales configurables
│   ├── Alertas y KPIs en tiempo real
│   └── CTA: "Implementar reportería"
│
├── Bloque: Finanzas Personales
│   ├── Sube tus cartolas bancarias
│   ├── Categorización automática con IA
│   ├── Dashboard con gastos, ingresos, ahorros
│   ├── Proyecciones de patrimonio
│   └── CTA: "Cargar mis cartolas"
│
└── CTA final: "Agendar consultoría"
```

**SEO:**
- Title: "Just Finance | Automatización Financiera para Empresas | Chile"
- Description: "Modelos financieros automatizados, reportería IFRS, dashboards ejecutivos. Finanzas empresariales y personales sin Excel manual."
- Keywords: automatización financiera, modelos financieros chile, reportería ifrs, dashboard finanzas

---

### 🤖 8. JUST AI (ai/index.html)

**Theme:** `data-theme="ai"`  
**Paleta:** Primario #7C3AED, Secundario #EC4899, Énfasis #22D3EE

**Estructura:**

```
├── Hero
│   ├── Badge: "IA Aplicada"
│   ├── H1: "Agentes que Trabajan por Ti"
│   ├── Subtítulo: "Automatización inteligente con GPT-4, Claude y Gemini"
│   └── CTA: "Conocer agentes"
│
├── Showcase de Agentes (4 cards expandibles)
│   ├── Agente Inmobiliario (Transacciones CL)
│   │   ├── Descripción: Responde consultas con data real de Databam
│   │   ├── Features: RAG con precios, propietarios, comparables
│   │   ├── Demo: Chat interactivo de ejemplo
│   │   └── CTA: "Probar agente"
│   │
│   ├── Agente Cotizador
│   │   ├── Descripción: Genera cotizaciones automáticas desde PDFs/emails
│   │   ├── Features: OCR, extracción de datos, output Excel/PDF
│   │   └── CTA: "Ver demo"
│   │
│   ├── Email Agent
│   │   ├── Descripción: Responde emails automáticamente con contexto
│   │   ├── Features: Triaje, priorización, drafts
│   │   └── CTA: "Integrar"
│   │
│   └── Content Agent
│       ├── Descripción: Genera contenido SEO-optimizado
│       ├── Features: Blogs, social media, newsletters
│       └── CTA: "Generar contenido"
│
├── Bloque "Cómo funciona"
│   ├── Paso 1: Definimos tu caso de uso
│   ├── Paso 2: Entrenamos/configuramos el agente
│   ├── Paso 3: Integras en tu workflow
│   └── Paso 4: Monitoreo y mejora continua
│
└── CTA final: "Diseñar mi agente a medida"
```

**SEO:**
- Title: "Just AI | Agentes de IA para Empresas | Automatización Inteligente"
- Description: "Agentes de IA custom con GPT-4, Claude, Gemini. Automatización de emails, cotizaciones, contenido y más. IA aplicada a tu negocio."
- Keywords: agentes ia chile, automatización ia, gpt-4 empresas, claude api, rag ia

---

### 📦 9. JUST LOGISTICS (logistics/index.html)

**Theme:** `data-theme="logistics"`  
**Paleta:** Primario #F97316, Secundario #0EA5E9, Énfasis #22C55E

**Estructura:**

```
├── Hero
│   ├── Badge: "E-commerce & Ops"
│   ├── H1: "Vende Más, Opera Mejor"
│   ├── Subtítulo: "Integración completa de pasarelas, stock, OMS/WMS"
│   └── CTA: "Ver soluciones"
│
├── Bloque: Integraciones de Pago
│   ├── Webpay/Transbank (Chile)
│   ├── Flow, Mercado Pago, Stripe
│   ├── Suscripciones recurrentes
│   ├── Checkout one-click
│   └── CTA: "Integrar pasarela"
│
├── Bloque: Gestión de Stock
│   ├── Sincronización multi-canal (Shopify, WordPress, Jumpseller)
│   ├── Alertas de stock bajo
│   ├── Trazabilidad lote/serie
│   ├── Inventario en tiempo real
│   └── CTA: "Sincronizar mi stock"
│
├── Bloque: OMS/WMS a Medida
│   ├── Order Management System personalizado
│   ├── Warehouse Management con barcode/RFID
│   ├── Picking, packing, shipping automatizado
│   ├── Integración con couriers (Chilexpress, Starken, Blue)
│   └── CTA: "Cotizar OMS/WMS"
│
├── Bloque: Conectores Marketplace
│   ├── Mercado Libre, Amazon, Falabella
│   ├── Publicación masiva de productos
│   ├── Sincronización de órdenes y stock
│   └── CTA: "Conectar marketplace"
│
└── CTA final: "Planificar mi implementación"
```

**SEO:**
- Title: "Just Logistics | E-commerce y Logística para Chile | OMS/WMS"
- Description: "Integraciones de pago (Webpay, Flow, Stripe), gestión de stock multi-canal, OMS/WMS a medida. Full e-commerce para Chile."
- Keywords: integraciones ecommerce chile, webpay api, oms wms chile, sincronización stock shopify

---

## 🚀 LAUNCHER Y NAVEGACIÓN

### Launcher (FAB + Command Palette)

**Funcionalidad:**
- **FAB (Floating Action Button):** Botón circular con isotipo Just Dev It, sticky bottom-right
- **Command Palette:** Modal que se abre al click en FAB o con atajo `Ctrl/Cmd + K`
- **Búsqueda:** Input grande arriba del modal con placeholder "Buscar sección..."
- **Grid de secciones:** 3 columnas (desktop) / 1 columna (mobile)
- **Navegación por teclado:** `↑` `↓` `Enter` para seleccionar, `Esc` para cerrar
- **Persistencia:** LocalStorage guarda última sección visitada

**Estructura de cada card del launcher:**
```html
<div class="launcher-card" data-section="databam">
  <div class="launcher-icon" style="color: var(--primary)">
    <!-- SVG inline del ícono -->
  </div>
  <div class="launcher-info">
    <h4>Just Databam</h4>
    <p>Data inmobiliaria de Chile</p>
  </div>
  <kbd class="launcher-shortcut">⌘1</kbd>
</div>
```

**Atajos de teclado:**
- `Ctrl/Cmd + K` → Abrir launcher
- `Esc` → Cerrar launcher
- `⌘/Ctrl + 1-9` → Ir directo a sección (opcional)

**Archivos:**
- `js/components/launcher.js` (vanilla JS)
- `css/components/launcher.css`

---

### Mega-menú en Navbar

**Ubicación:** En el navbar actual, agregar ítem "Soluciones" entre "Servicios" y "Portafolio"

**Comportamiento:**
- Desktop: Hover muestra dropdown con 9 secciones en grid 3x3
- Mobile: Click expande acordeón dentro del hamburger menu

**Estructura del dropdown:**
```html
<li class="nav-item nav-dropdown">
  <button class="nav-link">Soluciones ▾</button>
  <div class="mega-menu">
    <div class="mega-menu-grid">
      <a href="/databam" class="mega-menu-item">
        <div class="mega-menu-icon" style="color: #6B2CF5">🟣</div>
        <div>
          <h5>Databam</h5>
          <p>Data inmobiliaria</p>
        </div>
      </a>
      <!-- Repetir para las 9 secciones -->
    </div>
  </div>
</li>
```

**Archivos:**
- Modificar `css/components/navigation.css` (añadir `.mega-menu`)
- Modificar `js/components/navigation.js` (añadir lógica hover/click)

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
/
├── databam/
│   └── index.html
├── tools/
│   └── index.html
├── energy/
│   └── index.html
├── data/
│   └── index.html
├── city/
│   └── index.html
├── investing/
│   └── index.html
├── finance/
│   └── index.html
├── ai/
│   └── index.html
├── logistics/
│   └── index.html
│
├── css/
│   ├── core/
│   │   ├── themes.css (NUEVO - 9 themes)
│   │   ├── variables.css (existente)
│   │   └── typography.css (existente)
│   │
│   └── components/
│       ├── sections/
│       │   ├── section-wrapper.css (NUEVO)
│       │   ├── hero-template.css (NUEVO)
│       │   ├── metric.css (NUEVO)
│       │   ├── tablist.css (NUEVO)
│       │   ├── chip.css (NUEVO)
│       │   └── data-table.css (NUEVO)
│       │
│       ├── launcher.css (NUEVO)
│       ├── breadcrumb.css (NUEVO)
│       ├── cards.css (existente - extender)
│       ├── navigation.css (existente - modificar mega-menu)
│       └── button-fix.css (existente)
│
├── js/
│   └── components/
│       ├── launcher.js (NUEVO)
│       ├── section-nav.js (NUEVO - navegación secciones)
│       ├── analytics-sections.js (NUEVO - tracking)
│       └── theme-switcher.js (NUEVO - aplica data-theme)
│
└── assets/
    └── icons/
        └── sections/ (NUEVO - iconos SVG para cada sección)
            ├── databam.svg
            ├── tools.svg
            ├── energy.svg
            ├── data.svg
            ├── city.svg
            ├── investing.svg
            ├── finance.svg
            ├── ai.svg
            └── logistics.svg
```

---

## ✅ CHECKLIST DE DESARROLLO

### Fase 1: Setup (Componentes Base)
- [ ] Crear `css/core/themes.css` con 9 themes
- [ ] Crear componentes transversales en `css/components/sections/`
- [ ] Crear iconos SVG para las 9 secciones
- [ ] Crear layout HTML base (plantilla reutilizable)

### Fase 2: Launcher y Navegación
- [ ] Desarrollar FAB + Command Palette (HTML/CSS/JS)
- [ ] Implementar búsqueda y navegación por teclado
- [ ] Añadir mega-menú en navbar
- [ ] Implementar persistencia (localStorage)

### Fase 3: Páginas Individuales
- [ ] Databam (databam/index.html)
- [ ] Just Tools (tools/index.html)
- [ ] Just Energy (energy/index.html)
- [ ] Just Data (data/index.html)
- [ ] Just City Companion (city/index.html)
- [ ] Just Investing (investing/index.html)
- [ ] Just Finance (finance/index.html)
- [ ] Just AI (ai/index.html)
- [ ] Just Logistics (logistics/index.html)

### Fase 4: Optimización
- [ ] SEO completo (meta tags, Schema.org, OG)
- [ ] Accesibilidad (WCAG AA, aria-labels, focus management)
- [ ] Analytics (tracking de eventos)
- [ ] Performance (Lighthouse ≥90)
- [ ] Responsive testing (375px, 768px, 1280px+)

### Fase 5: Integración
- [ ] Modificar index.html del landing (añadir FAB + mega-menú)
- [ ] Actualizar sitemap.xml
- [ ] Crear documentación de uso
- [ ] Testing cross-browser (Chrome, Firefox, Safari, Edge)

---

## 🎨 GUÍA DE ESTILOS POR SECCIÓN

### Uso de Colores del Theme

```css
/* En todos los componentes, usar variables CSS: */
.hero-title {
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-primary {
  background: var(--primary);
  border: 2px solid var(--primary);
  color: white;
}

.cta-primary:hover {
  background: var(--secondary);
  border-color: var(--secondary);
}

.card {
  border: 1px solid var(--primary, 0.2); /* 20% opacity */
}

.card:hover {
  box-shadow: 0 10px 40px var(--primary, 0.3);
}
```

### Iconografía

**Estilo:** Lucide icons (SVG inline)  
**Tamaño:** 24px default, 32px en cards, 48px en hero  
**Color:** `currentColor` para heredar del theme

Ejemplo:
```html
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="..."/>
</svg>
```

### Tipografía por Contexto

```css
/* Hero titles */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
}

/* Section titles */
.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
}

/* Card titles */
.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

/* Body text */
.body-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--muted);
}
```

---

## 📊 MÉTRICAS DE ÉXITO

### Performance
- Lighthouse Performance: ≥90
- FCP (First Contentful Paint): <1.5s
- LCP (Largest Contentful Paint): <2.5s
- CLS (Cumulative Layout Shift): <0.1
- TTI (Time to Interactive): <3s

### Accesibilidad
- Lighthouse Accessibility: ≥95
- Contraste WCAG AA: 4.5:1 (texto normal), 3:1 (texto grande)
- Navegación completa por teclado
- Screen reader compatible

### SEO
- Lighthouse SEO: 100
- Meta tags completos en todas las páginas
- Schema.org JSON-LD
- Sitemap actualizado
- Robots.txt configurado

### UX
- Tiempo de carga launcher: <200ms
- Smooth transitions: ≤300ms
- Responsive: 375px - 2560px
- Cross-browser: Chrome, Firefox, Safari, Edge (últimas 2 versiones)

---

## 🔧 TECNOLOGÍAS Y STACK

**Front-end:**
- HTML5 semántico
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Sin frameworks (mantener consistencia con landing actual)

**Dependencias externas (solo si necesario):**
- Swiper.js (si reutilizamos sliders del landing)
- Lucide Icons (CDN para iconos SVG)

**Performance:**
- CSS crítico inline
- Lazy loading de imágenes
- Preconnect a CDNs
- Minificación en producción

**Analytics:**
- Google Analytics (ya configurado en landing)
- Eventos custom: `launcher_open`, `section_view`, `cta_click`

---

## 📝 CONVENCIONES DE CÓDIGO

### HTML
```html
<!-- Estructura semántica -->
<section class="section-wrapper" data-theme="databam">
  <div class="container">
    <header class="section-header">
      <span class="badge">PropTech</span>
      <h2 class="section-title">Título</h2>
    </header>
    <div class="section-content">
      <!-- Contenido -->
    </div>
  </div>
</section>
```

### CSS
```css
/* BEM-like naming */
.component { }
.component__element { }
.component--modifier { }

/* Responsive mobile-first */
.component {
  /* mobile styles */
}

@media (min-width: 768px) {
  .component {
    /* tablet styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* desktop styles */
  }
}
```

### JavaScript
```javascript
// Modular structure
const ComponentName = {
  init() {
    this.bindEvents();
  },
  
  bindEvents() {
    // Event listeners
  },
  
  // Methods
};

// Init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  ComponentName.init();
});
```

---

## 🚨 NOTAS IMPORTANTES

1. **NO MODIFICAR EL LANDING ACTUAL** hasta que todas las páginas estén completas y aprobadas.

2. **RESPETAR BRANDING DE DATABAM:** Databam tiene su propio branding y logo. Usar la paleta provista pero mantener su identidad.

3. **DEEP LINKS:** Todas las secciones deben ser accesibles vía URL directa (`/databam`, `/tools`, etc.). Configurar servidor para manejar estas rutas.

4. **CONTENIDO PLACEHOLDER:** Usar textos reales en español, no "Lorem ipsum". Todos los ejemplos deben ser relevantes al contexto chileno/LATAM.

5. **IMÁGENES Y MOCKUPS:** Usar placeholders con gradientes del theme hasta tener assets reales. Indicar dimensiones óptimas en comentarios HTML.

6. **ACCESIBILIDAD PRIORITARIA:** Todos los componentes interactivos deben ser navegables por teclado. Testear con VoiceOver/NVDA.

7. **MOBILE FIRST:** Diseñar para 375px primero, luego escalar hacia arriba.

8. **PROGRESIVE ENHANCEMENT:** Funcionalidad básica sin JS. Mejorar experiencia con JS habilitado.

---

## 📞 SIGUIENTES PASOS

1. **Revisión de arquitectura** con el equipo ✅ (este documento)
2. **Aprobación de paletas y estructuras** por sección
3. **Desarrollo Fase 1:** Setup y componentes base
4. **Desarrollo Fase 2:** Launcher y navegación
5. **Desarrollo Fase 3:** Páginas individuales (iterativo)
6. **Testing y QA**
7. **Integración final en index.html**
8. **Deploy a staging**
9. **Ajustes post-feedback**
10. **Deploy a producción**

---

**Documento vivo:** Este archivo se actualizará conforme avance el desarrollo.

**Última actualización:** 3 de noviembre de 2025  
**Versión:** 1.0  
**Autor:** GitHub Copilot + Equipo Just Dev It
