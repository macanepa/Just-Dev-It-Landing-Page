/**
 * Hero 3D Animation - Just Dev It
 * Animación 3D única usando Canvas con partículas inteligentes
 */

class Hero3DAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.animationId = null;
        
        // Configuración
        this.config = {
            particleCount: 80,
            particleSize: { min: 2, max: 4 },
            speed: { min: 0.3, max: 0.8 },
            connectionDistance: 120,
            colors: {
                primary: '#9B61A4',
                secondary: '#04C7AA',
                accent: '#B37BBF'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas.style.display = 'block';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);
        
        this.resize();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        // Ajustar para pantallas de alta densidad
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        // Recrear partículas en el nuevo tamaño
        this.createParticles();
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    drawConnections() {
        this.connections = [];
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(155, 97, 164, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Dibujar conexiones primero (para que estén detrás)
        this.drawConnections();
        
        // Actualizar y dibujar partículas
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

class Particle {
    constructor(animation) {
        this.animation = animation;
        this.ctx = animation.ctx;
        this.config = animation.config;
        
        this.reset();
        
        // Propiedades de animación
        this.vx = (Math.random() - 0.5) * this.speed;
        this.vy = (Math.random() - 0.5) * this.speed;
        
        // Efecto de pulsación
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    reset() {
        this.x = Math.random() * this.animation.width;
        this.y = Math.random() * this.animation.height;
        this.baseSize = this.config.particleSize.min + 
                       Math.random() * (this.config.particleSize.max - this.config.particleSize.min);
        this.size = this.baseSize;
        this.speed = this.config.speed.min + 
                    Math.random() * (this.config.speed.max - this.config.speed.min);
        
        // Color aleatorio entre los colores de marca
        const colors = Object.values(this.config.colors);
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        // Movimiento base
        this.x += this.vx;
        this.y += this.vy;
        
        // Rebote en los bordes
        if (this.x < 0 || this.x > this.animation.width) {
            this.vx = -this.vx;
            this.x = Math.max(0, Math.min(this.animation.width, this.x));
        }
        if (this.y < 0 || this.y > this.animation.height) {
            this.vy = -this.vy;
            this.y = Math.max(0, Math.min(this.animation.height, this.y));
        }
        
        // Interacción con el mouse
        if (this.animation.mouse.x !== null && this.animation.mouse.y !== null) {
            const dx = this.animation.mouse.x - this.x;
            const dy = this.animation.mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.animation.mouse.radius) {
                const force = (this.animation.mouse.radius - distance) / this.animation.mouse.radius;
                const angle = Math.atan2(dy, dx);
                
                // Repeler partículas desde el mouse
                this.vx -= Math.cos(angle) * force * 0.5;
                this.vy -= Math.sin(angle) * force * 0.5;
            }
        }
        
        // Aplicar fricción
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Limitar velocidad
        const maxSpeed = this.speed * 2;
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > maxSpeed) {
            this.vx = (this.vx / currentSpeed) * maxSpeed;
            this.vy = (this.vy / currentSpeed) * maxSpeed;
        }
        
        // Efecto de pulsación
        this.pulsePhase += this.pulseSpeed;
        this.size = this.baseSize + Math.sin(this.pulsePhase) * 0.5;
    }
    
    draw() {
        // Crear gradiente radial
        const gradient = this.ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.hexToRgba(this.color, 0.5));
        gradient.addColorStop(1, this.hexToRgba(this.color, 0));
        
        this.ctx.beginPath();
        this.ctx.fillStyle = gradient;
        this.ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Núcleo brillante
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// Variante alternativa: Forma geométrica central que gira
class GeometricAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.rotation = 0;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    setupCanvas() {
        this.canvas.style.display = 'block';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);
        
        this.resize();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
    }
    
    drawPolygon(x, y, radius, sides, rotation) {
        this.ctx.beginPath();
        
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i / sides) + rotation;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        
        this.ctx.closePath();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const baseSize = Math.min(this.width, this.height) * 0.3;
        
        this.rotation += 0.005;
        
        // Dibujar múltiples formas concéntricas
        for (let i = 0; i < 3; i++) {
            const size = baseSize - (i * 40);
            const sides = 6 + i;
            const rotation = this.rotation + (i * 0.5);
            const opacity = 0.3 - (i * 0.1);
            
            // Gradiente
            const gradient = this.ctx.createLinearGradient(
                centerX - size, centerY - size,
                centerX + size, centerY + size
            );
            gradient.addColorStop(0, `rgba(155, 97, 164, ${opacity})`);
            gradient.addColorStop(1, `rgba(4, 199, 170, ${opacity})`);
            
            this.drawPolygon(centerX, centerY, size, sides, rotation);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Inicialización
const initHeroAnimation = (containerId = 'hero-3d-container', type = 'particles') => {
    if (type === 'geometric') {
        return new GeometricAnimation(containerId);
    }
    return new Hero3DAnimation(containerId);
};

export { initHeroAnimation, Hero3DAnimation, GeometricAnimation };
export default initHeroAnimation;
