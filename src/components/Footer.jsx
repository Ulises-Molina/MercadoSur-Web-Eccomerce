import CreditCard from '@mui/icons-material/CreditCard';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Security from '@mui/icons-material/Security';
import { DarkModeContext } from '../context/DarkModeContext';
import { useContext } from 'react';

export const Footer = () => {

    const {darkMode} = useContext(DarkModeContext);

    return (
        <footer className={darkMode ? "footer-dark-mode" :"footer-container"}>
            <div className='footer-contenido'>
                <CreditCard className='footer-icon' fontSize='large'></CreditCard>
                <h2 className='footer-titulo'>Elegi tu medio de pago</h2>
                <p className='footer-p'>Podes pagar con tarjetas de
                debito,credito y efectivo</p>
            </div>
            <div className='footer-contenido medio'>
                <LocalShipping className='footer-icon' fontSize='large'></LocalShipping>
                <h2 className='footer-titulo'>Envio gratis</h2>
                <p className='footer-p'>Envios gratis a cualquier punto del pais superando los $40.000 en tu compra</p>
            </div>
            <div className='footer-contenido'>
                <Security className='footer-icon' fontSize='large'></Security>
                <h2 className='footer-titulo'>Garantizamos tu seguridad</h2>
                <p className='footer-p'>En MercadoSur estas siempre protejido por las leyes de seguridad cibernetica</p>
            </div>
        </footer>
    )
}
