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
        <form onSubmit={guardar}>
            <div>
                <label htmlFor="nombre">Nombre del Producto:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ej: Martillo 16oz"
                    value={nombre}
                    onChange={cambio}
                />
            </div>

            <div>
                <label htmlFor="categoria">Categoría:</label>
                <select
                    id="categoria"
                    name="categoria"
                    value={categoria}
                    onChange={cambio}
                >
                    <option value="">-- Selecciona una categoría --</option>
                    <option value="Herramientas Manuales">Herramientas Manuales</option>
                    <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                    <option value="Fijaciones y Tornillos">Fijaciones y Tornillos</option>
                    <option value="Pinturas y Adhesivos">Pinturas y Adhesivos</option>
                    <option value="Gasfitería / Plomería">Gasfitería / Plomería</option>
                    <option value="Electricidad">Electricidad</option>
                </select>
            </div>

            <div>
                <label htmlFor="precio">Precio ($):</label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Ej: 4990"
                    value={precio}
                    onChange={cambio}
                />
            </div>

            <div>
                <label htmlFor="stock">Stock (Cantidad):</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder="Ej: 20"
                    value={stock}
                    onChange={cambio}
                />
            </div>

            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Detalles adicionales del producto..."
                    value={descripcion}
                    onChange={cambio}
                />
            </div>

            <div>
                <button type="submit">
                    {enEdicion ? 'Actualizar Producto' : 'Guardar Producto'}
                </button>
                {enEdicion && (
                    <button type="button" onClick={cancelarEdicion} style={{ marginLeft: "0.5rem" }}>
                        Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    )
}
