import firebase from "firebase/app";
import "firebase/auth";

// var firebase = require("firebase/app")
// require("firebase/auth")
  var firebaseConfig = {
    apiKey: "AIzaSyCaVUoakZtLenaRyzzF8q-WS1T6RZOMz7I",
    authDomain: "awesome-todo-5aba0.firebaseapp.com",
    databaseURL: "https://awesome-todo-5aba0.firebaseio.com",
    projectId: "awesome-todo-5aba0",
    storageBucket: "awesome-todo-5aba0.appspot.com",
    messagingSenderId: "6520174508",
    appId: "1:6520174508:web:bbe15885fcd7268c99ac09",
    measurementId: "G-BL9T8WWMHQ"
  }
  // Initialize Firebase
 let firebaseApp = firebase.initializeApp(firebaseConfig);
 let firebaseAuth = firebaseApp.auth()
 export { firebaseAuth }