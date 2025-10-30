/**
 * Slider with Cards - JavaScript
 * Maneja la funcionalidad de los sliders de servicios y portafolio
 */

class CardSlider {
  constructor(sliderId, options = {}) {
    this.slider = document.getElementById(sliderId);
    if (!this.slider) return;

    this.sliderId = sliderId;
    this.prevBtn = document.getElementById(`${sliderId.replace('-slider', '')}-prev`);
    this.nextBtn = document.getElementById(`${sliderId.replace('-slider', '')}-next`);
    this.dotsContainer = document.getElementById(`${sliderId.replace('-slider', '')}-dots`);
    
    // Get background container for syncing
    this.backgroundContainer = this.slider.closest('.slider-section').querySelector('.slider-background');
    this.backgroundImages = this.backgroundContainer ? Array.from(this.backgroundContainer.querySelectorAll('.slider-bg-image')) : [];
    
    this.cards = Array.from(this.slider.children);
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplayDelay = options.autoplayDelay || 5000;
    this.autoplay = options.autoplay !== false;
    
    this.init();
  }

  init() {
    if (!this.slider || this.cards.length === 0) return;

    // Create dots
    this.createDots();
    
    // Add event listeners
    this.setupEventListeners();
    
    // Start autoplay if enabled
    if (this.autoplay) {
      this.startAutoplay();
    }
    
    // Update on resize - con throttle para optimización
    this.handleResize = this.throttle(() => {
      this.updateSlider();
    }, 250);
    
    window.addEventListener('resize', this.handleResize, { passive: true });
    
    // Initial update
    this.updateSlider();
  }

  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    
    // Para carrusel cilíndrico infinito: 1 punto por cada tarjeta
    const totalDots = this.cards.length;
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updateSlider();
      });
      
      this.dotsContainer.appendChild(dot);
    }
  }

  setupEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoplay();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoplay();
      });
    }
    
    // Touch/swipe support - Mejorado para móviles
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    let startTime = 0;
    let hasMoved = false;
    let isScrolling = false;
    
    // Mouse events - Mejorado para permitir scroll de página
    this.slider.addEventListener('mousedown', (e) => {
      // Solo capturar si el click es en el área del slider
      isDragging = true;
      hasMoved = false;
      isScrolling = false;
      startX = e.pageX - this.slider.offsetLeft;
      scrollLeft = this.slider.scrollLeft;
      startTime = Date.now();
      this.slider.style.cursor = 'grabbing';
    });
    
    this.slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const x = e.pageX - this.slider.offsetLeft;
      const walk = (x - startX) * 2;
      if (Math.abs(walk) > 5) {
        hasMoved = true;
        isScrolling = true;
        e.preventDefault(); // Solo prevenir si hay movimiento real
      }
      this.slider.scrollLeft = scrollLeft - walk;
    });
    
    this.slider.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        this.slider.style.cursor = 'grab';
        if (hasMoved && isScrolling) {
          this.snapToCard();
          this.resetAutoplay();
        }
        hasMoved = false;
        isScrolling = false;
      }
    });
    
    this.slider.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        this.slider.style.cursor = 'grab';
        hasMoved = false;
        isScrolling = false;
      }
    });
    
    // Touch events for mobile - Mejorados para prevenir saltos
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchStartScrollLeft = 0;
    let isTouchMoving = false;
    let touchDirection = null;
    
    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      touchStartScrollLeft = this.slider.scrollLeft;
      hasMoved = false;
      isTouchMoving = false;
      touchDirection = null;
    }, { passive: true });
    
    this.slider.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const diffX = Math.abs(touchX - touchStartX);
      const diffY = Math.abs(touchY - touchStartY);
      
      // Determinar dirección de scroll solo en el primer movimiento significativo
      if (!touchDirection && (diffX > 5 || diffY > 5)) {
        touchDirection = diffX > diffY ? 'horizontal' : 'vertical';
      }
      
      // Solo considerar como movimiento horizontal si es claramente horizontal
      if (touchDirection === 'horizontal' && diffX > 10) {
        hasMoved = true;
        isTouchMoving = true;
      }
    }, { passive: true });
    
    this.slider.addEventListener('touchend', (e) => {
      // Solo hacer snap si hubo movimiento horizontal significativo
      if (hasMoved && isTouchMoving && touchDirection === 'horizontal') {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        const scrollDiff = Math.abs(this.slider.scrollLeft - touchStartScrollLeft);
        
        // Solo hacer snap si el scroll fue significativo (más de 30px)
        if (scrollDiff > 30) {
          setTimeout(() => {
            this.snapToCard();
            this.resetAutoplay();
          }, 50);
        } else {
          // Si el movimiento fue muy pequeño, volver a la posición original
          this.slider.scrollTo({
            left: touchStartScrollLeft,
            behavior: 'smooth'
          });
        }
      }
      hasMoved = false;
      isTouchMoving = false;
      touchDirection = null;
    }, { passive: true });
    
    // Pause autoplay on hover
    this.slider.addEventListener('mouseenter', () => {
      this.stopAutoplay();
    });
    
    this.slider.addEventListener('mouseleave', () => {
      if (this.autoplay) {
        this.startAutoplay();
      }
    });
    
    // Scroll sync with dots - con throttle para optimización
    let scrollTimeout;
    this.slider.addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        this.updateDotsFromScroll();
        scrollTimeout = null;
      }, 100);
    }, { passive: true });
    
    // Click on card to activate - Mejorado para evitar conflictos con touch
    this.cards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        // Evitar activar si está arrastrando o si hubo movimiento touch
        if (hasMoved || isTouchMoving) {
          hasMoved = false;
          isTouchMoving = false;
          return;
        }
        
        this.currentIndex = index;
        this.updateSlider();
        this.resetAutoplay();
      });
      
      // Make cards keyboard accessible
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Tarjeta ${index + 1}`);
      
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.currentIndex = index;
          this.updateSlider();
          this.resetAutoplay();
        }
      });
    });
  }

  updateSlider() {
    if (!this.cards || this.cards.length === 0) return;
    
    // Normalizar el índice para carrusel cilíndrico
    const normalizedIndex = ((this.currentIndex % this.cards.length) + this.cards.length) % this.cards.length;
    
    // Obtener la card actual
    const currentCard = this.cards[normalizedIndex];
    
    // Calcular posición para centrar la card
    const containerWidth = this.slider.offsetWidth;
    const cardWidth = currentCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(this.slider).gap) || 24;
    
    // Posición de la card en el contenedor
    const cardOffsetLeft = currentCard.offsetLeft;
    
    // Calcular scroll para centrar la card
    const scrollPosition = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
    
    this.slider.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
    
    this.updateDots();
    this.updateBackground();
  }
  
  updateBackground() {
    // Sync background image with current card
    if (this.cards.length === 0 || this.backgroundImages.length === 0) return;
    
    // Normalizar el índice para carrusel cilíndrico
    const normalizedIndex = ((this.currentIndex % this.cards.length) + this.cards.length) % this.cards.length;
    
    // Update active class on cards
    this.cards.forEach((card, index) => {
      if (index === normalizedIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
    
    // Get the image src from the current card
    const currentCardImage = this.cards[normalizedIndex].querySelector('.slider-card-image');
    if (!currentCardImage) return;
    
    const cardImageSrc = currentCardImage.getAttribute('src');
    
    // Find or create matching background image
    let matchingBgImage = this.backgroundImages.find(bg => bg.getAttribute('src') === cardImageSrc);
    
    if (!matchingBgImage && cardImageSrc) {
      // Create a new background image if it doesn't exist
      matchingBgImage = document.createElement('img');
      matchingBgImage.className = 'slider-bg-image';
      matchingBgImage.src = cardImageSrc;
      matchingBgImage.alt = '';
      this.backgroundContainer.appendChild(matchingBgImage);
      this.backgroundImages.push(matchingBgImage);
    }
    
    // Activate the matching background
    this.backgroundImages.forEach(bg => {
      if (bg === matchingBgImage) {
        bg.classList.add('active');
      } else {
        bg.classList.remove('active');
      }
    });
  }

  goToSlide(index) {
    const maxIndex = this.cards.length - 1;
    // Normalizar el índice dentro del rango válido
    if (index < 0) {
      this.currentIndex = maxIndex;
    } else if (index > maxIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }
    this.updateSlider();
  }

  nextSlide() {
    // Carrusel cilíndrico: si estamos en la última, ir a la primera
    if (this.currentIndex >= this.cards.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updateSlider();
  }

  prevSlide() {
    // Carrusel cilíndrico: si estamos en la primera, ir a la última
    if (this.currentIndex <= 0) {
      this.currentIndex = this.cards.length - 1;
    } else {
      this.currentIndex--;
    }
    this.updateSlider();
  }

  snapToCard() {
    if (!this.cards || this.cards.length === 0) return;
    
    // Encontrar la card más cercana al centro del viewport
    const containerRect = this.slider.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    this.cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    // Solo actualizar si el índice cambió
    if (closestIndex !== this.currentIndex) {
      this.currentIndex = closestIndex;
      this.updateSlider();
    }
  }

  updateDotsFromScroll() {
    if (!this.cards || this.cards.length === 0) return;
    
    // Encontrar la card más cercana al centro
    const containerRect = this.slider.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    this.cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== this.currentIndex) {
      this.currentIndex = closestIndex;
      this.updateDots();
      this.updateBackground();
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;
    
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    // Para carrusel cilíndrico: normalizar el índice dentro del rango
    const normalizedIndex = ((this.currentIndex % this.cards.length) + this.cards.length) % this.cards.length;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === normalizedIndex);
    });
  }

  getMaxIndex() {
    const cardWidth = this.cards[0].offsetWidth + 24;
    const containerWidth = this.slider.parentElement.offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth) || 1;
    return Math.max(0, this.cards.length - visibleCards);
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  resetAutoplay() {
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, wait) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, wait);
      }
    };
  }

  destroy() {
    this.stopAutoplay();
    window.removeEventListener('resize', this.handleResize);
  }
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize services slider
  const servicesSlider = new CardSlider('services-slider', {
    autoplay: true,
    autoplayDelay: 6000
  });

  // Initialize portfolio slider
  const portfolioSlider = new CardSlider('portfolio-slider', {
    autoplay: true,
    autoplayDelay: 7000
  });

  // Background image cycling for services
  const serviceBgImages = document.querySelectorAll('#servicios .slider-bg-image');
  let serviceBgIndex = 0;
  
  if (serviceBgImages.length > 1) {
    setInterval(() => {
      serviceBgImages[serviceBgIndex].classList.remove('active');
      serviceBgIndex = (serviceBgIndex + 1) % serviceBgImages.length;
      serviceBgImages[serviceBgIndex].classList.add('active');
    }, 8000);
  }

  // Background image cycling for portfolio
  const portfolioBgImages = document.querySelectorAll('#portafolio .slider-bg-image');
  let portfolioBgIndex = 0;
  
  if (portfolioBgImages.length > 1) {
    setInterval(() => {
      portfolioBgImages[portfolioBgIndex].classList.remove('active');
      portfolioBgIndex = (portfolioBgIndex + 1) % portfolioBgImages.length;
      portfolioBgImages[portfolioBgIndex].classList.add('active');
    }, 10000);
  }

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const activeSection = document.querySelector('.slider-section:hover');
      if (activeSection) {
        const prevBtn = activeSection.querySelector('.slider-btn[id$="-prev"]');
        if (prevBtn) prevBtn.click();
      }
    } else if (e.key === 'ArrowRight') {
      const activeSection = document.querySelector('.slider-section:hover');
      if (activeSection) {
        const nextBtn = activeSection.querySelector('.slider-btn[id$="-next"]');
        if (nextBtn) nextBtn.click();
      }
    }
  });
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardSlider;
}
