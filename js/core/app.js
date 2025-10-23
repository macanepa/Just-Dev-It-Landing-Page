/**
 * Main Application - Just Dev It
 * Punto de entrada principal que inicializa todos los componentes
 */

import { lazyLoadImages, getScreenSize } from './utils.js';
import initNavigation from '../components/navigation.js';
import initAnimations from '../components/animations.js';
import initHeroAnimation from '../components/hero-3d.js';
import { initForms } from '../components/form-validator.js';
import { PortfolioFilter } from '../components/portfolio-filter.js';
import { Lightbox } from '../components/lightbox.js';

class App {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        
        this.init();
    }
    
    async init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    async setup() {
        try {
            console.log('🚀 Inicializando Just Dev It...');
            
            // Mostrar loader si existe
            this.showLoader();
            
            // Inicializar componentes core
            await this.initCore();
            
            // Inicializar componentes UI
            await this.initUIComponents();
            
            // Inicializar animaciones
            await this.initAnimationsSystem();
            
            // Setup eventos globales
            this.setupGlobalEvents();
            
            // Performance optimizations
            this.optimizePerformance();
            
            // Ocultar loader
            this.hideLoader();
            
            this.isInitialized = true;
            console.log('✅ Just Dev It inicializado correctamente');
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('app:initialized'));
            
        } catch (error) {
            console.error('❌ Error inicializando la aplicación:', error);
            this.handleInitError(error);
        }
    }
    
    /**
     * Inicializa componentes core
     */
    async initCore() {
        console.log('📦 Inicializando componentes core...');
        
        // Lazy loading de imágenes
        lazyLoadImages();
        
        // Detectar dispositivo
        this.deviceType = getScreenSize();
        document.documentElement.setAttribute('data-device', this.deviceType);
        
        // Setup skip link
        this.setupSkipLink();
    }
    
    /**
     * Inicializa componentes de UI
     */
    async initUIComponents() {
        console.log('🎨 Inicializando componentes UI...');
        
        // Navegación
        this.components.navigation = initNavigation();
        
        // Hero 3D Animation
        if (document.getElementById('hero-3d-container')) {
            this.components.hero3D = initHeroAnimation('hero-3d-container', 'particles');
        }
        
        // Formularios
        this.components.forms = initForms();
        
        // Portfolio filter
        const portfolioGrid = document.querySelector('[data-portfolio-grid]');
        if (portfolioGrid) {
            this.components.portfolioFilter = new PortfolioFilter();
        }
        
        // Lightbox para imágenes
        const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
        if (lightboxTriggers.length > 0) {
            this.components.lightbox = new Lightbox();
        }
        
        // Otros componentes específicos
        this.initScrollToTop();
    }
    
    /**
     * Inicializa sistema de animaciones
     */
    async initAnimationsSystem() {
        console.log('✨ Inicializando sistema de animaciones...');
        
        this.components.animations = initAnimations();
        
        // Animaciones adicionales específicas
        this.setupCustomAnimations();
    }
    
    /**
     * Setup de animaciones personalizadas
     */
    setupCustomAnimations() {
        // Animación de números (contadores)
        const stats = document.querySelectorAll('.stat-number, [data-count]');
        if (stats.length > 0) {
            console.log('📊 Inicializando contadores animados...');
        }
        
        // Hover effects para cards
        const cards = document.querySelectorAll('.card, .project-card, .service-card');
        cards.forEach(card => {
            this.addCardHoverEffect(card);
        });
    }
    
    /**
     * Efecto hover para cards
     */
    addCardHoverEffect(card) {
        // Ya manejado por el sistema de animaciones
        // Pero podemos agregar lógica adicional aquí
    }
    
    /**
     * Inicializa portfolio con filtros
     */
    async initPortfolio() {
        const { default: PortfolioFilter } = await import('../components/portfolio-filter.js');
        this.components.portfolio = new PortfolioFilter('[data-portfolio]');
    }
    
    /**
     * Setup de eventos globales
     */
    setupGlobalEvents() {
        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Orientación (móviles)
        if ('onorientationchange' in window) {
            window.addEventListener('orientationchange', () => {
                this.handleOrientationChange();
            });
        }
        
        // Online/Offline
        window.addEventListener('online', () => this.handleConnectionChange(true));
        window.addEventListener('offline', () => this.handleConnectionChange(false));
        
        // Visibility change
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Print
        window.addEventListener('beforeprint', () => this.handlePrint());
    }
    
    /**
     * Maneja cambio de tamaño
     */
    handleResize() {
        const newDeviceType = getScreenSize();
        if (newDeviceType !== this.deviceType) {
            this.deviceType = newDeviceType;
            document.documentElement.setAttribute('data-device', this.deviceType);
            console.log(`📱 Dispositivo cambiado a: ${this.deviceType}`);
        }
    }
    
    /**
     * Maneja cambio de orientación
     */
    handleOrientationChange() {
        console.log('🔄 Orientación cambiada');
        // Re-calcular dimensiones si es necesario
        if (this.components.hero3D) {
            this.components.hero3D.resize();
        }
    }
    
    /**
     * Maneja cambio de conexión
     */
    handleConnectionChange(isOnline) {
        console.log(`${isOnline ? '🟢' : '🔴'} Conexión: ${isOnline ? 'Online' : 'Offline'}`);
        
        // Mostrar notificación
        const message = isOnline 
            ? 'Conexión restaurada' 
            : 'Sin conexión a internet';
        
        this.showToast(message, isOnline ? 'success' : 'warning');
    }
    
    /**
     * Maneja cambio de visibilidad
     */
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('⏸️ Página oculta');
            // Pausar animaciones pesadas si es necesario
        } else {
            console.log('▶️ Página visible');
            // Reanudar animaciones
        }
    }
    
    /**
     * Maneja impresión
     */
    handlePrint() {
        console.log('🖨️ Preparando para imprimir...');
    }
    
    /**
     * Setup skip link para accesibilidad
     */
    setupSkipLink() {
        const skipLink = document.querySelector('.skip-to-content');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                }
            });
        }
    }
    
    /**
     * Inicializa botón scroll to top
     */
    initScrollToTop() {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (!scrollBtn) return;
        
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        };
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
    
    /**
     * Optimizaciones de performance
     */
    optimizePerformance() {
        // Preconnect a dominios externos
        this.preconnectExternalDomains();
        
        // Prefetch recursos importantes
        this.prefetchCriticalResources();
        
        // Service Worker (si está disponible)
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
    }
    
    /**
     * Preconnect a dominios externos
     */
    preconnectExternalDomains() {
        const domains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    /**
     * Prefetch de recursos críticos
     */
    prefetchCriticalResources() {
        // Implementar según necesidad
    }
    
    /**
     * Registra Service Worker
     */
    async registerServiceWorker() {
        try {
            // const registration = await navigator.serviceWorker.register('/sw.js');
            // console.log('✅ Service Worker registrado:', registration);
        } catch (error) {
            console.error('❌ Error registrando Service Worker:', error);
        }
    }
    
    /**
     * Muestra loader
     */
    showLoader() {
        document.body.classList.add('loading');
    }
    
    /**
     * Oculta loader
     */
    hideLoader() {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 300);
    }
    
    /**
     * Muestra toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    /**
     * Maneja errores de inicialización
     */
    handleInitError(error) {
        console.error('Error fatal:', error);
        
        // Mostrar mensaje de error al usuario
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-error';
        errorMessage.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            max-width: 500px;
        `;
        errorMessage.textContent = 'Hubo un error cargando el sitio. Por favor, recarga la página.';
        
        document.body.appendChild(errorMessage);
    }
    
    /**
     * Destruye la aplicación (cleanup)
     */
    destroy() {
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        
        this.components = {};
        this.isInitialized = false;
    }
}

// Crear instancia global
const app = new App();

// Exportar para uso externo si es necesario
export default app;

// Hot Module Replacement para desarrollo
if (import.meta.hot) {
    import.meta.hot.accept();
    import.meta.hot.dispose(() => {
        app.destroy();
    });
}
