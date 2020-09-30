let on = document.getElementById("on");
let off = document.getElementById("off");


let context = new AudioContext();
console.log(context);

let oscillator = context.createOscillator();
oscillator.type = "triangle";
oscillator.frequency.value = 440;

let gain = context.createGain();

oscillator.connect(gain);
gain.connect(context.destination);
oscillatorStarted = 0;

on.addEventListener("click",()=>{
  if(oscillatorStarted == 0){
    oscillator.start(0);
    oscillatorStarted = 1;
  }
  gain.gain.value = 1;
})

off.addEventListener("click",()=>{
  gain.gain.value= 0;
})
