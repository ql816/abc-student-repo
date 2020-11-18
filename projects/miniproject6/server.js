const express = require('express')
const app = express()
const port = 3000
const code = "B"
var answer = ["D",'C','D','A'];

app.use(express.static(__dirname + '/pages'));


app.get('/', (req, res) => {
  //res.send('Bye World!')
  res.sendFile(__dirname + "/pages/index.html");
})

let namecount = 0;
app.get('/name',(rep,res) => {
  namecount += 1;
  console.log(namecount, "people asked for name")
  res.send("Hi name!");

})


app.get('/code',(rep,res) => {
  let query = rep.query;
  let guess = query.word;
  let question = query.question;
  console.log(guess);
  console.log(question);
  if (guess == answer[question]) {
    console.log("correct")
    res.sendFile(__dirname + "/pages/secret_page/index.html");
  }
  else{
    console.log("wrong")
    res.sendFile(__dirname + "/pages/oops/index.html");
  }
})
let course_list = []
app.get('/course',(rep,res) => {
  let query = rep.query;
  let course = query.course;
  course_list.push(course);
  console.log("received:",course);
  console.log("--------");
})


app.get('/course_list',(rep,res) => {
  console.log("someone wanna check the course_list");
  res.json({content:course_list,sender:"admin"});
console.log("--------");

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
