import api from "./api";


export const getCategorias = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        return [];
    }
};


export const getCategoriaById = async (categoryId) => {
    try {
        const response = await api.get(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo la categoría:", error);
        return null;
    }
};

export const getInstrumentoById = async (categoryId, instrumentId) => {
    try {
        const response = await api.get(`/category/${categoryId}/instrument/${instrumentId}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo el instrumento:", error);
        return null;
    }
};


export const getProductsByBrand = async (brand) => {
    try {
        const response = await api.get(`/products/${brand}`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo productos por marca:", error);
        return [];
    }
};

export const createOrder = async (orderData) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await api.post("/orders", orderData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};