/**
 * CONVERSION TRACKING - Just Dev It
 * Sistema unificado de tracking de conversiones para Google Analytics, Facebook Pixel, LinkedIn
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
        TIME_ON_SITE: 'time_on_site',
        CTA_CLICK: 'cta_click',
        OUTBOUND_CLICK: 'outbound_click',
        VIDEO_PLAY: 'video_play',
        FILE_DOWNLOAD: 'file_download',
        SEARCH_QUERY: 'site_search',
        ERROR_404: 'error_404',
        PAGE_VIEW: 'page_view'
    };
    
    // Helper para enviar eventos a múltiples plataformas
    function trackConversion(eventName, eventParams = {}) {
        console.log('📊 Tracking Conversion:', eventName, eventParams);
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...eventParams,
                event_category: eventParams.category || 'engagement',
                event_label: eventParams.label || eventName,
                value: eventParams.value || 0
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            const fbEventMap = {
                'lead_form_submit': 'Lead',
                'quote_button_click': 'Contact',
                'portfolio_item_view': 'ViewContent',
                'service_interest': 'ViewContent',
                'cta_click': 'InitiateCheckout'
            };
            
            const fbEvent = fbEventMap[eventName] || 'CustomEvent';
            fbq('track', fbEvent, eventParams);
        }
        
        // LinkedIn Insight Tag
        if (typeof lintrk !== 'undefined') {
            lintrk('track', { conversion_id: eventParams.conversion_id || 0 });
        }
        
        // Enviar a dataLayer para GTM
        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...eventParams
            });
        }
    }
    
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
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    service: formData.get('service') || 'general',
                    category: 'lead_generation',
                    label: 'contact_form_submission',
                    value: 100 // Valor estimado del lead
                };
                
                trackConversion(CONVERSION_EVENTS.FORM_SUBMIT, data);
                
                // Enviar también como conversión de Google Ads si está configurado
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'conversion', {
                        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
                    });
                }
            });
        }
        
        // 2. Tracking de botones CTA "Cotizar Proyecto"
        const ctaButtons = document.querySelectorAll('a[href="#contacto"], .btn-primary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = this.textContent.trim();
                trackConversion(CONVERSION_EVENTS.CTA_CLICK, {
                    button_text: buttonText,
                    button_location: getElementLocation(this),
                    category: 'engagement',
                    label: 'cta_click'
                });
            });
        });
        
        // 3. Tracking de visualización de proyectos en portfolio
        const portfolioCards = document.querySelectorAll('.slider-card');
        if ('IntersectionObserver' in window) {
            const portfolioObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const projectTitle = entry.target.querySelector('.slider-card-title')?.textContent || 'Unknown';
                        trackConversion(CONVERSION_EVENTS.PORTFOLIO_VIEW, {
                            project_name: projectTitle,
                            category: 'content_engagement',
                            label: 'portfolio_view'
                        });
                        portfolioObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            portfolioCards.forEach(card => portfolioObserver.observe(card));
        }
        
        // 4. Tracking de profundidad de scroll
        let maxScroll = 0;
        const scrollMilestones = [25, 50, 75, 90, 100];
        const trackedMilestones = new Set();
        
        window.addEventListener('scroll', throttle(() => {
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
        }, 500));
        
        // 5. Tracking de tiempo en sitio
        let timeOnSite = 0;
        const timeInterval = setInterval(() => {
            timeOnSite += 30;
            
            // Trackear cada 2 minutos
            if (timeOnSite % 120 === 0) {
                trackConversion(CONVERSION_EVENTS.TIME_ON_SITE, {
                    time_seconds: timeOnSite,
                    category: 'engagement',
                    label: `time_${Math.floor(timeOnSite / 60)}min`
                });
            }
        }, 30000); // Check cada 30 segundos
        
        // Limpiar interval al salir
        window.addEventListener('beforeunload', () => {
            clearInterval(timeInterval);
            trackConversion('session_end', {
                total_time: timeOnSite,
                category: 'engagement',
                label: 'session_end'
            });
        });
        
        // 6. Tracking de clics en servicios
        const serviceCards = document.querySelectorAll('.service-card, .slider-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const serviceTitle = this.querySelector('.card-title, .slider-card-title')?.textContent || 'Unknown Service';
                trackConversion(CONVERSION_EVENTS.SERVICE_INTEREST, {
                    service_name: serviceTitle,
                    category: 'interest',
                    label: 'service_click'
                });
            });
        });
        
        // 7. Tracking de clics en redes sociales
        const socialLinks = document.querySelectorAll('.social-link, [href*="linkedin"], [href*="github"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', function() {
                const platform = getSocialPlatform(this.href);
                trackConversion('social_click', {
                    platform: platform,
                    category: 'engagement',
                    label: `social_${platform}`
                });
            });
        });
        
        // 8. Tracking de enlaces salientes (outbound links)
        const outboundLinks = document.querySelectorAll('a[href^="http"]:not([href*="justdev.it"])');
        outboundLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackConversion(CONVERSION_EVENTS.OUTBOUND_CLICK, {
                    url: this.href,
                    category: 'engagement',
                    label: 'outbound_link'
                });
            });
        });
        
        // 9. Tracking de clics en teléfono/email
        const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
        contactLinks.forEach(link => {
            link.addEventListener('click', function() {
                const type = this.href.startsWith('tel:') ? 'phone' : 'email';
                trackConversion('direct_contact', {
                    contact_type: type,
                    category: 'lead_generation',
                    label: `${type}_click`,
                    value: 75
                });
            });
        });
        
        // 10. Tracking de engagement con el hero
        const heroSection = document.querySelector('.hero-section, .hero');
        if (heroSection && 'IntersectionObserver' in window) {
            let heroEngaged = false;
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.8 && !heroEngaged) {
                        heroEngaged = true;
                        trackConversion('hero_engagement', {
                            category: 'engagement',
                            label: 'hero_viewed'
                        });
                    }
                });
            }, { threshold: 0.8 });
            
            heroObserver.observe(heroSection);
        }
        
        // 11. Tracking de errores JavaScript (para debugging)
        window.addEventListener('error', function(e) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: e.message,
                    fatal: false,
                    page: window.location.pathname
                });
            }
        });
        
        console.log('✅ Conversion tracking initialized');
    }
    
    // Utilidades
    function getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight / 3) return 'top';
        if (rect.top < (window.innerHeight * 2) / 3) return 'middle';
        return 'bottom';
    }
    
    function getSocialPlatform(url) {
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('github')) return 'github';
        if (url.includes('twitter') || url.includes('x.com')) return 'twitter';
        if (url.includes('facebook')) return 'facebook';
        return 'other';
    }
    
    function throttle(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }
    
    // Exponer función global para uso manual
    window.trackConversion = trackConversion;
    window.CONVERSION_EVENTS = CONVERSION_EVENTS;
    
})();

