import React from 'react';
import { BarraNavegacion } from '../components/common/Navbar';

export const FamiliaLayout = ({ usuario, cerrarSesion, children }) => {
  const usuarioPrueba = usuario || { nombre: 'Facu (Tutor)' };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <BarraNavegacion usuario={usuarioPrueba} cerrarSesion={cerrarSesion} />

      <main className="flex-fill container my-4">
        {children}
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <small>© 2026 Preinscribe - Sistema de Preinscripciones Escolares</small>
      </footer>
    </div>
  );
};