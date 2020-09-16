
var number_of_stars = 0;


function ClickButton()
{

  var increment = document.getElementById("number").value;
  increment = parseInt(increment);
  number_of_stars += increment;
  var br = document.createElement("br");
  for (i=0;i<increment;i++){
    var image = new Image();
    image.src = 'star.png';
    image.style.width = '3%';
    image.style.height = 'auto';
    document.body.appendChild(image);


  }


}
