import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBRt_GiC7pMTun5snw4_cuSQTrV2NZ19q0",
  authDomain: "social-world-dd138.firebaseapp.com",
  projectId: "social-world-dd138",
  storageBucket: "social-world-dd138.appspot.com",
  messagingSenderId: "907804617201",
  appId: "1:907804617201:web:abb0006512f2eb80a4fc50",
  measurementId: "G-XXZWRLBMH4",
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
