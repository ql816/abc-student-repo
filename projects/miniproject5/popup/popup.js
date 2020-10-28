const bg = chrome.extension.getBackgroundPage()


let port = chrome.extension.connect({
    name: 'popup-name'
})

port.postMessage('send to bg')

port.onMessage.addListener(msg => {
    console.log('Receive:', msg)
})
let time = document.getElementById("time");
let website = document.getElementById("website");

var now_url = "";

function count_time(second){
  let hour = Math.floor(second/3600);
  let remain_second = second - 3600*hour;
  let minute = Math.floor(remain_second/60);
  let final_second = remain_second - minute*60;
  let time = new Array(hour,minute,final_second);
  return time;
}
chrome.tabs.getSelected(null, function (tab) {
         url = tab.url;
         let domain = url.split("/");
         if( domain[2] ) {
             now_url = domain[2];
         }
      });
setInterval(function(){
  console.log(bg.visited_web_dict);
  let web_dict = bg.visited_web_dict;
  website.innerHTML = now_url;
  let time_spent;
  time_spent = count_time(web_dict[now_url]);
  let hour, minute,second;
  hour = time_spent[0];
  minute = time_spent[1];
  second = time_spent[2];
  time.innerHTML = hour + " hour(s) "+ minute + " minute(s) "+ second + " second(s)"


},700);
