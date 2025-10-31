# =====================================================
# OPTIMIZACIÓN DE RECURSOS - Just Dev It
# Guía de optimización para PageSpeed Insights
# =====================================================

## ✅ OPTIMIZACIONES IMPLEMENTADAS

### 1. CSS Crítico Inline
- CSS crítico inlined en el `<head>` para eliminar render-blocking
- CSS no crítico cargado de forma asíncrona con `preload`
- Reducción de First Contentful Paint (FCP)

### 2. Imágenes Optimizadas
- ✅ Todas las imágenes tienen `width` y `height` explícitos
- ✅ `loading="lazy"` en imágenes below-the-fold
- ✅ `fetchpriority="high"` en imágenes críticas (hero, logo)
- ✅ Formato WebP para imágenes de fondo
- ✅ Dimensiones: 800x600 para cards, 1920x1080 para fondos

### 3. JavaScript Optimizado
- ✅ Preloader inline (crítico) para evitar bloqueo
- ✅ Scripts con `defer` para carga no bloqueante
- ✅ Three.js desactivado (ahorro de 200MB RAM)
- ✅ Modularización de componentes

### 4. Cache Control
- ✅ HTML: `no-cache` (siempre actualizado)
- ✅ CSS/JS: `max-age=31536000, immutable` (1 año)
- ✅ Imágenes: `max-age=31536000, immutable` (1 año)
- ✅ Fuentes: `max-age=31536000, immutable` (1 año)

### 5. Compresión
- ✅ Gzip habilitado para todos los recursos de texto
- ✅ Brotli para servidores que lo soporten

### 6. Preload/Prefetch
- ✅ Preload de imágenes críticas (logo, isotipo)
- ✅ Preconnect a dominios externos (Google Fonts, GTM)
- ✅ DNS-prefetch para CDNs

### 7. Animaciones Optimizadas
- ✅ Solo `transform` y `opacity` (GPU-accelerated)
- ✅ `will-change` evitado (solo cuando necesario)
- ✅ Respeto a `prefers-reduced-motion`

## 📊 MÉTRICAS ESPERADAS

### Antes:
- FCP: 3.3s
- LCP: 10.9s
- TBT: 20ms
- CLS: 0
- Speed Index: 9.5s
- **Score: 60/100 (Mobile)**

### Después (Esperado):
- FCP: < 1.5s ⚡
- LCP: < 2.5s ⚡
- TBT: < 50ms ⚡
- CLS: 0 ⚡
- Speed Index: < 3.0s ⚡
- **Score: 90+/100 (Mobile)** 🎯

## 🚀 PRÓXIMOS PASOS (Opcional)

### Nivel 1: Server-Side
1. **Servir imágenes en formatos next-gen**:
   - Convertir todas las PNG a WebP/AVIF
   - Usar `<picture>` con fallbacks
   
2. **Minificar CSS/JS**:
   ```bash
   npm install -g clean-css-cli uglify-js
   cleancss -o css/main.min.css css/main.css
   uglifyjs js/app.js -o js/app.min.js
   ```

3. **HTTP/2 Push**:
   - Push de recursos críticos
   - Server configurado con HTTP/2

### Nivel 2: CDN
1. **Usar CDN global**:
   - Cloudflare (gratis)
   - AWS CloudFront
   - Netlify/Vercel (auto)

2. **Image CDN**:
   - Cloudinary (resize automático)
   - ImageKit
   - Cloudflare Images

### Nivel 3: Avanzado
1. **Code Splitting**:
   - Webpack/Vite para dividir JS
   - Lazy load de componentes

2. **Service Worker**:
   - Cache offline
   - Precache de recursos

3. **Resource Hints**:
   ```html
   <link rel="preload" as="image" href="hero.webp" imagesrcset="hero-mobile.webp 640w, hero.webp 1920w">
   ```

## 🛠️ HERRAMIENTAS DE VALIDACIÓN

### Online
- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

### DevTools
- Chrome Lighthouse (F12 > Lighthouse)
- Coverage (F12 > Coverage) para JS no usado
- Network (F12 > Network) para waterfall

### CLI
```bash
npm install -g lighthouse
lighthouse https://justdev.it --view
```

## 📝 CHECKLIST DE VERIFICACIÓN

- [x] CSS crítico inline
- [x] Imágenes con width/height
- [x] Lazy loading implementado
- [x] JavaScript defer/async
- [x] Cache headers configurados
- [x] Gzip/Brotli habilitado
- [x] Preload de recursos críticos
- [x] Animaciones GPU-accelerated
- [ ] Minificación de CSS/JS (manual)
- [ ] Imágenes en WebP/AVIF (manual)
- [ ] HTTP/2 habilitado (servidor)
- [ ] CDN configurado (hosting)

## 🔧 COMANDOS ÚTILES

### Minificar CSS
```bash
# Online: https://cssminifier.com/
# CLI:
npx clean-css-cli -o css/main.min.css css/main.css
```

### Minificar JavaScript
```bash
# Online: https://javascript-minifier.com/
# CLI:
npx terser js/app.js -o js/app.min.js
```

### Convertir a WebP
```bash
# Requiere cwebp instalado
find assets/images -name "*.png" -o -name "*.jpg" | while read img; do
  cwebp -q 85 "$img" -o "${img%.*}.webp"
done
```

### Analizar tamaño de bundle
```bash
npx webpack-bundle-analyzer
```

## 📚 RECURSOS

- Web.dev Performance: https://web.dev/performance/
- Core Web Vitals: https://web.dev/vitals/
- Lighthouse Scoring: https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/

---

**Última actualización**: 30 de octubre de 2025
**Versión**: 1.0.0
