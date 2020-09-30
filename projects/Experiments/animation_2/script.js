let button = document.getElementById('button');
let box = document.getElementById('box');
let box_angle = 0;
let button_angle = 0;
button.addEventListener("click", ()=>{
  box_angle = box_angle+110;
  box.style.transform = "rotate("+box_angle+"deg)";
})

box.addEventListener("click", ()=>{
  button_angle = button_angle+360;
  button.style.transform = "rotate("+button_angle+"deg)";
})
