import React, { useContext } from 'react'
import { CircularProgress } from '@mui/material'
import { DarkModeContext } from '../context/DarkModeContext'


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
