import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";

export default function AsignarCurso() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teachers, setTeachers]=useState([]);
  useEffect(()=>{
    ListTeachers();
  },[]);


  const ListTeachers = async() => {
    const result = await axios.get("http://localhost:8091/v1/teachers/all");
    setTeachers(result.data);

  }
  const [asign, setAsign] = useState({
    courseCode: "",
    name: "",
    identification:"",
    from:"",
    to: ""
  });
 

  
  const { courseCode, name, identification,from,to } = asign;
  const onInputChange = (e) => {
    setAsign({ ...asign, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    LoadCourse();

  }, []);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const courseList=[]

  courseList.push({courseCode,from,to})

    await axios
      .put(`http://localhost:8091/v1/teachers/assign-course?user=admin&identification=${identification}`, courseList)
      .then((response) => {
        navigate("/Listaprofesores");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se Asignado Curso Exitosamente!!!!",
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
    setAsign(result.data);
  };

      
    return (
      <div className="container">
      <div className="row">
        <div className="form-group">
          <h2 className="text-center m-4">Asignacion De Curso</h2>
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
                name="courseCode"
                value={courseCode}
                onChange={(e) => onInputChange(e)}
                autoComplete="nope"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre Del Curso
              </label>
              <input
                type={"text"}
                disabled
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
              <label htmlFor="contractType" className="form-label">
                Asignar Profesor
              </label>
              <select
                type={"text"}
                className="form-control"
                placeholder="Profesor Asignar"
                id="identification"
                name="identification"
                value={identification}
                onChange={(e) => onInputChange(e)}
                required
                 >
                  <option value="">Seleccione....</option>
                  {teachers.map((teacher)=>{
                  return(
                    <option key={teacher.id} value={teacher.identification}>
                      {"C.C" +" "+ teacher.identification + " " + teacher.name +" "+ teacher.lastname}
                    </option>
                  );
                  })
              }
              </select>
            </div>

            <div className="mb-3">
                <label htmlFor="from" className="form-label">
                  Fecha Desde
                 </label>
                <input 
                type="date" 
                className="form-control" 
                id="from"
                name="from" 
                required minLength={4} maxLength={10} 
                placeholder="Fecha Inicio"
                value={from}
                onChange={(e) => onInputChange(e)}

                    />
            </div>
            
            <div className="mb-3">
            <label htmlFor="to" className="form-label">
              Fecha Hasta
              </label>
                <input 
                type="date" 
                className="form-control" 
                id="to"
                name="to" 
                required 
                minLength={4} 
                maxLength={10} 
                placeholder="Fecha fin"
                value={to}
                onChange={(e) => onInputChange(e)}
                    />
            </div>

            <button className="btn btn-primary">Asignar</button>
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