import React from 'react'
import Button from 'react-bootstrap/Button';
import './NotFound.css'
import { Link } from 'react-router-dom';


export const NotFound = () => {
  return (
    <div style={{display:'flex'}}>
      
      <div className='notFoundText'>
        <h1 style={{ fontSize:'200px', fontWeight:'bolder'}}>404</h1>
        <div style={{width:'400px'}}>
        <p>Esto es un error :( </p>
        <p style={{marginBottom:'0'}
        }>No encontramos la pagina, </p>
        <p>ni los ingredientes en el servidor.</p>
        <Button variant="dark" size="sm" style={{marginTop:'1rem', padding:'10px'}
        } as={Link} to="/">
        Pero siempre puedes volver al Home uwu
        </Button>
        
        </div>
      </div>
      <div className='notFoundImg'>
        <img src="/notFound.jpg" alt='chef-indicando'/>
      </div>






    </div>
  )
}

export default NotFound