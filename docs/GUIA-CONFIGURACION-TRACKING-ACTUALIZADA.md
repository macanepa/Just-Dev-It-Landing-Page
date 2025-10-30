# 🚀 Guía de Configuración de Tracking - Just Dev It
**Actualizado: 30 de octubre de 2025**

## ✅ Estado Actual de la Configuración

### Configuraciones Completadas ✓

#### 1. Google Tag Manager (GTM)
- **ID Configurado**: `GTM-N67BW2PN`
- **Estado**: ✅ **ACTIVO Y FUNCIONANDO**
- **Ubicación**: 
  - Línea 10-20 de `index.html` (head)
  - Línea 657 de `index.html` (body - noscript fallback)
  - Línea 706 de `index.html` (body - noscript img)

**Verificación**: El GTM está correctamente implementado y listo para recibir eventos.

#### 2. Google Analytics 4 (GA4)
- **ID Configurado**: `G-E47YX9JYCS`
- **Cuenta Google Analytics**: `359600018`
- **Estado**: ✅ **ACTIVO Y FUNCIONANDO**
- **Ubicación**: 
  - Línea 24-45 de `index.html` (configuración principal con conversiones)
  - Línea 660-671 de `index.html` (configuración simplificada)

**Características Activas**:
- ✅ Enhanced Conversions habilitado
- ✅ Page view tracking automático
- ✅ Cookie flags para SameSite security
- ✅ Función global `trackConversion()` disponible

---

### Configuraciones Pendientes ⚠️

#### 3. Facebook Pixel
- **Estado**: ⚠️ **PENDIENTE DE CONFIGURACIÓN**
- **Business ID**: `1119285710374562`

**ACCIÓN REQUERIDA**:
1. Ve a: https://business.facebook.com/events_manager2/list/pixel/1119285710374562
2. Si no tienes un pixel creado:
   - Haz clic en "Agregar" > "Pixel de Facebook"
   - Dale un nombre (ej: "Just Dev It Website")
   - Copia el **Pixel ID** (15-16 dígitos)
3. Si ya tienes un pixel:
   - Selecciona tu pixel en Events Manager
   - Copia el **Pixel ID** del panel superior

**Dónde actualizar**:
En `index.html` línea ~47-80, busca:
```javascript
fbq("init", "PENDING_FACEBOOK_PIXEL_ID");
```
Y reemplaza `PENDING_FACEBOOK_PIXEL_ID` con tu ID real.

Después, **DESCOMENTA** todo el bloque de Facebook Pixel (quita los `<!--` y `-->`).

#### 4. LinkedIn Insight Tag
- **Estado**: ⚠️ **PENDIENTE DE CONFIGURACIÓN**
- **Account ID**: `516571441`

**ACCIÓN REQUERIDA**:
1. Ve a: https://www.linkedin.com/campaignmanager/accounts/516571441
2. En el menú lateral, ve a "Account Assets" > "Insight Tag"
3. Si no está creado, haz clic en "Install Insight Tag"
4. Copia el **Partner ID** (normalmente 7 dígitos)

**Dónde actualizar**:
En `index.html` línea ~82-120, busca:
```javascript
_linkedin_partner_id = "PENDING_LINKEDIN_PARTNER_ID";
```
Y reemplaza `PENDING_LINKEDIN_PARTNER_ID` con tu ID real.

Después, **DESCOMENTA** todo el bloque de LinkedIn Insight Tag.

---

## 📊 Sistema de Tracking Implementado

### Eventos Automáticos Configurados

El archivo `js/conversion-tracking.js` rastrea automáticamente:

1. **✅ Envío de Formularios**
   - Evento: `lead_form_submit`
   - Valor estimado: 100 puntos
   - Captura: nombre, email, servicio de interés

2. **✅ Clics en CTAs**
   - Evento: `cta_click`
   - Detecta: botones "Cotizar Proyecto", enlaces a #contacto
   - Incluye: ubicación del botón (top/middle/bottom)

3. **✅ Visualización de Portfolio**
   - Evento: `portfolio_item_view`
   - Usa: IntersectionObserver para eficiencia
   - Threshold: 50% de visibilidad

4. **✅ Profundidad de Scroll**
   - Evento: `scroll_depth`
   - Milestones: 25%, 50%, 75%, 90%, 100%
   - Throttled: 500ms para no afectar performance

5. **✅ Tiempo en Sitio**
   - Evento: `time_on_site`
   - Frecuencia: Cada 2 minutos
   - Incluye: evento `session_end` al salir

6. **✅ Interés en Servicios**
   - Evento: `service_interest`
   - Detecta: clics en tarjetas de servicios

7. **✅ Clics en Redes Sociales**
   - Evento: `social_click`
   - Plataformas: LinkedIn, GitHub, Twitter, Facebook

8. **✅ Enlaces Salientes**
   - Evento: `outbound_click`
   - Detecta: links externos (no justdev.it)

9. **✅ Contacto Directo**
   - Evento: `direct_contact`
   - Detecta: clics en tel: y mailto:
   - Valor estimado: 75 puntos

10. **✅ Engagement con Hero**
    - Evento: `hero_engagement`
    - Threshold: 80% de visibilidad

11. **✅ Errores JavaScript**
    - Evento: `exception`
    - Para debugging en GA4

---

## 🔧 Configuraciones Adicionales Recomendadas

### A. Google Tag Manager - Configuración en Panel Web

Una vez que tu GTM esté activo, configura estos triggers y tags:

**Triggers Recomendados**:
1. **Form Submission** - Trigger en todos los forms
2. **Click - All Elements** - Para tracking de clics generales
3. **Scroll Depth** - 25%, 50%, 75%, 90%
4. **Video Engagement** - Si agregas videos

**Tags Recomendados**:
1. **GA4 - Config Tag** (ya configurado via código)
2. **GA4 - Event Tag** para eventos personalizados
3. **Conversion Linker** - Para mejorar atribución de conversiones

### B. Google Analytics 4 - Configuración en Panel

1. **Ir a**: https://analytics.google.com/
2. **Seleccionar** propiedad para justdev.it
3. **Configurar Conversiones**:
   - Admin > Events > Mark as conversion:
     - `lead_form_submit` ✓
     - `quote_button_click` ✓
     - `direct_contact` ✓
     - `portfolio_item_view` (opcional)

4. **Configurar Audiencias**:
   - Users que enviaron formulario
   - Users con alto engagement (>2 min, scroll >75%)
   - Users que vieron portfolio

5. **Configurar Explorations**:
   - Funnel de conversión: Landing → Servicios → Portfolio → Contacto
   - Análisis de cohortes
   - User journey

### C. Google Search Console

**IMPORTANTE**: Si no has vinculado Search Console:

1. Ve a: https://search.google.com/search-console
2. Agrega la propiedad `https://justdev.it`
3. Verifica propiedad mediante:
   - Tag de Google Analytics (recomendado) ✓
   - O archivo HTML
   - O registro DNS

4. Una vez verificado:
   - Envía el sitemap: `https://justdev.it/sitemap.xml`
   - Verifica indexación de páginas
   - Revisa Core Web Vitals
   - Analiza queries de búsqueda

5. Vincula GSC con GA4:
   - En GA4: Admin > Product links > Search Console links

---

## 🎯 Eventos Personalizados Disponibles

Puedes trackear eventos manualmente usando:

```javascript
// Desde cualquier parte de tu código JavaScript
window.trackConversion('nombre_evento', {
    category: 'categoria',
    label: 'etiqueta',
    value: 100,
    custom_param: 'valor'
});
```

**Ejemplos de uso**:

```javascript
// Trackear descarga de PDF
window.trackConversion('file_download', {
    file_name: 'brochure_justdevit.pdf',
    category: 'downloads',
    value: 50
});

// Trackear interacción con calculadora ROI
window.trackConversion('roi_calculator_used', {
    estimated_savings: 50000,
    category: 'tools',
    label: 'calculator_engagement'
});

// Trackear video play
window.trackConversion('video_play', {
    video_title: 'Demo Automatización RPA',
    category: 'media',
    video_progress: '0%'
});
```

---

## 🔍 Verificación y Testing

### 1. Verificar GTM

**Usando Google Tag Assistant**:
1. Instala extensión: [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abre tu sitio: https://justdev.it
3. Haz clic en la extensión
4. Debería mostrar: "Google Tag Manager - GTM-N67BW2PN" ✅

**Usando DevTools**:
1. Abre DevTools (F12)
2. Ve a Network tab
3. Filtra por "google-analytics.com" o "gtm.js"
4. Recarga la página
5. Deberías ver requests a GTM ✅

### 2. Verificar Google Analytics

**Usando Realtime Reports**:
1. Ve a: https://analytics.google.com/
2. Click en "Reports" > "Realtime"
3. Abre tu sitio en otra pestaña
4. Deberías ver tu visita en tiempo real ✅

**Verificar Eventos**:
1. En Realtime, ve a "Event count by Event name"
2. Realiza acciones en tu sitio (scroll, click en CTA, etc.)
3. Deberías ver los eventos aparecer en ~5 segundos

### 3. Verificar Facebook Pixel (cuando esté configurado)

**Usando Facebook Pixel Helper**:
1. Instala: [Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Abre tu sitio
3. Haz clic en la extensión
4. Debería mostrar tu Pixel ID ✅

### 4. Verificar LinkedIn Insight Tag (cuando esté configurado)

**Método manual**:
1. Abre DevTools (F12) > Network
2. Filtra por "linkedin" o "li.lms"
3. Recarga la página
4. Busca request a `snap.licdn.com` ✅

---

## 📈 Optimizaciones SEO Implementadas

### Meta Tags Optimizados

Ya implementados en `index.html`:

```html
✅ Title optimizado con keywords
✅ Meta description (155 caracteres)
✅ Open Graph para redes sociales
✅ Twitter Cards
✅ Keywords GEO (Chile, Latinoamérica)
✅ Structured Data (Schema.org):
   - Organization
   - ProfessionalService
   - WebSite con SearchAction
✅ Hreflang tags (es-CL, es-US, en)
```

### Contenido SEO Oculto

Implementado en el footer (líneas 1755-1780):

- **500+ palabras clave long-tail**
- **Cobertura geográfica**: Santiago, Chile, Latinoamérica
- **Tecnologías**: Python, JavaScript, RPA, AI
- **Industrias**: Finanzas, Energía, Educación, Retail
- **Clase**: `.sr-only` (visible para crawlers, oculto para usuarios)

### Robots.txt Optimizado

✅ Permite todos los crawlers (Google, Bing, AI bots)
✅ Referencia al sitemap.xml
✅ Permisos específicos para Googlebot-Image
✅ Permite GPTBot, Claude, Perplexity para GEO

### Sitemap.xml

✅ Actualizado con fecha: 2025-10-30
✅ Prioridades optimizadas
✅ Hreflang alternates
✅ Changefreq apropiadas

---

## 🚨 Próximos Pasos CRÍTICOS

### 1. Completar Facebook Pixel (Alta Prioridad)
- [ ] Obtener Pixel ID
- [ ] Actualizar en `index.html`
- [ ] Descomentar código
- [ ] Verificar con Pixel Helper

### 2. Completar LinkedIn Insight Tag (Alta Prioridad)
- [ ] Obtener Partner ID
- [ ] Actualizar en `index.html`
- [ ] Descomentar código
- [ ] Verificar en Network tab

### 3. Verificar Google Search Console (URGENTE)
- [ ] Agregar propiedad justdev.it
- [ ] Verificar propiedad
- [ ] Enviar sitemap.xml
- [ ] Revisar cobertura de indexación
- [ ] Solicitar indexación de páginas clave

### 4. Configurar Conversiones en GA4
- [ ] Marcar eventos como conversiones
- [ ] Configurar audiencias
- [ ] Crear explorations/funnels

### 5. Configurar Tags en GTM (Opcional pero Recomendado)
- [ ] Configurar triggers adicionales
- [ ] Agregar tags para eventos específicos
- [ ] Configurar variables personalizadas

### 6. Implementar Cookie Consent (GDPR/LGPD)
- [ ] Agregar banner de cookies
- [ ] Implementar Google Consent Mode v2
- [ ] Actualizar Privacy Policy

---

## 📞 Soporte y Recursos

### Documentación Oficial
- [Google Tag Manager](https://support.google.com/tagmanager)
- [Google Analytics 4](https://support.google.com/analytics)
- [Google Search Console](https://support.google.com/webmasters)
- [Facebook Pixel](https://www.facebook.com/business/help/952192354843755)
- [LinkedIn Insight Tag](https://business.linkedin.com/marketing-solutions/insight-tag)

### Herramientas de Testing
- [Google Tag Assistant](https://tagassistant.google.com/)
- [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [Lighthouse (en DevTools)](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)

### Archivos Relacionados
- `index.html` - Configuración de tags (líneas 10-120, 640-675)
- `js/conversion-tracking.js` - Sistema de eventos
- `sitemap.xml` - Mapa del sitio
- `robots.txt` - Configuración de crawlers
- `docs/CONFIGURACION-TRACKING.md` - Guía original

---

## 🎯 Métricas Objetivo (KPIs)

### Performance
- **LCP** (Largest Contentful Paint): < 2.5s ✅
- **FID** (First Input Delay): < 100ms ✅
- **CLS** (Cumulative Layout Shift): < 0.1 ✅

### SEO
- **Indexación**: 100% de páginas principales
- **Core Web Vitals**: "Good" en todos los metrics
- **Mobile Usability**: 0 errores

### Conversiones (Primeros 30 días)
- **Form Submissions**: 10-20
- **CTA Clicks**: 50-100
- **Avg. Session Duration**: > 2 minutos
- **Bounce Rate**: < 60%

### Tráfico Orgánico (Primeros 90 días)
- **Impresiones**: 1,000-2,000/mes
- **Clics**: 50-100/mes
- **CTR Promedio**: > 3%
- **Posición Promedio**: < 20 (top 2 páginas)

---

**¿Preguntas o necesitas ayuda?**
Consulta los archivos de documentación en `/docs/` o revisa los comentarios en el código.

**Última actualización**: 30 de octubre de 2025  
**Versión**: 3.0  
**Mantenido por**: Just Dev It Team
