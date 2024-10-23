import React from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import "../styles/navbar.css";
import "../styles/inicio.css"
import SearchIcon from '@mui/icons-material/Search';
import { NavLink,Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useState } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { Switch } from '@mui/material';
import { DarkMode } from '@mui/icons-material';
import { DarkModeContext } from '../context/DarkModeContext';
import "../../public/icons8-bolsa-96.png"



export const Navbar = () => {

    const {cambiarFiltro,filtros,manejarInput} = useContext(ProductosContext);

    const {listaCompras} = useContext(CarritoContext)

    const {manejarChecked,darkMode} = useContext(DarkModeContext)

    const [mostrarCategorias, setMostrarCategorias] = useState(false);
    const botonCategorias = () => setMostrarCategorias(true);
    const cerrarCategorias = () => setMostrarCategorias(false);

    const activarCategorias = () => {
        if(mostrarCategorias){
            cerrarCategorias()
        }
        else {
            botonCategorias()
        }
    }


    return (
        <>
        <div className='header'>
            <NavLink to='/inicio' onClick={()=> cambiarFiltro("all")}>
            <img src='../../public/icons8-bolsa-96.png' alt="Logo"></img></NavLink>
            <Link to="/inicio" className='mercadosur' onClick={()=> cambiarFiltro("all")}>MercadoSur</Link>
            <div className='contenedor-input'>
            <input className='input-search' type='serch' autoComplete='off' placeholder='Buscar productos' onChange={manejarInput}/>
            <SearchIcon className='icon-lupa'></SearchIcon>
            </div>
            <div className='switch-mode'>
            <DarkMode></DarkMode>
            <Switch color="default" size='small'
            inputProps={{ 'aria-label': 'controlled' }}
            checked={darkMode}
            onChange={()=> manejarChecked()}/></div>        
            <NavLink to='/carrito'>
            <Badge badgeContent={listaCompras.length} color="primary" className='cart'>
                <ShoppingCart color="action"/>
            </Badge></NavLink>
        </div>
        <div className={darkMode ? "zocalo-dark-mode" : "zocalo"}>
            <NavLink to={'/inicio'} className={darkMode ? "link-dark-mode" :'link'} onClick={()=> cambiarFiltro("all")}>Inicio</NavLink>
            <a className={darkMode ? "link-dark-mode" :'link'} onMouseEnter={botonCategorias}onMouseLeave={cerrarCategorias} onClick={activarCategorias}>Categorias</a>
            <NavLink to="/inicio"className={darkMode ? "link-dark-mode" :'link'} onClick={()=>cambiarFiltro(filtros.category,0,35)}>Ofertas (menos de $35)</NavLink>
        </div>
        {mostrarCategorias && (
                <div className="categorias-dropdown"
                onMouseEnter={botonCategorias}
                onMouseLeave={cerrarCategorias}>
                    <ul>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("all");cerrarCategorias();}}>Todos</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("gaming");cerrarCategorias();}}>Gaming</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("audio");cerrarCategorias();}}>Audio</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("mobile");cerrarCategorias();}}>Celulares</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("tv");cerrarCategorias();}}>Televisiones</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("laptop");cerrarCategorias();}}>Laptops</NavLink>
                        <NavLink to='/inicio' className="categoria-link" onClick={() => {cambiarFiltro("appliances");cerrarCategorias();}}>Electrodomesticos</NavLink>
                    </ul>
                </div>
            )}
        </>
    )
}
