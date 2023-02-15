import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert/Alert";

export default function AgregarProfesor() {
  let navigate = useNavigate();
  /*const [teacher, setTeacher] = useState({
    identification: 0,
    name: "",
    lastname: "",
    contractType: "",
    availableHours: 0,
  });*/

  //const {identification,name,lastname,contractType,avaliableHours} =teacher;

  /* const onInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]:e.target.value});
  };*/
  const [alertH, setAlertH] = useState(false);
  const [alertF, setAlertF] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const contractT = e.target.contractType.value;
    const hours = e.target.availableHours.value;

    if (contractT === "halftime" && hours !== "20") {
      setAlertH(true);
      setTimeout(() => {
        setAlertH(false);
      }, 2000);
    } else if (contractT === "fulltime" && hours !== "40") {
      setAlertF(true);
      setTimeout(() => {
        setAlertF(false);
      }, 2000);
    } else {
      const teacher = {
        identification: e.target.identification.value,
        name: e.target.name.value,
        lastname: e.target.lastname.value,
        contractType: e.target.contractType.value,
        availableHours: e.target.availableHours.value,
      };

      await axios
        .post("http://localhost:8091/v1/teachers?user=admin", teacher)
        .then((response) => {
          navigate("/ListaProfesores");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Se ha Creado Teacher Exitosamente!!!!",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.body,
          });
        });
      navigate("/ListaProfesores");
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="form-group">
          <h2 className="text-center m-4">Registro De Profesores</h2>
          {alertH && (
            <Alert message="Medio tiempo tiene que ser de 20 Horas"/>
          )}
          {alertF && (
            <Alert message=" Tiempo Completo tiene que ser de 40 Horas"/>
          )}

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="identification" className="form-label">
                Identificacion
              </label>
              <input
                type="number"
                required
                className="form-control"
                placeholder="Digite su Numero de Cedula"
                name="identification"
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Digite su nombre"
                name="name"
                autoComplete="nope"              
                />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="Digite el Apellido"
                name="lastname"
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contractType" className="form-label">
                Tipo De Contrato
              </label>
              <select
                type="text"
                required
                className="form-select"
                placeholder="Elija El Tipo de Contrato"
                id="contractType"
                name="contractType"
              >
                <option value="">Seleccione....</option>
                <option value="halftime">Halftime: Medio Tiempo</option>
                <option value="fulltime">Fulltime: Tiempo completo</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Horas Disponibles
              </label>

              <select
                type="number"
                required
                className="form-control"
                placeholder="Eliga las Horas Disponibles"
                id="availableHours"
                name="availableHours"

              >
                <option value="">Seleccione....</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </select>
            </div>
            <button className="btn btn-primary">Guardar</button>
            {" "}
            <Link to="/Listaprofesores" className="btn btn-secondary">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
