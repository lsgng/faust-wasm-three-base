import * as THREE from "three";

function initThree(fragmentShader) {
  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const uniforms = {
    resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    mouse: {
      value: new THREE.Vector2(0.0, 0.0),
    },
  };

  const geometry = new THREE.PlaneBufferGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms,
    fragmentShader,
  });

  const background = new THREE.Mesh(geometry, material);
  scene.add(background);

  window.addEventListener(
    "mousemove",
    (event) => {
      uniforms.mouse.value.x = event.clientX / window.innerWidth;
      uniforms.mouse.value.y = event.clientY / window.innerHeight;
    },
    false
  );

  window.addEventListener(
    "resize",
    () => {
      uniforms.resolution.value.x = window.innerWidth;
      uniforms.resolution.value.y = window.innerHeight;
    },
    false
  );

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}

const loader = new THREE.FileLoader();
loader.load("shader.frag", initThree);
