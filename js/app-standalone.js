/**
 * Main Application - Just Dev It (Standalone Version)
 * Versión optimizada para máximo rendimiento en mobile
 */

(function() {
    'use strict';
    
    console.log('🚀 Inicializando Just Dev It...');
    
    // ==========================================
    // DETECCIÓN DE DISPOSITIVO Y CAPACIDADES
    // ==========================================
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // ==========================================
    // OPTIMIZACIÓN: Detección de pestaña activa
    // ==========================================
    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
        if (!isTabActive) {
            console.log('⏸️ Pausando animaciones (pestaña inactiva)');
        } else {
            console.log('▶️ Reanudando animaciones');
        }
    });
    
    // ==========================================
    // UTILIDADES: Debounce y Throttle
    // ==========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Ignorar links vacíos o solo #
                if (href === '#' || !href) return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Cerrar menu móvil si está abierto
                    const navMenu = document.querySelector('.nav-menu');
                    const navToggle = document.querySelector('.nav-toggle');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle?.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        console.log('✅ Smooth scroll inicializado');
    }
    
    // ==========================================
    // NAVEGACIÓN MÓVIL
    // ==========================================
    function initMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        console.log('🔍 Elementos encontrados:', { navToggle, navMenu });
        
        if (navToggle && navMenu) {
            // Toggle del menú con el botón hamburguesa
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                console.log('🍔 Menu toggled:', { isActive, classes: navMenu.className });
                
                // Actualizar aria-expanded para accesibilidad
                navToggle.setAttribute('aria-expanded', isActive);
                
                // Prevenir scroll cuando el menu está abierto
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Cerrar menú al hacer click en el overlay (::before)
            navMenu.addEventListener('click', (e) => {
                if (e.target === navMenu) {
                    console.log('🔒 Cerrando menu por click en overlay');
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
            
            console.log('✅ Navegación móvil inicializada');
        } else {
            console.error('❌ No se encontraron elementos de navegación');
        }
    }
    
    // ==========================================
    // STICKY HEADER (OPTIMIZADO CON THROTTLE)
    // ==========================================
    function initStickyHeader() {
        const header = document.querySelector('.site-header');
        
        if (header) {
            let lastScroll = 0;
            let ticking = false;
            
            const updateHeader = () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            };
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            }, { passive: true });
            
            console.log('✅ Sticky header inicializado');
        }
    }
    
    // ==========================================
    // ACTIVE SECTION DETECTION (OPTIMIZADO)
    // ==========================================
    function initActiveSection() {
        if (!supportsIntersectionObserver) return;
        
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        let currentActive = null;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    if (currentActive !== id) {
                        currentActive = id;
                        
                        // Usar requestAnimationFrame para batch updates
                        requestAnimationFrame(() => {
                            navLinks.forEach(link => {
                                const href = link.getAttribute('href');
                                link.classList.toggle('active', href === `#${id}`);
                            });
                        });
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
        console.log('✅ Active section detection inicializado');
    }
    
    // ==========================================
    // ANIMACIONES AL SCROLL (OPTIMIZADO)
    // ==========================================
    function initScrollAnimations() {
        if (!supportsIntersectionObserver || prefersReducedMotion) {
            // Mostrar todos los elementos si no hay soporte o se prefiere reducir movimiento
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }
        
        const observerOptions = {
            threshold: isMobile ? 0.05 : 0.1,
            rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                    });
                    // Dejar de observar después de animar para mejor performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        console.log('✅ Animaciones al scroll inicializadas');
    }
    
    // ==========================================
    // LAZY LOADING DE IMÁGENES (OPTIMIZADO)
    // ==========================================
    function initLazyLoading() {
        if (!supportsIntersectionObserver) {
            // Fallback: cargar todas las imágenes
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
            return;
        }
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        // Precargar imagen antes de asignarla
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            requestAnimationFrame(() => {
                                img.src = src;
                                img.removeAttribute('data-src');
                                img.classList.add('loaded');
                            });
                        };
                        tempImg.src = src;
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: isMobile ? '50px' : '100px' // Cargar antes en desktop
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log('✅ Lazy loading inicializado');
    }
    
    // ==========================================
    // VALIDACIÓN DE FORMULARIO
    // ==========================================
    function initFormValidation() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Validación básica
                const name = form.querySelector('#name');
                const email = form.querySelector('#email');
                const message = form.querySelector('#message');
                
                let isValid = true;
                
                // Validar nombre
                if (name && name.value.trim().length < 2) {
                    showError(name, 'El nombre debe tener al menos 2 caracteres');
                    isValid = false;
                } else if (name) {
                    clearError(name);
                }
                
                // Validar email
                if (email && !isValidEmail(email.value)) {
                    showError(email, 'Por favor ingresa un email válido');
                    isValid = false;
                } else if (email) {
                    clearError(email);
                }
                
                // Validar mensaje
                if (message && message.value.trim().length < 10) {
                    showError(message, 'El mensaje debe tener al menos 10 caracteres');
                    isValid = false;
                } else if (message) {
                    clearError(message);
                }
                
                if (isValid) {
                    // Enviar formulario
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Enviando...';
                    submitBtn.disabled = true;
                    
                    try {
                        const formData = new FormData(form);
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            showSuccessMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                            form.reset();
                        } else {
                            showErrorMessage('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
                        }
                    } catch (error) {
                        showErrorMessage('Error de conexión. Por favor verifica tu internet.');
                    } finally {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                }
            });
            
            console.log('✅ Validación de formulario inicializada');
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        let errorDiv = formGroup.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            formGroup.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorDiv = formGroup.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function showSuccessMessage(message) {
        showToast(message, 'success');
    }
    
    function showErrorMessage(message) {
        showToast(message, 'error');
    }
    
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#04C7AA' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
    
    // ==========================================
    // PORTFOLIO FILTER
    // ==========================================
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const portfolioItems = document.querySelectorAll('[data-category]');
        
        if (filterButtons.length === 0 || portfolioItems.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Actualizar botón activo
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                
                // Filtrar items
                portfolioItems.forEach((item, index) => {
                    const categories = item.getAttribute('data-category').split(',').map(c => c.trim());
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    
                    if (shouldShow) {
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        console.log('✅ Portfolio filter inicializado');
    }
    
    // ==========================================
    // HERO 3D CANVAS ANIMATION (ULTRA OPTIMIZADO)
    // ==========================================
    function initHeroAnimation() {
        // No inicializar en mobile para mejor performance
        if (isMobile || prefersReducedMotion) {
            console.log('⚡ Hero animation desactivada en mobile/reduced motion');
            return;
        }
        
        const canvas = document.createElement('canvas');
        const container = document.getElementById('hero-3d-container');
        
        if (!container) return;
        
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        
        // Configuración ultra optimizada
        const particles = [];
        const particleCount = 20; // Reducido aún más para mejor performance
        const connectionDistance = 120; // Reducido para menos cálculos
        let mouse = { x: 0, y: 0 };
        let isAnimating = false;
        let animationId = null;
        
        // Resize canvas con debounce
        const resize = debounce(() => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }, 250);
        
        resize();
        window.addEventListener('resize', resize, { passive: true });
        
        // Crear partículas
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                
                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    this.x -= dx * 0.03;
                    this.y -= dy * 0.03;
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(155, 97, 164, 0.6)';
                ctx.fill();
            }
        }
        
        // Inicializar partículas
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Tracking del mouse con throttle
        const handleMouseMove = throttle((e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            
            if (!isAnimating) {
                isAnimating = true;
                animate();
            }
        }, 50);
        
        container.addEventListener('mousemove', handleMouseMove, { passive: true });
        
        // Pausar cuando el mouse sale
        container.addEventListener('mouseleave', () => {
            mouse.x = 0;
            mouse.y = 0;
        }, { passive: true });
        
        // Animate con optimizaciones agresivas
        function animate() {
            if (!isTabActive || !isAnimating) {
                isAnimating = false;
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update y draw partículas
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Conectar partículas cercanas (optimizado)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    
                    // Early exit si están muy lejos
                    if (Math.abs(dx) > connectionDistance || Math.abs(dy) > connectionDistance) continue;
                    
                    const distSq = dx * dx + dy * dy; // Evitar sqrt cuando sea posible
                    const connectionDistSq = connectionDistance * connectionDistance;
                    
                    if (distSq < connectionDistSq) {
                        const dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(155, 97, 164, ${(1 - dist / connectionDistance) * 0.5})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Iniciar animación
        isAnimating = true;
        animate();
        
        console.log('✅ Hero 3D animation inicializada (optimizada)');
    }
    
    // ==========================================
    // INICIALIZACIÓN PRINCIPAL
    // ==========================================
    function init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                startApp();
            });
        } else {
            startApp();
        }
    }
    
    function startApp() {
        console.log('📦 Iniciando componentes...');
        
        try {
            initSmoothScroll();
            initMobileNav();
            initStickyHeader();
            initActiveSection();
            initScrollAnimations();
            initLazyLoading();
            initFormValidation();
            initPortfolioFilter();
            initHeroAnimation();
            
            console.log('✅ Just Dev It cargado exitosamente!');
        } catch (error) {
            console.error('❌ Error inicializando:', error);
        }
    }
    
    // Iniciar la aplicación
    init();
    
})();
