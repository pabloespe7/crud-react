import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useState } from 'react';
import { useState, useEffect } from 'react'; // OJO
import Axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


function App() {
  const [nombre, setNombre]= useState("");
  const [edad, setEdad]= useState("");
  const [pais, setPais]= useState("");
  const [cargo, setCargo]= useState("");
  const [anios, setAnios]= useState("");
  const [id, setId]= useState("");

  const [editar, setEditar]= useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  //Para botón
  const add = (event)=>{
    event.preventDefault();
      Axios.post("http://localhost:3001/create",{
        nombre:nombre,
        edad:edad,
        pais:pais,
        cargo:cargo,
        anios:anios
      }).then(()=>{
          getEmpleados();
          //alert("Empleado registrado")
          limpiarCampos(); 
          MySwal.fire({
                title: "Empleado registrado",
                html: <p>El Empleado {nombre} fue registrado</p>,
                icon: "success",
                draggable: true,
                timer:2000
              }); 
      });
  }

  const update = (event)=>{
    event.preventDefault();
      Axios.put("http://localhost:3001/update",{
        id:id,
        nombre:nombre,
        edad:edad,
        pais:pais,
        cargo:cargo,
        anios:anios
      }).then(()=>{
          getEmpleados();
          limpiarCampos();
           MySwal.fire({
                title: "Actualización Exitosa!!",
                html: <p>El Empleado {nombre} fue actualizado correctamente</p>,
                icon: "success",
                draggable: true,
                timer:2000
              }); 
      });
  }

  
  // Función Eliminar OK

// Función Eliminar
  const deleteE = (val)=>{
    //event.preventDefault();
    Swal.fire({
          title: "Eliminar",
          html: "<p>Realmente desea eliminar a " + val.nombre + "?</p>",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, Eliminarlo!"
        }).then((result) => {
          if (result.isConfirmed) {
             Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
                  getEmpleados();
                  limpiarCampos();    
                  Swal.fire({
                      //title: "Deleted!",
                      text: val.nombre + "Ha sido eliminado.",
                      icon: "success",
                      timer: 2000
                  });             
              }).catch(function(error){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No se logró eliminar el empleado!",
                        footer: error.AxiosError
                      });
        });   
            
          }
        });  
  }


  // Función Eliminar
  /*const deleteE = (val)=>{
    //event.preventDefault();
      Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getEmpleados();
          limpiarCampos();
           MySwal.fire({
                title: "Eliminar",
                html: <p>Realmente desea eliminar a {val.nombre} ?</p>,
                buttons: ["No","Si"],
                icon: "warning",
                draggable: true,
                timer:2000
              }).then(res=>{
                if(res){

                }
              }); 
      });
  }*/


  // Función Editar
  const editarEmpleado = (val)=>{
    setEditar(true);
    
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }

  const limpiarCampos = ()=>{
      setNombre("");
      setEdad("");
      setPais("");
      setCargo("");
      setAnios("");
      setEditar(false); //activa nuevamente el botón registrar
  }

  const getEmpleados = ()=>{
      Axios.get("http://localhost:3001/empleados").then((response)=>{
          setEmpleados(response.data);
      });
  }

  //getEmpleados();

   useEffect(() => {
   getEmpleados();
     }, []);

  return (
    <div className="App">
        
      <div className='lista'> 
                  {/* <button onClick={getEmpleados}> Listar </button> */}
                  
      </div>     

            <div className="card text-center">
                <div className="card-header">
                  Gestión Usuario
                </div>
      <form className="container">
      <div className="card-body">
      
          <div className="col-lg-8 mx-auto text-start">
              <div className="mb-3 ">
                <label className="form-label "  >Nombre</label>
                <input value={nombre}
                  onChange={(event)=>{
                    setNombre(event.target.value);
                  } }
                 type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label  className="form-label">Edad</label>
                <input value={edad}
                  onChange={(event)=>{
                    setEdad(event.target.value);
                  } }
                type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label  className="form-label">País</label>
                <input value={pais}
                   onChange={(event)=>{
                    setPais(event.target.value);
                  } }
                type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label  className="form-label">Cargo</label>
                <input value={cargo}
                  onChange={(event)=>{
                    setCargo(event.target.value);
                  } }
                type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label className="form-label">Años</label>
                <input value={anios}
                  onChange={(event)=>{
                    setAnios(event.target.value);
                  } }
                type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div class="col-4 mx-auto text-center">
                  {
                    editar? 
                    <div>
                      <button onClick={update} className="btn btn-warning m-2">Actualizar</button>
                      <button type="button" onClick={limpiarCampos} className="btn btn-info m-2" >Cancelar</button>
                    </div>
                      :<button onClick={add} className="btn btn-success">Registrar</button>
                  }
                  
                </div>
              <table className="table table-striped container-fluid">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Edad</th>
                            <th scope="col">País</th>
                             <th scope="col">Cargo</th>
                            <th scope="col">Años</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                              {
                                  empleadosList.map((val,key)=>{
                                    return <tr key={val.id}>
                                          <th scope="row">{val.id}</th>
                                          <td>{val.nombre}</td>
                                          <td>{val.edad}</td>
                                          <td>{val.pais}</td>
                                          <td>{val.cargo}</td>
                                          <td>{val.anios}</td>
                                          <div class="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" 
                                              onClick={(event)=>{
                                                editarEmpleado(val);
                                              }}
                                              class="btn btn-info">Editar</button>
                                            <button type="button" onClick={()=>{
                                                
                                                deleteE(val);
                                              }
                                            } class="btn btn-danger">Eliminar</button>
                                          </div>
                                        </tr>
                                                                        
                                  })
                                }
                          
                         
                        </tbody>
              </table>
              
               </div>
              
            </div>
                
              </form>
              </div> 
                
         
        
    </div>
                


   
  );
  
}

export default App;
