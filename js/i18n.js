// ===== SISTEMA DE INTERNACIONALIZACIÓN (i18n) =====
// Español (es-CL) por defecto: el HTML estático es la fuente de verdad SEO.
// El idioma solo cambia por elección manual del usuario (persistida en localStorage).
// REGLA SEO: nunca tocar <html lang>, <title> ni metas de forma automática —
// Googlebot renderiza sin localStorage y debe ver siempre la versión es-CL estática.
// Por eso aquí NO hay detección por IP/navegador ni reescritura de meta tags.

import translations from '../config/translations.js';

class I18n {
  constructor() {
    this.translations = translations;
    this.supportedLanguages = ['es', 'en'];
    this.defaultLanguage = 'es';
    this.currentLanguage = this.defaultLanguage;
  }

  // ===== INICIALIZACIÓN =====
  init() {
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (
      savedLanguage &&
      this.supportedLanguages.includes(savedLanguage) &&
      savedLanguage !== this.defaultLanguage
    ) {
      // Preferencia explícita previa del usuario (un crawler nunca la tiene)
      this.applyLanguage(savedLanguage);
    } else {
      // El DOM ya está en español: no se toca nada, solo el estado del selector
      this.currentLanguage = this.defaultLanguage;
      this.updateLanguageSelector(this.defaultLanguage);
    }

    this.setupLanguageSelector();
  }

  // ===== APLICAR IDIOMA (solo por elección del usuario) =====
  applyLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      lang = this.defaultLanguage;
    }

    this.currentLanguage = lang;

    // lang del documento: refleja la elección del usuario (a11y/lectores de pantalla)
    document.documentElement.lang = this.translations[lang].meta.lang;

    this.translateElements(lang);
    this.updateLanguageSelector(lang);

    window.dispatchEvent(
      new CustomEvent('languageChanged', { detail: { language: lang } })
    );
  }

  // ===== TRADUCIR ELEMENTOS =====
  translateElements(lang) {
    const t = this.translations[lang];

    // Texto plano
    document.querySelectorAll('[data-i18n]:not([data-i18n-html])').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getNestedTranslation(t, key);

      if (translation) {
        element.textContent = translation;
      } else {
        console.warn(`[i18n] Traducción no encontrada para: ${key}`);
      }
    });

    // Contenido con HTML
    document.querySelectorAll('[data-i18n-html]').forEach((element) => {
      const key = element.getAttribute('data-i18n-html');
      const translation = this.getNestedTranslation(t, key);

      if (translation) {
        element.innerHTML = translation;
      } else {
        console.warn(`[i18n] Traducción HTML no encontrada para: ${key}`);
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getNestedTranslation(t, key);

      if (translation) {
        element.placeholder = translation;
      }
    });

    // Atributos title/aria-label
    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
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

  // ===== CONFIGURAR SELECTOR DE IDIOMA =====
  setupLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (!selector) return;

    selector.addEventListener('click', (e) => {
      e.preventDefault();
      const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
      this.switchLanguage(newLang);
    });
  }

  // ===== CAMBIAR IDIOMA (acción manual del usuario) =====
  switchLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) return;

    localStorage.setItem('preferredLanguage', lang);
    this.applyLanguage(lang);
  }

  // ===== ACTUALIZAR SELECTOR VISUAL =====
  updateLanguageSelector(lang) {
    const selector = document.getElementById('language-selector');
    if (!selector) return;

    const langText = selector.querySelector('.language-text');
    const tooltip = selector.querySelector('.language-tooltip');

    if (langText) langText.textContent = lang === 'es' ? 'ES' : 'EN';
    if (tooltip) tooltip.textContent = this.translations[lang].language.switch;
  }

  // ===== HELPERS PÚBLICOS =====
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getTranslations() {
    return this.translations[this.currentLanguage];
  }

  t(key) {
    return this.getNestedTranslation(this.translations[this.currentLanguage], key);
  }
}

// Exportar instancia única (singleton)
const i18n = new I18n();

// Acceso para scripts no-módulo (p.ej. mensajes del formulario en app-standalone.js)
window.i18n = i18n;

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}

export default i18n;
