import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVWBHKVNOOWz_58CUA5vGBkzOicdRI-uE",
  authDomain: "sp-tiffin-service.firebaseapp.com",
  projectId: "sp-tiffin-service",
  storageBucket: "sp-tiffin-service.appspot.com",
  messagingSenderId: "229623848126",
  appId: "1:229623848126:web:f31712fe4b5659e7e992ef",
  measurementId: "G-2K6MDCCJP4",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
