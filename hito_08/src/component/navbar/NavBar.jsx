import React, { useContext }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { CartContext } from '../../context/CartContext'
import { useUserContext } from '../../context/UserContext'







export function NavBar() { 
  const { cart } = useContext(CartContext);
  const { token, logout } = useUserContext(useContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(); 
    navigate('/');
    console.log("Token después de logout:", token) 
};



  const calcularTotal = () => {
    return cart.reduce((acc, pizza) => acc + (pizza.price || 0) * (pizza.count || 0), 0);
  };

  const total = calcularTotal();
  




  return (
    <Navbar className="bg-dark text-white" >
      <Container fluid style={{paddingLeft:'0px', marginLeft:'2rem', paddingRight:'0px', marginRight:'2rem', width:'100vw'}}>
        <Navbar.Brand href="#home" className="text-white" as={Link} to="/">
         
          Pizzeria Mamma Mia!
          
        </Navbar.Brand>
        <Navbar.Toggle />
  
        <Navbar.Collapse className="">         
            <Button variant="outline-light" as={Link} to="/">
              &#x1F355;Home
            </Button>
            
        {!token ? (
          <>            
              <Button variant="outline-light" className="m-2" as={Link} to="/login">&#x1F510;Login</Button>{" "}
              <Button variant="outline-light" as={Link} to="/register">&#x1F510;Register</Button>{" "}            
          </>
        ) : (
          <>           
              <Button variant="outline-light" className="m-2" as={Link} to="/profile">&#x1F513;Profile</Button>{" "}
              <Button variant="outline-light" onClick={handleLogout}>&#x1F512;Logout</Button>{" "}
              
          </> 
          
        )}

</Navbar.Collapse> 
       
        <Navbar.Collapse className="justify-content-end" style={{  margin:'0px', padding:'none'}}>
          <Button variant="outline-info"  as={Link} to="/cart">&#x1F6D2;Total: ${total} </Button>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavBar