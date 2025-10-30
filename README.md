# 🚀 Just Dev It - Sitio Web Premium

> Sitio web corporativo de nivel premium con diseño moderno, animaciones únicas, optimización SEO/GEO y sistema completo de tracking analítico.

**🎯 Estado**: Producción  
**📅 Última actualización**: 30 de octubre de 2025  
**🔗 Live**: https://justdev.it

---

## ✨ Características Destacadas

### 🎨 Diseño y UX
- **Diseño Moderno Premium**: Sistema de diseño completo con 150+ variables CSS
- **100% Responsive**: Optimizado para móvil, tablet y desktop
- **Animaciones Únicas**: Sistema custom con Intersection Observer
- **Canvas 3D**: Animación de partículas en hero section
- **Preloader Premium**: Isotipo animado con barra de progreso

### ⚡ Performance y SEO
- **Ultra Rápido**: Sin dependencias externas innecesarias
- **SEO/GEO Optimizado**: Meta tags completos + Schema.org
- **AI-Ready**: Optimizado para ChatGPT, Gemini, Claude, Perplexity
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Sitemap.xml**: Actualizado con hreflang alternates

### 📊 Analytics y Tracking
- **Google Tag Manager**: GTM-N67BW2PN ✅
- **Google Analytics 4**: G-E47YX9JYCS ✅
- **13+ Eventos Automáticos**: Forms, CTAs, scroll, time, etc.
- **Multi-Platform**: GA4, Facebook Pixel, LinkedIn ready
- **Privacy-Ready**: Cookie flags, GDPR preparado

### ♿ Accesibilidad
- **WCAG 2.1 Level AA**: Compliant
- **Screen Reader Friendly**: Contenido semántico
- **Keyboard Navigation**: Completamente navegable

---

## 📊 TRACKING Y ANALYTICS

### ✅ Configurado y Activo

#### Google Tag Manager
```
ID: GTM-N67BW2PN
Estado: ✅ FUNCIONANDO
Ubicaciones: head + body (3 tags)
```

#### Google Analytics 4
```
ID: G-E47YX9JYCS
Cuenta: 359600018
Features:
  ✅ Enhanced Conversions
  ✅ Page View Tracking
  ✅ Custom Events (13+)
  ✅ Cookie Security
```

#### Sistema de Conversiones
```
Archivo: js/conversion-tracking.js
Eventos Automáticos:
  ✅ lead_form_submit (valor: 100)
  ✅ quote_button_click
  ✅ direct_contact (valor: 75)
  ✅ portfolio_item_view
  ✅ scroll_depth (25-100%)
  ✅ time_on_site
  ✅ social_click
  ✅ outbound_click
  ✅ hero_engagement
  ✅ exception (error logging)
```

### ⚠️ Pendiente de Configuración

**Facebook Pixel** y **LinkedIn Insight Tag** están preparados pero requieren IDs.  
Ver: `GUIA-RAPIDA-10MIN.md` para instrucciones.

---

## 📁 Documentación de Tracking

### Quick Start (Empieza aquí)
1. **GUIA-RAPIDA-10MIN.md** - Setup en 10 minutos
2. **CHECKLIST-TRACKING.md** - Lista de tareas
3. **RESUMEN-TRACKING.md** - Overview ejecutivo

### Completas
4. **docs/GUIA-CONFIGURACION-TRACKING-ACTUALIZADA.md** - Guía técnica completa (400+ líneas)
5. **INDICE-DOCUMENTACION-TRACKING.md** - Índice de navegación

### Herramientas
6. **verificar-tracking.ps1** - Script de verificación automática

**👉 Para empezar**: Lee `GUIA-RAPIDA-10MIN.md`

---

## 📦 Estructura del Proyecto

```
Just-Dev-It-Landing-Page/
├── assets/
│   ├── images/          # Imágenes, logos, proyectos
│   └── icons/           # Iconos personalizados
├── css/
│   ├── core/
│   │   ├── reset.css              # Reset CSS moderno
│   │   ├── variables.css          # Variables de diseño (150+)
│   │   └── typography.css         # Sistema tipográfico
│   ├── layouts/
│   │   ├── grid.css               # Sistema de grillas
│   │   └── sections.css           # Layouts de secciones
│   ├── components/
│   │   ├── navigation.css         # Navegación responsive
│   │   ├── hero.css               # Hero section
│   │   ├── cards.css              # Sistema de tarjetas
│   │   ├── forms.css              # Formularios profesionales
│   │   └── footer.css             # Footer multi-columna
│   └── main.css                   # Orquestador principal
├── js/
│   ├── core/
│   │   ├── utils.js               # Utilidades reutilizables
│   │   └── app.js                 # Aplicación principal
│   └── components/
│       ├── navigation.js          # Lógica de navegación
│       ├── animations.js          # Sistema de animaciones
│       ├── hero-3d.js             # Animación Canvas 3D
│       └── form-validator.js      # Validación de formularios
├── index-new.html                 # HTML principal (NUEVO ✨)
├── IMPLEMENTATION_GUIDE.md        # Guía de implementación
└── README.md                      # Este archivo
```

## 🚀 Inicio Rápido

### 1. Servidor Local

**Opción A: Live Server (VS Code)**

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index-new.html` → "Open with Live Server"
3. El sitio se abrirá en `http://localhost:5500`

**Opción B: http-server (Node.js)**

```powershell
# Instalar globalmente
npm install -g http-server

# Ejecutar servidor
http-server -p 5501

# Abrir en navegador
# http://localhost:5501/index-new.html
```

**Opción C: Python Simple Server**

```powershell
# Python 3
python -m http.server 8000

# Abrir en navegador
# http://localhost:8000/index-new.html
```

### 2. Verificación

Abre tu navegador y navega a la URL del servidor local. Deberías ver:

- ✅ Hero section con animación de partículas Canvas
- ✅ Sección "¿Qué Hacemos?"
- ✅ Servicios (6 cards animadas)
- ✅ Portfolio (6 proyectos con imágenes)
- ✅ Clientes (grid de logos)
- ✅ Equipo (2 fundadores)
- ✅ Formulario de contacto
- ✅ Footer profesional

## 🎨 Personalización

### Colores de Marca

Edita `css/core/variables.css`:

```css
--color-brand-primary: #9b61a4; /* Morado principal */
--color-brand-secondary: #04c7aa; /* Verde agua */
--color-brand-accent: #b37bbf; /* Morado claro */
```

### Tipografía

Edita `css/core/variables.css`:

```css
--font-heading: "Poppins", sans-serif;
--font-body: "Manrope", system-ui, sans-serif;
--font-mono: "Fira Code", monospace;
```

### Animaciones

Ajusta delays y thresholds en `js/components/animations.js`:

```javascript
const options = {
  root: null,
  threshold: 0.1, // Cambiar threshold
  rootMargin: "0px 0px -50px 0px",
};
```

### Formulario de Contacto

El formulario está configurado para usar Formspree. Para cambiar:

1. Crea una cuenta en [Formspree.io](https://formspree.io)
2. Obtén tu endpoint
3. Actualiza el `action` en `index-new.html`:

```html
<form
  id="contact-form"
  action="https://formspree.io/f/TU-ENDPOINT-AQUI"
  method="POST"
></form>
```

## 📊 SEO y Analytics

### Google Analytics

1. Obtén tu ID de medición (G-XXXXXXXXXX)
2. Descomenta las líneas al final de `index-new.html`:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

### Google Tag Manager

Agrega tu código GTM en el `<head>`:

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-XXXXXXX");
</script>
<!-- End Google Tag Manager -->
```

## 🧪 Testing

### Validación HTML

```
https://validator.w3.org/
```

Pega la URL de tu sitio o sube el archivo HTML.

### Validación CSS

```
https://jigsaw.w3.org/css-validator/
```

### Lighthouse (Performance, SEO, Accessibility)

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Ejecuta auditoría

**Objetivos:**

- 🎯 Performance: 90+
- 🎯 SEO: 95+
- 🎯 Accessibility: 95+
- 🎯 Best Practices: 90+

### Testing Responsive

**Chrome DevTools:**

1. Presiona `F12`
2. Toggle device toolbar (`Ctrl+Shift+M`)
3. Prueba en diferentes dispositivos:
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1920px

## 🌐 Despliegue

### GitHub Pages

1. Sube el proyecto a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/root`
4. Guarda y espera el deploy

### Netlify

1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. O conecta tu repositorio de GitHub
3. Deploy automático en cada push

### Vercel

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🔧 Troubleshooting

### Las animaciones no funcionan

1. Verifica que `js/core/app.js` esté cargando
2. Abre la consola del navegador (F12) y busca errores
3. Asegúrate de que el navegador soporte ES6 modules

### Las imágenes no cargan

1. Verifica que las rutas sean correctas: `assets/images/nombre-imagen.png`
2. Asegúrate de que las imágenes existan en la carpeta
3. Revisa la consola del navegador para errores 404

### El formulario no envía

1. Verifica que el endpoint de Formspree sea correcto
2. Revisa la consola del navegador
3. Asegúrate de que el formulario tenga `method="POST"`

### Los estilos se ven rotos

1. Verifica que todos los archivos CSS estén en sus carpetas
2. Revisa que las importaciones en `<head>` sean correctas
3. Asegúrate de que `css/core/variables.css` esté cargando primero

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 13+)
- ✅ Chrome Mobile (Android 8+)

## 🤝 Soporte

Para dudas o problemas:

1. Revisa `IMPLEMENTATION_GUIDE.md`
2. Busca en la consola del navegador
3. Contacta al equipo de desarrollo

## 📄 Licencia

© 2025 Just Dev It. Todos los derechos reservados.

---

**Hecho con 💜 en Chile**

## 🎯 Próximos Pasos

- [ ] Reemplazar `index.html` con `index-new.html`
- [ ] Agregar Google Analytics
- [ ] Configurar Formspree
- [ ] Deploy a producción
- [ ] Test en dispositivos reales
- [ ] Configurar SSL/HTTPS
- [ ] Agregar sitemap.xml
- [ ] Configurar robots.txt

¡Tu sitio está listo para impresionar! 🚀
