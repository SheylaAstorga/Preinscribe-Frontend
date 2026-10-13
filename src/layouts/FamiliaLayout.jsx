import { Outlet } from "react-router-dom";
import { BarraNavegacion } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export const FamiliaLayout = ({ usuario, cerrarSesion }) => {
  const usuarioPrueba = usuario || { nombre: "Facu (Tutor)" };
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion usuario={usuarioPrueba} cerrarSesion={cerrarSesion} />
      <main className="flex-fill container my-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
