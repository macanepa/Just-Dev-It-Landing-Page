/**
 * PREMIUM PRELOADER - Just Dev It
 * Experiencia de carga premium optimizada para performance
 * Sin impacto en Web Vitals (LCP, FID, CLS)
 */

(function() {
    'use strict';
    
    // Configuración optimizada
    const CONFIG = {
        duration: 1200, // 1.2 segundos - rápido pero elegante
        minDisplayTime: 800, // Mínimo 0.8s para que se aprecie
        easing: t => 1 - Math.pow(1 - t, 3) // easeOutCubic
    };
    
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreloader);
    } else {
        initPreloader();
    }
    
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const counter = document.getElementById('counter');
        const progressBar = document.getElementById('progressBar');
        
        if (!preloader || !counter || !progressBar) {
            console.warn('Preloader elements not found');
            return;
        }
        
        const startTime = performance.now();
        let progress = 0;
        let animationFrameId;
        
        // Función de actualización del progreso
        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime;
            const rawProgress = Math.min(elapsed / CONFIG.duration, 1);
            progress = CONFIG.easing(rawProgress);
            
            const percentage = Math.floor(progress * 100);
            
            // Actualizar UI - batch updates para mejor performance
            requestAnimationFrame(() => {
                counter.textContent = percentage;
                progressBar.style.width = percentage + '%';
            });
            
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else {
                finishLoading(currentTime);
            }
        }
        
        // Función para terminar la carga
        function finishLoading(finishTime) {
            const totalTime = finishTime - startTime;
            
            // Asegurar tiempo mínimo de display
            const remainingTime = Math.max(0, CONFIG.minDisplayTime - totalTime);
            
            setTimeout(() => {
                // Trigger conversión tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_loaded', {
                        'event_category': 'engagement',
                        'event_label': 'preloader_complete',
                        'value': Math.round(totalTime)
                    });
                }
                
                // Trigger Facebook Pixel
                if (typeof fbq !== 'undefined') {
                    fbq('trackCustom', 'PreloaderComplete');
                }
                
                // Animación de salida
                preloader.classList.add('loaded');
                document.body.classList.add('loaded');
                
                // Limpiar después de la transición
                setTimeout(() => {
                    if (preloader && preloader.parentNode) {
                        preloader.remove();
                    }
                    
                    // Trigger evento personalizado
                    window.dispatchEvent(new CustomEvent('preloaderComplete', {
                        detail: { loadTime: totalTime + remainingTime }
                    }));
                    
                    // Cancelar cualquier animación pendiente
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                    }
                    
                    console.log('✅ Preloader completado:', {
                        loadTime: Math.round(totalTime + remainingTime) + 'ms',
                        performance: 'optimized'
                    });
                }, 600); // Duración de la transición CSS
            }, remainingTime);
        }
        
        // Iniciar animación
        animationFrameId = requestAnimationFrame(updateProgress);
        
        // Fallback: forzar completado después de 3 segundos
        setTimeout(() => {
            if (progress < 1) {
                console.warn('Preloader timeout - forcing completion');
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                counter.textContent = '100';
                progressBar.style.width = '100%';
                finishLoading(performance.now());
            }
        }, 3000);
    }
    
    // Tracking de performance para optimización
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        // Track LCP para asegurar que no lo perjudicamos
                        console.log('LCP:', entry.startTime + 'ms');
                    }
                }
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Silently fail en navegadores antiguos
        }
    }
    
})();

