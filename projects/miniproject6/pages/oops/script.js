let button = document.getElementById('submit');

function getRadioButtonChecked(tagNameAttr){
    var radio_tag = document.getElementsByName(tagNameAttr);
    for(var i=0;i<radio_tag.length;i++){
        if(radio_tag[i].checked){
            var checkvalue = radio_tag[i].value;
            return checkvalue;
        }
    }
}

var questions = ["Which of the following courses can NOT fulfill the Category Algorithmic Thinking?", "What is the course you must take as a senior?","Which of the following course can fulfill Mathematics requirement?","How many credits do you need to take to graduate?"];
var choices = [["A. Introduction to Computer Programming","B. Interaction Lab","C. Creative Coding Lab" , "D. Circuit" ],["A. Advanced Major Courses ","B. SSPC","C. Senior Project/Capstone" , "D. General Elective" ],["A. Numerical Analysis ","B. Introduction to Math Modeling","C. Mathematics of Finance" , "D.Networks and Dynamics " ],["A. 128","B. 120", "C. 112", "D.132"]]
var random_var = Math.floor(Math.random()*4);

var question = document.getElementById('question');

question.innerHTML  = questions[random_var];

var choiceA = document.getElementById('A');
var choiceB = document.getElementById('B');
var choiceC = document.getElementById('C');
var choiceD = document.getElementById('D');

choiceA.innerHTML = choices[random_var][0];
choiceB.innerHTML = choices[random_var][1];
choiceC.innerHTML = choices[random_var][2];
choiceD.innerHTML = choices[random_var][3];


button.addEventListener("click",function(){
  var value = getRadioButtonChecked("radio_1");
  console.log("checked=="+value);
  window.location.href = "/code?word=" + value + "&question=" + random_var;

})
