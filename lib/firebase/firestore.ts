import { db } from "@lib/firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const writeUserData = async (userId: string, data: any) => {
  console.log("WRITE USER DATA", data);
  await setDoc(doc(db, "users", userId), data);
};

const updateUserData = async (userId: string, data: any) => {
  await updateDoc(doc(db, "users", userId), data);
};

const getUserData = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  const user = userDocSnap.data();
  return user;
};

export const firestore = {
  getUserData,
  writeUserData,
  updateUserData,
};
