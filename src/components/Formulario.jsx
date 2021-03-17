import {React, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const Formulario = ({crearCita}) => {

    //Crear State de turnos

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
    })
    
    const [error, actualizarError] = useState(false);

    //Actualizar form cada vez que el usuario escribe

    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }


   

    //Boton 'agregar cita'

    const submitCita = e =>{


        console.log(cita);
         //Extraer valores de los input
         const {mascota, propietario, fecha, hora, sintomas} = cita;

        e.preventDefault();
        
    
        //Validaciones
        
         if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
             return;
        
        }
        //Eliminar mensaje de error
        actualizarError(false);

        //Asignar ID
        cita.id = uuidv4();

        //Crear cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:'',
        })
        
    }

    const {mascota, propietario, fecha, hora, sintomas} = cita;

    return ( 
        <>
            <h2>Solicitar turno</h2>

                {error ? <p className='alerta-error'>Todos los campos son obligatorios </p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre mascota'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre dueño de mascota'
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                /> 

                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                >
                </textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                >Agregar turno
                </button>
            </form>
        </>
     );
}
 
export default Formulario;