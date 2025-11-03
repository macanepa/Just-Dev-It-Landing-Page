# 🎨 Sistema de Theming - Guía de Uso Rápido

## Archivo Creado
- **Ubicación**: `css/core/themes.css`
- **Demo Interactivo**: `docs/sections/mockups/theme-demo.html`

---

## 🚀 Uso Básico

### 1. Aplicar un Tema
Agrega el atributo `data-theme` a cualquier contenedor:

```html
<section data-theme="databam">
    <!-- Todo el contenido aquí usará el tema Databam -->
</section>

<div data-theme="ai">
    <!-- Este bloque usará el tema Just AI -->
</div>
```

### 2. Temas Disponibles

| Tema | Valor | Colores Principales |
|------|-------|---------------------|
| 🏠 Databam | `databam` | `#6B2CF5` / `#2EC5FF` / `#F9C23C` |
| 🛠️ Tools | `tools` | `#06B6D4` / `#22C55E` / `#F59E0B` |
| ⚡ Energy | `energy` | `#1479FF` / `#00E0FF` / `#7DD3FC` |
| 📊 Data | `data` | `#4338CA` / `#06B6D4` / `#84CC16` |
| 🏙️ City | `city` | `#8B5CF6` / `#10B981` / `#F43F5E` |
| 📈 Investing | `investing` | `#16A34A` / `#0EA5E9` / `#F4C430` |
| 💳 Finance | `finance` | `#1E293B` / `#14B8A6` / `#A78BFA` |
| 🤖 AI | `ai` | `#7C3AED` / `#EC4899` / `#22D3EE` |
| 🚚 Logistics | `logistics` | `#F97316` / `#0EA5E9` / `#22C55E` |

---

## 📦 Variables CSS por Tema

Cada tema define estas variables automáticamente:

```css
/* Colores */
--theme-primary          /* Color principal del tema */
--theme-secondary        /* Color secundario */
--theme-accent          /* Color de acento */

/* Gradientes */
--theme-gradient        /* Gradiente principal (primary → secondary) */
--theme-gradient-hover  /* Gradiente para hover states */
--theme-gradient-radial /* Gradiente radial para backgrounds */

/* Variantes */
--theme-primary-light   /* Versión clara del primary */
--theme-primary-dark    /* Versión oscura del primary */
--theme-secondary-light
--theme-secondary-dark

/* Backgrounds */
--theme-bg-subtle       /* Background sutil (5% opacity) */
--theme-bg-muted        /* Background muted (10% opacity) */
--theme-bg-emphasis     /* Background emphasis (15% opacity) */

/* Borders */
--theme-border          /* Border color (20% opacity) */
--theme-border-strong   /* Border fuerte (40% opacity) */

/* Sombras */
--theme-shadow          /* Sombra estándar */
--theme-shadow-lg       /* Sombra grande */
--theme-glow            /* Efecto de glow */
```

---

## 🎨 Clases Utility Temáticas

### Textos
```html
<h1 class="text-theme-primary">Texto con color primary</h1>
<p class="text-theme-secondary">Texto con color secondary</p>
<span class="text-theme-accent">Texto con color accent</span>
```

### Backgrounds
```html
<div class="bg-theme-subtle">Background sutil</div>
<div class="bg-theme-muted">Background muted</div>
<div class="bg-theme-emphasis">Background emphasis</div>
<div class="bg-theme-gradient">Background con gradiente</div>
```

### Borders
```html
<div class="border-theme">Border temático</div>
<div class="border-theme-strong">Border fuerte</div>
```

### Sombras
```html
<div class="shadow-theme">Sombra estándar</div>
<div class="shadow-theme-lg">Sombra grande</div>
<div class="glow-theme">Efecto glow</div>
```

### Hover Effects
```html
<div class="hover-theme-glow">Glow en hover</div>
<div class="hover-theme-bg">Background change en hover</div>
```

---

## 🧩 Componentes Pre-diseñados

### Badge Temático
```html
<span class="badge-theme">Just Dev It</span>
<span class="badge-theme">Beta</span>
```

### Buttons Temáticos
```html
<button class="btn-theme">Primary Button</button>
<button class="btn-theme-outline">Outline Button</button>
```

### Card Temático
```html
<div class="card-theme">
    <h3>Título del Card</h3>
    <p>Contenido del card...</p>
</div>

<!-- Con hover effect -->
<div class="card-theme hover-theme-glow">
    <h3>Card con Glow</h3>
    <p>Pasa el mouse para ver el efecto</p>
</div>
```

### Heading con Gradiente
```html
<h1 class="heading-theme-gradient">Título con Gradiente</h1>
<h2 class="heading-theme-gradient">Subtítulo</h2>
```

### Hero con Background Temático
```html
<section class="hero-theme-bg">
    <div style="position: relative; z-index: 1;">
        <h1 class="heading-theme-gradient">Hero Title</h1>
        <p>Hero subtitle...</p>
        <button class="btn-theme">CTA</button>
    </div>
</section>
```

### Divider Temático
```html
<div class="divider-theme"></div>
```

---

## 🎭 Uso con Variables CSS Customizadas

Puedes usar las variables directamente en tu CSS:

```css
.my-custom-element {
    color: var(--theme-primary);
    background: var(--theme-gradient);
    border: 2px solid var(--theme-border);
    box-shadow: var(--theme-shadow);
}

.my-custom-element:hover {
    background: var(--theme-gradient-hover);
    box-shadow: var(--theme-shadow-lg);
}
```

---

## 🎬 Animaciones Temáticas

### Pulse Animation
```html
<div class="animate-theme-pulse">
    Elemento con efecto pulse
</div>
```

### Gradient Shift Animation
```html
<div class="animate-theme-gradient">
    Gradiente animado
</div>
```

---

## 📱 Ejemplos Completos

### Ejemplo 1: Sección Databam
```html
<section data-theme="databam" style="padding: 4rem 0;">
    <div class="container">
        <span class="badge-theme">PropTech</span>
        <h1 class="heading-theme-gradient" style="font-size: 3rem; margin: 1.5rem 0;">
            Databam - PropTech Intelligence
        </h1>
        <p style="color: var(--color-neutral-light); margin-bottom: 2rem;">
            Acceso a data inmobiliaria del CBR, SII y Conservador.
        </p>
        
        <div style="display: flex; gap: 1rem;">
            <button class="btn-theme">Solicitar Demo</button>
            <button class="btn-theme-outline">Ver Precios</button>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
            <div class="card-theme hover-theme-glow">
                <h3 style="color: var(--theme-primary); margin-bottom: 1rem;">Feature 1</h3>
                <p style="color: var(--color-neutral-light);">Descripción de la feature...</p>
            </div>
            <div class="card-theme hover-theme-glow">
                <h3 style="color: var(--theme-secondary); margin-bottom: 1rem;">Feature 2</h3>
                <p style="color: var(--color-neutral-light);">Descripción de la feature...</p>
            </div>
        </div>
    </div>
</section>
```

### Ejemplo 2: Cambio Dinámico de Tema (JavaScript)
```html
<div id="dynamic-section" data-theme="tools">
    <h2 class="heading-theme-gradient">Cambia mi tema</h2>
    <button class="btn-theme" onclick="changeTheme()">Cambiar Tema</button>
</div>

<script>
const themes = ['databam', 'tools', 'energy', 'data', 'city', 'investing', 'finance', 'ai', 'logistics'];
let currentThemeIndex = 0;

function changeTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.getElementById('dynamic-section').setAttribute('data-theme', themes[currentThemeIndex]);
}
</script>
```

---

## ♿ Accesibilidad

El sistema incluye soporte para:

- **High Contrast Mode**: Borders más fuertes automáticamente
- **Reduced Motion**: Sin animaciones si el usuario lo prefiere
- **Dark Mode**: Optimizado por defecto (light mode futuro)

---

## 📂 Archivos del Sistema

```
css/core/
├── variables.css    ← Variables globales del sistema
├── themes.css       ← Sistema de 9 temas (NUEVO)
└── typography.css   ← Tipografía (Poppins, Manrope)

docs/sections/mockups/
└── theme-demo.html  ← Demo interactivo del sistema
```

---

## 🎯 Best Practices

1. **Un tema por sección**: Usa `data-theme` en el contenedor principal de cada sección
2. **Consistencia**: Usa las clases utility temáticas en lugar de CSS inline cuando sea posible
3. **Performance**: El sistema usa CSS variables nativas (sin JavaScript necesario)
4. **Responsive**: Todas las clases son responsive-friendly
5. **Accesibilidad**: Siempre incluye suficiente contraste entre texto y fondo

---

## 🔧 Extensión Futura

Si necesitas agregar un nuevo tema:

```css
[data-theme="new-theme"] {
    --theme-primary: #YOUR_COLOR;
    --theme-secondary: #YOUR_COLOR;
    --theme-accent: #YOUR_COLOR;
    --theme-gradient: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%);
    /* ... resto de variables */
}
```

---

## 📞 Soporte

- **Demo**: Abre `docs/sections/mockups/theme-demo.html` en tu navegador
- **Documentación completa**: Ver `docs/SECTIONS-ARCHITECTURE.md`
- **Variables globales**: Ver `css/core/variables.css`
