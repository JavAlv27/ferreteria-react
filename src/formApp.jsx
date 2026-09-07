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
        <div>
            <header>
                <h1>Sistema de Inventario - Ferretería</h1>
                <p>Gestión y registro de productos en bodega</p>
            </header>

            <main>
                <Reporte productos={productos} />

                <section>
                    <h2>{editIndex !== null ? 'Editar Producto' : 'Registrar Producto'}</h2>
                    <Form
                        key={editIndex}
                        inicial={formValue}
                        guardarProducto={guardarProducto}
                    />
                </section>

                <section>
                    <h2>Listado de Inventario ({productos.length} productos)</h2>
                    <Table
                        productos={productos}
                        eliminarProducto={eliminarProducto}
                        editarProducto={editarProducto}
                    />
                </section>
            </main>
        </div>
    )
}