import { Outlet, Navigate, useLocation } from "react-router-dom";
import { BarraNavegacion } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

const AdminEscuelaLayout = ({ usuario, cerrarSesion, rolPermitido = "ADMIN_ESCUELA" }) => {
  const location = useLocation();
  // Verificar que el usuario haya iniciado sesión
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Permitir el acceso únicamente al administrador de escuela
  if (usuario.rol !== rolPermitido) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion usuario={usuario} cerrarSesion={cerrarSesion} />
      <main className="flex-fill container-fluid my-4 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminEscuelaLayout;
