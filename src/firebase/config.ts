import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Corrección en esta línea
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyDwSTBNMBbVLO0H7w9PLBsJCBsDMwFGIrA",
  authDomain: "user-management-5b7d0.firebaseapp.com",
  projectId: "user-management-5b7d0",
  storageBucket: "user-management-5b7d0.appspot.com",
  messagingSenderId: "94095804041",
  appId: "1:94095804041:web:74c185bdaa9b265a676858"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file){
    const storageRef = ref(storage, v4())
   await uploadBytes(storageRef, file);
   const url = await getDownloadURL(storageRef)
   return url
}