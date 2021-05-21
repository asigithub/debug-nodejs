var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var db = require('./db');
var user = require('./controllers/usercontroller');
//var game = require('./controllers/gamecontroller');


db.sync(/*{ force: true }*/).then(()=>{
    app.listen(3000, function(){
      console.log("Сервер ожидает подключения...");
    });
  }).catch(err=>console.log(err));
//app.use(require('body-parser'));
app.use('/api/auth', user);
//app.use(require('./middleware/validate-session'));
//app.use('/api/game', game);

// app.post('/api/auth/signup', function (req, res) {
//     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     res.send('POST request to the homepage');
//   });

app.listen(4000,"localhost",function() {
    console.log("App is listening on 4000");
})