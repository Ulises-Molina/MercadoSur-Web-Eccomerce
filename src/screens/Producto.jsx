import React, { useState } from 'react'
import { Footer } from '../components/Footer'
import { ProductosContext } from '../context/ProductosContext';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Button } from '@mui/material';
import '../styles/producto.css'
import { CarritoContext } from '../context/CarritoContext';
import { Navbar } from '../components/Navbar';
import { DarkModeContext } from '../context/DarkModeContext';


export const Producto = ({}) => { 
    const [added, setAdded] = useState(false)

    const {id} = useParams();
    const {productos} = useContext(ProductosContext)
    const {darkMode} = useContext(DarkModeContext);

    const {agregarCompra ,eliminarCompra} = useContext(CarritoContext)


    const producto = productos.find(prod => prod.id === parseInt(id));

    if (!producto) {
        return <div>Producto no encontrado</div>
    }

    const handleAgregar = (compra) =>{
        agregarCompra(compra)

    }
    const handleQuitar = (id) =>{
        eliminarCompra(id)

    }

    const clickAgregar = () => {
        handleAgregar(producto)
        setAdded(true)
    }
    const clickQuitar = (id) => {
        handleQuitar(producto.id)
        setAdded(false)
    }


    return (
        <>
        <Navbar></Navbar>
        <div className={darkMode ? 'container-producto-dark-mode' :'container-producto'}>
        <div className={darkMode ? 'fondo-dark-mode' :'fondo'}>
            <div className='producto-img-container'>
            <img className={darkMode ? 'producto-imagen-dark-mode':'producto-imagen'} src={producto.image} alt='Imagen del producto'></img>
            </div>
            <div className='producto-info'>
                <h2 className='producto-titulo'>{producto.title}</h2>
                <h2 className='producto-precio'>$ {producto.price}</h2>
                <br></br>
                <p className='producto-p'>Caracteristicas:</p>
                <h2 className='producto-description'>{producto.description}</h2>
                    </div>
                <div className='producto-comprar'>
                    <span className='comprar-info'>
                    <h2 className='producto-precio'>$ {producto.price}</h2>
                    <p className='producto-color'>Modelo : {producto.model}</p>
                    <p className='producto-color'>Color : {producto.color ? producto.color.charAt(0).toUpperCase() + producto.color.slice(1) : "No se proporciono"}
                    </p>

                    </span>
                    <span className='producto-botones'>
                    {added
                    ? <Button className='boton' sx={{backgroundColor:'#951f21',borderRadius: '30px',
                        cursor: 'pointer',
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                        fontSize:'15px',
                        textTransform:"inherit"}} variant='contained'
                        onClick={clickQuitar}>Quitar del carrito</Button>
                    : <Button className='boton' sx={{backgroundColor:'#6374ae',borderRadius: '30px',
                        cursor: 'pointer',
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                        fontSize:'15px',
                        textTransform:"inherit"}} variant='contained'
                        onClick={clickAgregar}>Agregar al carrito</Button>}
                    </span>
                </div>
        </div>
        </div>
        <Footer></Footer>
        </>
    )
}
