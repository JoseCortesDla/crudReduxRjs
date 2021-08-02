import React,{ Fragment,useEffect} from 'react';

//redux

import { useDispatch,useSelector } from 'react-redux';
import { obtenerProductosAction, } from '../actions/productoActions'

import Producto from './Producto'
const Productos = () =>{

    const dispatch = useDispatch();

    useEffect ( () =>{
        //consulta la api para descargar
        const cargarProductos= () => dispatch( obtenerProductosAction ());
        cargarProductos();
        // eslint-disable-next-line
    },[])

    //obtener el state 
    const productos = useSelector( state => state.productos.productos)
    const error =useSelector( state => state.productos.error)
    const cargando=useSelector(state => state.productos.loading)

    return(    
            <Fragment>
                <h2 className="text-center my-5">Listado de Productos</h2>

                {error && <p className="font-weight-bold alert alert-danger text-center">Hubo un error</p>}
            

                <table className="table table-sptriped">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cargando && <p className="text-center">Cargando...</p>}
                        {productos.length === 0 ? 'No hay productos' : (
                            productos.map (producto => (
                                <Producto key={producto.id} producto={producto}/>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </Fragment>

         
    )
}

export default Productos;