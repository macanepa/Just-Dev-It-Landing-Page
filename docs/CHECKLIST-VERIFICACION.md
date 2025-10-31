# ✅ CHECKLIST DE VERIFICACIÓN - Optimizaciones PageSpeed

## 📋 ANTES DEL DEPLOYMENT

### Verificación Local

- [ ] Abrir `index.html` en navegador local
- [ ] Verificar que el preloader funciona correctamente
- [ ] Verificar que todas las imágenes cargan
- [ ] Verificar que la navegación funciona (menú móvil/desktop)
- [ ] Verificar que los sliders funcionan correctamente
- [ ] Verificar que el formulario de contacto funciona
- [ ] Probar en Chrome, Firefox, Safari y Edge
- [ ] Probar en móvil (responsive design)

### Chrome DevTools - Performance

- [ ] Abrir DevTools (F12) > Performance
- [ ] Click en "Reload" (círculo con flecha)
- [ ] Verificar:
  - [ ] FCP < 2s (First Contentful Paint)
  - [ ] LCP < 3s (Largest Contentful Paint)
  - [ ] No warnings sobre animaciones
  - [ ] No forced reflows excesivos

### Chrome DevTools - Network

- [ ] Abrir DevTools (F12) > Network
- [ ] Recargar página (Ctrl+Shift+R - hard refresh)
- [ ] Verificar:
  - [ ] CSS crítico inline (0 KB transferido)
  - [ ] Imágenes con `lazy` no cargan hasta scroll
  - [ ] Total transfer < 2 MB primera carga
  - [ ] JavaScript defer funciona

### Chrome DevTools - Lighthouse

- [ ] Abrir DevTools (F12) > Lighthouse
- [ ] Mode: Navigation
- [ ] Device: Mobile
- [ ] Click "Analyze page load"
- [ ] Verificar score local > 85

---

## 🚀 DEPLOYMENT

### Pre-Deploy

- [ ] Backup del sitio actual (descargar todo)
- [ ] Commit de cambios a Git
  ```bash
  git add .
  git commit -m "feat: PageSpeed optimizations - Score 60→90+"
  git push origin main
  ```

### Deploy a Producción

Elegir una opción:

#### Opción A: Netlify

```bash
netlify deploy --prod
```

#### Opción B: Vercel

```bash
vercel --prod
```

#### Opción C: FTP/SFTP (Apache)

- [ ] Subir todos los archivos modificados
- [ ] Verificar que `.htaccess` está en la raíz
- [ ] Verificar permisos: 644 para archivos, 755 para carpetas

#### Opción D: GitHub Pages

```bash
git push origin main
# Esperar 2-3 minutos para build automático
```

---

## 🧪 POST-DEPLOYMENT (Esperar 5 minutos)

### Verificación Básica

- [ ] Abrir https://justdev.it en incógnito
- [ ] Página carga correctamente
- [ ] No errores en consola (F12 > Console)
- [ ] Todos los elementos visibles
- [ ] Navegación funciona
- [ ] Formulario funciona

### PageSpeed Insights (Crítico)

1. Ir a: https://pagespeed.web.dev/
2. Analizar: https://justdev.it

**Mobile:**

- [ ] Performance Score > 90 🎯
- [ ] FCP < 1.8s (verde)
- [ ] LCP < 2.5s (verde)
- [ ] TBT < 200ms (verde)
- [ ] CLS < 0.1 (verde)

**Desktop:**

- [ ] Performance Score > 95 🎯
- [ ] FCP < 0.9s (verde)
- [ ] LCP < 1.2s (verde)

### Lighthouse CLI (Opcional)

```bash
lighthouse https://justdev.it --view --preset=mobile
```

- [ ] Performance > 90
- [ ] Accessibility > 95
- [ ] Best Practices > 95
- [ ] SEO > 100

### Cache Headers (Crítico para score)

```bash
# Windows PowerShell
curl.exe -I https://justdev.it/css/main.css
```

Verificar que aparezca:

```
Cache-Control: public, max-age=31536000, immutable
```

- [ ] Cache-Control presente
- [ ] max-age=31536000 (1 año)
- [ ] Flag `immutable` presente

### GTmetrix

1. Ir a: https://gtmetrix.com/
2. Analizar: https://justdev.it
3. Verificar:
   - [ ] Performance Grade: A
   - [ ] Structure Grade: A
   - [ ] Fully Loaded Time < 3s

### WebPageTest

1. Ir a: https://www.webpagetest.org/
2. URL: https://justdev.it
3. Location: Dulles, VA (o más cercano)
4. Verificar:
   - [ ] First Byte Time < 200ms
   - [ ] Start Render < 1.5s
   - [ ] Fully Loaded < 3s
   - [ ] SpeedIndex < 2000

---

## 🔍 VERIFICACIÓN VISUAL

### Desktop (Chrome)

- [ ] Header sticky funciona
- [ ] Hero section renderiza correctamente
- [ ] Isotipo estático visible (en lugar de 3D)
- [ ] Slider de servicios funciona
- [ ] Slider de portafolio funciona
- [ ] Sección de clientes muestra logos
- [ ] Footer completo y legible
- [ ] Formulario envía correctamente

### Mobile (Chrome DevTools)

- [ ] Responsive desde 320px
- [ ] Menú hamburguesa funciona
- [ ] Hero apilado correctamente
- [ ] Cards legibles
- [ ] Imágenes responsive
- [ ] No scroll horizontal
- [ ] Touch targets > 48x48px

### Navegadores Alternativos

- [ ] Firefox: Todo funciona
- [ ] Safari: Todo funciona
- [ ] Edge: Todo funciona
- [ ] Mobile Safari: Todo funciona
- [ ] Chrome Android: Todo funciona

---

## 🐛 TROUBLESHOOTING

### CSS no se carga

**Síntoma:** Página sin estilos, solo HTML plano

**Solución:**

1. Verificar que `<noscript>` con fallback CSS está presente
2. Revisar errores en consola (F12)
3. Verificar ruta de archivos CSS

### Imágenes no cargan

**Síntoma:** Imágenes rotas (icono de imagen quebrada)

**Solución:**

1. Verificar rutas de imágenes
2. Verificar que imágenes existen en carpeta `assets/images/`
3. Verificar permisos (644)

### JavaScript no funciona

**Síntoma:** Menú no abre, sliders no funcionan

**Solución:**

1. Abrir consola (F12)
2. Buscar errores JavaScript
3. Verificar que scripts tienen `defer`
4. Verificar que rutas de archivos JS son correctas

### Cache no funciona

**Síntoma:** Headers no muestran `Cache-Control`

**Solución Apache:**

1. Verificar `.htaccess` en raíz
2. Verificar módulos habilitados:
   ```bash
   LoadModule deflate_module modules/mod_deflate.so
   LoadModule expires_module modules/mod_expires.so
   LoadModule headers_module modules/mod_headers.so
   ```

**Solución Netlify/Vercel:**

1. Verificar `_headers` en raíz
2. Esperar 5 minutos (propagación)
3. Hacer deploy de nuevo si es necesario

### Score bajo en PageSpeed

**Síntoma:** Score < 80 después de optimizaciones

**Causas comunes:**

1. **Server response time > 600ms**

   - Solución: Upgrade hosting o usar CDN

2. **Imágenes muy pesadas**

   - Solución: Convertir a WebP, optimizar con Squoosh

3. **JavaScript de terceros lento**

   - Solución: Lazy load de GTM, defer de Google Analytics

4. **Cache no configurado**
   - Solución: Revisar headers (ver arriba)

---

## 📊 MONITOREO CONTINUO

### Google Search Console

1. Ir a: https://search.google.com/search-console
2. Agregar propiedad: https://justdev.it
3. Verificar dominio (HTML tag en `<head>`)
4. Esperar 48 horas para datos
5. Revisar: Experience > Core Web Vitals

**Checklist mensual:**

- [ ] Revisar Core Web Vitals
- [ ] Verificar que estén en verde (Good)
- [ ] Revisar errores de indexación
- [ ] Revisar páginas con problemas

### UptimeRobot (Opcional)

1. Crear cuenta: https://uptimerobot.com
2. Add Monitor: https://justdev.it
3. Interval: 5 minutes
4. Alertas por email

### PageSpeed Monitoring (Semanal)

- [ ] Lunes: PageSpeed Insights
- [ ] Score > 90? ✅
- [ ] Score < 90? Investigar qué cambió

---

## 🎯 KPIs DE ÉXITO

### Técnicos

- ✅ Mobile Score > 90
- ✅ Desktop Score > 95
- ✅ FCP < 1.5s
- ✅ LCP < 2.5s
- ✅ CLS = 0
- ✅ All Core Web Vitals verde

### Negocio (Medir en 30 días)

- ✅ Bounce rate reducido (-10-20%)
- ✅ Session duration aumentada (+20-30%)
- ✅ Conversions aumentadas (+10-20%)
- ✅ Page views aumentadas (+15-25%)

---

## ✅ SIGN-OFF

**Deployment completado por:** ******\_\_\_******  
**Fecha:** ******\_\_\_******  
**Hora:** ******\_\_\_******

**Verificaciones:**

- [ ] Score Mobile > 90
- [ ] Score Desktop > 95
- [ ] No errores en consola
- [ ] Cache funcionando
- [ ] Sitio funcional en todos los navegadores

**Aprobación:**

- [ ] Product Owner
- [ ] Tech Lead
- [ ] QA

---

**Siguiente revisión:** ******\_\_\_******  
**Responsable:** ******\_\_\_******
