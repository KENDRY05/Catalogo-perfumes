import { Navigate, Outlet } from "react-router";
import { getUsuario } from "../services/authService";

function ProtectedRoute() {
    const usuario = getUsuario();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;