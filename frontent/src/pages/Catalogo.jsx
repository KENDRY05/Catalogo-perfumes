import { useEffect, useState } from "react";
import { logout } from "../services/authService";
import { useNavigate } from "react-router";
import { getProductos } from "../services/productoService";

export default function Catalogo() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
};

    useEffect(() => {
        cargarProductos();
    }, []);

    async function cargarProductos() {
        try {
            setError("");

            const data = await getProductos();

            setProductos(data);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los productos");
        }
    }

    function agregarAlCarrito(producto) {
        const productoExistente = carrito.find(
            (item) => item.id === producto.id
        );

        if (productoExistente) {
            if (productoExistente.cantidad < producto.stock) {
                setCarrito(
                    carrito.map((item) =>
                        item.id === producto.id
                            ? {
                                  ...item,
                                  cantidad: item.cantidad + 1,
                              }
                            : item
                    )
                );
            }
        } else {
            setCarrito([
                ...carrito,
                {
                    ...producto,
                    cantidad: 1,
                },
            ]);
        }
    }

    function aumentarCantidad(producto) {
        if (producto.cantidad >= producto.stock) {
            return;
        }

        setCarrito(
            carrito.map((item) =>
                item.id === producto.id
                    ? {
                          ...item,
                          cantidad: item.cantidad + 1,
                      }
                    : item
            )
        );
    }

    function disminuirCantidad(producto) {
        if (producto.cantidad === 1) {
            quitarDelCarrito(producto.id);
            return;
        }

        setCarrito(
            carrito.map((item) =>
                item.id === producto.id
                    ? {
                          ...item,
                          cantidad: item.cantidad - 1,
                      }
                    : item
            )
        );
    }

    function quitarDelCarrito(id) {
        setCarrito(
            carrito.filter((producto) => producto.id !== id)
        );
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const total = carrito.reduce(
        (acumulado, producto) =>
            acumulado +
            Number(producto.precio) * producto.cantidad,
        0
    );

    const cantidadProductos = carrito.reduce(
        (acumulado, producto) =>
            acumulado + producto.cantidad,
        0
    );

    return (
        <main style={{ padding: "30px" }}>

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "30px",
                }}
            >
                <h2>Catálogo de Perfumes</h2>

                <p>
                    Descubre nuestros perfumes disponibles.
                </p>
                <button onClick={handleLogout}>
    Cerrar sesión
</button>
            </div>

            {/* CARRITO */}
            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "30px",
                }}
            >
                <h2>
                    🛒 Carrito ({cantidadProductos})
                </h2>

                {carrito.length === 0 ? (
                    <p>
                        Tu carrito está vacío.
                    </p>
                ) : (
                    <>
                        {carrito.map((producto) => (
                            <div
                                key={producto.id}
                                style={{
                                    borderBottom:
                                        "1px solid #ddd",
                                    padding: "10px 0",
                                }}
                            >
                                <strong>
                                    {producto.nombre}
                                </strong>

                                <p>
                                    ${producto.precio} x{" "}
                                    {producto.cantidad}
                                </p>

                                <button
                                    onClick={() =>
                                        disminuirCantidad(
                                            producto
                                        )
                                    }
                                >
                                    -
                                </button>

                                {" "}

                                <span>
                                    {producto.cantidad}
                                </span>

                                {" "}

                                <button
                                    onClick={() =>
                                        aumentarCantidad(
                                            producto
                                        )
                                    }
                                >
                                    +
                                </button>

                                {" "}

                                <button
                                    onClick={() =>
                                        quitarDelCarrito(
                                            producto.id
                                        )
                                    }
                                >
                                    Quitar
                                </button>
                            </div>
                        ))}

                        <h3>
                            Total: $
                            {total.toFixed(2)}
                        </h3>

                        <button onClick={vaciarCarrito}>
                            Vaciar carrito
                        </button>
                    </>
                )}
            </div>

            {error && (
                <p
                    style={{
                        color: "red",
                        textAlign: "center",
                    }}
                >
                    {error}
                </p>
            )}

            {productos.length === 0 && !error && (
                <p
                    style={{
                        textAlign: "center",
                    }}
                >
                    No hay productos disponibles.
                </p>
            )}

            {/* PRODUCTOS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                }}
            >
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "20px",
                            textAlign: "center",
                            boxShadow:
                                "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    >

                        {producto.imagen ? (
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                style={{
                                    width: "100%",
                                    height: "220px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    marginBottom: "15px",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    height: "220px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                        "center",
                                    backgroundColor:
                                        "#f3f3f3",
                                    borderRadius: "8px",
                                    marginBottom: "15px",
                                }}
                            >
                                Sin imagen
                            </div>
                        )}

                        <h3>{producto.nombre}</h3>

                        <p>
                            {producto.descripcion}
                        </p>

                        {producto.marca && (
                            <p>
                                <strong>
                                    Marca:
                                </strong>{" "}
                                {producto.marca.nombre}
                            </p>
                        )}

                        {producto.categoria && (
                            <p>
                                <strong>
                                    Categoría:
                                </strong>{" "}
                                {producto.categoria.nombre}
                            </p>
                        )}

                        <p
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            ${producto.precio}
                        </p>

                        {producto.stock > 0 ? (
                            <>
                                <p
                                    style={{
                                        color: "green",
                                    }}
                                >
                                    Disponible:{" "}
                                    {producto.stock} unidades
                                </p>

                                <button
                                    onClick={() =>
                                        agregarAlCarrito(
                                            producto
                                        )
                                    }
                                >
                                    Agregar al carrito
                                </button>
                            </>
                        ) : (
                            <p
                                style={{
                                    color: "red",
                                }}
                            >
                                Agotado
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}