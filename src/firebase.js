import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyB7yTrVL9KCU43qwvYGgmzuP-UzG8qm6BY",
  authDomain: "bug-track-app.firebaseapp.com",
  projectId: "bug-track-app",
});

// Initialize Firebase
const db = getFirestore();
const auth = getAuth();

export { db, auth };
export default app;
