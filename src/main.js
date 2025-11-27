import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { flattenJSON } from "three/src/animation/AnimationUtils.js";

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
// parameters
const parameters = {};
parameters.count = 1000;
parameters.size = 0.02;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;

// galaxy
const generateGalaxy = () => {
  // Geometry
  const geometry = new THREE.BufferGeometry();
  const position = new Float32Array(parameters.count * 3);
  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    position[i3 + 0] = (Math.random() - 0.5) * 3;
    position[i3 + 1] = (Math.random() - 0.5) * 3;
    position[i3 + 2] = (Math.random() - 0.5) * 3;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));

  // Material

  const material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: "blue",
  });

  // Points

  const points = new THREE.Points(geometry, material);
  scene.add(points);
};
generateGalaxy();

scene.add(camera);

// Canvas
const canvas = document.querySelector("#canvas");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Debug
const gui = new dat.GUI();

// Resize listener
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animate
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
