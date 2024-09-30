import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const ProtectedRoute = ({ element }) => {
  const { token } = useUserContext();

  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;