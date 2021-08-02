import { AGREGAR_PRODUCTO,AGREGAR_PRODUCTO_ERROR,AGREGAR_PRODUCTO_EXITO,
         COMENZAR_DESCARGA, DESCARGA_PRODUCTOS_ERROR, DESCARGA_PRODUCTOS_EXITO, 
         OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_ELIMINAR_ERROR, PRODUCTO_ELIMINAR_EXITO,
         OBTENER_PRODUCTO_EDITAR,
         COMENZAR_EDICION_PRODUCTO,
         PRODUCTO_EDITAR_EXITO,
         PRODUCTO_EDITAR_ERROR
        } from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2';


// crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
           dispatch( agregarProductoExito(producto) );

            // Alerta
            Swal.fire(
                'Correcto', 
                'El producto se agregó correctamente',
                'success'
                );

            } catch (error) { 
                // si hay un error cambiar el state
                dispatch( agregarProductoError(true) );
    
                // alerta de error
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error, intenta de nuevo'
                })
            }
        }
    }         


const agregarProducto = () => ({
    type:AGREGAR_PRODUCTO,
    payload:true
})


//si el producto se guarda en la base de datos
const agregarProductoExito = producto =>({
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto
})

//si hubo un erro 
const agregarProductoError = estado =>({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:estado
})

//funcion para descargar los productos de la base de datos
export function obtenerProductosAction () {
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            // consultar la API
            const respuesta=await clienteAxios.get('/productos');
            console.log(respuesta.data)
            // Si todo sale bien, actualizar el state
             dispatch  ( descargaProductosExitosa(respuesta.data))
           

            } catch (error) { 
                dispatch  ( descargaProductosError())
             
            }
    }
}

const descargarProductos = () => ({
    type:COMENZAR_DESCARGA,
    payload:true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//selecciona y elimina el producto
export function borrarProductoAction(id){
    return async (dispatch)=>{
        dispatch(obtenerProductoEliminar(id))

        try{
           await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito ());

            //si se elimina
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )
        }catch (error){
            dispatch(eliminarProductoError ());

        }
    }
}

const obtenerProductoEliminar = id =>({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload:id
})

const eliminarProductoExito = () =>({
    type:PRODUCTO_ELIMINAR_EXITO,
})

const eliminarProductoError = () =>({
    type:PRODUCTO_ELIMINAR_ERROR,
    payload:true
})

// colocar producto en edicicion
export function obtenerProductoEditar (producto){
    return (dispatch)=>{
        dispatch(obtenerProductoEditarAction(producto))
    }
}
const obtenerProductoEditarAction = producto =>({
    type:OBTENER_PRODUCTO_EDITAR,
    payload:producto
})


//EDITA UN registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) =>{
        dispatch(editarProducto())
        try{
          await  clienteAxios.put(`/productos/${producto.id}`,producto)
           dispatch( editarProductoExito(producto))
        }catch(error){
            dispatch( editarProductoError())
        }
    }
}

const editarProducto = () =>({
    type:COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito= producto =>({
    type:PRODUCTO_EDITAR_EXITO,
    payload:producto
})

//si hubo un erro 
const editarProductoError = () =>({
    type:PRODUCTO_EDITAR_ERROR,
    payload:true
})
