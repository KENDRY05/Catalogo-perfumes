import { useNavigate } from "react-router";
import Login from "./Login";

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (usuario) => {
    if (usuario.rol === "admin") {
        navigate("/productos", { replace: true });
    } else {
        navigate("/", { replace: true });
    }
};

    return <Login onLogin={handleLogin} />;
}

export default LoginPage;