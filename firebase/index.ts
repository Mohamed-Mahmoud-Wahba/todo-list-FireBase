import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCaByhJA7oNzVFjMUTD_waQOFd2pW6S2C0",
  authDomain: "todo-list-d9378.firebaseapp.com",
  projectId: "todo-list-d9378",
  storageBucket: "todo-list-d9378.appspot.com",
  messagingSenderId: "281705380017",
  appId: "1:281705380017:web:50efc58a85b442759b0a90"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
    db
}