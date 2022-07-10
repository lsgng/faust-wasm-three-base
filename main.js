import * as THREE from "https://unpkg.com/three@0.142.0/build/three.module.js";

async function initThree() {
  const fragmentShaderResponse = await fetch("shader.frag");
  const fragmentShader = await fragmentShaderResponse.text();

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
    time: { value: Date.now() },
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

  const clock = new THREE.Clock();

  function render() {
    uniforms.time.value = clock.getElapsedTime();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}

async function initAudio() {
  const audioContext = new AudioContext();

  const node = await new FaustDSP(audioContext, ".").load();
  node.connect(audioContext.destination);

  document.addEventListener("mousemove", (event) => {
    node.setParamValue("/DSP/mouseX", event.clientX / window.innerWidth);
    node.setParamValue("/DSP/mouseY", event.clientY / window.innerHeight);
  });
}

function init() {
  initAudio();
  initThree();
}

document.addEventListener("click", init);
