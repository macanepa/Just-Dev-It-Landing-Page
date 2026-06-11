# 🚀 Just Dev It - Landing Page Premium

> Landing page corporativo optimizado con diseño moderno, animaciones fluidas, y rendimiento ultra-rápido.

**🎯 Estado**: Producción Optimizada  
**📅 Última actualización**: 30 de octubre de 2025  
**🔗 Live**: https://justdev.it  
**⚡ Performance**: 350-450 MB RAM | 5-10% CPU | 2-3s Load

---

## ✨ Características Principales

### 🎨 Diseño y UX
- **Sistema de Diseño Completo**: 150+ variables CSS custom
- **100% Responsive**: Optimizado para móvil, tablet y desktop
- **Animaciones Fluidas**: Intersection Observer + CSS animations
- **Isotipo SVG Animado**: Flotación suave (sin Three.js)
- **Slider Horizontal**: Cards de proyectos y servicios con scroll-snap
- **Partículas Canvas**: 30 partículas optimizadas (reducido 63%)

### ⚡ Performance Optimizado
- **RAM**: 350-450 MB (antes 1,064 MB) → **-60%**
- **CPU**: 5-10% (antes 28%) → **-65%**
- **Carga**: 2-3s (antes 7-8s) → **-65%**
- **Imágenes WebP**: Optimizadas a 80% calidad
- **Tab Detection**: Pausa animaciones cuando está inactivo
- **JavaScript Vanilla**: Sin dependencias externas

### 🎯 SEO y Analytics
- **Google Tag Manager**: GTM-N67BW2PN ✅
- **Google Analytics 4**: G-E47YX9JYCS ✅
- **13+ Eventos**: Tracking automático de conversiones
- **Meta Tags Completos**: Open Graph + Twitter Cards
- **Schema.org**: Structured data implementado
- **Sitemap.xml**: URLs reales de servicios/industrias/casos (sin anclas; el sitio no usa hreflang porque no hay URLs por idioma)
- **IndexNow**: ping automático a Bing/Yandex en cada deploy (GitHub Action)

### ♿ Accesibilidad
- **WCAG 2.1 Level AA**: Compliant
- **Navegación por teclado**: 100% funcional
- **Screen readers**: Contenido semántico
- **Contraste**: AAA en textos principales

---

## 📁 Estructura Optimizada

```
Just-Dev-It-Landing-Page/
├── 📂 src/                         # Código fuente (directorio de publicación)
│   ├── index.html                  # Página principal ⭐
│   ├── about-us.html              # Página nosotros
│   ├── robots.txt                 # SEO
│   ├── sitemap.xml                # SEO
│   ├── CNAME                      # Dominio custom
│   ├── _headers                   # Headers de Netlify
│   │
│   ├── 📂 pages/                  # Páginas HTML adicionales
│   │   ├── swiper.html
│   │   └── test-images.html
│   │
│   ├── 📂 assets/                 # Assets estáticos
│   │   ├── images/                # Imágenes WebP optimizadas
│   │   ├── icons/                 # Iconos SVG
│   │   ├── fonts/                 # Fuentes web
│   │   └── Just Dev It/           # Recursos de marca
│   │
│   ├── 📂 css/                    # Estilos organizados
│   │   ├── core/                  # Reset, variables, tipografía
│   │   ├── layouts/               # Grid, sections
│   │   ├── components/            # Componentes modulares
│   │   └── utils/                 # Utilidades
│   │
│   └── 📂 js/                     # JavaScript modular
│       ├── app-standalone.js      # App principal
│       ├── conversion-tracking.js # GA4 eventos
│       └── components/            # Componentes JS
│
├── 📂 scripts/                    # Scripts de desarrollo
│   ├── fixes/                     # Scripts de corrección
│   ├── optimization/              # Scripts de optimización
│   ├── build/                     # Scripts de build
│   └── README.md                  # Documentación de scripts
│
├── 📂 config/                     # Configuración
│   ├── config.js                  # Config global
│   └── swiper_package*.json       # Config de Swiper
│
├── 📂 docs/                       # Documentación técnica
│   ├── README.md                  # Índice documentación
│   └── archive/                   # Archivos históricos
│
├── netlify.toml                   # Config de Netlify
├── README.md                      # Este archivo
└── .gitignore                     # Archivos ignorados
```

---

## 🚀 Inicio Rápido

### Opción 1: Live Server (VS Code) - Recomendado

```powershell
1. Instala "Live Server" en VS Code
2. Click derecho en index.html → "Open with Live Server"
3. Se abre automáticamente en http://localhost:5500
```

### Opción 2: Python Simple Server

```powershell
python -m http.server 8000
# Abre: http://localhost:8000
```

### Opción 3: Node.js http-server

```powershell
npm install -g http-server
http-server -p 8080
# Abre: http://localhost:8080
```

---

## 📊 Analytics Configurado

### Google Tag Manager
```
ID: GTM-N67BW2PN
Estado: ✅ Activo
Tags: 3 (head + body)
```

### Google Analytics 4
```
ID: G-E47YX9JYCS
Cuenta: 359600018
```

### Eventos Automáticos (13+)
- `lead_form_submit` (valor: 100)
- `quote_button_click`
- `direct_contact` (valor: 75)
- `portfolio_item_view`
- `scroll_depth` (25%, 50%, 75%, 100%)
- `time_on_site` (30s, 60s, 120s, 300s)
- `social_click`
- `outbound_click`
- `hero_engagement`
- `exception` (error logging)

---

## 🎨 Personalización Rápida

### Colores
Edita `css/core/variables.css`:
```css
--color-brand-primary: #9b61a4;    /* Morado */
--color-brand-secondary: #04c7aa;  /* Verde agua */
--color-brand-accent: #b37bbf;     /* Morado claro */
```

### Tipografía
```css
--font-heading: "Poppins", sans-serif;
--font-body: "Manrope", system-ui, sans-serif;
```

### Animaciones
Ajusta en `js/app-standalone.js`:
```javascript
particleCount = 30;  // Reducir para más performance
```

---

## 📦 Optimizaciones Aplicadas

### ✅ Completado (30 oct 2025)
- Three.js desactivado (isotipo SVG estático)
- Partículas reducidas 80 → 30 (-63%)
- Tab detection implementado
- Imágenes convertidas a WebP
- ~7 MB de archivos eliminados
- 33+ archivos .md archivados en `docs/archive/`
- Scripts PowerShell obsoletos eliminados
- Cards sin imágenes de fondo (diseño original)
- Controles del slider con z-index: 100
- Isotipo movido a la derecha
- scroll-margin-top: 80px en todas las secciones
- .vscodeignore creado para mejor rendimiento

### Resultados
- **RAM**: 1,064 MB → 350-450 MB (-60%)
- **CPU**: 28% → 5-10% (-65%)
- **Load Time**: 7-8s → 2-3s (-65%)
- **Espacio**: +7 MB liberados

---

## 🧪 Testing

### Lighthouse (Chrome DevTools)
```
Performance:   90+
SEO:          95+
Accessibility: 95+
Best Practices: 90+
```

### Validadores
- **HTML**: https://validator.w3.org/
- **CSS**: https://jigsaw.w3.org/css-validator/

### Responsive Testing
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1920px

---

## 🌐 Deploy

### GitHub Pages
```
1. Sube el repo a GitHub
2. Settings → Pages → Branch: main
3. Deploy automático
```

### Netlify
```
Arrastra la carpeta a https://app.netlify.com/drop
```

### Vercel
```powershell
npm i -g vercel
vercel --prod
```

---

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 13+)
- ✅ Chrome Mobile (Android 8+)

---

## 📚 Documentación

- **README.md** - Este archivo (guía principal)
- **docs/README.md** - Índice de documentación técnica
- **docs/archive/** - 33+ archivos históricos archivados

**Nota**: Toda la documentación antigua (guías, checklists, reportes de optimización) está archivada en `docs/archive/` para mantener el proyecto limpio y organizado.

---

## 🤝 Soporte

Para consultas técnicas:
1. Revisa `docs/README.md`
2. Busca en la consola del navegador (F12)
3. Contacta al equipo de desarrollo

---

## 📄 Licencia

© 2025 Just Dev It. Todos los derechos reservados.

---

**Hecho con 💜 en Chile** 🇨🇱
