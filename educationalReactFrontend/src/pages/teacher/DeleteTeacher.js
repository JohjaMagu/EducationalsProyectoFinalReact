import React, { useState,useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link, useNavigate,useParams} from "react-router-dom";
import ListaProfesores from "./Listaprofesores";

export default function EditProfesor() {
    let navigate=useNavigate();
    //const {id}=useParams();
  const [teacher, setTeacher] = useState({
    identification:"",
    name:"",
    lastname:"",
    contractType:"",
    avaliableHours:""
  });
 
  //const{identification,name,lastname,contractType,avaliableHours}= teacher;
  
  /*const onInputChange=(e)=>{
    setTeacher({...teacher, [e.target.name]: e.target.value})
  }*/
  const [id, setId] = useState('');
    const [apellido, setapellido] = useState('');
    const [name, setname] = useState('');
    const [tipoContrato, settipoContrato] = useState('');
    const [horas, sethoras] = useState('');
    const openModalEdit = async (id, name, apellido, tipoContrato, horas) =>{
        setId(id);
        setname(name);
        setapellido(apellido);
        settipoContrato(tipoContrato);
        sethoras(horas);
    }
 
  
  const onSubmit= async (e)=>{
          e.preventDefault();
          let teacher = {
            identification: e.target.identification.value,
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            contractType: e.target.contractType.value,
            availableHours: e.target.avaliableHours.value
    }

    const DeleteTeacher = async (id) => {
        await axios.delete(`http://localhost:8091/v1/teachers/delete?identification=${id}`)
        .then(response => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'It was deleted successfully',
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
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar De Profesores</h2>
          <form onSubmit={(e)=>onSubmit(e)}>
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
              value={id}
              disabled
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite su nombre"
              id="name"
              name="name"
              value={name} 
              onChange={e => setname(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite el Apellido"
              id="lastname"
              name="lastname"
              value={apellido} 
               onChange={e => setapellido(e.target.value)}

            />
          </div>
          <div className="mb-3">
            <label htmlFor="contractType" className="form-label">
              Tipo De Contrato
            </label>
            <select
              type="text"
              className="form-control"
              placeholder="Elija El Tipo de Contrato"
              id="contractType"
              name="contractType"
              value={tipoContrato} 
              onChange={e => settipoContrato(e.target.value)}>
              <option value="">
                Elija Tipo de Contrato
              </option>
              <option value="halftime">halftime</option>
              <option value="fulltime">fulltime</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Horas Disponibles
            </label>
            <select
              type="number"
              className="form-control"
              placeholder="Elija las Horas Disponibles"
              id="avaliableHours"
              name="avaliableHours"
              value={horas} 
              onChange={e => sethoras(e.target.value)}>
              <option value="">
                Elija Horas Disponibles
              </option>
              <option value="20">20</option>
              <option value="40">40</option>
            </select>
          </div>
          <button type="submit" className="btn btn-outline-primary">Guardar</button>
          <Link to="/Listaprofesores" className="btn btn-outline-danger mx-2">Cancelar</Link>
        </form>
        </div>
      </div>
    </div>

    
  );
}
}
