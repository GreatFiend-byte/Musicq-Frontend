import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const LoginError = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const errorMessage = searchParams.get('message');

    const getErrorMessage = () => {
        switch(errorMessage) {
            case 'google_auth_failed':
                return 'Error al autenticar con Google. Por favor intenta nuevamente.';
            default:
                return 'Ocurrió un error durante el proceso de autenticación';
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}>
            <Result
                status="error"
                icon={<CloseCircleOutlined />}
                title="Error de Autenticación"
                subTitle={getErrorMessage()}
                extra={[
                    <Button 
                        type="primary" 
                        key="retry"
                        onClick={() => navigate('/login')}
                    >
                        Volver a Intentar
                    </Button>,
                    <Button 
                        key="home" 
                        onClick={() => navigate('/')}
                    >
                        Ir al Inicio
                    </Button>
                ]}
            />
        </div>
    );
};

export default LoginError;