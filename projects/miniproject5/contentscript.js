chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
})

let url = window.location.href;
var domain = url.split("/");
let myurl = "";
if( domain[2] ) {
    myurl = domain[2];
}
console.log(myurl);

let sent = false;
if (sent == false){
chrome.runtime.sendMessage({ type:'sendURL',message: myurl }, (response) => {
  console.log("sent my url:"+myurl);
  console.log("response is "+response);
});
sent = true;
};

function report_stay(){
  chrome.runtime.sendMessage({ type:'stay',message: myurl }, (response) => {
    console.log("sent my url:"+myurl);
    console.log("response is "+response);
})
};

setInterval(report_stay,1000);
