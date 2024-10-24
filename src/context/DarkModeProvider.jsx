import { DarkModeContext } from './DarkModeContext'
import { useState } from 'react'

export const DarkModeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(()=> {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const manejarChecked = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        })
    }



    return (
        <DarkModeContext.Provider value={{manejarChecked,darkMode}}>
        {children}
        </DarkModeContext.Provider>
    )
}
