import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Principal/Inicio";
import Escuelas from "../pages/Escuela/Escuelas";
import DetalleEscuela from "../pages/Escuela/DetalleEscuela";
import { FamiliaLayout } from "../../layouts/FamiliaLayout";
import { AlumnosView } from "../pages/Familia/AlumnosView";
import MisSolicitudesView from "../pages/Familia/MisSolicitudesViews";
import { BarraNavegacion } from "../common/Navbar";
import { Footer } from "../common/Footer";
import Error404 from "../pages/shared/Error404";

// Wrapper rápido para las páginas públicas
const PaginaPublica = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <BarraNavegacion />
    <div className="flex-grow-1">{children}</div>
    <Footer />
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaPublica><Inicio /></PaginaPublica>} />
      <Route path="/escuelas" element={<PaginaPublica><Escuelas /></PaginaPublica>} />
      <Route path="/escuelas/:id" element={<PaginaPublica><DetalleEscuela /></PaginaPublica>} />
      <Route path="/familia" element={<FamiliaLayout/>}>
        <Route path="alumnos" element={<AlumnosView />}/>
        <Route path="escuelas" element={<Escuelas />}/>
        <Route path="solicitudes" element={<MisSolicitudesView />}/>
      </Route>
      <Route path="*" element={<Error404></Error404>} />
    </Routes>
  );
};

export default AppRoutes;