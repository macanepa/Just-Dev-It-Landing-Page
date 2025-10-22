document.addEventListener('DOMContentLoaded', () => {
  // 1) Tu array ahora con 7 items:
  const portfolioItems = [
    { background: '../assets/images/Proyecto1.png', color: '#9B61A4' },
    { background: '../assets/images/Databam.png',      color: '#04C7AA' },
    { background: '../assets/images/Proyecto3.png',     color: '#9B61A4' },
    { background: '../assets/images/Proyecto4.png',     color: '#04C7AA' },
    { background: '../assets/images/Proyecto5.png',     color: '#9B61A4' },
    { background: '../assets/images/Proyecto6.png',     color: '#04C7AA' },
    { background: '../assets/images/Proyecto7.png',     color: '#9B61A4' }
  ];

  const slidesContainer = document.getElementById('carousel-slides');
  const backgroundEl   = document.getElementById('portfolio-background');
  const prevBtn        = document.getElementById('prev-button');
  const nextBtn        = document.getElementById('next-button');
  const indicatorsWrap = document.getElementById('indicators-container');

  // 2) Clonar primer y último slide para loop infinito
  const slides   = Array.from(slidesContainer.children);
  const first    = slides[0].cloneNode(true);
  const last     = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(first);
  slidesContainer.insertBefore(last, slidesContainer.firstChild);

  // 3) Nueva colección y estado inicial
  const allSlides   = Array.from(slidesContainer.children);
  const realCount   = portfolioItems.length;
  let   currentIdx  = 1;  // empieza en la “primera” slide real

  // Ajusta tamaño y posición inicial
  slidesContainer.style.transform = `translateX(-${100 * currentIdx}%)`;

  // Crear indicadores basados en realCount
  function createIndicators() {
    indicatorsWrap.innerHTML = '';
    for (let i = 0; i < realCount; i++) {
      const btn = document.createElement('button');
      btn.className = 'w-3 h-3 rounded-full transition-colors';
      btn.dataset.slide = i;
      btn.style.backgroundColor = i === 0 ? '#9B61A4' : '#BEC3C7';
      btn.addEventListener('click', () => goToSlide(i + 1));
      indicatorsWrap.appendChild(btn);
    }
  }

<<<<<<< HEAD
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
=======
  function updateIndicators() {
    const dots = indicatorsWrap.querySelectorAll('button');
    dots.forEach((dot, i) => {
      dot.style.backgroundColor = (i + 1) === currentIdx ? '#9B61A4' : '#BEC3C7';
>>>>>>> b91eeb22a89b4086043d5f44e45e8cac4d7bd3bb
    });
  }

<<<<<<< HEAD
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
=======
  function updateBackground() {
    const item = portfolioItems[(currentIdx - 1 + realCount) % realCount];
    backgroundEl.style.backgroundImage = `url(${item.background})`;
    backgroundEl.style.backgroundColor  = item.color;
  }

  function goToSlide(targetIdx) {
    currentIdx = targetIdx;
    slidesContainer.style.transition = 'transform 0.5s ease-out';
    slidesContainer.style.transform  = `translateX(-${100 * currentIdx}%)`;
  }

  // Botones Next / Prev
  nextBtn.addEventListener('click', () => goToSlide(currentIdx + 1));
  prevBtn.addEventListener('click', () => goToSlide(currentIdx - 1));

  // Al terminar cada transición chequeamos si estamos en un clon
  slidesContainer.addEventListener('transitionend', () => {
    // Si pasaste al clon final (índice realCount+1), resetea a 1
    if (currentIdx === realCount + 1) {
      slidesContainer.style.transition = 'none';
      currentIdx = 1;
      slidesContainer.style.transform = `translateX(-${100 * currentIdx}%)`;
    }
    // Si fuiste al clon inicial (índice 0), resetea a realCount
    if (currentIdx === 0) {
      slidesContainer.style.transition = 'none';
      currentIdx = realCount;
      slidesContainer.style.transform = `translateX(-${100 * currentIdx}%)`;
    }

    updateIndicators();
    updateBackground();
  });

  // Iniciar todo
  createIndicators();
  updateBackground();
>>>>>>> b91eeb22a89b4086043d5f44e45e8cac4d7bd3bb
});
