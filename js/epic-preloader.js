/**
 * PREMIUM PRELOADER - Just Dev It (ULTRA OPTIMIZADO)
 * Experiencia de carga premium optimizada para performance
 * Sin impacto en Web Vitals (LCP, FID, CLS)
 */

(function() {
    'use strict';
    
    // Configuración optimizada para carga rápida
    const CONFIG = {
        duration: 1000, // 1 segundo - más rápido
        minDisplayTime: 600, // Mínimo 0.6s
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
        
        // Función de actualización del progreso (optimizada)
        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime;
            const rawProgress = Math.min(elapsed / CONFIG.duration, 1);
            progress = CONFIG.easing(rawProgress);
            
            const percentage = Math.floor(progress * 100);
            
            // Batch DOM updates en un solo RAF
            counter.textContent = percentage;
            progressBar.style.width = percentage + '%';
            
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else {
                finishLoading(currentTime);
            }
        }
        
        // Función para terminar la carga
        function finishLoading(finishTime) {
            const totalTime = finishTime - startTime;
            const remainingTime = Math.max(0, CONFIG.minDisplayTime - totalTime);
            
            setTimeout(() => {
                // Tracking optimizado - solo si están disponibles
                if (typeof gtag === 'function') {
                    gtag('event', 'page_loaded', {
                        'event_category': 'engagement',
                        'event_label': 'preloader_complete',
                        'value': Math.round(totalTime),
                        'non_interaction': true
                    });
                }
                
                if (typeof fbq === 'function') {
                    fbq('trackCustom', 'PreloaderComplete');
                }
                
                // Animación de salida con clase
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
        
        // Fallback: forzar completado después de 2.5 segundos (reducido)
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
        }, 2500); // Reducido de 3000 a 2500
    }
    
    // Tracking de performance optimizado
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lcpEntry = entries[entries.length - 1]; // Último LCP
                
                if (lcpEntry) {
                    console.log('LCP:', Math.round(lcpEntry.startTime) + 'ms');
                }
            });
            
            observer.observe({ 
                type: 'largest-contentful-paint',
                buffered: true 
            });
        } catch (e) {
            // Silently fail en navegadores antiguos
        }
    }
    
})();
