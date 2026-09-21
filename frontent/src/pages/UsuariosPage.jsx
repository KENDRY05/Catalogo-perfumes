import { useEffect, useState } from "react";
import api from "../services/api";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formulario, setFormulario] = useState({
        name: "",
        email: "",
        password: "",
        rol: "cliente",
    });

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
    setLoading(true);
    setError("");

    try {
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
    } catch (error) {
        console.error(error);

        if (error.response?.data?.message) {
            setError(error.response.data.message);
        } else {
            setError("No se pudieron cargar los usuarios");
        }
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

    function nuevoUsuario() {
        setUsuarioEditar(null);

        setFormulario({
            name: "",
            email: "",
            password: "",
            rol: "cliente",
        });

        setError("");
        setMensaje("");
        setMostrarFormulario(true);
    }

    function editarUsuario(usuario) {
        setUsuarioEditar(usuario);

        setFormulario({
            name: usuario.name,
            email: usuario.email,
            password: "",
            rol: usuario.rol,
        });

        setError("");
        setMensaje("");
        setMostrarFormulario(true);
    }

    async function guardarUsuario(e) {
        e.preventDefault();

        setError("");
        setMensaje("");

        try {
            if (usuarioEditar) {
                const datos = {
                    name: formulario.name,
                    email: formulario.email,
                    rol: formulario.rol,
                };

                // Solo enviamos contraseña si se escribió una nueva
                if (formulario.password.trim() !== "") {
                    datos.password = formulario.password;
                }

                await api.put(
                    `/usuarios/${usuarioEditar.id}`,
                    datos
                );

                setMensaje("Usuario actualizado correctamente");
            } else {
                await api.post("/usuarios", formulario);

                setMensaje("Usuario creado correctamente");
            }

            setFormulario({
                name: "",
                email: "",
                password: "",
                rol: "cliente",
            });

            setUsuarioEditar(null);

            await cargarUsuarios();

            setMostrarFormulario(false);
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.data?.errors) {
                const errores = Object.values(
                    error.response.data.errors
                ).flat();

                setError(errores.join(" "));
            } else {
                setError("No se pudo guardar el usuario");
            }
        }
    }

    async function eliminarUsuario(usuario) {
        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar al usuario "${usuario.name}"?`
        );

        if (!confirmar) return;

        try {
            setError("");

            await api.delete(`/usuarios/${usuario.id}`);

            setMensaje("Usuario eliminado correctamente");

            await cargarUsuarios();
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("No se pudo eliminar el usuario");
            }
        }
    }

    return (
        <main style={{ padding: "30px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <h2>Gestión de Usuarios</h2>
                    <p>Administra los usuarios y sus roles.</p>
                </div>

                <button onClick={nuevoUsuario}>
                    + Nuevo usuario
                </button>
            </div>

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

            {mostrarFormulario && (
                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "30px",
                        maxWidth: "500px",
                    }}
                >
                    <h3>
                        {usuarioEditar
                            ? "Editar usuario"
                            : "Crear usuario"}
                    </h3>

                    <form onSubmit={guardarUsuario}>
                        <div style={{ marginBottom: "15px" }}>
                            <label>Nombre</label>
                            <br />

                            <input
                                type="text"
                                name="name"
                                value={formulario.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label>Correo</label>
                            <br />

                            <input
                                type="email"
                                name="email"
                                value={formulario.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label>
                                {usuarioEditar
                                    ? "Nueva contraseña (opcional)"
                                    : "Contraseña"}
                            </label>
                            <br />

                            <input
                                type="password"
                                name="password"
                                value={formulario.password}
                                onChange={handleChange}
                                required={!usuarioEditar}
                                minLength="6"
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label>Rol</label>
                            <br />

                            <select
                                name="rol"
                                value={formulario.rol}
                                onChange={handleChange}
                                required
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                }}
                            >
                                <option value="cliente">
                                    Cliente
                                </option>

                                <option value="admin">
                                    Administrador
                                </option>
                            </select>
                        </div>

                        <button type="submit">
                            {usuarioEditar
                                ? "Guardar cambios"
                                : "Crear usuario"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setMostrarFormulario(false);
                                setUsuarioEditar(null);
                                setError("");
                            }}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            )}

            <h3>Usuarios registrados</h3>

{loading && (
    <p>Cargando usuarios...</p>
)}

{!loading && error && (
    <p style={{ color: "red" }}>
        {error}
    </p>
)}

{!loading && !error && usuarios.length === 0 && (
    <p>No hay usuarios registrados.</p>
)}
                <div
                    style={{
                        display: "grid",
                        gap: "15px",
                    }}
                >
                    {!loading && !error && usuarios.length > 0 && (
    <div>
        {usuarios.map((usuario) => (
            <div key={usuario.id}>
                <p>
                    <strong>Nombre:</strong> {usuario.name}
                </p>

                <p>
                    <strong>Email:</strong> {usuario.email}
                </p>

                <p>
                    <strong>Rol:</strong> {usuario.rol}
                </p>

                <button
                    onClick={() => editarUsuario(usuario)}
                >
                    Editar
                </button>

                <button
                    onClick={() => eliminarUsuario(usuario)}
                >
                    Eliminar
                </button>
            </div>
        ))}
    </div>
)}
                    
                </div>
            
        </main>
    );
}