# Instrucciones para Crear Imágenes de Redes Sociales

## Imágenes Necesarias para SEO Óptimo

### 1. og-image.jpg (Open Graph para Facebook/LinkedIn)

**Ubicación:** `assets/images/og-image.jpg`

**Especificaciones:**

- Tamaño: **1200 x 630 píxeles**
- Formato: JPG
- Peso máximo: 1 MB
- Resolución: 72 DPI

**Diseño Sugerido:**

```
┌─────────────────────────────────────────┐
│                                         │
│  [Logo Just Dev It - Isotipo_morado]   │
│                                         │
│    Just Dev It                          │
│    Desarrollo de Software Premium      │
│                                         │
│    🇨🇱 Chile  •  🇺🇸 Miami             │
│                                         │
│    IA • Data Engineering • Cloud       │
│                                         │
└─────────────────────────────────────────┘
```

**Elementos a incluir:**

- Fondo degradado morado (#9B61A4) a negro (#0F0F0F)
- Logo principal (Isotipo_morado.svg o Logo principal - blanco.svg)
- Texto principal: "Just Dev It"
- Subtítulo: "Desarrollo de Software Premium"
- Ubicaciones: "Chile • Miami"
- Servicios clave: "IA • Data Engineering • Cloud"
- Efectos visuales: Partículas, líneas conectoras (opcional)

### 2. twitter-image.jpg (Twitter Card)

**Ubicación:** `assets/images/twitter-image.jpg`

**Especificaciones:**

- Tamaño: **1200 x 675 píxeles** (ratio 16:9 para mejor visualización)
- Formato: JPG
- Peso máximo: 1 MB
- Resolución: 72 DPI

**Diseño Sugerido:**

```
┌─────────────────────────────────────────┐
│                                         │
│  [Logo]  Just Dev It                    │
│                                         │
│  Desarrollo de Software                │
│  Chile 🇨🇱 & Miami 🇺🇸                  │
│                                         │
│  ✓ IA & Machine Learning               │
│  ✓ Data Engineering                    │
│  ✓ Cloud Computing                     │
│                                         │
│  justdev.it                            │
└─────────────────────────────────────────┘
```

**Elementos a incluir:**

- Fondo similar a og-image pero con ratio 16:9
- Logo más pequeño en esquina superior
- Texto optimizado para lectura rápida
- Call-to-action: "justdev.it"
- Banderas de Chile 🇨🇱 y USA 🇺🇸
- Checkmarks (✓) para servicios

### 3. apple-touch-icon.png (ya existe)

**Ubicación:** `assets/images/apple-touch-icon.png`

**Especificaciones:**

- Tamaño: **180 x 180 píxeles**
- Formato: PNG con transparencia
- Ya existe en el proyecto ✅

---

## Herramientas Recomendadas

### Opción 1: Canva (Fácil, sin código)

1. Ir a [Canva.com](https://www.canva.com)
2. Crear diseño personalizado:
   - og-image: 1200 x 630 px
   - twitter-image: 1200 x 675 px
3. Subir logo desde `assets/images/Isotipo_morado.svg`
4. Usar colores del brand:
   - Morado principal: #9B61A4
   - Negro: #0F0F0F
   - Cyan: #04C7AA
5. Descargar como JPG (calidad alta)

### Opción 2: Figma (Profesional)

1. Crear frames con las dimensiones exactas
2. Importar assets del proyecto
3. Aplicar efectos de blur, gradientes, sombras
4. Exportar como JPG @2x para retina displays

### Opción 3: Adobe Photoshop

1. Nuevo documento con las specs
2. Aplicar gradientes de marca
3. Insertar logo como Smart Object
4. Guardar para web (JPG, calidad 80-90%)

### Opción 4: Generador AI

Prompt para Midjourney/DALL-E:

```
"Modern tech company social media banner, purple gradient background (#9B61A4),
minimalist design, abstract particle network, 'Just Dev It' text,
Chile and Miami flags, AI and cloud computing icons, professional corporate style,
dark theme, 1200x630px"
```

---

## Colores del Brand (para referencia)

```css
/* Primarios */
--color-brand-primary: #9b61a4; /* Morado principal */
--color-brand-secondary: #04c7aa; /* Cyan/Turquesa */
--color-brand-accent: #26e0c0; /* Cyan brillante */

/* Backgrounds */
--bg-primary: #0f0f0f; /* Negro suave */
--bg-secondary: #1a1a1a; /* Gris oscuro */

/* Degradados */
background: linear-gradient(135deg, #9b61a4 0%, #6a3b7e 100%);
background: linear-gradient(135deg, #04c7aa 0%, #26e0c0 100%);
```

---

## Checklist Final

- [ ] `og-image.jpg` creado (1200x630)
- [ ] `twitter-image.jpg` creado (1200x675)
- [ ] Ambos archivos < 1MB de peso
- [ ] Imágenes guardadas en `assets/images/`
- [ ] Verificar que se ven bien en:
  - [ ] Facebook Debugger: https://developers.facebook.com/tools/debug/
  - [ ] Twitter Card Validator: https://cards-validator.twitter.com/
  - [ ] LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

## Textos Recomendados para las Imágenes

### Título Principal

- "Just Dev It"
- "Desarrollo de Software Premium"
- "Chile & Miami"

### Servicios (elegir 3-4)

- ✓ Inteligencia Artificial
- ✓ Data Engineering
- ✓ Cloud Computing (AWS/Azure)
- ✓ Aplicaciones Empresariales
- ✓ Transformación Digital
- ✓ DevOps & CI/CD

### Locations

- 🇨🇱 Santiago, Chile
- 🇺🇸 Miami, Florida
- 🌎 Latinoamérica & USA

---

## Ejemplo de Estructura Visual

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║         [Logo Isotipo]                               ║
║                                                       ║
║         Just Dev It                                  ║
║         ━━━━━━━━━━━                                  ║
║         Desarrollo de Software Premium              ║
║                                                       ║
║         🇨🇱 Chile  •  🇺🇸 Miami                      ║
║                                                       ║
║         ✓ IA & Machine Learning                     ║
║         ✓ Data Engineering & Big Data               ║
║         ✓ Cloud Computing (AWS/Azure)               ║
║                                                       ║
║         justdev.it                                   ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

**Fondo:** Degradado diagonal de #9B61A4 (superior izquierda) a #0F0F0F (inferior derecha)  
**Efectos:** Partículas conectadas estilo red neuronal (opcional)  
**Tipografía:** Poppins Bold para títulos, Manrope Regular para subtítulos

---

## Validación Post-Creación

Una vez creadas las imágenes, validar con estas herramientas:

1. **Facebook Sharing Debugger**

   - URL: https://developers.facebook.com/tools/debug/
   - Ingresar: https://justdev.it
   - Verificar que aparezca og-image.jpg correctamente

2. **Twitter Card Validator**

   - URL: https://cards-validator.twitter.com/
   - Ingresar: https://justdev.it
   - Verificar preview de twitter-image.jpg

3. **LinkedIn Post Inspector**

   - URL: https://www.linkedin.com/post-inspector/
   - Ingresar: https://justdev.it
   - Verificar que tome og-image.jpg

4. **Verificación de Peso**
   ```powershell
   Get-ChildItem "assets\images\og-image.jpg", "assets\images\twitter-image.jpg" | Select-Object Name, @{Name="SizeKB";Expression={[Math]::Round($_.Length/1KB, 2)}}
   ```
   Ambos deben ser < 1000 KB

---

**Nota:** Estas imágenes son críticas para el SEO y la presentación profesional en redes sociales. Una buena imagen de preview puede aumentar el CTR (Click-Through Rate) hasta un 40%.
