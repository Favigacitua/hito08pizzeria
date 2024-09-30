import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../../context/UserContext'; // Para acceder al contexto
import { useNavigate } from 'react-router-dom';

export const RegisterComp = () => {
    const { register } = useUserContext(); // Obtener la función de registro del contexto
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    const onInputChange = ({ target }) => {
        const { value, name } = target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'password2') {
            setPassword2(value);
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Validaciones de entrada
        if (email === '' || password === '' || password2 === '') {
            setError('Todos los campos son obligatorios');
            return;
        } else if (password.length < 6 || password2.length < 6) {
            setError('El password debe tener al menos 6 caracteres');
            return;
        } else if (password !== password2) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Intentar registrar al usuario
        try {
            const result = await register(email, password);
            if (!result.success) {
                throw new Error(result.message); // Lanza un error si la respuesta no es exitosa
            }
            alert('Te has registrado correctamente');
            navigate('/login'); // Redirige al login
        } catch (err) {
            setError(err.message); // Captura y muestra errores
        }

        // Limpiar el formulario
        setEmail('');
        setPassword('');
        setPassword2('');
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name='email'
                    value={email}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name='password'
                    value={password}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
                <Form.Label>Repita el password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Repita el password" 
                    name='password2'
                    value={password2}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
            {error && <h6 style={{ color: 'red' }}>{error}</h6>} {/* Mostrar mensaje de error */}
        </Form>
    );
};

export default RegisterComp;
