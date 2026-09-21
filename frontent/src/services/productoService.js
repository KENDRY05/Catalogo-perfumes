import api from "./api";

export async function getProductos() {
    const response = await api.get("/productos");

    return response.data;
}