let machine_button = document.getElementById('machine');
let new_window  = window.open("client/index.html","","width = 400,height = 300");


//var dict = [{"01":"a"},{"100":"b"},{"1010":"c"},{"100":"d"},{"0":"e"},{"0010":"f"},{"110":"g"},{"0000":"h"},{"00":"i"},{"0111":"j"},
//{"101":"k"},{"0100":"l"},{"11":"m"},{"10":"n"},{"111":"o"},{"0110":"p"},{"1101":"q"},{"010":"r"},{"000":"s"},{"1":"t"},{"001":"u"},{"0001":"v"},
//{"011":"w"},{"1001":"x"},{"1011":"y"},{"1100":"z"}];


var dict = {"01":"a","1000":"b","1010":"c","100":"d","0":"e","0010":"f","110":"g","0000":"h","00":"i","0111":"j",
"101":"k","0100":"l","11":"m","10":"n","111":"o","0110":"p","1101":"q","010":"r","000":"s","1":"t","001":"u","0001":"v",
"011":"w","1001":"x","1011":"y","1100":"z","010101":".","110011":",","00000000":"&nbsp"};

var timeStart, timeEnd, time;

function getTimeNow(){
  var now = new Date();
  return now.getTime();
}

var string_input = "";

let dash = false;
let nowchar = "a";
function holdDown(){
  dash = false;
  timeStart = getTimeNow();
  console.log("hello");
  time = setInterval(function(){
    timeEnd = getTimeNow();
    document.getElementById("time").innerHTML = "Time pressed:  "+(timeEnd - timeStart);
    //console.log(timeEnd - timeStart);
    if (timeEnd - timeStart > 800)
    {
      clearInterval(time);
      //alert("dash");
      document.getElementById("dash_dot").innerHTML += "— ";
      dash = true;
      string_input += "1";
      nowchar = getchar(string_input);
      moveTo(nowchar);
    }
  })

}

function holdUp()
{
  console.log("bye");
  console.log("dash",dash);
    clearInterval(time);
    if (!dash){
      //alert("dot");
      document.getElementById("dash_dot").innerHTML += "• ";
      string_input += "0";
      nowchar = getchar(string_input);
      moveTo(nowchar);
    }
    dash = false;
}

var left_locat = {"a":"5.2vh","b":"11vh","c":"16.8vh","d":"22.7vh","e":"28.9vh","f":"35.3vh","g":"41.4vh","h":"47.7vh","i":"53.5vh","j":"60vh","k":"66.7vh","l":"73vh","m":"79.4vh",".":"85.5vh"};
var right_locat = {"n":"5.2vh","o":"11vh","p":"16.8vh","q":"22.7vh","r":"28.9vh","s":"35.3vh","t":"41.4vh","u":"47.7vh","v":"53.5vh","w":"60vh","x":"66.7vh","y":"73vh","z":"79.4vh",",":"85.5vh"};

function getchar(string){

  let current = "a";
  for (var key in dict) {
    console.log(key,string);
    if (key ==  string){
      current = dict[string];
      break;
    }
    else{
      if (key.startsWith(string)){
        current = dict[key];
      }
    }
    }
    return current;

}
function moveTo(input_char){
  for (var key in left_locat) {
    if (key == input_char){
      let arrow = document.getElementById("left");
      arrow.style["top"] = left_locat[input_char];
      console.log("input",input_char);
      arrow.style["transform"] = "rotate(180deg)";
      arrow.style["right"] = "80vw";
      arrow.style["left"] = "0vw";
      break;
    }
  }
    for (var key in right_locat) {
      if (key == input_char){
        let arrow = document.getElementById("left");
        arrow.style["top"] = right_locat[input_char];
        arrow.style["transform"] = "rotate(0deg)";
        arrow.style["left"] = "80vw";
        arrow.style["right"] = "0vw";
        break;
      }
  }
  if (input_char == "&nbsp"){
    let arrow = document.getElementById("left");
    arrow.style["top"] = "90vh";
    arrow.style["transform"] = "rotate(60deg)";
    arrow.style["left"] = "20%";
    arrow.style["right"] = "40vw";
  }

}



machine_button.addEventListener("mousedown",holdDown);
machine_button.addEventListener("mouseup",holdUp);


let confirm_button = document.getElementById("confirm");

confirm_button.addEventListener("click",()=>{
  console.log(string_input);
  let input_char = dict[string_input];
  document.getElementById("input").innerHTML = input_char;
  document.getElementById("dash_dot").innerHTML = "";
  string_input = "";
});


let clear_button = document.getElementById("clear");
clear_button.addEventListener("click",()=>{
  document.getElementById("dash_dot").innerHTML = "";
  string_input = "";
  moveTo("a");
});
