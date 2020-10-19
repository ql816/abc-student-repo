console.log("I AM HERE ON THIS WEBSITE!");

function replace(word1,word2){
  let regEx = new RegExp(word1,"g");
  document.body.innerHTML = document.body.innerHTML.replace(regEx,word2);

}
replace("Moon","Potato");
