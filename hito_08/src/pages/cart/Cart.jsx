import React, { useState, useEffect, useContext } from "react";
import { PizzaTarjeta } from "../../component/pizzatarjeta/PizzaTarjeta";
import { CartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";

export const Cart = () => {
  const { cart, handleIncrement, handleDecrement } = useContext(CartContext);
  const { token } = useContext(useUserContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("Carrito:", cart); 
    calcularTotal();
  }, [cart]);

  const calcularTotal = () => {
    let totalPizzas = 0;
    cart.forEach((pizza) => {
      const price = pizza.price || 0;
      const count = pizza.count || 0;
      totalPizzas += price * count;
    });
    setTotal(totalPizzas);
  };

 
  const isCartEmpty = cart.length === 0;

  console.log("Estado del token:", token);

  return (
    <div>
      {isCartEmpty ? (
        <div>
          <p style={{ margin: "3rem", fontSize: "30px" }}>
            No hay pizzas en el carrito.
          </p>
          <img
            src="/cebolla.jpg"
            alt="cebolla-triste"
            style={{ width: "400px", marginLeft: "5rem" }}
          />
           <Button
            variant="dark"
            style={{
              display: "flex",
              marginLeft: "13rem",
              marginBottom: "2rem",
              width: "9rem",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            disabled={true} 
          >
            PAGAR
          </Button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '6rem', height: '100%' }}>
            {cart.map((pizza) => (
              <PizzaTarjeta 
                key={pizza.id}
                pizza={pizza}
                increment={handleIncrement}
                decrement={handleDecrement}
              />
            ))}
          </div>
          <h4 style={{ margin: '5rem', marginBottom: "2rem", fontWeight: 'bold', width: '800px' }}>Total: ${total}</h4>
          <Button
            variant="dark"
            style={{
              display: "flex",
              marginLeft: "11rem",
              marginBottom: "2rem",
              width: "9rem",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            disabled={false} 
          >
            PAGAR
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;