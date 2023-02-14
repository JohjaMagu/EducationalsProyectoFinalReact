import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt,faBook } from '@fortawesome/free-solid-svg-icons';
export default function ListaCursos() {
  const [course, setCourse]=useState([]);
  useEffect(()=>{
    ListCourses();
  },[]);

  const ListCourses = async() => {
    const result = await axios.get('http://localhost:8091/v1/courses/all');
    setCourse(result.data);
  }
  const DeleteCourse = async (id) => {
    await axios.delete(`http://localhost:8091/v1/courses?code=${id}`)
    .then(response => {
      ListCourses();
        Swal.fire({
            position: 'top-center',
            icon: 'warning',
            title: 'El Curso Ha sido Eliminado Correctamente',
            showConfirmButton: false,
            timer: 1500
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
        <th scope="col">Codigo Curso</th>
        <th scope="col">Nombre</th>
        <th scope="col">Total Horas Semanales</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {course.map((course,index)=>(
       <tr key={index} >
       <td>{course.courseCode}</td>
       <td>{course.name}</td>
       <td>{course.totalHoursWeek}</td> 
       <td>
       <Link   className="btn btn-success" to={`/AsignarCurso/${course.courseCode}`}><FontAwesomeIcon icon={faBook}/>Asignar</Link>
         {" "}
         <Link   className="btn btn-primary" to={`/EditCourse/${course.courseCode}`}><FontAwesomeIcon icon={faEdit}/>Editar</Link>
         {" "}
         <Link  className="btn btn-danger" onClick={()=>DeleteCourse(course.courseCode)}><FontAwesomeIcon icon={faTrashAlt}/>Eliminar
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