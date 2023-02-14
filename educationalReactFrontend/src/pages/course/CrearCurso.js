import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
export default function CrearCurso() {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    courseCode: "",
    name: "",
    totalHoursWeek: 0,
  });

  const { courseCode, name, totalHoursWeek } = course;
  const onInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8091/v1/courses?user=admin", course)
      .then((response) => {
        navigate("/ListaCursos");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha Registrado Correctamente El Curso!!!!",
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
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form-group">
          <h2 className="text-center m-4">Crear Curso</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="courseCode" className="form-label">
                Codigo Curso
              </label>
              <input
                type={"text"}
                required
                className="form-control"
                placeholder="Digite El codigo del Curso"
                name="courseCode"
                value={courseCode}
                onChange={(e) => onInputChange(e)}
                autoComplete="nope"
              />

            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre Curso
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite el Nombre Del Curso"
                name="name"
                value={name}
                required
                onChange={(e) => onInputChange(e)}
                autoComplete="nope"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="horasemanal" className="form-label">
                Horas Totales Semanales
              </label>
              <input
                type={"number"}
                required
                className="form-control"
                placeholder="Digite Hora Total Semanal "
                name="totalHoursWeek"
                value={totalHoursWeek}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button className="btn btn-primary">Crear</button>
            {" "}
            <Link to="/ListaCursos" className="btn btn-secondary">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
