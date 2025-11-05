# 🎯 INICIO ULTRA RÁPIDO - 3 MINUTOS

**La forma MÁS SIMPLE de empezar a usar tu dashboard SEO**

---

## 🚀 OPCIÓN 1: Solo Quiero Ver el Dashboard (0 configuración)

### **Paso 1:** Doble clic aquí 👇

```
📁 seo-dashboard/
   📄 ABRIR-DASHBOARD.bat  ← ¡DOBLE CLIC AQUÍ!
```

### **Paso 2:** ¡Listo!

El dashboard se abrirá en tu navegador automáticamente.

**Verás:**
- ✅ 9 secciones funcionando
- ✅ Gráficas animadas
- ✅ Datos de ejemplo realistas
- ✅ Todo funciona perfecto

**Limitación:** Son datos de ejemplo, NO de tu sitio real.

---

## 🛠️ OPCIÓN 2: Quiero Datos Reales de Mi Sitio (30 minutos)

### **Resumen de lo que harás:**

```
1. Instalar Python (5 min)
2. Configurar Google Cloud (15 min)
3. Conectar tu sitio web (5 min)
4. Iniciar dashboard (2 min)
```

### **Paso 1: Instalar Python**

**Windows:**
1. Ir a: https://www.python.org/downloads/
2. Descargar la última versión
3. ✅ IMPORTANTE: Marcar "Add Python to PATH"
4. Instalar normalmente

**Verificar:**
```powershell
python --version
# Debe mostrar: Python 3.11.x o superior
```

### **Paso 2: Instalar Dependencias**

```powershell
# Abrir PowerShell en la carpeta seo-dashboard
cd "ruta\a\tu\seo-dashboard"

# Instalar
pip install -r requirements.txt
```

**Esperar 2-3 minutos** mientras se instala todo.

### **Paso 3: Configurar Google Cloud**

**A) Crear Proyecto:**
1. Ir a: https://console.cloud.google.com/
2. Crear nuevo proyecto: "SEO Dashboard"

**B) Habilitar 3 APIs:**
```
1. Google Search Console API     → Habilitar
2. Google Analytics Data API     → Habilitar  
3. PageSpeed Insights API        → Habilitar
```

**C) Crear Credenciales:**
```
1. APIs y servicios → Credenciales
2. Crear credenciales → Cuenta de servicio
3. Nombre: "seo-dashboard"
4. Rol: Editor
5. Crear clave → JSON
6. Guardar archivo como: config/credentials.json
```

**D) Conectar tu Sitio:**
```
Search Console:
1. Ir a: search.google.com/search-console
2. Usuarios → Agregar usuario
3. Email: (del archivo JSON, campo "client_email")
4. Permisos: Propietario

Analytics:
1. Ir a: analytics.google.com
2. Administración → Acceso a la propiedad
3. Agregar usuario: (mismo email)
4. Permisos: Lector
```

### **Paso 4: Configurar Dashboard**

```powershell
# Crear configuración
python scripts/crear-config.py

# Editar con tus datos
notepad config\config.json
```

**Completar:**
```json
{
  "site_url": "https://tu-sitio.com",
  "search_console_property": "sc-domain:tu-sitio.com",
  "analytics_property_id": "123456789"
}
```

### **Paso 5: Verificar Todo**

```powershell
python scripts/verify-setup.py
```

**Debe mostrar:**
```
✓ Todo OK
✓ Conexiones exitosas
¡Listo para usar!
```

### **Paso 6: Iniciar Dashboard**

```powershell
.\scripts\start.ps1
```

**Abrir en navegador:**
```
http://localhost:5000
```

---

## 🎯 ¿Qué Puedes Hacer Ahora?

### **Ver Métricas de tu Sitio:**

```
📊 Overview        → KPIs principales + gráficas
🔍 Keywords        → Todas tus keywords con datos reales
📈 Analytics       → Tráfico y comportamiento de usuarios
⚡ Performance     → Velocidad y Core Web Vitals
💡 Sugerencias     → Recomendaciones automáticas IA
🤖 Acciones        → Automatizar optimizaciones
📊 Histórico       → Tendencias de 12 meses
🌐 GEO            → Optimización para ChatGPT/Claude
```

### **Exportar Datos:**

```
Cada sección tiene botón: 📤 Exportar
→ Descarga CSV con todos los datos
→ Úsalo en Excel, Google Sheets, etc.
```

### **Automatizar Actualizaciones:**

```powershell
# Opción A: Manual (cuando quieras)
python scripts/actualizar-datos-auto.py

# Opción B: Automático (cada 24 horas)
.\scripts\configurar-tarea-automatica.ps1
```

---

## ❓ Preguntas Frecuentes

### **¿Es gratis?**
✅ Sí, todo es gratis. Google Cloud APIs tienen capa gratuita suficiente para sitios pequeños/medianos.

### **¿Necesito tarjeta de crédito?**
❌ No para la mayoría de APIs. Search Console es 100% gratis.

### **¿Cuánto tarda en configurarse?**
⏱️ Primera vez: 30 minutos
⏱️ Solo abrir sin config: 10 segundos

### **¿Funciona en Mac/Linux?**
✅ Sí, solo cambia los comandos:
- Windows: `.\scripts\start.ps1`
- Mac/Linux: `python api/api-server-enterprise.py`

### **¿Puedo usarlo para múltiples sitios?**
✅ Sí, crea un `config.json` diferente para cada sitio.

### **¿Se actualiza automáticamente?**
✅ Sí, si configuras la tarea programada (Paso 6 de automatización).

---

## 🆘 Ayuda Rápida

### **El dashboard no abre:**
```
→ Verificar que hiciste doble clic en ABRIR-DASHBOARD.bat
→ O abrir manualmente: index.html
```

### **No veo mis datos reales:**
```
→ Verificar que el servidor API está corriendo
→ Abrir PowerShell y ejecutar: .\scripts\start.ps1
→ Luego abrir: http://localhost:5000
```

### **Error de credenciales:**
```
→ Verificar archivo: config/credentials.json existe
→ Verificar que agregaste el Service Account a Search Console
→ Esperar 5 minutos para propagación
```

### **Las gráficas no se ven:**
```
→ Verificar conexión a internet (Chart.js usa CDN)
→ Presionar Ctrl + F5 para limpiar caché
→ Probar en otro navegador
```

---

## 📚 Más Información

**Guías completas:**
```
📖 GUIA-PASO-A-PASO.md        → Tutorial completo y detallado
📖 docs/SETUP-GUIDE.md         → Instalación avanzada
📖 docs/TUTORIAL-PRINCIPIANTES.md → Para no técnicos
📖 docs/INDICE.md              → Índice de toda la documentación
```

---

## ✅ Checklist Rápido

Marca lo que ya tienes:

```
□ Python instalado
□ Dependencias instaladas (pip install)
□ Proyecto Google Cloud creado
□ 3 APIs habilitadas
□ Credenciales descargadas (JSON)
□ Service Account conectado a Search Console
□ Service Account conectado a Analytics
□ Archivo config.json creado
□ Verificación exitosa (verify-setup.py)
□ Servidor iniciado (start.ps1)
□ Dashboard abierto en navegador
```

Si marcaste TODO → **¡Estás listo! 🎉**

Si falta algo → Ve a **GUIA-PASO-A-PASO.md** para instrucciones detalladas.

---

## 🎓 Primeros Pasos Recomendados

### **Día 1: Explorar**
```
1. Abrir Overview
2. Ver Keywords Master
3. Explorar cada sección
4. Familiarizarse con la interfaz
```

### **Día 2: Analizar**
```
1. Revisar Analytics
2. Verificar Performance
3. Leer Sugerencias
4. Tomar notas
```

### **Día 3: Actuar**
```
1. Implementar primera sugerencia
2. Ejecutar una Acción automática
3. Exportar datos importantes
4. Configurar automatización
```

### **Semana 2: Optimizar**
```
1. Comparar datos de la semana
2. Ver Histórico de cambios
3. Ajustar según resultados
4. Planear próximas acciones
```

---

**¡Éxito! 🚀**

Ahora tienes un dashboard SEO profesional funcionando.

**Próximo paso:** Abrir `GUIA-PASO-A-PASO.md` para aprender a usar cada sección a fondo.

---

**Desarrollado por:** Just Dev It  
**Soporte:** contacto@justdev.it  
**Versión:** 1.0.0 Enterprise
