import  { useContext } from 'react'
import "../styles/inicio.css"
import { ProductosContext } from '../context/ProductosContext'
import {Card} from '../components/Card'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { DarkModeContext } from '../context/DarkModeContext'
import { Loading } from '../components/Loading'

export const Inicio = () => {

    const {productos,productosOriginales,loading,filtrarProductos,cambiarFiltro,filtros,valorMinInput,valorMaxInput,manejarValorMinInput,manejarValorMaxInput,busqueda,setProductos} = useContext(ProductosContext);

    const {darkMode} = useContext(DarkModeContext);

    const buscarProductos = (productos) => {
        if(busqueda.length > 2) {
            return productos.filter(producto =>(
                producto.title.toLowerCase().includes(busqueda.toString().toLowerCase())
            ))
        }
        else {
            return productos
        }
    } 

    const productosFiltrados = buscarProductos(filtrarProductos(productos));
    
    const manejarOrdenamiento = (e)=> {
        const valorSeleccionado = e.target.value;

        if (valorSeleccionado === "Menor precio") {
            ordenarProductosMenorPrecio();
        }
        else if (valorSeleccionado === "Mayor precio") {
            ordenarProductosMayorPrecio();
        }
        else if (valorSeleccionado === "Por nombre") {
            ordenarProductosNombre();
        }
        else if (valorSeleccionado === "Mas comprados"){
            setProductos(productosOriginales)
        }
        else {
            setProductos(productosOriginales)
        }
    }

    const ordenarProductosMenorPrecio = () => {
        const productosOrdenados = [...productos].sort((a, b) => a.price - b.price);
        setProductos(productosOrdenados);
    }

    const ordenarProductosMayorPrecio = () => {
        const productosOrdenados = [...productos].sort((a, b) => b.price - a.price);
        setProductos(productosOrdenados);
    }

    const ordenarProductosNombre = () => {
        const productosOrdenados = [...productos].sort((a, b) => a.title.localeCompare(b.title));
        setProductos(productosOrdenados);
    }


    return (
        <>
        <Navbar></Navbar>
        {
            loading ? <Loading></Loading> :
            <div className={darkMode ? "dark-mode" : "background"}>
        {
            filtros.category !== "all" && filtros.category !== "appliances" ? (<h2 className={darkMode ? "filtros-categoria-dark-mode": 'filtros-categoria'}>{
                filtros.category.charAt(0).toUpperCase() + filtros.category.slice(1)}</h2>)
            : filtros.category === "appliances" ? (
                <h2 className={darkMode ? "filtros-categoria-dark-mode": 'filtros-categoria'}>Electrodomesticos </h2>
            )
            : (<h2 hidden></h2>)
        }
        {
            filtros.maxPrice === 35 ? (
                <h2 className={darkMode ? "filtros-categoria-dark-mode": 'filtros-categoria'}>OFERTAS! </h2>
            )
            : (<h2 hidden></h2>)

        }
        <div className='filtro-precio'>
        <label>Introduce un rango de precio</label>
        <input type='number' placeholder='Minimo'
        onChange={manejarValorMinInput}/>
        <input type='number' placeholder='Maximo' onChange={manejarValorMaxInput}/>
        <button onClick={()=> cambiarFiltro(filtros.category,valorMinInput,valorMaxInput)} className='boton-filtrar'>Filtrar</button>
        </div>
        <div className='ordenar-productos'>
        <p className='ordenar-productos'>Ordenar por</p>
        <select className={darkMode? 'ordenar-select-dark-mode':'ordenar-select'}
        onChange={manejarOrdenamiento}>
            <option>
                Mas comprados
            </option>
            <option>
                Menor precio
            </option>
            <option>
                Mayor precio
            </option>
            <option>
                Por nombre
            </option>
        </select>
        </div>
        <div className='container'>
        {
        productosFiltrados.length > 0 ? (
        productosFiltrados.map(producto => (
            <Card key={producto.id}
            id = {producto.id}
            nombre={producto.title}
            imagen={producto.image}
            precio={producto.price}
            />)
        ))
        : 
        (
        <div className='error-container'>
            <p className='mensaje-error'>No se ha encontrado ningun producto que coincida con tu busqueda</p>
        </div>
        )
        
        
        }
        </div>
        </div>
        }
        <Footer></Footer>
        </>
    )
}
