import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [experiencia, setExperiencia] = useState(0);
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre,
      edad,
      pais,
      cargo,
      experiencia,
    }).then(() => {
      Swal.fire("Empleado Agregado con exito!");
      getEmpleados();
      limpiar();
    });
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  //

  const editEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setExperiencia(val.experiencia);
    setId(val.id);
  };

  const limpiar = () => {
    setEditar(false);
    setNombre("");
    setEdad("");
    setCargo("");
    setPais("");
    setExperiencia("");
    setId("");
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      nombre,
      edad,
      pais,
      cargo,
      experiencia,
      id,
    }).then(() => {
      getEmpleados();
      limpiar();
      alert("Empleado Actualizado");
    });
  };

  return (
    <div className="container">
      <div className="card text-center mt-5">
        <div className="card-header">
          <h1>Gestión de empleados</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre</span>
            <input
              className="form-control"
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
            ></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Edad </span>
            <input
              className="form-control"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              type="number"
            ></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Pais</span>
            <input
              className="form-control"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              type="text"
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Cargo </span>
            <input
              className="form-control"
              value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              type="text"
            ></input>
          </div>

          <div className="input-group">
            <span className="input-group-text">Experiencia: </span>
            <input
              className="form-control"
              value={experiencia}
              onChange={(event) => {
                setExperiencia(event.target.value);
              }}
              type="number"
            ></input>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? (
            <div className="btn-group" role="group">
              <button className="btn btn-warning" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-secondary" onClick={limpiar}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <div className=" container-fluid mt-5">
        <button className="btn btn-primary" onClick={getEmpleados}>
          Consultar
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Pais</th>
              <th>Cargo</th>
              <th>Experiencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {empleadosList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.experiencia}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => editEmpleado(val)}
                      >
                        Edit
                      </button>
                      <button type="button" className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
