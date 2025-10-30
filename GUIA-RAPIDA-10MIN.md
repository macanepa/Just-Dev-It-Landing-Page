# 🎯 GUÍA VISUAL RÁPIDA - 10 Minutos

## ✅ LO QUE YA ESTÁ LISTO

```
🎉 Google Tag Manager: GTM-N67BW2PN ✅
🎉 Google Analytics 4: G-E47YX9JYCS ✅  
🎉 Sistema de Tracking: 13+ eventos ✅
🎉 SEO Optimizado: Sitemap, Robots, Schema ✅
```

---

## ⚠️ LO QUE FALTA (10 minutos total)

### 📘 PASO 1: Facebook Pixel (3 min)

**¿Lo necesito ahora?**
- ❌ NO si no vas a pagar por ads
- ✅ SÍ si planeas retargeting en Facebook

**Cómo obtener el ID:**

```
1. Abre: https://business.facebook.com/
2. Click en "Business Settings" (⚙️ arriba a la derecha)
3. En el menú lateral: "Data Sources" > "Pixels"
4. Si no tienes pixel:
   - Click "Add" > "Create a Pixel"
   - Nombre: "Just Dev It Website"
5. Copia el número (ej: "123456789012345")
```

**Cómo configurarlo:**

```
1. Abre: index.html
2. Busca: "PENDING_FACEBOOK_PIXEL_ID" (línea ~70)
3. Hay 2 lugares para reemplazar:
   
   fbq("init", "PENDING_FACEBOOK_PIXEL_ID");
   ↓
   fbq("init", "123456789012345");
   
   y
   
   src="...?id=PENDING_FACEBOOK_PIXEL_ID&ev=..."
   ↓
   src="...?id=123456789012345&ev=..."

4. Quita los comentarios:
   Busca: <!-- ===== FACEBOOK PIXEL =====
   Elimina: <!-- al inicio
   Elimina: --> al final del bloque

5. Guarda
```

---

### 💼 PASO 2: LinkedIn Insight Tag (3 min)

**¿Lo necesito ahora?**
- ❌ NO si no vas a pagar por ads en LinkedIn
- ✅ SÍ si planeas targeting B2B

**Cómo obtener el ID:**

```
1. Abre: https://www.linkedin.com/campaignmanager/
2. Si es tu primera vez:
   - Click "Create account"
   - Completa info básica
3. Una vez dentro:
   - Click en tu cuenta (516571441)
   - Menu: "Account Assets" > "Insight Tag"
4. Si no está instalado:
   - Click "Install Insight Tag"
   - Click "I will install it myself"
5. Copia el Partner ID (ej: "5165714")
```

**Cómo configurarlo:**

```
1. Abre: index.html
2. Busca: "PENDING_LINKEDIN_PARTNER_ID" (línea ~92)
3. Hay 2 lugares para reemplazar:
   
   _linkedin_partner_id = "PENDING_LINKEDIN_PARTNER_ID";
   ↓
   _linkedin_partner_id = "5165714";
   
   y
   
   src="...?pid=PENDING_LINKEDIN_PARTNER_ID&fmt=gif"
   ↓
   src="...?pid=5165714&fmt=gif"

4. Quita los comentarios:
   Busca: <!-- ===== LINKEDIN INSIGHT TAG =====
   Elimina: <!-- al inicio
   Elimina: --> al final del bloque

5. Guarda
```

---

### 🔍 PASO 3: Google Search Console (4 min)

**¿Lo necesito?**
- ✅ SÍ - ES ESENCIAL (y es gratis)

**Cómo configurarlo:**

```
1. Abre: https://search.google.com/search-console

2. Si es tu primera vez:
   - Click "Start now"
   - Login con tu cuenta Google

3. Agregar propiedad:
   - Click "Add property" (arriba a la izquierda)
   - Selecciona "URL prefix"
   - Escribe: https://justdev.it
   - Click "Continue"

4. Verificar propiedad (método fácil):
   - Selecciona: "Google Analytics"
   - Como ya tienes GA4 configurado, debería verificarse automáticamente
   - Click "Verify"
   
   Si no funciona:
   - Selecciona: "HTML tag"
   - Copia el meta tag
   - Pégalo en index.html después de la línea <head>
   - Guarda y sube cambios
   - Vuelve a Search Console
   - Click "Verify"

5. Una vez verificado:
   - En el menú lateral: "Sitemaps"
   - Escribe: sitemap.xml
   - Click "Submit"

¡Listo! Espera 2-3 días para ver primeros datos.
```

---

### 📊 PASO 4: Configurar Conversiones GA4 (2 min)

**¿Lo necesito?**
- ✅ SÍ - Para medir conversiones correctamente

**Cómo configurarlo:**

```
1. Abre: https://analytics.google.com/

2. Selecciona la propiedad de justdev.it

3. En menú lateral:
   Admin (⚙️ abajo) > Events

4. Espera a que aparezcan eventos (puede tomar 24h)
   O genera eventos tú mismo:
   - Abre justdev.it
   - Haz scroll hasta abajo
   - Click en "Cotizar Proyecto"
   - Vuelve a GA4 y recarga

5. Marca como conversión:
   Click en "Mark as conversion" (🎯) en:
   - lead_form_submit
   - quote_button_click
   - direct_contact

¡Listo!
```

---

## 🧪 VERIFICAR QUE TODO FUNCIONA

### Test 1: Google Tag Manager (30 seg)

```
1. Instala extensión: https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk

2. Abre: https://justdev.it

3. Click en extensión Tag Assistant (en toolbar)

4. Deberías ver:
   ✅ Google Tag Manager - GTM-N67BW2PN (verde)
   ✅ Google Analytics - G-E47YX9JYCS (verde)
```

### Test 2: Google Analytics Realtime (1 min)

```
1. Abre: https://analytics.google.com/

2. En menú: Reports > Realtime

3. En otra pestaña: abre https://justdev.it

4. Vuelve a Analytics

5. Deberías ver:
   ✅ Tu visita en tiempo real
   ✅ Eventos al hacer scroll/click
```

### Test 3: Facebook Pixel (30 seg) - Si lo configuraste

```
1. Instala: https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc

2. Abre: https://justdev.it

3. Click en extensión Pixel Helper

4. Deberías ver:
   ✅ Tu Pixel ID en verde
   ✅ "PageView" event fired
```

### Test 4: LinkedIn Insight Tag (30 seg) - Si lo configuraste

```
1. Abre: https://justdev.it

2. Press F12 (DevTools)

3. Tab: Network

4. Filtra por: "linkedin"

5. Recarga página (Ctrl+R)

6. Deberías ver:
   ✅ Request a "snap.licdn.com"
   ✅ Status: 200
```

---

## ❓ PREGUNTAS FRECUENTES

### "¿Necesito configurar Facebook/LinkedIn si no voy a pagar por publicidad?"

**NO** ❌

Si tu objetivo es solo tracking gratuito y SEO orgánico:
- ✅ Google Analytics es suficiente
- ✅ Google Search Console es esencial
- ❌ Facebook Pixel es opcional
- ❌ LinkedIn Tag es opcional

**Configúralos solo si**:
- Planeas hacer retargeting
- Quieres crear audiencias para el futuro
- Tienes presupuesto para ads

---

### "¿Cuánto tarda en aparecer data en Google Analytics?"

**Realtime**: 5-10 segundos ⚡
**Reports**: 24-48 horas 📊

Para testing inmediato, usa "Realtime" reports.

---

### "¿Cómo sé si el tracking está funcionando?"

**Método rápido**:
```
1. Abre justdev.it en modo incógnito
2. Abre DevTools (F12) > Network
3. Filtra por "analytics"
4. Deberías ver requests a:
   ✅ google-analytics.com
   ✅ googletagmanager.com
```

---

### "¿Qué hago si Search Console no verifica mi sitio?"

**Prueba estos métodos** (en orden):

1. **Google Analytics** (más fácil)
   - Ya está configurado ✅
   - Debería funcionar automáticamente

2. **HTML tag**
   - Copia el meta tag de Search Console
   - Pégalo en index.html después de <head>
   - Guarda, sube a servidor
   - Verifica

3. **DNS** (si tienes acceso al dominio)
   - Agrega registro TXT
   - Espera 24-48h
   - Verifica

---

### "¿Cuándo veré resultados en Search Console?"

**Primeros datos**: 2-3 días 📅
**Data completa**: 1-2 semanas 📊

**Importante**: 
- Sigue enviando sitemap
- Solicita indexación manual de homepage
- Espera pacientemente

---

## 📞 ¿NECESITAS AYUDA?

**Documentación completa**:
```
docs/GUIA-CONFIGURACION-TRACKING-ACTUALIZADA.md
```

**Checklist completo**:
```
CHECKLIST-TRACKING.md
```

**Resumen ejecutivo**:
```
RESUMEN-TRACKING.md
```

**Scripts de verificación**:
```
verificar-tracking.ps1
```

---

## 🎯 TU PLAN DE ACCIÓN

### HOY (10 min)
- [ ] Configurar Search Console (esencial)
- [ ] Configurar conversiones en GA4
- [ ] (Opcional) Facebook Pixel
- [ ] (Opcional) LinkedIn Tag

### ESTA SEMANA
- [ ] Monitorear Realtime en GA4
- [ ] Revisar indexación en Search Console
- [ ] Generar primeras conversiones de prueba

### PRÓXIMAS 2 SEMANAS
- [ ] Analizar primeras queries
- [ ] Optimizar contenido según data
- [ ] Revisar Core Web Vitals

### MES 1-3
- [ ] Crear explorations en GA4
- [ ] Implementar Cookie Consent
- [ ] Optimizar según métricas reales

---

**¡Éxito! 🚀**

📅 Actualizado: 30 octubre 2025  
🎯 Just Dev It Team
