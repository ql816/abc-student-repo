
let point_earned = 0;
// let start_score;
let can_start = 0;
chrome.runtime.sendMessage({ type:'start_of_match',message: "hi we start a new game"}, (response) => {
  if (response.key == "start"){
    point_earned = response.info;
    alert("You start by the score "+point_earned);
    start_score = point_earned;
    if(point_earned < 0){
      alert("You cannot drive the car anymore, fuel on a link containing the word 'fuel' ");
      can_start = -1;
    }
  }

});
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     point_earned = request;
//     console.log("Your score before was", point_earned);
//     if(point_earned < 0){
//       console.log("You cannot drive the car anymore, fuel on a link containing the word 'fuel' ");
//     }
//     sendResponse('received!')
// })
setTimeout(()=>{
  let link = document.getElementsByTagName("a");

  if(can_start == -1){
    for(let i = 0; i < link.length; i ++){
      link[i].onmouseover = function(){
        if(/fuel/.test(link[i].innerHTML)){
          point_earned += 2;
          console.log("You're fueling, score is", point_earned);

          if(point_earned>=0){
            alert("Your fuel is ready! Start a new race with a new window! Remember your starting score will be 0 again!")
            chrome.runtime.sendMessage({ type:'finish_fuel',message: 0 }, (response) => {
              console.log("Your next starting score"+0);
              console.log("response is "+response);

            });


          }

        }

      }
    }

  }


if(can_start == 0){
  var styleElement = document.createElement("style");

  //console.log("links are",link.length);
  let path = chrome.runtime.getURL("run_track.png");
  styleElement.appendChild(document.createTextNode("::-webkit-scrollbar{width: 40px;background-color: #fff;}::-webkit-scrollbar-track:vertical{-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);border-radius: 10px;background-image: url("+path+");}::-webkit-scrollbar-thumb{-webkit-box-shadow: inset 0 0 10px rgba(0,0,0,.3);background-color: white;border: 13px solid transparent;border-radius: 10px;background-clip: content-box;}::-webkit-scrollbar-button {background-color: #000;border:1px solid yellow;}"));
  document.getElementsByTagName("head")[0].appendChild(styleElement);
  console.log(document.getElementsByTagName("head")[0]);
  let height = document.body.offsetHeight;
  let density = Math.floor(link.length / height * 1000);
  console.log("the height is",height);
  console.log("the density is ",density);
  let level_array = [20,40,70];

  alert("Try to avoid the moving links!(they're orange)");


  if (density <= 20){
    alert("You are at easy level")
  }else if (density < 20 && density <= 40){
    alert("you are at normal level");
  }else if (density>= 40){
    alert("you are at hard level");
  }
  let max_speed = 0;
  let startTimer = null, timer = 0, speed = 0, s = 0, scrollTop = document.documentElement.scrollTop;
  const timeScale = 100;
  let prevTime = 0;
  let prevY = 0;


  let bg_dash = chrome.runtime.getURL("dash1.png");
  let hand_img = chrome.runtime.getURL("hand.png");
  var dashboard = document.createElement("div");
  var hand = document.createElement("div");
  var text = document.createElement("div");
  hand.style.position = "fixed";
  hand.style["z-index"] = 2;
  hand.style.left = "51%";
  hand.style.top = "5%";
  hand.style.width = "500px";
  hand.style.height = "500px";
  hand.style['background-image'] = "url("+hand_img+")";
  hand.style['background-repeat'] = "no-repeat";

  dashboard.style.position = "fixed";
  dashboard.style.left = "50%";
  dashboard.style.top = "0%";
  dashboard.style["z-index"] = 1;
  dashboard.style.width = "500px";
  dashboard.style.height = "500px";
  dashboard.style['background-image'] = "url("+bg_dash+")";
  dashboard.style['background-repeat'] = "no-repeat";

  let transformed_speed = speed*40;
  text.innerHTML = "Your speed is" + transformed_speed + "km/h";
  text.style.height = "500px";
  text.style.width = "500px";
  text.style.position = "fixed";
  text.style.left = "62%";
  text.style.top = "60%";
  text.style.color = "red";
  text.style["z-index"] = 3;

  document.body.appendChild(dashboard);
  document.body.appendChild(hand);
  document.body.appendChild(text);



  setInterval(()=>{
    for(let i = 0; i < link.length; i ++){
      link[i].style.marginLeft = Math.random()*1440+"px";
      link[i].style.marginTop = Math.random()*960+"px";
      link[i].style.position = "absolute";
      link[i].style.backgroundColor = "orange";
    }
  },1000);

  for(let i = 0; i < link.length; i ++){
    link[i].onmouseover = function(){
      console.log("You are on a link! Score decreased!");
      point_earned -= 2;
    }
  }

  //approach 2.1
  let time_passed = 0;
  let currentY = 0;
  let sent = false;
  let time_remaining = 15;
  let game = setInterval(()=>{
    let distanceTravelled = Math.abs(currentY-prevY);
    let speed = distanceTravelled/100;
    console.log("speed", speed*20);
    let degree = speed*30;
    if (degree > 230){
      degree = 230;
    }
    transformed_speed = Math.floor(speed*20/1);
    if (transformed_speed > max_speed) {
      max_speed = transformed_speed;
    }
    hand.style.transform = "rotate("+ degree + "deg)";
    time_remaining = time_remaining.toFixed(2);
    text.innerHTML = "Your speed is " + transformed_speed + " km/h <br> You have "+ time_remaining+" seconds left";

    prevY = currentY;
    time_passed += 0.1;
    time_remaining -= 0.1;
    //console.log("time passed:",time_passed);
    if (time_passed >= 15 && sent == false){
      sent = true;
      console.log("maximum speed:",max_speed);
      point_earned += Math.ceil(max_speed/50);
      chrome.runtime.sendMessage({ type:'end_of_match',message: point_earned }, (response) => {
        console.log("point_earned:"+point_earned);

        alert("The game has ended! Your score is "+point_earned);
        console.log("response is "+response);

        clearInterval(game);
      });
    }
  }, 100)



  window.onscroll = function (e) {
    // approach #2.2

    currentY = document.documentElement.scrollTop;

    // approach #1

    // let currentY = document.documentElement.scrollTop;
    // let currentTime = e.timeStamp;

    // let distanceTravelled = Math.abs(currentY-prevY);
    // let timeDiff = currentTime - prevTime;
    // let speed = distanceTravelled/timeDiff;
    // console.log(Math.round(speed*100));


    // prevTime = currentTime;
    // prevY = currentY;


    // initial approach

    // console.log(e)
    // let tempScrollTop = document.documentElement.scrollTop
    // s += Math.abs(scrollTop - tempScrollTop)
    // console.log(scrollTop, tempScrollTop, s)
    // scrollTop = tempScrollTop
    // clearTimeout(startTimer)
    // if (!timer) {
    //     timer = new Date().getTime()
    // }
    // startTimer = setTimeout(function () {
    //     let nowTimer = new Date().getTime()
    //     let diffTimer = (nowTimer - timer - timeScale) / 1000
    //     speed = s / diffTimer
    //     s = 0
    //     timer = 0
    //     console.log(speed)
    // }, timeScale)
  }
}

},100);
