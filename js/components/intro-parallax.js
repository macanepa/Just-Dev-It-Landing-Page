/**
 * Intro Sections Parallax & Epic Scroll - Just Dev It
 * Efecto parallax suave + transiciones épicas fullscreen
 */

class IntroParallax {
  constructor() {
    this.sections = document.querySelectorAll('.intro-section');
    this.lastScrollY = 0;
    this.ticking = false;
    this.currentSection = null;
    
    if (this.sections.length === 0) return;
    
    this.init();
  }

  init() {
    // Crear elementos parallax para cada sección
    this.sections.forEach(section => {
      const parallaxBg = document.createElement('div');
      parallaxBg.className = 'intro-parallax-bg';
      section.insertBefore(parallaxBg, section.firstChild);
    });

    // Configurar scroll listener
    this.setupScrollListener();
    
    console.log('✅ Intro Parallax + Epic Scroll inicializado con', this.sections.length, 'secciones');
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.lastScrollY = window.pageYOffset;
      
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          this.updateEpicStates();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
    
    // Ejecutar una vez al cargar
    this.updateParallax();
    this.updateEpicStates();
  }

  /**
   * Actualiza los estados épicos de las secciones según su posición en viewport
   */
  updateEpicStates() {
    const windowHeight = window.innerHeight;
    const scrollY = window.pageYOffset;
    const viewportCenter = scrollY + (windowHeight / 2);
    
    let closestSection = null;
    let closestDistance = Infinity;
    
    this.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionCenter = sectionTop + (rect.height / 2);
      const sectionBottom = sectionTop + rect.height;
      
      // Calcular distancia al centro del viewport
      const distanceToCenter = Math.abs(sectionCenter - viewportCenter);
      
      // Determinar qué sección está más cerca del centro
      if (distanceToCenter < closestDistance) {
        closestDistance = distanceToCenter;
        closestSection = section;
      }
      
      // Limpiar estados previos
      section.classList.remove('is-before-viewport', 'is-in-viewport', 'is-after-viewport');
      
      // Aplicar estados según posición
      if (sectionBottom < scrollY + (windowHeight * 0.2)) {
        // Sección está arriba (ya pasó)
        section.classList.add('is-after-viewport');
      } else if (sectionTop > scrollY + (windowHeight * 0.8)) {
        // Sección está abajo (aún no llega)
        section.classList.add('is-before-viewport');
      } else {
        // Sección está en viewport
        section.classList.add('is-in-viewport');
      }
    });
    
    // Guardar sección actual
    if (closestSection !== this.currentSection) {
      this.currentSection = closestSection;
      // Podrías emitir evento custom aquí si necesitas tracking
      // console.log('📍 Sección actual:', this.currentSection.className);
    }
  }

  updateParallax() {
    this.sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Verificar si la sección está en el viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Calcular el progreso de scroll relativo a la sección
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        
        // Parallax background (más lento)
        const parallaxBg = section.querySelector('.intro-parallax-bg');
        if (parallaxBg) {
          const bgOffset = (scrollProgress - 0.5) * 100;
          parallaxBg.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
        }
        
        // Parallax content (velocidad media) - solo si está activa
        const content = section.querySelector('.intro-content');
        if (content && section.classList.contains('is-in-viewport')) {
          const contentOffset = (scrollProgress - 0.5) * 20;
          // Suavizar el parallax del contenido
          content.style.transform = `translate3d(0, ${contentOffset}px, 0)`;
        }
        
        // Parallax decorations (más rápido)
        const decoration1 = section.querySelector('.intro-decoration-1');
        const decoration2 = section.querySelector('.intro-decoration-2');
        
        if (decoration1) {
          const dec1Offset = (scrollProgress - 0.5) * 150;
          decoration1.style.transform = `translate3d(${dec1Offset}px, ${dec1Offset * 0.5}px, 0)`;
        }
        
        if (decoration2) {
          const dec2Offset = (scrollProgress - 0.5) * -120;
          decoration2.style.transform = `translate3d(${dec2Offset}px, ${dec2Offset * -0.5}px, 0)`;
        }
      }
    });
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

