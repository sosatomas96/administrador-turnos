import {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas] );

  //Función que tome las citas actuales y las guarde
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita,
    ])
  }

  //Función que elimina una cita por su ID
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay turnos pendientes' : 'Administra tus turnos';

  return (
  <>
    <h1>Administrador de turnos</h1>

    <div className='container'>
      <div className='row'>
        <div className='one-half column'>
          <Formulario 
            crearCita={crearCita}  
          />
        </div>
        <div className='one-half column'>
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita 
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
