import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Corrección en esta línea
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Utiliza firebaseConfig para inicializar Firebase



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: Blob | ArrayBuffer){
    const storageRef = ref(storage, v4())
   await uploadBytes(storageRef, file);
   const url = await getDownloadURL(storageRef)
   return url
}