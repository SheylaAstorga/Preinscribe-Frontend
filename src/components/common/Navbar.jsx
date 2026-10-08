import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export const BarraNavegacion = ({ usuario, cerrarSesion }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center gap-2">
          <img 
            src="/Logo.jpg" 
            alt="Logo" 
            width="35" 
            height="35" 
            className="d-inline-block align-top rounded" 
          />

          <span>PreInscribe</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-navegacion" />
        <Navbar.Collapse id="menu-navegacion">
          <Nav className="me-auto">
            {!usuario ? (
              <>
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/escuelas">Escuelas</Nav.Link>
                <Nav.Link href="/como-funciona">Cómo funciona</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/escuelas">Escuelas</Nav.Link>
                <Nav.Link href="/familia/alumnos">Mis hijos</Nav.Link>
                <Nav.Link href="/familia/solicitudes">Mis solicitudes</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!usuario ? (
              <div className="d-flex gap-2 align-items-center">
                <a href="/login" className="btn btn-outline-light btn-sm">
                  Ingresar
                </a>
                <a href="/registro" className="btn btn-warning btn-sm fw-semibold">
                  Registrarse
                </a>
              </div>
            ) : (
              <NavDropdown
                title={
                  <span className="text-white">
                    👤 {usuario.nombre || 'Mi Cuenta'}
                  </span>
                }
                id="desplegable-usuario"
                align="end"
              >
                <NavDropdown.Item href="/perfil">Mi perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={cerrarSesion} className="text-danger">
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};