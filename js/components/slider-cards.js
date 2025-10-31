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
    this.updateSlider();
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
    // Botones de navegación - SIN restricciones artificiales
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
    
    // Touch/swipe para móviles - MEJORADO
    let touchStartX = 0;
    let touchStartY = 0;
    let touchCurrentX = 0;
    let isDragging = false;
    let startTime = 0;
    
    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchCurrentX = touchStartX;
      isDragging = false;
      startTime = Date.now();
    }, { passive: true });
    
    this.slider.addEventListener('touchmove', (e) => {
      touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = Math.abs(touchCurrentX - touchStartX);
      const diffY = Math.abs(touchCurrentY - touchStartY);
      
      // Solo considerar drag horizontal
      if (diffX > diffY && diffX > 10) {
        isDragging = true;
      }
    }, { passive: true });
    
    this.slider.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const diff = touchStartX - touchCurrentX;
      const duration = Date.now() - startTime;
      const velocity = Math.abs(diff) / duration;
      
      // Swipe rápido (menos distancia pero más velocidad) O swipe largo
      if (velocity > 0.3 || Math.abs(diff) > 50) {
        if (diff > 0 && this.currentIndex < this.cards.length - 1) {
          this.nextSlide();
        } else if (diff < 0 && this.currentIndex > 0) {
          this.prevSlide();
        }
      }
      
      isDragging = false;
    }, { passive: true });
    
    // Click en tarjetas
    this.cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (!isDragging) {
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
    
    // Cancelar timeout anterior si existe
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
    
    const currentCard = this.cards[this.currentIndex];
    if (!currentCard) return;
    
    // Actualizar estados visuales INMEDIATAMENTE
    this.updateCardStates();
    this.updateDots();
    this.updateBackground();
    this.updateButtonStates();
    
    // Calcular scroll para centrar la tarjeta
    const containerWidth = this.slider.offsetWidth;
    const cardWidth = currentCard.offsetWidth;
    const cardLeft = currentCard.offsetLeft;
    const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    
    // Scroll suave
    this.slider.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
  }
  
  updateCardStates() {
    this.cards.forEach((card, index) => {
      if (index === this.currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
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
    
    // Permitir re-click en la misma tarjeta para re-centrar
    this.currentIndex = index;
    this.updateSlider();
  }

  nextSlide() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  prevSlide() {
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
