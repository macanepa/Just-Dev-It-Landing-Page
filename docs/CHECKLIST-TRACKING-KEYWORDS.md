# ✅ CHECKLIST: Primeros Pasos para Tracking de Keywords

## 🚀 HOY (30 minutos) - HACER AHORA

### 1. Verificar Google Analytics está funcionando

```javascript
// Abre tu sitio: justdev.it
// Presiona F12 (Consola del navegador)
// Pega este código:

console.log(
  "Google Analytics ID: ",
  window.gtag ? "✅ Funcionando" : "❌ No detectado"
);
console.log(
  "GTM ID: ",
  window.dataLayer ? "✅ Funcionando" : "❌ No detectado"
);

// Deberías ver: ✅ Funcionando en ambos
```

- [ ] Google Analytics (G-E47YX9JYCS) funcionando
- [ ] Google Tag Manager (GTM-N67BW2PN) funcionando

**Si alguno dice ❌ No detectado:**

- Revisa que los scripts estén en el `<head>` de index.html
- Limpia caché del navegador (Ctrl + F5)
- Prueba en modo incógnito

---

### 2. Configurar Google Search Console (15 min)

**Paso a Paso:**

1. **Ve a:** https://search.google.com/search-console

2. **Haz clic en:** "Agregar propiedad"

3. **Elige tipo de propiedad:**

   - ✅ Prefijo de URL: `https://justdev.it`
   - (Más fácil que Dominio)

4. **Método de verificación recomendado:** Etiqueta HTML

   Te darán un código como este:

   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

5. **Agrégalo a tu index.html:**

   - Abre `index.html`
   - Busca la sección `<head>`
   - Pega el meta tag ANTES del `</head>`
   - Guarda el archivo

6. **Sube los cambios:**

   ```powershell
   git add index.html
   git commit -m "Add Google Search Console verification"
   git push origin main
   ```

7. **Espera 2-5 minutos** para que se actualice en el servidor

8. **Vuelve a Search Console** y haz clic en "Verificar"

9. **Deberías ver:** ✅ Propiedad verificada

**IMPORTANTE:** Los primeros datos tardan 24-48 horas en aparecer

- [ ] Search Console configurado
- [ ] Meta tag de verificación agregado
- [ ] Propiedad verificada exitosamente
- [ ] Fecha de inicio anotada: ****\_\_\_****

---

### 3. Verificar que el sitio está indexado (2 min)

**En Google, busca:**

```
site:justdev.it
```

**¿Qué deberías ver?**

- ✅ **Si aparece tu sitio:** Ya estás indexado, perfecto!
- ❌ **Si no aparece:** No estás indexado todavía

**Si NO estás indexado:**

1. Ve a Search Console → Inspección de URL
2. Pega tu URL: `https://justdev.it`
3. Haz clic en "Solicitar indexación"
4. Espera 2-7 días

- [ ] Sitio indexado en Google
- [ ] Fecha verificada: ****\_\_\_****

---

### 4. Crear sitemap.xml (5 min)

**Crea un archivo `sitemap.xml` en la raíz:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://justdev.it/</loc>
    <lastmod>2025-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://justdev.it/about-us.html</loc>
    <lastmod>2025-11-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Súbelo a Search Console:**

1. Search Console → Sitemaps
2. Ingresa: `sitemap.xml`
3. Haz clic en "Enviar"

- [ ] sitemap.xml creado
- [ ] sitemap.xml enviado a Search Console

---

### 5. Verificar robots.txt (2 min)

**Crea o verifica `robots.txt` en la raíz:**

```txt
User-agent: *
Allow: /

Sitemap: https://justdev.it/sitemap.xml
```

**Verifica que NO tengas:**

```txt
Disallow: /  ← ❌ Esto bloquea todo!
```

- [ ] robots.txt configurado correctamente
- [ ] robots.txt NO bloquea Google

---

## 📅 ESTA SEMANA (1 hora total)

### 6. Crear Google Sheet de tracking (20 min)

1. **Ve a:** https://sheets.google.com
2. **Crea nuevo sheet:** "SEO Tracking - Just Dev It"
3. **Crea estas 4 hojas:**

   - Dashboard Principal
   - Keywords Principales
   - Conversiones
   - Reporte Mensual

4. **Usa el template de:** `docs/TEMPLATE-GOOGLE-SHEET-TRACKING.md`

- [ ] Google Sheet creado
- [ ] Link del Sheet guardado: ****\_\_\_****
- [ ] Template básico implementado

---

### 7. Buscar tus keywords en Google (15 min)

**Busca manualmente tus top 10 keywords:**

```
1. desarrollo de software fintech Santiago
2. desarrollo de software energía Santiago
3. desarrollo a medida Ruby Santiago
4. web scraping selenium Chile
5. data engineering Chile
6. metabase Chile
7. proptech Chile
8. fintech Chile
9. AWS Chile
10. desarrolladores ruby Santiago
```

**Para cada una, anota:**

- ¿Apareces en las primeras 5 páginas? (top 50)
- Si apareces, ¿en qué posición aproximada?
- ¿Quiénes son tus competidores en top 3?

- [ ] 10 keywords buscadas manualmente
- [ ] Posiciones actuales anotadas
- [ ] Competidores identificados

---

### 8. Configurar tracking de formulario (15 min)

**Encuentra tu formulario de contacto en index.html:**

```javascript
// Busca el evento submit del formulario
document.querySelector("form").addEventListener("submit", function (e) {
  // Agrega este código ANTES de enviar el formulario

  // Track en Google Analytics
  gtag("event", "form_submit", {
    event_category: "Contact",
    event_label: "Contact Form",
    form_location: "hero_section",
  });

  // Track en GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "formSubmit",
    formType: "contacto",
    formLocation: window.location.pathname,
  });

  console.log("✅ Evento de conversión enviado");
});
```

**Prueba que funciona:**

1. Abre tu sitio en modo incógnito
2. Abre consola (F12)
3. Llena el formulario
4. Haz clic en enviar
5. Deberías ver: "✅ Evento de conversión enviado"

- [ ] Tracking de formulario implementado
- [ ] Evento probado y funcionando
- [ ] Código subido a producción

---

### 9. Configurar Meta Tag de Verificación para Bing (5 min)

**¿Por qué?** Bing tiene 10-15% del mercado en Chile

1. **Ve a:** https://www.bing.com/webmasters
2. **Agrega tu sitio**
3. **Verifica con meta tag** (igual que Google)
4. **Agrega el tag a index.html**

- [ ] Bing Webmaster Tools configurado
- [ ] Meta tag agregado

---

## 📊 PRIMERA QUINCENA (Semanas 1-2)

### 10. Revisar primeros datos en Search Console

**Cuando tengas datos (después de 2-3 días):**

1. **Ve a:** Search Console → Rendimiento
2. **Filtro:** Últimos 7 días
3. **Activa:** Consultas, Impresiones, Clics, CTR, Posición
4. **Ordena por:** Impresiones (descendente)

**Lo que buscas:**

- ¿Cuántas impresiones tienes en total?
- ¿Qué keywords están generando impresiones?
- ¿Algún clic ya?
- ¿Posición promedio de tus keywords?

**Anota en tu Google Sheet:**

- Total impresiones semana 1: ****\_\_\_****
- Total clics semana 1: ****\_\_\_****
- Top 3 keywords con impresiones: ****\_\_\_****

- [ ] Primeros datos en Search Console
- [ ] Datos anotados en Google Sheet
- [ ] Keywords sorpresa identificadas (las que no esperabas)

---

### 11. Primer análisis de competencia (30 min)

**Para tus top 5 keywords, busca en Google:**

**Formato de análisis:**

```
Keyword: desarrollo de software fintech Santiago

Posición 1: [Nombre empresa]
- URL: ___________
- Title tag: ___________
- Tiene Schema.org: Sí/No
- Velocidad: Rápido/Normal/Lento
- Contenido extenso: Sí/No

Posición 2: [Nombre empresa]
- ...

Posición 3: [Nombre empresa]
- ...

¿Qué tienen que tú no?
- [ ] Más contenido
- [ ] Mejor title/description
- [ ] Blog posts
- [ ] Casos de estudio
- [ ] Testimonios
- [ ] Backlinks

TU POSICIÓN: No aparezco / Página 2-3 / Posición X
```

- [ ] Top 5 keywords analizadas
- [ ] Competidores documentados
- [ ] Gaps identificados

---

## 🎯 PRIMER MES (Semanas 3-4)

### 12. Primera optimización basada en datos

**Después de 2-3 semanas, tendrás datos para:**

**Escenario A: Keywords con impresiones pero SIN clics**
→ Problema: Title/Description no atractivos
→ Acción: Optimizar meta tags con emojis, números, beneficios

**Escenario B: Keywords que aparecen en posición 11-20**
→ Problema: Estás en página 2, muy cerca de página 1
→ Acción: Agregar más contenido, mejorar palabras relacionadas

**Escenario C: Keywords con 0 impresiones**
→ Problema: Google no te asocia con esa keyword todavía
→ Acción: Crear landing page específica o blog post

**Identifica 3 keywords para optimizar:**

1. ****\_\_\_**** → Acción: ****\_\_\_****
2. ****\_\_\_**** → Acción: ****\_\_\_****
3. ****\_\_\_**** → Acción: ****\_\_\_****

- [ ] 3 keywords prioritarias identificadas
- [ ] Plan de acción definido
- [ ] Cambios implementados

---

### 13. Primer reporte mensual (15 min)

**Usa el template en tu Google Sheet:**

```
REPORTE SEO - MES 1

Total Impresiones: ___________
Total Clics: ___________
CTR Promedio: ___________
Posición Promedio: ___________
Keywords apareciendo: ___________
Conversiones: ___________

Top 3 Keywords:
1. ___________
2. ___________
3. ___________

Aprendizajes:
- ___________
- ___________
- ___________

Plan próximo mes:
- ___________
- ___________
- ___________
```

- [ ] Primer reporte mensual completado
- [ ] Compartido con el equipo
- [ ] Plan del mes 2 definido

---

## 🚀 RUTINA SEMANAL (15 min/semana)

### Cada Lunes:

```
CHECKLIST SEMANAL
─────────────────

□ Abrir Google Search Console
□ Exportar datos últimos 7 días (CSV)
□ Actualizar Google Sheet con posiciones
□ Revisar top 3 keywords que subieron
□ Revisar top 3 keywords que bajaron
□ Identificar keywords nuevas
□ Anotar 1 acción para esta semana
□ Tiempo tomado: ___ minutos
```

---

## 🎯 METAS POR MES

### Mes 1 - Fundación

- [x] Search Console configurado
- [ ] Sitio indexado
- [ ] 100+ impresiones/semana
- [ ] 5+ clics/semana
- [ ] 10+ keywords apareciendo

### Mes 2 - Crecimiento

- [ ] 500+ impresiones/semana
- [ ] 15+ clics/semana
- [ ] 20+ keywords apareciendo
- [ ] 3+ keywords en top 20
- [ ] Primera conversión orgánica

### Mes 3 - Consolidación

- [ ] 1,000+ impresiones/semana
- [ ] 30+ clics/semana
- [ ] 5+ keywords en top 10
- [ ] CTR > 2%
- [ ] 2+ conversiones orgánicas

---

## 📞 AYUDA RÁPIDA

### Si tienes problemas:

**❓ No aparezco en Google después de 1 semana**
→ Normal, puede tomar 2-4 semanas. Solicita indexación manual.

**❓ Search Console dice "No hay datos"**
→ Normal primeros 2-3 días. Espera 48 horas.

**❓ Analytics no muestra visitas**
→ Verifica que el script esté en todas las páginas.

**❓ Posiciones bajaron de repente**
→ Fluctuaciones normales primeras semanas. Espera 1 semana.

**❓ Mucho tráfico pero sin conversiones**
→ Revisa que el formulario funcione, agrega CTA más claros.

---

## 🎉 PRÓXIMO NIVEL (Después del Mes 1)

Una vez dominado lo básico:

- [ ] Crear blog con posts optimizados por keyword
- [ ] Conseguir primeros backlinks (directorios, prensa)
- [ ] Crear landing pages por industria (/fintech, /energia, /proptech)
- [ ] Implementar chat en vivo para capturar leads
- [ ] Configurar email marketing para nutrir leads
- [ ] Hacer primer caso de estudio con cliente
- [ ] Optimizar velocidad de carga (< 2 segundos)
- [ ] Implementar AMP o PWA

---

## 💡 CONSEJOS FINALES

1. **Paciencia:** SEO toma 3-6 meses, no te desanimes
2. **Consistencia:** 15 min/semana > 2 horas 1 vez/mes
3. **Datos:** Decide basado en datos, no intuición
4. **Usuario primero:** Contenido útil > keyword stuffing
5. **Experimenta:** Prueba cosas, mide, ajusta

---

**¡Empieza HOY con el punto 1 y 2!** 🚀

En 30 minutos tendrás la base configurada y en 2 semanas tus primeros datos para analizar.

---

Fecha de inicio: ****\_\_\_****
Responsable: ****\_\_\_****
Objetivo 3 meses: ****\_\_\_****
