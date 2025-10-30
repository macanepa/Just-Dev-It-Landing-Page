/**
 * Slider with Cards - JavaScript SIMPLIFICADO
 * Maneja la funcionalidad de los sliders de servicios y portafolio
 * SIN autoplay, comportamiento lineal simple
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
    this.isAnimating = false; // Prevenir múltiples animaciones simultáneas
    
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
      
      dot.addEventListener('click', () => {
        if (this.isAnimating) return;
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
        if (!this.isAnimating) this.prevSlide();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.isAnimating) this.nextSlide();
      });
    }
    
    // Touch/swipe para móviles
    let touchStartX = 0;
    let touchCurrentX = 0;
    let isDragging = false;
    
    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      isDragging = false;
    }, { passive: true });
    
    this.slider.addEventListener('touchmove', (e) => {
      touchCurrentX = e.touches[0].clientX;
      const diff = Math.abs(touchCurrentX - touchStartX);
      if (diff > 10) isDragging = true;
    }, { passive: true });
    
    this.slider.addEventListener('touchend', () => {
      if (!isDragging || this.isAnimating) return;
      
      const diff = touchStartX - touchCurrentX;
      
      // Swipe significativo (más de 50px)
      if (Math.abs(diff) > 50) {
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
        if (!isDragging && !this.isAnimating) {
          this.goToSlide(index);
        }
      });
    });
    
    // Teclado
    document.addEventListener('keydown', (e) => {
      if (!this.slider.closest('.slider-section:hover')) return;
      
      if (e.key === 'ArrowLeft' && !this.isAnimating) {
        this.prevSlide();
      } else if (e.key === 'ArrowRight' && !this.isAnimating) {
        this.nextSlide();
      }
    });
  }

  updateSlider() {
    if (!this.slider || this.cards.length === 0) return;
    
    this.isAnimating = true;
    
    const currentCard = this.cards[this.currentIndex];
    if (!currentCard) {
      this.isAnimating = false;
      return;
    }
    
    // Calcular scroll para centrar la tarjeta
    const containerWidth = this.slider.offsetWidth;
    const cardWidth = currentCard.offsetWidth;
    const cardLeft = currentCard.offsetLeft;
    const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    
    this.slider.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: 'smooth'
    });
    
    // Actualizar estados visuales
    this.updateCardStates();
    this.updateDots();
    this.updateBackground();
    this.updateButtonStates();
    
    // Liberar animación después de completarse
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
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
        this.prevBtn.disabled = true;
        this.prevBtn.style.opacity = '0.3';
        this.prevBtn.style.cursor = 'not-allowed';
      } else {
        this.prevBtn.disabled = false;
        this.prevBtn.style.opacity = '1';
        this.prevBtn.style.cursor = 'pointer';
      }
    }
    
    // Botón siguiente
    if (this.nextBtn) {
      if (this.currentIndex === this.cards.length - 1) {
        this.nextBtn.disabled = true;
        this.nextBtn.style.opacity = '0.3';
        this.nextBtn.style.cursor = 'not-allowed';
      } else {
        this.nextBtn.disabled = false;
        this.nextBtn.style.opacity = '1';
        this.nextBtn.style.cursor = 'pointer';
      }
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.cards.length || index === this.currentIndex) return;
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
