let my_number = document.getElementById("number")
let number_text =  window.opener.document.getElementById("number_copy").innerHTML;
console.log("my number is",number_text);
my_number.innerHTML = number_text;




setTimeout(function() {
  window.close();
}, 23000);
