import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer 
      className="text-white py-5 mt-auto border-top" 
      style={{ 
        backgroundColor: 'var(--pi-navy, #0A2540)', 
        borderColor: 'rgba(255, 255, 255, 0.1)' 
      }}
    >
      <Container>
        <Row className="gy-4 mb-4">
          
          {/* Columna 1: Marca y Eslogan */}
          <Col lg={4} md={6}>
            <h5 className="fw-bold mb-2 d-flex align-items-center gap-2">
              <span>Pre</span>
              <span style={{ color: 'var(--pi-sky, #5BC0EB)' }}>Inscribe</span>
            </h5>
            <p className="text-white-50 small mb-3" style={{ lineHeight: '1.6' }}>
              Simplificamos el proceso de preinscripción escolar para que las familias encuentren y gestionen sus opciones educativas en un solo lugar.
            </p>
            <p className="text-white-50 small mb-0 fst-italic" style={{ opacity: 0.8 }}>
              Trabajo Final Integrador (TFI) — UTN FRT
            </p>
          </Col>

          {/* Columna 2: Navegación */}
          <Col lg={2} md={6} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Navegación</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="/" className="text-decoration-none text-white-50">Inicio</a></li>
              <li><a href="/escuelas" className="text-decoration-none text-white-50">Escuelas</a></li>
              <li><a href="/familia/alumnos" className="text-decoration-none text-white-50">Mis hijos</a></li>
              <li><a href="/familia/solicitudes" className="text-decoration-none text-white-50">Mis solicitudes</a></li>
            </ul>
          </Col>

          {/* Columna 3: Información */}
          <Col lg={3} md={6} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Información</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><span className="text-white-50" style={{ cursor: 'pointer' }}>Preguntas frecuentes</span></li>
              <li><span className="text-white-50" style={{ cursor: 'pointer' }}>Ayuda y contacto</span></li>
              <li><span className="text-white-50" style={{ cursor: 'pointer' }}>Términos y condiciones</span></li>
              <li><span className="text-white-50" style={{ cursor: 'pointer' }}>Política de privacidad</span></li>
            </ul>
          </Col>

          {/* Columna 4: Stack Tecnológico */}
          <Col lg={3} md={6}>
            <h6 className="fw-bold mb-3 text-white">Plataforma</h6>
            <p className="text-white-50 small mb-2">
              Plataforma digital orientada a vincular transparentemente a las familias con las instituciones educativas.
            </p>
          </Col>

        </Row>

        {/* Franja Inferior */}
        <div className="border-top pt-4 mt-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <p className="text-white-50 small mb-0">
            © {anioActual} PreInscribe. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-4 small text-white-50">
            <span style={{ cursor: 'pointer' }}>Términos y condiciones</span>
            <span>•</span>
            <span style={{ cursor: 'pointer' }}>Política de privacidad</span>
          </div>
        </div>

      </Container>
    </footer>
  );
};