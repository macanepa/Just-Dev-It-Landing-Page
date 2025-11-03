# 🌍 Cómo Agregar Más Idiomas

El sistema está diseñado para ser **muy fácil de extender** con nuevos idiomas.

## ✅ Pasos para Agregar un Nuevo Idioma (ej: Portugués)

### 1. Agregar Traducciones (`config/translations.js`)

```javascript
const translations = {
  es: { ... },
  en: { ... },
  
  // NUEVO IDIOMA: Portugués
  pt: {
    meta: {
      title: "Desenvolvimento de Software Chile | Just Dev It",
      description: "Desenvolvimento de software personalizado...",
      lang: "pt-BR",
      language: "Portuguese"
    },
    nav: {
      services: "Serviços",
      portfolio: "Portfólio",
      about: "Sobre Nós",
      contact: "Contato",
      cta: "Solicitar Orçamento"
    },
    hero: {
      subtitle: "Desenvolvimento de Software",
      title: "O software que sua empresa precisa",
      titleAccent: "Na Hora Certa",
      // ... etc
    }
    // Copiar TODA la estructura de 'es' o 'en' y traducir
  }
};
```

### 2. Agregar a Idiomas Soportados (`js/i18n.js`)

```javascript
constructor() {
  this.supportedLanguages = ['es', 'en', 'pt']; // Agregar 'pt'
  // ...
}
```

### 3. Actualizar Detección por IP (opcional) (`js/i18n.js`)

```javascript
async detectLanguageByIP() {
  // ...
  const portugueseSpeakingCountries = ['BR', 'PT']; // Brasil, Portugal
  
  if (spanishSpeakingCountries.includes(countryCode)) {
    return 'es';
  } else if (portugueseSpeakingCountries.includes(countryCode)) {
    return 'pt'; // NUEVO
  } else {
    return 'en';
  }
}
```

### 4. Agregar Bandera SVG al Selector (`index.html`)

```html
<svg class="language-flag" ...>
  <g id="flag-cl">...</g>
  <g id="flag-us" style="display:none;">...</g>
  
  <!-- NUEVA BANDERA: Brasil -->
  <g id="flag-br" style="display:none;">
    <rect width="28" height="20" fill="#009739" rx="2"/>
    <polygon points="14,4 24,10 14,16 4,10" fill="#FEDD00"/>
    <circle cx="14" cy="10" r="3" fill="#002776"/>
  </g>
</svg>
```

### 5. Actualizar Lógica del Selector (`js/i18n.js`)

```javascript
updateLanguageSelector(lang) {
  const flagCL = selector.querySelector('#flag-cl');
  const flagUS = selector.querySelector('#flag-us');
  const flagBR = selector.querySelector('#flag-br'); // NUEVO
  
  // Ocultar todas
  if (flagCL) flagCL.style.display = 'none';
  if (flagUS) flagUS.style.display = 'none';
  if (flagBR) flagBR.style.display = 'none';
  
  // Mostrar la correcta
  if (lang === 'es') {
    if (flagCL) flagCL.style.display = 'block';
    if (langText) langText.textContent = 'ES';
  } else if (lang === 'pt') {
    if (flagBR) flagBR.style.display = 'block';
    if (langText) langText.textContent = 'PT';
  } else {
    if (flagUS) flagUS.style.display = 'block';
    if (langText) langText.textContent = 'EN';
  }
}
```

---

## 🎯 Complejidad: **MUY SIMPLE**

### Tiempo estimado por idioma:
- **Traducir textos:** 2-3 horas (si usas Google Translate: 30 min)
- **Agregar bandera SVG:** 5 minutos
- **Actualizar código:** 10 minutos

**Total:** ~3 horas por idioma (con traductor profesional)

---

## 🌐 Selector con Múltiples Idiomas

Si quieres un **dropdown** con más de 2 idiomas:

### HTML del Selector Mejorado:

```html
<div class="language-selector-dropdown">
  <button id="language-selector" class="language-selector">
    <svg class="language-flag"><!-- Bandera actual --></svg>
    <span class="language-text">ES</span>
    <svg class="dropdown-arrow" width="12" height="12">
      <path d="M6 8 L2 4 L10 4 Z" fill="currentColor"/>
    </svg>
  </button>
  
  <!-- Dropdown (oculto por defecto) -->
  <div class="language-dropdown" style="display:none;">
    <button data-lang="es">🇨🇱 Español</button>
    <button data-lang="en">🇺🇸 English</button>
    <button data-lang="pt">🇧🇷 Português</button>
    <button data-lang="fr">🇫🇷 Français</button>
  </div>
</div>
```

### JavaScript:

```javascript
setupLanguageSelector() {
  const selector = document.getElementById('language-selector');
  const dropdown = document.querySelector('.language-dropdown');
  
  selector.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });
  
  dropdown.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang;
      this.switchLanguage(lang);
      dropdown.style.display = 'none';
    });
  });
}
```

---

## 📊 Idiomas Recomendados para LATAM

1. **Español** (implementado) - Chile, LATAM
2. **Inglés** (implementado) - USA, Europa, Asia
3. **Portugués** - Brasil (mercado enorme)
4. **Francés** - Canadá, Francia, África

---

## 🎨 Banderas SVG Simples

```html
<!-- Chile -->
<rect width="28" height="20" fill="#0039A6" rx="2"/>
<rect y="10" width="28" height="10" fill="#D52B1E"/>
<rect width="11" height="10" fill="#FFFFFF"/>
<path d="M5.5 3 L7 6.5 L3.5 4.8 L7.5 4.8 L4 6.5 Z" fill="#0039A6"/>

<!-- USA -->
<rect width="28" height="20" fill="#B22234" rx="2"/>
<rect y="2" width="28" height="2" fill="#FFFFFF"/>
<rect y="6" width="28" height="2" fill="#FFFFFF"/>
<rect y="10" width="28" height="2" fill="#FFFFFF"/>
<rect y="14" width="28" height="2" fill="#FFFFFF"/>
<rect y="18" width="28" height="2" fill="#FFFFFF"/>
<rect width="11" height="11" fill="#3C3B6E"/>

<!-- Brasil -->
<rect width="28" height="20" fill="#009739" rx="2"/>
<polygon points="14,4 24,10 14,16 4,10" fill="#FEDD00"/>
<circle cx="14" cy="10" r="3" fill="#002776"/>

<!-- Francia -->
<rect width="9" height="20" fill="#002654"/>
<rect x="9" width="10" height="20" fill="#FFFFFF"/>
<rect x="19" width="9" height="20" fill="#ED2939"/>
```

---

## ✅ Conclusión

**Agregar un nuevo idioma es MUY SIMPLE:**
1. Copiar el objeto de traducciones
2. Traducir los textos
3. Agregar el idioma al array `supportedLanguages`
4. Agregar la bandera SVG
5. Listo!

**No requiere cambios complejos en el código.**
