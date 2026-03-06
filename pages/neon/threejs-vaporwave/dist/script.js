/* CONFIG */
const VELOCITY = 0.5;
const CUBE_QTY = 600;
const CUBE_AREA = [-90, 90];
const CUBE_MATERIALS = [
  new THREE.MeshPhongMaterial({ color: 0x9900f8 }),
  new THREE.MeshBasicMaterial({ color: 0x5abbb9, wireframe: true })
];

/* METHODS */
function getRandomNumber(min = 0, max = 1) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function setRandomCubeLocation(cube) {
  cube.position.x = getRandomNumber(...CUBE_AREA);
  cube.position.y = getRandomNumber(...CUBE_AREA);
  cube.position.z = getRandomNumber(...CUBE_AREA);
}

function getCube() {
  const geometry = new THREE.BoxGeometry();
  const material = CUBE_MATERIALS[getRandomNumber(0, 1)];
  const cube = new THREE.Mesh(geometry, material);

  setRandomCubeLocation(cube);

  return cube;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cubes.forEach((cube) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.position.z += VELOCITY;

    if (cube.position.z > 5) {
      setRandomCubeLocation(cube);
    }
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* SETUP */
const renderer = new THREE.WebGLRenderer({ alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app").appendChild(renderer.domElement);
window.addEventListener("resize", onWindowResize, false);

{
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 3, 5);
  scene.add(light);
}

{
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, -3, 5);
  scene.add(light);
}

const cubes = Array(CUBE_QTY)
  .fill()
  .map(() => getCube());

cubes.forEach((cube) => scene.add(cube));

animate();