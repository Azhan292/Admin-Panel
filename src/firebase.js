import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBodhroQVcoaUKXFMYk_5V8PsG-rPM1q-o",
  authDomain: "skalpweb.firebaseapp.com",
  projectId: "skalpweb",
  storageBucket: "skalpweb.appspot.com",
  messagingSenderId: "1045998422711",
  appId: "1:1045998422711:web:17cbe5b8703201f8fb9b32",
  measurementId: "G-MXRNKNV6J3"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);