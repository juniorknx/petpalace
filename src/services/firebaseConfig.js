// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRR6rQtc0Sm9iVCW-abNqYhkrHsP8eveU",
    authDomain: "petpalace-a2a9e.firebaseapp.com",
    projectId: "petpalace-a2a9e",
    storageBucket: "petpalace-a2a9e.appspot.com",
    messagingSenderId: "300235805418",
    appId: "1:300235805418:web:da616975920bf6016e3d93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }