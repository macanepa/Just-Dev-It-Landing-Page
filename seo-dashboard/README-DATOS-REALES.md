# 🚀 Dashboard SEO con Datos Reales de Google APIs

## ✅ IMPLEMENTACIÓN COMPLETADA

Tu dashboard ahora puede actualizar datos en **TIEMPO REAL** desde las APIs de Google.

---

## 📁 Archivos Creados

1. **`api-server-realtime.py`** - Servidor API que conecta con Google APIs
2. **`INICIAR-CON-APIS.bat`** - Script para iniciar todo automáticamente
3. **`index.html`** - Modificado para llamar a las APIs reales

---

## 🎯 CÓMO FUNCIONA

### Antes (Datos Estáticos)

```
Dashboard → keywords-database.json (datos antiguos)
```

### Ahora (Datos en Tiempo Real)

```
1. Carga Inicial:
   Dashboard → keywords-database.json (última versión guardada)

2. Al presionar "Actualizar":
   Dashboard → API Server → Google APIs → Datos nuevos
   ↓
   Se guardan en keywords-database.json
   ↓
   Dashboard se recarga con datos actualizados
```

---

## 🚀 INICIO RÁPIDO

### Paso 1: Instalar Dependencias (solo primera vez)

```bash
pip install flask flask-cors google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client requests
```

### Paso 2: Configurar Google APIs (solo primera vez)

```bash
python scripts/crear-config.py
```

Te pedirá el JSON de Service Account de Google Cloud.

### Paso 3: Iniciar Todo

**Opción A - Automático (Recomendado)**:

```bash
.\INICIAR-CON-APIS.bat
```

**Opción B - Manual**:

Terminal 1 - API Server:

```bash
python api-server-realtime.py
```

Terminal 2 - Dashboard:

```bash
python -m http.server 8001
```

### Paso 4: Usar el Dashboard

1. Abre: http://localhost:8001
2. Click en "🔄 Actualizar Datos"
3. ¡Listo! Los datos se actualizan desde Google

---

## 🎮 BOTONES DE ACTUALIZACIÓN

Todos estos botones ahora llaman a las APIs reales:

- **"Actualizar Datos"** (botón principal) → Actualiza Search Console + PageSpeed
- **"Actualizar"** (sección Keywords) → Actualiza solo Search Console
- **"Actualizar"** (sección Performance) → Actualiza solo PageSpeed

---

## 🏗️ ARQUITECTURA

```
┌──────────────────────┐
│   NAVEGADOR          │  localhost:8001
│   Dashboard HTML     │
└──────────┬───────────┘
           │ fetch()
           ▼
┌──────────────────────┐
│   API SERVER         │  localhost:5000
│   Flask/Python       │
│   api-server-realtime.py
└──────────┬───────────┘
           │ Google SDK
           ▼
┌──────────────────────┐
│   GOOGLE APIs        │
│   • Search Console   │
│   • PageSpeed        │
│   • Analytics (futuro)
└──────────────────────┘
```

---

## 📡 ENDPOINTS DE LA API

### POST `/api/update-search-console`

Actualiza keywords desde Google Search Console

- Guarda en: `keywords-database.json`
- Retorna: datos actualizados + mensaje de éxito

### POST `/api/update-pagespeed`

Analiza performance con PageSpeed Insights

- Guarda en: `data/performance-opportunities.json`
- Requiere: `{url: "https://tu-sitio.com"}`

### GET `/api/status`

Verifica que el servidor esté corriendo

- Retorna: estado del servidor + configuración

### GET `/api/get-keywords`

Obtiene keywords actuales sin actualizar

- Retorna: contenido de `keywords-database.json`

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Error: "API Server no está corriendo"

**Solución**: Inicia el servidor API

```bash
python api-server-realtime.py
```

### Error: "Configuración no encontrada"

**Solución**: Configura las credenciales

```bash
python scripts/crear-config.py
```

### Error: "Credenciales inválidas"

**Solución**: Verifica que `config/config.json` tenga:

- Service Account JSON correcto
- propertyUrl de tu sitio (ej: `https://justdev.it/`)

### Dashboard muestra datos antiguos

**Solución**: Recarga forzada

- Presiona `Ctrl + Shift + R`
- O borra caché del navegador

---

## 📊 EJEMPLO DE USO

```javascript
// En el dashboard, al presionar "Actualizar Datos":

1. Verificar que API Server esté corriendo
   fetch('http://localhost:5000/api/status')

2. Actualizar Search Console
   fetch('http://localhost:5000/api/update-search-console', {method: 'POST'})

3. Actualizar PageSpeed (opcional)
   fetch('http://localhost:5000/api/update-pagespeed', {
     method: 'POST',
     body: JSON.stringify({url: 'https://justdev.it'})
   })

4. Recargar datos actualizados
   fetch('keywords-database.json?t=' + Date.now())

5. Actualizar visualización
   updateDashboardWithData(newData)
```

---

## 🎯 VENTAJAS

✅ **Datos Siempre Actualizados**: Un click y tienes lo último de Google  
✅ **Sin Comandos Manuales**: No necesitas ejecutar scripts Python  
✅ **Mantiene Historial**: Los JSON se guardan para consulta offline  
✅ **Fácil de Usar**: Solo presiona "Actualizar Datos"  
✅ **Flexible**: Puedes actualizar solo una sección específica

---

## 🔗 RECURSOS

- **Google Search Console**: https://search.google.com/search-console
- **Google Cloud Console**: https://console.cloud.google.com
- **PageSpeed Insights**: https://pagespeed.web.dev

---

## 📝 NOTAS TÉCNICAS

- El servidor API debe estar corriendo para actualizar datos
- Los datos se guardan en archivos JSON locales
- La primera carga usa datos locales (más rápido)
- La actualización consulta Google APIs (más lento pero actual)
- PageSpeed puede tardar 30-60 segundos por URL
- Search Console trae datos de últimos 90 días

---

## 🆘 SOPORTE

Si tienes problemas:

1. Verifica que ambos servidores estén corriendo (5000 y 8001)
2. Revisa la consola del navegador (F12) para errores
3. Mira los logs del API Server en la terminal
4. Asegúrate que `config/config.json` esté configurado

---

**¡Listo! Ahora tienes un dashboard con datos en tiempo real de Google. 🎉**
