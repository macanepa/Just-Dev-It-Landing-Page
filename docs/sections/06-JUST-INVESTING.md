# 06 - Just Investing

## 🎯 Propósito de la Sección
Suite de herramientas de análisis financiero para inversionistas chilenos. Comparador de vehículos de inversión, generador de portafolios automático, valores cuota CMF, acciones Chile y convertidor de divisas.

---

## 🎨 Identidad Visual

### Paleta de Colores
```css
--primary: #16A34A    /* Verde Financiero */
--secondary: #0EA5E9  /* Cyan/Azul */
--accent: #F4C430     /* Dorado */
--gradient: linear-gradient(135deg, #16A34A 0%, #0EA5E9 100%)
```

### Tipografía
- **Headings**: Poppins (700-800)
- **Body**: Manrope (400-600)

### Iconografía
- 📈 Inversiones / Crecimiento
- 💰 Dinero / Rentabilidad
- 📊 Análisis / Métricas
- 🎯 Objetivos / Targets
- 🔍 Research / Due Diligence

---

## 📋 Estructura de Contenido

### Hero Section
**Título**: "Invierte con Data, no con Intuición"  
**Subtítulo**: "Herramientas de análisis financiero y portafolios para inversionistas chilenos."

**Badge**: `Just Investing`

**Elemento Destacado**: Buscador de activos
```
[Buscar activo: CMPC, COPEC, AGUAS-A...] [Buscar]
```

**CTA Principal**: "Probar Comparador"  
**CTA Secundario**: "Generar Mi Portafolio"

---

## 📦 5 Herramientas Principales

### 1. 🚗 Comparador de Vehículos de Inversión

**Descripción**: Compara acciones, ETFs y fondos mutuos side-by-side con métricas clave de riesgo y rentabilidad.

**Características**:
- ✓ Rendimiento histórico ajustado por dividendos (1, 3, 5, 10 años)
- ✓ Volatilidad histórica (desviación estándar anualizada)
- ✓ Sharpe Ratio (retorno ajustado por riesgo)
- ✓ Correlación entre activos (matriz de correlación)
- ✓ Métricas fundamentales: P/E, P/B, Dividend Yield
- ✓ Gráfico comparativo de performance histórica
- ✓ Exportar a Excel

**Casos de Uso**:
1. **Análisis de Rentabilidad**: "¿CMPC o COPEC tuvo mejor rendimiento en 5 años?"
2. **Diversificación**: "¿Qué tan correlacionadas están mis acciones?"
3. **Due Diligence**: "¿El Sharpe Ratio de este fondo justifica el riesgo?"

**Inputs del Usuario**:
- 2-5 tickers (ej: CMPC, COPEC, AGUAS-A, ENELAM, SQM-B)
- Período de análisis (1Y, 3Y, 5Y, 10Y)

**Output Visual**:
- Tabla comparativa con todas las métricas
- Gráfico de líneas con performance histórica normalizada (base 100)
- Matriz de correlación (heatmap)

**CTA**: "Probar Comparador"

---

### 2. 📊 Generador de Portafolios Automático

**Descripción**: Algoritmo de optimización basado en Modern Portfolio Theory (Markowitz) que genera portafolios óptimos según perfil de riesgo.

**Características**:
- ✓ Ingresa: monto, perfil de riesgo (conservador/moderado/agresivo), horizonte
- ✓ Recibe: portafolio óptimo con pesos por activo
- ✓ Backtesting con data histórica real (últimos 10 años)
- ✓ Frontera eficiente visualizada
- ✓ Rebalanceo automático sugerido (mensual/trimestral)
- ✓ Métricas: retorno esperado, volatilidad, Sharpe

**Casos de Uso**:
1. **Inversionista Principiante**: "Tengo $5M CLP, ¿cómo los invierto?"
2. **Optimización de Portafolio**: "Mi portafolio actual está mal balanceado"
3. **Planificación a Largo Plazo**: "¿Cómo armo un portafolio para jubilar en 20 años?"

**Inputs del Usuario**:
- Monto a invertir (ej: $5.000.000 CLP)
- Perfil de riesgo: Conservador (20% acciones, 80% RF), Moderado (60/40), Agresivo (80/20)
- Horizonte de inversión: 1, 3, 5, 10, 20 años
- Restricciones (opcional): "No quiero más de 10% en una sola acción"

**Output Visual**:
- Gráfico de torta con pesos por activo
- Tabla con: Activo, Peso %, Monto a invertir
- Métricas del portafolio: Retorno esperado, Volatilidad, Sharpe
- Backtesting: Gráfico de valor del portafolio en últimos 10 años
- Sugerencia de rebalanceo: "Rebalancear cada 3 meses"

**CTA**: "Generar Mi Portafolio"

---

### 3. 💼 Valores Cuota Diarios CMF

**Descripción**: Todos los fondos mutuos de Chile actualizados diariamente desde la Comisión para el Mercado Financiero.

**Características**:
- ✓ 1,000+ fondos indexados (todas las AGF)
- ✓ Rentabilidad: 7d, 30d, 90d, 1y, 3y, 5y
- ✓ Filtros: Tipo (renta fija, renta variable, mixtos), AGF, moneda
- ✓ Búsqueda por nombre de fondo
- ✓ Gráfico de valor cuota histórico
- ✓ Exportar a Excel/CSV

**Casos de Uso**:
1. **Comparación de Fondos**: "¿Qué fondo mutuo de renta variable tuvo mejor rentabilidad en 1 año?"
2. **Monitoreo de Inversiones**: "¿Cómo va el valor cuota de mi fondo?"
3. **Research**: "¿Qué AGF tiene los mejores fondos de renta fija?"

**Output Visual**:
- Tabla con: Nombre Fondo, AGF, Valor Cuota, Rent 7d, Rent 1y, Rent 5y
- Filtros en sidebar: Tipo, AGF, Moneda, Ordenar por Rentabilidad
- Gráfico de línea con histórico de valor cuota al hacer click en fondo

**CTA**: "Ver Tabla Completa"

---

### 4. 📈 Acciones Chile (IPSA + Small Caps)

**Descripción**: Data completa de todas las acciones chilenas con fundamentales y técnicos.

**Características**:
- ✓ Precios en tiempo real (delay 15 min) de Bolsa de Santiago
- ✓ Fundamentales: P/E, P/B, ROE, ROA, Dividend Yield, Market Cap
- ✓ Gráficos históricos interactivos (candlesticks, volumen)
- ✓ Alertas de precio configurables (email/push)
- ✓ Noticias financieras por empresa (scraping de LaSegunda, DF)
- ✓ Calendario de dividendos

**Casos de Uso**:
1. **Trading**: "¿A qué precio está COPEC ahora?"
2. **Value Investing**: "¿Qué acciones tienen P/E < 10 y ROE > 15%?"
3. **Income Investing**: "¿Qué acciones pagan más dividendos?"

**Output Visual**:
- Tabla con: Ticker, Empresa, Precio, Var %, P/E, P/B, Dividend Yield
- Filtros: Sector, Market Cap, P/E range, Dividend Yield > X%
- Detalle de acción: Gráfico histórico, fundamentales, noticias, dividendos

**CTA**: "Analizar Acciones"

---

### 5. 💱 Convertidor de Divisas

**Descripción**: Tipos de cambio actualizados con histórico y gráficos.

**Características**:
- ✓ Monedas: USD, EUR, CLP, UF, UTM, BTC, ETH
- ✓ Histórico de 10 años
- ✓ Gráfico de evolución de tipo de cambio
- ✓ Alertas de tipo de cambio (email si USD > $950)
- ✓ API disponible para integraciones

**Casos de Uso**:
1. **Viajes**: "¿Cuánto es $1000 USD en CLP?"
2. **Inversión Extranjera**: "¿Cómo ha evolucionado el USD/CLP en 5 años?"
3. **Cripto**: "¿Cuánto vale 1 BTC en CLP?"

**Output Visual**:
- Conversor con inputs: [1000] [USD] → [950,000] [CLP]
- Gráfico de línea con histórico USD/CLP
- Tabla con: Moneda, Valor en CLP, Var 24h, Var 7d, Var 1m

**CTA**: "Ver Convertidor"

---

## 🔗 CTAs y Conversión

### CTAs por Herramienta
1. **Comparador**: "Probar Comparador" → Formulario con inputs + resultados
2. **Generador Portafolios**: "Generar Mi Portafolio" → Wizard de 3 pasos
3. **Valores Cuota**: "Ver Tabla Completa" → Página con tabla full-screen
4. **Acciones**: "Analizar Acciones" → Dashboard de screening
5. **Divisas**: "Ver Convertidor" → Conversor interactivo

### CTA Final (Footer)
**Texto**: "¿Listo para optimizar tus inversiones?"  
**Destino**: Formulario de registro con plan gratuito

---

## 🛠️ Especificaciones Técnicas

### Stack Tecnológico Sugerido
**Backend**:
- Python (FastAPI) para APIs
- PostgreSQL para data histórica
- Redis para caché de precios en tiempo real
- Celery + RabbitMQ para scraping asíncrono

**Scraping/Data Sources**:
- Bolsa de Santiago (API oficial o scraping)
- CMF (scraping de valores cuota)
- Banco Central (API de tipo de cambio)
- CoinGecko/Binance API (cripto)

**Algoritmos**:
- Optimización de Portafolio: `scipy.optimize` (Markowitz)
- Backtesting: `backtrader` o `zipline`
- Métricas: `pandas` + `numpy` para cálculos

**Frontend**:
- React + TanStack Query
- Recharts/D3.js para gráficos
- TanStack Table para tablas con sorting/filtering

---

## 📊 KPIs y Métricas de Éxito

### Objetivos de Conversión
- **Free Users**: 500 registros/mes
- **Premium Subs**: 50 suscripciones/mes a $9.990/mes (ARR: $6M CLP)
- **Engagement**: 70% MAU (usuarios activos mensuales)

### Métricas a Trackear
- Herramienta más usada (comparador vs generador portafolios)
- Tasa de conversión Free → Premium
- Alertas configuradas por usuario
- Tiempo promedio en plataforma

---

## 🎬 Interacciones y Animaciones

### Buscador de Activos
- Autocomplete con sugerencias (CMPC, COPEC, etc.)
- Highlight de matches en tiempo real

### Gráficos Interactivos
- Tooltips con valores en hover
- Zoom/pan en series temporales
- Animación de carga (skeleton loaders)

### Generador de Portafolios
- Wizard con progress bar (Paso 1/3)
- Animación de "calculando..." con spinner
- Confetti effect al generar portafolio exitoso

---

## 🔍 SEO y Metadata

### Meta Tags
```html
<title>Just Investing - Herramientas de Inversión Chile | Comparador Acciones, Portafolios</title>
<meta name="description" content="Suite de herramientas para inversionistas chilenos: comparador de acciones, generador de portafolios, valores cuota CMF, análisis de fondos mutuos.">
<meta name="keywords" content="inversiones Chile, comparador acciones, portafolio óptimo, valores cuota CMF, acciones IPSA, tipo cambio">
```

---

## 📐 Wireframe Conceptual

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + Badge "Just Investing"                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO                                                   │
│  📈 Invierte con Data, no con Intuición                │
│  [Buscar activo: CMPC, COPEC...] [Buscar]             │
│  [Probar Comparador] [Generar Portafolio]              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  5 BLOQUES VERTICALES                                   │
│  ┌─────────────────────────────────────────────┐       │
│  │ 🚗 Comparador de Vehículos                  │       │
│  │ Descripción + Features + [CTA]              │       │
│  └─────────────────────────────────────────────┘       │
│  ┌─────────────────────────────────────────────┐       │
│  │ 📊 Generador Portafolios                    │       │
│  └─────────────────────────────────────────────┘       │
│  (3 bloques más...)                                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  CTA FINAL: "¿Listo para optimizar?"                   │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

- [ ] Diseño visual de 5 herramientas
- [ ] Buscador de activos con autocomplete
- [ ] Comparador con tabla y gráficos
- [ ] Generador de portafolios (wizard + algoritmo Markowitz)
- [ ] Scraping de CMF (valores cuota)
- [ ] Scraping de Bolsa de Santiago (precios acciones)
- [ ] Integración con APIs de tipo de cambio
- [ ] Sistema de alertas (email/push)
- [ ] Exportación a Excel/CSV
- [ ] Tests de algoritmos de optimización
- [ ] Sistema de autenticación (JWT)
- [ ] Planes Free vs Premium

---

## 📌 Notas Adicionales

### Consideraciones Legales
- **Disclaimer**: "No somos asesores financieros. Esta herramienta es solo informativa."
- **Data Sources**: Verificar términos de uso de CMF, Bolsa de Santiago
- **Regulación**: Si se cobran comisiones, puede requerir registro en CMF

### Diferenciadores
- **Primera suite chilena** todo-en-uno para inversores retail
- **Gratis vs paid**: Plan gratuito generoso para captar usuarios
- **UX**: Interfaz moderna vs plataformas legacy de corredoras

### Roadmap Futuro
- **Q1 2026**: Soporte para acciones internacionales (S&P 500, NASDAQ)
- **Q2 2026**: Robo-advisor con ejecución automática de trades
- **Q3 2026**: Integración con corredoras (Fintual, Renta4, BCI)
- **Q4 2026**: Social trading (seguir portafolios de otros usuarios)
