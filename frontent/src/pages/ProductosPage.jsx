import { useEffect, useState } from "react";
import { getProductos } from "../services/productoService";
import CrearPerfume from "./CrearPerfume";
import EditarPerfume from "./EditarPerfume";
import api from "../services/api";
import "../styles/ProductosPage.css";

export default function ProductosPage() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    async function cargarProductos() {
        setLoading(true);
        setError("");

        try {
            const data = await getProductos();

            console.log("Productos recibidos:", data);

            setProductos(data);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los productos");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarProductos();
    }, []);

    function productoCreado() {
        setMostrarCrear(false);
        cargarProductos();
    }

    function productoActualizado() {
        setProductoEditar(null);
        cargarProductos();
    }

    async function eliminarProducto(producto) {
        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar "${producto.nombre}"?`
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/productos/${producto.id}`);

            alert("Producto eliminado correctamente");

            cargarProductos();
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("No se pudo eliminar el producto");
            }
        }
    }

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <main className="admin-page">

            {/* FORMULARIO CREAR */}
            {mostrarCrear && (
                <CrearPerfume
                    onProductoCreado={productoCreado}
                    onCancelar={() => setMostrarCrear(false)}
                />
            )}

            {/* FORMULARIO EDITAR */}
            {productoEditar && (
                <EditarPerfume
                    producto={productoEditar}
                    onProductoActualizado={productoActualizado}
                    onCancelar={() => setProductoEditar(null)}
                />
            )}

            {/* LISTADO DE PRODUCTOS */}
            {!mostrarCrear && !productoEditar && (
                <>
                    <div className="admin-header">
                        <div>
                            <h1>Panel de Administración</h1>
                            <p>
                                Gestiona los productos del catálogo.
                            </p>
                        </div>

                        <button
                            className="admin-primary-button"
                            onClick={() => setMostrarCrear(true)}
                        >
                            + Crear perfume
                        </button>
                    </div>

                    <h2 className="admin-section-title">
                        Productos
                    </h2>

                    {/* BARRA DE BÚSQUEDA */}
                    <div className="productos-search">
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={busqueda}
                            onChange={(e) =>
                                setBusqueda(e.target.value)
                            }
                        />
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <p>Cargando productos...</p>
                    )}

                    {/* ERROR */}
                    {!loading && error && (
                        <p className="admin-error">
                            {error}
                        </p>
                    )}

                    {/* SIN PRODUCTOS EN LA BASE DE DATOS */}
                    {!loading &&
                        !error &&
                        productos.length === 0 && (
                            <div className="admin-empty">
                                <p>
                                    No hay productos registrados.
                                </p>
                            </div>
                        )}

                    {/* SIN RESULTADOS DE BÚSQUEDA */}
                    {!loading &&
                        !error &&
                        productos.length > 0 &&
                        productosFiltrados.length === 0 && (
                            <div className="admin-empty">
                                <p>
                                    No se encontraron productos.
                                </p>
                            </div>
                        )}

                    {/* LISTA DE PRODUCTOS */}
                    {!loading &&
                        !error &&
                        productosFiltrados.length > 0 && (
                            <div className="productos-grid">

                                {productosFiltrados.map((producto) => (
                                    <div
                                        key={producto.id}
                                        className="producto-card"
                                    >
                                        <h3>
                                            {producto.nombre}
                                        </h3>

                                        <p className="producto-descripcion">
                                            {producto.descripcion ||
                                                "Sin descripción"}
                                        </p>

                                        <p className="producto-dato">
                                            <strong>
                                                Categoría:
                                            </strong>{" "}
                                            {producto.categoria
                                                ? producto.categoria.nombre
                                                : "Sin categoría"}
                                        </p>

                                        <p className="producto-dato">
                                            <strong>
                                                Marca:
                                            </strong>{" "}
                                            {producto.marca
                                                ? producto.marca.nombre
                                                : "Sin marca"}
                                        </p>

                                        <p className="producto-precio">
                                            ${producto.precio}
                                        </p>

                                        <p className="producto-stock">
                                            <strong>
                                                Stock:
                                            </strong>{" "}
                                            {producto.stock} unidades
                                        </p>

                                        <div className="producto-actions">

                                            <button
                                                className="admin-edit-button"
                                                onClick={() =>
                                                    setProductoEditar(
                                                        producto
                                                    )
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="admin-delete-button"
                                                onClick={() =>
                                                    eliminarProducto(
                                                        producto
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
        </main>
    );
}