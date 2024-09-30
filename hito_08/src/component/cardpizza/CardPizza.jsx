import React, {useContext} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardPizza.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'


export const CardPizza = ({ pizzas = []}) => {
  const { handleAddToCart } = useContext(CartContext)


  if (!pizzas || pizzas.length === 0) {
    return <p>No hay pizzas disponibles.</p>;
  }

  return (
    <div className='grid-container'>
      <div className='tarjeta'>
        {pizzas.map(pizza => (
          <Card key={pizza.id} style={{ width: '20rem', margin: '2rem' }}>
            <Card.Img variant="top" src={pizza.img} />
            <Card.Body>
              <Card.Title style={{ paddingBottom: '1rem' }}>Pizza {pizza.name}</Card.Title>
              <hr style={{ border: '1px solid gray' }} />
              <Card.Text>
                <div style={{ textAlign: 'center', fontWeight: 'lighter', paddingTop: '0.5rem' }}>
                  &#x1f355; Ingredientes:
                </div>
                <ul style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                  {pizza.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </Card.Text>
              <hr style={{ border: '1px solid gray' }} />
            </Card.Body>
            <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <p>Precio: ${pizza.price}</p>
            </div>
            <Card.Body style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button variant="secondary" as={Link} to={`/pizza/${pizza.id}`} style={{ height: '3rem', backgroundColor: 'white', color: 'black' }}>
                Ver más &#x1F440;
              </Button>
              <Button
                variant="dark"
                onClick={() => handleAddToCart(pizza)}
              >
                Añadir &#x1F6D2;
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardPizza;




