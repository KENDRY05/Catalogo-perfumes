import { useState } from "react";
import { login } from "../services/authService";
import "../styles/Login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const data = await login(email, password);

            onLogin(data.usuario);
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Error al iniciar sesión");
            }
        }
    };

    return (
    <div className="login-page">
        <div className="login-card">

            <h1 className="login-title">
                Perfumería
            </h1>

            <p className="login-subtitle">
                Inicia sesión para continuar
            </p>

            <form onSubmit={handleSubmit}>

                <div className="login-form-group">
                    <label>Correo</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                <div className="login-form-group">
                    <label>Contraseña</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="login-button"
                >
                    Iniciar sesión
                </button>

            </form>

            {error && (
                <p className="login-error">
                    {error}
                </p>
            )}

        </div>
    </div>
);
}

export default Login;