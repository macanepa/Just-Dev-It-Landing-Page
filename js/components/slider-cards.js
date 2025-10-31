/**
 * Slider with Cards - OPTIMIZADO Y ROBUSTO
 * Funcionalidad de sliders sin lag ni bugs de doble click
 */

class CardSlider {
  constructor(sliderId, options = {}) {
    this.slider = document.getElementById(sliderId);
    if (!this.slider) {
      console.error('❌ Slider element not found:', sliderId);
      return;
    }

    this.sliderId = sliderId;
    this.prevBtn = document.getElementById(`${sliderId.replace('-slider', '')}-prev`);
    this.nextBtn = document.getElementById(`${sliderId.replace('-slider', '')}-next`);
    this.dotsContainer = document.getElementById(`${sliderId.replace('-slider', '')}-dots`);
    
    // Get background container for syncing
    this.backgroundContainer = this.slider.closest('.slider-section')?.querySelector('.slider-background');
    this.backgroundImages = this.backgroundContainer ? Array.from(this.backgroundContainer.querySelectorAll('.slider-bg-image')) : [];
    
    this.cards = Array.from(this.slider.children);
    this.currentIndex = 0;
    this.animationTimeout = null; // Control de animación mejorado
    
    console.log(`✅ Slider "${sliderId}" initialized with ${this.cards.length} cards`);
    
    this.init();
  }

  init() {
    if (!this.slider || this.cards.length === 0) return;

    this.createDots();
    this.setupEventListeners();
    this.setupScrollObserver(); // Nuevo: observar scroll automáticamente
    this.updateSlider();
  }
  
  setupScrollObserver() {
    // Observar qué tarjeta está en el centro del viewport
    const options = {
      root: this.slider,
      rootMargin: '0px',
      threshold: 0.5 // 50% visible
    };
    
    // Flag para evitar loops entre observer y navegación manual
    this.isUserNavigating = false;
    
    const observer = new IntersectionObserver((entries) => {
      // No actualizar si el usuario está navegando manualmente
      if (this.isUserNavigating) return;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const cardIndex = this.cards.indexOf(entry.target);
          if (cardIndex !== -1 && cardIndex !== this.currentIndex) {
            // Actualizar índice solo si realmente cambió
            this.currentIndex = cardIndex;
            this.updateCardStates();
            this.updateDots();
            this.updateButtonStates();
            this.updateBackground();
          }
        }
      });
    }, options);
    
    // Observar todas las tarjetas
    this.cards.forEach(card => observer.observe(card));
  }

  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    
    // Un dot por cada tarjeta
    this.cards.forEach((card, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToSlide(index);
      });
      
      this.dotsContainer.appendChild(dot);
    });
    
    console.log(`📍 Created ${this.cards.length} dots for "${this.sliderId}"`);
  }

  setupEventListeners() {
    // Botones de navegación
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.prevSlide();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.nextSlide();
      });
    }
    
    // Touch/swipe para móviles - REESCRITO COMPLETAMENTE
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isSwiping = false;
    
    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isSwiping = false;
    }, { passive: true });
    
    this.slider.addEventListener('touchmove', (e) => {
      if (!touchStartX) return;
      
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      
      const diffX = touchStartX - touchCurrentX;
      const diffY = touchStartY - touchCurrentY;
      
      // Detectar si es swipe horizontal (más movimiento en X que en Y)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        isSwiping = true;
      }
    }, { passive: true });
    
    this.slider.addEventListener('touchend', (e) => {
      if (!isSwiping || !touchStartX) {
        touchStartX = 0;
        touchStartY = 0;
        isSwiping = false;
        return;
      }
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndTime = Date.now();
      
      const diffX = touchStartX - touchEndX;
      const diffTime = touchEndTime - touchStartTime;
      const velocity = Math.abs(diffX) / diffTime;
      
      // Swipe a la derecha (prev) - debe moverse más de 50px O ser rápido
      if (diffX < -50 || (diffX < -30 && velocity > 0.5)) {
        this.prevSlide();
      }
      // Swipe a la izquierda (next) - debe moverse más de 50px O ser rápido  
      else if (diffX > 50 || (diffX > 30 && velocity > 0.5)) {
        this.nextSlide();
      }
      
      // Reset
      touchStartX = 0;
      touchStartY = 0;
      isSwiping = false;
    }, { passive: true });
    
    // Click en tarjetas
    this.cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (!isSwiping) {
          this.goToSlide(index);
        }
      });
    });
    
    // Teclado
    document.addEventListener('keydown', (e) => {
      if (!this.slider.closest('.slider-section:hover')) return;
      
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
  }

  updateSlider() {
    if (!this.slider || this.cards.length === 0) return;
    
    // Marcar que el usuario está navegando manualmente
    this.isUserNavigating = true;
    
    // Cancelar timeout anterior si existe
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
    
    const currentCard = this.cards[this.currentIndex];
    if (!currentCard) return;
    
    // Actualizar estados visuales INMEDIATAMENTE antes del scroll
    this.updateCardStates();
    this.updateDots();
    this.updateButtonStates();
    
    // Scroll suave a la tarjeta
    currentCard.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
    
    // Actualizar background después de un delay corto
    setTimeout(() => {
      this.updateBackground();
    }, 100);
    
    // Desactivar el flag después de que termine la animación
    setTimeout(() => {
      this.isUserNavigating = false;
    }, 600); // Tiempo suficiente para que termine el scroll suave
  }
  
  updateCardStates() {
    // Remover active de todas primero
    this.cards.forEach(card => {
      card.classList.remove('active');
    });
    
    // Agregar active solo a la actual
    const currentCard = this.cards[this.currentIndex];
    if (currentCard) {
      currentCard.classList.add('active');
    }
  }
  
  updateBackground() {
    if (!this.backgroundContainer || this.backgroundImages.length === 0) return;
    
    const currentCard = this.cards[this.currentIndex];
    const cardImage = currentCard?.querySelector('.slider-card-image');
    
    if (!cardImage) return;
    
    const imageSrc = cardImage.getAttribute('src');
    
    this.backgroundImages.forEach(bg => {
      if (bg.getAttribute('src') === imageSrc) {
        bg.classList.add('active');
      } else {
        bg.classList.remove('active');
      }
    });
  }

  updateDots() {
    if (!this.dotsContainer) return;
    
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  updateButtonStates() {
    // Botón anterior
    if (this.prevBtn) {
      if (this.currentIndex === 0) {
        this.prevBtn.classList.add('disabled');
        this.prevBtn.style.opacity = '0.3';
      } else {
        this.prevBtn.classList.remove('disabled');
        this.prevBtn.style.opacity = '1';
      }
    }
    
    // Botón siguiente
    if (this.nextBtn) {
      if (this.currentIndex === this.cards.length - 1) {
        this.nextBtn.classList.add('disabled');
        this.nextBtn.style.opacity = '0.3';
      } else {
        this.nextBtn.classList.remove('disabled');
        this.nextBtn.style.opacity = '1';
      }
    }
  }

  goToSlide(index) {
    // Validar índice
    if (index < 0 || index >= this.cards.length) return;
    
    // Evitar ejecuciones múltiples si ya está navegando
    if (this.isUserNavigating) return;
    
    // Permitir re-click en la misma tarjeta para re-centrar
    this.currentIndex = index;
    this.updateSlider();
  }

  nextSlide() {
    // Evitar ejecuciones múltiples si ya está navegando
    if (this.isUserNavigating) return;
    
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  prevSlide() {
    // Evitar ejecuciones múltiples si ya está navegando
    if (this.isUserNavigating) return;
    
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const servicesSlider = new CardSlider('services-slider');
  const portfolioSlider = new CardSlider('portfolio-slider');
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardSlider;
}
