import api from "./api";

export const registerUser = async (email, username, password, nombre, apellido, rol) => {
    try {
        console.log("Registering service " + email + " user " + username);
        const response = await api.post("/register", {
            email,
            username,
            password,
            nombre,
            apellido,
            rol,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};


export const requestPasswordReset = async (email, recaptchaToken) => {
    try {
        const response = await api.post("/request-password-reset", {
            email,
            recaptchaToken
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al solicitar recuperación de contraseña";
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post("/reset-password", {
            token,
            newPassword
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al restablecer contraseña";
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

export const updateUserProfile = async (userData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay sesión activa");
        }

        const response = await api.put("/profile", userData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                ...response.data.user
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        return response.data.user;
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.message ||
            "Error al actualizar el perfil";
        throw new Error(errorMessage);
    }
};

export const loginWithGoogle = async () => {
    try {
        const response = await api.get('/auth/google');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al iniciar sesión con Google";
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await api.post("/login", { username, password });
        
        if (response.data.mfaRequired) {
            return {
                ...response.data,
                isMFARequired: true
            };
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al iniciar sesión";
    }
};


export const verifyMFACode = async ({ email, code, tempToken }) => {
    try {
      const response = await api.post('/login', {
        mfaVerification: true,
        email,
        code,
        tempToken
      });
      
      if (!response.data.token) {
        throw new Error('Respuesta de verificación inválida');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en verifyMFACode:', error);
      throw new Error(error.response?.data?.message || 'Error al verificar código');
    }
  };

export const resendMFACode = async (email, tempToken) => {
    try {
        const response = await api.post('/login', {
            mfaResend: true,
            email,
            tempToken
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al reenviar código";
    }
};