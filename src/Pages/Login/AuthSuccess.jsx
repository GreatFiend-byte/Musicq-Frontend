import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const AuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const processAuth = async () => {
            try {
                const token = searchParams.get('token');
                const userParam = searchParams.get('user');
                
                console.log('Token:', token);
                console.log('User Param:', userParam);

                if (!token || !userParam) {
                    throw new Error('Faltan parámetros de autenticación');
                }

                const user = JSON.parse(decodeURIComponent(userParam));

                await login(user, token); // Verifica si tu login espera (token, user) o (user, token)

                navigate('/', { replace: true });
                
            } catch (error) {
                console.error('Error en autenticación:', error);
                navigate('/login/error', { 
                    replace: true,
                    state: { error: error.message } 
                });
            }
        };

        processAuth();
    }, [searchParams, navigate, login]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div>
                <h2>Procesando autenticación...</h2>
                <p>Por favor espera mientras te redirigimos</p>
                {/* Opcional: añadir un spinner */}
            </div>
        </div>
    );
};

export default AuthSuccess;