import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = ({ usuario }) => {
  const añoActual = new Date().getFullYear();

  // Definimos las rutas dinámicamente según si hay usuario logueado o no
  const rutaEscuelas = usuario ? '/familia/escuelas' : '/escuelas';
  const rutaAlumnos = usuario ? '/familia/alumnos' : '/login';
  const rutaSolicitudes = usuario ? '/familia/solicitudes' : '/login';

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
            <h5 className="fw-bold mb-2">
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

          {/* Columna 2: Navegación corregida con Link y rutas dinámicas */}
          <Col lg={2} md={6} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Navegación</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/" className="text-decoration-none text-white-50">Inicio</Link>
              </li>
              <li>
                <Link to={rutaEscuelas} className="text-decoration-none text-white-50">Escuelas</Link>
              </li>
              <li>
                <Link to={rutaAlumnos} className="text-decoration-none text-white-50">Mis hijos</Link>
              </li>
              <li>
                <Link to={rutaSolicitudes} className="text-decoration-none text-white-50">Mis solicitudes</Link>
              </li>
            </ul>
          </Col>

          {/* Columna 3: Información vinculada a /404 */}
          <Col lg={3} md={6} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Información</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/404" className="text-decoration-none text-white-50">Preguntas frecuentes</Link></li>
              <li><Link to="/404" className="text-decoration-none text-white-50">Ayuda y contacto</Link></li>
              <li><Link to="/404" className="text-decoration-none text-white-50">Términos y condiciones</Link></li>
              <li><Link to="/404" className="text-decoration-none text-white-50">Política de privacidad</Link></li>
            </ul>
          </Col>

          {/* Columna 4: Plataforma */}
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
            &copy; {añoActual} PreInscribe. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-4 small text-white-50">
            <Link to="/404" className="text-decoration-none text-white-50">Términos y condiciones</Link>
            <span>&bull;</span>
            <Link to="/404" className="text-decoration-none text-white-50">Política de privacidad</Link>
          </div>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;