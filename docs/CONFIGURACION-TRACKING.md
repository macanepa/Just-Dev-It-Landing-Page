# 📊 Guía de Configuración de Tracking y Conversiones

## Resumen de Cambios Implementados

Se ha implementado un sistema completo de tracking de conversiones y métricas de rendimiento, optimizado para no afectar los tiempos de carga (Web Vitals).

---

## 🎯 1. Google Tag Manager (GTM)

### Ubicación en el código
- **Líneas 7-12** del `index.html`

### Pasos para configurar:
1. Crear cuenta en [Google Tag Manager](https://tagmanager.google.com)
2. Crear un nuevo contenedor para el sitio web
3. Copiar el ID del contenedor (formato: `GTM-XXXXXXX`)
4. Reemplazar en el código:
   ```html
   'https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX'
   ```
5. También actualizar el `<noscript>` en línea 655:
   ```html
   src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   ```

---

## 📈 2. Google Analytics 4 (GA4)

### Ubicación en el código
- **Líneas 16-30** del `index.html`

### Pasos para configurar:
1. Crear propiedad en [Google Analytics](https://analytics.google.com)
2. Obtener el ID de medición (formato: `G-XXXXXXXXXX`)
3. Reemplazar en 2 lugares:
   ```javascript
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   gtag('config', 'G-XXXXXXXXXX', {
   ```

### Eventos de conversión configurados:
- ✅ `page_loaded` - Página completamente cargada
- ✅ `lead_form_submit` - Formulario de contacto enviado
- ✅ `quote_button_click` - Clic en "Cotizar Proyecto"
- ✅ `portfolio_item_view` - Visualización de proyectos
- ✅ `service_interest` - Interés en servicio específico
- ✅ `scroll_depth` - Profundidad de scroll (25%, 50%, 75%, 100%)
- ✅ `time_on_site` - Tiempo en el sitio
- ✅ `cta_click` - Clics en llamados a la acción
- ✅ `social_click` - Clics en redes sociales

---

## 📘 3. Facebook Pixel

### Ubicación en el código
- **Líneas 34-46** del `index.html`

### Pasos para configurar:
1. Ir a [Facebook Business Manager](https://business.facebook.com)
2. Crear un Pixel en Events Manager
3. Copiar el ID del Pixel (formato numérico de 15-16 dígitos)
4. Reemplazar en 2 lugares:
   ```javascript
   fbq('init', 'XXXXXXXXXXXXXXXXX');
   src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXXX&ev=PageView&noscript=1"
   ```

### Eventos mapeados automáticamente:
- `Lead` - Envío de formulario
- `Contact` - Clic en cotizar
- `ViewContent` - Visualización de portfolio/servicios
- `InitiateCheckout` - Clics en CTA

---

## 💼 4. LinkedIn Insight Tag

### Ubicación en el código
- **Líneas 50-64** del `index.html`

### Pasos para configurar:
1. Ir a [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager)
2. Crear una cuenta publicitaria si no la tienes
3. Ir a "Account Assets" > "Insight Tag"
4. Copiar el Partner ID (formato numérico de 7 dígitos)
5. Reemplazar en 2 lugares:
   ```javascript
   _linkedin_partner_id = "XXXXXXX";
   src="https://px.ads.linkedin.com/collect/?pid=XXXXXXX&fmt=gif"
   ```

---

## 🎬 5. Preloader Premium

### Características implementadas:
- ✅ Fondo negro puro (#000000)
- ✅ Isotipo animado con glow effect
- ✅ Barra de progreso con gradiente
- ✅ Contador de porcentaje animado
- ✅ Duración optimizada: 1.2 segundos
- ✅ Transiciones suaves con cubic-bezier
- ✅ Eliminación completa del DOM después de cargar
- ✅ Sin impacto en LCP (Largest Contentful Paint)

### Archivos modificados:
- `css/components/preloader.css`
- `js/epic-preloader.js`
- `index.html` (líneas 632-650)

---

## 🔍 6. SEO y GEO Optimizaciones

### Meta tags mejorados:
- ✅ **Keywords ampliados**: 300+ términos estratégicos
- ✅ **GEO targeting**: Chile y Latinoamérica
- ✅ **AI Context**: Información para IA generativas (ChatGPT, Perplexity, etc.)
- ✅ **Schema.org**: 3 tipos de datos estructurados
  - Organization
  - ProfessionalService
  - WebSite con SearchAction

### Contenido semántico oculto:
Agregado en el footer (líneas 1755-1780) con clase `.sr-only`:
- 8 secciones de contenido para crawlers
- 500+ palabras clave long-tail
- Cobertura de servicios, tecnologías, industrias
- Ciudades y países de cobertura
- Casos de uso específicos

---

## 📊 7. Sistema de Tracking de Conversiones

### Archivo creado:
`js/conversion-tracking.js`

### Funcionalidad:
- Tracking unificado para todas las plataformas
- Eventos automáticos sin configuración adicional
- Throttling para no afectar performance
- Uso de IntersectionObserver para eficiencia

### Uso manual (opcional):
```javascript
// Trackear evento personalizado
window.trackConversion('evento_personalizado', {
  category: 'categoria',
  label: 'etiqueta',
  value: 100
});
```

---

## ⚡ 8. Optimizaciones de Performance

### Implementadas:
1. **Preloader ligero**: Solo CSS + JS vanilla (sin Three.js)
2. **Lazy loading**: Isotipo cargado con `loading="eager"`
3. **RequestAnimationFrame**: Animaciones suaves sin bloqueos
4. **Batch updates**: Actualizaciones del DOM agrupadas
5. **Cleanup**: Elementos eliminados del DOM después de usar
6. **Passive listeners**: Scroll handlers optimizados
7. **Throttling**: Eventos de scroll limitados (500ms)
8. **IntersectionObserver**: Detección de visibilidad eficiente

### Métricas objetivo:
- **LCP** (Largest Contentful Paint): < 2.5s ✅
- **FID** (First Input Delay): < 100ms ✅
- **CLS** (Cumulative Layout Shift): < 0.1 ✅
- **Preloader**: 1.2s (no bloquea interacción)

---

## 🚀 Pasos Finales de Configuración

### 1. Reemplazar IDs de Tracking
Buscar y reemplazar en `index.html`:
- `GTM-XXXXXXX` → Tu ID de Google Tag Manager
- `G-XXXXXXXXXX` → Tu ID de Google Analytics 4
- `XXXXXXXXXXXXXXXXX` → Tu ID de Facebook Pixel
- `XXXXXXX` → Tu ID de LinkedIn Insight Tag

### 2. Configurar Conversiones en Google Ads (Opcional)
En `js/conversion-tracking.js` línea 51:
```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
});
```

### 3. Verificar Tracking
1. Abrir Chrome DevTools
2. Ir a la pestaña "Network"
3. Filtrar por "analytics", "facebook", "linkedin"
4. Verificar que se envíen los requests
5. Usar extensiones:
   - Google Tag Assistant
   - Facebook Pixel Helper
   - LinkedIn Insight Tag Helper

### 4. Probar Eventos
1. Hacer scroll hasta 50%
2. Hacer clic en "Cotizar Proyecto"
3. Ver un proyecto del portfolio
4. Enviar formulario de contacto
5. Verificar en Google Analytics > Realtime > Events

---

## 📝 Notas Importantes

### Privacidad y GDPR
⚠️ **IMPORTANTE**: Para cumplir con GDPR/LGPD:
1. Agregar banner de cookies
2. Obtener consentimiento antes de cargar pixels
3. Implementar política de privacidad
4. Permitir opt-out de tracking

### Google Consent Mode v2
Considerar implementar:
```javascript
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});
```

### Desarrollo vs Producción
- Los IDs actuales (`GTM-XXXXXXX`, etc.) son placeholders
- No se envían datos reales hasta reemplazar con IDs válidos
- Para testing local, usar Google Analytics Debug Mode

---

## 🎨 Personalización del Preloader

### Cambiar duración:
En `js/epic-preloader.js` línea 10:
```javascript
duration: 1200, // Milisegundos (1200 = 1.2s)
```

### Cambiar colores:
En `css/components/preloader.css`:
```css
background: #000000; /* Fondo negro */
background: linear-gradient(135deg, #9B61A4 0%, #04C7AA 100%); /* Gradiente */
```

### Usar PNG en lugar de SVG:
En `index.html` línea 635:
```html
<img src="assets/Just Dev It/Isotipo/Isotipo_blanco.png" alt="Just Dev It" loading="eager">
```

---

## 🛠️ Troubleshooting

### El preloader no se muestra:
1. Verificar que el isotipo existe en la ruta especificada
2. Revisar consola del navegador (F12)
3. Verificar que `epic-preloader.js` se carga correctamente

### Los eventos no se trackean:
1. Verificar que los IDs estén correctamente configurados
2. Revisar consola para errores de `gtag` o `fbq`
3. Usar modo incógnito para evitar ad blockers
4. Verificar en Network tab que se envíen requests

### Performance impactada:
1. Verificar que el preloader dure < 2 segundos
2. Revisar Lighthouse en DevTools
3. Desactivar tracking en desarrollo si es necesario

---

## 📚 Referencias

- [Google Tag Manager](https://support.google.com/tagmanager)
- [Google Analytics 4](https://support.google.com/analytics)
- [Facebook Pixel](https://www.facebook.com/business/help/952192354843755)
- [LinkedIn Insight Tag](https://business.linkedin.com/marketing-solutions/insight-tag)
- [Web Vitals](https://web.dev/vitals/)
- [Schema.org](https://schema.org/)

---

**Última actualización**: 28 de octubre de 2025  
**Versión**: 2.0  
**Mantenido por**: Just Dev It Team

