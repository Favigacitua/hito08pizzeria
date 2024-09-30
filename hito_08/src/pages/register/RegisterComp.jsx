import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const RegisterComp = () => {
    const { register } = useUserContext(); 
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

        
        try {
            const result = await register(email, password);
            if (!result.success) {
                throw new Error(result.message); 
            }
            alert('Te has registrado correctamente');
            navigate('/login'); 
        } catch (err) {
            setError(err.message); 
        }

        
        setEmail('');
        setPassword('');
        setPassword2('');
    };

    return (

        <div>
             <h1 style={{margin:'3rem', paddingLeft:'3rem', fontWeight:'bold'}}> Register</h1>
    <div style={{margin:'3rem', paddingLeft:'3rem'}}>
    {error && <h6 style={{ color: 'red' }}>{error}</h6>}
    </div>
        <Form style={{padding:'3rem', margin:'3rem'}} onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name='email'
                    value={email}
                    onChange={onInputChange}
                    
                />
                <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
            
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name='password'
                    value={password}
                    onChange={onInputChange}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Repita el password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Repita el password" 
                    name='password2'
                    value={password2}
                    onChange={onInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
            <Button variant="primary" type="submit" style={{width:'6rem'}}>
                Register
            </Button>
            {error && <h6 style={{ color: 'red' }}>{error}</h6>} 
        </Form>
        </div>
    );
};

export default RegisterComp;