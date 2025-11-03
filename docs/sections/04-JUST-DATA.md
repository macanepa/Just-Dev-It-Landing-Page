# 04 - Just Data

## 🎯 Propósito de la Sección
Catálogo de datasets chilenos curados y enriquecidos. APIs listas para consumir con data de instituciones públicas (SII, INE, PJUD, Tesorería) y bases propietarias. Enfoque en calidad, documentación y facilidad de integración.

---

## 🎨 Identidad Visual

### Paleta de Colores
```css
--primary: #4338CA    /* Índigo Profundo */
--secondary: #06B6D4  /* Cyan */
--accent: #84CC16     /* Lima/Verde */
--gradient: linear-gradient(135deg, #4338CA 0%, #06B6D4 100%)
```

### Tipografía
- **Headings**: Poppins (700-800)
- **Body**: Manrope (400-600)

### Iconografía
- 📊 Datasets / Data
- 🔍 Búsqueda / Discovery
- 📁 Archivos / Bases de datos
- 🔗 APIs / Conexiones
- ✅ Validado / Curado

---

## 📋 Estructura de Contenido

### Hero Section
**Título**: "Datasets Chilenos Listos para Usar"  
**Subtítulo**: "APIs de data pública y propietaria. Curada, validada y documentada. De RUTs hasta propiedades con deuda."

**Badge**: `Just Data`

**CTA Principal**: "Explorar Catálogo"  
**CTA Secundario**: "Ver Precios"

### Catálogo de Datasets (5 Principales)

#### 1. Rutificador Universal
**Descripción**: Valida RUTs chilenos, extrae dígito verificador, identifica persona/empresa.

**Características**:
- ✓ Validación instantánea con algoritmo Módulo 11
- ✓ Formateo automático (12.345.678-9)
- ✓ Detección de tipo (persona natural vs jurídica)
- ✓ 99.9% de accuracy
- ✓ Rate limit: 1000 req/min

**Caso de Uso**: Validación en formularios de registro, sistemas de facturación, KYC.

**Data Preview**:
```json
{
  "rut": "12345678-9",
  "valid": true,
  "type": "persona_natural",
  "formatted": "12.345.678-9"
}
```

**CTAs**:
- "Ver Muestra" → Modal con 10 registros de ejemplo
- "Solicitar API" → Formulario de contacto

**Tags**:
- `Source: Algoritmo Público` 
- `Size: Infinito (validación)`
- `Update: N/A`

---

#### 2. Nómina de Contribuyentes SII
**Descripción**: Base completa de RUTs inscritos en el SII con razón social, giro y dirección.

**Características**:
- ✓ 1.5M+ registros (empresas y personas)
- ✓ Búsqueda por RUT, razón social o giro
- ✓ Datos de contacto (cuando disponible)
- ✓ Estado tributario (activo/inactivo)
- ✓ Actualización mensual

**Caso de Uso**: Enriquecimiento de bases B2B, validación de clientes, prospección comercial.

**Data Preview**:
```json
{
  "rut": "76.123.456-7",
  "razon_social": "ACME LTDA",
  "giro": "SERVICIOS DE INGENIERIA",
  "direccion": "AV LIBERTADOR 1234, SANTIAGO",
  "estado": "activo"
}
```

**CTAs**:
- "Ver Muestra" → Tabla con 20 registros
- "Solicitar API" → Plan desde $150k/mes

**Tags**:
- `Source: SII` 
- `Size: 1.5M registros`
- `Update: Mensual`

---

#### 3. Propiedades con Deuda Municipal
**Descripción**: Propiedades con morosidad en contribuciones de bienes raíces. Ideal para inversionistas y gestores de cobranza.

**Características**:
- ✓ 80k+ propiedades con deuda > $500k
- ✓ Monto de deuda actualizado
- ✓ Años de morosidad
- ✓ Rol de avalúo y dirección
- ✓ Filtros por comuna y monto
- ✓ Actualización trimestral

**Caso de Uso**: Búsqueda de oportunidades de inversión, gestión de cobranza municipal, análisis de riesgo inmobiliario.

**Data Preview**:
```json
{
  "rol": "123-45",
  "direccion": "CALLE FALSA 123, SANTIAGO",
  "comuna": "Santiago",
  "deuda_total": 2500000,
  "anos_morosidad": 3,
  "avaluo_fiscal": 45000000
}
```

**CTAs**:
- "Ver Muestra" → Mapa interactivo con 100 propiedades
- "Solicitar API" → Plan desde $300k/mes

**Tags**:
- `Source: Tesorería Municipal` 
- `Size: 80k propiedades`
- `Update: Trimestral`

---

#### 4. Causas Judiciales PJUD
**Descripción**: Scraping histórico de causas del Poder Judicial. RUCs, partes, materias, tribunales.

**Características**:
- ✓ 5M+ causas desde 2010
- ✓ Búsqueda por RUT, RUC o nombre
- ✓ Materias: civil, penal, laboral, familia
- ✓ Estado procesal actualizado
- ✓ Tribunales de todo Chile
- ✓ Actualización semanal

**Caso de Uso**: Due diligence legal, análisis de litigiosidad, alertas de demandas.

**Data Preview**:
```json
{
  "ruc": "C-123-2024",
  "tribunal": "1° JUZGADO CIVIL DE SANTIAGO",
  "materia": "COBRO DE PESOS",
  "demandante": "EMPRESA X",
  "demandado": "PERSONA Y",
  "estado": "EN TRAMITACION"
}
```

**CTAs**:
- "Ver Muestra" → Tabla con 50 causas de ejemplo
- "Solicitar API" → Plan desde $500k/mes (data sensible)

**Tags**:
- `Source: PJUD (Scraping)` 
- `Size: 5M causas`
- `Update: Semanal`

---

#### 5. Estadísticas INE
**Descripción**: Data del Instituto Nacional de Estadísticas: IPC, PIB, empleo, población.

**Características**:
- ✓ Series temporales desde 1990
- ✓ IPC por categoría (alimentos, transporte, etc.)
- ✓ Tasa de desempleo trimestral
- ✓ Población por región y comuna (Censo 2017)
- ✓ Exportable a CSV/Excel
- ✓ API gratuita con rate limit

**Caso de Uso**: Análisis macroeconómico, forecasting, dashboards ejecutivos.

**Data Preview**:
```json
{
  "indicador": "IPC",
  "periodo": "2024-10",
  "valor": 145.6,
  "variacion_mensual": 0.8,
  "variacion_anual": 4.2
}
```

**CTAs**:
- "Ver Muestra" → Gráfico interactivo de IPC histórico
- "Solicitar API" → Gratis con registro

**Tags**:
- `Source: INE` 
- `Size: 100k+ observaciones`
- `Update: Mensual`

---

## 🔗 CTAs y Conversión

### CTA Principal (Hero)
**Texto**: "Explorar Catálogo"  
**Acción**: Scroll a sección de datasets

### CTAs por Dataset
1. **"Ver Muestra"**: Modal/página con data de ejemplo (10-50 registros)
2. **"Solicitar API"**: Formulario con campos (nombre, empresa, email, uso previsto)

### CTA Final (Footer)
**Texto**: "¿Necesitas un dataset custom?"  
**Destino**: Formulario de solicitud de data a medida

---

## 🛠️ Especificaciones Técnicas

### Stack Tecnológico Sugerido
**Backend**:
- FastAPI (Python) para API REST
- PostgreSQL para datasets estructurados
- Elasticsearch para búsqueda full-text
- Redis para caché de queries frecuentes

**Scraping/ETL**:
- Scrapy para PJUD, SII, municipalidades
- Airflow para pipelines de actualización
- Great Expectations para validación de calidad

**Frontend**:
- React + TanStack Table para vista de datasets
- Mapbox/Leaflet para visualización geoespacial
- Recharts para gráficos estadísticos

### Endpoints Principales
```
GET /api/v1/datasets
GET /api/v1/datasets/{dataset_id}
GET /api/v1/datasets/{dataset_id}/sample?limit=100
POST /api/v1/datasets/{dataset_id}/query
GET /api/v1/datasets/rutificador/validate?rut=12345678-9
GET /api/v1/datasets/sii/search?razon_social=ACME
```

---

## 📊 KPIs y Métricas de Éxito

### Objetivos de Conversión
- **Free Tier Users**: 200 registros/mes (API gratuita de Rutificador + INE)
- **Paid Subs**: 10 clientes B2B/mes (ARR objetivo: $50M CLP/año)
- **Data Requests**: 5 solicitudes de datasets custom/mes

### Métricas a Trackear
- Número de API calls por dataset
- Tasa de conversión Free → Paid
- NPS (Net Promoter Score) de calidad de data
- Tiempo promedio de respuesta de API

---

## 🎬 Interacciones y Animaciones

### Dataset Cards
- Hover effect con elevación y glow
- Tags animados con gradientes
- Code preview con syntax highlighting (JSON)

### Modales de "Ver Muestra"
- Transición suave (fade + scale)
- Tabla interactiva con paginación
- Botón "Solicitar Acceso Completo"

### Gráficos Interactivos
- Tooltips con valores en hover
- Zoom/pan en series temporales (INE)

---

## 🔍 SEO y Metadata

### Meta Tags
```html
<title>Just Data - Datasets Chilenos | APIs de Data Pública y Propietaria</title>
<meta name="description" content="Catálogo de datasets chilenos curados: RUTs, contribuyentes SII, propiedades con deuda, causas PJUD, estadísticas INE. APIs listas para integrar.">
<meta name="keywords" content="datasets Chile, API data Chile, RUT validator, SII contribuyentes, propiedades deuda, PJUD causas, INE estadísticas">
```

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "DataCatalog",
  "name": "Just Data",
  "description": "Catálogo de datasets chilenos",
  "dataset": [
    {
      "@type": "Dataset",
      "name": "Nómina Contribuyentes SII",
      "description": "1.5M+ empresas y personas inscritas en SII"
    }
  ]
}
```

---

## 📐 Wireframe Conceptual

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + Badge "Just Data"                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO                                                   │
│  📊 Datasets Chilenos Listos para Usar                 │
│  Subtítulo...                                           │
│  [Explorar Catálogo] [Ver Precios]                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CATÁLOGO (5 Cards en Vertical Stack)                  │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ 1. RUTIFICADOR UNIVERSAL                      │     │
│  │ Tags: [Source] [Size] [Update]               │     │
│  │ Descripción + Preview JSON                    │     │
│  │ [Ver Muestra] [Solicitar API]                │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ 2. NÓMINA CONTRIBUYENTES SII                  │     │
│  │ ...                                            │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  (3 cards más...)                                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CTA FINAL                                              │
│  "¿Necesitas un dataset custom?"                       │
│  [Solicitar Data a Medida]                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

- [ ] Diseño de cards de datasets con preview de data
- [ ] Modales de "Ver Muestra" con tablas interactivas
- [ ] Integración con APIs de backend para data real
- [ ] Sistema de tags dinámico (source, size, update)
- [ ] Syntax highlighting para code previews (JSON)
- [ ] Formularios de solicitud de API con validación
- [ ] Sistema de autenticación (API keys)
- [ ] Documentación de API (Swagger/Postman)
- [ ] Tests de carga (10k requests/min)
- [ ] Configuración de rate limiting

---

## 📌 Notas Adicionales

### Consideraciones Legales
- **Data Pública**: SII, INE, PJUD → verificar términos de redistribución
- **Data Sensible**: Causas PJUD pueden tener restricciones de privacidad
- **GDPR/LOPD**: Si hay data de personas, cumplir con protección de datos

### Diferenciadores
- **Calidad**: Data validada y enriquecida (vs scraping raw)
- **Documentación**: Cada dataset con ejemplos y casos de uso
- **Freshness**: Actualizaciones automáticas (semanal/mensual)
- **UX**: APIs RESTful modernas vs descargas manuales CSV

### Roadmap Futuro
- **Q1 2026**: +10 nuevos datasets (CMF, Registro Civil, Correos)
- **Q2 2026**: Data marts verticales (real estate, fintech, legal)
- **Q3 2026**: Marketplace de datasets con pricing dinámico
