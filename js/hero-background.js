/**
 * HERO BACKGROUND - Partículas y conexiones animadas
 * Fondo épico con partículas conectadas y efecto mouse
 */

(function() {
    'use strict';
    
    class HeroBackground {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            // Crear canvas para el fondo
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'hero-background-canvas';
            this.canvas.style.position = 'absolute';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.zIndex = '1';
            this.canvas.style.pointerEvents = 'none';
            
            // Insertar al principio del contenedor
            this.container.insertBefore(this.canvas, this.container.firstChild);
            
            this.ctx = this.canvas.getContext('2d');
            
            this.particles = [];
            this.mouse = { x: null, y: null, radius: 200 };
            
            // Ajustar cantidad de partículas según el tamaño de la pantalla
            const isMobile = window.innerWidth < 768;
            this.particleCount = isMobile ? 80 : 250; // Menos partículas en mobile para mejor performance
            
            this.init();
        }
        
        init() {
            this.resize();
            this.createParticles();
            
            window.addEventListener('resize', () => {
                this.resize();
                // Recrear partículas al cambiar de tamaño para ajustar cantidad
                const isMobile = window.innerWidth < 768;
                const newCount = isMobile ? 80 : 250;
                if (newCount !== this.particleCount) {
                    this.particleCount = newCount;
                    this.createParticles();
                }
            });
            
            // Mouse tracking en el hero completo
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.addEventListener('mousemove', (e) => {
                    const rect = this.canvas.getBoundingClientRect();
                    this.mouse.x = e.clientX - rect.left;
                    this.mouse.y = e.clientY - rect.top;
                });
                
                heroSection.addEventListener('mouseleave', () => {
                    this.mouse.x = null;
                    this.mouse.y = null;
                });
            }
            
            this.animate();
            console.log('🌟 Hero Background iniciado');
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
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    originalVx: (Math.random() - 0.5) * 0.5,
                    originalVy: (Math.random() - 0.5) * 0.5
                });
            }
        }
        
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Actualizar y dibujar partículas
            this.particles.forEach(particle => {
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
                
                // Interacción con mouse - repeler partículas
                if (this.mouse.x !== null) {
                    const dx = particle.x - this.mouse.x;
                    const dy = particle.y - this.mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.mouse.radius) {
                        const force = (this.mouse.radius - distance) / this.mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        particle.vx += Math.cos(angle) * force * 0.5;
                        particle.vy += Math.sin(angle) * force * 0.5;
                    } else {
                        // Volver a velocidad original suavemente
                        particle.vx += (particle.originalVx - particle.vx) * 0.05;
                        particle.vy += (particle.originalVy - particle.vy) * 0.05;
                    }
                }
                
                // Limitar velocidad
                const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                if (speed > 2) {
                    particle.vx = (particle.vx / speed) * 2;
                    particle.vy = (particle.vy / speed) * 2;
                }
                
                // Dibujar partícula
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(155, 97, 164, 0.6)';
                this.ctx.fill();
                
                // Glow
                const gradient = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.radius * 3
                );
                gradient.addColorStop(0, 'rgba(155, 97, 164, 0.4)');
                gradient.addColorStop(1, 'rgba(155, 97, 164, 0)');
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            });
            
            // Dibujar conexiones
            this.drawConnections();
            
            // Dibujar cursor interactivo
            if (this.mouse.x !== null) {
                this.drawMouseEffect();
            }
            
            requestAnimationFrame(() => this.animate());
        }
        
        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Aumentado de 120 a 150 para más conexiones
                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.35;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(155, 97, 164, ${opacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
            
            // Conexiones adicionales con el mouse
            if (this.mouse.x !== null) {
                this.particles.forEach(particle => {
                    const dx = particle.x - this.mouse.x;
                    const dy = particle.y - this.mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.mouse.radius) {
                        const opacity = (1 - distance / this.mouse.radius) * 0.6;
                        
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(this.mouse.x, this.mouse.y);
                        this.ctx.strokeStyle = `rgba(4, 199, 170, ${opacity})`;
                        this.ctx.lineWidth = 2;
                        this.ctx.stroke();
                    }
                });
            }
        }
        
        drawMouseEffect() {
            // Anillo pulsante alrededor del cursor
            const time = Date.now() * 0.003;
            const radius = 20 + Math.sin(time) * 5;
            
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(4, 199, 170, 0.4)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Círculo interior
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(4, 199, 170, 0.6)';
            this.ctx.fill();
        }
        
        destroy() {
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
