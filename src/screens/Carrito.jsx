import React, { useContext } from 'react'
import '../styles/carrito.css'
import { CarritoContext } from '../context/CarritoContext'
import { Navbar } from '../components/Navbar'
import { DarkModeContext } from '../context/DarkModeContext'
import { Footer } from '../components/Footer'

export const Carrito = () => {
    
    const {darkMode} = useContext(DarkModeContext)

    const {listaCompras,aumentarCantidad,disminuirCantidad,eliminarCompra} = useContext(CarritoContext);

    const calcularTotal = ()=> {
        return listaCompras.reduce((total,item) => total + item.price * item.cantidad ,0 ).toFixed(2)
    }


    return (
        <>
        <Navbar></Navbar>
        <div className={darkMode ? 'carrito-container-dark-mode' : 'carrito-container'}>
            {
                listaCompras.map(item => (
                    <div className={darkMode ? 'carrito-producto-dark-mode':'carrito-producto'}>
                <div className='carrito-img-container'>
                    <img src={item.image} className={darkMode ? 'carrito-img-dark-mode':'carrito-img'}></img>
                </div>
                <h2 className='carrito-nombre'>{item.title}</h2>
                <span className='container-botones'>
                <button type='button' className='button'
                onClick={() => disminuirCantidad(item.id)}
                >-</button>
                <button type='button' className='carrito-contador'>{item.cantidad}</button>
                <button type='button' className='button'
                onClick={() => aumentarCantidad(item.id)}
                >+</button>
                </span>
                <p className='carrito-precio'>${item.price} 
                </p>
                <button 
                type='button' 
                className={darkMode? 'eliminar-button-dark-mode':'eliminar-button'}
                onClick={()=> eliminarCompra(item.id)}
                >Eliminar del carrito</button>
            </div>
                ))
            }
            <div className={darkMode ? 'carrito-resumen-dark-mode' : 'carrito-resumen'}>
                <p className='carrito-texto'>Resumen de compra</p>
                <span className='carrito-resumen-precio-container'>
                <h2 className='carrito-resumen-total'>Total</h2>
                <h2 className='carrito-resumen-precio'>$ {calcularTotal()}</h2>
                </span>
                <button className={darkMode ? 'carrito-comprar-dark-mode' : 'carrito-comprar'}>Comprar</button>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
