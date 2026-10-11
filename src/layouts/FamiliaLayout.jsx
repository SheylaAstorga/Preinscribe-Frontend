import { Outlet } from 'react-router-dom';
import { BarraNavegacion } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const FamiliaLayout = ({ usuario, cerrarSesion }) => {
  const usuarioPrueba = usuario || { nombre: 'Facu (Tutor)' };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Barra de navegación superior con el estilo actualizado */}
      <BarraNavegacion usuario={usuarioPrueba} cerrarSesion={cerrarSesion} />

      {/* Contenedor principal de las vistas del módulo de familia */}
      <main className="flex-fill container my-4">
        <Outlet/>
      </main>

      {/* Pie de página corporativo institucional */}
      <Footer />
    </div>
  );
};