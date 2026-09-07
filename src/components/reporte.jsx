export const Reporte = ({ productos }) => {
    const totalProductos = productos.length

    const totalUnidades = productos.reduce(
        (acumulador, prod) => acumulador + Number(prod.stock || 0),
        0
    )

    const valorTotalInventario = productos.reduce(
        (acumulador, prod) => acumulador + (Number(prod.precio || 0) * Number(prod.stock || 0)),
        0
    )

    const productosCriticos = productos.filter(prod => Number(prod.stock || 0) <= 5)

    return (
        <section className="card-section reporte-section">
            <div className="section-header">
                <h2>Resumen de Inventario</h2>
                <span className="section-badge">Métricas en Vivo</span>
            </div>

            <div className="kpi-grid">
                <div className="kpi-card kpi-blue">
                    <span className="kpi-label">Variedad de Productos</span>
                    <h3 className="kpi-value">{totalProductos}</h3>
                    <span className="kpi-helper">Artículos distintos</span>
                </div>

                <div className="kpi-card kpi-emerald">
                    <span className="kpi-label">Unidades en Stock</span>
                    <h3 className="kpi-value">{totalUnidades}</h3>
                    <span className="kpi-helper">Total físico disponible</span>
                </div>

                <div className="kpi-card kpi-amber">
                    <span className="kpi-label">Valorización de Bodega</span>
                    <h3 className="kpi-value">${valorTotalInventario.toLocaleString()}</h3>
                    <span className="kpi-helper">Capital estimado</span>
                </div>

                <div className={`kpi-card ${productosCriticos.length > 0 ? 'kpi-red-alert' : 'kpi-neutral'}`}>
                    <span className="kpi-label">Stock Crítico (≤ 5)</span>
                    <h3 className="kpi-value">{productosCriticos.length}</h3>
                    <span className="kpi-helper">{productosCriticos.length > 0 ? 'Requiere reposición' : 'Nivel normal'}</span>
                </div>
            </div>

            {productosCriticos.length > 0 && (
                <div className="stock-alert-box">
                    <div className="alert-title">
                        <span className="alert-icon">⚠️</span>
                        <strong>Alerta de Abastecimiento:</strong> Se detectaron {productosCriticos.length} artículo(s) con stock bajo mínimo.
                    </div>
                    <ul className="alert-list">
                        {productosCriticos.map((p, idx) => (
                            <li key={p.id ?? idx}>
                                <span className="alert-item-name">{p.nombre}</span>
                                <span className="alert-item-stock">Quedan solo {p.stock} unidad(es)</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}
