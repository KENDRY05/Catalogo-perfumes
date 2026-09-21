import { useEffect, useState } from "react";
import api from "../services/api";

export default function EditarPerfume({
    producto,
    onProductoActualizado,
    onCancelar,
}) {
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);

    const [formulario, setFormulario] = useState({
        categoria_id: "",
        marca_id: "",
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
    });

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [erroresCampos, setErroresCampos] = useState({});

    useEffect(() => {
        cargarDatos();
    }, []);

    async function cargarDatos() {
        try {
            const [categoriasRes, marcasRes] = await Promise.all([
                api.get("/categorias"),
                api.get("/marcas"),
            ]);

            setCategorias(categoriasRes.data);
            setMarcas(marcasRes.data);

            setFormulario({
                categoria_id: producto.categoria_id,
                marca_id: producto.marca_id,
                nombre: producto.nombre,
                descripcion: producto.descripcion || "",
                precio: producto.precio,
                stock: producto.stock,
                imagen: producto.imagen || "",
            });
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los datos");
        }
    }

    function handleChange(e) {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setMensaje("");
        setErroresCampos({});

        try {
            await api.put(`/productos/${producto.id}`, formulario);

            setMensaje("Producto actualizado correctamente");

            if (onProductoActualizado) {
                onProductoActualizado();
            }
        } catch (error) {
    console.error(error);

    if (error.response?.status === 422) {
        setErroresCampos(error.response.data.errors || {});
        return;
    }

    if (error.response?.data?.message) {
        setError(error.response.data.message);
    } else {
        setError("No se pudo actualizar el producto");
    }
}
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar perfume</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Categoría</label>
                    <br />
                    <select
                        name="categoria_id"
                        value={formulario.categoria_id}
                        onChange={handleChange}
                    >
                        {categorias.map((categoria) => (
                            <option
                                key={categoria.id}
                                value={categoria.id}
                            >
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                    {erroresCampos.categoria_id && (
    <p style={{ color: "red" }}>
        {erroresCampos.categoria_id[0]}
    </p>
)}
                </div>

                <br />

                <div>
                    <label>Marca</label>
                    <br />
                    <select
                        name="marca_id"
                        value={formulario.marca_id}
                        onChange={handleChange}
                    >
                        {marcas.map((marca) => (
                            <option
                                key={marca.id}
                                value={marca.id}
                            >
                                {marca.nombre}
                            </option>
                        ))}
                    </select>
                    {erroresCampos.marca_id && (
    <p style={{ color: "red" }}>
        {erroresCampos.marca_id[0]}
    </p>
)}
                </div>

                <br />

                <div>
                    <label>Nombre</label>
                    <br />
                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                    />
                    {erroresCampos.nombre && (
    <p style={{ color: "red" }}>
        {erroresCampos.nombre[0]}
    </p>
)}
                </div>

                <br />

                <div>
                    <label>Descripción</label>
                    <br />
                    <textarea
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Precio</label>
                    <br />
                    <input
                        type="number"
                        step="0.01"
                        name="precio"
                        value={formulario.precio}
                        onChange={handleChange}
                    />
                    {erroresCampos.precio && (
    <p style={{ color: "red" }}>
        {erroresCampos.precio[0]}
    </p>
)}
                </div>

                <br />

                <div>
                    <label>Stock</label>
                    <br />
                    <input
                        type="number"
                        name="stock"
                        value={formulario.stock}
                        onChange={handleChange}
                    />
                    {erroresCampos.stock && (
    <p style={{ color: "red" }}>
        {erroresCampos.stock[0]}
    </p>
)}
                </div>

                <br />

                <div>
                    <label>Imagen</label>
                    <br />
                    <input
                        type="text"
                        name="imagen"
                        value={formulario.imagen}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <button type="submit">
                    Guardar cambios
                </button>

                {" "}

                <button
                    type="button"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}