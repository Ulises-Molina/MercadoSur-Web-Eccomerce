import { CircularProgress } from '@mui/material'
import { DarkModeContext } from '../context/DarkModeContext'
import { useContext } from 'react';


export const Loading = () => {
    
    const {darkMode} =useContext(DarkModeContext)
    
    return (
    <>
    <div className={darkMode? "fondo-loading-dark-mode":"fondo-loading"}>
        <CircularProgress></CircularProgress>
    </div>
    </>
    )
}
