import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const env = process.env.NEXT_PUBLIC_STAGE;
const firebaseConfig = {
  dev: {
    apiKey: "AIzaSyDFERLvRiszaWxn4CuFh3pxoevFcbAPAJk",
    authDomain: "bangers-only-dev.firebaseapp.com",
    projectId: "bangers-only-dev",
    storageBucket: "bangers-only-dev.appspot.com",
    messagingSenderId: "977351591933",
    appId: "1:977351591933:web:129b1329bfd3d302457b94",
    measurementId: "G-DR1R7LTRZ2",
  },
  prod: {
    apiKey: "AIzaSyDs2-gbC6ZCWZ_ITPHnNt1zCu3Fn9RsH_Q",
    authDomain: "bangers-only.firebaseapp.com",
    projectId: "bangers-only",
    storageBucket: "bangers-only.appspot.com",
    messagingSenderId: "330296551516",
    appId: "1:330296551516:web:ed34bffe81fb8b72695e99",
    measurementId: "G-47ZKJMPMET",
  },
};

const config = firebaseConfig[env];

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(config);
} else {
  firebaseApp = getApp();
}
export const db = getFirestore(firebaseApp);

export default firebaseApp;
