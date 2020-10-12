let content = document.getElementById('content');

let confirm_button = window.opener.document.getElementById("confirm");


function typein(){
  let char = window.opener.document.getElementById("input").innerHTML;
  if (char!="undefined"){
    content.innerHTML += char;
  }
}
confirm_button.addEventListener("click",()=>{
  setTimeout(typein,500);

});

let clear = document.getElementById('clear');

clear.addEventListener("click",()=>{
  content.innerHTML = "";
});
