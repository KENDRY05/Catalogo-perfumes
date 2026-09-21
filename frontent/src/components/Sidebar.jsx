import { NavLink, useNavigate } from "react-router";
import { getUsuario, logout } from "../services/authService";
import "../styles/sidebar.css";

function Sidebar() {
    const usuario = getUsuario();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
    <aside className="sidebar">
        <div className="sidebar-logo">
            <h2>PERFUMES</h2>
            <span>Panel de gestión</span>
        </div>

        <nav className="sidebar-nav">
            {usuario?.rol === "admin" ? (
                <>
                    <NavLink
                        to="/productos"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        🧴 Productos
                    </NavLink>

                    <NavLink
                        to="/categorias"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        📁 Categorías
                    </NavLink>

                    <NavLink
                        to="/marcas"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        🏷️ Marcas
                    </NavLink>

                    <NavLink
                        to="/usuarios"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        👥 Usuarios
                    </NavLink>
                </>
            ) : (
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    🛍️ Catálogo
                </NavLink>
            )}
        </nav>

        <div className="sidebar-bottom">
            <div className="sidebar-user">
                <strong>{usuario?.name ?? usuario?.nombre}</strong>
                <span>{usuario?.rol}</span>
            </div>

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Cerrar sesión
            </button>
        </div>
    </aside>
);
}

export default Sidebar;