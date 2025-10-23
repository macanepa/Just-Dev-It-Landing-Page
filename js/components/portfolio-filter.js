/**
 * Portfolio Filter Component
 * Filtra proyectos por categoría o tecnología
 * Con animaciones suaves y transiciones
 */

export class PortfolioFilter {
    constructor(options = {}) {
        this.container = options.container || document.querySelector('[data-portfolio-grid]');
        this.filterButtons = options.filterButtons || document.querySelectorAll('[data-filter]');
        this.items = options.items || this.container?.querySelectorAll('[data-category]') || [];
        
        this.activeFilter = 'all';
        this.animationDuration = 300;
        
        if (this.container && this.filterButtons.length > 0) {
            this.init();
        }
    }
    
    init() {
        console.log('🎨 Inicializando Portfolio Filter...');
        
        // Agregar event listeners a los botones de filtro
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilterClick(e));
            
            // Accesibilidad: soporte para teclado
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleFilterClick(e);
                }
            });
        });
        
        // Marcar el filtro activo inicial
        this.updateActiveButton(this.activeFilter);
        
        console.log('✅ Portfolio Filter inicializado');
    }
    
    handleFilterClick(e) {
        const button = e.currentTarget;
        const filter = button.getAttribute('data-filter');
        
        if (filter === this.activeFilter) return;
        
        // Actualizar filtro activo
        this.activeFilter = filter;
        this.updateActiveButton(filter);
        
        // Filtrar items
        this.filterItems(filter);
        
        // Anunciar cambio para screen readers
        this.announceFilterChange(filter);
    }
    
    updateActiveButton(filter) {
        this.filterButtons.forEach(button => {
            const buttonFilter = button.getAttribute('data-filter');
            
            if (buttonFilter === filter) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }
    
    filterItems(filter) {
        // Fade out todos los items
        this.items.forEach(item => {
            item.style.transition = `opacity ${this.animationDuration}ms ease, transform ${this.animationDuration}ms ease`;
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
        });
        
        // Después de la animación, mostrar/ocultar items
        setTimeout(() => {
            let visibleCount = 0;
            
            this.items.forEach((item, index) => {
                const categories = item.getAttribute('data-category').split(',').map(cat => cat.trim());
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    item.style.display = '';
                    item.style.order = visibleCount;
                    
                    // Fade in con stagger
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, visibleCount * 50); // Stagger de 50ms
                    
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Animar el grid para reorganizar
            this.animateGridLayout();
            
            // Actualizar contador si existe
            this.updateCounter(visibleCount);
            
        }, this.animationDuration);
    }
    
    animateGridLayout() {
        if (!this.container) return;
        
        // Forzar reflow para animar cambios en el grid
        this.container.style.transition = 'height 300ms ease';
        const currentHeight = this.container.offsetHeight;
        this.container.style.height = currentHeight + 'px';
        
        requestAnimationFrame(() => {
            this.container.style.height = 'auto';
        });
        
        setTimeout(() => {
            this.container.style.transition = '';
            this.container.style.height = '';
        }, 300);
    }
    
    updateCounter(count) {
        const counter = document.querySelector('[data-portfolio-count]');
        if (counter) {
            counter.textContent = count;
            
            // Animación del contador
            counter.style.transform = 'scale(1.2)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    announceFilterChange(filter) {
        // Crear mensaje para screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        
        const filterName = filter === 'all' ? 'todos los proyectos' : `proyectos de ${filter}`;
        announcement.textContent = `Mostrando ${filterName}`;
        
        document.body.appendChild(announcement);
        
        // Remover después de que sea leído
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Método público para filtrar programáticamente
    setFilter(filter) {
        this.activeFilter = filter;
        this.updateActiveButton(filter);
        this.filterItems(filter);
    }
    
    // Método público para resetear filtros
    reset() {
        this.setFilter('all');
    }
    
    // Método público para obtener items visibles
    getVisibleItems() {
        return Array.from(this.items).filter(item => {
            return item.style.display !== 'none';
        });
    }
    
    // Método público para buscar en proyectos
    search(query) {
        if (!query || query.trim() === '') {
            this.reset();
            return;
        }
        
        const searchTerm = query.toLowerCase().trim();
        
        this.items.forEach((item, index) => {
            const title = item.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const description = item.querySelector('.card-body')?.textContent.toLowerCase() || '';
            const tags = item.querySelector('.card-tags')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          tags.includes(searchTerm);
            
            item.style.transition = `opacity ${this.animationDuration}ms ease, transform ${this.animationDuration}ms ease`;
            
            if (matches) {
                item.style.display = '';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, this.animationDuration);
            }
        });
    }
    
    // Destruir el componente
    destroy() {
        this.filterButtons.forEach(button => {
            button.removeEventListener('click', this.handleFilterClick);
        });
        
        this.items.forEach(item => {
            item.style.display = '';
            item.style.opacity = '';
            item.style.transform = '';
            item.style.transition = '';
        });
        
        console.log('🗑️ Portfolio Filter destruido');
    }
}

// Auto-inicialización si existe el markup necesario
document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('[data-portfolio-grid]');
    
    if (portfolioGrid) {
        window.portfolioFilter = new PortfolioFilter();
    }
});
