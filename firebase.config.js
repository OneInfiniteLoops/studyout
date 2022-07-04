// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBvW05WjNxue7jdMs20fgbuCLeAAewVInU",
  authDomain: "gitsum-studyout.firebaseapp.com",
  projectId: "gitsum-studyout",
  storageBucket: "gitsum-studyout.appspot.com",
  messagingSenderId: "401593371454",
  appId: "1:401593371454:web:8a2266ad39beabddab7a6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);



