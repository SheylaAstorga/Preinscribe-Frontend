import React from 'react';
import { FamiliaLayout } from './layouts/FamiliaLayout';

function App() {
  return (
    <FamiliaLayout>
      <div className="p-5 mb-4 bg-light rounded-3 border">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-primary">¡Bienvenido a Preinscribe!</h1>
          <p className="col-md-8 fs-4 text-secondary">
            Este es el layout del módulo de familia funcionando con Bootstrap. La barra de navegación superior ya está lista.
          </p>
          <button className="btn btn-primary btn-lg" type="button">
            Próximamente: Mis Hijos 👨‍👩‍👧‍👦
          </button>
        </div>
      </div>
    </FamiliaLayout>
  );
}

export default App;