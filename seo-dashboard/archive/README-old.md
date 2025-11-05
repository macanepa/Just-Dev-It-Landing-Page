# 📊 SEO Dashboard Enterprise - Just Dev It# 📊 SEO Dashboard - Just Dev It



Dashboard empresarial completo para análisis y optimización SEO con 9 secciones profesionales, integración con Google Search Console y Analytics 4.Dashboard personalizado para monitorear tu posicionamiento orgánico en Google. **100% local y seguro** - tus datos nunca salen de tu computadora.



---## 🎯 Características



## 🚀 Inicio Rápido- ✅ **Datos en tiempo real** de Google Search Console

- 📈 **Gráficos interactivos** de tendencias

### **Opción 1: Abrir Dashboard (Solo Visualización)**- 🔍 **Análisis de keywords** con posición, CTR y clics

```bash- 🎯 **Objetivos y metas** personalizables

# Abrir el archivo principal- 📥 **Exportar a CSV** para análisis externos

.\index.html- 🔒 **100% local** - corre en tu computadora

```- 💾 **Datos guardados** en localStorage del navegador

- 🎨 **Interfaz moderna** y responsive

### **Opción 2: Con API Backend (Datos Reales)**

```bash## 🚀 Inicio Rápido

# Ejecutar el script de inicio

.\scripts\start.ps1### Opción 1: Solo Frontend (Datos de ejemplo)

```

Si solo quieres ver el dashboard con datos de ejemplo:

---

1. **Abre el archivo:**

## 📁 Estructura del Proyecto

   ```

```   seo-dashboard/index.html

seo-dashboard/   ```

├── index.html                      # Dashboard principal (10,217 líneas)

├── dashboard-enterprise.html       # Backup del dashboard   Doble clic o abre con tu navegador

├── requirements.txt                # Dependencias Python

├── .gitignore                     # Archivos ignorados2. **Haz clic en "Actualizar Datos"**

│   - Verás datos de ejemplo generados

├── api/                           # Servidores API   - Puedes explorar todas las funcionalidades

│   ├── api-server-enterprise.py   # API principal (Flask)

│   ├── api-server.py              # API simplificada### Opción 2: Con API Real (Datos de Google)

│   └── test-api-enterprise.py     # Tests de API

│Para conectar con tus datos reales de Google Search Console:

├── scripts/                       # Scripts de automatización

│   ├── start.ps1                  # Iniciar servidor#### Paso 1: Instalar dependencias

│   ├── verify-setup.py            # Verificar instalación

│   ├── diagnostico-conexion.py    # Test de conexión a APIs```powershell

│   ├── actualizar-datos-auto.py   # Actualización automáticacd seo-dashboard

│   ├── crear-config.py            # Generar configuraciónpip install -r requirements.txt

│   └── configurar-tarea-automatica.ps1  # Programar tareas```

│

├── config/                        # Configuración#### Paso 2: Configurar Google Cloud

│   ├── config.json                # Config principal (NO SUBIR A GIT)

│   ├── config-template.json       # Template de configuración1. **Ve a [Google Cloud Console](https://console.cloud.google.com)**

│   └── credentials.json           # Credenciales Google (NO SUBIR A GIT)

│2. **Crea un proyecto** (o usa uno existente)

├── data/                          # Datos y logs

│   ├── keywords-database.json     # Base de datos de keywords3. **Habilita las APIs:**

│   ├── datos-actualizados.json    # Última actualización

│   └── actualizacion-log.txt      # Log de actualizaciones   - Google Search Console API

│   - Google Analytics Data API (opcional)

├── docs/                          # Documentación

│   ├── GUIA-RAPIDA.md            # Guía de inicio rápido4. **Crea Service Account:**

│   ├── SETUP-GUIDE.md            # Guía de instalación

│   ├── DASHBOARD-COMPLETADO.md   # Resumen técnico   - Ve a "Credentials" → "Create Credentials" → "Service Account"

│   └── TUTORIAL-PRINCIPIANTES.md # Tutorial para principiantes   - Dale un nombre: "SEO Dashboard"

│   - Rol: "Viewer"

└── archive/                       # Archivos históricos   - Crea una clave JSON y descárgala

    └── dashboard-old.html         # Dashboard anterior

```5. **Agrega el Service Account a Search Console:**

   - Ve a [Google Search Console](https://search.google.com/search-console)

---   - Selecciona tu propiedad

   - Settings → Users and permissions

## ✨ Características   - Add user → Pega el email del service account

   - Permisos: "Full"

### **9 Secciones Empresariales:**

1. ✅ **Overview** - KPIs principales + 4 gráficas + alertas#### Paso 3: Iniciar el servidor

2. ✅ **Keywords Master** - Búsqueda + 5 filtros + tabla completa

3. ✅ **Analytics** - GA4 integrado + tráfico + conversiones```powershell

4. ✅ **Performance** - PageSpeed + Core Web Vitals + optimizacionespython api-server.py

5. ✅ **Sugerencias** - IA + recomendaciones inteligentes```

6. ✅ **Acciones** - 8 automatizaciones SEO + preview + historial

7. ✅ **Histórico** - 12 meses de datos + validación + proyeccionesVerás:

8. ✅ **GEO** - Optimización para buscadores IA (ChatGPT, Claude, Gemini)

```

### **Tecnología:**🚀 SEO Dashboard API Server

- 📊 **13 gráficas interactivas** con Chart.js✅ Servidor iniciado en: http://localhost:5000

- 🔍 **Búsqueda en tiempo real** con filtros combinables📊 Dashboard: Abre seo-dashboard/index.html en tu navegador

- 📤 **6 funciones de exportación** (CSV/JSON)```

- 🤖 **8 acciones de automatización** SEO

- 📱 **Responsive design** (Desktop, Tablet, Mobile)#### Paso 4: Configurar el Dashboard

- 🎨 **Dark theme profesional**

1. **Abre:** `seo-dashboard/index.html` en tu navegador

---

2. **Ve a la pestaña "Configuración"**

## 🛠️ Instalación

3. **Pega tus credenciales:**

### **1. Requisitos**

- Python 3.8+   - Property URL: `https://justdev.it`

- Cuenta de Google Cloud (para APIs)   - Service Account JSON: Pega el contenido del archivo JSON descargado

- Navegador moderno (Chrome, Firefox, Edge)   - GA Property ID: `G-E47YX9JYCS` (si quieres Analytics)



### **2. Instalar dependencias**4. **Haz clic en "Guardar Configuración"**

```bash

pip install -r requirements.txt5. **Haz clic en "Probar Conexión"**

```

6. **Si todo está OK, haz clic en "Actualizar Datos"**

### **3. Configurar credenciales**

```bash## 📋 Estructura de Archivos

# Crear configuración desde template

python scripts/crear-config.py```

seo-dashboard/

# Agregar credenciales de Google Cloud├── index.html          ← Dashboard principal (abre esto)

# Editar: config/credentials.json├── api-server.py       ← Servidor API Python (opcional)

```├── requirements.txt    ← Dependencias Python

├── README.md           ← Esta documentación

### **4. Verificar instalación**├── config.json         ← Configuración (se crea automáticamente)

```bash└── .gitignore          ← Archivos ignorados por git

python scripts/verify-setup.py```

```

## 🔒 Seguridad

---

### ¿Es seguro?

## 📖 Documentación

**SÍ**, totalmente seguro porque:

| Documento | Descripción |

|-----------|-------------|1. ✅ **Corre 100% en local** (localhost:5000)

| [GUIA-RAPIDA.md](docs/GUIA-RAPIDA.md) | Guía de inicio en 5 minutos |2. ✅ **No hay servidor externo** - todo queda en tu PC

| [SETUP-GUIDE.md](docs/SETUP-GUIDE.md) | Instalación paso a paso |3. ✅ **Credenciales guardadas localmente** en tu navegador

| [DASHBOARD-COMPLETADO.md](docs/DASHBOARD-COMPLETADO.md) | Documentación técnica completa |4. ✅ **No se envía nada a internet** excepto a Google APIs

| [TUTORIAL-PRINCIPIANTES.md](docs/TUTORIAL-PRINCIPIANTES.md) | Tutorial para principiantes |5. ✅ **Código abierto** - puedes revisar todo

| [AUTOMATIZACION-GUIA.md](docs/AUTOMATIZACION-GUIA.md) | Configurar automatización |

### Recomendaciones:

---

- 🔒 **NO expongas el servidor** a internet (puerto 5000)

## 🔧 Uso- 🔒 **NO compartas tu archivo config.json** (tiene tus credenciales)

- 🔒 **Agrega al .gitignore** el config.json

### **Visualización Básica (Sin API)**- 🔒 **Revoca el Service Account** cuando no lo necesites

Simplemente abre `index.html` en tu navegador. Verás datos mock generados automáticamente.

## 📊 Endpoints de la API

### **Con Datos Reales (API Backend)**

1. Configurar credenciales en `config/credentials.json`Si quieres integrar con otras herramientas:

2. Ejecutar: `.\scripts\start.ps1`

3. Abrir: http://localhost:5000### GET `/api/health`



### **Automatización**Verificar que el servidor está funcionando

```bash

# Actualizar datos manualmente**Respuesta:**

python scripts/actualizar-datos-auto.py

```json

# Configurar actualizaciones automáticas{

.\scripts\configurar-tarea-automatica.ps1  "status": "ok",

```  "google_libs": true,

  "timestamp": "2025-11-04T10:30:00"

---}

```

## 📊 APIs Disponibles

### POST `/api/search-console/query`

| Endpoint | Descripción |

|----------|-------------|Obtener datos de Search Console

| `GET /api/keywords` | Listado de keywords |

| `GET /api/analytics` | Datos de Google Analytics 4 |**Request:**

| `GET /api/performance` | Métricas de PageSpeed |

| `GET /api/suggestions` | Sugerencias inteligentes |```json

| `GET /api/history` | Datos históricos (12 meses) |{

  "property_url": "https://justdev.it",

---  "credentials": "{...}",

  "start_date": "2025-10-28",

## 🔐 Seguridad  "end_date": "2025-11-04"

}

**⚠️ IMPORTANTE:** Los siguientes archivos contienen información sensible y NO deben subirse a Git:```



- `config/config.json` - Configuración personal**Response:**

- `config/credentials.json` - Credenciales de Google Cloud

- `data/*.json` - Datos del sitio```json

{

Estos archivos ya están incluidos en `.gitignore`.  "summary": {

    "impressions": 2500,

---    "clicks": 85,

    "ctr": 3.4,

## 🎯 Roadmap    "position": 8.5

  },

- [ ] Integración con más APIs (Semrush, Ahrefs)  "keywords": [

- [ ] Sistema de alertas por email    {

- [ ] Comparación con competidores      "keyword": "desarrollo software fintech",

- [ ] Reportes automáticos PDF      "position": 8,

- [ ] Multi-sitio en un dashboard      "impressions": 450,

      "clicks": 12,

---      "ctr": 2.7

    }

## 📝 Estadísticas del Código  ]

}

``````

Total de líneas: 10,217

HTML: ~2,800 líneas### POST `/api/search-console/trend`

CSS: ~3,200 líneas  

JavaScript: ~4,217 líneasObtener tendencia de los últimos 7 días

Tamaño: 336 KB

```### POST `/api/test-connection`



---Probar conexión con Google Search Console



## 🤝 Contribuir### GET `/api/mock-data`



Este es un proyecto privado de **Just Dev It**. Para consultas o soporte:Obtener datos de ejemplo (para desarrollo)



📧 Email: contacto@justdev.it  ## 🎨 Personalización

🌐 Web: https://justdev.it

### Cambiar objetivos mensuales

---

Edita en `index.html` (línea ~650):

## 📄 Licencia

```javascript

© 2025 Just Dev It. Todos los derechos reservados.const goals = [

    { name: 'Impresiones', current: data.summary.impressions, target: 1000 },  // ← Cambiar 1000

---    { name: 'Clics', current: data.summary.clicks, target: 20 },                // ← Cambiar 20

    { name: 'Keywords en Top 10', current: ..., target: 5 }                     // ← Cambiar 5

**Desarrollado con ❤️ por Just Dev It - Soluciones de Desarrollo Web Profesional**];

```

### Cambiar colores

Edita en `index.html` (línea ~10):

```css
body {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 100%
  ); /* ← Cambiar colores */
}
```

### Agregar más keywords de ejemplo

Edita en `api-server.py` (línea ~320):

```python
keywords_examples = [
    'tu keyword 1',
    'tu keyword 2',
    # ... más keywords
]
```

## 🐛 Solución de Problemas

### ❌ Error: "google-auth not found"

**Solución:**

```powershell
pip install -r requirements.txt
```

### ❌ Error: "403 Forbidden" al consultar API

**Solución:**

- Verifica que el Service Account esté agregado en Search Console
- Verifica que la propiedad URL sea correcta (con https://)
- Verifica que las APIs estén habilitadas en Google Cloud

### ❌ Dashboard no muestra datos

**Solución:**

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Si dice "CORS error", asegúrate que el servidor Python esté corriendo

### ❌ Servidor no inicia

**Solución:**

```powershell
# Verifica que Python esté instalado
python --version

# Si usas conda, activa el entorno
conda activate base

# Reinstala Flask
pip install flask flask-cors --upgrade
```

### ❌ Datos no se actualizan

**Solución:**

- Limpia caché del navegador (Ctrl + Shift + Delete)
- Limpia localStorage: Consola → `localStorage.clear()`
- Reinicia el servidor Python

## 📈 Roadmap

Funcionalidades futuras:

- [ ] Integración con Google Analytics 4
- [ ] Alertas por email cuando cambian posiciones
- [ ] Comparación con competidores
- [ ] Análisis de backlinks
- [ ] Exportar a PDF
- [ ] Dashboard para mobile
- [ ] Integración con Slack/Discord
- [ ] Multi-sitio (trackear varios sitios)

## 🤝 Contribuciones

¿Ideas para mejorar? ¡Crea un issue o PR!

## 📄 Licencia

MIT License - Úsalo libremente para tus proyectos

## 📞 Soporte

- 📧 Email: contacto@justdev.it
- 🌐 Web: www.justdev.it
- 📱 LinkedIn: linkedin.com/company/just-dev-it

---

**Creado con 💜 por Just Dev It**

_Dashboard SEO personalizado para monitorear tu posicionamiento orgánico_
