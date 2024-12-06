import "../styles/card.css"
import { useNavigate } from 'react-router-dom';
import { useContext, React } from 'react';
import { ProductosContext } from '../context/ProductosContext';
import { DarkModeContext } from '../context/DarkModeContext';
import {motion} from "motion/react"


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
            <motion.div 
            initial={{opacity: 0, translateY: 130}}
            whileInView={{opacity: 1, translateY: 0,transition: {duration: 0.6}}}
            whileHover={{translateY: -20}}
            className={darkMode ? "tarjeta-dark-mode" : "tarjeta"} onClick={manejarClick}>
                <div className='img-container'>
                <img className={darkMode ? "img-tarjeta-dark-mode" :'img-tarjeta'} src={imagen} alt={nombre}loading='lazy'></img>
                </div>
                <div className='info-tarjeta'>
                <h2 className='description'>{nombre}</h2>
                <p className='price'>$ {precio}</p>
                </div>
            </motion.div>
        </>
    )
}
