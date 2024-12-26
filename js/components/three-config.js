function init3DObject() {
    const scene = new THREE.Scene();

    // Replace PerspectiveCamera with OrthographicCamera
    // Parameters: left, right, top, bottom, near, far
    const frustumSize = 100;
    const aspect = 0.85;
    const camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -5,
        frustumSize * aspect / 5,
        frustumSize / 5,
        frustumSize / -5,
        1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    // Enable depth and blur effects
    renderer.autoClear = false;

    const container = document.getElementById('3d-container');
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create the blur + transparency material
    const blurMaterial = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse: { value: null },
            // opacity: { value: 0.35 },
            blurAmount: { value: 0.15 },
            baseColor: { value: new THREE.Color('#9b61a4') }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
                vUv = uv;
                vPosition = position;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float opacity;
            uniform float blurAmount;
            uniform vec3 baseColor;
            
            varying vec2 vUv;
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
                vec3 viewDir = normalize(cameraPosition - vPosition);
                float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.0);
                
                // Enhanced blur based on view angle
                float blurFactor = fresnel * blurAmount * 2.0;
                
                // Enhanced blur effect
                float distanceBlur = length(vPosition) * 0.02;
                blurFactor += distanceBlur;
                
                // Combine color with enhanced fresnel and blur
                vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.6);
                float finalOpacity = opacity + fresnel * 0.4;
                
                gl_FragColor = vec4(finalColor, finalOpacity);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });

    // Create dotted line material for edges
    const edgeMaterial = new THREE.LineDashedMaterial({
        color: 0x9b61a4,
        linewidth: 2,
        scale: 2,
        dashSize: 2,
        gapSize: 2,
        opacity: 1,
        transparent: true,
        depthWrite: false
    });

    // Initialize the loader
    if (typeof THREE.OBJLoader === 'undefined') {
        console.error('OBJLoader not loaded properly');
        return;
    }
    const loader = new THREE.OBJLoader();

    // Load the model
    loader.load(
        'assets/3d_models/tinker.obj',
        function (object) {
            object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    const geometry = child.geometry;

                    // Create blurred transparent faces
                    const meshObject = new THREE.Mesh(geometry, blurMaterial);

                    // Create edges for both front and back
                    const edgesGeometry = new THREE.EdgesGeometry(geometry, 15);
                    const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);
                    edges.computeLineDistances();

                    // Add both to the scene
                    child.parent.add(meshObject);
                    child.parent.add(edges);
                    child.parent.remove(child);
                }
            });

            scene.add(object);

            // Center the model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            object.position.sub(center);

            // Adjust scale for orthographic view
            const scale = 0.15;  // Reduced scale for orthographic view
            object.scale.set(scale, scale, scale);

            window.modelObject = object;
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error occurred loading the model:', error);
        }
    );

    // Enhanced lighting for better depth perception
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    // Add rim light for better edge visibility
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(-1, 0, -1);
    scene.add(rimLight);

    // Adjust camera position for orthographic view
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    // Add time variable for animation
    let time = 0;
    const amplitude = 0.2; // Maximum rotation angle in radians
    const frequency = 0.02; // Speed of oscillation

    function animate() {
        requestAnimationFrame(animate);
        time += 1;

        if (window.modelObject) {
            // Create smooth oscillation using sine waves
            window.modelObject.rotation.x = amplitude * Math.sin(frequency * time);
            window.modelObject.rotation.y = amplitude * Math.sin(frequency * time * 0.5);
        }

        // Clear and render with blur
        renderer.clear();
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const aspect = width / height;

        // Update orthographic camera on resize
        const frustumSize = 100;
        camera.left = -frustumSize * aspect / 2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = -frustumSize / 2;

        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    animate();
}