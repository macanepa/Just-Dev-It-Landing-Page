/**
 * Animations System - Just Dev It
 * Sistema de animaciones único y personalizado con Intersection Observer
 */

import { $$, observeElements, requestFrame, debounce } from '../core/utils.js';

class AnimationsSystem {
    constructor() {
        this.animatedElements = [];
        this.scrollProgress = 0;
        this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }
    
    init() {
        if (this.isReduced) {
            console.log('Animations reduced due to user preference');
            return;
        }
        
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupCardAnimations();
        this.setupProgressBar();
        this.setupCounters();
        this.setupMorphing();
    }
    
    /**
     * Configura animaciones al hacer scroll
     */
    setupScrollAnimations() {
        // Fade in desde abajo
        observeElements('.fade-in', (element) => {
            element.classList.add('is-visible');
        }, { threshold: 0.15 });
        
        // Fade in desde la izquierda
        observeElements('.fade-in-left', (element) => {
            element.classList.add('is-visible');
        }, { threshold: 0.15 });
        
        // Fade in desde la derecha
        observeElements('.fade-in-right', (element) => {
            element.classList.add('is-visible');
        }, { threshold: 0.15 });
        
        // Scale in
        observeElements('.scale-in', (element) => {
            element.classList.add('is-visible');
        }, { threshold: 0.15 });
        
        // Stagger animations para grupos de elementos
        this.setupStaggerAnimations();
    }
    
    /**
     * Configura animaciones stagger (secuenciales)
     */
    setupStaggerAnimations() {
        const staggerGroups = $$('[data-stagger]');
        
        staggerGroups.forEach(group => {
            const children = group.children;
            const delay = parseInt(group.dataset.staggerDelay) || 100;
            
            observeElements(group, () => {
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('is-visible');
                    }, index * delay);
                });
            }, { threshold: 0.1 });
        });
    }
    
    /**
     * Configura efecto parallax suave
     */
    setupParallax() {
        const parallaxElements = $$('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollTop;
                const elementHeight = rect.height;
                
                // Solo animar si está en viewport
                if (scrollTop + window.innerHeight > elementTop &&
                    scrollTop < elementTop + elementHeight) {
                    
                    const yPos = (scrollTop - elementTop) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        };
        
        window.addEventListener('scroll', debounce(handleScroll, 10));
    }
    
    /**
     * Animaciones para cards con efectos únicos
     */
    setupCardAnimations() {
        const cards = $$('.card');
        
        cards.forEach(card => {
            // Efecto de mouse tracking
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
            
            // Efecto de brillo siguiendo el mouse
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
    
    /**
     * Barra de progreso de lectura
     */
    setupProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);
        
        const updateProgress = () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight);
            
            progressBar.style.transform = `scaleX(${scrolled})`;
            this.scrollProgress = scrolled;
        };
        
        window.addEventListener('scroll', debounce(updateProgress, 10));
        updateProgress();
    }
    
    /**
     * Contador animado para números
     */
    setupCounters() {
        const counters = $$('[data-count]');
        
        counters.forEach(counter => {
            observeElements(counter, () => {
                const target = parseInt(counter.dataset.count);
                const duration = parseInt(counter.dataset.duration) || 2000;
                const start = 0;
                const startTime = performance.now();
                
                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (easeOutExpo)
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    
                    const current = Math.floor(start + (target - start) * easeProgress);
                    counter.textContent = current.toLocaleString('es-CL');
                    
                    if (progress < 1) {
                        requestFrame(animate);
                    } else {
                        counter.textContent = target.toLocaleString('es-CL');
                    }
                };
                
                requestFrame(animate);
            }, { threshold: 0.5 });
        });
    }
    
    /**
     * Efecto morphing para fondos
     */
    setupMorphing() {
        const morphElements = $$('[data-morph]');
        
        morphElements.forEach(element => {
            let frame = 0;
            
            const animate = () => {
                frame++;
                const progress = (Math.sin(frame * 0.01) + 1) / 2;
                
                const scale = 1 + progress * 0.1;
                const rotate = progress * 10;
                
                element.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
                
                requestFrame(animate);
            };
            
            observeElements(element, () => {
                animate();
            }, { threshold: 0.1 });
        });
    }
    
    /**
     * Animación de texto por letras (opcional)
     */
    animateText(element, delay = 50) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        const letters = text.split('');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.opacity = '0';
                span.style.animation = 'fadeIn 0.3s ease-out forwards';
                element.appendChild(span);
            }, index * delay);
        });
    }
    
    /**
     * Scroll reveal personalizado para secciones
     */
    revealSection(section, options = {}) {
        const defaultOptions = {
            delay: 0,
            distance: '50px',
            origin: 'bottom',
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            ...options
        };
        
        section.style.opacity = '0';
        section.style.transform = `translateY(${defaultOptions.distance})`;
        section.style.transition = `
            opacity ${defaultOptions.duration}ms ${defaultOptions.easing} ${defaultOptions.delay}ms,
            transform ${defaultOptions.duration}ms ${defaultOptions.easing} ${defaultOptions.delay}ms
        `;
        
        observeElements(section, () => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, { threshold: 0.1 });
    }
    
    /**
     * Efecto de onda al hacer click
     */
    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * Agregar efecto ripple a botones
     */
    setupRippleEffect() {
        const buttons = $$('.btn, button');
        
        buttons.forEach(button => {
            button.addEventListener('click', this.createRipple);
        });
    }
    
    /**
     * Scroll to top button
     */
    setupScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Volver arriba');
        document.body.appendChild(scrollBtn);
        
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
        
        window.addEventListener('scroll', debounce(handleScroll, 100));
    }
}

// CSS adicional para ripple effect (agregar al CSS)
const rippleStyles = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inicializar cuando el DOM esté listo
const initAnimations = () => {
    return new AnimationsSystem();
};

export default initAnimations;
