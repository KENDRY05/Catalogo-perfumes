import { useEffect, useState } from "react";
import api from "../services/api";

export default function MarcasPage() {
    const [marcas, setMarcas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [marcaEditar, setMarcaEditar] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formulario, setFormulario] = useState({
        nombre: "",
        pais: "",
        descripcion: "",
    });

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarMarcas();
    }, []);

    async function cargarMarcas() {
    setLoading(true);
    setError("");

    try {
        const response = await api.get("/marcas");
        setMarcas(response.data);
    } catch (error) {
        console.error(error);
        setError("No se pudieron cargar las marcas");
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

    function nuevaMarca() {
        setMarcaEditar(null);

        setFormulario({
            nombre: "",
            pais: "",
            descripcion: "",
        });

        setMensaje("");
        setError("");
        setMostrarFormulario(true);
    }

    function editarMarca(marca) {
        setMarcaEditar(marca);

        setFormulario({
            nombre: marca.nombre,
            pais: marca.pais || "",
            descripcion: marca.descripcion || "",
        });

        setMensaje("");
        setError("");
        setMostrarFormulario(true);
    }

    async function guardarMarca(e) {
        e.preventDefault();

        setError("");
        setMensaje("");

        try {
            if (marcaEditar) {
                await api.put(
                    `/marcas/${marcaEditar.id}`,
                    formulario
                );

                setMensaje("Marca actualizada correctamente");
            } else {
                await api.post("/marcas", formulario);

                setMensaje("Marca creada correctamente");
            }

            setFormulario({
                nombre: "",
                pais: "",
                descripcion: "",
            });

            setMarcaEditar(null);

            await cargarMarcas();

            setMostrarFormulario(false);
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("No se pudo guardar la marca");
            }
        }
    }

    async function eliminarMarca(marca) {
        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar "${marca.nombre}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/marcas/${marca.id}`);

            setMensaje("Marca eliminada correctamente");

            cargarMarcas();
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("No se pudo eliminar la marca");
            }
        }
    }

    return (
        <main style={{ padding: "30px" }}>
            <h2>Administración de Marcas</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {mensaje && (
                <p style={{ color: "green" }}>
                    {mensaje}
                </p>
            )}

            {!mostrarFormulario && (
    <>
        <button onClick={nuevaMarca}>
            + Nueva marca
        </button>

        <hr />

        {loading && (
            <p>Cargando marcas...</p>
        )}

        {!loading && error && (
            <p style={{ color: "red" }}>
                {error}
            </p>
        )}

        {!loading && !error && marcas.length === 0 && (
            <p>No hay marcas registradas.</p>
        )}

        {!loading && !error && marcas.length > 0 && (
            marcas.map((marca) => (
                <div
                    key={marca.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>{marca.nombre}</h3>

                    <p>
                        <strong>País:</strong>{" "}
                        {marca.pais || "No especificado"}
                    </p>

                    <p>
                        {marca.descripcion}
                    </p>

                    <button
                        onClick={() =>
                            editarMarca(marca)
                        }
                    >
                        Editar
                    </button>

                    {" "}

                    <button
                        onClick={() =>
                            eliminarMarca(marca)
                        }
                    >
                        Eliminar
                    </button>
                </div>
            ))
        )}
    </>
)}
            {mostrarFormulario && (
                <div>
                    <h3>
                        {marcaEditar
                            ? "Editar marca"
                            : "Nueva marca"}
                    </h3>

                    <form onSubmit={guardarMarca}>
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

                        <br />

                        <div>
                            <label>País</label>
                            <br />

                            <input
                                type="text"
                                name="pais"
                                value={formulario.pais}
                                onChange={handleChange}
                            />
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

                        <button type="submit">
                            {marcaEditar
                                ? "Guardar cambios"
                                : "Crear marca"}
                        </button>

                        {" "}

                        <button
                            type="button"
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