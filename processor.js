class WhiteNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = (event) => this.onmessage(event.data);
    this.wasmProcess = undefined;
  }

  onmessage(event) {
    if (event.type === "send-wasm-module") {
      WebAssembly.compile(event.wasmBytes).then((module) =>
        WebAssembly.instantiate(module).then((instance) => {
          console.log(instance);
        })
      );
    }
  }

  process(_, outputs) {
    const output = outputs[0];
    output.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        if (this.wasmProcess) {
          const sig = this.wasmProcess();
          channel[i] = sig;
        } else {
          channel[i] = 0;
        }
      }
    });

    return true;
  }
}

registerProcessor("wasm-processor", WhiteNoiseProcessor);
