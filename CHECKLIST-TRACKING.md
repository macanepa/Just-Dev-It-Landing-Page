# ✅ CHECKLIST RÁPIDO - Configuración de Tracking

## Estado Actual

### ✅ YA CONFIGURADO (No requiere acción)
- [x] Google Tag Manager: `GTM-N67BW2PN`
- [x] Google Analytics 4: `G-E47YX9JYCS`
- [x] Sistema de tracking automático de eventos
- [x] Sitemap.xml actualizado
- [x] Robots.txt optimizado
- [x] Schema.org structured data
- [x] Meta tags SEO
- [x] Performance optimizations

---

## 🚨 ACCIONES REQUERIDAS (URGENTES)

### 1. Facebook Pixel - 5 minutos
- [ ] Ir a: https://business.facebook.com/events_manager2/list/pixel/1119285710374562
- [ ] Obtener Pixel ID (15-16 dígitos)
- [ ] Abrir `index.html` y buscar `PENDING_FACEBOOK_PIXEL_ID` (línea ~70)
- [ ] Reemplazar con tu ID real
- [ ] Quitar los comentarios `<!--` y `-->` que rodean todo el bloque Facebook

### 2. LinkedIn Insight Tag - 5 minutos
- [ ] Ir a: https://www.linkedin.com/campaignmanager/accounts/516571441
- [ ] Click en "Account Assets" > "Insight Tag"
- [ ] Obtener Partner ID (7 dígitos)
- [ ] Abrir `index.html` y buscar `PENDING_LINKEDIN_PARTNER_ID` (línea ~92)
- [ ] Reemplazar con tu ID real
- [ ] Quitar los comentarios `<!--` y `-->` que rodean todo el bloque LinkedIn

### 3. Google Search Console - 10 minutos
- [ ] Ir a: https://search.google.com/search-console
- [ ] Agregar propiedad: `https://justdev.it`
- [ ] Verificar mediante Google Analytics (método recomendado)
- [ ] Una vez verificado:
  - [ ] Enviar sitemap: `https://justdev.it/sitemap.xml`
  - [ ] Revisar "Cobertura" - ver páginas indexadas
  - [ ] Revisar "Core Web Vitals"
  - [ ] Solicitar indexación de la homepage

### 4. Configurar Conversiones en GA4 - 5 minutos
- [ ] Ir a: https://analytics.google.com/
- [ ] Seleccionar propiedad de justdev.it
- [ ] Admin > Events
- [ ] Marcar como conversión:
  - [ ] `lead_form_submit`
  - [ ] `quote_button_click`
  - [ ] `direct_contact`

---

## 🔍 VERIFICACIÓN (Después de configurar)

### Verificar GTM
```
1. Instalar extensión: Google Tag Assistant
2. Abrir https://justdev.it
3. Click en extensión
4. Verificar: "Google Tag Manager - GTM-N67BW2PN" aparece en verde
```

### Verificar GA4
```
1. Ir a analytics.google.com
2. Reports > Realtime
3. Abrir justdev.it en otra pestaña
4. Verificar que apareces en tiempo real
5. Hacer scroll, click en botones
6. Verificar que aparecen eventos en "Event count by Event name"
```

### Verificar Facebook Pixel (después de configurar)
```
1. Instalar extensión: Facebook Pixel Helper
2. Abrir https://justdev.it
3. Click en extensión
4. Verificar: Muestra tu Pixel ID en verde
```

### Verificar LinkedIn Insight Tag (después de configurar)
```
1. Abrir https://justdev.it
2. Abrir DevTools (F12) > Network
3. Filtrar por "linkedin"
4. Recarga la página
5. Verificar: Request a "snap.licdn.com" con status 200
```

---

## 📊 EVENTOS QUE SE TRACKEAN AUTOMÁTICAMENTE

Una vez todo configurado, estos eventos se trackearán sin código adicional:

✅ **Formularios**
- `lead_form_submit` - Cuando envían el formulario de contacto

✅ **CTAs y Botones**
- `cta_click` - Clics en "Cotizar Proyecto", enlaces a #contacto
- `quote_button_click` - Específico para botón de cotización

✅ **Portfolio**
- `portfolio_item_view` - Cuando ven un proyecto (50% visible)
- `service_interest` - Clics en tarjetas de servicios

✅ **Engagement**
- `scroll_depth` - Al llegar a 25%, 50%, 75%, 90%, 100%
- `time_on_site` - Cada 2 minutos
- `hero_engagement` - Engagement con sección hero
- `session_end` - Al salir del sitio

✅ **Contacto Directo**
- `direct_contact` - Clics en teléfono o email

✅ **Redes Sociales**
- `social_click` - Clics en LinkedIn, GitHub, etc.

✅ **Links Externos**
- `outbound_click` - Clics en enlaces externos

---

## 🎯 MÉTRICAS A MONITOREAR (Primeros 30 días)

### Tráfico
- Usuarios únicos
- Sesiones
- Páginas por sesión
- Duración promedio

### Conversiones
- Form submissions: Meta 10-20
- CTA clicks: Meta 50-100
- Direct contacts: Meta 5-10

### Engagement
- Scroll depth promedio: Meta >75%
- Time on site: Meta >2 min
- Bounce rate: Meta <60%

### SEO (después de configurar Search Console)
- Impresiones: Meta 1000-2000/mes
- Clics: Meta 50-100/mes
- CTR: Meta >3%
- Posición promedio: Meta <20

---

## 💡 COMANDOS ÚTILES

### Verificar configuración actual
```powershell
.\verificar-tracking.ps1
```

### Ver sitio localmente
```powershell
# Si tienes Python instalado
python -m http.server 8000

# Luego abre: http://localhost:8000
```

### Validar HTML
```powershell
# Usando extensión VSCode: HTMLHint
```

---

## 📁 ARCHIVOS IMPORTANTES

```
index.html                   # Configuración principal de tracking
js/conversion-tracking.js    # Sistema de eventos automáticos
sitemap.xml                  # Mapa del sitio (actualizado)
robots.txt                   # Config de crawlers
docs/
  ├── GUIA-CONFIGURACION-TRACKING-ACTUALIZADA.md  # Guía completa
  └── CONFIGURACION-TRACKING.md                   # Guía original
verificar-tracking.ps1       # Script de verificación
```

---

## ❓ SI ALGO NO FUNCIONA

### Facebook Pixel no aparece en Pixel Helper
1. Verifica que quitaste los comentarios `<!--` y `-->`
2. Verifica que el Pixel ID sea correcto (15-16 dígitos)
3. Recarga con Ctrl+Shift+R (clear cache)

### LinkedIn Tag no se detecta
1. Verifica que quitaste los comentarios
2. Verifica que el Partner ID sea correcto (7 dígitos)
3. Espera 24-48h para que LinkedIn lo active

### GA4 no muestra eventos en Realtime
1. Verifica que estés en la propiedad correcta
2. Espera 5-10 segundos después de la acción
3. Usa modo incógnito para evitar ad blockers

### Search Console no verifica la propiedad
1. Usa verificación por Google Analytics (más fácil)
2. Asegúrate de estar usando la cuenta correcta
3. Si usas DNS, espera 24-48h para propagación

---

## 🆘 SOPORTE

**Documentación completa**: `docs/GUIA-CONFIGURACION-TRACKING-ACTUALIZADA.md`

**Verificar estado**: `.\verificar-tracking.ps1`

**Google Analytics**: https://analytics.google.com/
**Google Tag Manager**: https://tagmanager.google.com/
**Search Console**: https://search.google.com/search-console
**Facebook Business**: https://business.facebook.com/
**LinkedIn Campaign Manager**: https://www.linkedin.com/campaignmanager/

---

📅 **Actualizado**: 30 de octubre de 2025  
🚀 **Just Dev It Team**
