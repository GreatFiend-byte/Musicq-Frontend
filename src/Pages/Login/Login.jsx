import React from 'react';
import LoginForm from './Components/LoginForm';

const Login = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#f0f2f5'
        }}>
            <LoginForm />
        </div>
    );
};

export default Login;