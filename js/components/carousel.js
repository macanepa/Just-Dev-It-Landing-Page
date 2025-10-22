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
const carouselContainer = document.getElementById('carousel-container');
const slides = document.querySelectorAll('#carousel-slides > div');
const totalSlides = slides.length;
const backgroundElement = document.getElementById('portfolio-background');

// Variables para el control de deslizamiento
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let startTime = 0;
let velocityX = 0;

// Threshold para considerar un swipe
const SWIPE_THRESHOLD = 50; // píxeles mínimos para considerar swipe
const VELOCITY_THRESHOLD = 0.5; // velocidad mínima para swipe

function updateCarousel(smooth = true) {
    // Aplicar transición suave solo cuando no se está arrastrando
    if (smooth) {
        slidesContainer.style.transition = 'transform 0.5s ease-out';
    } else {
        slidesContainer.style.transition = 'none';
    }
    
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const currentItem = portfolioItems[currentSlide];
    backgroundElement.style.backgroundImage = `url(${currentItem.background})`;
    
    // Actualizar indicadores
    document.querySelectorAll('[data-slide]').forEach((indicator, index) => {
        indicator.style.backgroundColor = index === currentSlide ? '#9B61A4' : '#BEC3C7';
    });
}

function initializeCarousel() {
    // Hacer el contenedor del carrusel draggable
    carouselContainer.addEventListener('touchstart', touchStart, { passive: false });
    carouselContainer.addEventListener('touchend', touchEnd, { passive: false });
    carouselContainer.addEventListener('touchmove', touchMove, { passive: false });
    
    // Mouse events para desktop
    carouselContainer.addEventListener('mousedown', touchStart);
    carouselContainer.addEventListener('mouseup', touchEnd);
    carouselContainer.addEventListener('mouseleave', touchEnd);
    carouselContainer.addEventListener('mousemove', touchMove);

    // Prevenir comportamiento predeterminado en imágenes
    slides.forEach(slide => {
        const images = slide.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
    });

    // Botones de navegación
    document.getElementById('prev-button').addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(true);
    });

    document.getElementById('next-button').addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(true);
    });

    // Indicadores
    document.querySelectorAll('[data-slide]').forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide = index;
            updateCarousel(true);
        });
    });

    // Soporte para teclado (accesibilidad)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel(true);
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel(true);
        }
    });

    updateCarousel(true);
}

// Funciones para el control táctil y mouse
function touchStart(event) {
    // Prevenir scroll en móviles durante el drag
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    
    isDragging = true;
    startPos = getPositionX(event);
    startTime = Date.now();
    velocityX = 0;
    
    // Guardar la posición actual traducida
    prevTranslate = -currentSlide * carouselContainer.offsetWidth;
    currentTranslate = prevTranslate;
    
    animationID = requestAnimationFrame(animation);
    slidesContainer.style.cursor = 'grabbing';
    slidesContainer.classList.add('dragging');
}

function touchEnd(event) {
    if (!isDragging) return;
    
    isDragging = false;
    cancelAnimationFrame(animationID);
    slidesContainer.style.cursor = 'grab';
    slidesContainer.classList.remove('dragging');

    // Calcular velocidad del swipe
    const endTime = Date.now();
    const timeDiff = endTime - startTime;
    const endPos = getPositionX(event.type === 'touchend' ? event.changedTouches[0] : event);
    const distance = endPos - startPos;
    velocityX = Math.abs(distance / timeDiff);

    // Determinar si cambiar de slide basado en distancia o velocidad
    const slideWidth = carouselContainer.offsetWidth;
    const movedBy = currentTranslate - prevTranslate;
    const threshold = slideWidth * 0.2; // 20% del ancho del slide

    // Cambiar slide si se movió más del threshold o si hay velocidad suficiente
    if (movedBy < -threshold || (movedBy < 0 && velocityX > VELOCITY_THRESHOLD)) {
        // Swipe a la izquierda - siguiente slide
        if (currentSlide < totalSlides - 1) {
            currentSlide += 1;
        }
    } else if (movedBy > threshold || (movedBy > 0 && velocityX > VELOCITY_THRESHOLD)) {
        // Swipe a la derecha - slide anterior
        if (currentSlide > 0) {
            currentSlide -= 1;
        }
    }

    // Resetear translate
    currentTranslate = 0;
    prevTranslate = 0;
    
    updateCarousel(true);
}

function touchMove(event) {
    if (!isDragging) return;
    
    // Prevenir scroll en móviles durante el drag
    if (event.type === 'touchmove') {
        event.preventDefault();
    }
    
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    
    // Calcular el nuevo translate
    currentTranslate = prevTranslate + diff;
    
    // Limitar el arrastre en los extremos
    const maxTranslate = 0;
    const minTranslate = -(totalSlides - 1) * carouselContainer.offsetWidth;
    
    // Aplicar resistencia en los extremos
    if (currentTranslate > maxTranslate) {
        currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.3;
    } else if (currentTranslate < minTranslate) {
        currentTranslate = minTranslate + (currentTranslate - minTranslate) * 0.3;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    if (isDragging) {
        slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(animation);
    }
}

// Reinicializar en cambio de tamaño de ventana
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateCarousel(false);
    }, 250);
});
