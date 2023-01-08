// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getDocs,
  query,
  where,
  addDoc,
  collection,
  initializeFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwXHEoCaWQVcg0qBxm0pApRR7tDowzaiw",
  authDomain: "loveletter-c280f.firebaseapp.com",
  projectId: "loveletter-c280f",
  storageBucket: "loveletter-c280f.appspot.com",
  messagingSenderId: "1016924549486",
  appId: "1:1016924549486:web:b78eee8ba98838fcee517f",
  measurementId: "G-N483FBE82R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {});
const analytics = getAnalytics(app);
const auth = getAuth(app);

if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export { app, db, analytics, auth };
