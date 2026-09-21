import { useEffect, useState } from "react";
import api from "../services/api";

export default function CrearPerfume({ onProductoCreado, onCancelar }) {
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
            const [categoriasResponse, marcasResponse] = await Promise.all([
                api.get("/categorias"),
                api.get("/marcas"),
            ]);

            setCategorias(categoriasResponse.data);
            setMarcas(marcasResponse.data);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar las categorías y marcas");
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
            const response = await api.post("/productos", {
                categoria_id: formulario.categoria_id,
                marca_id: formulario.marca_id,
                nombre: formulario.nombre,
                descripcion: formulario.descripcion,
                precio: formulario.precio,
                stock: formulario.stock,
                imagen: formulario.imagen,
            });

            setMensaje("Producto creado correctamente");

            setFormulario({
                categoria_id: "",
                marca_id: "",
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                imagen: "",
            });

            if (onProductoCreado) {
                onProductoCreado(response.data.producto);
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
        setError("No se pudo crear el producto");
    }
}
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Crear perfume</h2>

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
                        required
                    >
                        <option value="">Selecciona una categoría</option>

                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
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
                    <label>Marca</label>
                    <br />

                    <select
                        name="marca_id"
                        value={formulario.marca_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una marca</option>

                        {marcas.map((marca) => (
                            <option key={marca.id} value={marca.id}>
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
                        required
                    />
                </div>
                {erroresCampos.nombre && (
    <p style={{ color: "red" }}>
        {erroresCampos.nombre[0]}
    </p>
)}
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
                        required
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
                        required
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
                    Crear perfume
                </button>

                {" "}

                <button type="button" onClick={onCancelar}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}