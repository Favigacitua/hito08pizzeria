import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext); // Función para acceder al contexto
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    try {
      return savedToken ? JSON.parse(savedToken) : null; // Manejo de errores
    } catch (error) {
      console.error('Error parsing token:', error);
      return null; // Regresar null si hubo un error
    }
  });

  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem('email');
    try {
      return savedEmail ? JSON.parse(savedEmail) : ''; // Manejo de errores
    } catch (error) {
      console.error('Error parsing email:', error);
      return ''; // Regresar cadena vacía si hubo un error
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
        return { success: true };
      } else {
        // Devuelve solo el mensaje que proviene del servidor
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
        setToken(data.token); // Almacena el token
        setEmail(email); // Almacena el email
        return { success: true }; // Indica éxito
      } else {
        return { success: false, message: data.message || data.error || 'Error desconocido' }; // Manejo de errores
      }
    } catch (error) {
      return { success: false, message: error.message }; // Captura errores
    }
  };

  const logout = () => {
    setToken(''); // Limpia el token
    setEmail(''); // Limpia el email
    localStorage.removeItem('token'); // Elimina el token del localStorage
    localStorage.removeItem('email'); // Elimina el email del localStorage
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
        return { success: true, email: data.email }; // Devuelve los datos del usuario
      } else {
        return { success: false, message: 'Error al obtener el perfil.' }; // Manejo de errores
      }
    } catch (error) {
      return { success: false, message: error.message }; // Captura errores
    }
  };

  const value = {
    token,
    email,
    register,
    login,
    logout,
    fetchUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
