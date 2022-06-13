import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAWqfoaV3sleiyKw2WOdBH47KrufHEds-U",
    authDomain: "crwn-clothing-db-54b4d.firebaseapp.com",
    projectId: "crwn-clothing-db-54b4d",
    storageBucket: "crwn-clothing-db-54b4d.appspot.com",
    messagingSenderId: "580125808914",
    appId: "1:580125808914:web:bbc875730a6aaf2f6a7bcb"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, googleProvider);
};
export const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, googleProvider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating user ', error);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);