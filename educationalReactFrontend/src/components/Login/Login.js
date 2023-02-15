import axios from "axios";
import React from "react";
import { Image } from "semantic-ui-react";


const Login = ({isBtnLogin,setIsBtnLogin}) => {

  

  const submit = (e) => {
    e.preventDefault();
    const user ={
      username: e.target.username.value,
      password: e.target.password.value
  }  
  request(user)
  setIsBtnLogin(!isBtnLogin)
  };

  const request = async(user)=>{
    try {
    const res= await axios.post('http://localhost:8091/v1/auth/validate',user)
     localStorage.setItem("token",res.data.message)
     document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    } catch (error) {
    window.alert('datos incorrectos')  
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
        <div className="col-md-4 offset-md-4 border rounded p-4 mt-2 shadow p-3 mb-2 bg-dark text-white">
          <div className="text-end"></div>
          <h2 className="fw-bold text-center pt-5 mb-5 py-5">Bienvenido</h2>
          <form onSubmit={submit} >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                {" "}
                Usuario
              </label>
              <input
                type={"text"}
                className="form-control"
                id="username"
                name="username"
                placeholder="Ingrese Usuario"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                {" "}
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                name="password"
                id="password"
                placeholder="********"
                autoComplete="off"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                {" "}
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
