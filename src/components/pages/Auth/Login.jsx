import { useState } from 'react';
import { Container, Row, Col, Alert, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = ({ setUsuario }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Mensaje que viene desde Registro al ser redireccionado
  const mensajeRegistro = location.state?.mensaje;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, ingresá tu correo electrónico y contraseña.');
      return;
    }

    // Leemos el usuario guardado previamente en el registro
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioPreinscribe'));

    // Validamos existencia y contraseña
    if (!usuarioRegistrado || usuarioRegistrado.email.toLowerCase() !== email.trim().toLowerCase()) {
      setError('El correo electrónico no se encuentra registrado.');
      return;
    }

    if (usuarioRegistrado.password !== password) {
      setError('La contraseña ingresada es incorrecta.');
      return;
    }

    // Objeto de usuario activo con el nombre completo guardado
    const usuarioActivo = {
      nombre: usuarioRegistrado.nombre,
      email: usuarioRegistrado.email,
      rol: usuarioRegistrado.rol || 'Tutor',
    };

    // Guardamos en localStorage
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));

    // Actualizamos el estado global en AppRoutes para refrescar la Navbar
    if (setUsuario) {
      setUsuario(usuarioActivo);
    }

    // Redirigimos al panel del tutor
    navigate('/familia/solicitudes');
  };

  return (
    <div 
      className="min-vh-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <Container fluid className="p-0 flex-grow-1 d-flex align-items-stretch">
        <Row className="g-0 w-100">
          
          {/* PANEL IZQUIERDO DE MARCA */}
          <Col lg={6} className="d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative overflow-hidden"
               style={{ backgroundColor: 'var(--pi-navy-deep, #000F22)' }}
          >
            <div className="position-relative z-1">
              <Link to="/" className="d-inline-flex align-items-center gap-3 text-decoration-none">
                <div className="bg-white p-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                  <img src="/Logo.jpg" alt="Logo PreInscribe" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span className="fs-4 fw-bold text-white tracking-tight">
                  Pre<span style={{ color: 'var(--pi-sky, #5BC0EB)' }}>Inscribe</span>
                </span>
              </Link>
            </div>

            <div className="position-relative z-1 my-auto py-5 pe-lg-5">
              <span className="badge px-3 py-2 mb-3 rounded-pill fw-semibold" style={{ backgroundColor: 'rgba(91, 192, 235, 0.15)', color: 'var(--pi-sky, #5BC0EB)' }}>
                Plataforma de Gestión Educativa
              </span>
              <h1 className="display-6 fw-bold mb-4 tracking-tight" style={{ lineHeight: '1.2' }}>
                El próximo paso de su historia empieza acá.
              </h1>
              <p className="text-white-50 fs-6 mb-4" style={{ maxWidth: '460px', lineHeight: '1.6' }}>
                Centralizá las preinscripciones escolares de tus hijos, realizá seguimiento en tiempo real de las vacantes y comunicate de forma directa con las instituciones desde un solo lugar.
              </p>
            </div>

            <div className="position-relative z-1 small text-white-50">
              <span>&copy; 2026 PreInscribe. Todos los derechos reservados.</span>
            </div>
          </Col>

          {/* PANEL DERECHO DE ACCESO */}
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
            <div className="w-100" style={{ maxWidth: '420px' }}>
              
              <div className="mb-4">
                <h2 className="fw-bold text-dark fs-3 mb-1">¡Qué bueno verte de nuevo!</h2>
                <p className="text-muted small">Ingresá a tu cuenta para continuar.</p>
              </div>

              {mensajeRegistro && (
                <Alert variant="success" className="py-2 small border-0 rounded-3 shadow-sm mb-4">
                  {mensajeRegistro}
                </Alert>
              )}

              {error && (
                <Alert variant="danger" className="py-2 small border-0 rounded-3 shadow-sm mb-4">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label className="fw-semibold small text-dark">Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2.5 px-3 border-0 bg-light"
                    style={{ borderRadius: '10px', fontSize: '14px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label className="fw-semibold small text-dark">Contraseña</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={mostrarPassword ? 'text' : 'password'}
                      placeholder="Ingresá tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="py-2.5 px-3 border-0 bg-light pe-5"
                      style={{ borderRadius: '10px', fontSize: '14px' }}
                    />
                    <button
                      type="button"
                      className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-muted px-3"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      style={{ fontSize: '14px' }}
                    >
                      {mostrarPassword ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                </Form.Group>

                <Button 
                  type="submit" 
                  className="w-100 py-2.5 fw-bold text-dark shadow-sm mt-3 border-0"
                  style={{ backgroundColor: 'var(--pi-amber, #F5A524)', borderRadius: '10px', fontSize: '15px' }}
                >
                  Ingresar a mi cuenta
                </Button>
              </Form>

              <div className="text-center mt-4 pt-3 border-top small">
                <span className="text-muted">¿Todavía no tenés una cuenta? </span>
                <Link to="/registro" className="fw-bold text-decoration-none" style={{ color: 'var(--pi-navy-deep, #000F22)' }}>
                  Registrate acá
                </Link>
              </div>

            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Login;