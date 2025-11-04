# 📊 Template Google Sheet - Tracking de Keywords

## Cómo crear tu Dashboard de Keywords

### 1. Crea un nuevo Google Sheet
Ve a: https://sheets.google.com → Crear nuevo

---

## HOJA 1: "Dashboard Principal"

### Configuración:

```
A1: TRACKING KEYWORDS - JUST DEV IT
A2: Última actualización: [FECHA]
A3: Período: [MES AÑO]
```

### Métricas Resumen (A5:D10):

```
Métrica                 | Actual    | Meta      | % Logrado
─────────────────────────────────────────────────────────────
Total Impresiones      | 0         | 1,000     | 0%
Total Clics            | 0         | 20        | 0%
CTR Promedio           | 0%        | 2.5%      | 0%
Posición Promedio      | 0         | 15        | 0%
Keywords en Top 20     | 0         | 10        | 0%
Keywords en Top 10     | 0         | 5         | 0%
Conversiones           | 0         | 2         | 0%
```

**Fórmulas:**
- % Logrado: `=(B6/C6)*100`
- Copia para todas las filas

---

## HOJA 2: "Keywords Principales"

### Columnas (A1:M1):

```
A: Keyword
B: Categoría
C: Prioridad
D: Semana 1 - Posición
E: Semana 1 - CTR
F: Semana 2 - Posición
G: Semana 2 - CTR
H: Semana 3 - Posición
I: Semana 3 - CTR
J: Semana 4 - Posición
K: Semana 4 - CTR
L: Tendencia
M: Notas
```

### Datos de ejemplo (A2:M22):

```
desarrollo de software fintech Santiago | Fintech | ALTA | - | - | - | - | - | - | - | - | =SI(J2<D2,"↑","↓") | Lanzamiento semana 1
desarrollo de software energía Santiago | Energía | ALTA | - | - | - | - | - | - | - | - | - | 
desarrollo a medida Ruby Santiago | Tecnología | ALTA | - | - | - | - | - | - | - | - | - |
web scraping selenium Chile | Servicios | ALTA | - | - | - | - | - | - | - | - | - |
data engineering Chile | Servicios | ALTA | - | - | - | - | - | - | - | - | - |
metabase Chile | Herramientas | MEDIA | - | - | - | - | - | - | - | - | - |
proptech Chile | Industria | ALTA | - | - | - | - | - | - | - | - | - |
fintech Chile | Industria | ALTA | - | - | - | - | - | - | - | - | - |
AWS Chile | Cloud | MEDIA | - | - | - | - | - | - | - | - | - |
Azure Chile | Cloud | MEDIA | - | - | - | - | - | - | - | - | - |
Google Cloud Chile | Cloud | MEDIA | - | - | - | - | - | - | - | - | - |
automatización RPA Chile | Servicios | ALTA | - | - | - | - | - | - | - | - | - |
dashboards inmobiliarios Chile | Servicios | ALTA | - | - | - | - | - | - | - | - | - |
ETL BigQuery Chile | Tecnología | MEDIA | - | - | - | - | - | - | - | - | - |
MongoDB Chile | Database | MEDIA | - | - | - | - | - | - | - | - | - |
desarrolladores ruby Santiago | Talento | ALTA | - | - | - | - | - | - | - | - | - |
desarrolladores python Santiago | Talento | ALTA | - | - | - | - | - | - | - | - | - |
software a medida fintech Santiago | Fintech | ALTA | - | - | - | - | - | - | - | - | - |
lambda functions Chile | Cloud | BAJA | - | - | - | - | - | - | - | - | - |
agentes IA empresariales Chile | IA | MEDIA | - | - | - | - | - | - | - | - | - |
```

### Formato condicional en columna L (Tendencia):

- **Verde:** si contiene "↑"
- **Rojo:** si contiene "↓"
- **Amarillo:** si contiene "→"

---

## HOJA 3: "Keywords Long Tail"

### Columnas (A1:H1):

```
A: Keyword Long Tail
B: Volumen Búsqueda (estimado)
C: Dificultad
D: Mes 1 - Posición
E: Mes 2 - Posición
F: Mes 3 - Posición
G: Cambio
H: Estado
```

### Datos de ejemplo:

```
desarrollo web fintech Santiago Chile | 50-100 | Baja | - | - | - | - | Sin datos
web scraping inmobiliario selenium Chile | 20-50 | Media | - | - | - | - | Sin datos
data engineering python BigQuery Santiago | 20-50 | Media | - | - | - | - | Sin datos
dashboards metabase proptech Chile | 10-20 | Baja | - | - | - | - | Sin datos
automatización RPA fintech Chile | 50-100 | Media | - | - | - | - | Sin datos
desarrollo a medida nearshore Santiago | 100-200 | Alta | - | - | - | - | Sin datos
consultora software especializada fintech Chile | 10-20 | Baja | - | - | - | - | Sin datos
```

---

## HOJA 4: "Análisis Competencia"

### Columnas (A1:J1):

```
A: Keyword
B: Tu Posición
C: Competidor 1 - Nombre
D: Competidor 1 - Pos
E: Competidor 2 - Nombre
F: Competidor 2 - Pos
G: Competidor 3 - Nombre
H: Competidor 3 - Pos
I: Gap Principal
J: Acción Requerida
```

### Template:

```
desarrollo de software fintech Santiago | - | Empresa A | 1 | Empresa B | 3 | Empresa C | 5 | Blog posts, casos de estudio | Crear contenido fintech
web scraping selenium Chile | - | Empresa X | 2 | Freelancer Y | 4 | - | - | Backlinks, autoridad | Conseguir menciones
```

---

## HOJA 5: "Conversiones"

### Columnas (A1:I1):

```
A: Fecha
B: Fuente
C: Keyword (si orgánico)
D: Página Landing
E: Tipo Conversión
F: Lead/Cliente
G: Valor Estimado
H: Estado
I: Notas
```

### Datos de ejemplo:

```
05/11/2025 | Orgánico | fintech Santiago | /index.html | Formulario Contacto | Lead | $5,000 | Propuesta enviada | Solicitó cotización Ruby on Rails
07/11/2025 | Directo | - | /index.html | WhatsApp | Lead | $3,000 | Esperando respuesta | Preguntó por web scraping
10/11/2025 | Orgánico | selenium Chile | /index.html | Email | Lead | $8,000 | En negociación | Proyecto PropTech grande
```

---

## HOJA 6: "Reporte Mensual"

### Template de reporte:

```
═══════════════════════════════════════════════
REPORTE SEO MENSUAL - [MES AÑO]
═══════════════════════════════════════════════

📊 MÉTRICAS GENERALES
─────────────────────
Total Impresiones:       [X]  (+Y% vs mes anterior)
Total Clics:             [X]  (+Y% vs mes anterior)
CTR Promedio:            [X]% (+Y% vs mes anterior)
Posición Promedio:       [X]  (+Y vs mes anterior)
Conversiones Orgánicas:  [X]

🏆 TOP 5 KEYWORDS DEL MES
─────────────────────────
1. [Keyword] - Pos [X] - [Y] clics
2. [Keyword] - Pos [X] - [Y] clics
3. [Keyword] - Pos [X] - [Y] clics
4. [Keyword] - Pos [X] - [Y] clics
5. [Keyword] - Pos [X] - [Y] clics

📈 KEYWORDS QUE MEJORARON
─────────────────────────
1. [Keyword]: Pos [X] → [Y] (↑ +Z posiciones)
2. [Keyword]: Pos [X] → [Y] (↑ +Z posiciones)
3. [Keyword]: Pos [X] → [Y] (↑ +Z posiciones)

📉 KEYWORDS QUE EMPEORARON
──────────────────────────
1. [Keyword]: Pos [X] → [Y] (↓ -Z posiciones)
2. [Keyword]: Pos [X] → [Y] (↓ -Z posiciones)

🎯 OPORTUNIDADES DETECTADAS
────────────────────────────
1. [Keyword] está en página 2 con buenas impresiones
2. [Keyword] tiene CTR bajo, optimizar title/description
3. [Keyword] sin competencia, crear landing page

💰 ROI
──────
Leads generados:     [X]
Conversiones:        [X]
Valor total:         $[X]
Costo SEO:           $[X]
ROI:                 [X]%

✅ ACCIONES PRÓXIMO MES
───────────────────────
1. Optimizar CTR de [keyword X]
2. Crear contenido para [keyword Y]
3. Conseguir backlinks de [fuente Z]
4. Mejorar velocidad de carga
5. Agregar FAQ para [keyword W]
```

---

## HOJA 7: "Calendario Editorial"

### Columnas (A1:H1):

```
A: Fecha Publicación
B: Tipo Contenido
C: Keyword Objetivo
D: Título
E: Estado
F: Responsable
G: Notas
H: URL Final
```

### Ejemplos:

```
15/11/2025 | Blog Post | web scraping selenium | Guía Completa: Web Scraping con Selenium en Chile | Planificado | Joaquín | Incluir casos de uso PropTech | -
20/11/2025 | Landing Page | desarrollo fintech | Desarrollo de Software para Fintech en Santiago | En progreso | - | Agregar testimonios | -
01/12/2025 | Caso de Estudio | data engineering Python | Cómo Optimizamos ETL para Empresa Energía | Idea | - | Pedir aprobación cliente | -
```

---

## CÓMO USAR ESTE TEMPLATE

### Paso 1: Crear el Sheet
1. Copia la estructura arriba
2. Crea las 7 hojas mencionadas
3. Aplica formato condicional (colores según valores)

### Paso 2: Configurar Fórmulas

**En Dashboard Principal (Hoja 1):**

```
B6 (Total Impresiones): =SUMAR('Keywords Principales'!D2:K22)
B7 (Total Clics): [Lo obtienes de Search Console]
B8 (CTR Promedio): =B7/B6
B9 (Posición Promedio): =PROMEDIO('Keywords Principales'!D2:K22)
B10 (Keywords Top 20): =CONTAR.SI('Keywords Principales'!J2:J22,"<=20")
B11 (Keywords Top 10): =CONTAR.SI('Keywords Principales'!J2:J22,"<=10")
```

### Paso 3: Actualización Semanal (Lunes)

1. **Exporta datos de Google Search Console:**
   - Ve a Rendimiento → Consultas
   - Últimos 7 días
   - Descarga CSV

2. **Actualiza tu Sheet:**
   - Busca cada keyword de tu lista
   - Rellena columnas de Posición y CTR
   - Google Sheet calculará tendencias automáticamente

3. **Revisa alertas:**
   - Keywords que bajaron > 5 posiciones
   - Keywords con CTR < 1%
   - Keywords nuevas que aparecieron

### Paso 4: Análisis Mensual (Primer Lunes del Mes)

1. Genera reporte en Hoja 6
2. Identifica top 3 oportunidades
3. Planifica contenido en Hoja 7
4. Actualiza análisis de competencia (Hoja 4)

---

## GRÁFICOS RECOMENDADOS

### Gráfico 1: Evolución de Posiciones (Líneas)
- Eje X: Semanas
- Eje Y: Posición (invertido, 1 arriba)
- Series: Top 5 keywords

### Gráfico 2: CTR por Keyword (Barras)
- Eje X: Keywords
- Eje Y: CTR %
- Colores: Verde > 3%, Amarillo 1-3%, Rojo < 1%

### Gráfico 3: Distribución de Posiciones (Pastel)
- Top 3: X keywords
- Top 10: X keywords
- Top 20: X keywords
- Página 2+: X keywords

### Gráfico 4: Conversiones por Fuente (Columnas)
- Eje X: Mes
- Eje Y: # Conversiones
- Series: Orgánico, Directo, Referral

---

## AUTOMATIZACIONES AVANZADAS

### Conectar Google Search Console a Google Sheets

**Opción 1: Google Apps Script**
```javascript
// Código para importar datos automáticamente de Search Console
// Requiere autorización de API
function importSearchConsole() {
  // Tu código aquí
}
```

**Opción 2: Zapier/Make.com (Paid)**
- Conecta Search Console → Google Sheets
- Actualización automática cada semana

**Opción 3: Manual (Recomendado al inicio)**
- 5 minutos cada lunes
- Más control sobre los datos
- Aprende qué keywords importan

---

## ALERTAS Y NOTIFICACIONES

### Configura alertas automáticas:

1. **Si posición baja > 5 lugares:**
   ```
   =SI(J2-D2>5, "⚠️ ALERTA: " & A2 & " bajó " & (J2-D2) & " posiciones", "")
   ```

2. **Si CTR < 1% en Top 10:**
   ```
   =SI(Y(J2<=10, K2<0.01), "🔴 CTR bajo en " & A2, "")
   ```

3. **Si keyword nueva entra a Top 20:**
   ```
   =SI(Y(J2<=20, D2=""), "🎉 Nueva keyword en Top 20: " & A2, "")
   ```

Pon estas fórmulas en una columna "Alertas" y revísala cada semana.

---

¿Necesitas que te ayude a crear alguna parte específica o quieres que te explique cómo configurar Google Search Console?
