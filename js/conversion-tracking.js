/**
 * CONVERSION TRACKING - Just Dev It (OPTIMIZADO)
 * Sistema unificado de tracking de conversiones
 * Optimizado para bajo impacto en performance
 */

(function() {
    'use strict';
    
    // Configuración de eventos de conversión
    const CONVERSION_EVENTS = {
        FORM_SUBMIT: 'lead_form_submit',
        QUOTE_BUTTON: 'quote_button_click',
        PORTFOLIO_VIEW: 'portfolio_item_view',
        SERVICE_INTEREST: 'service_interest',
        SCROLL_DEPTH: 'scroll_depth',
        CTA_CLICK: 'cta_click',
        OUTBOUND_CLICK: 'outbound_click',
        PAGE_VIEW: 'page_view'
    };
    
    // Queue para batch tracking (mejor performance)
    let trackingQueue = [];
    let queueTimer = null;
    
    // Helper optimizado para enviar eventos
    function trackConversion(eventName, eventParams = {}) {
        // Agregar a queue en lugar de enviar inmediatamente
        trackingQueue.push({ eventName, eventParams, timestamp: Date.now() });
        
        // Batch send después de 1 segundo
        clearTimeout(queueTimer);
        queueTimer = setTimeout(flushTrackingQueue, 1000);
    }
    
    function flushTrackingQueue() {
        if (trackingQueue.length === 0) return;
        
        const eventsToSend = [...trackingQueue];
        trackingQueue = [];
        
        // Enviar eventos en batch
        eventsToSend.forEach(({ eventName, eventParams }) => {
            sendToAnalytics(eventName, eventParams);
        });
    }
    
    function sendToAnalytics(eventName, eventParams) {
        // Google Analytics 4
        if (typeof gtag === 'function') {
            gtag('event', eventName, {
                ...eventParams,
                event_category: eventParams.category || 'engagement',
                event_label: eventParams.label || eventName,
                value: eventParams.value || 0,
                non_interaction: true
            });
        }
        
        // Facebook Pixel (limitado)
        if (typeof fbq === 'function') {
            const fbEventMap = {
                'lead_form_submit': 'Lead',
                'quote_button_click': 'Contact'
            };
            
            const fbEvent = fbEventMap[eventName];
            if (fbEvent) {
                fbq('track', fbEvent, eventParams);
            }
        }
        
        // DataLayer para GTM
        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...eventParams
            });
        }
    }
    
    // Utilidades
    const throttle = (func, delay) => {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    };
    
    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };
    
    // Inicializar tracking cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConversionTracking);
    } else {
        initConversionTracking();
    }
    
    function initConversionTracking() {
        // 1. Tracking de formulario de contacto
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const formData = new FormData(contactForm);
                trackConversion(CONVERSION_EVENTS.FORM_SUBMIT, {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    category: 'lead_generation',
                    label: 'contact_form_submission',
                    value: 100
                });
            });
        }
        
        // 2. Tracking de botones CTA (con debounce)
        const ctaButtons = document.querySelectorAll('a[href="#contacto"], .btn-primary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', debounce(function() {
                trackConversion(CONVERSION_EVENTS.CTA_CLICK, {
                    button_text: this.textContent.trim(),
                    category: 'engagement',
                    label: 'cta_click'
                });
            }, 300));
        });
        
        // 3. Tracking de visualización de proyectos (optimizado con IO)
        if ('IntersectionObserver' in window) {
            const portfolioCards = document.querySelectorAll('.slider-card');
            const viewedCards = new Set();
            
            const portfolioObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !viewedCards.has(entry.target)) {
                        viewedCards.add(entry.target);
                        const projectTitle = entry.target.querySelector('.slider-card-title')?.textContent || 'Unknown';
                        trackConversion(CONVERSION_EVENTS.PORTFOLIO_VIEW, {
                            project_name: projectTitle,
                            category: 'content_engagement',
                            label: 'portfolio_view'
                        });
                    }
                });
            }, { threshold: 0.5, rootMargin: '0px' });
            
            portfolioCards.forEach(card => portfolioObserver.observe(card));
        }
        
        // 4. Tracking de profundidad de scroll (ultra optimizado)
        let maxScroll = 0;
        const scrollMilestones = [25, 50, 75, 100];
        const trackedMilestones = new Set();
        
        const handleScroll = throttle(() => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercentage > maxScroll) {
                maxScroll = scrollPercentage;
                
                scrollMilestones.forEach(milestone => {
                    if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
                        trackedMilestones.add(milestone);
                        trackConversion(CONVERSION_EVENTS.SCROLL_DEPTH, {
                            scroll_depth: milestone,
                            category: 'engagement',
                            label: `scroll_${milestone}percent`
                        });
                    }
                });
            }
        }, 1000); // Aumentado el throttle a 1 segundo
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // 5. Tracking de servicios (con debounce)
        const serviceCards = document.querySelectorAll('.service-card, .slider-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', debounce(function() {
                const serviceTitle = this.querySelector('.card-title, .slider-card-title')?.textContent || 'Unknown';
                trackConversion(CONVERSION_EVENTS.SERVICE_INTEREST, {
                    service_name: serviceTitle,
                    category: 'interest',
                    label: 'service_click'
                });
            }, 300));
        });
        
        // 6. Tracking de enlaces salientes (optimizado)
        const outboundLinks = document.querySelectorAll('a[href^="http"]:not([href*="justdev.it"])');
        outboundLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackConversion(CONVERSION_EVENTS.OUTBOUND_CLICK, {
                    url: this.href,
                    category: 'engagement',
                    label: 'outbound_link'
                });
            }, { once: false, passive: true });
        });
        
        // 7. Flush tracking queue al salir
        window.addEventListener('beforeunload', () => {
            flushTrackingQueue();
        });
        
        // 8. Flush periódico cada 5 segundos si hay eventos
        setInterval(() => {
            if (trackingQueue.length > 0) {
                flushTrackingQueue();
            }
        }, 5000);
        
        console.log('✅ Conversion tracking initialized (optimized)');
    }
    
    // Exponer función global para uso manual
    window.trackConversion = trackConversion;
    window.CONVERSION_EVENTS = CONVERSION_EVENTS;
    
})();
