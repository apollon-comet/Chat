import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, setDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuM5ZzIc9FC-CiSBMyNWM8Ru4XeHDz2io",
    authDomain: "sandese-app.firebaseapp.com",
    projectId: "sandese-app",
    storageBucket: "sandese-app.appspot.com",
    messagingSenderId: "379805090136",
    appId: "1:379805090136:web:15b91aedf60157455f252d",
    measurementId: "G-8HD1CPNFFS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signOut, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword };
export { db, collection, onSnapshot, addDoc, setDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp };