var hzInput = document.getElementById("hzInput");
var releaseInput = document.getElementById("releaseInput");
var hz;
var release;

// Update the current slider value (each time you drag the slider handle)
hzInput.oninput = function() {
  hz = this.value
}
releaseInput.oninput = function() {
  release = parseInt(this.value)
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    // trigger the attack immediately
    synth.triggerAttack(hz, now);
    // wait one second before triggering the release
    synth.triggerRelease(now + release); 
  }
});

