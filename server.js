var firebase = require("firebase");
//var firebasedb = require("firebase");
require("firebase/auth");
require("firebase/firestore");
var admin = require('firebase-admin');
var  bodyParser = require('body-parser') ;
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()
app.use(bodyParser.json());

const firebaseConfig = {
  apiKey:"AIzaSyCv2RTW4JrlQ65XHRjAVm1iqmO641sncwI",
  authDomain: "trabalho-51d21.firebaseapp.com",
  databaseURL: "https://trabalho-51d21.firebaseio.com",
  projectId: "trabalho-51d21",
  storageBucket: "trabalho-51d21.appspot.com",
  messagingSenderId: "958918130581",
  appId: "1:958918130581:web:0ba5b178ce5ed5999d949c"
};

const serviceAccount = {
  "type": "service_account",
  "project_id": "trabalho-51d21",
  "private_key_id": "247977ddddb4003962f1e1e47190cdff9b763e62",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNW4YC4W9i4qkw\nORCm/4TLGpiVqB+nBiCI/YqQ3ivMimzrCwtnnNvHqhSY+2SIsFXuvuNgypW3vBG2\naQTO6d8dvIcElwUNpUpWuMT8dTZU+gJyQBtycNkKvaqetyH331taqjoCumvJ4eP8\n6103wMqkUFk5JeRuhBwzVfOPItKL/G/NwGIrbPJzL9UuuTjHOdrGgbVFIYixxQvf\nWYv+OP35hCiGleT37U6I5vcpLLHcxSCRbAt2gMJwBJHV6wHl8HiB8DSEDCmRZKPz\nsv/ejuJLAjRDHSj0osAJSQBtfqETUgQYHEpFUJpV2v2RipZw2OdCfM1TNbB9ys33\nsbwDxKzTAgMBAAECggEAGRLtv/hKo2ZNhifRkrJsQmhS7SMECl7DJjbe7mVSL71P\nIzvL/rC2XSC1NyCq2828EFSaar0RnseF2iHkhmcj6PuV+Md/xHTEKOaSlsixA5sr\nJUwSjdydg6Q46vwtV5icDOvv/VlJw/Ki5cTPMvmFRJ7S5hlsVNoon1QFUxrLXnAS\nMLL7/+RJjbZk/78A1aKkGBmm9ikjYzdb8tZgr/V12sIjg5CYR9ZChU6HuwjiCHit\n5tsBLHkpiJiqXc8QSI1Mv55MBzqGI5YIa+gYZg2pXiETjQRc2ijD1wFM+MtJdzLK\nfsooNHOdgsh9vayYUQ4O7nk/Jit8fnHQN0XqH2zKQQKBgQDmFO5uAmxdRbk7DtX9\nEwKlnVEd3LatJGQBVPLgh70t5+Z9BUUB6e6iMICV6dNr/igZcdN72A2yPGl067TJ\nTH9FIL8EO6YHEi3/rdtdn52lJBnJeV2OPMMn/2PiTCPLcDLeiQf33rQqya2H+r4E\n2pgthz01i1XKZYqG3VSWvKIMIwKBgQDkfZjr8TL0tKnEOLaeJ6jaFoO8lqy2LJyC\nT/kk9SrQoz5jmLsKlT1duQvPL5bKl9MEtPg3VnTrKZ43pSCXb5woBm3rtQaw25nR\nEEVrqaptVrCRwFh3YeQjBO6GKk3mxPYDyex99Fdl7+226VPlKUatLG4vcQcp64Q1\nJxetph9PkQKBgQDhpOuEximie+vCSLWCoe85nwRbpgcd3Q+a4sXjgBv/dmvsdouL\n6fGX7LteytgHFFYdRi2jSmt8PpUqDrPZq4UxtYDAVQNp8eFc3BPESPLhb3s+xSEE\niwDWLDi4SfXc4adx6a//3tCRGgNu1XEf74XJONXFumWjvlvSEiSQRGUkQwKBgQCH\nmRXgp9KysGizf2i48RZe3s+tYsn6jv0OxME5spmHGenTl3cg77JsZX3hpf9aGcHs\nYC2SQae/S4KOyVtPI7hLdI1VPahL2vcsv/hCzXzLyI+e38RgjOKj+bBIRODYW/kY\nBIRpt1EKuNmdHFlifR1pdh2p3+z9bryWAq4lqpmYUQKBgDeGmqjafH//16Bt5X49\n9IOcm22lpp+HZ1ofcjS+YCqGVON0qDqt1wYEpRPIC+vOT8fyN2DOg2OvnMpi3XPn\nWTdMw6A9T9SyZ+Am2+dx1pQUjYET5L9qcfIHGk2Vi2H6yxyw6kV2skNpBCqHGNHh\nJdLM7QdV8ipi1O+3QrXo7Jzu\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-yvtzt@trabalho-51d21.iam.gserviceaccount.com",
  "client_id": "105376927269027092187",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yvtzt%40trabalho-51d21.iam.gserviceaccount.com"
};
  
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trabalho-51d21.firebaseio.com"
});
  

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
  console.log(req.headers)

  const token = /^Bearer (.+)$/.exec(req.headers.authorization || '')
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

app.options('/despesa',(req, res)=>{
  if (verifyToken(req, res)) {
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
  }else{
    res.send('Erro: Token Invalido')
  }
   
})

//Fetch instances
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


//Create new instance

app.put('/cadastroDespesa', function(req, res){
  if (verifyToken(req, res)) {
    var  descricao = req.body.Descricao;
    var  data = req.body.Data;
    var  valor  =  req.body.Valor;

    var referencePath = '/despesa/' + descricao + '/' ;
    var despesaRef = firebase.database( ).ref(referencePath);
    despesaRef.set({ Data:data, Valor : valor }, 
          function ( error ){
            if( error ){
              res.send( "Não foi possível salvar os dados."  +  error ) ;
            }else{
              res.send( "Dados salvos com sucesso." ) ;
            }
        });
  }else{
    res.send('Erro: Token Invalido')
  }
});


//Update existing instance
/*app.post('/updateDespesa', function(req, res){
  if (verifyToken(req, res)) {
    var  descricao  =  req.body.;
    var  data  =  req.body.;
    var  valor  =  req.body.;

    var  referencePath  =  '/despesa/' + userName + '/' ;
    var  despesaRef  =  firebase.database( ).ref(referencePath);
    despesaRef.update( { Nome : nome ,  Idade : idade } , 
          function(error){
            if(error){
              res.send( "Não foi possível atualizar os dados."  +  error ) ;
            
            }else{
              res.send( "Dados atualizados com sucesso." ) ;
            }
          });
  }else{
    res.send('Erro: Token Invalido')
  }
});
*/

//Delete
app.post('/deleteDespesa/:key', function (req, res) {
  var key = req.params.key;
  console.log('The key: ' + key);
  firebase.database().ref('/despesa/' + key).remove()
  res.status(200).send();

});
  
var server = app.listen(8080, function () {
 
  var host = server.address().address;
  var port = server.address().port;
  
  console.log("Example app listening at http://%s:%s", host, port);
});

