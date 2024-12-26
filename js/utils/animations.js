// Utilidades de animación para toda la aplicación
const animations = {
    // Función para animar la aparición de elementos
    fadeIn: (element, duration = 300) => {
        if (!element) return;

        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-out`;
        element.style.display = 'block';

        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },

    // Función para animar la desaparición de elementos
    fadeOut: (element, duration = 300) => {
        if (!element) return;

        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease-out`;

        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    },

    // Función para animar scroll suave
    smoothScroll: (target, duration = 500) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    },

    // Añadir clase con animación
    addClassWithAnimation: (element, className) => {
        element.style.transition = 'all 0.3s ease';
        element.classList.add(className);
    },

    // Remover clase con animación
    removeClassWithAnimation: (element, className) => {
        element.style.transition = 'all 0.3s ease';
        element.classList.remove(className);
    },

    // Animación de hover para cards
    initializeCardAnimations: () => {
        const cards = document.querySelectorAll('.bg-slate-800\\/50');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                animations.addClassWithAnimation(card, 'transform');
                animations.addClassWithAnimation(card, '-translate-y-2');
            });

            card.addEventListener('mouseleave', () => {
                animations.removeClassWithAnimation(card, 'transform');
                animations.removeClassWithAnimation(card, '-translate-y-2');
            });
        });
    }
};

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    animations.initializeCardAnimations();

    // Implementar scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                animations.smoothScroll(target);
            }
        });
    });
});

// Exportar el objeto animations para uso en otros archivos
window.siteAnimations = animations;