/**
 * Navigation Component - Just Dev It
 * Maneja la funcionalidad de la navegación responsive
 */

import { $, $$, debounce, smoothScrollTo } from '../core/utils.js';

class Navigation {
    constructor() {
        this.header = $('.site-header');
        this.nav = $('.main-nav');
        this.navToggle = $('#nav-toggle');
        this.navMenu = $('#nav-menu');
        this.navLinks = $$('.nav-link');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        this.setupMobileMenu();
        this.setupScrollBehavior();
        this.setupActiveLinks();
        this.setupSmoothScroll();
        this.handleResize();
    }
    
    /**
     * Configura el menú móvil
     */
    setupMobileMenu() {
        if (!this.navToggle || !this.navMenu) return;
        
        // Toggle menú móvil
        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Cerrar menú al hacer click en un link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    this.closeMobileMenu();
                }
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (
                this.navMenu.classList.contains('active') &&
                !this.navMenu.contains(e.target) &&
                !this.navToggle.contains(e.target)
            ) {
                this.closeMobileMenu();
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    /**
     * Toggle del menú móvil
     */
    toggleMobileMenu() {
        const isActive = this.navMenu.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    /**
     * Abre el menú móvil
     */
    openMobileMenu() {
        this.navMenu.classList.add('active');
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
        document.body.classList.add('menu-open');
        
        // Trap focus dentro del menú
        this.trapFocus(this.navMenu);
    }
    
    /**
     * Cierra el menú móvil
     */
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        document.body.classList.remove('menu-open');
    }
    
    /**
     * Configura el comportamiento al hacer scroll
     */
    setupScrollBehavior() {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Agregar clase 'scrolled' cuando se hace scroll
            if (scrollTop > this.scrollThreshold) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            
            // Ocultar header al hacer scroll hacia abajo (opcional)
            // Descomentar si se quiere este comportamiento
            /*
            if (scrollTop > this.lastScrollTop && scrollTop > 300) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            */
            
            this.lastScrollTop = scrollTop;
            
            // Actualizar active link
            this.updateActiveLink();
        };
        
        window.addEventListener('scroll', debounce(handleScroll, 10));
    }
    
    /**
     * Configura los links activos según la sección visible
     */
    setupActiveLinks() {
        this.updateActiveLink();
    }
    
    /**
     * Actualiza el link activo según la sección visible
     */
    updateActiveLink() {
        const sections = $$('section[id]');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    /**
     * Configura scroll suave para todos los links internos
     */
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = $(`#${targetId}`);
                    
                    if (targetSection) {
                        const headerHeight = this.header.offsetHeight;
                        smoothScrollTo(targetSection, headerHeight + 20);
                        
                        // Actualizar URL
                        history.pushState(null, null, href);
                        
                        // Focus en la sección para accesibilidad
                        targetSection.setAttribute('tabindex', '-1');
                        targetSection.focus({ preventScroll: true });
                    }
                });
            }
        });
    }
    
    /**
     * Trap focus dentro de un elemento (para accesibilidad)
     */
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
        
        firstFocusable.focus();
    }
    
    /**
     * Maneja el resize de la ventana
     */
    handleResize() {
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= 1024) {
                this.closeMobileMenu();
            }
        }, 250));
    }
    
    /**
     * Destruye la instancia
     */
    destroy() {
        // Remover event listeners si es necesario
        this.closeMobileMenu();
    }
}

// Inicializar cuando el DOM esté listo
const initNavigation = () => {
    return new Navigation();
};

export default initNavigation;
