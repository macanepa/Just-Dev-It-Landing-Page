/**
 * Slider with Swiper.js - ULTRA OPTIMIZADO PARA MOBILE
 * Usando Swiper.js con configuración optimizada y manejo eficiente de imágenes de fondo
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
    speed: isMobile ? 250 : 400, // Más rápido en mobile
    preloadImages: false, // No precargar todas las imágenes
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    // CRÍTICO: Optimización de touch para mobile
    touchStartPreventDefault: false,
    touchMoveStopPropagation: false,
    resistance: true,
    resistanceRatio: 0.85,
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
      slideChangeTransitionStart: function() {
        // Usar transitionStart para mejor performance
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
      slideChangeTransitionStart: function() {
        // Usar transitionStart para mejor performance
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

// ===== FUNCIONES DE ANIMACIÓN ULTRA OPTIMIZADAS =====

// Cache mejorado para mejor gestión de memoria
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
    backgroundImages = Array.from(backgroundContainer.querySelectorAll('.slider-bg-image'));
    backgroundCache.set(sliderType, backgroundImages);
  }
  
  // OPTIMIZACIÓN: Solo actualizar si hay cambio
  const currentActive = backgroundImages.find(bg => bg.classList.contains('active'));
  const newActive = backgroundImages.find(bg => bg.getAttribute('src') === imageSrc);
  
  if (currentActive === newActive) return;
  
  // Actualizar backgrounds con transición más rápida
  if (currentActive) currentActive.classList.remove('active');
  if (newActive) newActive.classList.add('active');
}

// Actualizar estados de las cards (ultra optimizado)
function updateCardStates(swiper) {
  // OPTIMIZACIÓN: Solo actualizar si cambió la slide activa
  const newActiveIndex = swiper.activeIndex;
  const prevActiveSlide = swiper.slides.find(slide => slide.classList.contains('active'));
  const newActiveSlide = swiper.slides[newActiveIndex];
  
  if (prevActiveSlide === newActiveSlide) return;
  
  // Batch DOM updates
  if (prevActiveSlide) prevActiveSlide.classList.remove('active');
  if (newActiveSlide) newActiveSlide.classList.add('active');
}



// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSliders);
} else {
  initSliders();
}
