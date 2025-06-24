// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que todos los elementos necesarios estén presentes
    const checkRequiredElements = () => {
        const requiredElements = {
            particlesContainer: document.getElementById('particles-js'),
            threeDContainer: document.getElementById('3d-container'),
            carouselContainer: document.getElementById('carousel-container'),
            contactForm: document.getElementById('contact-form')
        };

        for (const [name, element] of Object.entries(requiredElements)) {
            if (!element) {
                console.warn(`Elemento requerido no encontrado: ${name}`);
            }
        }

        return Object.values(requiredElements).every(element => element);
    };

    // Inicializar todos los componentes si los elementos requeridos están presentes
    if (checkRequiredElements()) {
        try {
            // Inicializar efectos visuales
            initializeParticles(); // desde particles-config.js
            init3DObject();        // desde three-config.js

            // Inicializar carrusel
            initializeCarousel();  // desde carousel.js

            // Inicializar animaciones
            siteAnimations.initializeCardAnimations(); // desde animations.js

            // Inicializar formulario
            handleSubmit(); // desde animations.js

            console.log('Todos los componentes inicializados correctamente');
        } catch (error) {
            console.error('Error al inicializar componentes:', error);
        }
    }

    // Gestión de la navegación suave
    const handleSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Gestión del scroll para efectos de aparición
    const handleScrollEffects = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observar secciones principales
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    };

    // Gestión del estado de carga
    const handleLoadingState = () => {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    };

    // Inicializar funcionalidades generales
    handleSmoothScroll();
    handleScrollEffects();
    handleLoadingState();
});

// Gestión de errores global
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo, '\nColumn: ', columnNo, '\nError object: ', error);
    return false;
};

// <!-- Script para asegurar que vuelva al inicio -->
// Función para manejar el scroll al inicio
const initLogoClickHandler = () => {
    const logo = document.querySelector('nav a:first-child');
    if (logo) {
        logo.addEventListener('click', (e) => {
            // Si estamos en index.html, prevenimos la navegación por defecto
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
};

// Agregar a las funciones de inicialización
document.addEventListener('DOMContentLoaded', () => {
    initLogoClickHandler();
    // Otras inicializaciones que ya tengas...
});