# 🚀 Cómo Ver los Cambios

**Fecha:** 27 de Octubre, 2025

---

## Opción 1: Abrir Directamente

Simplemente abre el archivo `index.html` en tu navegador:

```
c:\Users\Joaquin Espildora M\Local Projects\Just-Dev-It-Landing-Page\index.html
```

Doble clic y listo! ✨

---

## Opción 2: Live Server (Recomendado)

Si tienes VS Code con Live Server:

1. Click derecho en `index.html`
2. Selecciona "Open with Live Server"
3. Se abrirá automáticamente en tu navegador

---

## 🎯 Qué Ver

### Sección de Servicios

- Scroll hasta la sección "Nuestros Servicios"
- Verás 6 cards con gradientes de colores
- Arrastra las cards horizontalmente
- Prueba los botones ← →
- Haz hover sobre una card para ver el efecto

### Sección de Portafolio

- Scroll hasta "Nuestro Portafolio"
- Verás 7 proyectos con sus imágenes
- Misma interacción que servicios
- Cada proyecto tiene métricas reales

### Prueba Responsive

- Presiona F12 para abrir DevTools
- Click en el ícono de dispositivo móvil
- Prueba diferentes tamaños:
  - iPhone 12 Pro
  - iPad
  - Desktop 1920px

---

## 🎨 Interacciones Disponibles

1. **Mouse:**

   - Arrastra las cards
   - Click en botones ← →
   - Click en dots
   - Hover sobre cards

2. **Teclado:**

   - Flecha izquierda: anterior
   - Flecha derecha: siguiente

3. **Touch (en móvil):**
   - Swipe horizontal
   - Tap en controles

---

## ⚠️ Notas Importantes

### Imágenes Faltantes

Las siguientes imágenes aún no existen y mostrarán gradientes:

- `service-desarrollo.jpg`
- `service-cloud.jpg`
- `service-ai.jpg`
- `service-fintech.jpg`
- `service-integraciones.jpg`
- `service-analytics.jpg`
- `bg-services-*.jpg`
- `bg-portfolio-*.jpg`

**Esto es normal y esperado.** Los gradientes se ven bien y son temporales.

### Proyectos

Las imágenes de proyectos (Databam, Proyecto1-7.png) deberían estar
y se verán correctamente.

---

## 🐛 Si Algo No Funciona

### JavaScript no carga

Verifica en la consola (F12) si hay errores. El archivo debe estar en:

```
js/components/slider-cards.js
```

### CSS no aplica

El archivo debe estar en:

```
css/components/slider-cards.css
```

### Imágenes no cargan

Las rutas son relativas a `index.html`. Si las imágenes de proyectos
no cargan, verifica que estén en `assets/images/`

---

## ✅ Checklist Visual

Al abrir el sitio deberías ver:

- [ ] Hero section con título actualizado
- [ ] Estadísticas correctas (20+, 5+, 10+)
- [ ] Sección "¿Qué hacemos?" con texto nuevo
- [ ] Servicios con slider horizontal
- [ ] 6 cards de servicios con gradientes
- [ ] Controles ← → funcionando
- [ ] Portafolio con slider horizontal
- [ ] 7 proyectos con sus datos
- [ ] Todo responsive en móvil

---

## 📱 Test en Móvil Real

Para probar en tu teléfono:

1. En VS Code, usa Live Server
2. Ve a la URL que te da (ej: http://192.168.1.x:5500)
3. Abre esa URL en tu móvil (misma red WiFi)
4. Prueba todos los gestos

---

## 🎉 Disfruta!

El sitio está completamente funcional. Todo el código está limpio,
optimizado y listo para producción.

Si quieres agregar las imágenes reales, consulta:

```
docs/IMAGENES-NECESARIAS.md
```
