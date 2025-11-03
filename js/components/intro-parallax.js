/**
 * Intro Sections Parallax & Epic Scroll - Just Dev It (OPTIMIZADO)
 * Efecto parallax suave + transiciones épicas fullscreen
 * Optimizado para mobile y mejor performance
 */

class IntroParallax {
  constructor() {
    this.sections = document.querySelectorAll('.intro-section');
    this.lastScrollY = 0;
    this.ticking = false;
    this.currentSection = null;
    
    // Detectar capacidades del dispositivo
    this.isMobile = window.innerWidth < 768;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    if (this.sections.length === 0) return;
    
    // No inicializar parallax en mobile o si se prefiere reducir movimiento
    if (this.isMobile || this.prefersReducedMotion) {
      console.log('⚡ Intro Parallax desactivado (mobile/reduced motion)');
      this.initSimpleMode();
      return;
    }
    
    this.init();
  }

  initSimpleMode() {
    // Modo simple sin parallax para mobile
    this.sections.forEach(section => {
      section.classList.add('simple-mode');
    });
    
    if (this.supportsIntersectionObserver) {
      this.setupIntersectionObserver();
    }
    
    console.log('✅ Intro Simple Mode inicializado');
  }

  init() {
    // Crear elementos parallax para cada sección (solo desktop)
    this.sections.forEach(section => {
      const parallaxBg = document.createElement('div');
      parallaxBg.className = 'intro-parallax-bg';
      section.insertBefore(parallaxBg, section.firstChild);
    });

    // Configurar scroll listener con throttle agresivo
    this.setupScrollListener();
    
    console.log('✅ Intro Parallax + Epic Scroll inicializado con', this.sections.length, 'secciones');
  }

  setupScrollListener() {
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      this.lastScrollY = window.pageYOffset;
      
      // Throttle agresivo para mejor performance
      if (!this.ticking) {
        this.ticking = true;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          window.requestAnimationFrame(() => {
            this.updateParallax();
            this.updateEpicStates();
            this.ticking = false;
          });
        }, 16); // ~60fps max
      }
    }, { passive: true });
    
    // Ejecutar una vez al cargar
    this.updateParallax();
    this.updateEpicStates();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-viewport');
          entry.target.classList.remove('is-before-viewport', 'is-after-viewport');
        } else {
          const rect = entry.boundingClientRect;
          if (rect.top > 0) {
            entry.target.classList.add('is-before-viewport');
          } else {
            entry.target.classList.add('is-after-viewport');
          }
          entry.target.classList.remove('is-in-viewport');
        }
      });
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px'
    });

    this.sections.forEach(section => observer.observe(section));
  }

  /**
   * Actualiza los estados épicos de las secciones según su posición en viewport
   */
  updateEpicStates() {
    const windowHeight = window.innerHeight;
    const scrollY = this.lastScrollY;
    const viewportCenter = scrollY + (windowHeight / 2);
    
    let closestSection = null;
    let closestDistance = Infinity;
    
    // Batch DOM reads first
    const sectionData = Array.from(this.sections).map(section => {
      const rect = section.getBoundingClientRect();
      return {
        section,
        rect,
        sectionTop: rect.top + scrollY,
        sectionCenter: rect.top + scrollY + (rect.height / 2),
        sectionBottom: rect.top + scrollY + rect.height
      };
    });
    
    // Batch DOM writes in RAF
    requestAnimationFrame(() => {
      sectionData.forEach(({ section, rect, sectionTop, sectionCenter, sectionBottom }) => {
        const distanceToCenter = Math.abs(sectionCenter - viewportCenter);
        
        if (distanceToCenter < closestDistance) {
          closestDistance = distanceToCenter;
          closestSection = section;
        }
        
        // Limpiar y aplicar estados
        section.classList.remove('is-before-viewport', 'is-in-viewport', 'is-after-viewport');
        
        if (sectionBottom < scrollY + (windowHeight * 0.2)) {
          section.classList.add('is-after-viewport');
        } else if (sectionTop > scrollY + (windowHeight * 0.8)) {
          section.classList.add('is-before-viewport');
        } else {
          section.classList.add('is-in-viewport');
        }
      });
      
      if (closestSection !== this.currentSection) {
        this.currentSection = closestSection;
      }
    });
  }

  updateParallax() {
    const windowHeight = window.innerHeight;
    
    // Batch DOM reads
    const updates = [];
    
    this.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Verificar si la sección está en el viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        
        updates.push({
          section,
          scrollProgress,
          isInViewport: section.classList.contains('is-in-viewport')
        });
      }
    });
    
    // Batch DOM writes en un solo RAF
    if (updates.length > 0) {
      requestAnimationFrame(() => {
        updates.forEach(({ section, scrollProgress, isInViewport }) => {
          // Parallax background (reducido para mejor performance)
          const parallaxBg = section.querySelector('.intro-parallax-bg');
          if (parallaxBg) {
            const bgOffset = (scrollProgress - 0.5) * 50; // Reducido de 100 a 50
            parallaxBg.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
          }
          
          // Parallax content (simplificado)
          const content = section.querySelector('.intro-content');
          if (content && isInViewport) {
            const contentOffset = (scrollProgress - 0.5) * 15; // Reducido de 20 a 15
            content.style.transform = `translate3d(0, ${contentOffset}px, 0)`;
          }
          
          // Parallax decorations (reducido)
          const decoration1 = section.querySelector('.intro-decoration-1');
          const decoration2 = section.querySelector('.intro-decoration-2');
          
          if (decoration1) {
            const dec1Offset = (scrollProgress - 0.5) * 100; // Reducido de 150 a 100
            decoration1.style.transform = `translate3d(${dec1Offset}px, ${dec1Offset * 0.3}px, 0)`;
          }
          
          if (decoration2) {
            const dec2Offset = (scrollProgress - 0.5) * -80; // Reducido de -120 a -80
            decoration2.style.transform = `translate3d(${dec2Offset}px, ${dec2Offset * -0.3}px, 0)`;
          }
        });
      });
    }
  }
  
  /**
   * Scroll suave a una sección específica
   */
  scrollToSection(index) {
    if (this.sections[index]) {
      this.sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  destroy() {
    this.ticking = false;
    this.sections = [];
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.introParallax = new IntroParallax();
  });
} else {
  window.introParallax = new IntroParallax();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IntroParallax;
}
