slider = document.getElementById("voiceadjuster_fre");
slider_size = document.getElementById("voiceadjuster_size");
star_1 = document.getElementById("item01");
round = document.getElementById("round");
let rotate = 0;
let original_angle = 0;

let on = document.getElementById("on");
let off = document.getElementById("off");


let context = new AudioContext();
let destination  = context.destination;
console.log(context);

let oscillator = context.createOscillator();
oscillator.type = "triangle";
oscillator.frequency.value = 100;

let gain = context.createGain();

oscillator.connect(gain);
gain.connect(destination);
let oscillatorStarted = false;
let onclicked = false;


slider.addEventListener("input",function(){
  original_angle += 100;
  let slider_value = slider.value;
  star_1.style["animation-duration"] = (2-slider_value/50)+"s";
  oscillator.frequency.value = 100+ slider_value*10;
});

slider_size.addEventListener("input",function(){
  let current_size = slider_size.value;
  console.log(current_size);
  star_1.style["padding-top"] = current_size +"%";
  round.style["padding-top"] = current_size +"%";
  if (onclicked){
  gain.gain.value= current_size/50;
}
});

let context2 = new AudioContext();
let destination2  = context2.destination;

let oscillator2 = context2.createOscillator();
oscillator2.type = "triangle";
oscillator2.frequency.value = 200;

let gain2 = context2.createGain();

oscillator2.connect(gain2);
gain2.connect(destination2);

slider2 = document.getElementById("voiceadjuster_fre2");
slider_size2 = document.getElementById("voiceadjuster_size2");
star_2 = document.getElementById("item02");
round2 = document.getElementById("round2");

slider_size2.addEventListener("input",function(){
  let current_size2 = slider_size2.value;
  star_2.style["padding-left"] = current_size2 +"%";
  round2.style["padding-left"] = current_size2 +"%";
  if (onclicked){
  gain2.gain.value= current_size2/50;
}
});

slider2.addEventListener("input",function(){
  let slider_value2 = slider2.value;
  star_2.style["animation-duration"] = (2-slider_value2/50)+"s";
  oscillator2.frequency.value = 200+ slider_value2*10;
});



let context3 = new AudioContext();
let destination3  = context3.destination;

let oscillator3 = context3.createOscillator();
oscillator3.type = "triangle";
oscillator3.frequency.value = 300;

let gain3 = context3.createGain();

oscillator3.connect(gain3);
gain3.connect(destination3);

slider3 = document.getElementById("voiceadjuster_fre3");
slider_size3 = document.getElementById("voiceadjuster_size3");
star_3 = document.getElementById("item03");
round3 = document.getElementById("round3");

slider_size3.addEventListener("input",function(){
  let current_size3 = slider_size3.value;
  console.log(current_size3);
  star_3.style["padding-right"] = current_size3 +"%";
  round3.style["padding-right"] = current_size3 +"%";
  console.log(star_3.style["padding-right"]);
  if (onclicked){
  gain3.gain.value= current_size3/50;
}
});

slider3.addEventListener("input",function(){
  let slider_value3 = slider3.value;
  star_3.style["animation-duration"] = (2-slider_value3/50)+"s";
  oscillator3.frequency.value = 300+ slider_value3*10;
});

on.addEventListener("click",()=>{
  if(!oscillatorStarted){
    oscillator.start(0);
    oscillator2.start(0);
    oscillator3.start(0);
    oscillatorStarted = true;
  }
  gain.gain.value = 0.1;
  gain2.gain.value = 0.1;
  gain3.gain.value = 0.1;
  onclicked = true;
});

off.addEventListener("click",()=>{
  gain.gain.value= 0;
  gain2.gain.value = 0;
  gain3.gain.value = 0;
  onclicked = false;
});
