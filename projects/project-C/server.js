let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let connected_user = 0;
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
