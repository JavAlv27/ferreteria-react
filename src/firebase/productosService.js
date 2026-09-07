import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore"
import { db } from "./config"

// Referencia a la colección 'productos' en Firestore
const productosRef = collection(db, "productos")

// 1. LEER en tiempo real (Read): onSnapshot notifica cualquier cambio automáticamente
export const suscribirProductos = (callback) => {
    const q = query(productosRef, orderBy("creadoEn", "desc"))
    return onSnapshot(q, (snapshot) => {
        const productos = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }))
        callback(productos)
    })
}

// 2. CREAR (Create): Agrega un nuevo producto con marca de tiempo
export const crearProducto = (valores) => {
    return addDoc(productosRef, {
        ...valores,
        creadoEn: Date.now(),
    })
}

// 3. ACTUALIZAR (Update): Modifica el documento identificado por su 'id'
export const actualizarProducto = (id, valores) => {
    const productoDoc = doc(db, "productos", id)
    return updateDoc(productoDoc, { ...valores })
}

// 4. ELIMINAR (Delete): Borra el documento identificado por su 'id'
export const eliminarProducto = (id) => {
    const productoDoc = doc(db, "productos", id)
    return deleteDoc(productoDoc)
}
