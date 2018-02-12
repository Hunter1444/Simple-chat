const express = require('express');
const bodyParser = require('body-parser');
const user  = require('./user');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://localhost:27017/mydatabase";

let users = getAllUser().then(res => users = res);

// console.dir(users);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/auth', function(req, res) {
  const {login, password} = req.body;

  if(!login || !password){
    res.send({error: 'Заполните все поля'})
  }

  const userIndex = users.findIndex(user => login === user.login);
  const user = users[userIndex];

  if(!user || user.login !== login || user.password !== password){
    res.send({error: 'Неверный логин или пароль'})
  } else{
    res.send({auth: true})
  }

})

app.post('/reg', function(req, res){
  const {login, password, secondPassword} = req.body;

  if(!login || !password || !secondPassword){
    res.send({error: 'Заполните все поля'})
  }

  if(password !== secondPassword){
    res.send({error: 'Пароли не сходятся'})
  }

  if(users.find(user => login === user.login)){
    res.send({error: 'Пользователь с таким именем уже существует'})
  }

  insertUser(login, password).then(() => users.push({login:login, password: password}));
  res.send({reg: true});
})

app.listen(3000, function () {
  console.log('aapp listening on port 3000!');
});

// function findUser(login){
//   return new Promise(function(resolve, reject){
//     mongoClient.connect("mongodb://localhost:27017/mydatabase", function(err, db){
//         if(err){
//           reject('error')
//           return console.log(err);
//         }
//         var dbo = db.db("admin");
//         dbo.collection("users").findOne({login: 'user'}, function(err, result) {
//           if (err) throw err;
//           resolve(result)
//           db.close();
//         });
//         // взаимодействие с базой данных
//     });
//   })
// }

function insertUser(login, password){
  return new Promise(function(resolve, reject){
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err){
        throw err;
        reject()
      };
      var dbo = db.db("admin");
      var myobj = { login: login, password: password };
      dbo.collection("users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        resolve()
        db.close();
      });
    });
  })
}

function getAllUser(){
  return new Promise(function(resolve, reject){
    MongoClient.connect(mongoUrl, function(err, db){
      if(err){
        reject('error')
        return console.log(err);
      }
      var dbo = db.db("admin");
      dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        resolve(result)
        db.close();
      });
      // взаимодействие с базой данных
    });
  })
}
