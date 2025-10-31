/**
 * Slider with Swiper.js - IMPLEMENTACIÓN OFICIAL
 * Usando Swiper.js directamente para comportamiento 100% confiable
 */

// Esperar a que Swiper esté disponible y el DOM esté listo
function initSliders() {
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library not loaded');
    return;
  }

  // ===== SERVICIOS SLIDER =====
  const servicesSlider = new Swiper('#services-slider', {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,
    navigation: {
      nextEl: '#services-next',
      prevEl: '#services-prev',
    },
    pagination: {
      el: '#services-dots',
      clickable: true,
      dynamicBullets: false,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    speed: 400,
    breakpoints: {
      480: { slidesPerView: 1.3, spaceBetween: 16 },
      576: { slidesPerView: 1.4, spaceBetween: 20 },
      768: { slidesPerView: 1.5, spaceBetween: 24 },
      992: { slidesPerView: 2, spaceBetween: 32 },
      1200: { slidesPerView: 2.2, spaceBetween: 32 },
      1400: { slidesPerView: 2.5, spaceBetween: 40 },
    },
    on: {
      slideChangeTransitionEnd: function() {
        updateBackground(this, 'services');
        updateCardStates(this);
      },
      init: function() {
        updateBackground(this, 'services');
        updateCardStates(this);
      },
    },
  });

  // ===== PORTFOLIO SLIDER =====
  const portfolioSlider = new Swiper('#portfolio-slider', {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,
    navigation: {
      nextEl: '#portfolio-next',
      prevEl: '#portfolio-prev',
    },
    pagination: {
      el: '#portfolio-dots',
      clickable: true,
      dynamicBullets: false,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    speed: 400,
    breakpoints: {
      480: { slidesPerView: 1.3, spaceBetween: 16 },
      576: { slidesPerView: 1.4, spaceBetween: 20 },
      768: { slidesPerView: 1.5, spaceBetween: 24 },
      992: { slidesPerView: 2, spaceBetween: 32 },
      1200: { slidesPerView: 2.2, spaceBetween: 32 },
      1400: { slidesPerView: 2.5, spaceBetween: 40 },
    },
    on: {
      slideChangeTransitionEnd: function() {
        updateBackground(this, 'portfolio');
        updateCardStates(this);
      },
      init: function() {
        updateBackground(this, 'portfolio');
        updateCardStates(this);
      },
    },
  });

  console.log('Sliders initialized with Swiper.js');
}

// ===== FUNCIONES DE ANIMACIÓN =====
// Usando slideChangeTransitionEnd para evitar conflictos con la transición de Swiper

// Actualizar imagen de fondo según slide activo
function updateBackground(swiper, sliderType) {
  const section = document.getElementById(sliderType === 'services' ? 'servicios' : 'portafolio');
  if (!section) return;
  
  const backgroundContainer = section.querySelector('.slider-background');
  if (!backgroundContainer) return;
  
  const backgroundImages = backgroundContainer.querySelectorAll('.slider-bg-image');
  if (backgroundImages.length === 0) return;
  
  // Usar realIndex para obtener el índice real (sin duplicados del loop)
  const realIndex = swiper.realIndex;
  const activeSlide = swiper.slides[swiper.activeIndex];
  const cardImage = activeSlide?.querySelector('.slider-card-image');
  
  if (!cardImage) return;
  
  const imageSrc = cardImage.getAttribute('src');
  
  // Actualizar backgrounds con transición suave
  backgroundImages.forEach(bg => {
    if (bg.getAttribute('src') === imageSrc) {
      bg.classList.add('active');
    } else {
      bg.classList.remove('active');
    }
  });
}

// Actualizar estados de las cards (active class para animaciones CSS)
function updateCardStates(swiper) {
  // Remover active de todas las slides
  swiper.slides.forEach((slide) => {
    slide.classList.remove('active');
  });
  
  // Agregar active solo a la slide centrada actual
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (activeSlide) {
    activeSlide.classList.add('active');
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSliders);
} else {
  initSliders();
}
