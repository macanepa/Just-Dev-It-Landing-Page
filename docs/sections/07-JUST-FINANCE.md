# 07 - Just Finance

## 🎯 Propósito de la Sección
Automatización de finanzas corporativas y personales. Modelos financieros (ER, FCF, proyecciones), estados de resultados automatizados y conversión de cartolas bancarias en dashboards inteligentes.

---

## 🎨 Identidad Visual

### Paleta de Colores
```css
--primary: #1E293B    /* Slate Oscuro */
--secondary: #14B8A6  /* Teal/Turquesa */
--accent: #A78BFA     /* Púrpura Claro */
--gradient: linear-gradient(135deg, #1E293B 0%, #14B8A6 100%)
```

### Tipografía
- **Headings**: Poppins (700-800)
- **Body**: Manrope (400-600)

### Iconografía
- 📐 Modelos / Planificación
- 📊 Reportería / Estados
- 💳 Finanzas Personales
- ⚡ Automatización
- 📈 Proyecciones / Forecasting

---

## 📋 Estructura de Contenido

### Hero Section
**Título**: "Automatiza las Finanzas de tu Negocio"  
**Subtítulo**: "Modelos financieros, estados de resultados y dashboards personales en minutos, no meses."

**Badge**: `Just Finance`

**CTA Principal**: "Armar Modelo ER"  
**CTA Secundario**: "Cargar Cartolas"

---

## 🧩 3 Bloques Principales

### 1. 📐 Modelos Financieros

**Descripción**: Crea modelos financieros profesionales desde plantillas personalizables. Proyecciones de 3-5 años, análisis de sensibilidad y valorización DCF.

**Características**:
- ✓ **Estado de Resultados Proyectado** (3-5 años)
  - Ingresos por línea de negocio
  - Costos variables y fijos
  - EBITDA, EBIT, Utilidad Neta
  - Márgenes automáticos
  
- ✓ **Flujo de Caja Libre (Free Cash Flow)**
  - EBITDA - CAPEX - Δ Working Capital
  - Cálculo de FCF para valorización
  
- ✓ **Balance General Automatizado**
  - Activos, Pasivos, Patrimonio
  - Ratios: Current Ratio, Debt/Equity, ROE
  
- ✓ **Análisis de Sensibilidad**
  - Escenarios: Base, Optimista, Pesimista
  - Variables clave: Crecimiento ingresos, COGS, CAPEX
  
- ✓ **Valorización DCF y Múltiplos**
  - Descuento de FCF con WACC
  - Valor terminal con múltiplo EV/EBITDA
  - Múltiplos comparables: P/E, P/B

**Casos de Uso**:
1. **Emprendimientos**: "Necesito proyectar ingresos para pitch deck"
2. **Pymes**: "¿Mi negocio es rentable en 3 años?"
3. **M&A**: "¿Cuánto vale esta empresa?"

**Inputs del Usuario**:
- Supuestos: Crecimiento ingresos YoY, COGS %, CAPEX anual
- Horizonte: 3, 5 o 10 años
- Plantilla: Startup Tech, Retail, Servicios, Manufactura

**Output Visual**:
- Excel descargable con 3 tabs: ER, Balance, FCF
- Gráficos: Ingresos y Márgenes, FCF, Sensibilidad (tabla 2D)
- Resumen ejecutivo: "Tu negocio vale $XXM CLP con TIR de XX%"

**CTAs**:
- "Armar Modelo ER" → Wizard con inputs
- "Ver Plantillas" → Galería de templates

---

### 2. 📊 Estados & Reportería

**Descripción**: Genera estados financieros y reportes automáticos desde tu data contable. Conexión con ERPs y plataformas contables.

**Características**:
- ✓ **Conexión con ERP y Plataformas Contables**
  - Integraciones: Defontana, Nubox, Buk, SAP, QuickBooks
  - Importar libro mayor, balances, facturas
  
- ✓ **Estado de Resultados Mensual/Trimestral**
  - Generación automática desde transacciones
  - Comparación con período anterior
  - YoY y MoM growth
  
- ✓ **Balance General con Ratios Financieros**
  - Activos, Pasivos, Patrimonio
  - Ratios: Liquidez, Endeudamiento, Rentabilidad
  - Alertas si ratios fuera de rango
  
- ✓ **Cash Flow Statement Automatizado**
  - Actividades de operación, inversión, financiamiento
  - Reconciliación con saldo de caja
  
- ✓ **Exportar a Excel/PDF con Formato Ejecutivo**
  - Logos y branding personalizado
  - Gráficos automáticos
  - Notas explicativas

**Casos de Uso**:
1. **Reportería Mensual**: "Necesito EERR de octubre en 5 minutos"
2. **Auditoría**: "Exportar estados con formato IFRS"
3. **Presentaciones**: "PDF ejecutivo para directorio"

**Inputs del Usuario**:
- Conexión a ERP (API key o CSV upload)
- Período: Mes, Trimestre, Año
- Formato de salida: Excel, PDF, Google Sheets

**Output Visual**:
- Dashboard con EERR, Balance, Cash Flow
- Gráficos: Ingresos vs Gastos, Evolución Patrimonio
- Alertas: "Tu liquidez está bajo el 1.5x recomendado"

**CTAs**:
- "Generar EERR" → Upload CSV o conectar ERP
- "Conectar ERP" → Listado de integraciones

---

### 3. 💳 Finanzas Personales

**Descripción**: Transforma tus cartolas bancarias en un dashboard financiero inteligente. Sube PDFs de cartolas y obtén categorización automática, gráficos y alertas.

**Características**:
- ✓ **Sube PDF de Cartolas**
  - Bancos soportados: Santander, BCI, Itaú, Banco de Chile, Scotiabank
  - OCR con Tesseract o Azure Form Recognizer
  
- ✓ **Extracción Automática con OCR**
  - Fecha, Descripción, Monto, Saldo
  - Detección de ingresos vs gastos
  
- ✓ **Categorización Inteligente de Gastos**
  - Categorías: Comida, Transporte, Hogar, Entretenimiento, Salud, Educación
  - Machine Learning (clasificador entrenado con 10k transacciones)
  - Edición manual si categoría incorrecta
  
- ✓ **Dashboard Interactivo con Gráficos**
  - Gráfico de torta: Gastos por categoría
  - Gráfico de línea: Evolución de saldo
  - Tabla de transacciones con filtros
  
- ✓ **Alertas de Gastos Inusuales y Metas de Ahorro**
  - "Gastaste $150k en Entretenimiento este mes, 30% más que promedio"
  - Metas: "Ahorra $200k/mes para viajar en 6 meses"

**Casos de Uso**:
1. **Control de Gastos**: "¿En qué me gasto la plata?"
2. **Ahorro**: "Quiero ahorrar $2M en 1 año, ¿puedo?"
3. **Presupuesto**: "¿Gasté más de $500k en Comida este mes?"

**Inputs del Usuario**:
- Upload de 1-12 cartolas PDF
- Configurar metas de ahorro (opcional)
- Establecer presupuesto por categoría

**Output Visual**:
- Dashboard con:
  - Resumen: Ingresos, Gastos, Ahorro, Saldo final
  - Gráfico de torta: Gastos por categoría
  - Gráfico de línea: Saldo histórico
  - Tabla: Transacciones con categoría, editable
  - Alertas: Gastos inusuales, progreso de metas

**CTAs**:
- "Cargar Cartolas" → Upload múltiple de PDFs
- "Ver Dashboard Demo" → Demo con data ficticia

---

## 🔗 CTAs y Conversión

### CTAs por Bloque
1. **Modelos**: "Armar Modelo ER" + "Ver Plantillas"
2. **Estados**: "Generar EERR" + "Conectar ERP"
3. **Finanzas Personales**: "Cargar Cartolas" + "Ver Dashboard Demo"

### CTA Final (Footer)
**Texto**: "Empieza a automatizar hoy"  
**Destino**: Formulario de registro con plan gratuito (5 cartolas/mes, 1 modelo ER)

---

## 🛠️ Especificaciones Técnicas

### Stack Tecnológico Sugerido
**Backend**:
- Python (FastAPI) para APIs
- PostgreSQL para data de usuarios
- Celery para procesamiento asíncrono (OCR, modelos)
- S3/MinIO para almacenar PDFs

**Procesamiento de Cartolas**:
- OCR: Tesseract (open-source) o Azure Form Recognizer (cloud)
- Parsing: Regex patterns por banco
- Clasificación: Scikit-learn (Naive Bayes o Random Forest)
- Dataset de entrenamiento: 10k transacciones etiquetadas manualmente

**Modelos Financieros**:
- Plantillas Excel con fórmulas (openpyxl para Python)
- Cálculos DCF: `numpy-financial` para NPV, IRR
- Generación de gráficos: `matplotlib` o `plotly`

**Integraciones ERP**:
- APIs: Defontana (REST), Nubox (REST), Buk (REST)
- Fallback: Upload manual de CSV con formato estandarizado

**Frontend**:
- React + TanStack Query
- Recharts para gráficos
- React Dropzone para upload de PDFs
- TanStack Table para tabla de transacciones

---

## 📊 KPIs y Métricas de Éxito

### Objetivos de Conversión
- **Free Users**: 300 registros/mes
- **Premium Subs**: 30 suscripciones/mes a $19.990/mes (ARR: $7.2M CLP)
- **Engagement**: 60% MAU (usuarios activos mensuales)

### Métricas a Trackear
- Número de cartolas procesadas/mes
- Tasa de error de OCR (< 5%)
- Accuracy de categorización (> 85%)
- NPS de calidad de modelos financieros

---

## 🎬 Interacciones y Animaciones

### Upload de Cartolas
- Drag & drop con visual feedback
- Progress bar durante OCR (puede tomar 10-30s)
- Animación de éxito con checkmark

### Dashboard
- Gráficos animados en carga (fade-in + scale)
- Tooltips interactivos en hover
- Edición inline de categorías (doble click)

### Modelos Financieros
- Wizard con progress bar (Paso 1/3: Supuestos → Paso 2/3: Proyecciones → Paso 3/3: Resultados)
- Animación de "calculando..." durante generación de modelo

---

## 🔍 SEO y Metadata

### Meta Tags
```html
<title>Just Finance - Automatiza Finanzas Corporativas y Personales | Modelos ER, Cartolas, EERR</title>
<meta name="description" content="Crea modelos financieros profesionales, genera estados de resultados automáticos y transforma cartolas en dashboards. Automatización financiera para empresas y personas.">
<meta name="keywords" content="modelos financieros, estado de resultados, flujo de caja libre, DCF, cartolas bancarias, dashboard finanzas personales, automatización contable">
```

---

## 📐 Wireframe Conceptual

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + Badge "Just Finance"                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO                                                   │
│  📐 Automatiza las Finanzas de tu Negocio              │
│  Subtítulo...                                           │
│  [Armar Modelo ER] [Cargar Cartolas]                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  GRID 3 BLOQUES (Desktop: 3 columnas, Mobile: 1 col)   │
│  ┌──────────┬──────────┬──────────┐                    │
│  │ Modelos  │ Estados  │ Personal │                    │
│  │ Financi. │ Reportes │ Cartolas │                    │
│  │          │          │          │                    │
│  │ Features │ Features │ Features │                    │
│  │ [CTA]    │ [CTA]    │ [CTA]    │                    │
│  └──────────┴──────────┴──────────┘                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  STATS (¿Por qué Just Finance?)                        │
│  10x Más Rápido | 0 Errores | 100% Automatizable      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CTA FINAL: "Empieza a automatizar hoy"                │
│  [Crear Cuenta Gratis]                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

- [ ] Diseño de 3 bloques principales
- [ ] Wizard de modelos financieros (inputs → cálculos → output Excel)
- [ ] Integración con APIs de ERPs (Defontana, Nubox, Buk)
- [ ] Sistema de OCR para cartolas bancarias
- [ ] Clasificador ML para categorización de gastos
- [ ] Dashboard de finanzas personales con gráficos interactivos
- [ ] Generación de PDFs ejecutivos con branding
- [ ] Sistema de alertas (email/push)
- [ ] Tests de accuracy de OCR y clasificación
- [ ] Planes Free vs Premium
- [ ] Documentación de APIs de integraciones

---

## 📌 Notas Adicionales

### Consideraciones de Privacidad
- **Data Sensible**: Cartolas bancarias contienen PII (Personally Identifiable Information)
- **Encriptación**: PDFs encriptados en reposo (S3 con KMS)
- **GDPR/LOPD**: Derecho al olvido (borrar data después de 30 días)
- **Disclaimer**: "No compartimos tu data con terceros"

### Diferenciadores
- **Primera plataforma chilena** de finanzas personales con OCR
- **Modelos profesionales** en minutos vs días con Excel
- **Integraciones nativas** con ERPs chilenos (vs plataformas gringas)

### Riesgos Técnicos
- **Accuracy de OCR**: Cartolas chilenas tienen formatos diversos → requiere entrenamiento por banco
- **Latency**: Procesamiento de cartola puede tomar 30-60s → usar queues
- **Rate Limits de ERPs**: Cachear data cuando sea posible

### Roadmap Futuro
- **Q1 2026**: Soporte para 10 bancos adicionales
- **Q2 2026**: Integración con Open Banking (API de bancos)
- **Q3 2026**: Forecasting de gastos con ML (predecir gastos de próximo mes)
- **Q4 2026**: Asistente AI que responde preguntas ("¿Cuánto gasté en Comida en 2024?")
