/**
 * Utilities - Just Dev It
 * Funciones auxiliares y helpers reutilizables
 */

// ===== DOM UTILITIES =====

/**
 * Selector simplificado
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} parent - Elemento padre (opcional)
 * @returns {HTMLElement|null}
 */
const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Selector múltiple
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} parent - Elemento padre (opcional)
 * @returns {NodeList}
 */
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

/**
 * Crear elemento con atributos
 * @param {string} tag - Tag HTML
 * @param {Object} attrs - Atributos
 * @param {string|HTMLElement} content - Contenido
 * @returns {HTMLElement}
 */
const createElement = (tag, attrs = {}, content = '') => {
    const element = document.createElement(tag);
    
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on')) {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });
    
    if (typeof content === 'string') {
        element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        element.appendChild(content);
    }
    
    return element;
};

// ===== ANIMATION UTILITIES =====

/**
 * Intersection Observer para animaciones al scroll
 * @param {string} selector - Selector de elementos
 * @param {Function} callback - Función callback
 * @param {Object} options - Opciones del observer
 */
const observeElements = (selector, callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        ...options
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target, entry);
                if (options.once !== false) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, defaultOptions);
    
    $$(selector).forEach(element => observer.observe(element));
    
    return observer;
};

/**
 * Animación suave al hacer scroll
 * @param {HTMLElement|string} target - Elemento destino o selector
 * @param {number} offset - Offset adicional
 * @param {string} behavior - Comportamiento ('smooth' o 'auto')
 */
const smoothScrollTo = (target, offset = 0, behavior = 'smooth') => {
    const element = typeof target === 'string' ? $(target) : target;
    
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior
    });
};

/**
 * Debounce - Retrasa la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Retraso en ms
 * @returns {Function}
 */
const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

/**
 * Throttle - Limita la frecuencia de ejecución
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Límite en ms
 * @returns {Function}
 */
const throttle = (func, limit = 300) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== VALIDATION UTILITIES =====

/**
 * Valida email
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valida teléfono chileno
 * @param {string} phone
 * @returns {boolean}
 */
const isValidPhone = (phone) => {
    const phoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[98765]\d{7}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida URL
 * @param {string} url
 * @returns {boolean}
 */
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Sanitiza string HTML
 * @param {string} str
 * @returns {string}
 */
const sanitizeHTML = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

// ===== LOCAL STORAGE UTILITIES =====

/**
 * Guarda en localStorage con seguridad
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

/**
 * Obtiene de localStorage con seguridad
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
const getFromStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
};

/**
 * Elimina de localStorage
 * @param {string} key
 * @returns {boolean}
 */
const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
};

// ===== URL UTILITIES =====

/**
 * Obtiene parámetros de URL
 * @returns {Object}
 */
const getURLParams = () => {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    
    return params;
};

/**
 * Actualiza parámetros de URL sin recargar
 * @param {Object} params
 */
const updateURLParams = (params) => {
    const url = new URL(window.location);
    
    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, value);
        }
    });
    
    window.history.pushState({}, '', url);
};

// ===== FORMAT UTILITIES =====

/**
 * Formatea número a moneda chilena
 * @param {number} amount
 * @returns {string}
 */
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(amount);
};

/**
 * Formatea fecha
 * @param {Date|string} date
 * @param {Object} options
 * @returns {string}
 */
const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };
    
    return new Intl.DateTimeFormat('es-CL', defaultOptions).format(new Date(date));
};

/**
 * Trunca texto
 * @param {string} text
 * @param {number} length
 * @param {string} suffix
 * @returns {string}
 */
const truncateText = (text, length = 100, suffix = '...') => {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + suffix;
};

// ===== DEVICE DETECTION =====

/**
 * Detecta si es dispositivo móvil
 * @returns {boolean}
 */
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detecta si es tablet
 * @returns {boolean}
 */
const isTablet = () => {
    return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
};

/**
 * Detecta tamaño de pantalla
 * @returns {string} 'mobile', 'tablet', 'desktop'
 */
const getScreenSize = () => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
};

// ===== PERFORMANCE UTILITIES =====

/**
 * Lazy load de imágenes
 * @param {string} selector
 */
const lazyLoadImages = (selector = 'img[loading="lazy"]') => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        $$(selector).forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores antiguos
        $$(selector).forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }
};

/**
 * Preload de recursos
 * @param {string} url
 * @param {string} as - Tipo de recurso
 */
const preloadResource = (url, as = 'image') => {
    const link = createElement('link', {
        rel: 'preload',
        href: url,
        as
    });
    document.head.appendChild(link);
};

// ===== ANIMATION FRAME UTILITIES =====

/**
 * Request Animation Frame con fallback
 * @param {Function} callback
 * @returns {number}
 */
const requestFrame = (() => {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           ((callback) => window.setTimeout(callback, 1000 / 60));
})();

/**
 * Cancel Animation Frame con fallback
 * @param {number} id
 */
const cancelFrame = (() => {
    return window.cancelAnimationFrame ||
           window.webkitCancelAnimationFrame ||
           window.mozCancelAnimationFrame ||
           window.clearTimeout;
})();

// ===== EXPORT =====
export {
    $,
    $$,
    createElement,
    observeElements,
    smoothScrollTo,
    debounce,
    throttle,
    isValidEmail,
    isValidPhone,
    isValidUrl,
    sanitizeHTML,
    saveToStorage,
    getFromStorage,
    removeFromStorage,
    getURLParams,
    updateURLParams,
    formatCurrency,
    formatDate,
    truncateText,
    isMobile,
    isTablet,
    getScreenSize,
    lazyLoadImages,
    preloadResource,
    requestFrame,
    cancelFrame
};
