export const Reporte = ({ productos }) => {
    // 1. Total de productos registrados (variedad)
    const totalProductos = productos.length

    // 2. Cantidad total de unidades físicas en inventario
    const totalUnidades = productos.reduce(
        (acumulador, prod) => acumulador + Number(prod.stock || 0),
        0
    )

    // 3. Valor monetario total del inventario (precio * stock)
    const valorTotalInventario = productos.reduce(
        (acumulador, prod) => acumulador + (Number(prod.precio || 0) * Number(prod.stock || 0)),
        0
    )

    // 4. Productos con stock crítico (5 o menos unidades)
    const productosCriticos = productos.filter(prod => Number(prod.stock || 0) <= 5)

    return (
        <section>
            <h2>Reporte del Estado del Inventario</h2>

            <div>
                <div>
                    <span>Variedad de Productos:</span>
                    <h3>{totalProductos}</h3>
                </div>

                <div>
                    <span>Unidades Totales en Stock:</span>
                    <h3>{totalUnidades} un.</h3>
                </div>

                <div>
                    <span>Valor Total en Bodega:</span>
                    <h3>${valorTotalInventario.toLocaleString()}</h3>
                </div>

                <div>
                    <span>Productos con Stock Crítico (≤ 5):</span>
                    <h3>{productosCriticos.length}</h3>
                </div>
            </div>

            {/* Listado si hay productos con bajo stock */}
            {productosCriticos.length > 0 && (
                <div>
                    <p><strong>Atención: Reposición urgente requerida para:</strong></p>
                    <ul>
                        {productosCriticos.map((p) => (
                            <li key={p.id}>
                                {p.nombre} — Quedan {p.stock} unidad(es).
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}
