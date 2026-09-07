import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Objeto de configuración que lee las credenciales desde las variables de entorno de Vite
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Inicializamos la aplicación de Firebase
const app = initializeApp(firebaseConfig)

// Exportamos la instancia de la base de datos Firestore
export const db = getFirestore(app)
