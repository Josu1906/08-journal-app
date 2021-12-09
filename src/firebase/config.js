import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAke0bZjhVqEdZNltuEqUymameMDQXmUts",
    authDomain: "react-app-cursos-1144a.firebaseapp.com",
    projectId: "react-app-cursos-1144a",
    storageBucket: "react-app-cursos-1144a.appspot.com",
    messagingSenderId: "770759590312",
    appId: "1:770759590312:web:f24d46f95408c3c1961d9d",
    measurementId: "G-K3E9PX5J4J"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db, 
      googleAuthProvider,
      firebase 
  }
 