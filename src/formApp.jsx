import { useEffect, useState } from "react"
import { Form } from "./components/form"
import { Table } from "./components/table"
import { Reporte } from "./components/reporte"

const init = () => {
    return JSON.parse(localStorage.getItem('inventario_ferreteria')) || []
}

export const FormApp = () => {
    const [productos, setProductos] = useState(init)

    const valoresIniciales = {
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        descripcion: ""
    }

    const [formValue, setFormValue] = useState(valoresIniciales)
    const [editIndex, setEditIndex] = useState(null)

    useEffect(() => {
        localStorage.setItem("inventario_ferreteria", JSON.stringify(productos))
    }, [productos])

    const guardarProducto = (producto) => {
        // 1. Validación contra nombres duplicados (insensible a mayúsculas/minúsculas)
        const nombreLimpio = producto.nombre.trim().toLowerCase()
        const nombreExiste = productos.some((item, index) =>
            item.nombre.trim().toLowerCase() === nombreLimpio && index !== editIndex
        )

        if (nombreExiste) {
            alert(`⚠️ Error: Ya existe un producto registrado con el nombre "${producto.nombre}". Por favor utiliza otro nombre.`)
            return false // Indica al formulario que no se guardó para no limpiar lo escrito
        }

        if (editIndex === null) {
            setProductos([producto, ...productos])
        } else {
            const productosActualizados = productos.map((item, index) =>
                index === editIndex ? producto : item
            )
            setProductos(productosActualizados)
            setEditIndex(null)
        }
        setFormValue(valoresIniciales)
        return true
    }

    const eliminarProducto = (indexAEliminar) => {
        // Filtramos por posición exacta para eliminar únicamente ese producto
        const productosActualizados = productos.filter((_, index) => index !== indexAEliminar)
        setProductos(productosActualizados)

        // Si estábamos editando el que acabamos de borrar, cancelamos la edición
        if (editIndex === indexAEliminar) {
            setEditIndex(null)
            setFormValue(valoresIniciales)
        }
    }

    const editarProducto = (item, index) => {
        setFormValue({
            nombre: item.nombre,
            categoria: item.categoria,
            precio: item.precio,
            stock: item.stock,
            descripcion: item.descripcion
        })
        setEditIndex(index)
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
                {/* 1. Métricas y KPIs de Bodega */}
                <Reporte productos={productos} />

                {/* 2. Módulo de Registro / Edición */}
                <section className="card-section form-section">
                    <div className="section-header">
                        <h2>{editIndex !== null ? 'Modificar Producto Seleccionado' : 'Registrar Nuevo Producto'}</h2>
                        <span className={`status-indicator ${editIndex !== null ? 'status-editing' : 'status-ready'}`}>
                            {editIndex !== null ? `Editando Fila #${editIndex + 1}` : 'Modo Alta'}
                        </span>
                    </div>
                    <Form
                        key={editIndex}
                        inicial={formValue}
                        guardarProducto={guardarProducto}
                        enEdicion={editIndex !== null}
                        cancelarEdicion={() => {
                            setEditIndex(null)
                            setFormValue(valoresIniciales)
                        }}
                    />
                </section>

                {/* 3. Listado General de Inventario */}
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