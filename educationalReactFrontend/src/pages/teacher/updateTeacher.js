import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../components/Alert/Alert";


export default function EditProfesor() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    identification: 0,
    name: "",
    lastname: "",
    contractType: "",
    availableHours: 0,
  });

  const { identification, name, lastname, contractType, availableHours } = teacher;
  const onInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    LoadTeacher();
  }, []);
  const [alertH, setAlertH] = useState(false);
  const [alertF, setAlertF] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const contractT = e.target.contractType.value;
    const hours = e.target.availableHours.value;

    if (contractT === "halftime" && hours !== "20") {
      setAlertH(true);
      setTimeout(() => {
        setAlertH(false);
      }, 3000);
    } else if (contractT === "fulltime" && hours !== "40") {
      setAlertF(true);
      setTimeout(() => {
        setAlertF(false);
      }, 3000);
    }else{
    await axios
      .put(`http://localhost:8091/v1/teachers?user=admin&identification=${id}`,teacher)
      .then((response) => {
        navigate("/ListaProfesores");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha Actualizado Teacher Exitosamente!!!!",
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
    }
  };


  // const LoadTeacher = async () => {
  //   const result = await axios.get(`http://localhost:8091/v1/teachers?user=admin&identification=${id}`);
  //   setTeacher(result.data);
  // };

  const LoadTeacher = async () => {
    const result = await axios.get(`http://localhost:8091/v1/teachers/all`);
   const data= result.data
  const datosF= data.filter(da => da.identification === Number(id))
    setTeacher(datosF[0]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form-group">
          <h2 className="text-center m-4">Editar Profesores</h2>
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
                type={"number"}
                className="form-control"
                placeholder="Digite su Numero de Cedula"
                id="identification"
                name="identification"
                value={identification}
                required
                disabled
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombres
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite su nombre"
                id="name"
                name="name"
                value={name}
                required
                onChange={(e) => onInputChange(e)}
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Apellidos
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite el Apellido"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => onInputChange(e)}
                required
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contractType" className="form-label">
                Tipo De Contrato
              </label>
              <select
                type={"text"}
                className="form-control"
                placeholder="Elija El Tipo de Contrato"
                id="contractType"
                name="contractType"
                value={contractType}
                onChange={(e) => onInputChange(e)}
                required
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
                type={"number"}
                className="form-control"
                placeholder="Elija las Horas Disponibles"
                id="availableHours"
                name="availableHours"
                value={availableHours}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value="">Seleccione....</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
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
