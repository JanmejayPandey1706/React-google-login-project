import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCwCKdTm5Vai5OhDYo4hBHEf3brkI-dB5I",
  authDomain: "react-auth-ae7f2.firebaseapp.com",
  projectId: "react-auth-ae7f2",
  storageBucket: "react-auth-ae7f2.appspot.com",
  messagingSenderId: "747115888824",
  appId: "1:747115888824:web:6b75028fe405a84990b44d",
  measurementId: "G-VE2B3ZP740"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;