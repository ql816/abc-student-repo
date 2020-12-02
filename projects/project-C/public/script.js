let socket = io();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


let hue = 0;

var pathes = [];

console.log(canvas);
ctx.lineWidth = 20;
let direction = true;
let isDrawing = false;
let data = {};
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', (e)=>{
  if (isDrawing == true){
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = `hsl(${ hue }, 100%, 50%)`;
  if(hue >= 360)
  {hue = 0;};
  hue++;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  data.lastX = lastX;
  data.lastY = lastY;
  data.offsetX = e.offsetX;
  data.offsetY = e.offsetY;
  data.hue = hue;
  data.lineWitdh = ctx.lineWidth;
  socket.emit("draw",data);
  data = {};
  [lastX, lastY] = [e.offsetX, e.offsetY];

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
    for (let i =0; i<pathes.length;i++){
      let path = pathes[i];
      console.log(path);
      path.fillStyle = "rgba(255,255,255,0.1)";
      path.fillRect(0, 0, canvas.width, canvas.height);
      setTimeout(fadeOut,200);
    }
  }

setInterval(fadeOut,200);
// gatherImage() {
//     this.imgData = this.imgData.slice(0, this.index + 1);
//     let imgData = this.paint.getImageData(0, 0, this.width, this.height);
//     this.imgData.push(imgData);
//     this.index = this.imgData.length - 1;
// }
