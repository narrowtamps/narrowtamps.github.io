// Initialize the scene, camera, and renderer with anti-aliasing
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xFFFFFF, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create geometry and material for the d20 dice
const geometry = new THREE.IcosahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });

// Create the mesh and add it to the scene
const d20 = new THREE.Mesh(geometry, material);
scene.add(d20);

// Create geometry for the edges
const edges = new THREE.EdgesGeometry(geometry);

// Create multiple lines to simulate thick edges
const lines = [];
for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
        if (i === 0 && j === 0) continue;
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
        const edgeMesh = new THREE.LineSegments(edges, edgeMaterial);
        edgeMesh.position.x = i * 0.005;
        edgeMesh.position.y = j * 0.005;
        scene.add(edgeMesh);
        lines.push(edgeMesh);
    }
}

camera.position.z = 5;

// Animation loop for rotation
function animate() {
    requestAnimationFrame(animate);

    d20.rotation.x += 0.01;
    d20.rotation.y += 0.01;
    lines.forEach(line => {
        line.rotation.x += 0.01;
        line.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add OrbitControls for interactivity
const controls = new THREE.OrbitControls(camera, renderer.domElement);