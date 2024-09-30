import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './component/navbar/NavBar';
import { Footer } from './component/footer/Footer';
import { Home } from './pages/home/Home';
import { LoginComp } from './pages/login/LoginComp';
import { RegisterComp } from './pages/register/RegisterComp'; 
import { Profile } from './component/profile/Profile';
import NotFound from './component/notfound/NotFound';
import { Cart } from './pages/cart/Cart';
import PizzaDetails from './pages/pizza/PizzaDetails';
import ProtectedRoute from './component/protectedRoute/ProtectedRoute';
import PublicRoute from './component/publicRoute/PublicRoute';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = () => {
    return cart.reduce((total, pizza) => total + (pizza.price * pizza.count), 0);
  };

  return (
    <div className='page-container'>
      <NavBar total={calculateTotal()} />
      <div className='content-wrap'>
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute element={<LoginComp />} />} />
          <Route path="/register" element={<PublicRoute element={<RegisterComp />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<PizzaDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;




