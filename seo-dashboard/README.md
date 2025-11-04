# 📊 SEO Dashboard - Just Dev It

Dashboard personalizado para monitorear tu posicionamiento orgánico en Google. **100% local y seguro** - tus datos nunca salen de tu computadora.

## 🎯 Características

- ✅ **Datos en tiempo real** de Google Search Console
- 📈 **Gráficos interactivos** de tendencias
- 🔍 **Análisis de keywords** con posición, CTR y clics
- 🎯 **Objetivos y metas** personalizables
- 📥 **Exportar a CSV** para análisis externos
- 🔒 **100% local** - corre en tu computadora
- 💾 **Datos guardados** en localStorage del navegador
- 🎨 **Interfaz moderna** y responsive

## 🚀 Inicio Rápido

### Opción 1: Solo Frontend (Datos de ejemplo)

Si solo quieres ver el dashboard con datos de ejemplo:

1. **Abre el archivo:**

   ```
   seo-dashboard/index.html
   ```

   Doble clic o abre con tu navegador

2. **Haz clic en "Actualizar Datos"**
   - Verás datos de ejemplo generados
   - Puedes explorar todas las funcionalidades

### Opción 2: Con API Real (Datos de Google)

Para conectar con tus datos reales de Google Search Console:

#### Paso 1: Instalar dependencias

```powershell
cd seo-dashboard
pip install -r requirements.txt
```

#### Paso 2: Configurar Google Cloud

1. **Ve a [Google Cloud Console](https://console.cloud.google.com)**

2. **Crea un proyecto** (o usa uno existente)

3. **Habilita las APIs:**

   - Google Search Console API
   - Google Analytics Data API (opcional)

4. **Crea Service Account:**

   - Ve a "Credentials" → "Create Credentials" → "Service Account"
   - Dale un nombre: "SEO Dashboard"
   - Rol: "Viewer"
   - Crea una clave JSON y descárgala

5. **Agrega el Service Account a Search Console:**
   - Ve a [Google Search Console](https://search.google.com/search-console)
   - Selecciona tu propiedad
   - Settings → Users and permissions
   - Add user → Pega el email del service account
   - Permisos: "Full"

#### Paso 3: Iniciar el servidor

```powershell
python api-server.py
```

Verás:

```
🚀 SEO Dashboard API Server
✅ Servidor iniciado en: http://localhost:5000
📊 Dashboard: Abre seo-dashboard/index.html en tu navegador
```

#### Paso 4: Configurar el Dashboard

1. **Abre:** `seo-dashboard/index.html` en tu navegador

2. **Ve a la pestaña "Configuración"**

3. **Pega tus credenciales:**

   - Property URL: `https://justdev.it`
   - Service Account JSON: Pega el contenido del archivo JSON descargado
   - GA Property ID: `G-E47YX9JYCS` (si quieres Analytics)

4. **Haz clic en "Guardar Configuración"**

5. **Haz clic en "Probar Conexión"**

6. **Si todo está OK, haz clic en "Actualizar Datos"**

## 📋 Estructura de Archivos

```
seo-dashboard/
├── index.html          ← Dashboard principal (abre esto)
├── api-server.py       ← Servidor API Python (opcional)
├── requirements.txt    ← Dependencias Python
├── README.md           ← Esta documentación
├── config.json         ← Configuración (se crea automáticamente)
└── .gitignore          ← Archivos ignorados por git
```

## 🔒 Seguridad

### ¿Es seguro?

**SÍ**, totalmente seguro porque:

1. ✅ **Corre 100% en local** (localhost:5000)
2. ✅ **No hay servidor externo** - todo queda en tu PC
3. ✅ **Credenciales guardadas localmente** en tu navegador
4. ✅ **No se envía nada a internet** excepto a Google APIs
5. ✅ **Código abierto** - puedes revisar todo

### Recomendaciones:

- 🔒 **NO expongas el servidor** a internet (puerto 5000)
- 🔒 **NO compartas tu archivo config.json** (tiene tus credenciales)
- 🔒 **Agrega al .gitignore** el config.json
- 🔒 **Revoca el Service Account** cuando no lo necesites

## 📊 Endpoints de la API

Si quieres integrar con otras herramientas:

### GET `/api/health`

Verificar que el servidor está funcionando

**Respuesta:**

```json
{
  "status": "ok",
  "google_libs": true,
  "timestamp": "2025-11-04T10:30:00"
}
```

### POST `/api/search-console/query`

Obtener datos de Search Console

**Request:**

```json
{
  "property_url": "https://justdev.it",
  "credentials": "{...}",
  "start_date": "2025-10-28",
  "end_date": "2025-11-04"
}
```

**Response:**

```json
{
  "summary": {
    "impressions": 2500,
    "clicks": 85,
    "ctr": 3.4,
    "position": 8.5
  },
  "keywords": [
    {
      "keyword": "desarrollo software fintech",
      "position": 8,
      "impressions": 450,
      "clicks": 12,
      "ctr": 2.7
    }
  ]
}
```

### POST `/api/search-console/trend`

Obtener tendencia de los últimos 7 días

### POST `/api/test-connection`

Probar conexión con Google Search Console

### GET `/api/mock-data`

Obtener datos de ejemplo (para desarrollo)

## 🎨 Personalización

### Cambiar objetivos mensuales

Edita en `index.html` (línea ~650):

```javascript
const goals = [
    { name: 'Impresiones', current: data.summary.impressions, target: 1000 },  // ← Cambiar 1000
    { name: 'Clics', current: data.summary.clicks, target: 20 },                // ← Cambiar 20
    { name: 'Keywords en Top 10', current: ..., target: 5 }                     // ← Cambiar 5
];
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
