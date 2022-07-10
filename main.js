import * as THREE from "https://unpkg.com/three@0.142.0/build/three.module.js";

const ANALYSER_FFT_SIZE = 1024;

async function initAudio() {
  const audioContext = new AudioContext();

  const node = await new FaustDSP(audioContext, ".").load();
  node.connect(audioContext.destination);

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = ANALYSER_FFT_SIZE;
  node.connect(analyser);

  document.addEventListener("mousemove", (event) => {
    node.setParamValue("/DSP/mouseX", event.clientX / window.innerWidth);
    node.setParamValue("/DSP/mouseY", event.clientY / window.innerHeight);
  });

  return analyser;
}

async function initThree(analyser) {
  const fragmentShaderResponse = await fetch("shader.frag");
  const fragmentShader = await fragmentShaderResponse.text();

  const clock = new THREE.Clock();
  const frequenyData = new Uint8Array(analyser.frequencyBinCount);

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
    time: { value: Date.now() },
    amplitude: { value: 0 },
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
    uniforms.time.value = clock.getElapsedTime();

    analyser.getByteFrequencyData(frequenyData);
    const amplitude = frequenyData[20] / 255;
    uniforms.amplitude.value = amplitude;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}

async function init() {
  const analyser = await initAudio();
  initThree(analyser);
}

init();
