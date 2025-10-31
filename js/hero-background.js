/**
 * HERO BACKGROUND - Partículas y conexiones animadas (ULTRA OPTIMIZADO)
 * Fondo épico con partículas conectadas y efecto mouse
 * Optimizado para mobile y bajo consumo de recursos
 */

(function() {
    'use strict';
    
    // Detección de capacidades del dispositivo
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsRAF = 'requestAnimationFrame' in window;
    
    // No inicializar en mobile o si se prefiere reducir movimiento
    if (isMobile || prefersReducedMotion || !supportsRAF) {
        console.log('⚡ Hero background desactivado (mobile/reduced motion)');
        return;
    }
    
    class HeroBackground {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.isTabActive = true;
            this.isAnimating = false;
            this.animationId = null;
            
            // Crear canvas para el fondo
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'hero-background-canvas';
            this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;';
            
            // Insertar al principio del contenedor
            this.container.insertBefore(this.canvas, this.container.firstChild);
            
            this.ctx = this.canvas.getContext('2d', { 
                alpha: true, 
                desynchronized: true // Mejor performance
            });
            
            this.particles = [];
            this.mouse = { x: null, y: null, radius: 150 }; // Radio reducido
            
            // Reducir partículas para mejor performance
            this.particleCount = 100; // Reducido de 250
            
            this.init();
        }
        
        init() {
            this.resize();
            this.createParticles();
            this.setupEventListeners();
            
            this.isAnimating = true;
            this.animate();
            
            console.log('🌟 Hero Background iniciado (optimizado)');
        }
        
        setupEventListeners() {
            // Resize con debounce
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => this.resize(), 250);
            }, { passive: true });
            
            // Visibility change para pausar cuando no está visible
            document.addEventListener('visibilitychange', () => {
                this.isTabActive = !document.hidden;
            });
            
            // Mouse tracking con throttle
            let mouseTimeout;
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.addEventListener('mousemove', (e) => {
                    if (mouseTimeout) return;
                    
                    mouseTimeout = setTimeout(() => {
                        const rect = this.canvas.getBoundingClientRect();
                        this.mouse.x = e.clientX - rect.left;
                        this.mouse.y = e.clientY - rect.top;
                        mouseTimeout = null;
                    }, 16); // ~60fps
                }, { passive: true });
                
                heroSection.addEventListener('mouseleave', () => {
                    this.mouse.x = null;
                    this.mouse.y = null;
                }, { passive: true });
            }
        }
        
        resize() {
            this.canvas.width = this.container.offsetWidth;
            this.canvas.height = this.container.offsetHeight;
        }
        
        createParticles() {
            this.particles = [];
            
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.3, // Velocidad reducida
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 1.5 + 0.5, // Tamaño reducido
                    originalVx: (Math.random() - 0.5) * 0.3,
                    originalVy: (Math.random() - 0.5) * 0.3
                });
            }
        }
        
        animate() {
            if (!this.isAnimating || !this.isTabActive) {
                this.animationId = requestAnimationFrame(() => this.animate());
                return;
            }
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Actualizar y dibujar partículas
            this.particles.forEach(particle => {
                this.updateParticle(particle);
                this.drawParticle(particle);
            });
            
            // Dibujar conexiones (optimizado)
            this.drawConnections();
            
            // Dibujar cursor interactivo (si hay mouse)
            if (this.mouse.x !== null) {
                this.drawMouseEffect();
            }
            
            this.animationId = requestAnimationFrame(() => this.animate());
        }
        
        updateParticle(particle) {
            // Movimiento
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebote en bordes
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Interacción con mouse (simplificada)
            if (this.mouse.x !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distSq = dx * dx + dy * dy;
                const radiusSq = this.mouse.radius * this.mouse.radius;
                
                if (distSq < radiusSq) {
                    const force = (radiusSq - distSq) / radiusSq;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * force * 0.3;
                    particle.vy += Math.sin(angle) * force * 0.3;
                } else {
                    // Volver a velocidad original
                    particle.vx += (particle.originalVx - particle.vx) * 0.03;
                    particle.vy += (particle.originalVy - particle.vy) * 0.03;
                }
            }
            
            // Limitar velocidad
            const speedSq = particle.vx * particle.vx + particle.vy * particle.vy;
            const maxSpeedSq = 4; // 2^2
            if (speedSq > maxSpeedSq) {
                const speed = Math.sqrt(speedSq);
                particle.vx = (particle.vx / speed) * 2;
                particle.vy = (particle.vy / speed) * 2;
            }
        }
        
        drawParticle(particle) {
            // Dibujar partícula (simplificado, sin glow para mejor performance)
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(155, 97, 164, 0.6)';
            this.ctx.fill();
        }
        
        drawConnections() {
            const maxDistance = 120; // Reducido para menos cálculos
            const maxDistanceSq = maxDistance * maxDistance;
            
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    
                    // Early exit
                    if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance) continue;
                    
                    const distSq = dx * dx + dy * dy;
                    
                    if (distSq < maxDistanceSq) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - dist / maxDistance) * 0.25; // Opacidad reducida
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(155, 97, 164, ${opacity})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            }
            
            // Conexiones con el mouse (limitadas)
            if (this.mouse.x !== null) {
                let connections = 0;
                const maxConnections = 5; // Limitar conexiones con mouse
                
                for (let i = 0; i < this.particles.length && connections < maxConnections; i++) {
                    const particle = this.particles[i];
                    const dx = particle.x - this.mouse.x;
                    const dy = particle.y - this.mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const radiusSq = this.mouse.radius * this.mouse.radius;
                    
                    if (distSq < radiusSq) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - dist / this.mouse.radius) * 0.4;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(this.mouse.x, this.mouse.y);
                        this.ctx.strokeStyle = `rgba(4, 199, 170, ${opacity})`;
                        this.ctx.lineWidth = 1.5;
                        this.ctx.stroke();
                        
                        connections++;
                    }
                }
            }
        }
        
        drawMouseEffect() {
            // Anillo simple (sin animación de pulso para mejor performance)
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, 15, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(4, 199, 170, 0.4)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Círculo interior
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(4, 199, 170, 0.6)';
            this.ctx.fill();
        }
        
        destroy() {
            this.isAnimating = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    }
    
    // Inicializar cuando el DOM esté listo
    function init() {
        const container = document.querySelector('.hero');
        if (container && !window.heroBackground) {
            window.heroBackground = new HeroBackground('hero');
        }
    }
    
    // Iniciar después del preloader
    window.addEventListener('preloaderComplete', () => {
        setTimeout(init, 100);
    });
    
    // Fallback
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(init, 100);
        });
    } else {
        setTimeout(init, 100);
    }
    
})();
