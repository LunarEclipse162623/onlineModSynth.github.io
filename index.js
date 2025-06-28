  console.log("JS init")
  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");

  // Setup analyser
  const analyser = new Tone.Analyser("waveform", 256);

  // Setup synth
  const synth = new Tone.Synth();
  synth.connect(analyser);
  analyser.connect(Tone.Destination);

  // Get slider elements
  const hzInput = document.getElementById("hzInput");
  const releaseInput = document.getElementById("releaseInput");
  const hzValue = document.getElementById("hzValue");
  const releaseValue = document.getElementById("releaseValue");

  let hz = parseFloat(hzInput.value);
  let release = parseFloat(releaseInput.value);

  // Update values on input
  hzInput.oninput = function() {
    hz = parseFloat(this.value);
    hzValue.textContent = hz;
  };
  releaseInput.oninput = function() {
    release = parseFloat(this.value);
    releaseValue.textContent = release;
  };

  // Resize canvas to full width
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 200;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Draw visualizer
  function draw() {
    requestAnimationFrame(draw);
    const values = analyser.getValue();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    const sliceWidth = canvas.width / values.length;
    values.forEach((val, i) => {
      const x = i * sliceWidth;
      const y = (val + 1) * canvas.height / 2;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  draw();

  // Key press to play sound
  document.addEventListener("keydown", async function(event) {
    if (event.code === "Space") {
      await Tone.start(); // Needed for browser autoplay policy
      const now = Tone.now();
      synth.triggerAttack(hz, now);
      synth.triggerRelease(now + release);
    }
  });