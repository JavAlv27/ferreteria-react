export const Table = ({ productos, eliminarProducto, editarProducto }) => {

    const eliminar = (item) => {
        const confirmacion = window.confirm(`¿Estás seguro de eliminar "${item.nombre}" del inventario?`)
        if (confirmacion) {
            eliminarProducto(item.id)
        }
    }

    const editar = (item) => {
        const confirmacion = window.confirm(`¿Deseas cargar "${item.nombre}" para editarlo?`)
        if (confirmacion) {
            editarProducto(item)
        }
    }

    return (
        <div className="table-responsive">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th className="text-right">Precio Unitario</th>
                        <th className="text-center">Stock</th>
                        <th>Descripción</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="empty-table-cell">
                                <div className="empty-state">
                                    <span className="empty-icon">📦</span>
                                    <p className="empty-title">Inventario Vacío</p>
                                    <span className="empty-subtitle">Aún no hay productos registrados en bodega. Usa el formulario de arriba para ingresar el primero.</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        productos.map((item, index) => {
                            const esCritico = Number(item.stock || 0) <= 5
                            return (
                                <tr key={item.id ?? index} className={esCritico ? 'row-critical' : ''}>
                                    <td className="cell-name">
                                        <strong>{item.nombre}</strong>
                                    </td>
                                    <td>
                                        <span className="badge-category">{item.categoria}</span>
                                    </td>
                                    <td className="cell-price text-right">
                                        ${Number(item.precio).toLocaleString('es-CL')}
                                    </td>
                                    <td className="text-center">
                                        <span className={`stock-badge ${esCritico ? 'stock-critical' : 'stock-normal'}`}>
                                            {item.stock} un.
                                        </span>
                                    </td>
                                    <td className="cell-desc">
                                        {item.descripcion ? item.descripcion : <span className="muted-dash">—</span>}
                                    </td>
                                    <td className="text-center cell-actions">
                                        <div className="action-buttons-group">
                                            <button
                                                type="button"
                                                className="btn-table btn-edit"
                                                onClick={() => editar(item)}
                                                title="Editar producto"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-table btn-delete"
                                                onClick={() => eliminar(item)}
                                                title="Eliminar producto"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}
