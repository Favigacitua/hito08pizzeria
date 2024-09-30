import React, { useEffect, useState } from 'react';
import { Header } from "../../component/header/Header";
import CardPizza from '../../component/cardpizza/CardPizza';




export const Home = ({setCart}) => {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  
  
 


  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se puede cargar correctamente');
        }
        return response.json();
      })
      .then(data => setPizzas(data))
      .catch(error => {
        console.error('Error al cargar las pizzas', error);
        setError('Hubo un problema para cargar la información');
      });
  }, []);

  const handleAddToCart = (id) => {
    const pizzaToAdd = pizzas.find(pizza => pizza.id === id);
    if (!pizzaToAdd) return;

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const pizzaInCart = savedCart.find(pizza => pizza.id === id);

    if (pizzaInCart) {
      const updatedCart = savedCart.map(pizza =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart); 
    } else {
      const updatedCart = [...savedCart, { ...pizzaToAdd, count: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart); 
    }
    
  };

 

  return (
    <>
    
      <div style={{ height: '100%' }}>
        <Header />
        {error ? (
          <h3 style={{ color: 'red' }}>{error}</h3>
        ) : (
          <>
            <div className='card.container'>
              <CardPizza 
                pizzas={pizzas} 
                onAddToCart={handleAddToCart}
              />
            </div>
            
            
          </>
        )}
      </div>
    </>
  );
};

export default Home;



