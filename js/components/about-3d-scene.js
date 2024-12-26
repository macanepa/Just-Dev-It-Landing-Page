// Configuración inicial de Three.js
let scene, camera, renderer, geometry, material, mesh;
let particles = [];

function init() {
    // Crear escena
    scene = new THREE.Scene();
    
    // Configurar cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Configurar renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth / 2, 500);
    renderer.setClearColor(0x000000, 0);
    
    // Añadir renderer al contenedor
    const container = document.getElementById('3d-container');
    container.appendChild(renderer.domElement);
    
    // Crear geometría base - Dodecaedro
    geometry = new THREE.DodecahedronGeometry(1, 0);
    material = new THREE.MeshPhongMaterial({
        color: 0x04C7AA,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Añadir partículas orbitando
    for (let i = 0; i < 50; i++) {
        const particle = createParticle();
        particles.push(particle);
        scene.add(particle);
    }
    
    // Iluminación
    const light1 = new THREE.PointLight(0x04C7AA, 1);
    light1.position.set(2, 2, 2);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x9B61A4, 1);
    light2.position.set(-2, -2, -2);
    scene.add(light2);
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Event listener para resize
    window.addEventListener('resize', onWindowResize, false);
    
    // Iniciar animación
    animate();
}

function createParticle() {
    const geometry = new THREE.SphereGeometry(0.02, 8, 8);
    const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x04C7AA : 0x9B61A4,
        transparent: true,
        opacity: 0.6
    });
    const particle = new THREE.Mesh(geometry, material);
    
    // Posición aleatoria en una esfera
    const radius = 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
    particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
    particle.position.z = radius * Math.cos(phi);
    
    // Velocidad de rotación aleatoria
    particle.userData = {
        rotationSpeed: Math.random() * 0.02 + 0.01,
        radius: radius,
        theta: theta
    };
    
    return particle;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotar figura central
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    
    // Animar partículas
    particles.forEach(particle => {
        particle.userData.theta += particle.userData.rotationSpeed;
        particle.position.x = particle.userData.radius * Math.cos(particle.userData.theta);
        particle.position.z = particle.userData.radius * Math.sin(particle.userData.theta);
        particle.rotation.y += 0.02;
    });
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, 500);
}