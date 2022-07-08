import * as THREE from "three";

const loader = new THREE.FileLoader();
loader.load("shader.frag", initThree);

function initThree(fragmentShader) {
  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.PlaneBufferGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    },
    fragmentShader,
  });

  const background = new THREE.Mesh(geometry, material);
  scene.add(background);

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}
