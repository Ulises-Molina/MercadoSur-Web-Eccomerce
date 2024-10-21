import React from 'react'
import { ProductosContext } from './ProductosContext'
import { useState,useEffect } from 'react'

export const ProductosProvider = ({children}) => {


    const [filtros, setFiltros] = useState({
        category : "all",
        minPrice : 0, 
        maxPrice: 100000
    })

    const filtrarProductos = (productos) => {
        return productos.filter(producto =>{
            return(
                producto.price >= filtros.minPrice &&
                producto.price <= filtros.maxPrice &&(
                filtros.category === "all" ||
                producto.category === filtros.category)
            )
        })
    }

    const cambiarFiltro = (categoria, minPrice = 0, maxPrice=10000)=>{
        setFiltros({
            category : categoria,
            minPrice,
            maxPrice
        })
    }

    const [productos, setProductos] = useState(()=> {
        const productosSave = localStorage.getItem('productosSave')
        return productosSave ? JSON.parse(productosSave) : []
    });

    const fetchProductos = async()=> {
        const res = await fetch('https://fakestoreapi.in/api/products?limit=150');
        const data = await res.json();
        setProductos(data.products);
    }


    useEffect(() => {
        fetchProductos()
    },[])

    useEffect(()=> {
        localStorage.setItem('productosSave', JSON.stringify(productos))
    },[productos])


    const [valorMinInput, setValorMinInput] = useState(0);

    const [valorMaxInput, setValorMaxInput] = useState(100000);

    const manejarValorMinInput = (e)=>{
        const nuevoValorMin = e.target.value;
        if(nuevoValorMin === "" || nuevoValorMin === undefined ){
            setValorMinInput(0)
        }
        else {setValorMinInput(nuevoValorMin)}
    }

    const manejarValorMaxInput = (e)=>{
        const nuevoValorMax = e.target.value;
        if(nuevoValorMax === "" || nuevoValorMax === undefined) {
            setValorMaxInput(1000000)
        }
        else {
            setValorMaxInput(nuevoValorMax)
        }
        
    }

    const [busqueda, setBusqueda] = useState("");

    const manejarInput = (e) => {
        const valorNuevo = e.target.value;
        console.log(valorNuevo)
        setBusqueda(valorNuevo)
    }


    return (
        <ProductosContext.Provider value={{productos,cambiarFiltro,filtros,filtrarProductos,valorMinInput,valorMaxInput,manejarValorMinInput,manejarValorMaxInput,setProductos,manejarInput,busqueda,setBusqueda}}>
            {children}
        </ProductosContext.Provider>
    )
}
