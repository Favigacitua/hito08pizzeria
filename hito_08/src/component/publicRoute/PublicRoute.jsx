import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const PublicRoute = ({ element }) => {
  const { token } = useUserContext();

  // Si el token es true, redirige a la ruta principal (home)
  if (token) {
    return <Navigate to="/" replace />;
  }

  return element; // Si no, renderiza el elemento (Login o Register)
};

export default PublicRoute;