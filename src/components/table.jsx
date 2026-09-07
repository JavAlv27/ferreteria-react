export const Table = ({ productos, eliminarProducto, editarProducto }) => {

    const eliminar = (item, index) => {
        const confirmacion = window.confirm(`¿Estás seguro de eliminar "${item.nombre}" del inventario?`)
        if (confirmacion) {
            eliminarProducto(index)
        }
    }

    const editar = (item, index) => {
        const confirmacion = window.confirm(`¿Deseas cargar "${item.nombre}" para editarlo?`)
        if (confirmacion) {
            editarProducto(item, index)
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.length === 0 ? (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                            No hay productos registrados en el inventario.
                        </td>
                    </tr>
                ) : (
                    productos.map((item, index) => (
                        <tr key={item.id ?? index}>
                            <td>{item.nombre}</td>
                            <td>{item.categoria}</td>
                            <td>${Number(item.precio).toLocaleString()}</td>
                            <td>{item.stock} un.</td>
                            <td>{item.descripcion || "Sin descripción"}</td>
                            <td>
                                <div>
                                    <button onClick={() => editar(item, index)}>
                                        Editar
                                    </button>
                                    <button onClick={() => eliminar(item, index)}>
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}
