// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getData } from './index.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDPcDXBVx58MlwH38_WxQ_WC66nagaeJ5w',
  authDomain: 'planta-victoris.firebaseapp.com',
  projectId: 'planta-victoris',
  storageBucket: 'planta-victoris.appspot.com',
  messagingSenderId: '111810101736',
  appId: '1:111810101736:web:e9df090eb48437ea58245d',
  measurementId: 'G-X5KFQT41JG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
let provider = new GoogleAuthProvider();
let uid = null;

export let signedIn = false;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    console.log(uid);
    // ...
    //get user data
    getData();
    signedIn = true;
  } else {
    // User is signed out
    // ...
  }
});
const db = getFirestore(app);

export { app, auth, provider, uid, db };
