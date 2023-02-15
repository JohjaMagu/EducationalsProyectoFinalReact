import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';



export default function ListaProfesores() {
  const [teachers, setTeachers]=useState([]);
  useEffect(()=>{
    ListTeachers();
  },[]);

  const ListTeachers = async() => {
    const result = await axios.get("http://localhost:8091/v1/teachers/all");
    setTeachers(result.data);
  }
  const DeleteTeacher = async (id) => {
    await axios.delete(`http://localhost:8091/v1/teachers/delete?identification=${id}`)
    .then(response => {
      ListTeachers();
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'El Profesor Ha Sido Eliminado Correctamente',
            showConfirmButton: false,
            timer: 2000
          })
    })
    .catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.body,
          })
    });   
}
  
  return (
    <div>
      <table className="table border-shadow">
    <thead className="table-dark">
      <tr>
        <th scope="col">Identificación</th>
        <th scope="col">Nombres</th>
        <th scope="col">Apellidos</th>
        <th scope="col">Tipo DE Contrato</th>
        <th scope="col">Horas Disponibles</th>
        <th scope="col">Cursos Asignados</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {teachers.map((teacher,index)=>(
       <tr key={index} >
       <td>{teacher.identification}</td>
       <td>{teacher.name}</td>
       <td>{teacher.lastname}</td>
       <td>{teacher.contractType}</td>
       <td>{teacher.availableHours}</td>
       <td>{teacher.assignedCourses}</td>
       
       <td>

         <Link   className="btn btn-primary" to={`/updateTeacher/${teacher.identification}`}><FontAwesomeIcon icon={faEdit}/>Editar</Link>
         {" "}
         <Link  className="btn btn-danger" onClick={()=>DeleteTeacher(teacher.identification)}><FontAwesomeIcon icon={faTrashAlt}/>Eliminar
         </Link>          
       </td>
     </tr>
      ))
      }
    </tbody>
    </table>
    </div>
  );
}