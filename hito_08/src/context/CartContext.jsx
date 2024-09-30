

import React, { createContext, useEffect, useState} from "react";


export const CartContext = createContext()


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState ([])

   
    useEffect (()=> {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));

    }
}, [])


const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (pizza) => {
    console.log("Agregando pizza al carrito:", pizza);
    const newCart = [...cart];
    const pizzaIndex = newCart.findIndex(p => p.id === pizza.id);

    if (pizzaIndex > -1) {
      newCart[pizzaIndex].count += 1;
    } else {
      newCart.push({ ...pizza, count: 1 });
    }

    updateCart(newCart);
  };




  const handleIncrement = (id) => {
    const newList = cart.map(pizza => 
      pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
    );
    updateCart(newList);
        
  };

  const handleDecrement = (id) => {
    const newList = cart
    .map(pizza => {
      if (pizza.id === id) {
        if (pizza.count === 1) {
          return null;
        }
        return { ...pizza, count: pizza.count - 1 }; 
      }
      return pizza; 
    })
    .filter(pizza => pizza !== null); 
  updateCart(newList);
  };


  return (
    <CartContext.Provider value={{ cart, handleIncrement, handleDecrement,  handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext