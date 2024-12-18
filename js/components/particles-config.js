// Configuración de Particles.js
const particlesConfig = {
    particles: {
        number: { 
            value: 80, // Reducido para que no sea muy denso 
            density: { 
                enable: true, 
                value_area: 800 
            } 
        },
        color: { 
            value: '#9B61A4' 
        },
        shape: { 
            type: 'circle' 
        },
        opacity: { 
            value: 0.5, // Reducida la opacidad 
            random: false 
        },
        size: { 
            value: 3, 
            random: true 
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#9B61A4',
            opacity: 0.4, // Reducida la opacidad de las líneas
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { 
                enable: true, 
                mode: 'repulse' 
            },
            onclick: { 
                enable: true, 
                mode: 'push' 
            },
            resize: true
        },
    },
    retina_detect: true
};

// Función para inicializar Particles.js
function initializeParticles() {
    particlesJS('particles-js', particlesConfig);
}

