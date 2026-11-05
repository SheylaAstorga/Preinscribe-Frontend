import { Outlet, Navigate, useLocation } from "react-router-dom";
import { BarraNavegacion } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export const FamiliaLayout = ({ usuario, cerrarSesion }) => {
  const location = useLocation();

  // Si no inició sesión, lo enviamos al login
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si tiene otro rol, no puede acceder al panel familiar
  if (usuario.rol !== "FAMILIA") {
    return <Navigate to="/sin-permiso" replace />;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion usuario={usuario} cerrarSesion={cerrarSesion} />

      <main className="flex-fill container my-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
