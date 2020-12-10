let socket = io();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


let hue = 0;


console.log(canvas);
ctx.lineWidth = 20;
let direction = true;
let isDrawing = false;
let data = {};
let lastX;
let lastY;


canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX= e.offsetX;
    lastY= e.offsetY;


});
canvas.addEventListener('mousemove', (e)=>{
  if (isDrawing == true){
  let x;
  let y;
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = `hsl(${ hue }, 100%, 50%)`;
  if(hue >= 360)
  {hue = 0;};
  hue++;
  ctx.moveTo(lastX, lastY);
  if(e.type == "mousemove"){
    x = e.offsetX;
    y = e.offsetY;
} else  {
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;
}
  ctx.lineTo(x ,y);
  ctx.stroke();
  data.lastX = lastX;
  data.lastY = lastY;
  data.offsetX = x;
  data.offsetY = y;
  data.hue = hue;
  data.lineWitdh = ctx.lineWidth;
  socket.emit("draw",data);
  data = {};
  [lastX, lastY] = [x, y];

  if(ctx.lineWidth > 30 || ctx.lineWidth < 10) {
      direction = !direction;
  }
  if (direction) {
      ctx.lineWidth += 1;
  } else {
      ctx.lineWidth -= 1;
  }
};

});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    lastX= e.changedTouches[0].clientX;
    lastY= e.changedTouches[0].clientY;
});

canvas.addEventListener('touchmove', (e)=>{
  if (isDrawing == true){
  let x;
  let y;
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = `hsl(${ hue }, 100%, 50%)`;
  if(hue >= 360)
  {hue = 0;};
  hue++;
  ctx.moveTo(lastX, lastY);
  x = e.changedTouches[0].clientX;
  y = e.changedTouches[0].clientY;
  ctx.lineTo(x ,y);
  ctx.stroke();
  data.lastX = lastX;
  data.lastY = lastY;
  data.offsetX = x;
  data.offsetY = y;
  data.hue = hue;
  data.lineWitdh = ctx.lineWidth;
  socket.emit("draw",data);
  data = {};
  [lastX, lastY] = [x, y];

  if(ctx.lineWidth > 30 || ctx.lineWidth < 10) {
      direction = !direction;
  }
  if (direction) {
      ctx.lineWidth += 1;
  } else {
      ctx.lineWidth -= 1;
  }
};
});
canvas.addEventListener('touchend', () => isDrawing = false);


var lx;
var ly;
socket.on("draw_data", (data) => {
    lx = data.lastX;
    ly = data.lastY;
    let offsetX = data.offsetX;
    let offsetY = data.offsetY;
    hue = data.hue;
    ctx.lineWidth = data.lineWidth;
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = `hsl(${ hue }, 100%, 50%)`;
    if(hue >= 360)
    {hue = 0;};
    hue++;
    ctx.moveTo(lx, ly);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    if(ctx.lineWidth > 30 || ctx.lineWidth < 10) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth += 1;
    } else {
        ctx.lineWidth -= 1;
    }
  });


  function fadeOut() {
      var r = 0.3 + (Math.random()*0.1);
      ctx.fillStyle = "rgba(0,0,0,"+r+")";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setTimeout(fadeOut,500);
  }
fadeOut();

// setInterval(fadeOut,100);
