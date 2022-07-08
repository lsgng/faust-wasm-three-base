import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneBufferGeometry(2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
