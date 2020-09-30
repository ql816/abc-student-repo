
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");
let five = document.getElementById("five");
let six = document.getElementById("six");
let seven = document.getElementById("seven");
let eight = document.getElementById("eight");
let nine = document.getElementById("nine");
let zero = document.getElementById("zero");
let star = document.getElementById("star");
let pound = document.getElementById("pound");
let call = document.getElementById("call");

let number  = "";
let number_copy = document.getElementById("number_copy");

one.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="1";
  number += "1";
})
two.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="2";
  number += "2";
})
three.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="3";
  number += "3";
})
four.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="4";
  number += "4";
})
five.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="5";
  number += "5";
})
six.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="6";
  number += "6";
})
seven.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="7";
  number += "7";
})
eight.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="8";
  number += "8";
})
nine.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="9";
  number += "9";
})
zero.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="0";
  number += "0";
})
star.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="*";
  number += "*";
})
pound.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML+="#";
  number += "#";
})

make_call.addEventListener("click",()=>{
  window.opener.document.getElementById("number").innerHTML="";
  number_copy.innerHTML = number;
  call_window = window.open("call.html","","width = 600,height = 700 left = 300");
  setTimeout(function() {
    window.close();
  }, 2000);

})
