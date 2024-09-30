import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext); 
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    try {
      return savedToken ? JSON.parse(savedToken) : null; 
    } catch (error) {
      console.error('Error parsing token:', error);
      return null; 
    }
  });

  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem('email');
    try {
      return savedEmail ? JSON.parse(savedEmail) : ''
    } catch (error) {
      console.error('Error parsing email:', error);
      return ''
    }
  });

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('email', JSON.stringify(email));
  }, [token, email]);

  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token enviado al backend en registro:', data.token)
        return { success: true };
      } else {
        
        return { success: false, message: data.message || data.error || 'Error desconocido' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); 
        setEmail(email); 
        console.log('Token enviado al backend en login:', data.token)
        return { success: true }; 
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' }; 
      }
    } catch (error) {
      return { success: false, message: error.message }; 
    }
  };

  const logout = () => {
    console.log('Token eliminado al cerrar sesión:', token)
    setToken(''); 
    setEmail(''); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('email');
    console.log('Token eliminado'); 
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, email: data.email }; 
      } else {
        return { success: false, message: 'Error al obtener el perfil.' }; 
      }
    } catch (error) {
      return { success: false, message: error.message }; 
    }
  };

  const value = {token, email, register, login, logout, fetchUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;