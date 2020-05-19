import firebase from 'firebase';
//require("firebase");
// Required for side-effects
require("dotenv/config");
require("firebase/firestore");

var config = {
    apiKey: process.env.FB_KEY,
    authDomain: "fir-vue-2b6db.firebaseapp.com",
    databaseURL: "https://fir-vue-2b6db.firebaseio.com",
    projectId: "fir-vue-2b6db",
    storageBucket: "fir-vue-2b6db.appspot.com",
    messagingSenderId: "1096036980424",
    appId: "1:1096036980424:web:54a62e7396730d090937fd",
    measurementId: "G-M7J7SC2KNK"
}

const fb = firebase.initializeApp(config);
const db = firebase.firestore()
 export{fb,db}
