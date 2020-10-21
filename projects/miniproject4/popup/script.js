let button = document.getElementById("button");
let font_selection = document.getElementById("myfont");
var selected_font = font_selection.options[font_selection.selectedIndex].value;

button.addEventListener("click", ()=>{
  selected_font = font_selection.options[font_selection.selectedIndex].value;
  console.log(selected_font);
  let to_font = selected_font;
  let count = 0;
change = setInterval(function(){
  if (count == 40){
    clearInterval(change);
  }
  random_index = Math.floor(Math.random() * 10);
  to_font = font_selection.options[random_index].value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    let message = {
      font: to_font
    }

    chrome.tabs.sendMessage(tabs[0].id, message);

  }
  )
  count ++;
},200)
});
