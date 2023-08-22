import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBfE5auvOAAWezHkDvRhRN9kmzxDNg-K7M",
    authDomain: "facebook-login-dc982.firebaseapp.com",
    projectId: "facebook-login-dc982",
    storageBucket: "facebook-login-dc982.appspot.com",
    messagingSenderId: "416212062283",
    appId: "1:416212062283:web:8f0c885287eeba7bddfdce",
    measurementId: "G-V5MYS42BDT"
  };


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

export {firebase};