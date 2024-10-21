import React, { useState } from 'react'
import "../styles/card.css"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { DarkModeContext } from '../context/DarkModeContext';


export const Card = ({imagen,nombre,precio,id}) => {

    const {darkMode} = useContext(DarkModeContext)

    const {setBusqueda} = useContext(ProductosContext)
    const navigate = useNavigate();

    const manejarClick = ()=> {
        navigate(`/producto/${id}`)
        setBusqueda("")
    }



    return (
        <>
            <div className={darkMode ? "tarjeta-dark-mode" : "tarjeta"} onClick={manejarClick}>
                <div className='img-container'>
                <img className={darkMode ? "img-tarjeta-dark-mode" :'img-tarjeta'} src={imagen} alt={nombre}loading='lazy'></img>
                </div>
                <div className='info-tarjeta'>
                <h2 className='description'>{nombre}</h2>
                <p className='price'>$ {precio}</p>
                </div>
            </div>
        </>
    )
}
