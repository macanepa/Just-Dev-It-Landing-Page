/**
 * Slider with Swiper.js - OPTIMIZADO PARA PERFORMANCE
 * Usando Swiper.js con configuración optimizada para mobile
 */

// Esperar a que Swiper esté disponible y el DOM esté listo
function initSliders() {
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library not loaded');
    return;
  }

  // Detección de dispositivo
  const isMobile = window.innerWidth < 768;
  
  // Configuración base optimizada
  const baseConfig = {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    speed: isMobile ? 300 : 400, // Más rápido en mobile
    preloadImages: false, // No precargar todas las imágenes
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      480: { slidesPerView: 1.3, spaceBetween: 16 },
      576: { slidesPerView: 1.4, spaceBetween: 20 },
      768: { slidesPerView: 1.5, spaceBetween: 24 },
      992: { slidesPerView: 2, spaceBetween: 32 },
      1200: { slidesPerView: 2.2, spaceBetween: 32 },
      1400: { slidesPerView: 2.5, spaceBetween: 40 },
    }
  };

  // ===== SERVICIOS SLIDER =====
  const servicesSlider = new Swiper('#services-slider', {
    ...baseConfig,
    navigation: {
      nextEl: '#services-next',
      prevEl: '#services-prev',
    },
    pagination: {
      el: '#services-dots',
      clickable: true,
      dynamicBullets: false,
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
    ...baseConfig,
    navigation: {
      nextEl: '#portfolio-next',
      prevEl: '#portfolio-prev',
    },
    pagination: {
      el: '#portfolio-dots',
      clickable: true,
      dynamicBullets: false,
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

  console.log('Sliders initialized with Swiper.js (optimized)');
}

// ===== FUNCIONES DE ANIMACIÓN OPTIMIZADAS =====

// Actualizar imagen de fondo según slide activo (con cache)
const backgroundCache = new Map();

function updateBackground(swiper, sliderType) {
  const section = document.getElementById(sliderType === 'services' ? 'servicios' : 'portafolio');
  if (!section) return;
  
  const backgroundContainer = section.querySelector('.slider-background');
  if (!backgroundContainer) return;
  
  const activeSlide = swiper.slides[swiper.activeIndex];
  const cardImage = activeSlide?.querySelector('.slider-card-image');
  
  if (!cardImage) return;
  
  const imageSrc = cardImage.getAttribute('src');
  
  // Usar cache para evitar búsquedas repetidas del DOM
  let backgroundImages = backgroundCache.get(sliderType);
  if (!backgroundImages) {
    backgroundImages = backgroundContainer.querySelectorAll('.slider-bg-image');
    backgroundCache.set(sliderType, backgroundImages);
  }
  
  // Actualizar backgrounds con requestAnimationFrame para mejor performance
  requestAnimationFrame(() => {
    backgroundImages.forEach(bg => {
      bg.classList.toggle('active', bg.getAttribute('src') === imageSrc);
    });
  });
}

// Actualizar estados de las cards (optimizado)
function updateCardStates(swiper) {
  requestAnimationFrame(() => {
    // Remover active de todas las slides (batch operation)
    swiper.slides.forEach(slide => slide.classList.remove('active'));
    
    // Agregar active solo a la slide centrada actual
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      activeSlide.classList.add('active');
    }
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSliders);
} else {
  initSliders();
}
