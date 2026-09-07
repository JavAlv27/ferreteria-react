import { useState } from "react"

export const Form = ({ inicial, guardarProducto, enEdicion, cancelarEdicion }) => {
    const [valores, setValores] = useState(inicial)
    const { nombre, categoria, precio, stock, descripcion } = valores

    const cambio = ({ target }) => {
        setValores({
            ...valores,
            [target.name]: target.value
        })
    }

    const guardar = async (e) => {
        e.preventDefault()
        if (
            nombre.trim() === '' ||
            categoria.trim() === '' ||
            precio.toString().trim() === '' ||
            stock.toString().trim() === ''
        ) {
            return alert('Por favor completa los campos obligatorios.')
        }

        const exito = await guardarProducto({
            ...valores,
            precio: Number(precio),
            stock: Number(stock)
        })

        if (exito !== false) {
            reset()
        }
    }

    const reset = () => setValores(inicial)

    return (
        <form className="inventory-form" onSubmit={guardar}>
            <div className="form-group full-width">
                <label htmlFor="nombre">Nombre del Producto <span className="required">*</span></label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ej: Martillo carpintero 16oz"
                    value={nombre}
                    onChange={cambio}
                    autoComplete="off"
                />
            </div>

            <div className="form-group">
                <label htmlFor="categoria">Categoría <span className="required">*</span></label>
                <select
                    id="categoria"
                    name="categoria"
                    value={categoria}
                    onChange={cambio}
                >
                    <option value="">-- Seleccionar categoría --</option>
                    <option value="Herramientas Manuales">Herramientas Manuales</option>
                    <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                    <option value="Fijaciones y Tornillos">Fijaciones y Tornillos</option>
                    <option value="Pinturas y Adhesivos">Pinturas y Adhesivos</option>
                    <option value="Gasfitería / Plomería">Gasfitería / Plomería</option>
                    <option value="Electricidad">Electricidad</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="precio">Precio Unitario ($) <span className="required">*</span></label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Ej: 4990"
                    value={precio}
                    onChange={cambio}
                    min="0"
                />
            </div>

            <div className="form-group">
                <label htmlFor="stock">Cantidad en Stock <span className="required">*</span></label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Ej: 20"
                    value={stock}
                    onChange={cambio}
                    min="0"
                />
            </div>

            <div className="form-group full-width">
                <label htmlFor="descripcion">Descripción Técnica / Notas</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Detalles adicionales de bodega, especificaciones de la herramienta, marca o ubicación..."
                    value={descripcion}
                    onChange={cambio}
                    rows="3"
                />
            </div>

            <div className="form-actions full-width">
                <button type="submit" className={`btn ${enEdicion ? 'btn-update' : 'btn-primary'}`}>
                    {enEdicion ? 'Actualizar Producto' : '+ Registrar Producto'}
                </button>
                {enEdicion && (
                    <button type="button" onClick={cancelarEdicion} className="btn btn-secondary">
                        Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    )
}
