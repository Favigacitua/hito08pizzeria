import React, { useState, useEffect, useContext } from "react";
import { PizzaTarjeta } from "../../component/pizzatarjeta/PizzaTarjeta";
import { CartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";

export const Cart = () => {
  const { cart, handleIncrement, handleDecrement } = useContext(CartContext);
  const { token } = useUserContext();
  const [total, setTotal] = useState(0);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [error, setError] = useState("");

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

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          cart,
        }),
      });

      console.log('Respuesta del servidor:', response);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error en la respuesta del servidor:', errorData);
        throw new Error(`Error en la compra: ${errorData || 'Respuesta no válida'}`);
      }

      const result = await response.json();
      console.log('Resultado de la compra:', result);

      setPurchaseSuccess(true);
      setError("");
    } catch (error) {
      console.error('Error durante la compra:', error);
      setError(error.message);
      setPurchaseSuccess(false);
    }
  };

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
         
          {!token && (
            <div style={{ color: "red", paddingTop: "1rem", padding:"2rem", paddingLeft:"5rem" , fontSize:"30px", fontWeight:"bolder" }}>
              Debes iniciar sesión para realizar tu compra.
            </div>
          )}
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
            onClick={handleCheckout}
            disabled={!token} 
          >
            PAGAR
          </Button>
          {purchaseSuccess && (
            <div style={{ color: "green", paddingTop: "1rem", padding:"2rem", paddingBottom:"3rem", paddingLeft:"5rem" , fontSize:"30px", fontWeight:"bolder" }}>
              Compra realizada con éxito (:
            </div>
          )}
          {error && (
            <div style={{ color: "red", marginTop: "1rem" }}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
