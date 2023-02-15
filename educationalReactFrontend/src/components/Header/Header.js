import { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import Login from "../Login/Login";

export default function Header() {
  const [isBtnLogin, setIsBtnLogin] = useState(false);

  // useEffect(()=>{
  //   if (localStorage.getItem('token')) {
  //     setIsBtnLogin(false)
  //   }

  // },[])

  const currentPath = useLocation();
  const finalCurrentPath = currentPath.pathname.replace("/", "");

  const [activeItem, setActiveItem] = useState(finalCurrentPath);

  const navigate = useNavigate();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    navigate(name);
  };

  return (
    <div className="header-menu">
      <Menu secondary>
        <Menu.Item
          name="inicio"
          active={activeItem === "inicio"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="ListaProfesores"
          active={activeItem === "ListaProfesores"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="AgregarProfesor"
          active={activeItem === "AgregarProfesor"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="ListaCursos"
          active={activeItem === "ListaCursos"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="CrearCurso"
          active={activeItem === "CrearCurso"}
          onClick={handleItemClick}
        />
      </Menu>
      {localStorage.getItem("token") ? (
        <div
        style={{
          cursor:'pointer'
        }}
          onClick={() => {
            localStorage.clear();

            navigate("/");
          }}
          className="position-absolute end-0 top-0 pt-3 px-2 text-white"
         > 
          CERRAR SESION
          <img src="" alt="" />
        </div>
      ) : (
        <div
        style={{
          cursor:'pointer'
        }}
          onClick={() => {
            setIsBtnLogin(!isBtnLogin);
          }}
          className="position-absolute end-0 top-0 pt-3 p text-white px-2  "
        >
         INICIAR SESION          
        </div>
      )}

      <div
          style={{
            cursor:'pointer'
          }}
        className={`${
          isBtnLogin ? " card-login-visibility" : " card-login-hidden"
        } container index p-3 text-white c`}
      >
        <Login isBtnLogin={isBtnLogin} setIsBtnLogin={setIsBtnLogin} />
      </div>
    </div>
  );
}
