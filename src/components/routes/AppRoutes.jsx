import { Routes, Route } from "react-router-dom";

import Inicio from "../pages/Principal/Inicio";
import Escuelas from "../pages/Escuela/Escuelas";
import DetalleEscuela from "../pages/Escuela/DetalleEscuela";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/escuelas" element={<Escuelas />} />
      <Route
        path="/escuelas/:id"
        element={<DetalleEscuela />}
      />
    </Routes>
  );
};

export default AppRoutes;