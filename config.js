import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBALMekKava3iuNtvEYxYOyOL23QWEW0qU",
  authDomain: "news-app-6189d.firebaseapp.com",
  projectId: "news-app-6189d",
  storageBucket: "news-app-6189d.appspot.com",
  messagingSenderId: "953479311603",
  appId: "1:953479311603:web:3d74381415a6b469618786",
  measurementId: "G-03EKRZN4SG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
