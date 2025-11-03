// ===== SISTEMA DE INTERNACIONALIZACIÓN (i18n) =====
// Detección automática de idioma por IP + Selector manual + LocalStorage

import translations from '../config/translations.js';

class I18n {
  constructor() {
    this.currentLanguage = null;
    this.translations = translations;
    this.supportedLanguages = ['es', 'en'];
    this.defaultLanguage = 'es';
    
    // Elementos que necesitan traducción (se inicializan después del DOM)
    this.translatableElements = [];
  }

  // ===== INICIALIZACIÓN =====
  async init() {
    console.log('[i18n] Inicializando sistema de internacionalización...');
    
    // 1. Verificar si hay idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      console.log(`[i18n] Idioma guardado encontrado: ${savedLanguage}`);
      this.currentLanguage = savedLanguage;
      this.applyLanguage(savedLanguage);
    } else {
      // 2. Detectar idioma por IP
      console.log('[i18n] No hay idioma guardado. Detectando por IP...');
      const detectedLanguage = await this.detectLanguageByIP();
      this.currentLanguage = detectedLanguage;
      this.applyLanguage(detectedLanguage);
    }

    // 3. Configurar event listeners para el selector de idioma
    this.setupLanguageSelector();
    
    console.log(`[i18n] Sistema inicializado en idioma: ${this.currentLanguage}`);
  }

  // ===== DETECCIÓN DE IDIOMA POR IP =====
  async detectLanguageByIP() {
    try {
      console.log('[i18n] Consultando API de geolocalización...');
      
      // Usamos ipapi.co (gratuito, 30k requests/mes)
      // Alternativas: ipwhois.app, ip-api.com, ipgeolocation.io
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[i18n] Datos de geolocalización:', data);

      // Países de habla hispana en Latinoamérica
      const spanishSpeakingCountries = [
        'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GT', 
        'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'ES', 'UY', 'VE'
      ];

      const countryCode = data.country_code || data.country || 'US';
      
      if (spanishSpeakingCountries.includes(countryCode)) {
        console.log(`[i18n] País detectado: ${countryCode} - Idioma: español`);
        return 'es';
      } else {
        console.log(`[i18n] País detectado: ${countryCode} - Idioma: inglés`);
        return 'en';
      }

    } catch (error) {
      console.warn('[i18n] Error al detectar idioma por IP:', error);
      console.log('[i18n] Usando idioma por defecto del navegador como fallback...');
      
      // Fallback: detectar idioma del navegador
      const browserLang = navigator.language || navigator.userLanguage;
      const langCode = browserLang.split('-')[0];
      
      if (this.supportedLanguages.includes(langCode)) {
        console.log(`[i18n] Idioma del navegador: ${langCode}`);
        return langCode;
      }
      
      console.log(`[i18n] Usando idioma por defecto: ${this.defaultLanguage}`);
      return this.defaultLanguage;
    }
  }

  // ===== APLICAR IDIOMA =====
  applyLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`[i18n] Idioma no soportado: ${lang}. Usando ${this.defaultLanguage}`);
      lang = this.defaultLanguage;
    }

    console.log(`[i18n] Aplicando idioma: ${lang}`);
    this.currentLanguage = lang;

    // Actualizar atributo lang del HTML
    document.documentElement.lang = this.translations[lang].meta.lang;

    // Actualizar meta tags
    this.updateMetaTags(lang);

    // Traducir todos los elementos con data-i18n
    this.translateElements(lang);

    // Actualizar el selector de idioma
    this.updateLanguageSelector(lang);

    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
  }

  // ===== TRADUCIR ELEMENTOS =====
  translateElements(lang) {
    const t = this.translations[lang];

    // Traducir elementos con data-i18n (solo texto)
    document.querySelectorAll('[data-i18n]:not([data-i18n-html])').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getNestedTranslation(t, key);
      
      if (translation) {
        element.textContent = translation;
      } else {
        console.warn(`[i18n] Traducción no encontrada para: ${key}`);
      }
    });

    // Traducir elementos con data-i18n-html (con HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translation = this.getNestedTranslation(t, key);
      
      if (translation) {
        element.innerHTML = translation;
      } else {
        console.warn(`[i18n] Traducción HTML no encontrada para: ${key}`);
      }
    });

    // Traducir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getNestedTranslation(t, key);
      
      if (translation) {
        element.placeholder = translation;
      }
    });

    // Traducir atributos title/aria-label
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = this.getNestedTranslation(t, key);
      
      if (translation) {
        element.title = translation;
        element.setAttribute('aria-label', translation);
      }
    });
  }

  // ===== OBTENER TRADUCCIÓN ANIDADA =====
  getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current?.[key];
    }, obj);
  }

  // ===== ACTUALIZAR META TAGS =====
  updateMetaTags(lang) {
    const meta = this.translations[lang].meta;

    // Title
    document.title = meta.title;

    // Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = meta.description;

    // Language
    const metaLang = document.querySelector('meta[name="language"]');
    if (metaLang) metaLang.content = meta.language;

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = meta.title;

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = meta.description;

    // Twitter Card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.content = meta.title;

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.content = meta.description;
  }

  // ===== CONFIGURAR SELECTOR DE IDIOMA =====
  setupLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (!selector) {
      console.warn('[i18n] Selector de idioma no encontrado');
      return;
    }

    selector.addEventListener('click', (e) => {
      e.preventDefault();
      const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
      this.switchLanguage(newLang);
    });
  }

  // ===== CAMBIAR IDIOMA =====
  switchLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`[i18n] Idioma no soportado: ${lang}`);
      return;
    }

    console.log(`[i18n] Cambiando idioma a: ${lang}`);

    // Guardar preferencia en localStorage
    localStorage.setItem('preferredLanguage', lang);

    // Aplicar nuevo idioma
    this.applyLanguage(lang);

    // Animación suave
    document.body.style.opacity = '0.95';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 150);
  }

  // ===== ACTUALIZAR SELECTOR VISUAL =====
  updateLanguageSelector(lang) {
    const selector = document.getElementById('language-selector');
    if (!selector) return;

    const flagIcon = selector.querySelector('.language-flag');
    const langText = selector.querySelector('.language-text');
    const tooltip = selector.querySelector('.language-tooltip');

    if (lang === 'es') {
      if (flagIcon) flagIcon.textContent = '🇨🇱';
      if (langText) langText.textContent = 'ES';
      if (tooltip) tooltip.textContent = this.translations['es'].language.switch;
    } else {
      if (flagIcon) flagIcon.textContent = '🇺🇸';
      if (langText) langText.textContent = 'EN';
      if (tooltip) tooltip.textContent = this.translations['en'].language.switch;
    }
  }

  // ===== OBTENER IDIOMA ACTUAL =====
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // ===== OBTENER TRADUCCIONES DEL IDIOMA ACTUAL =====
  getTranslations() {
    return this.translations[this.currentLanguage];
  }

  // ===== OBTENER TRADUCCIÓN ESPECÍFICA =====
  t(key) {
    return this.getNestedTranslation(this.translations[this.currentLanguage], key);
  }
}

// Exportar instancia única (singleton)
const i18n = new I18n();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}

export default i18n;
