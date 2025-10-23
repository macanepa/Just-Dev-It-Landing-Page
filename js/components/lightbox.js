/**
 * Lightbox Component
 * Modal para visualizar imágenes en tamaño completo
 * Con navegación, zoom y soporte para teclado
 */

export class Lightbox {
    constructor(options = {}) {
        this.triggers = options.triggers || document.querySelectorAll('[data-lightbox]');
        this.images = [];
        this.currentIndex = 0;
        this.isOpen = false;
        this.zoomLevel = 1;
        this.maxZoom = 3;
        this.minZoom = 1;
        
        if (this.triggers.length > 0) {
            this.init();
        }
    }
    
    init() {
        console.log('🖼️ Inicializando Lightbox...');
        
        // Crear estructura del lightbox
        this.createLightboxHTML();
        
        // Cachear elementos DOM
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
        this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
        this.btnClose = this.lightbox.querySelector('.lightbox-close');
        this.btnPrev = this.lightbox.querySelector('.lightbox-prev');
        this.btnNext = this.lightbox.querySelector('.lightbox-next');
        this.btnZoomIn = this.lightbox.querySelector('.lightbox-zoom-in');
        this.btnZoomOut = this.lightbox.querySelector('.lightbox-zoom-out');
        
        // Recopilar imágenes de los triggers
        this.collectImages();
        
        // Event listeners
        this.attachEventListeners();
        
        console.log(`✅ Lightbox inicializado con ${this.images.length} imágenes`);
    }
    
    createLightboxHTML() {
        const lightboxHTML = `
            <div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-hidden="true">
                <div class="lightbox-overlay"></div>
                
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Cerrar lightbox">
                        <span aria-hidden="true">×</span>
                    </button>
                    
                    <button class="lightbox-prev" aria-label="Imagen anterior">
                        <span aria-hidden="true">‹</span>
                    </button>
                    
                    <button class="lightbox-next" aria-label="Imagen siguiente">
                        <span aria-hidden="true">›</span>
                    </button>
                    
                    <div class="lightbox-image-container">
                        <img src="" alt="" class="lightbox-image">
                    </div>
                    
                    <div class="lightbox-info">
                        <div class="lightbox-caption"></div>
                        <div class="lightbox-counter"></div>
                    </div>
                    
                    <div class="lightbox-controls">
                        <button class="lightbox-zoom-out" aria-label="Alejar">
                            <span aria-hidden="true">−</span>
                        </button>
                        <button class="lightbox-zoom-in" aria-label="Acercar">
                            <span aria-hidden="true">+</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    collectImages() {
        this.triggers.forEach((trigger, index) => {
            const img = trigger.querySelector('img') || trigger;
            const src = img.getAttribute('src') || img.getAttribute('data-src');
            const alt = img.getAttribute('alt') || '';
            const caption = trigger.getAttribute('data-caption') || alt;
            
            this.images.push({ src, alt, caption });
            
            // Agregar click listener
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
            
            // Agregar cursor pointer
            trigger.style.cursor = 'pointer';
        });
    }
    
    attachEventListeners() {
        // Cerrar
        this.btnClose.addEventListener('click', () => this.close());
        this.lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => this.close());
        
        // Navegación
        this.btnPrev.addEventListener('click', () => this.prev());
        this.btnNext.addEventListener('click', () => this.next());
        
        // Zoom
        this.btnZoomIn.addEventListener('click', () => this.zoomIn());
        this.btnZoomOut.addEventListener('click', () => this.zoomOut());
        
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch gestures para móvil
        this.setupTouchGestures();
    }
    
    open(index = 0) {
        this.currentIndex = index;
        this.isOpen = true;
        this.zoomLevel = 1;
        
        // Mostrar lightbox
        this.lightbox.classList.add('active');
        this.lightbox.setAttribute('aria-hidden', 'false');
        
        // Prevenir scroll en body
        document.body.style.overflow = 'hidden';
        
        // Cargar imagen
        this.loadImage();
        
        // Focus en el lightbox para accesibilidad
        this.btnClose.focus();
        
        // Anunciar para screen readers
        this.announce('Lightbox abierto. Usa las flechas para navegar, Escape para cerrar.');
    }
    
    close() {
        this.isOpen = false;
        
        // Ocultar lightbox
        this.lightbox.classList.remove('active');
        this.lightbox.setAttribute('aria-hidden', 'true');
        
        // Restaurar scroll en body
        document.body.style.overflow = '';
        
        // Reset zoom
        this.resetZoom();
    }
    
    loadImage() {
        const image = this.images[this.currentIndex];
        
        // Fade out
        this.lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            // Cargar nueva imagen
            this.lightboxImg.src = image.src;
            this.lightboxImg.alt = image.alt;
            
            // Actualizar caption
            this.lightboxCaption.textContent = image.caption;
            
            // Actualizar contador
            this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            
            // Fade in cuando cargue
            this.lightboxImg.onload = () => {
                this.lightboxImg.style.opacity = '1';
            };
        }, 200);
        
        // Actualizar botones de navegación
        this.updateNavigationButtons();
    }
    
    updateNavigationButtons() {
        // Deshabilitar prev si es la primera imagen
        if (this.currentIndex === 0) {
            this.btnPrev.disabled = true;
            this.btnPrev.style.opacity = '0.3';
        } else {
            this.btnPrev.disabled = false;
            this.btnPrev.style.opacity = '1';
        }
        
        // Deshabilitar next si es la última imagen
        if (this.currentIndex === this.images.length - 1) {
            this.btnNext.disabled = true;
            this.btnNext.style.opacity = '0.3';
        } else {
            this.btnNext.disabled = false;
            this.btnNext.style.opacity = '1';
        }
    }
    
    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.resetZoom();
            this.loadImage();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.resetZoom();
            this.loadImage();
        }
    }
    
    zoomIn() {
        if (this.zoomLevel < this.maxZoom) {
            this.zoomLevel += 0.5;
            this.applyZoom();
        }
    }
    
    zoomOut() {
        if (this.zoomLevel > this.minZoom) {
            this.zoomLevel -= 0.5;
            this.applyZoom();
        }
    }
    
    applyZoom() {
        this.lightboxImg.style.transform = `scale(${this.zoomLevel})`;
        
        // Habilitar/deshabilitar botones de zoom
        this.btnZoomIn.disabled = this.zoomLevel >= this.maxZoom;
        this.btnZoomOut.disabled = this.zoomLevel <= this.minZoom;
        
        // Permitir pan si está zoomed
        if (this.zoomLevel > 1) {
            this.lightboxImg.style.cursor = 'grab';
            this.enablePan();
        } else {
            this.lightboxImg.style.cursor = 'default';
            this.disablePan();
        }
    }
    
    resetZoom() {
        this.zoomLevel = 1;
        this.lightboxImg.style.transform = 'scale(1)';
        this.btnZoomIn.disabled = false;
        this.btnZoomOut.disabled = true;
        this.disablePan();
    }
    
    enablePan() {
        // Implementar pan cuando está zoomed (opcional)
        this.lightboxImg.style.cursor = 'grab';
    }
    
    disablePan() {
        this.lightboxImg.style.cursor = 'default';
    }
    
    handleKeyboard(e) {
        if (!this.isOpen) return;
        
        switch(e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                this.prev();
                break;
            case 'ArrowRight':
                this.next();
                break;
            case '+':
            case '=':
                this.zoomIn();
                break;
            case '-':
            case '_':
                this.zoomOut();
                break;
        }
    }
    
    setupTouchGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next
                this.next();
            } else {
                // Swipe right - prev
                this.prev();
            }
        }
    }
    
    announce(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Método público para abrir con una imagen específica
    openImage(index) {
        this.open(index);
    }
    
    // Destruir el componente
    destroy() {
        if (this.lightbox) {
            this.lightbox.remove();
        }
        
        this.triggers.forEach(trigger => {
            trigger.style.cursor = '';
        });
        
        console.log('🗑️ Lightbox destruido');
    }
}

// CSS inline para el lightbox (si no existe archivo CSS separado)
const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: none;
        opacity: 0;
        transition: opacity 300ms ease;
    }
    
    .lightbox.active {
        display: block;
        opacity: 1;
    }
    
    .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .lightbox-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-image-container {
        max-width: 90%;
        max-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        transition: opacity 300ms ease, transform 300ms ease;
    }
    
    .lightbox-close,
    .lightbox-prev,
    .lightbox-next,
    .lightbox-zoom-in,
    .lightbox-zoom-out {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 2rem;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 300ms ease;
        border-radius: 50%;
        backdrop-filter: blur(10px);
    }
    
    .lightbox-close:hover,
    .lightbox-prev:hover,
    .lightbox-next:hover,
    .lightbox-zoom-in:hover,
    .lightbox-zoom-out:hover {
        background: rgba(155, 97, 164, 0.8);
        border-color: rgba(155, 97, 164, 1);
        transform: scale(1.1);
    }
    
    .lightbox-close {
        top: 20px;
        right: 20px;
    }
    
    .lightbox-prev {
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .lightbox-next {
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .lightbox-info {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: white;
    }
    
    .lightbox-caption {
        font-size: 1.1rem;
        margin-bottom: 8px;
    }
    
    .lightbox-counter {
        font-size: 0.9rem;
        opacity: 0.7;
    }
    
    .lightbox-controls {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        gap: 10px;
    }
    
    .lightbox-zoom-in,
    .lightbox-zoom-out {
        position: relative;
        top: 0;
        left: 0;
    }
    
    @media (max-width: 768px) {
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next,
        .lightbox-zoom-in,
        .lightbox-zoom-out {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
        }
        
        .lightbox-image-container {
            max-width: 95%;
        }
    }
`;

// Inyectar estilos
if (!document.getElementById('lightbox-styles')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'lightbox-styles';
    styleTag.textContent = lightboxStyles;
    document.head.appendChild(styleTag);
}

// Auto-inicialización
document.addEventListener('DOMContentLoaded', () => {
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    
    if (lightboxTriggers.length > 0) {
        window.lightbox = new Lightbox();
    }
});
