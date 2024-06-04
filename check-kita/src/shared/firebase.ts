// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIRESTORE_APIKEY,
  authDomain: import.meta.env.VITE_APP_FIRESTORE_APIKEY,
  projectId: import.meta.env.VITE_APP_FIRESTORE_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_FIRESTORE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIRESTORE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_FIRESTORE_APPID,
  measurementId: import.meta.env.VITE_APP_FIRESTORE_MESUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
