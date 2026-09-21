import { getUsuario } from "../services/authService";
import "../styles/header.css";

function Header() {
    const usuario = getUsuario();

    return (
        <header className="header">
            <div>
                <h1>Catálogo de Perfumes</h1>
                <p>Gestiona los perfumes de la tienda</p>
            </div>

            {usuario && (
                <div className="header-user">
                    <strong>
                        {usuario.name ?? usuario.nombre}
                    </strong>

                    <span>
                        {usuario.rol}
                    </span>
                </div>
            )}
        </header>
    );
}

export default Header;