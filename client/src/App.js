import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [experiencia, setExperiencia] = useState(0);

  const [empleadosList, setEmpleados] = useState([]);
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre,
      edad,
      pais,
      cargo,
      experiencia,
    }).then(() => {
      getEmpleados();
      alert("Empleado registrado");
    });
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };
  // getEmpleados();
  return (
    <div className="container">
      <h1>Registro de empleados</h1>
      <div className="datos">
        <div className="input-group mb-3 mt-3">
          <span className="input-group-text">Nombre</span>
          <input
            className="form-control"
            type="text"
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          ></input>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Edad </span>
          <input
            className="form-control"
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
            onChange={(event) => {
              setCargo(event.target.value);
            }}
            type="text"
          ></input>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Experiencia: </span>
          <input
            className="form-control"
            onChange={(event) => {
              setExperiencia(event.target.value);
            }}
            type="number"
          ></input>
        </div>

        <div className="align-self-center">
          <button className="btn btn-success" onClick={add}>
            Registrar
          </button>
        </div>
      </div>
      <div className="">
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
          <tbody className="">
            {empleadosList.map((val, key) => {
              return (
                <tr>
                  <td>{val.id}</td>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.experiencia}</td>
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
