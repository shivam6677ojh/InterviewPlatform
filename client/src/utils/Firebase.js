
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "interviewiq-88746.firebaseapp.com",
    projectId: "interviewiq-88746",
    storageBucket: "interviewiq-88746.firebasestorage.app",
    messagingSenderId: "546354884762",
    appId: "1:546354884762:web:b5c58b3be88831d1bc2f23"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}