# 🎓 Tutorial Paso a Paso - Configuración Google Cloud

## Para personas que NO saben nada de APIs (¡como tú!)

---

## 🤔 ¿Qué vamos a hacer?

Imagina que:

- **Google Search Console** = Un almacén con tus datos de SEO
- **Service Account** = Un robot que va al almacén por ti
- **API** = La puerta por donde el robot entra
- **Credenciales JSON** = La llave del robot

Vamos a:

1. Crear el almacén (proyecto en Google Cloud)
2. Abrir la puerta (habilitar API)
3. Crear el robot (Service Account)
4. Darle la llave (descargar JSON)
5. Darle permiso para entrar (agregar en Search Console)

---

## 📝 PARTE 1: Google Cloud Console (15 minutos)

### Paso 1.1: Entrar a Google Cloud

1. **Abre tu navegador** (Chrome, Firefox, Edge)

2. **Ve a:** https://console.cloud.google.com

3. **Inicia sesión** con tu cuenta de Google

   - Usa la misma cuenta que usas para Search Console
   - Si no estás seguro, usa la del trabajo/empresa

4. **Primera vez?** Te pedirá:
   - Aceptar términos de servicio ✅
   - Seleccionar país: Chile
   - Haz clic en "Aceptar y continuar"

✅ **Listo!** Estás en la consola de Google Cloud

---

### Paso 1.2: Crear un Proyecto

1. **Arriba a la izquierda**, junto al logo de Google Cloud, verás un selector

   - Dice algo como "Seleccionar un proyecto"
   - Haz clic ahí

2. **Se abre una ventana**, haz clic en el botón: **"NUEVO PROYECTO"**

   - Está arriba a la derecha de la ventana

3. **Formulario de nuevo proyecto:**

   ```
   Nombre del proyecto: SEO Dashboard JustDevIt

   Organización: (déjalo como está, probablemente "Sin organización")

   Ubicación: (déjalo como está)
   ```

4. **Haz clic en:** "CREAR" (botón azul)

5. **Espera 10-20 segundos**
   - Verás un spinner girando
   - Cuando termine, te llevará al nuevo proyecto

✅ **Checkpoint:** Arriba a la izquierda debería decir "SEO Dashboard JustDevIt"

---

### Paso 1.3: Habilitar la API de Search Console

1. **En el menú lateral izquierdo** (las 3 rayitas ≡), busca:

   ```
   APIs y servicios → Biblioteca
   ```

   - O en inglés: "APIs & Services" → "Library"

2. **Se abre la biblioteca de APIs**

   - Verás muchas tarjetas con logos

3. **En la barra de búsqueda** (arriba), escribe:

   ```
   Search Console API
   ```

4. **Haz clic** en la tarjeta que dice:

   ```
   Google Search Console API
   por Google
   ```

5. **Verás la página de la API**, haz clic en:

   ```
   HABILITAR (o ENABLE si está en inglés)
   ```

6. **Espera 5-10 segundos**
   - Verás una pantalla de carga
   - Cuando termine, verás "API habilitada" con un ✓

✅ **Checkpoint:** Deberías ver "API habilitada" con un check verde

---

### Paso 1.4: Crear el Service Account (El Robot)

1. **En el menú lateral**, ve a:

   ```
   APIs y servicios → Credenciales
   ```

2. **Arriba**, haz clic en:

   ```
   + CREAR CREDENCIALES
   ```

3. **Del menú desplegable**, selecciona:

   ```
   Cuenta de servicio (o Service Account)
   ```

4. **Formulario "Detalles de la cuenta de servicio":**

   ```
   Nombre de la cuenta de servicio: seo-dashboard

   ID de la cuenta de servicio: (se llena automáticamente)

   Descripción: Robot para leer datos de Search Console
   ```

5. **Haz clic en:** "CREAR Y CONTINUAR"

6. **Paso 2 - "Otorgar acceso":**

   ```
   Selecciona una función: Viewer (o Visualizador)
   ```

   - Busca "Viewer" en el desplegable
   - O escribe "viewer" y aparecerá

7. **Haz clic en:** "CONTINUAR"

8. **Paso 3 - "Otorgar acceso a usuarios":**
   - **Déjalo vacío**
   - Haz clic en: "LISTO"

✅ **Checkpoint:** Deberías ver tu service account en la lista

- Email tipo: `seo-dashboard@proyecto-123.iam.gserviceaccount.com`

---

### Paso 1.5: Descargar las Credenciales (La Llave)

**¡IMPORTANTE!** Esta es la parte más crítica:

1. **En la lista de cuentas de servicio**, verás tu robot

   - Email: `seo-dashboard@xxxxx.iam.gserviceaccount.com`
   - Haz clic EN EL EMAIL (texto azul)

2. **Se abre la página del service account**
3. **Ve a la pestaña:** "CLAVES" (o "KEYS")

4. **Haz clic en:** "AGREGAR CLAVE" → "Crear clave nueva"

5. **Ventana emergente:**

   ```
   Tipo de clave: JSON ← IMPORTANTE: Selecciona JSON
   ```

6. **Haz clic en:** "CREAR"

7. **Se descargará automáticamente un archivo**

   - Nombre tipo: `seo-dashboard-justdevit-abc123.json`
   - **¡GUÁRDALO EN UN LUGAR SEGURO!**
   - Ejemplo: Documentos, Escritorio (temporal)

8. **COPIA EL EMAIL DEL SERVICE ACCOUNT**
   - Ejemplo: `seo-dashboard@proyecto-123456.iam.gserviceaccount.com`
   - Pégalo en un Notepad temporal
   - **Lo necesitarás en el siguiente paso**

⚠️ **MUY IMPORTANTE:**

- Este archivo JSON es como una contraseña
- **NO lo compartas con nadie**
- **NO lo subas a GitHub** (ya está en .gitignore)
- Si lo pierdes, crea uno nuevo

✅ **Checkpoint:** Tienes descargado un archivo .json

---

## 📝 PARTE 2: Google Search Console (5 minutos)

Ahora vamos a darle permiso al robot para entrar a tu almacén de datos.

### Paso 2.1: Abrir Search Console

1. **Ve a:** https://search.google.com/search-console

2. **Inicia sesión** (misma cuenta de antes)

3. **Selecciona tu propiedad:**
   ```
   https://justdev.it
   ```
   - Si no la tienes agregada todavía, agrégala primero
   - Menú: "Agregar propiedad" → Prefijo de URL

✅ **Checkpoint:** Estás viendo el dashboard de justdev.it

---

### Paso 2.2: Agregar el Robot como Usuario

1. **En el menú lateral izquierdo**, haz clic en:

   ```
   ⚙️ Configuración (o Settings)
   ```

2. **En la página de configuración**, busca:

   ```
   Usuarios y permisos (o Users and permissions)
   ```

3. **Arriba a la derecha**, haz clic en:

   ```
   AGREGAR USUARIO (o ADD USER)
   ```

4. **Ventana emergente:**

   ```
   Dirección de email:
   [Aquí pega el email del service account que copiaste]
   Ejemplo: seo-dashboard@proyecto-123456.iam.gserviceaccount.com

   Permisos: Completo (o Full)
   ```

5. **Haz clic en:** "AGREGAR"

6. **Deberías ver el robot en la lista de usuarios**
   - Con el email largo
   - Permisos: Propietario/Full

✅ **Checkpoint:** El service account aparece en la lista de usuarios

---

## 📝 PARTE 3: Configurar el Dashboard (5 minutos)

Ahora sí, vamos a conectar todo.

### Paso 3.1: Abrir el archivo JSON

1. **Busca el archivo JSON** que descargaste

   - Ejemplo: `seo-dashboard-justdevit-abc123.json`

2. **Ábrelo con un editor de texto:**

   - Clic derecho → Abrir con → Notepad (Bloc de notas)
   - O usa Visual Studio Code si lo tienes

3. **Verás algo así:**

   ```json
   {
     "type": "service_account",
     "project_id": "seo-dashboard-123456",
     "private_key_id": "abc123def456...",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...",
     "client_email": "seo-dashboard@proyecto.iam.gserviceaccount.com",
     ...
   }
   ```

4. **Selecciona TODO el contenido:**
   - Ctrl + A (seleccionar todo)
   - Ctrl + C (copiar)

✅ **Checkpoint:** Tienes el JSON copiado en el portapapeles

---

### Paso 3.2: Pegar en el Dashboard

1. **Ve al dashboard** (ya está abierto en tu navegador)

   - Si lo cerraste: Doble clic en `index.html`

2. **Haz clic en la pestaña:** "⚙️ Configuración"

3. **Verás 3 campos:**

   **Campo 1 - Property URL:**

   ```
   https://justdev.it
   ```

   **Campo 2 - Service Account JSON:**

   - Haz clic en el área de texto grande
   - Pega (Ctrl + V) el JSON que copiaste
   - Debería llenarse con todo el contenido del archivo

   **Campo 3 - Property ID (opcional por ahora):**

   ```
   G-E47YX9JYCS
   ```

4. **Haz clic en:** 💾 Guardar Configuración

5. **Deberías ver:**
   ```
   ✅ Configuración guardada correctamente
   ```

✅ **Checkpoint:** Configuración guardada

---

### Paso 3.3: Probar la Conexión

1. **Haz clic en:** 🔌 Probar Conexión

2. **Espera 2-3 segundos**

3. **Resultado esperado:**
   ```
   ✅ Conexión exitosa con Google Search Console
   ```

**Si sale error:**

❌ **"Error 403 Forbidden"**

- El robot no tiene permisos
- Vuelve a la Parte 2 (Search Console)
- Verifica que agregaste el email correcto

❌ **"Property not found"**

- La URL está mal
- Verifica: debe ser `https://justdev.it` (con https)

❌ **"No data available"**

- Tu sitio es muy nuevo en Search Console
- Espera 2-3 días y vuelve a intentar
- Mientras tanto, usa datos de ejemplo

✅ **Checkpoint:** Conexión exitosa

---

## 🎉 PARTE 4: Usar el Dashboard

### Paso 4.1: Iniciar el Servidor API

1. **Abre PowerShell** en la carpeta seo-dashboard

2. **Ejecuta:**

   ```powershell
   python api-server.py
   ```

3. **Deberías ver:**

   ```
   🚀 SEO Dashboard API Server
   ✅ Servidor iniciado en: http://localhost:5000
   ```

4. **Deja esta ventana abierta**
   - Minimízala si quieres
   - No la cierres o el servidor se detendrá

---

### Paso 4.2: Actualizar Datos

1. **En el dashboard**, haz clic en:

   ```
   🔄 Actualizar Datos
   ```

2. **Espera 5-10 segundos** (primera vez puede tardar)

3. **Deberías ver:**
   - Stats actualizadas (impresiones, clics, CTR)
   - Tabla de keywords con tus datos reales
   - Gráfico de tendencia
   - "✅ Datos actualizados correctamente"

---

### Paso 4.3: Explorar el Dashboard

**Pestaña Overview:**

- Métricas principales
- Gráfico de tendencia
- Objetivos del mes

**Pestaña Keywords:**

- Tabla con todas tus keywords
- Posición de cada una
- Impresiones, clics, CTR

**Pestaña Objetivos:**

- Tus metas mensuales
- Progreso visual

**Botón Exportar CSV:**

- Descarga tus datos
- Ábrelos en Excel

---

## 🎓 Resumen de lo que hiciste

1. ✅ Creaste un proyecto en Google Cloud
2. ✅ Habilitaste la API de Search Console
3. ✅ Creaste un Service Account (robot)
4. ✅ Descargaste las credenciales (llave)
5. ✅ Agregaste el robot a Search Console
6. ✅ Configuraste el dashboard
7. ✅ Probaste la conexión
8. ✅ Obtuviste tus datos reales

---

## 🔄 Uso Diario (Cada Lunes)

```powershell
# 1. Iniciar servidor
cd seo-dashboard
python api-server.py

# 2. Abrir dashboard (en otro terminal o doble clic)
start index.html

# 3. En el dashboard:
- Clic en "Actualizar Datos"
- Revisar cambios en keywords
- Exportar CSV si necesitas
```

---

## 🆘 ¿Problemas?

**Ejecuta el verificador:**

```powershell
python verify-setup.py
```

**O contacta:**

- 📧 contacto@justdev.it
- 📚 Ver SETUP-GUIDE.md para más detalles

---

**¡Felicidades! Ya tienes tu dashboard funcionando** 🎉
