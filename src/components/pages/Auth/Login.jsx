import { useState } from 'react';
import { Container, Row, Col, Alert, Form, Button, Card } from 'react-bootstrap';
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

    const emailTrim = email.trim();

    if (!email.trim || !password.trim()) {
      setError('Por favor, ingresá tu correo electrónico y contraseña.');
      return;
    }

    if (emailTrim.length > 30) {
      setError('El correo electrónico no puede superar los 30 caracteres.');
      return;
    }

    if (password.length > 20) {
      setError('La contraseña no puede superar los 20 caracteres.');
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
      className="min-vh-100 d-flex flex-column justify-content-between overflow-hidden position-relative"
      style={{ backgroundColor: '#EEF4F8' }}
    >
      <Container fluid className="p-0 flex-grow-1 d-flex align-items-stretch">
        <Row className="g-0 w-100 min-vh-100">
          
          {/* ==================================================================== */}
          {/* VISTA DE ESCRITORIO (Desktop - lg en adelante)                        */}
          {/* ==================================================================== */}
          
          {/* Panel Izquierdo Azul Corporativo */}
          <Col lg={6} xl={6} className="d-none d-lg-flex flex-column justify-content-between p-5 text-white position-relative overflow-hidden"
               style={{ backgroundColor: 'var(--pi-navy-deep, #000F22)' }}
          >
            {/* Luces Ambientales de fondo */}
            <div 
              className="position-absolute rounded-circle pointer-events-none"
              style={{
                width: '420px',
                height: '420px',
                top: '-100px',
                left: '-100px',
                background: 'radial-gradient(circle, rgba(91, 192, 235, 0.22) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(50px)',
                zIndex: 1
              }}
            />
            <div 
              className="position-absolute rounded-circle pointer-events-none"
              style={{
                width: '380px',
                height: '380px',
                bottom: '-50px',
                right: '-50px',
                background: 'radial-gradient(circle, rgba(245, 165, 36, 0.15) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(60px)',
                zIndex: 1
              }}
            />

            {/* Cabecera del Panel Izquierdo */}
            <div className="position-relative z-2">
              <Link to="/" className="d-inline-flex align-items-center gap-3 text-decoration-none">
                <div 
                  className="bg-white p-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center" 
                  style={{ width: '44px', height: '44px' }}
                >
                  <img src="/Logo.jpg" alt="Logo PreInscribe" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="d-flex flex-column">
                  <span className="fs-4 fw-bold text-white tracking-tight">
                    Pre<span style={{ color: 'var(--pi-sky, #5BC0EB)' }}>Inscribe</span>
                  </span>
                  <span className="text-white-50" style={{ fontSize: '11px', marginTop: '-4px', letterSpacing: '0.4px' }}>
                    Plataforma de Gestión Educativa
                  </span>
                </div>
              </Link>
            </div>

            {/* Mensaje Principal y Tarjetas de Impacto */}
            <div className="position-relative z-2 mt-4 pt-4 pb-2 pe-xl-4" style={{ maxWidth: '500px' }}>
              <h1 className="fw-bold text-white mb-3" style={{ fontSize: '2.5rem', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
                Conectando familias con el futuro educativo.
              </h1>
              <p className="text-white-50 fs-6 mb-4" style={{ lineHeight: '1.6' }}>
                Simplificamos el proceso de preinscripciones escolares con una plataforma ágil, transparente y accesible para todos.
              </p>

              {/* Tarjetas Glassmorphism de Características */}
              <div className="d-flex flex-column gap-3 mt-4">
                <div 
                  className="p-3 rounded-4 d-flex align-items-center gap-3"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="bg-white bg-opacity-10 p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', color: 'var(--pi-sky, #5BC0EB)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '14px' }}>Seguimiento en Tiempo Real</h6>
                    <small className="text-white-50" style={{ fontSize: '12px' }}>Estado transparente de tus solicitudes escolares.</small>
                  </div>
                </div>

                <div 
                  className="p-3 rounded-4 d-flex align-items-center gap-3"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="bg-white bg-opacity-10 p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', color: 'var(--pi-amber, #F5A524)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '14px' }}>Documentación Protegida</h6>
                    <small className="text-white-50" style={{ fontSize: '12px' }}>Gestión segura de archivos por nivel educativo.</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie de página del panel izquierdo */}
            <div className="position-relative z-2 small text-white-50 d-flex justify-content-between align-items-center">
              <span>&copy; 2026 PreInscribe. Todos los derechos reservados.</span>
            </div>
          </Col>

          {/* Panel Derecho Desktop */}
          <Col lg={6} xl={6} className="d-none d-lg-flex flex-column justify-content-between p-5 position-relative overflow-hidden" style={{ backgroundColor: '#EEF4F8' }}>
            
            {/* Destellos de Luz Ambiental */}
            <div 
              className="position-absolute rounded-circle pointer-events-none"
              style={{
                width: '450px',
                height: '450px',
                top: '-50px',
                right: '-100px',
                background: 'radial-gradient(circle, rgba(91, 192, 235, 0.20) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(55px)',
                zIndex: 0
              }}
            />
            <div 
              className="position-absolute rounded-circle pointer-events-none"
              style={{
                width: '350px',
                height: '350px',
                bottom: '-50px',
                left: '-50px',
                background: 'radial-gradient(circle, rgba(245, 165, 36, 0.15) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(60px)',
                zIndex: 0
              }}
            />

            {/* Botón Volver al Inicio en Escritorio */}
            <div className="w-100 d-flex justify-content-end mb-4 position-absolute top-0 end-0 p-4 z-3" style={{ maxWidth: '460px', margin: '0 auto' }}>
              <Link 
                to="/" 
                className="btn btn-sm rounded-pill px-3 py-1.5 fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 bg-white shadow-sm"
                style={{ 
                  border: '1.5px solid var(--pi-sky, #5BC0EB)', 
                  color: 'var(--pi-sky, #0077B6)', 
                  fontSize: '13px'
                }}
              >
                ← Volver al inicio
              </Link>
            </div>

            {/* Tarjeta Central Glassmorphism Desktop */}
            <div className="my-auto w-100 d-flex justify-content-center py-3 position-relative z-2">
              <Card 
                className="rounded-4 border-0 w-100 p-4 position-relative" 
                style={{ 
                  maxWidth: '430px',
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 25px 50px -12px rgba(0, 15, 34, 0.08), 0 0 0 1px rgba(91, 192, 235, 0.15)'
                }}
              >
                <Card.Body className="p-0">
                  <div className="mb-4">
                    <h2 className="fw-bold text-dark fs-3 mb-1.5" style={{ letterSpacing: '-0.4px', color: 'var(--pi-navy-deep, #000F22)' }}>
                      ¡Qué bueno verte de nuevo!
                    </h2>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Ingresá a tu cuenta para continuar con tus trámites y preinscripciones.
                    </p>
                  </div>

                  {mensajeRegistro && (
                    <Alert variant="success" className="py-2.5 px-3 small border-0 rounded-3 shadow-sm mb-4">
                      {mensajeRegistro}
                    </Alert>
                  )}

                  {error && (
                    <Alert variant="danger" className="py-2.5 px-3 small border-0 rounded-3 shadow-sm mb-4">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3.5" controlId="loginEmailDesktop">
                      <Form.Label className="fw-semibold small text-dark mb-1.5">Correo electrónico</Form.Label>
                      <div className="position-relative d-flex align-items-center">
                        <div className="position-absolute start-0 ms-3 d-flex align-items-center pointer-events-none text-muted" style={{ zIndex: 2 }}>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </div>
                        <Form.Control
                          type="email"
                          maxLength={30}
                          placeholder="nombre@ejemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="py-2.5 ps-5 pe-3 border-0"
                          style={{ 
                            borderRadius: '12px', 
                            fontSize: '14px', 
                            height: '48px',
                            backgroundColor: '#F3F6F9',
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                          }}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginPasswordDesktop">
                      <Form.Label className="fw-semibold small text-dark mb-1.5">Contraseña</Form.Label>
                      <div className="position-relative d-flex align-items-center">
                        <div className="position-absolute start-0 ms-3 d-flex align-items-center pointer-events-none text-muted" style={{ zIndex: 2 }}>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                        <Form.Control
                          type={mostrarPassword ? 'text' : 'password'}
                          maxLength={20}
                          placeholder="Ingresá tu contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="py-2.5 ps-5 pe-5 border-0"
                          style={{ 
                            borderRadius: '12px', 
                            fontSize: '14px', 
                            height: '48px',
                            backgroundColor: '#F3F6F9',
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                          }}
                        />
                        <button
                          type="button"
                          className="btn position-absolute end-0 border-0 bg-transparent text-muted px-3 fw-semibold"
                          onClick={() => setMostrarPassword(!mostrarPassword)}
                          style={{ fontSize: '12px', zIndex: 2 }}
                        >
                          {mostrarPassword ? 'Ocultar' : 'Ver'}
                        </button>
                      </div>
                    </Form.Group>

                    <Button 
                      type="submit" 
                      className="w-100 py-2.5 fw-bold text-dark border-0 mt-3 d-flex align-items-center justify-content-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--pi-amber, #F5A524)', 
                        borderRadius: '12px', 
                        fontSize: '15px',
                        height: '48px',
                        boxShadow: '0 8px 22px rgba(245, 165, 36, 0.32)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <span>Ingresar a mi cuenta</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Button>
                  </Form>

                  <div className="text-center mt-4 pt-3 border-top small">
                    <span className="text-muted">¿Todavía no tenés una cuenta? </span>
                    <Link to="/registro" className="fw-bold text-decoration-none" style={{ color: 'var(--pi-navy-deep, #000F22)' }}>
                      Registrate acá
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* ==================================================================== */}
          {/* VISTA MÓVIL Y TABLET (Exclusiva para menos de lg - Sin Emojis)       */}
          {/* ==================================================================== */}
          <Col xs={12} className="d-lg-none d-flex flex-column justify-content-between p-4 position-relative" style={{ backgroundColor: '#EEF3F8' }}>
            
            {/* CABECERA MÓVIL */}
            <div className="w-100 d-flex justify-content-between align-items-center mb-4 pt-2" style={{ maxWidth: '440px', margin: '0 auto' }}>
              <div className="d-flex align-items-center">
                <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none">
                  <div className="bg-white p-1.5 rounded-3 shadow-sm border d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                    <img src="/Logo.jpg" alt="Logo PreInscribe" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fs-5 fw-bold text-dark lh-1">
                      Pre<span style={{ color: 'var(--pi-sky, #0077B6)' }}>Inscribe</span>
                    </span>
                    <span className="text-muted" style={{ fontSize: '9px', marginTop: '2px' }}>
                      Sistema de preinscripciones escolares
                    </span>
                  </div>
                </Link>
              </div>

              <div>
                <Link 
                  to="/" 
                  className="btn btn-sm rounded-pill px-3 py-1.5 fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 bg-white shadow-sm"
                  style={{ 
                    border: '1.5px solid var(--pi-sky, #5BC0EB)', 
                    color: 'var(--pi-sky, #0077B6)', 
                    fontSize: '13px'
                  }}
                >
                  ← Volver al inicio
                </Link>
              </div>
            </div>

            {/* TARJETA BLANCA MÓVIL */}
            <div className="my-auto w-100 d-flex justify-content-center py-2">
              <Card 
                className="shadow-sm rounded-4 bg-white border-0 w-100 p-4" 
                style={{ 
                  maxWidth: '430px',
                  boxShadow: '0 10px 30px rgba(0, 15, 34, 0.05)'
                }}
              >
                <Card.Body className="p-0">
                  <div className="mb-4">
                    <h2 className="fw-bold text-dark fs-3 mb-1" style={{ letterSpacing: '-0.3px' }}>¡Qué bueno verte de nuevo!</h2>
                    <p className="text-muted small mb-0">Ingresá a tu cuenta para continuar.</p>
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
                    <Form.Group className="mb-3" controlId="loginEmailMobile">
                      <Form.Label className="fw-semibold small text-dark mb-1">Correo electrónico</Form.Label>
                      <div className="position-relative d-flex align-items-center">
                        <div className="position-absolute start-0 ms-3 d-flex align-items-center pointer-events-none text-muted opacity-75" style={{ zIndex: 2 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </div>
                        <Form.Control
                          type="email"
                          maxLength={30}
                          placeholder="nombre@ejemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="py-2.5 ps-5 pe-3 border-0 bg-light"
                          style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="loginPasswordMobile">
                      <Form.Label className="fw-semibold small text-dark mb-1">Contraseña</Form.Label>
                      <div className="position-relative d-flex align-items-center">
                        <div className="position-absolute start-0 ms-3 d-flex align-items-center pointer-events-none text-muted opacity-75" style={{ zIndex: 2 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                        </div>
                        <Form.Control
                          type={mostrarPassword ? 'text' : 'password'}
                          maxLength={20}
                          placeholder="Ingresá tu contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="py-2.5 ps-5 pe-5 border-0 bg-light"
                          style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                        />
                        <button
                          type="button"
                          className="btn position-absolute end-0 border-0 bg-transparent text-muted px-3"
                          onClick={() => setMostrarPassword(!mostrarPassword)}
                          style={{ fontSize: '13px', zIndex: 2 }}
                        >
                          {mostrarPassword ? 'Ocultar' : 'Ver'}
                        </button>
                      </div>
                    </Form.Group>

                    <div className="text-end mb-3">
                      <Link to="#" onClick={(e) => e.preventDefault()} className="small text-decoration-none fw-semibold" style={{ color: 'var(--pi-sky, #0077B6)', fontSize: '12px' }}>
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-100 py-2.5 fw-bold text-dark shadow-sm mt-1 border-0 d-flex align-items-center justify-content-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--pi-amber, #F5A524)', 
                        borderRadius: '10px', 
                        fontSize: '15px',
                        height: '46px' 
                      }}
                    >
                      Ingresar a mi cuenta →
                    </Button>
                  </Form>

                  <div className="text-center mt-4 pt-3 border-top small">
                    <span className="text-muted">¿Todavía no tenés una cuenta? </span>
                    <Link to="/registro" className="fw-bold text-decoration-none" style={{ color: 'var(--pi-navy-deep, #001233)' }}>
                      Registrate acá
                    </Link>
                  </div>

                </Card.Body>
              </Card>
            </div>

            {/* ILUSTRACIÓN DE LA ESCUELA INFERIOR EN MÓVIL */}
            <div className="w-100 mt-auto pt-2 text-center position-relative overflow-hidden pointer-events-none">
              <svg viewBox="0 0 500 130" preserveAspectRatio="none" className="w-100" style={{ maxHeight: '110px', display: 'block' }}>
                <path d="M0,45 C160,100 340,-5 500,45 L500,130 L0,130 Z" fill="#E2E8F0" opacity="0.65" />
                <path d="M0,65 C220,15 280,100 500,55 L500,130 L0,130 Z" fill="#5BC0EB" opacity="0.22" />
                
                <circle cx="410" cy="42" r="14" fill="var(--pi-amber, #F5A524)" />

                <g transform="translate(180, 25)">
                  <rect x="20" y="30" width="100" height="55" rx="3" fill="#0077B6" />
                  <polygon points="70,2 10,30 130,30" fill="#001233" />
                  <rect x="57" y="10" width="26" height="22" fill="#0077B6" />
                  <polygon points="70,0 52,10 88,10" fill="#001233" />
                  <line x1="70" y1="0" x2="70" y2="-10" stroke="#001233" strokeWidth="2" />
                  <polygon points="70,-10 83,-5 70,0" fill="var(--pi-amber, #F5A524)" />
                  <rect x="58" y="58" width="24" height="27" rx="12" fill="#FFFFFF" />
                  <rect x="32" y="42" width="16" height="16" rx="2" fill="#5BC0EB" />
                  <rect x="92" y="42" width="16" height="16" rx="2" fill="#5BC0EB" />
                </g>

                <g transform="translate(125, 55)">
                  <rect x="8" y="25" width="6" height="15" fill="#64748B" />
                  <circle cx="11" cy="20" r="15" fill="#0077B6" opacity="0.85" />
                </g>
                <g transform="translate(325, 55)">
                  <rect x="8" y="25" width="6" height="15" fill="#64748B" />
                  <circle cx="11" cy="20" r="15" fill="#0077B6" opacity="0.85" />
                </g>
              </svg>
            </div>

          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Login;