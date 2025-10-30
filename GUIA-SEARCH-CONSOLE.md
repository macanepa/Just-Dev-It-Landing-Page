# 🔍 GUÍA: Configurar Google Search Console (5 minutos)

**Fecha**: 30 octubre 2025  
**Para**: justdev.it  

---

## ✅ PASO 1: Acceder a Search Console (30 seg)

1. Ve a: https://search.google.com/search-console
2. Login con tu cuenta Google (la misma que usas para Analytics)
3. Deberías ver el dashboard vacío

---

## ✅ PASO 2: Agregar Propiedad (1 min)

### Opción A: URL Prefix (Recomendado)

```
1. Click en "Add property" (arriba a la izquierda)
   O si es tu primera vez: "Start now"

2. Verás 2 opciones:
   - Domain
   - URL prefix ← SELECCIONA ESTA

3. En el campo "URL prefix" escribe:
   https://justdev.it

4. Click "Continue"
```

**⚠️ Importante**: Usa `https://` y sin `www` (a menos que tu sitio use www)

---

## ✅ PASO 3: Verificar Propiedad (2 min)

Verás varias opciones de verificación. **Usa la más fácil**:

### 🎯 Método Recomendado: Google Analytics

```
1. En la pantalla de verificación, busca:
   "Google Analytics"

2. Debería decir:
   "This site is associated with a Google Analytics property 
    that you have access to"

3. Si aparece → Click "Verify"
4. ¡Listo! ✅
```

### 🔄 Si no funciona Google Analytics:

Usa **HTML Tag** (también fácil):

```
1. Selecciona "HTML tag"

2. Verás algo como:
   <meta name="google-site-verification" content="ABC123XYZ..." />

3. Copia ese tag completo

4. Abre: index.html

5. Pégalo en el <head>, justo después de línea 8:
   (Después de <meta http-equiv="X-UA-Compatible"...)

6. Guarda el archivo

7. Si tu sitio está en GitHub Pages/Netlify/Vercel:
   - Haz commit y push
   - Espera 1-2 min que se despliegue

8. Vuelve a Search Console
   Click "Verify"

9. ¡Listo! ✅
```

---

## ✅ PASO 4: Enviar Sitemap (1 min)

Una vez verificado:

```
1. En el menú lateral de Search Console:
   Click en "Sitemaps"

2. Verás un campo que dice:
   "Add a new sitemap"

3. Escribe:
   sitemap.xml

4. Click "Submit"

5. Debería aparecer:
   "Success" o "Sitemap submitted"
```

**✅ Tu sitemap**: https://justdev.it/sitemap.xml

---

## ✅ PASO 5: Solicitar Indexación (1 min)

Para acelerar el proceso:

```
1. En el top bar de Search Console
   Hay un campo de búsqueda que dice:
   "Inspect any URL"

2. Escribe:
   https://justdev.it

3. Press Enter

4. Esperará 10-20 segundos analizando

5. Si dice "URL is not on Google":
   → Click "Request Indexing"
   → Espera 1-2 min
   → Confirmará "Indexing requested"

6. Si dice "URL is on Google":
   → ¡Perfecto! Ya estás indexado
```

Repite para tus páginas principales:
- https://justdev.it/#servicios
- https://justdev.it/#portafolio
- https://justdev.it/#contacto

---

## ✅ PASO 6: Vincular con Google Analytics (1 min - Opcional)

Para ver datos de Search Console en GA4:

```
1. En Search Console:
   Settings (⚙️) > Associations

2. Click "Associate" en Google Analytics

3. Selecciona tu propiedad GA4:
   "Just Dev It" (G-E47YX9JYCS)

4. Click "Associate"

5. ¡Listo! Ahora puedes ver queries en GA4
```

---

## 📊 QUÉ HACER AHORA

### Espera 2-3 días

Search Console necesita tiempo para recolectar data:

```
Día 1-2: 
- Sitemap procesándose
- Primeras páginas indexándose

Día 3-7:
- Primeras queries aparecen
- Impresiones empiezan a registrarse

Semana 2:
- Data más confiable
- Puedes empezar a analizar
```

### Mientras esperas

1. **Navega tu sitio** para generar eventos en GA4
2. **Comparte tu sitio** en LinkedIn/redes
3. **Crea contenido** (blog, LinkedIn posts) con links a justdev.it

---

## 📈 QUÉ ESPERAR EN SEARCH CONSOLE

### Semana 1
```
Queries: 0-5
Impresiones: 0-50
Clics: 0-2
Posición promedio: 50-100
```

### Mes 1
```
Queries: 10-30
Impresiones: 100-500
Clics: 5-15
Posición promedio: 30-50
```

### Mes 2-3
```
Queries: 30-100
Impresiones: 500-2000
Clics: 20-80
Posición promedio: 15-30
```

---

## 🎯 CÓMO USAR SEARCH CONSOLE (Una vez que tengas data)

### 1. Performance Report (Tu favorito)

```
Search Console > Performance

Verás:
- Total Clicks: Cuántos clics desde Google
- Total Impressions: Cuántas veces apareces
- Average CTR: % que hace clic
- Average Position: Tu posición promedio

Más importante:
Tab "Queries" → Qué buscan para encontrarte
Tab "Pages" → Qué páginas rankean mejor
```

### 2. Coverage Report

```
Search Console > Coverage

Verás:
- Valid: Páginas correctamente indexadas ✅
- Error: Páginas con problemas ❌
- Excluded: Páginas no indexadas (normal)

Acción: 
- Si hay errores → Corregirlos
- Si "Valid" está bajo → Solicitar indexación
```

### 3. Core Web Vitals

```
Search Console > Core Web Vitals

Verás:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

Meta: Todos en "Good" (verde) ✅
```

---

## ⚠️ ERRORES COMUNES

### "Property not verified"
**Solución**: 
- Verifica que el meta tag esté en el HTML
- O usa verificación por Google Analytics
- Espera 1-2 min después de subir cambios

### "Sitemap couldn't be read"
**Solución**:
- Verifica que https://justdev.it/sitemap.xml cargue
- Asegúrate que el archivo existe en tu repo
- Espera 24 horas, a veces tarda

### "URL is not on Google"
**Solución**:
- Normal en sitios nuevos
- Click "Request indexing"
- Espera 3-7 días
- Comparte tu sitio para generar backlinks

---

## 📞 DESPUÉS DE CONFIGURAR

### Qué revisar semanalmente (5 min)

```
1. Search Console > Performance
   - Nuevas queries que aparecen
   - CTR de queries principales
   - Páginas que rankean mejor

2. Google Analytics > Realtime
   - Tráfico en vivo
   - Eventos que se disparan
   - Fuentes de tráfico

3. Acción: 
   - Si una query tiene muchas impresiones pero bajo CTR
     → Mejora el meta description
   - Si una página rankea bien
     → Crea más contenido similar
```

### Qué revisar mensualmente (30 min)

```
1. Search Console > Performance (último mes)
   - Top 10 queries: ¿Cuáles son?
   - Posición promedio: ¿Está mejorando?
   - CTR: ¿Es mayor a 3%?

2. Google Analytics > Engagement
   - Páginas más vistas
   - Tiempo en sitio
   - Conversiones (formularios)

3. Acción:
   - Optimiza páginas de bajo rendimiento
   - Duplica esfuerzos en lo que funciona
   - Crea contenido para queries relevantes
```

---

## 🎯 MÉTRICAS OBJETIVO (3 meses)

### Search Console
```
✅ Impresiones: 1,000-2,000/mes
✅ Clics: 50-100/mes
✅ CTR: >3%
✅ Posición: <20 (top 2 páginas)
✅ Queries: 50-100 diferentes
```

### Google Analytics
```
✅ Usuarios: 200-500/mes
✅ Form submissions: 10-20/mes
✅ Bounce rate: <60%
✅ Avg. session: >2 min
✅ Páginas/sesión: >3
```

---

## 💡 TIPS PRO

### 1. Verifica tu sitio en ambos
```
https://justdev.it
https://www.justdev.it (si aplica)
```

### 2. Agrega variantes móviles
Search Console las detecta automáticamente, pero puedes verificar:
```
Settings > Crawling > User agents
```

### 3. Vincula con Google Ads (cuando hagas ads)
```
Settings > Associations > Google Ads
```

### 4. Activa notificaciones
```
Settings > Users and permissions > (tu email)
Marca: "Email notifications"
```

Recibirás alertas de:
- Errores de indexación
- Penalizaciones (si las hay)
- Problemas de seguridad

---

## ✅ CHECKLIST FINAL

Después de configurar, verifica:

- [ ] Propiedad verificada en Search Console
- [ ] Sitemap enviado (sitemap.xml)
- [ ] Indexación solicitada para homepage
- [ ] Vinculado con Google Analytics (opcional)
- [ ] No hay errores en Coverage
- [ ] Core Web Vitals en "Good"

---

## 🆘 SI ALGO FALLA

### Verificación no funciona
```
Intenta estos métodos en orden:
1. Google Analytics (más fácil)
2. HTML Tag
3. DNS (solo si tienes acceso al dominio)
4. Google Tag Manager
```

### Sitemap no se lee
```
1. Abre: https://justdev.it/sitemap.xml
2. Debe cargar XML válido
3. Si da 404 → Falta el archivo
4. Si carga → Espera 24-48h
```

### No aparecen queries
```
Normal en sitios nuevos:
- Día 1-3: Sin data
- Día 4-7: Primeros registros
- Semana 2+: Data confiable

Acelera con:
- Compartir en redes sociales
- Crear backlinks (LinkedIn, foros)
- Contenido nuevo (blog, artículos)
```

---

## 📚 RECURSOS ÚTILES

- **Search Console Help**: https://support.google.com/webmasters
- **Verificación**: https://support.google.com/webmasters/answer/9008080
- **Sitemaps**: https://support.google.com/webmasters/answer/183668
- **Core Web Vitals**: https://web.dev/vitals/

---

**¡Listo! En 5 minutos tienes Search Console configurado** 🚀

Tu sitio empezará a aparecer en Google en 3-7 días.

📊 **Siguiente paso**: Espera 1 semana y revisa tu primer Performance Report.

---

📅 **Actualizado**: 30 octubre 2025  
🎯 **Just Dev It**
