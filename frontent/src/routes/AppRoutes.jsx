import { Routes, Route } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ProductosPage from "../pages/ProductosPage";
import CategoriasPage from "../pages/CategoriasPage";
import MarcasPage from "../pages/MarcasPage";
import UsuariosPage from "../pages/UsuariosPage";
import Catalogo from "../pages/Catalogo";

function AppRoutes() {
    return (
        <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas privadas */}
            <Route element={<ProtectedRoute />}>
                
                {/* Layout principal */}
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Catalogo />} />
                    <Route path="/productos" element={<ProductosPage />} />
                    <Route path="/categorias" element={<CategoriasPage />} />
                    <Route path="/marcas" element={<MarcasPage />} />
                    <Route path="/usuarios" element={<UsuariosPage />} />
                </Route>

            </Route>

            {/* Página no encontrada */}
            <Route
                path="*"
                element={<h1>Página no encontrada</h1>}
            />
        </Routes>
    );
}

export default AppRoutes;