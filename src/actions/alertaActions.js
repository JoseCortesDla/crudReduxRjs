import { MOSTRAR_ALERTA,OCULTAR_ALERTA } from "../types";

//MUESTRA UNA ALERTA    
export function mostrarAlerta(alerta){
    return(dispatch) => {
        dispatch( crearAlerta (alerta))
    }
}

const crearAlerta = alerta => ({
    type:MOSTRAR_ALERTA,
    payload:alerta
})

//OCULTAR Alerta
export function ocultarAlerta(){
    return(dispatch) => {
        dispatch( cerrarAlerta ())
    }
}

const cerrarAlerta = ()=> ({
    type:OCULTAR_ALERTA,
})
