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

const productosRef = collection(db, "productos")

export const suscribirProductos = (callback, errorCallback) => {
    const q = query(productosRef, orderBy("creadoEn", "desc"))
    return onSnapshot(
        q,
        (snapshot) => {
            const productos = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            }))
            callback(productos)
        },
        (error) => {
            console.error("Error en tiempo real de Firestore:", error)
            if (errorCallback) errorCallback(error)
        }
    )
}

export const crearProducto = (valores) => {
    return addDoc(productosRef, {
        ...valores,
        creadoEn: Date.now(),
    })
}

export const actualizarProducto = (id, valores) => {
    const productoDoc = doc(db, "productos", id)
    const { id: _ignoredId, ...datos } = valores
    return updateDoc(productoDoc, datos)
}

export const eliminarProducto = (id) => {
    const productoDoc = doc(db, "productos", id)
    return deleteDoc(productoDoc)
}
