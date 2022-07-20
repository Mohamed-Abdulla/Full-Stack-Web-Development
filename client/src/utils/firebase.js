import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7YBwXefPY72brX-t1hzUwiykLv9y9idY",
  authDomain: "clone-3d69d.firebaseapp.com",
  projectId: "clone-3d69d",
  storageBucket: "clone-3d69d.appspot.com",
  messagingSenderId: "74209935197",
  appId: "1:74209935197:web:a849da5e95fd2a49d432b4",
  measurementId: "G-NCBD4NKETP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
