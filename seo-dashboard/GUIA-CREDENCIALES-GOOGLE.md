# 🔑 GUÍA: Cómo Obtener Credenciales de Google Cloud

## 📋 PASOS PARA OBTENER LAS CREDENCIALES

### 1️⃣ Ir a Google Cloud Console

Abre tu navegador y ve a:

```
https://console.cloud.google.com
```

---

### 2️⃣ Crear o Seleccionar Proyecto

**Si NO tienes proyecto:**

1. Click en el menú desplegable de proyectos (arriba a la izquierda)
2. Click en "NUEVO PROYECTO"
3. Nombre: "SEO Dashboard" (o el que prefieras)
4. Click en "CREAR"

**Si YA tienes proyecto:**

1. Selecciónalo del menú desplegable

---

### 3️⃣ Habilitar las APIs Necesarias

#### API de Search Console:

1. Ve al menú lateral → "APIs y servicios" → "Biblioteca"
2. Busca: `Search Console API`
3. Click en la API
4. Click en "HABILITAR"

#### API de PageSpeed (opcional):

1. En la biblioteca de APIs
2. Busca: `PageSpeed Insights API`
3. Click en "HABILITAR"

---

### 4️⃣ Crear Cuenta de Servicio

1. Ve al menú lateral → "IAM y administración" → "Cuentas de servicio"
2. Click en "CREAR CUENTA DE SERVICIO"
3. Completa los datos:
   - **Nombre**: `seo-dashboard-service`
   - **Descripción**: `Cuenta para acceder a Search Console y Analytics`
4. Click en "CREAR Y CONTINUAR"
5. En "Función", puedes dejarlo vacío (lo configuraremos después)
6. Click en "LISTO"

---

### 5️⃣ Generar Clave JSON

1. En la lista de cuentas de servicio, click en la que acabas de crear
2. Ve a la pestaña "CLAVES"
3. Click en "AGREGAR CLAVE" → "Crear clave nueva"
4. Selecciona formato: **JSON**
5. Click en "CREAR"
6. Se descargará un archivo JSON automáticamente
   - Nombre típico: `proyecto-123456-abc123.json`

---

### 6️⃣ Dar Permisos en Search Console

**IMPORTANTE**: La cuenta de servicio necesita acceso a tu propiedad de Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Selecciona tu propiedad (ej: `justdev.it`)
3. Click en "Configuración" (⚙️) en el menú lateral izquierdo
4. Click en "Usuarios y permisos"
5. Click en "AGREGAR USUARIO"
6. Ingresa el email de la cuenta de servicio:
   - Lo encuentras en el archivo JSON como `client_email`
   - Ejemplo: `seo-dashboard-service@proyecto-123456.iam.gserviceaccount.com`
7. Selecciona tipo de permiso: **PROPIETARIO** o **COMPLETO**
8. Click en "AGREGAR"

---

### 7️⃣ Configurar las Credenciales en el Dashboard

**Opción A - Archivo credentials.json (Recomendado)**:

1. Renombra el archivo descargado a `credentials.json`
2. Cópialo a la carpeta: `seo-dashboard/`
3. Ejecuta:
   ```bash
   python scripts/configurar-apis-interactivo.py
   ```
4. Selecciona opción 1 (usar archivo)

**Opción B - Pegar JSON manualmente**:

1. Abre el archivo JSON descargado con un editor de texto
2. Copia TODO el contenido (Ctrl+A, Ctrl+C)
3. Ejecuta:
   ```bash
   python scripts/configurar-apis-interactivo.py
   ```
4. Selecciona opción 2 (pegar JSON)
5. Pega el contenido completo
6. Presiona Enter dos veces

---

## 🔍 VERIFICAR QUE TODO FUNCIONA

### Paso 1: Verificar config.json

Deberías tener el archivo: `seo-dashboard/config/config.json`

```json
{
  "propertyUrl": "https://justdev.it/",
  "serviceAccountJson": {
    "type": "service_account",
    "project_id": "tu-proyecto-id",
    "private_key_id": "...",
    "private_key": "-----BEGIN PRIVATE KEY-----\n...",
    "client_email": "seo-dashboard-service@proyecto-123456.iam.gserviceaccount.com",
    ...
  },
  "analyticsPropertyId": "G-E47YX9JYCS",
  "measurementId": "G-E47YX9JYCS"
}
```

### Paso 2: Probar Conexión

```bash
cd seo-dashboard
python api-server-realtime.py
```

Si todo está bien, verás:

```
============================================================
🚀 API SERVER - SEO Dashboard
============================================================

📡 Endpoints disponibles:
   • POST /api/update-search-console
   • POST /api/update-pagespeed
   ...

🌍 Servidor corriendo en: http://localhost:5000
============================================================
```

### Paso 3: Actualizar Datos

1. Abre el dashboard: `http://localhost:8001`
2. Click en "🔄 Actualizar Datos"
3. Deberías ver: "✅ Datos actualizados correctamente!"

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Error: "Credenciales inválidas"

**Causa**: El JSON no está completo o está mal formateado

**Solución**:

1. Vuelve a descargar la clave JSON desde Google Cloud
2. Asegúrate de copiar TODO el contenido
3. No edites el archivo manualmente

---

### Error: "Permission denied"

**Causa**: La cuenta de servicio no tiene permisos en Search Console

**Solución**:

1. Ve a Search Console → Configuración → Usuarios y permisos
2. Busca el email de la cuenta de servicio
3. Si no está, agrégala con permisos de PROPIETARIO
4. Espera 5-10 minutos para que se propaguen los permisos

---

### Error: "Property not found"

**Causa**: La URL en `config.json` no coincide con la propiedad de Search Console

**Solución**:

Si tu propiedad es de tipo **Dominio**:

```json
"propertyUrl": "sc-domain:justdev.it"
```

Si tu propiedad es de tipo **Prefijo de URL**:

```json
"propertyUrl": "https://justdev.it/"
```

Para verificar el tipo:

1. Ve a Search Console
2. Mira el nombre de tu propiedad en el selector
3. Si tiene `sc-domain:` es de tipo dominio
4. Si tiene `https://` es de tipo prefijo

---

### Error: "API not enabled"

**Causa**: No habilitaste la Search Console API

**Solución**:

1. Ve a Google Cloud Console
2. APIs y servicios → Biblioteca
3. Busca "Search Console API"
4. Click en "HABILITAR"
5. Espera 1-2 minutos

---

## 📚 RECURSOS ÚTILES

- **Google Cloud Console**: https://console.cloud.google.com
- **Search Console**: https://search.google.com/search-console
- **Documentación Search Console API**: https://developers.google.com/webmaster-tools
- **Cuentas de Servicio**: https://cloud.google.com/iam/docs/service-accounts

---

## 🎯 RESUMEN RÁPIDO

```bash
# 1. Descargar JSON de Google Cloud
# 2. Renombrar a credentials.json
# 3. Copiar a carpeta seo-dashboard/
# 4. Ejecutar configuración:
python scripts/configurar-apis-interactivo.py

# 5. Agregar cuenta de servicio a Search Console
# 6. Iniciar API Server:
python api-server-realtime.py

# 7. Iniciar Dashboard:
python -m http.server 8001

# 8. Abrir navegador y actualizar datos
```

---

**¡Listo! Con estos pasos tendrás las credenciales configuradas correctamente. 🎉**
