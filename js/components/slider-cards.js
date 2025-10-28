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
    
    // Update on resize
    this.handleResize = this.debounce(() => {
      this.updateSlider();
    }, 250);
    
    window.addEventListener('resize', this.handleResize);
    
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
    
    // Touch/swipe support
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    
    this.slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - this.slider.offsetLeft;
      scrollLeft = this.slider.scrollLeft;
      this.slider.style.cursor = 'grabbing';
    });
    
    this.slider.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.slider.offsetLeft;
      const walk = (x - startX) * 2;
      this.slider.scrollLeft = scrollLeft - walk;
    });
    
    this.slider.addEventListener('mouseup', () => {
      isDragging = false;
      this.slider.style.cursor = 'grab';
      this.snapToCard();
      this.resetAutoplay();
    });
    
    this.slider.addEventListener('mouseleave', () => {
      isDragging = false;
      this.slider.style.cursor = 'grab';
    });
    
    // Pause autoplay on hover
    this.slider.addEventListener('mouseenter', () => {
      this.stopAutoplay();
    });
    
    this.slider.addEventListener('mouseleave', () => {
      if (this.autoplay) {
        this.startAutoplay();
      }
    });
    
    // Scroll sync with dots
    this.slider.addEventListener('scroll', () => {
      this.updateDotsFromScroll();
    });
  }

  updateSlider() {
    const cardWidth = this.cards[0].offsetWidth + 24;
    
    // Normalizar el índice para carrusel cilíndrico
    const normalizedIndex = ((this.currentIndex % this.cards.length) + this.cards.length) % this.cards.length;
    
    this.slider.scrollTo({
      left: normalizedIndex * cardWidth,
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
    const maxIndex = this.getMaxIndex();
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));
    this.updateSlider();
  }

  nextSlide() {
    // Carrusel cilíndrico infinito
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.updateSlider();
  }

  prevSlide() {
    // Carrusel cilíndrico infinito
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.updateSlider();
  }

  snapToCard() {
    const cardWidth = this.cards[0].offsetWidth + 24;
    const scrollLeft = this.slider.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    this.goToSlide(index);
  }

  updateDotsFromScroll() {
    const cardWidth = this.cards[0].offsetWidth + 24;
    const scrollLeft = this.slider.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    
    if (index !== this.currentIndex) {
      this.currentIndex = index;
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
