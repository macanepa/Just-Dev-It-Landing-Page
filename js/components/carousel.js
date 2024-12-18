// Configuración del carrusel
const portfolioItems = [
    {
        background: '../assets/images/Aquaevo.png',
        color: '#9B61A4'
    },
    {
        background: '../assets/images/Databam.png',
        color: '#04C7AA'
    },
    {
        background: '../assets/images/Self.png',
        color: '#152636'
    }
];

// Variables globales del carrusel
let currentSlide = 0;
const slidesContainer = document.getElementById('carousel-slides');
const slides = document.querySelectorAll('#carousel-slides > div');
const totalSlides = slides.length;
const backgroundElement = document.getElementById('portfolio-background');

// Función para actualizar el carrusel
function updateCarousel() {
    // Mover slides
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar fondo
    const currentItem = portfolioItems[currentSlide];
    backgroundElement.style.backgroundImage = `url(${currentItem.background})`;
    
    // Actualizar indicadores
    document.querySelectorAll('[data-slide]').forEach((indicator, index) => {
        indicator.style.backgroundColor = index === currentSlide ? '#9B61A4' : '#BEC3C7';
    });
}

// Función para inicializar el carrusel
function initializeCarousel() {
    // Event listeners para los controles
    document.getElementById('prev-button').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    document.getElementById('next-button').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    // Event listeners para los indicadores
    document.querySelectorAll('[data-slide]').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Configuración del autoplay
    let autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    // Detener autoplay al hover
    const carouselContainer = document.getElementById('carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });

    // Inicializar el carrusel
    updateCarousel();
}
