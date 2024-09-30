import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { useUserContext } from '../../context/UserContext'; // Cambia a useUser
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
  const { logout, token, fetchUserProfile } = useUserContext(); // Obtener logout, token y la función fetchUserProfile del contexto
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  useEffect(() => {
    // Verificamos el token y redirigimos si es inválido
    if (!token) {
      navigate('/login');
      return; // Salimos si no hay token
    }

    // Función para obtener los datos del usuario
    const loadUserData = async () => {
      const result = await fetchUserProfile(); // Llama a la función para obtener datos del usuario
      if (result.success) {
        setUserData(result.email); // Ajusta según lo que devuelva tu API
      } else {
        console.error(result.message); // Maneja el error
        navigate('/login'); // Redirigir si hay un error
      }
    };

    loadUserData();
  }, [navigate, token, fetchUserProfile]);

  // Si no se han cargado los datos del usuario, mostramos un mensaje de carga
  if (!userData) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className='datosUsuario'>
      <div>
        <img src='./usuario.jpg' alt='foto-del-usuario' className='usuarioImg'/>
      </div>
      <div className='usuarioTexto'>
        <p style={{ marginBottom: '0px' }}><span style={{ fontWeight: 'bold' }}>Usuario: </span> {userData.email}</p>
        <Button variant="dark" style={{ marginTop: '10px' }} onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </div>
  );
}

export default Profile;
