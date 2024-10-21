import { CarritoContext } from './CarritoContext';
import { useEffect, useReducer } from 'react';


const initialState =() => {
    const storedState = localStorage.getItem('listaCompras')
    return storedState ? JSON.parse(storedState) : []
};

export const CarritoProvider = ({children}) => {

    const comprasReducer = ( state = initialState, action={}) => {
        switch (action.type) {
            case '[CARRITO] Agregar Compra':
                return [...state,action.payload]
            case '[CARRITO] Aumentar Cantidad Compra':
                return state.map(item =>{
                    const cant = item.cantidad +1
                    if (item.id === action.payload) return {
                        ...item, cantidad : cant
                    }
                    return item
                })
            case '[CARRITO] Disminuir Cantidad Compra':
                return state.map(item =>{
                    const cant = item.cantidad - 1
                    if (item.id === action.payload) {
                        if( cant >= 1)
                    
                        return {
                        ...item, cantidad : cant
                        }
                        return null;
                    }
                    return item
                })
                .filter(item => item !== null);
            case '[CARRITO] Eliminar Compra':
                return state.filter(compra => compra.id !==action.payload)

            default:
                return state;
        }
    }

    const [listaCompras, dispatch] = useReducer(comprasReducer,[], initialState)

    useEffect(()=> {
        localStorage.setItem('listaCompras',JSON.stringify(listaCompras))
    },[listaCompras])

    const agregarCompra = (compra) => {
        compra.cantidad = 1
        const action = {
            type: '[CARRITO] Agregar Compra',
            payload: compra
        }
        dispatch(action)
    }
    const aumentarCantidad = (id) => {
        const action = {
            type: '[CARRITO] Aumentar Cantidad Compra',
            payload: id
        }
        dispatch(action)
    }
    const disminuirCantidad = (id) => {
        const action = {
            type: '[CARRITO] Disminuir Cantidad Compra',
            payload: id
        }
        dispatch(action)
    }
    const eliminarCompra = (id) => {
        const action = {
            type: '[CARRITO] Eliminar Compra',
            payload: id
        }
        dispatch(action)
    }


    return (
        <CarritoContext.Provider value={{listaCompras, agregarCompra ,aumentarCantidad,disminuirCantidad,eliminarCompra}}>
            {children}
        </CarritoContext.Provider>
    )
}
