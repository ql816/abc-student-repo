let submit = document.getElementById("submit");
let course_input = document.getElementById("course");
let look = document.getElementById("look");
let list = document.getElementById("course_list");


// submit.style["background-color"] = "#6600CC";
// submit.style.border: none;
// submit.style.color: white;
// submit.style.padding: 15px 20px;
// submit.style.["text-align"]: center;
// submit.style.["text-decoration"]: none;
// submit.style.display: inline-block;
// submit.style.["font-size"]: 16px;
submit.addEventListener("click", function(){
  let course = course_input.value;
  fetch("/course?course="+course);
  course_input.value = "";

});

function receiveCourseList(data) {

  console.log("decoded:",data);
}

function placecourse(course){
  let p = document.createElement("p");
  p.innerHTML = course;
  p.style.position = "absolute";
  p.style.left = Math.random()*window.innerWidth +"px";
  p.style.top = Math.random()*window.innerHeight +"px";
  p.style.color = "#6633FF";
  p.style["font-weight"] = "bold";
  p.style["font-size"] = "15px";
  list.appendChild(p);
}

look.addEventListener("click" ,function() {
  fetch("/course_list")
  .then(res=>res.json())
  .then(res=>{
    let courses = res.content;
    list.innerHTML = "";
    let firstcourse = courses[0];
    for (let i = 0; i<courses.length;i++){
      placecourse(courses[i]);
    }

  })
});
