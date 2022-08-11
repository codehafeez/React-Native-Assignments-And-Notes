import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
apiKey: "AIzaSyB0dWJaq-r1Zfh3NmsiL9bTU2uzHueICNI",
  authDomain: "webex-cb569.firebaseapp.com",
  databaseURL: "https://webex-cb569-default-rtdb.firebaseio.com",
  projectId: "webex-cb569",
  storageBucket: "webex-cb569.appspot.com",
  messagingSenderId: "613401733335",
  appId: "1:613401733335:web:cd22ab4b36d010578a6892"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
