# 🔧 Guía de Configuración - SEO Dashboard

Esta guía te mostrará paso a paso cómo configurar el dashboard para conectar con tus datos reales de Google.

## 📋 Tabla de Contenidos

1. [Configuración Google Cloud](#1-configuración-google-cloud)
2. [Habilitar APIs](#2-habilitar-apis)
3. [Crear Service Account](#3-crear-service-account)
4. [Configurar Search Console](#4-configurar-search-console)
5. [Configurar el Dashboard](#5-configurar-el-dashboard)
6. [Verificar Conexión](#6-verificar-conexión)

---

## 1. Configuración Google Cloud

### Paso 1.1: Acceder a Google Cloud Console

1. Ve a: https://console.cloud.google.com
2. Inicia sesión con tu cuenta de Google
3. Si es tu primera vez, acepta los términos de servicio

### Paso 1.2: Crear un Proyecto

1. Haz clic en el selector de proyectos (arriba a la izquierda)
2. Haz clic en "Nuevo Proyecto"
3. **Nombre del proyecto:** `SEO Dashboard - Just Dev It`
4. **Organización:** Deja por defecto (si no tienes)
5. Haz clic en "Crear"
6. Espera 10-20 segundos a que se cree

✅ **Checkpoint:** Deberías ver tu nuevo proyecto seleccionado arriba

---

## 2. Habilitar APIs

### Paso 2.1: Google Search Console API

1. En el menú lateral, ve a: **APIs & Services** → **Library**
2. En la barra de búsqueda, escribe: `Search Console API`
3. Haz clic en **Google Search Console API**
4. Haz clic en **HABILITAR** (botón azul)
5. Espera a que se habilite (5-10 segundos)

✅ **Checkpoint:** Deberías ver "API habilitada" con un ✓ verde

### Paso 2.2: Google Analytics Data API (Opcional)

Si quieres datos de Google Analytics:

1. En la barra de búsqueda, escribe: `Analytics Data API`
2. Haz clic en **Google Analytics Data API**
3. Haz clic en **HABILITAR**

---

## 3. Crear Service Account

### Paso 3.1: Ir a Credenciales

1. En el menú lateral, ve a: **APIs & Services** → **Credentials**
2. Haz clic en **+ CREATE CREDENTIALS** (arriba)
3. Selecciona: **Service Account**

### Paso 3.2: Detalles del Service Account

**Paso 1 - Service account details:**

- **Service account name:** `seo-dashboard-api`
- **Service account ID:** Se genera automáticamente
- **Description:** `Service account para SEO Dashboard - acceso a Search Console`
- Haz clic en **CREATE AND CONTINUE**

**Paso 2 - Grant this service account access:**

- **Role:** Selecciona `Viewer` (o `Owner` si quieres permisos completos)
- Haz clic en **CONTINUE**

**Paso 3 - Grant users access:**

- Déjalo vacío (no es necesario)
- Haz clic en **DONE**

✅ **Checkpoint:** Deberías ver tu service account en la lista

### Paso 3.3: Crear Clave JSON

1. En la lista de service accounts, haz clic en el email que se creó

   - Ejemplo: `seo-dashboard-api@proyecto-123456.iam.gserviceaccount.com`

2. Ve a la pestaña **KEYS**

3. Haz clic en **ADD KEY** → **Create new key**

4. Selecciona formato: **JSON**

5. Haz clic en **CREATE**

6. **Se descargará un archivo JSON automáticamente**
   - Guárdalo en un lugar seguro
   - Ejemplo: `proyecto-123456-abc123def456.json`

⚠️ **IMPORTANTE:**

- **NO compartas este archivo** con nadie
- **NO lo subas a GitHub**
- **Guárdalo en un lugar seguro**

✅ **Checkpoint:** Tienes un archivo JSON descargado

### Paso 3.4: Copiar el Email del Service Account

1. Copia el email del service account
2. Ejemplo: `seo-dashboard-api@proyecto-123456.iam.gserviceaccount.com`
3. **Guarda este email**, lo necesitarás en el siguiente paso

---

## 4. Configurar Search Console

### Paso 4.1: Agregar Service Account como Usuario

1. Ve a: https://search.google.com/search-console

2. Selecciona tu propiedad: `https://justdev.it`

3. En el menú lateral, haz clic en **Settings** (⚙️)

4. Haz clic en **Users and permissions**

5. Haz clic en **ADD USER** (arriba a la derecha)

6. **Email address:** Pega el email del service account

   - Ejemplo: `seo-dashboard-api@proyecto-123456.iam.gserviceaccount.com`

7. **Permission level:** Selecciona **Full**

8. Haz clic en **ADD**

✅ **Checkpoint:** El service account debería aparecer en la lista de usuarios

---

## 5. Configurar el Dashboard

### Paso 5.1: Abrir el Dashboard

1. Ve a la carpeta: `seo-dashboard`
2. Abre el archivo: `index.html` en tu navegador
   - Doble clic o clic derecho → Abrir con → Chrome/Firefox

### Paso 5.2: Ir a Configuración

1. Haz clic en la pestaña **⚙️ Configuración** (arriba)

### Paso 5.3: Pegar Credenciales

**Property URL:**

```
https://justdev.it
```

**Service Account JSON:**

1. Abre el archivo JSON descargado con un editor de texto (Notepad, VSCode, etc.)
2. Copia TODO el contenido (Ctrl+A → Ctrl+C)
3. Pega en el campo "Service Account JSON (Credentials)"

Debería verse algo así:

```json
{
  "type": "service_account",
  "project_id": "proyecto-123456",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "seo-dashboard-api@proyecto-123456.iam.gserviceaccount.com",
  ...
}
```

**Google Analytics (Opcional):**

- Property ID: `G-E47YX9JYCS`
- Measurement ID: (si lo tienes)

### Paso 5.4: Guardar

1. Haz clic en **💾 Guardar Configuración**
2. Deberías ver: "✅ Configuración guardada correctamente"

✅ **Checkpoint:** Configuración guardada

---

## 6. Verificar Conexión

### Paso 6.1: Iniciar el Servidor API

**Opción A: Script automático (recomendado)**

```powershell
cd seo-dashboard
.\start.ps1
```

**Opción B: Manual**

```powershell
cd seo-dashboard
pip install -r requirements.txt
python api-server.py
```

Deberías ver:

```
🚀 SEO Dashboard API Server
✅ Servidor iniciado en: http://localhost:5000
```

### Paso 6.2: Probar Conexión

1. En el dashboard, haz clic en **🔌 Probar Conexión**

2. Espera 2-3 segundos

3. Deberías ver uno de estos mensajes:

   ✅ **"Conexión exitosa con Google Search Console"**

   - ¡Todo funcionó! Puedes continuar

   ⚠️ **"Error al conectar: 403 Forbidden"**

   - El service account no tiene permisos
   - Verifica el Paso 4 (agregar usuario en Search Console)

   ⚠️ **"Error al conectar: Property not found"**

   - La URL de la propiedad está mal
   - Verifica que sea exactamente: `https://justdev.it`

   ❌ **"Librerías de Google no instaladas"**

   - Ejecuta: `pip install -r requirements.txt`

### Paso 6.3: Actualizar Datos

1. Haz clic en **🔄 Actualizar Datos**

2. Espera 5-10 segundos (primera vez puede tardar más)

3. Deberías ver:
   - Stats actualizadas (impresiones, clics, CTR)
   - Tabla de keywords populada
   - Gráfico de tendencia
   - "✅ Datos actualizados correctamente"

✅ **¡LISTO!** Tu dashboard está funcionando con datos reales

---

## 🎉 ¡Felicidades!

Tu SEO Dashboard está completamente configurado y funcionando.

### Próximos Pasos:

1. **Explora el dashboard:**

   - Pestaña "Overview": Vista general
   - Pestaña "Keywords": Análisis detallado
   - Pestaña "Objetivos": Metas mensuales

2. **Configura tus metas:**

   - Edita los objetivos según tus necesidades
   - Trackea tu progreso semana a semana

3. **Exporta datos:**

   - Usa el botón "📥 Exportar CSV"
   - Analiza en Excel o Google Sheets

4. **Actualiza regularmente:**
   - Recomendado: Cada lunes
   - Usa el botón "🔄 Actualizar Datos"

---

## 🐛 Problemas Comunes

### ❌ "403 Forbidden"

**Causa:** Service account no tiene permisos

**Solución:**

1. Ve a Search Console
2. Settings → Users and permissions
3. Verifica que el email del service account esté con permisos "Full"
4. Espera 2-3 minutos y vuelve a intentar

### ❌ "Property not found"

**Causa:** URL de la propiedad incorrecta

**Solución:**

1. Ve a Search Console
2. Copia la URL exacta de tu propiedad
3. Pégala en el dashboard (debe incluir `https://`)

### ❌ "No data available"

**Causa:** Tu sitio todavía no tiene datos en Search Console

**Solución:**

1. Espera 2-3 días después de agregar el sitio a Search Console
2. Mientras tanto, usa datos de ejemplo (botón "Actualizar Datos" sin servidor)

### ❌ Servidor no inicia

**Causa:** Dependencias no instaladas

**Solución:**

```powershell
pip install -r requirements.txt --upgrade
```

---

## 📞 ¿Necesitas Ayuda?

- 📧 Email: contacto@justdev.it
- 🌐 Web: www.justdev.it
- 📚 Docs: Ver README.md

---

**Creado con 💜 por Just Dev It**
