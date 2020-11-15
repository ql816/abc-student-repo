const express = require('express')
const app = express()
const port = 8000

app.use(express.static('public'));

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
