import("stdfaust.lib");

freqA = hslider("mouseX", 0.0, 0.0, 1.0, 0.0001);
freqB = hslider("mouseY", 0.0, 0.0, 1.0, 0.0001);

process = os.osc(freqA * 1000 + 100) * 0.5, os.osc(freqB  * 1000 + 100) * 0.5;
