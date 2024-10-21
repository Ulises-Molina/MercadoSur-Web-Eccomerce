import React from 'react'
import { Inicio } from './screens/Inicio'
import { ProductosProvider } from './context/ProdcutosProvider'
import { Route, Routes } from 'react-router-dom'
import { Producto } from './screens/Producto'
import { Carrito } from './screens/Carrito'
import { CarritoProvider } from './context/CarritoProvider'
import { DarkModeProvider } from './context/DarkModeProvider'


export const App = () => {
    return (
        <DarkModeProvider>
            <ProductosProvider>
                <CarritoProvider>
                    <Routes>
                        <Route path='/' element={<Inicio></Inicio>}></Route>
                        <Route path='/producto/:id' element={<Producto></Producto>}></Route>
                        <Route path='/inicio' element={<Inicio></Inicio>}></Route>
                        <Route path='/carrito' element={<Carrito></Carrito>}></Route>
                </Routes>
            </CarritoProvider>
        </ProductosProvider>
    </DarkModeProvider>
    )
}
