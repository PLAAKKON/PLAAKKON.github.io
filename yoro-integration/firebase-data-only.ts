// Firebase-konfiguraatio pelkälle datalle (ei authia)
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseDataConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  // Ei authDomain - käytetään vain dataa
}

// Alusta Firebase vain dataa varten
const dataApp = initializeApp(firebaseDataConfig, 'dataApp')

// Firestore-tietokanta
export const db = getFirestore(dataApp)

export default dataApp
