// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL1GAVPmlTN4X-QztLY7mfHoDPBCq9jU4",
  authDomain: "fir-fighter-6971a.firebaseapp.com",
  projectId: "fir-fighter-6971a",
  storageBucket: "fir-fighter-6971a.firebasestorage.app",
  messagingSenderId: "439785744661",
  appId: "1:439785744661:web:e02d990f99b6d3769ba11c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);