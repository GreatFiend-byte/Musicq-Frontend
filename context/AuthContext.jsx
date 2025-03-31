import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mfaPending, setMfaPending] = useState(false);
  const [mfaEmail, setMfaEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);


  const login = (userData, token = null) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
    }
    setMfaPending(false);
    
    // Asegúrate que userData tenga el rol correcto
    console.log('Usuario logueado:', userData); // Para depuración
  };


  const requireMFA = (email) => {
    setMfaPending(true);
    setMfaEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    
    <AuthContext.Provider value={{ 
      isLoggedIn,
      user, 
      mfaPending,
      mfaEmail,
      login,
      logout,
      requireMFA
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};