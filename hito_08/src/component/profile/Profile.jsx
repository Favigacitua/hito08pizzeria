import React, { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
  const { logout, token, fetchUserProfile } = useUserContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return; 
    }

    const loadUserData = async () => {
      const result = await fetchUserProfile();
      if (result.success) {
        setUserData(result);
      } else {
        console.error(result.message);
        navigate('/login');
      }
    };

    loadUserData();
  }, [navigate, token, fetchUserProfile]);

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
        <Button variant="dark" style={{ marginTop: '10px', marginTop:'2rem' }} onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </div>
  );
}

export default Profile;
