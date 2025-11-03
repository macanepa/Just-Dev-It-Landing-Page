# 03 - Just Energy

## 🎯 Propósito de la Sección
Plataforma B2B para análisis y gestión de data del sector eléctrico chileno. Acceso a datos diferidos y en tiempo real del Coordinador Eléctrico Nacional (CEN), con herramientas de visualización y exportación para empresas generadoras, distribuidoras, consultoras y traders de energía.

---

## 🎨 Identidad Visual

### Paleta de Colores
```css
--primary: #1479FF    /* Azul Eléctrico */
--secondary: #00E0FF  /* Cyan Brillante */
--accent: #7DD3FC     /* Azul Cielo */
--gradient: linear-gradient(135deg, #1479FF 0%, #00E0FF 100%)
```

### Tipografía
- **Headings**: Poppins (700-800)
- **Body**: Manrope (400-600)

### Iconografía
- ⚡ Energía / Electricidad
- 📊 Data / Dashboards
- 🔌 Conectividad / APIs
- 📈 Tendencias / Gráficos
- 🌐 Red eléctrica

---

## 📋 Estructura de Contenido

### Hero Section
**Título**: "Data del Sector Eléctrico Chileno"  
**Subtítulo**: "Acceso completo a información del CEN: costos marginales, generación, demanda y más. Data diferida y tiempo real."

**Badge**: `Just Energy`

**CTA Principal**: "Solicitar API Key"  
**CTA Secundario**: "Ver Documentación"

### Tab System: Data Diferida vs Tiempo Real

#### Tab 1: Data Diferida (Histórica)
**Descripción**: Información consolidada con delay de horas/días. Ideal para análisis histórico, forecasting y reportería.

**Características**:
- ✓ Costos Marginales históricos por barra
- ✓ Generación por central (todas las tecnologías)
- ✓ Demanda real del sistema
- ✓ Precios de mercado spot
- ✓ Transferencias entre empresas
- ✓ Exportar a Excel/CSV
- ✓ API REST con paginación

**Casos de Uso**:
1. **Análisis de Rentabilidad**: Generadoras pueden analizar ingresos históricos por tecnología
2. **Forecasting de Precios**: Modelos predictivos de costos marginales
3. **Reportería Regulatoria**: Cumplimiento CME/SEC con data auditada

#### Tab 2: Tiempo Real
**Descripción**: Streaming de data con delay de segundos/minutos. Para trading energético y operaciones críticas.

**Características**:
- ⚡ WebSocket con latencia < 5s
- ⚡ Costos marginales en vivo
- ⚡ Generación instantánea por central
- ⚡ Alertas configurables (precio > threshold)
- ⚡ Dashboard interactivo
- ⚡ Integración con sistemas SCADA

**Casos de Uso**:
1. **Trading Energético**: Decisiones de compra/venta basadas en precio spot instantáneo
2. **Optimización Operativa**: Ajustar despacho según señales del mercado
3. **Monitoreo Crítico**: Alertas de eventos extremos (precios altos, congestión)

### Pricing & Access
**Modelo de Negocio**:
- **Data Diferida**: Gratuita con registro (rate limit: 100 req/hora)
- **Data Tiempo Real**: Suscripción mensual (desde $500k CLP/mes)
- **Enterprise**: API ilimitada + soporte dedicado + webhooks custom

---

## 🔗 CTAs y Conversión

### CTA Principal
**Texto**: "Solicitar API Key"  
**Acción**: Modal con formulario (nombre, empresa, email, tipo de negocio)  
**Destino**: Email a `energy@justdev.it` con info de API docs

### CTA Secundario
**Texto**: "Ver Documentación"  
**Destino**: Página de API docs (Swagger/Postman)

### CTA Terciario (Footer)
**Texto**: "Agendar Demo Personalizada"  
**Destino**: Calendly con slot de 30 min

---

## 🛠️ Especificaciones Técnicas

### Fuente de Datos
- **Proveedor**: Coordinador Eléctrico Nacional (CEN)
- **Actualización**: 
  - Diferida: Cada 1 hora
  - Tiempo Real: Streaming continuo (WebSocket)

### Stack Tecnológico Sugerido
**Backend**:
- Python (FastAPI) para API REST
- WebSocket server (Socket.IO o AWS AppSync)
- PostgreSQL/TimescaleDB para series temporales
- Redis para caché de queries frecuentes

**Scraping/ETL**:
- Selenium o Playwright para scraping CEN
- Airflow para orquestación de pipelines
- Validación de data con Pydantic

**Frontend Dashboard** (opcional):
- React + Recharts para gráficos interactivos
- TanStack Query para caché de API calls

### Endpoints Principales
```
GET /api/v1/marginal-costs?bar=QUILLOTA220&start_date=2024-01-01&end_date=2024-12-31
GET /api/v1/generation?central=RALCO&granularity=hourly
GET /api/v1/demand?zone=SIC&date=2024-11-03
WS  /ws/real-time/prices
```

---

## 📊 KPIs y Métricas de Éxito

### Objetivos de Conversión
- **Lead Magnets**: 50 registros/mes para API gratuita
- **Paid Subs**: 5 suscripciones enterprise/mes (ARR objetivo: $30M CLP/año)
- **Engagement**: 80% de usuarios activos usan API al menos 1x/semana

### Métricas a Trackear
- Número de API calls por usuario
- Latencia promedio de respuesta
- Tasa de error de endpoints
- Churn rate de suscripciones pagas

---

## 🎬 Interacciones y Animaciones

### Tab Switching
- Transición suave entre "Data Diferida" y "Tiempo Real"
- JavaScript básico para toggle de contenido
- Indicador visual del tab activo (borde inferior con color `--primary`)

### Cards Hover
- Efecto de elevación (translateY -4px)
- Glow con `box-shadow: 0 15px 50px rgba(20, 121, 255, 0.3)`

### Live Data Demo (Tiempo Real)
- Animación de números cambiando (simulado)
- Gráfico de línea con animación de entrada

---

## 🔍 SEO y Metadata

### Meta Tags
```html
<title>Just Energy - Data del Sector Eléctrico Chileno | API CEN</title>
<meta name="description" content="Acceso a datos diferidos y tiempo real del Coordinador Eléctrico Nacional. Costos marginales, generación, demanda. API REST para el sector energético.">
<meta name="keywords" content="CEN, Coordinador Eléctrico, costos marginales, generación eléctrica Chile, API energía, datos sector eléctrico">
```

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Just Energy API",
  "applicationCategory": "DataApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CLP"
  },
  "description": "API de datos del sector eléctrico chileno"
}
```

---

## 📐 Wireframe Conceptual

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + Badge "Just Energy"                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO                                                   │
│  ⚡ Data del Sector Eléctrico Chileno                  │
│  Subtítulo...                                           │
│  [Solicitar API Key] [Ver Documentación]               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  TAB SYSTEM                                             │
│  [Data Diferida] | [Tiempo Real]                       │
│  ─────────────────────────────                         │
│                                                         │
│  Contenido del tab activo:                             │
│  - Descripción                                          │
│  - Lista de características (6-8 items)                │
│  - 3 Cards de casos de uso                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  PRICING & ACCESS                                       │
│  Grid 3 columnas (Gratuita / Tiempo Real / Enterprise) │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CTA FINAL                                              │
│  "¿Listo para conectarte?"                             │
│  [Solicitar API Key]                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

- [ ] Diseño visual completo en Figma/mockup
- [ ] Componente de Tab System funcional (React/Vue o vanilla JS)
- [ ] Integración con backend para data demo
- [ ] Formulario de registro de API key funcional
- [ ] Documentación de API (Swagger/Redoc)
- [ ] Dashboard demo con gráficos interactivos
- [ ] Validación de formularios con feedback visual
- [ ] Tests E2E de flujo de registro
- [ ] Configuración de analytics (Google Analytics/Mixpanel)
- [ ] SEO on-page optimizado

---

## 📌 Notas Adicionales

### Diferenciadores vs Competencia
- **Velocidad**: Data tiempo real con latencia < 5s (competencia tiene delays de 15-30 min)
- **Cobertura**: Todas las barras y centrales del sistema (competencia solo subset)
- **UX**: API RESTful moderna vs sistemas legacy FTP/SOAP

### Consideraciones Legales
- Verificar términos de uso de data del CEN (puede ser pública pero con restricciones de redistribución)
- Disclaimer de "data as-is, no garantías de precisión para decisiones financieras"
- GDPR-compliant para usuarios de la UE (si aplica)

### Roadmap Futuro
- **Q1 2026**: Integración con APIs de CME (Comisión del Mercado Eléctrico)
- **Q2 2026**: Modelos de forecasting con ML (precios spot a 7 días)
- **Q3 2026**: Expansión a mercados LATAM (Colombia, Perú)
