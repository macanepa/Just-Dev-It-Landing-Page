# 🤖 Automatización del SEO Dashboard - Guía Completa

## 📋 Archivos Creados

He creado tres archivos para automatizar la actualización:

1. **`actualizar-seo-automatico.bat`** - Script principal para Windows
2. **`actualizar-datos-auto.py`** - Script Python que obtiene los datos
3. **`actualizar-seo-automatico.ps1`** - Versión PowerShell (opcional, más robusta)

---

## 🚀 Configuración del Programador de Tareas de Windows

### Paso 1: Abrir el Programador de Tareas

1. Presiona `Windows + R`
2. Escribe: `taskschd.msc`
3. Presiona Enter

### Paso 2: Crear una Nueva Tarea

1. En el panel derecho, haz clic en **"Crear tarea básica..."**
2. Configura así:

#### **General:**
- **Nombre:** `SEO Dashboard - Actualización Automática`
- **Descripción:** `Actualiza los datos del dashboard SEO desde Google Search Console`
- ✅ Marcar: **"Ejecutar con los privilegios más altos"**
- **Configurar para:** Windows 10/11

#### **Desencadenadores (Cuándo ejecutar):**

**Opción A: Todos los días a las 9:00 AM**
1. Clic en "Nuevo..."
2. Iniciar la tarea: **Según una programación**
3. Configuración: **Diariamente**
4. Hora: **09:00:00**
5. Repetir cada: **1 día**
6. ✅ Habilitado

**Opción B: Cada lunes a las 9:00 AM (recomendado)**
1. Clic en "Nuevo..."
2. Iniciar la tarea: **Según una programación**
3. Configuración: **Semanalmente**
4. Días: ✅ **Lunes**
5. Hora: **09:00:00**
6. ✅ Habilitado

**Opción C: Varias veces por semana**
- Puedes agregar múltiples desencadenadores
- Por ejemplo: Lunes, Miércoles y Viernes a las 9:00 AM

#### **Acciones (Qué ejecutar):**
1. Clic en "Nuevo..."
2. Acción: **Iniciar un programa**
3. **Programa o script:**
   ```
   C:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\seo-dashboard\actualizar-seo-automatico.bat
   ```
4. **Iniciar en (opcional):**
   ```
   C:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\seo-dashboard
   ```

#### **Condiciones:**
- ❌ Desmarcar: "Iniciar la tarea solo si el equipo está en corriente alterna"
- ✅ Marcar: "Iniciar la tarea aunque el equipo funcione con batería"
- ✅ Marcar: "Activar la tarea si se perdió el inicio programado"

#### **Configuración:**
- ✅ Marcar: "Permitir que la tarea se ejecute a petición"
- ✅ Marcar: "Ejecutar la tarea lo antes posible después de perder un inicio programado"
- Si la tarea falla, reintentar cada: **10 minutos**
- Intentos de reintentar: **3**
- Detener la tarea si se ejecuta más de: **1 hora**

### Paso 3: Probar la Tarea

1. En el Programador de Tareas, busca tu tarea creada
2. Haz clic derecho sobre ella
3. Selecciona **"Ejecutar"**
4. Verifica que se ejecute correctamente
5. Revisa el archivo de log: `actualizacion-log.txt`

---

## 📊 Verificar que Funciona

Después de ejecutar la tarea (manualmente o automáticamente):

1. Ve a la carpeta `seo-dashboard`
2. Busca el archivo **`actualizacion-log.txt`**
3. Ábrelo y verifica que diga:
   ```
   [2025-11-04 09:00:15] [INFO] ✅ Actualización completada exitosamente
   ```

4. Busca el archivo **`datos-actualizados.json`**
5. Este archivo contiene los datos actualizados del dashboard

---

## 🔧 Ejecución Manual

Si quieres actualizar manualmente en cualquier momento:

**Opción 1: Doble clic**
- Ve a la carpeta `seo-dashboard`
- Doble clic en `actualizar-seo-automatico.bat`

**Opción 2: PowerShell**
```powershell
cd "C:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\seo-dashboard"
.\actualizar-seo-automatico.bat
```

---

## 📝 Logs y Monitoreo

### Archivo de Log
- **Ubicación:** `seo-dashboard/actualizacion-log.txt`
- **Contiene:** Fecha/hora de cada actualización, errores, mensajes
- **Retención:** Últimos 30 días automáticamente

### Datos Actualizados
- **Ubicación:** `seo-dashboard/datos-actualizados.json`
- **Contiene:** Últimos datos obtenidos de Search Console
- **Formato:** JSON con keywords, posiciones, clics, etc.

---

## ❓ Solución de Problemas

### Error: "Python no está instalado"
**Solución:** Asegúrate de que Python esté en el PATH de Windows
```powershell
python --version
```

### Error: "No se encontró config.json"
**Solución:** Abre el dashboard manualmente y completa la configuración primero

### Error: "403 Forbidden"
**Solución:** Verifica que la cuenta de servicio tiene permisos en Search Console

### La tarea no se ejecuta
**Solución:** 
1. Verifica que la tarea esté habilitada
2. Revisa el historial en el Programador de Tareas
3. Ejecuta manualmente para ver el error

---

## 📅 Programaciones Recomendadas

### Para Monitoreo Regular:
- **Lunes a las 9:00 AM** (inicio de semana)
- Revisa el dashboard y compara con la semana anterior

### Para Análisis Intensivo:
- **Lunes, Miércoles y Viernes a las 9:00 AM**
- Para proyectos con alta rotación de keywords

### Para Mantenimiento Básico:
- **Cada 15 días**
- Suficiente para ver tendencias a largo plazo

---

## 🎯 Siguiente Paso

**Configura ahora el Programador de Tareas:**
1. Presiona `Windows + R`
2. Escribe `taskschd.msc`
3. Sigue los pasos de arriba
4. Ejecuta la tarea manualmente para probar
5. ¡Listo! Se actualizará automáticamente

---

## 💡 Tip Pro

Puedes crear una **notificación por email** cuando se actualice:
1. En el Programador de Tareas, agrega una acción adicional
2. Acción: "Enviar un correo electrónico"
3. Configura tu email SMTP

O simplemente revisa el log cada vez que quieras ver el estado.

---

**¿Necesitas ayuda para configurar el Programador de Tareas?** Dime en qué paso te quedaste.
