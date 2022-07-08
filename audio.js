async function initAudio() {
  const audioContext = new AudioContext();

  const dsp = await new FaustDSP(audioContext, ".").load();

  dsp.connect(audioContext.destination);

  document.addEventListener("mousemove", (event) => {
    dsp.setParamValue("/DSP/mouseX", event.clientX / window.innerWidth);
    dsp.setParamValue("/DSP/mouseY", event.clientY / window.innerHeight);
  });
}

document.addEventListener("click", initAudio);