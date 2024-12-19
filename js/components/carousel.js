const portfolioItems = [
    {
        background: 'assets/images/Recurso10.webp',
        color: '#9B61A4'
    },
    {
        background: '../assets/images/Recurso3.webp',
        color: '#04C7AA'
    },
    {
        background: '../assets/images/Recurso7.webp',
        color: '#152636'
    }
];

let currentSlide = 0;
const slidesContainer = document.getElementById('carousel-slides');
const slides = document.querySelectorAll('#carousel-slides > div');
const totalSlides = slides.length;
const backgroundElement = document.getElementById('portfolio-background');

// Variables para el control de deslizamiento
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    const currentItem = portfolioItems[currentSlide];
    backgroundElement.style.backgroundImage = `url(${currentItem.background})`;
    
    document.querySelectorAll('[data-slide]').forEach((indicator, index) => {
        indicator.style.backgroundColor = index === currentSlide ? '#9B61A4' : '#BEC3C7';
    });
}

function initializeCarousel() {
    // Configuración de eventos táctiles y mouse
    slides.forEach((slide, index) => {
        // Touch events
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);
        
        // Mouse events
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
    });

    // Prevenir el comportamiento predeterminado del arrastre de imágenes
    window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    // Botones de navegación
    document.getElementById('prev-button').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    document.getElementById('next-button').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    // Indicadores
    document.querySelectorAll('[data-slide]').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    updateCarousel();
}

// Funciones para el control táctil y mouse
function touchStart(index) {
    return function(event) {
        isDragging = true;
        currentIndex = index;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        slidesContainer.style.cursor = 'grabbing';
    };
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slidesContainer.style.cursor = 'grab';

    const movedBy = currentTranslate - prevTranslate;
    
    // Determinar si el movimiento fue suficiente para cambiar de slide
    if (movedBy < -100 && currentSlide < totalSlides - 1) {
        currentSlide += 1;
    }
    if (movedBy > 100 && currentSlide > 0) {
        currentSlide -= 1;
    }

    updateCarousel();
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}
