import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../component/header/Header';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../../context/CartContext'

import './pizza.css';

export const PizzaDetails = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [error, setError] = useState(null);
    const { handleAddToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchPizza = async () => {
            console.log(`Fetching pizza with ID: ${id}`)
            try {
                const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);

                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(`Error al cargar la pizza: ${errorText}`);
                }

                
                const data = await response.json();

                
                if (data && data.id === id) {
                    setPizza(data);
                } else {
                    setError('Pizza no encontrada');
                }

            } catch (error) {
                console.error('Error al cargar la pizza:', error);
                setError(`Hubo un problema para cargar la información: ${error.message}`);
            }
        };

        fetchPizza();
    }, [id]);

    const handleAddPizza = () => {
        if (pizza) {
            handleAddToCart(pizza);
        }
    };

    return (
        <>
            <Header />
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
            {pizza && (
                <div className='pizzaContainer'>
                    <img
                        src={pizza.img}
                        alt={pizza.name}
                        style={{ width: '500px', height: 'auto' }}
                    />
                    <div className='content'>
                        <h2 style={{ fontWeight: 'bold', paddingBottom: '1rem' }}>{pizza.name}</h2>
                        <p style={{ fontSize: '18px', color: 'gray', paddingBottom: '1rem' }}>{pizza.desc}</p>
                        {pizza.ingredients.map((ingredient, index) => (
                            <p key={index}>&#x1f355; {ingredient}</p>
                        ))}
                        <div style={{ height: '1px', backgroundColor: 'grey', margin: '10px 0', width: '100%', marginTop: '2rem' }}></div>
                        <h3 style={{ fontWeight: 'bold', color: 'black' }}>Precio: ${pizza.price}</h3>
                        <Button variant="dark" style={{ height: '3rem', float: 'right' }} onClick={handleAddPizza} >Añadir &#x1F6D2;</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PizzaDetails;
