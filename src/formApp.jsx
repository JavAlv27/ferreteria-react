import { useEffect, useState } from "react"
import { Form } from "./components/form"
import { Table } from "./components/table"
import { Reporte } from "./components/reporte"
import {
    suscribirProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto as eliminarProductoFirebase
} from "./firebase/productosService"

export const FormApp = () => {
    const [productos, setProductos] = useState([])

    const valoresIniciales = {
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        descripcion: ""
    }

    const [formValue, setFormValue] = useState(valoresIniciales)
    const [productoEditando, setProductoEditando] = useState(null)

    // Suscripción en tiempo real a Firebase Firestore
    useEffect(() => {
        const desuscribir = suscribirProductos(
            (productosFirestore) => {
                setProductos(productosFirestore)
            },
            (error) => {
                console.error("Error al conectar con Firestore:", error)
                alert(`Error al sincronizar con Firebase: ${error.message}`)
            }
        )

        return () => desuscribir()
    }, [])

    const guardarProducto = async (producto) => {
        const nombreLimpio = producto.nombre.trim().toLowerCase()
        const nombreExiste = productos.some((item) =>
            item.nombre.trim().toLowerCase() === nombreLimpio &&
            item.id !== (productoEditando ? productoEditando.id : null)
        )

        if (nombreExiste) {
            alert(`⚠️ Error: Ya existe un producto registrado con el nombre "${producto.nombre}". Por favor utiliza otro nombre.`)
            return false
        }

        try {
            if (productoEditando) {
                await actualizarProducto(productoEditando.id, producto)
                setProductoEditando(null)
            } else {
                await crearProducto(producto)
            }
            setFormValue(valoresIniciales)
            return true
        } catch (error) {
            console.error("Error al guardar en Firebase:", error)
            alert(`Error al guardar en Firestore: ${error.message}`)
            return false
        }
    }

    const eliminarProducto = async (id) => {
        try {
            await eliminarProductoFirebase(id)
            if (productoEditando && productoEditando.id === id) {
                setProductoEditando(null)
                setFormValue(valoresIniciales)
            }
        } catch (error) {
            console.error("Error al eliminar en Firebase:", error)
            alert(`Error al eliminar de Firestore: ${error.message}`)
        }
    }

    const editarProducto = (item) => {
        setFormValue({
            nombre: item.nombre,
            categoria: item.categoria,
            precio: item.precio,
            stock: item.stock,
            descripcion: item.descripcion || ""
        })
        setProductoEditando(item)
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-brand">
                    <span className="brand-badge">Sistema de Gestión</span>
                    <h1 className="brand-title">Control de Inventario & Bodega</h1>
                    <p className="brand-subtitle">Registro centralizado de herramientas, insumos y materiales</p>
                </div>
            </header>

            <main className="app-main">

                <Reporte productos={productos} />
                <section className="card-section form-section">
                    <div className="section-header">
                        <h2>{productoEditando ? 'Modificar Producto Seleccionado' : 'Registrar Nuevo Producto'}</h2>
                        <span className={`status-indicator ${productoEditando ? 'status-editing' : 'status-ready'}`}>
                            {productoEditando ? `Editando: ${productoEditando.nombre}` : 'Modo Alta'}
                        </span>
                    </div>
                    <Form
                        key={productoEditando ? productoEditando.id : 'nuevo'}
                        inicial={formValue}
                        guardarProducto={guardarProducto}
                        enEdicion={Boolean(productoEditando)}
                        cancelarEdicion={() => {
                            setProductoEditando(null)
                            setFormValue(valoresIniciales)
                        }}
                    />
                </section>

                <section className="card-section table-section">
                    <div className="section-header">
                        <h2>Catálogo de Existencias</h2>
                        <span className="counter-pill">{productos.length} {productos.length === 1 ? 'artículo' : 'artículos'}</span>
                    </div>
                    <Table
                        productos={productos}
                        eliminarProducto={eliminarProducto}
                        editarProducto={editarProducto}
                    />
                </section>
            </main>

            <footer className="app-footer">
                <p>Ferretería Industrial — Plataforma de Administración y Control Operativo</p>
            </footer>
        </div>
    )
}