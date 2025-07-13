// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0QaRL41vTx7j2SwZe0ZwndQiaDWivemU",
  authDomain: "wanderlog-92c23.firebaseapp.com",
  projectId: "wanderlog-92c23",
  storageBucket: "wanderlog-92c23.firebasestorage.app",
  messagingSenderId: "857399184502",
  appId: "1:857399184502:web:ce683abf49d79f6cb76357",
  measurementId: "G-QY5J80HLG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();