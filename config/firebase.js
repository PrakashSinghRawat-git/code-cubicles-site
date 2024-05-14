// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// setup google auth provider
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDUfyw9I1JO9lnteNTZhBiygD9wMzdeiA",
    authDomain: "code-cubicle-site.firebaseapp.com",
    projectId: "code-cubicle-site",
    storageBucket: "code-cubicle-site.appspot.com",
    messagingSenderId: "331007738284",
    appId: "1:331007738284:web:3a1c92f498528d86f47a09",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, googleAuthProvider, db };
