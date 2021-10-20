import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs2-gbC6ZCWZ_ITPHnNt1zCu3Fn9RsH_Q",
  authDomain: "bangers-only.firebaseapp.com",
  projectId: "bangers-only",
  storageBucket: "bangers-only.appspot.com",
  messagingSenderId: "330296551516",
  appId: "1:330296551516:web:ed34bffe81fb8b72695e99",
  measurementId: "G-47ZKJMPMET",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
connectFirestoreEmulator(db, "localhost", 8080);
// TODO: Finesse this so it runs automatically in dev 👌

export default firebaseApp;
