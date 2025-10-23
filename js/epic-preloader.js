/**
 * EPIC PRELOADER - Just Dev It
 * Experiencia de carga cinematográfica con contador animado
 */

(function() {
    'use strict';
    
    // Crear estructura del preloader
    const preloaderHTML = `
        <div id="epic-preloader" class="epic-preloader">
            <div class="preloader-background">
                <canvas id="preloader-canvas"></canvas>
            </div>
            
            <div class="preloader-content">
                <div class="preloader-logo" id="preloader-3d-logo">
                    <!-- Logo 3D se renderizará aquí -->
                </div>
                
                <div class="preloader-counter">
                    <span class="counter-number">0</span>
                    <span class="counter-percent">%</span>
                </div>
                
                <div class="preloader-bar">
                    <div class="preloader-bar-fill"></div>
                </div>
                
                <div class="preloader-text">
                    <span class="loading-text">Cargando experiencia</span>
                    <span class="loading-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                </div>
            </div>
        </div>
    `;
    
    // Inyectar HTML al inicio del body
    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
        
        // Esperar a que Three.js esté disponible
        waitForThreeJS().then(() => {
            initPreloader();
        });
    });
    
    // Esperar Three.js
    function waitForThreeJS() {
        return new Promise((resolve) => {
            if (typeof THREE !== 'undefined') {
                resolve();
            } else {
                const interval = setInterval(() => {
                    if (typeof THREE !== 'undefined') {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            }
        });
    }
    
    function initPreloader() {
        const preloader = document.getElementById('epic-preloader');
        const canvas = document.getElementById('preloader-canvas');
        const ctx = canvas.getContext('2d');
        const counter = document.querySelector('.counter-number');
        const barFill = document.querySelector('.preloader-bar-fill');
        const logoContainer = document.getElementById('preloader-3d-logo');
        
        // Setup canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Inicializar logo 3D
        init3DLogo(logoContainer);
        
        // Partículas de fondo
        const particles = [];
        const particleCount = 100;
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.radius = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(155, 97, 164, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Crear partículas
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animación de partículas
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        // Función para crear logo 3D en el preloader
        function init3DLogo(container) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            camera.position.z = 80;
            
            const renderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true 
            });
            renderer.setSize(300, 300);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);
            
            // Luces
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            const directionalLight1 = new THREE.DirectionalLight(0x9B61A4, 0.8);
            directionalLight1.position.set(5, 5, 5);
            scene.add(directionalLight1);
            
            const directionalLight2 = new THREE.DirectionalLight(0x04C7AA, 0.6);
            directionalLight2.position.set(-5, -5, 5);
            scene.add(directionalLight2);
            
            // Grupo para el logo
            const logoGroup = new THREE.Group();
            scene.add(logoGroup);
            
            // Cargar OBJ
            const loader = new THREE.OBJLoader();
            loader.load(
                'assets/3d_models/tinker.obj',
                (object) => {
                    const material = new THREE.MeshPhongMaterial({
                        color: 0x9B61A4,
                        emissive: 0x04C7AA,
                        emissiveIntensity: 0.3,
                        shininess: 100,
                        specular: 0xffffff,
                        side: THREE.DoubleSide
                    });
                    
                    object.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.material = material;
                        }
                    });
                    
                    // Centrar y escalar (2x más grande)
                    const box = new THREE.Box3().setFromObject(object);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 60 / maxDim;
                    
                    object.scale.set(scale, scale, scale);
                    object.position.sub(center.multiplyScalar(scale));
                    
                    logoGroup.add(object);
                },
                undefined,
                (error) => {
                    console.error('Error cargando logo:', error);
                }
            );
            
            // Animar logo 3D
            function animate3DLogo() {
                requestAnimationFrame(animate3DLogo);
                logoGroup.rotation.y += 0.015;
                logoGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
                renderer.render(scene, camera);
            }
            animate3DLogo();
        }
        
        // Simular carga con progreso real
        let progress = 0;
        const duration = 1500; // 1.5 segundos para mejor Web Vitals
        const startTime = Date.now();
        
        function updateProgress() {
            const elapsed = Date.now() - startTime;
            progress = Math.min((elapsed / duration) * 100, 100);
            
            // Efecto de easing
            const easedProgress = easeOutCubic(progress / 100) * 100;
            
            // Actualizar contador
            counter.textContent = Math.floor(easedProgress);
            
            // Actualizar barra
            barFill.style.width = easedProgress + '%';
            
            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                finishLoading();
            }
        }
        
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        
        // Iniciar progreso
        setTimeout(() => {
            updateProgress();
        }, 300);
        
        function finishLoading() {
            // Animación de salida épica
            preloader.classList.add('loaded');
            
            setTimeout(() => {
                // Ocultar completamente
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                preloader.style.display = 'none';
                
                // Eliminar del DOM
                setTimeout(() => {
                    if (preloader && preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                }, 100);
                
                document.body.classList.add('loaded');
                
                // Trigger evento personalizado
                window.dispatchEvent(new CustomEvent('preloaderComplete'));
                console.log('✅ Preloader completado y eliminado');
            }, 500); // Reducido de 800ms a 500ms
        }
    }
    
})();
