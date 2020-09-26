let button = window.document.getElementById('button');
console.log(button);
let sw = screen.width;
let sh = screen.height;


function openWindow(){
  console.log("now a window should open");
  let randomX = Math.random()*(sw-400);
  let randomY = Math.random()*(sh - 100);
  let newWindow = window.open("hello/index.html","","width = 400,height = 100, left ="+randomX+",top = "+ randomY);
  let randomTime = 1000 + Math.random()*4000;
  setTimeout(function() {
    newWindow.close();
  }, randomTime);
}

function openManyWindows(){
  for (let i =0; i<5; i++){
    openWindow();
}
}
button.addEventListener("click",openManyWindows);
