import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_SENDER_ID = process.env.FIREBASE_SENDER_ID;
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}
export const db = getFirestore(firebaseApp);

export default firebaseApp;
