import api from "./api";



export const getUsers = async () => {
    try {
        const response = await api.get("/admin/users");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al obtener la lista de usuarios";
    }
};


export const editUser = async (userId, userData) => {
    try {
        const response = await api.put(`/admin/user/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response);
        throw error.response?.data?.message || "Error al editar el usuario";
    }
};


export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/admin/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al eliminar el usuario";
    }
};


export const getInstrumentsByCategory = async (categoryId) => {
    try {
        const response = await api.get(`/category/${categoryId}`);
        return response.data.instrumentos;
    } catch (error) {
        throw error.response?.data?.message || "Error al obtener la lista de instrumentos";
    }
};

export const getInstrumentsyCategories = async () => {
    try {
        const response = await api.get(`/categories`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al obtener la lista de instrumentos";
    }
};


export const addInstrument = async (categoryId, instrumentData) => {
    try {
        const response = await api.post(`/category/${categoryId}/instrument`, instrumentData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al agregar el instrumento";
    }
};


export const editInstrument = async (categoryId, instrumentId, instrumentData) => {
    try {
        const response = await api.put(`/category/${categoryId}/instrument/${instrumentId}`, instrumentData);
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response);
        throw error.response?.data?.message || "Error al editar el instrumento";
    }
};


export const deleteInstrument = async (categoryId, instrumentId) => {
    try {
        const response = await api.delete(`/category/${categoryId}/instrument/${instrumentId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al eliminar el instrumento";
    }
};

export const getBrands = async () => {
    try {
        const response = await api.get("/brands");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo marcas:", error);
        return [];
    }
};

export const addBrand = async (brandData) => {
    try {
        const response = await api.post("/brands", brandData);
        return response.data;
    } catch (error) {
        console.error("Error agregando marca:", error);
        throw error;
    }
};

export const editBrand = async (brandId, brandData) => {
    try {
        const response = await api.put(`/brands/${brandId}`, brandData);
        return response.data;
    } catch (error) {
        console.error("Error editando marca:", error);
        throw error;
    }
};

export const deleteBrand = async (brandId) => {
    try {
        await api.delete(`/brands/${brandId}`);
    } catch (error) {
        console.error("Error eliminando marca:", error);
        throw error;
    }
};

export const getSubcategories = async () => {
    try {
        const response = await api.get("/subcategories");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo subcategorías:", error);
        return [];
    }
};

export const addSubcategory = async (subcategoryData) => {
    try {
        const response = await api.post("/subcategories", subcategoryData);
        return response.data;
    } catch (error) {
        console.error("Error agregando subcategoría:", error);
        throw error;
    }
};

export const editSubcategory = async (subcategoryId, subcategoryData) => {
    try {
        const response = await api.put(`/subcategories/${subcategoryId}`, subcategoryData);
        return response.data;
    } catch (error) {
        console.error("Error editando subcategoría:", error);
        throw error;
    }
};

export const deleteSubcategory = async (subcategoryId) => {
    try {
        await api.delete(`/subcategories/${subcategoryId}`);
    } catch (error) {
        console.error("Error eliminando subcategoría:", error);
        throw error;
    }
};