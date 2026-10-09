import { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export const BarraNavegacion = ({ usuario, cerrarSesion, rutaActual = '/familia/alumnos' }) => {
  const [menuExpandido, setMenuExpandido] = useState(false);

  return (
    <Navbar 
      expand="lg" 
      variant="dark" 
      expanded={menuExpandido}
      className="shadow-sm py-3 sticky-top border-bottom" 
      style={{ 
        backgroundColor: 'var(--pi-navy-deep, #000F22)',
        borderColor: 'rgba(255, 255, 255, 0.08) !important'
      }}
    >
      <Container>
        {/* Marca / Logo principal con integración visual perfecta */}
        <Navbar.Brand 
          href="/" 
          className="fw-bold d-flex align-items-center gap-3 text-white text-decoration-none py-0"
        >
          <div 
            className="d-flex align-items-center justify-content-center shadow-sm overflow-hidden"
            style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              padding: '4px'
            }}
          >
            <img 
              src="/Logo.jpg" 
              alt="Logo PreInscribe" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
          <span className="fs-4 tracking-tight" style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
            Pre<span style={{ color: 'var(--pi-sky, #5BC0EB)' }}>Inscribe</span>
          </span>
        </Navbar.Brand>

        {/* Botón Hamburguesa */}
        <Navbar.Toggle 
          aria-controls="menu-navegacion" 
          className="border-0 shadow-none text-white" 
          onClick={() => setMenuExpandido(!menuExpandido)}
        />

        <Navbar.Collapse id="menu-navegacion">
          {/* Enlaces de navegación centrales con diseño moderno */}
          <Nav className="mx-auto my-2 my-lg-0 gap-lg-2">
            {!usuario ? (
              <>
                <Nav.Link href="/" onClick={() => setMenuExpandido(false)} className="text-white-50 px-3 py-2 fw-medium transition-all">Inicio</Nav.Link>
                <Nav.Link href="/escuelas" onClick={() => setMenuExpandido(false)} className="text-white-50 px-3 py-2 fw-medium transition-all">Escuelas</Nav.Link>
                <Nav.Link href="/como-funciona" onClick={() => setMenuExpandido(false)} className="text-white-50 px-3 py-2 fw-medium transition-all">Cómo funciona</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link 
                  href="/" 
                  onClick={() => setMenuExpandido(false)} 
                  className={`px-3 py-2 fw-medium position-relative ${rutaActual === '/' ? 'text-white' : 'text-white-50'}`}
                >
                  Inicio
                  {rutaActual === '/' && <span className="position-absolute bottom-0 start-50 translate-middle-x w-75 bg-info rounded-pill" style={{ height: '3px' }}></span>}
                </Nav.Link>

                <Nav.Link 
                  href="/escuelas" 
                  onClick={() => setMenuExpandido(false)} 
                  className={`px-3 py-2 fw-medium position-relative ${rutaActual === '/escuelas' ? 'text-white' : 'text-white-50'}`}
                >
                  Escuelas
                  {rutaActual === '/escuelas' && <span className="position-absolute bottom-0 start-50 translate-middle-x w-75 bg-info rounded-pill" style={{ height: '3px' }}></span>}
                </Nav.Link>

                <Nav.Link 
                  href="/familia/alumnos" 
                  onClick={() => setMenuExpandido(false)} 
                  className={`px-3 py-2 fw-semibold position-relative ${rutaActual === '/familia/alumnos' ? 'text-white' : 'text-white-50'}`}
                >
                  Mis hijos
                  {rutaActual === '/familia/alumnos' && <span className="position-absolute bottom-0 start-50 translate-middle-x w-75 bg-info rounded-pill" style={{ height: '3px' }}></span>}
                </Nav.Link>

                <Nav.Link 
                  href="/familia/solicitudes" 
                  onClick={() => setMenuExpandido(false)} 
                  className={`px-3 py-2 fw-medium position-relative ${rutaActual === '/familia/solicitudes' ? 'text-white' : 'text-white-50'}`}
                >
                  Mis solicitudes
                  {rutaActual === '/familia/solicitudes' && <span className="position-absolute bottom-0 start-50 translate-middle-x w-75 bg-info rounded-pill" style={{ height: '3px' }}></span>}
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Zona de Autenticación / Perfil a la derecha */}
          <Nav className="align-items-lg-center">
            {!usuario ? (
              <div className="d-flex gap-2 align-items-center mt-3 mt-lg-0">
                <a href="/login" className="btn btn-outline-light btn-sm px-4 fw-semibold" style={{ borderRadius: '8px' }}>Ingresar</a>
                <a href="/registro" className="btn btn-sm px-4 fw-bold text-dark" style={{ backgroundColor: 'var(--pi-amber, #F5A524)', borderRadius: '8px' }}>Registrarse</a>
              </div>
            ) : (
              <>
                {/* Versión Escritorio */}
                <div className="d-none d-lg-block">
                  <NavDropdown
                    title={
                      <span className="text-white d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style={{ width: '30px', height: '30px', backgroundColor: 'var(--pi-blue, #1D4E89)', fontSize: '13px' }}>
                          {usuario.nombre ? usuario.nombre.charAt(0) : 'U'}
                        </div>
                        <span className="fw-semibold small pe-1">{usuario.nombre || 'Mi Cuenta'}</span>
                      </span>
                    }
                    id="desplegable-usuario"
                    align="end"
                  >
                    <NavDropdown.Item href="/perfil" className="fw-medium py-2"> Mi perfil</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={cerrarSesion} className="text-danger fw-semibold py-2"> Cerrar sesión</NavDropdown.Item>
                  </NavDropdown>
                </div>

                {/* Versión Móvil */}
                <div className="d-lg-none mt-3 pt-3 border-top border-secondary">
                  <div className="d-flex align-items-center gap-2 px-2 mb-2 text-white">
                    <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '32px', height: '32px', backgroundColor: 'var(--pi-blue, #1D4E89)', fontSize: '12px' }}>
                      {usuario.nombre ? usuario.nombre.charAt(0) : 'U'}
                    </div>
                    <span className="fw-semibold small">{usuario.nombre || 'Mi Cuenta'}</span>
                  </div>
                  <Nav.Link href="/perfil" onClick={() => setMenuExpandido(false)} className="text-white-50 px-2 py-1"> Mi perfil</Nav.Link>
                  <Nav.Link onClick={() => { cerrarSesion(); setMenuExpandido(false); }} className="text-danger px-2 py-1 fw-semibold"> Cerrar sesión</Nav.Link>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};