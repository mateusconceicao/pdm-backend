var firebase = require("firebase/app");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyCv2RTW4JrlQ65XHRjAVm1iqmO641sncwI",
  authDomain: "trabalho-51d21.firebaseapp.com",
  databaseURL: "https://trabalho-51d21.firebaseio.com",
  projectId: "trabalho-51d21",
  storageBucket: "trabalho-51d21.appspot.com",
  messagingSenderId: "958918130581",
  appId: "1:958918130581:web:0ba5b178ce5ed5999d949c"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

export default firebase;