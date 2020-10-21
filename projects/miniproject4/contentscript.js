let content = document.getElementsByTagName("BODY")[0];
let content_text = content.innerHTML;
//console.log(content_text);
//content.style["font-size"] = "150%";

function replace_font(font){
  content.style["font-family"] = font;
  random_size = Math.floor(Math.random() * 150);
  content.style["font-size"] = random_size + "%";
}


function gotMessage(request, sender, sendResponse){

  console.log(request);

  replace_font(request.font)

}

// listening for messages:
chrome.runtime.onMessage.addListener(gotMessage);
// more on messaging: https://developer.chrome.com/extensions/messaging
