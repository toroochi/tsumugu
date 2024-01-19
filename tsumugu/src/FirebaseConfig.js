import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDt8NeVLrRx2bbbfChZN-rgiBSl1rlSB3I",
    authDomain: "tsumugu-f9053.firebaseapp.com",
    projectId: "tsumugu-f9053",
    storageBucket: "tsumugu-f9053.appspot.com",
    messagingSenderId: "428231834583",
    appId: "1:428231834583:web:8f82ae8f2faabad3cfe992",
    measurementId: "G-PY08WXESK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const auth = getAuth(app);
export default db;