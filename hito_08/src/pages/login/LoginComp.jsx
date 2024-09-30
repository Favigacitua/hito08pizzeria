import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../../context/UserContext'; // Importar el contexto
import { useNavigate } from 'react-router-dom'; // Para redireccionar

export const LoginComp = () => {
  const { login, token} =  useUserContext(); // Destructuramos la función de login y el token
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    if (token) {
      navigate('/profile'); // Redirige al perfil si el usuario ya está autenticado
    }
  }, [token, navigate]);

  const onInputChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validaciones de entrada
    if (email === '' || password === '') {
      setError('Todos los campos son obligatorios');
      return;
    } else if (password.length < 6) {
      setError('El password debe tener al menos 6 caracteres');
      return;
    }

    // Intentar iniciar sesión
    try {
      const result = await login(email, password); // Usar la función de login del contexto

      if (!result.success) {
        throw new Error(result.message); // Manejo de errores basado en la respuesta
      }

      navigate('/profile'); // Redirige al componente Profile después de un login exitoso
    } catch (err) {
      setError(err.message); // Manejo de errores
    }
  };

  return (
    <>
      <h1>Login</h1>
      {error && <h6 style={{ color: 'red' }}>{error}</h6>} {/* Mostrar mensaje de error */}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange={onInputChange}
            value={email}
            name='email' />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            placeholder="Password" 
            onChange={onInputChange}
            value={password}
            name='password' />
        </Form.Group>

        <Button variant="dark" type="submit">Login</Button>
      </Form>
    </>
  );
};

export default LoginComp;


