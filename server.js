var firebase = require("firebase");
//var firebasedb = require("firebase");
require("firebase/auth");
require("firebase/firestore");
var admin = require('firebase-admin');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

const firebaseConfig = {
  apiKey:"AIzaSyCv2RTW4JrlQ65XHRjAVm1iqmO641sncwI",
  authDomain: "trabalho-51d21.firebaseapp.com",
  databaseURL: "https://trabalho-51d21.firebaseio.com",
  projectId: "trabalho-51d21",
  storageBucket: "trabalho-51d21.appspot.com",
  messagingSenderId: "958918130581",
  appId: "1:958918130581:web:0ba5b178ce5ed5999d949c"
};
  
firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig);
//firebasedb.initializeApp(firebaseConfig);

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/hello',(req, res)=>{
  res.send('Hello')
})
function verifyToken(req, res){
  //admin.initializeApp(firebaseConfig);

  const token = /^Bearer (.+)$/.exec(req.headers.authorization || '')
  console.log(token[1])
  if (!token) {
    res.status(401).send();
    return false;
  }
  
  const ticket = admin.auth()
    .verifyIdToken(token[1], true)
    .catch(function (error) {
      console.log(error);
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'err'});
      return false;
    });
    return true;
}

app.get('/despesa',(req, res)=>{
  if (verifyToken(req, res) == true) {
    var despesaRef = firebase.database().ref("/despesa/");
    despesaRef.on("value",
      function(snapshot){
        console.log(snapshot.val());
        res.json(snapshot.val());
        despesaRef.off("value");
      },
      function(errorObject){
        console.log("Error: " + errorObject.code);
        res.send("Error: " + errorObject.code);
      }
    )
  }
  /*try {

    console.log('Antes do admin')
    admin.database().ref('/receita').on('value', (snapshot) => {
      console.log('Dentro do admin')
      res.status(200).json({"receita":snapshot.val()});
      console.log('depois do resultado')
    })

  } catch (error) {
    console.log(error)
  }
  */
})

app.get('/check',  (req, res) => {
  const token = /^Bearer (.+)$/.exec(req.headers.authorization || '')

  if (!token) {
    reply.status(401).send()
    return
  }

  const ticket = admin.auth()
    .verifyIdToken(token[1], true)
    .catch(function (error) {
      console.log(error);
      res.setHeader('Content-Type', 'application/json');
      res.send({status: 'err'});
      return
    });
    res.send('ok')
});