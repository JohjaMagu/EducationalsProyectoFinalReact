import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [curso, setCurso] = useState({
    courseCode: "",
    name: "",
    totalHoursWeek: 0,
  });
  const { courseCode, name, totalHoursWeek } = curso;
  const onInputChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    LoadCourse();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8091/v1/courses?user=admin&code=${id}`, curso)
      .then((response) => {
        navigate("/ListaCursos");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha Actualizado Curso Exitosamente!!!!",
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

  const LoadCourse = async () => {
    const result = await axios.get(
      `http://localhost:8091/v1/courses?code=${id}`
    );
    setCurso(result.data);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="form-group">
          <h2 className="text-center m-4">Editar Curso</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="courseCode" className="form-label">
                Codigo Curso
              </label>
              <input
                type={"text"}
                required
                disabled
                className="form-control"
                placeholder="Digite El codigo del Curso"
                id="courseCode"
                name="courseCode"
                value={courseCode}
                onChange={(e) => onInputChange(e)}
                autocomplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre Del Curso
              </label>
              <input
                type={"text"}
                required
                className="form-control"
                placeholder="Digite el Nombre Del Curso"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                autocomplete="off"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="totalHoursWeek" className="form-label">
                Horas Totales Semanales
              </label>
              <input
                type={"number"}
                required
                className="form-control"
                placeholder="Digite Hora Total Semanal"
                id="totalHoursWeek"
                name="totalHoursWeek"
                value={totalHoursWeek}
                onChange={(e) => onInputChange(e)}
                autocomplete="off"
              />
            </div>

            <button className="btn btn-primary">Actualizar</button>
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
