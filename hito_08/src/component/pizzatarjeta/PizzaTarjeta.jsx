import React, {useContext} from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import '../pizzatarjeta/pizzaTarjeta.css';
import { CartContext } from '../../context/CartContext';

export const PizzaTarjeta = ({ pizza }) => {
  const {handleIncrement, handleDecrement} = useContext(CartContext)

  if (!pizza) {
    return <p>Pizza no disponible.</p>;
  }

  return (
  
    <div className='tarjCart'>
      <div className='tarjContenido'>
        <Card className='tarjetacard'> 
        <img src={pizza.img} alt=""  className='imagenCart'/>
          <h4 style={{fontWeight: 'bold', padding: '4px', height: '60px', width: '300px', paddingTop:'1rem', paddingLeft:'1rem'}}>{pizza.name}</h4>
          
          <div style={{ fontWeight: 'bold', width: '100px' }}>${pizza.price}</div>
          <Card.Body className='bodyCart' style={{ width: '100px', padding:'1rem', justifyContent:'flex-end'}}>
            <Button variant="dark" style={{ width: '2rem' }} onClick={() => handleDecrement(pizza.id)}>-</Button>
            <div style={{ color: 'black' }}>{pizza.count}</div>
            <Button variant="dark" style={{ width: '2rem' }} onClick={() => handleIncrement(pizza.id)}>+</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PizzaTarjeta;


