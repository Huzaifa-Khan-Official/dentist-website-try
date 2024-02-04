import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword,
    reauthenticateWithCredential, EmailAuthProvider, updatePassword
} from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCaAJATqbkFwe1GxsheCGTDct_a3nFte2c",
    authDomain: "dentist-website-huzaifa.firebaseapp.com",
    projectId: "dentist-website-huzaifa",
    storageBucket: "dentist-website-huzaifa.appspot.com",
    messagingSenderId: "387985520455",
    appId: "1:387985520455:web:76f517f11783ac58ab7e62"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage();

export {
    app, auth, createUserWithEmailAndPassword, db, collection, addDoc, setDoc, onAuthStateChanged, signOut, signInWithEmailAndPassword, doc, getDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, updateDoc, getStorage, ref, uploadBytesResumable, getDownloadURL, storage, reauthenticateWithCredential, EmailAuthProvider, updatePassword
}