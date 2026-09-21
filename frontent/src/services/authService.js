import api from "./api";

export async function login(email, password) {
    const response = await api.post("/login", {
        email,
        password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

    return response.data;
}

export async function register(name, email, password, password_confirmation) {
    const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

    return response.data;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
}

export function getUsuario() {
    const usuario = localStorage.getItem("usuario");

    return usuario ? JSON.parse(usuario) : null;
}

export function getToken() {
    return localStorage.getItem("token");
}