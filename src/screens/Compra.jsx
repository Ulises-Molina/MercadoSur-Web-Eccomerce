import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { DarkModeContext } from '../context/DarkModeContext'
import { useContext } from 'react'
import { CarritoContext } from '../context/CarritoContext'
import { FormularioDePago } from '../components/FormularioDePago'
import "../styles/carrito.css"



export const Compra = () => {

    const {darkMode} = useContext(DarkModeContext);
    const {calcularTotal} =useContext(CarritoContext)


    return (
        <>
        <Navbar></Navbar>
        <main className={darkMode? 'container-compra-dark-mode':'container-compra'}>
            <div className={darkMode ? 'carrito-resumen-dark-mode' : 'carrito-resumen'}>
                <p className='carrito-texto'>Resumen de compra</p>
                <span className='carrito-resumen-precio-container'>
                <h2 className='carrito-resumen-total'>Total</h2>
                <h2 className='carrito-resumen-precio'>$ {calcularTotal()}</h2>
                </span>
            </div>
            <div className={darkMode ? 'carrito-resumen-dark-mode' : 'carrito-resumen'}>
                <h2 className='h2'>Datos de la tarjeta</h2>
                <FormularioDePago></FormularioDePago>
            </div>
        </main>
        <Footer></Footer>
        </>
    )
}
