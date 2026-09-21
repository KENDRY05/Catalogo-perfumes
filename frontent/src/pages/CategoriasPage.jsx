import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/CategoriasPage.css";

export default function CategoriasPage() {
    const [categorias, setCategorias] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [categoriaEditar, setCategoriaEditar] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formulario, setFormulario] = useState({
        nombre: "",
        descripcion: "",
    });

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [erroresCampos, setErroresCampos] = useState({});

    useEffect(() => {
        cargarCategorias();
    }, []);

    async function cargarCategorias() {
        setLoading(true);
    setError("");

    try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
    } catch (error) {
        setError("No se pudieron cargar las categorías");
    } finally {
        setLoading(false);
    }
    }

    function handleChange(e) {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    }

    function nuevaCategoria() {
        setCategoriaEditar(null);

        setFormulario({
            nombre: "",
            descripcion: "",
        });

        setMensaje("");
        setError("");
        setMostrarFormulario(true);
    }

    function editarCategoria(categoria) {
        setCategoriaEditar(categoria);

        setFormulario({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion || "",
        });

        setMensaje("");
        setError("");
        setMostrarFormulario(true);
    }

    async function guardarCategoria(e) {
        e.preventDefault();

        setError("");
        setErroresCampos({});
        setMensaje("");

        try {
            if (categoriaEditar) {
                await api.put(
                    `/categorias/${categoriaEditar.id}`,
                    formulario
                );

                setMensaje("Categoría actualizada correctamente");
            } else {
                await api.post("/categorias", formulario);

                setMensaje("Categoría creada correctamente");
            }

            setFormulario({
                nombre: "",
                descripcion: "",
            });

            setCategoriaEditar(null);

            await cargarCategorias();

            setMostrarFormulario(false);
        } catch (error) {
            console.error(error);

            if (error.response?.status === 422) {
    setErroresCampos(error.response.data.errors || {});
    return;
}

if (error.response?.data?.message) {
    setError(error.response.data.message);
} else {
    setError("No se pudo guardar la categoría");
}
            
        }
    }

    async function eliminarCategoria(categoria) {
        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar "${categoria.nombre}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/categorias/${categoria.id}`);

            setMensaje("Categoría eliminada correctamente");

            cargarCategorias();
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("No se pudo eliminar la categoría");
            }
        }
    }

    return (
    <main className="categorias-page">

        {mensaje && (
            <p className="categorias-success">
                {mensaje}
            </p>
        )}

        {error && (
            <p className="categorias-error">
                {error}
            </p>
        )}

        {!mostrarFormulario && (
            <>
                <div className="categorias-header">
                    <div>
                        <h2>
                            Administración de Categorías
                        </h2>

                        <p>
                            Gestiona las categorías de los perfumes.
                        </p>
                    </div>

                    <button
                        className="categoria-primary-button"
                        onClick={nuevaCategoria}
                    >
                        + Nueva categoría
                    </button>
                </div>

                {categorias.length === 0 ? (
                    <div className="categorias-empty">
                        {loading && (
    <p>Cargando categorías...</p>
)}
                        {!loading && categorias.length === 0 && !error && (
    <p>No hay categorías registradas.</p>
)}
                        
                    </div>
                ) : (
                    <div className="categorias-grid">

                        {categorias.map((categoria) => (
                            <div
                                key={categoria.id}
                                className="categoria-card"
                            >
                                <h3>
                                    {categoria.nombre}
                                </h3>

                                <p className="categoria-description">
                                    {categoria.descripcion ||
                                        "Sin descripción"}
                                </p>

                                <div className="categoria-actions">

                                    <button
                                        className="categoria-edit-button"
                                        onClick={() =>
                                            editarCategoria(
                                                categoria
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="categoria-delete-button"
                                        onClick={() =>
                                            eliminarCategoria(
                                                categoria
                                            )
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </>
        )}

        {mostrarFormulario && (
            <div className="categoria-form">

                <h3>
                    {categoriaEditar
                        ? "Editar categoría"
                        : "Nueva categoría"}
                </h3>

                <form onSubmit={guardarCategoria}>

                    <div className="categoria-form-group">
                        <label>
                            Nombre
                        </label>

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

                    <div className="categoria-form-group">
                        <label>
                            Descripción
                        </label>

                        <textarea
                            name="descripcion"
                            value={formulario.descripcion}
                            onChange={handleChange}
                        />
         
                    </div>

                    <button
                        type="submit"
                        className="categoria-save-button"
                    >
                        {categoriaEditar
                            ? "Guardar cambios"
                            : "Crear categoría"}
                    </button>

                    {" "}

                    <button
                        type="button"
                        className="categoria-cancel-button"
                        onClick={() =>
                            setMostrarFormulario(false)
                        }
                    >
                        Cancelar
                    </button>

                </form>
            </div>
        )}

    </main>
);
}