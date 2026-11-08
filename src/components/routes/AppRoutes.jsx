import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Inicio from "../pages/Principal/Inicio";
import Escuelas from "../pages/Escuela/Escuelas";
import DetalleEscuela from "../pages/Escuela/DetalleEscuela";
import { FamiliaLayout } from "../../layouts/FamiliaLayout";
import AlumnosView from "../pages/Familia/AlumnosView";
import MisSolicitudesView from "../pages/Familia/MisSolicitudesViews";
import Login from "../pages/Auth/Login";
import Registro from "../pages/Auth/Registro";
import PreinscripcionNueva from "../pages/Familia/PreinscripcionNueva";
import { BarraNavegacion } from "../common/Navbar";
import { Footer } from "../common/Footer";
import Error404 from "../pages/shared/Error404";
import SinPermiso from "../pages/shared/SinPermiso";
import AdminEscuelaLayout from "../../layouts/AdminEscuelaLayout";

import PanelEscuela from "../pages/AdminEscuela/PanelEscuela";
import SolicitudesEscuela from "../pages/AdminEscuela/SolicitudesEscuela";
import RevisarSolicitud from "../pages/AdminEscuela/RevisarSolicitud";
import VacantesEscuela from "../pages/AdminEscuela/VacantesEscuela";
import ReportesEscuela from "../pages/AdminEscuela/ReportesEscuela";
import ConfiguracionEscuela from "../pages/AdminEscuela/ConfiguracionEscuela";

const AppRoutes = () => {
  const [usuario, setUsuario] = useState(() => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    return usuarioActivo ? JSON.parse(usuarioActivo) : null;
  });

  const navigate = useNavigate();

  // Handler centralizado para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    navigate("/", { replace: true });
  };

  // Wrapper para las páginas públicas con el Navbar sincronizado
  const PaginaPublica = ({ children }) => (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion usuario={usuario} cerrarSesion={cerrarSesion} />
      <div className="flex-grow-1">{children}</div>
      <Footer usuario={usuario} />
    </div>
  );

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route
        path="/"
        element={
          <PaginaPublica>
            <Inicio />
          </PaginaPublica>
        }
      />
      <Route
        path="/escuelas"
        element={
          <PaginaPublica>
            <Escuelas />
          </PaginaPublica>
        }
      />
      <Route
        path="/escuelas/:id"
        element={
          <PaginaPublica>
            <DetalleEscuela />
          </PaginaPublica>
        }
      />

      {/* Rutas de Autenticación */}
      <Route path="/login" element={<Login setUsuario={setUsuario} />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas del Panel Familiar */}
      <Route
        path="/familia"
        element={
          <FamiliaLayout usuario={usuario} cerrarSesion={cerrarSesion} />
        }
      >
        <Route path="alumnos" element={<AlumnosView />} />
        <Route path="escuelas" element={<Escuelas />} />
        <Route path="solicitudes" element={<MisSolicitudesView />} />
        <Route path="preinscripcion/nueva" element={<PreinscripcionNueva />} />
      </Route>
      <Route path="/sin-permiso" element={<SinPermiso></SinPermiso>} />
      <Route path="*" element={<Error404></Error404>} />
      <Route
        path="/escuela"
        element={<AdminEscuelaLayout usuario={usuario} cerrarSesion={cerrarSesion} />}
      >
        <Route path="panel" element={<PanelEscuela />} />
        <Route path="solicitudes" element={<SolicitudesEscuela />} />
        <Route path="solicitudes/:id" element={<RevisarSolicitud />} />
        <Route path="vacantes" element={<VacantesEscuela />} />
        <Route path="reportes" element={<ReportesEscuela />} />
        <Route path="configuracion" element={<ConfiguracionEscuela/>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
