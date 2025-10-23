/**
 * LOGO 3D ANIMATION - Just Dev It
 * Animación del logo 3D con Three.js - Ligera y profesional
 */

(function() {
    'use strict';
    
    class Logo3DAnimation {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) {
                console.error('❌ Container not found:', containerId);
                return;
            }
            
            console.log('✅ Iniciando Logo 3D Animation...');
            
            this.isRunning = false;
            this.baseRotationY = 0; // Rotación base continua
            
            this.init();
        }
        
        init() {
            // Configurar Three.js
            this.setupThreeJS();
            
            // Cargar logo
            this.loadLogo();
            
            // Event listeners
            this.setupEventListeners();
            
            // Iniciar animación
            this.isRunning = true;
            this.animate();
            
            console.log('🎨 Logo 3D Animation iniciada');
        }
        
        setupThreeJS() {
            // Scene
            this.scene = new THREE.Scene();
            this.scene.background = null; // Transparente
            
            // Camera
            const width = this.container.offsetWidth;
            const height = this.container.offsetHeight;
            this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            this.camera.position.z = 150;
            
            // Renderer con alpha para transparencia
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true,
                preserveDrawingBuffer: true
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setClearColor(0x000000, 0); // Fondo transparente
            this.container.appendChild(this.renderer.domElement);
            
            // Luces
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            this.scene.add(ambientLight);
            
            const directionalLight1 = new THREE.DirectionalLight(0x9B61A4, 0.8);
            directionalLight1.position.set(5, 5, 5);
            this.scene.add(directionalLight1);
            
            const directionalLight2 = new THREE.DirectionalLight(0x04C7AA, 0.6);
            directionalLight2.position.set(-5, -5, 5);
            this.scene.add(directionalLight2);
            
            const pointLight = new THREE.PointLight(0x9B61A4, 1, 100);
            pointLight.position.set(0, 0, 50);
            this.scene.add(pointLight);
        }
        
        loadLogo() {
            // Crear grupo para el logo
            this.logoGroup = new THREE.Group();
            this.scene.add(this.logoGroup);
            
            // Cargar OBJ
            const loader = new THREE.OBJLoader();
            
            loader.load(
                'assets/3d_models/tinker.obj',
                (object) => {
                    console.log('✅ Logo cargado exitosamente');
                    
                    // Material con gradiente y brillo
                    const material = new THREE.MeshPhongMaterial({
                        color: 0x9B61A4,
                        emissive: 0x04C7AA,
                        emissiveIntensity: 0.2,
                        shininess: 100,
                        specular: 0xffffff,
                        side: THREE.DoubleSide
                    });
                    
                    // Aplicar material a todas las meshes
                    object.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.material = material;
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    
                    // Centrar y escalar
                    const box = new THREE.Box3().setFromObject(object);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 60 / maxDim;
                    
                    object.scale.set(scale, scale, scale);
                    object.position.sub(center.multiplyScalar(scale));
                    
                    this.logoGroup.add(object);
                    this.logo = object;
                    
                    // Añadir partículas orbitando
                    this.addOrbitingParticles();
                },
                (xhr) => {
                    const percent = (xhr.loaded / xhr.total) * 100;
                    console.log(`📦 Cargando logo: ${percent.toFixed(0)}%`);
                },
                (error) => {
                    console.error('❌ Error cargando logo:', error);
                    // Fallback: crear geometría simple
                    this.createFallbackGeometry();
                }
            );
        }
        
        createFallbackGeometry() {
            console.log('⚠️ Usando geometría de respaldo');
            
            // Crear un logo abstracto con formas geométricas
            const geometry = new THREE.TorusKnotGeometry(15, 3, 100, 16);
            const material = new THREE.MeshPhongMaterial({
                color: 0x9B61A4,
                emissive: 0x04C7AA,
                emissiveIntensity: 0.3,
                shininess: 100,
                specular: 0xffffff
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            this.logoGroup.add(mesh);
            this.logo = mesh;
            
            this.addOrbitingParticles();
        }
        
        addOrbitingParticles() {
            // Crear partículas orbitando el logo
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 50;
            const positions = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount; i++) {
                const angle = (i / particlesCount) * Math.PI * 2;
                const radius = 40 + Math.random() * 20;
                
                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
                positions[i * 3 + 2] = Math.sin(angle) * radius;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                color: 0x04C7AA,
                size: 2,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
            this.logoGroup.add(this.particles);
        }
        
        setupEventListeners() {
            // Resize
            window.addEventListener('resize', () => this.onResize());
        }
        
        onResize() {
            const width = this.container.offsetWidth;
            const height = this.container.offsetHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize(width, height);
        }
        
        animate() {
            if (!this.isRunning) return;
            
            requestAnimationFrame(() => this.animate());
            
            // Rotación continua suave
            this.baseRotationY += 0.008;
            
            // Aplicar rotación simple al logo
            if (this.logoGroup) {
                this.logoGroup.rotation.y = this.baseRotationY;
                
                // Oscilación sutil en X para dar vida
                this.logoGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
                
                // Oscilación muy sutil en Z
                this.logoGroup.rotation.z = Math.sin(Date.now() * 0.0003) * 0.05;
            }
            
            // Rotar partículas sutilmente en dirección opuesta
            if (this.particles) {
                this.particles.rotation.y = -this.baseRotationY * 0.3;
            }
            
            // Render
            this.renderer.render(this.scene, this.camera);
        }
        
        destroy() {
            this.isRunning = false;
            
            if (this.renderer) {
                this.renderer.dispose();
                if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                    this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
                }
            }
            
            console.log('🗑️ Logo 3D Animation destruida');
        }
    }
    
    // Verificar si Three.js está disponible
    function waitForThreeJS() {
        if (typeof THREE !== 'undefined') {
            initAnimation();
        } else {
            console.log('⏳ Esperando Three.js...');
            setTimeout(waitForThreeJS, 100);
        }
    }
    
    function initAnimation() {
        const container = document.getElementById('hero-3d-container');
        if (container && !window.logo3DAnimation) {
            window.logo3DAnimation = new Logo3DAnimation('hero-3d-container');
            console.log('🎨 Logo 3D Animation inicializada');
        }
    }
    
    // Inicialización después del preloader
    window.addEventListener('preloaderComplete', waitForThreeJS);
    
    // Fallback si no hay preloader
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(waitForThreeJS, 100);
        });
    } else {
        setTimeout(waitForThreeJS, 100);
    }
    
})();
