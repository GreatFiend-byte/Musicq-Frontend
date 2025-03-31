import React from 'react';
import RegisterForm from './Components/RegisterForm';

const Register = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#f0f2f5'
        }}>
            <RegisterForm />
        </div>
    );
};

export default Register;