import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Inicio from "../pages/Principal/Inicio";
import Escuelas from "../pages/Escuela/Escuelas";
import DetalleEscuela from "../pages/Escuela/DetalleEscuela";
import { FamiliaLayout } from "../../layouts/FamiliaLayout";
import AlumnosView from "../pages/Familia/AlumnosView";
import MisSolicitudesView from "../pages/Familia/MisSolicitudesViews";
import Login from "../pages/Auth/Login";
import Registro from "../pages/Auth/Registro";

import { BarraNavegacion } from "../common/Navbar";
import { Footer } from "../common/Footer";
import Error404 from "../pages/shared/Error404";
import SinPermiso from "../pages/shared/SinPermiso";

const AppRoutes = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Leemos si hay un usuario activo guardado al cargar la app
  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo) {
      setUsuario(usuarioActivo);
    }
  }, []);

  // Handler centralizado para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    navigate("/", { replace: true});
  };

  // Wrapper para las páginas públicas con el Navbar sincronizado
  const PaginaPublica = ({ children }) => (
    <div className="d-flex flex-column min-vh-100" >
      <BarraNavegacion usuario={usuario} cerrarSesion={cerrarSesion} />
      <div className="flex-grow-1">{children}</div>
      <Footer usuario={usuario} />
    </div>
  );

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<PaginaPublica><Inicio /></PaginaPublica>} />
      <Route path="/escuelas" element={<PaginaPublica><Escuelas /></PaginaPublica>} />
      <Route path="/escuelas/:id" element={<PaginaPublica><DetalleEscuela /></PaginaPublica>} />

      {/* Rutas de Autenticación */}
      <Route path="/login" element={<Login setUsuario={setUsuario} />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas del Panel Familiar */}
      <Route path="/familia" element={<FamiliaLayout usuario={usuario} cerrarSesion={cerrarSesion} />}>
        <Route path="alumnos" element={<AlumnosView />} />
        <Route path="escuelas" element={<Escuelas />} />
        <Route path="solicitudes" element={<MisSolicitudesView />} />
      </Route>

      <Route path="/sin-permiso" element ={<SinPermiso></SinPermiso>} />
      <Route path="*" element={<Error404></Error404>} />
    </Routes>
  );
};

export default AppRoutes;