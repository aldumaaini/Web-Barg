import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBsXaO55O6rSytO0kt99lZQaS5fB92b5QA",
  authDomain: "whatsbarg.firebaseapp.com",
  projectId: "whatsbarg",
  storageBucket: "whatsbarg.appspot.com",
  messagingSenderId: "870122619845",
  appId: "1:870122619845:web:0989d282b9841a4fd5c1ac",
  measurementId: "G-45CHP7C3MS",
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };
