let range  = document.getElementById('myRange');
let valueField = document.getElementById("value");
console.log("range", range);

function changehappened(){
  console.log("What's change?");
  valueField.innerHTML = range.value;
}
range.addEventListener("change",changehappened);

function inputhappened(){
  console.log("What's input");
  valueField.innerHTML = range.value;
  valueField.style.marginLeft = -(99/300)*range.value + "px";
}

range.addEventListener("input", inputhappened);
