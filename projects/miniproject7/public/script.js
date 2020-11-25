let socket = io();
const MAX_DM_COUNT = 10;
const CHANNEL_COUNT = 20;

let domPool = [];
let hasPosition = [];

let number_of_user = document.getElementById("number");
let sendButton = document.getElementById("send");
let text_info = document.getElementById("m");

socket.on("number_of_user", (data)=>{
  number_of_user.innerHTML = data;
})

sendButton.addEventListener("click", ()=>{
  console.log("sent");
  let message = text_info.value.trim();
if(message != ""){
  // send name and message to server
  let data = {message: message}
  socket.emit('message', data);
  //console.log(data);
}
text_info.value = "";
})

text_info.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && (text_info.value = text_info.value.trim())) {
    console.log("sent");
    let message = text_info.value.trim();
  if(message != ""){
    // send name and message to server
    let data = {message: message}
    socket.emit('message', data);
    //console.log(data);
  }
  text_info.value = "";
  }
});

socket.on("incoming", (data)=>{
  let received_message = data.message;
  let channel;
  channel = getChannel();
  let dom = domPool[channel].shift();
  let danmu = received_message;
  shootmsg(dom, danmu, channel);
})



function init() {
  let wrapper = document.getElementById('wrapper')
  for (let j = 0; j < CHANNEL_COUNT; j++) {
    let doms = [];
    for (let i = 0; i < MAX_DM_COUNT; i++) {
      let dom = document.createElement('span');
      wrapper.appendChild(dom);
      dom.className = 'right';
      dom.style.top = j * 20 + 'px';
      doms.push(dom);
      dom.addEventListener('transitionend', () => {
        dom.className = 'right';
        dom.style.transform = null;

        domPool[j].push(dom);
      });
    }
    domPool.push(doms);
  }
  for (let i = 0; i < CHANNEL_COUNT; i++) {
    hasPosition[i] = true;
  }
}

function shootmsg(dom, text, channel) {
  console.log('biu~ [' + text + ']');
  dom.innerText = text;
  dom.style.transform = `translateX(${-dom.clientWidth}px)`;
  let random_y = Math.floor(Math.random() * 2000)+ 20;
  dom.style.top = "translateY(" + random_y + "px)";
  dom.style["font"] = "25px Helvetica, Arial";
  dom.style.color = "white";
  dom.className = 'left';

  hasPosition[channel] = false;
  setTimeout(() => {
    hasPosition[channel] = true;
  }, dom.clientWidth * 10 + 1000);
};

function getChannel() {
  for (let i = 0; i < CHANNEL_COUNT; i++) {
    if (hasPosition[i] && domPool[i].length) return i;
  }
  return -1;
};

init();
console.log(domPool);
