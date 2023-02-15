import "./App.css";
import "semantic-ui-css/semantic.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ListaProfesores from "./pages/teacher/Listaprofesores";
import AgregarProfesor from "./pages/teacher/AgregarProfesor";
import ListaCursos from "./pages/course/ListaCursos";
import CrearCurso from "./pages/course/CrearCurso";
import AsignarCurso from "./pages/course/AsignarCurso";
import Header from "./components/Header/Header";
import EditProfesor from './pages/teacher/updateTeacher'
import  EditCourse  from "./pages/course/EditCourse";
import ProtectedRoutes from "./pages/ProctectedRoutes";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/ListaProfesores" element={<ListaProfesores />} />
          <Route path="/AgregarProfesor" element={<AgregarProfesor />} />
          <Route path="/ListaCursos" element={<ListaCursos />} />
          <Route path="/CrearCurso" element={<CrearCurso />} />
          <Route path="/AsignarCurso/:id" element={<AsignarCurso />} />
          <Route exact path="/updateTeacher/:id" element={<EditProfesor/>} />
          <Route exact path="/EditCourse/:id" element={<EditCourse/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
