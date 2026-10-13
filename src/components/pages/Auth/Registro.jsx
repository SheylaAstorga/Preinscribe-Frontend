import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Si es el campo DNI, filtramos solo caracteres numéricos
    if (e.target.name === 'dni') {
      const valorNumerico = e.target.value.replace(/\D/g, '');
      setFormData({ ...formData, dni: valorNumerico });
      setError('');
      return;
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const siguientePaso = () => {
    setError('');
    
    // Validación Paso 1
    if (paso === 1) {
      const nombreTrim = formData.nombre.trim();
      const apellidoTrim = formData.apellido.trim();
      const dniTrim = formData.dni.trim();

      if (!nombreTrim || !apellidoTrim || !dniTrim) {
        setError('Por favor, completá tu nombre, apellido y DNI.');
        return;
      }

      if (nombreTrim.length < 2 || nombreTrim.length > 20) {
        setError('El nombre debe tener entre 2 y 20 caracteres.');
        return;
      }

      if (apellidoTrim.length < 2 || apellidoTrim.length > 20) {
        setError('El apellido debe tener entre 2 y 20 caracteres.');
        return;
      }

      if (!/^\d{7,8}$/.test(dniTrim)) {
        setError('El DNI debe contener exactamente 7 u 8 números, sin puntos ni espacios.');
        return;
      }
    }

    // Validación Paso 2
    if (paso === 2) {
      const emailTrim = formData.email.trim();

      if (!emailTrim || !formData.password || !formData.confirmPassword) {
        setError('Por favor, completá el correo y las contraseñas.');
        return;
      }

      if (emailTrim.length > 30) {
        setError('El correo electrónico no puede superar los 30 caracteres.');
        return;
      }

      if (formData.password.length < 6 || formData.password.length > 20) {
        setError('La contraseña debe tener entre 6 y 20 caracteres.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas ingresadas no coinciden.');
        return;
      }
    }

    setPaso(paso + 1);
  };

  const pasoAnterior = () => {
    setError('');
    setPaso(paso - 1);
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();

    const nombreCompleto = `${formData.nombre.trim()} ${formData.apellido.trim()} (Tutor)`;

    const nuevoUsuario = {
      nombre: nombreCompleto,
      email: formData.email.trim(),
      password: formData.password,
      dni: formData.dni.trim(),
      rol: 'Tutor',
    };

    localStorage.setItem('usuarioPreinscribe', JSON.stringify(nuevoUsuario));

    navigate('/login', {
      state: { mensaje: '¡Cuenta creada con éxito! Por favor, ingresá tus datos para iniciar sesión.' }
    });
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

            {/* Mensaje Principal y Beneficios del Registro */}
            <div className="position-relative z-2 mt-4 pt-4 pb-2 pe-xl-4" style={{ maxWidth: '500px' }}>
              <h1 className="fw-bold text-white mb-3" style={{ fontSize: '2.5rem', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
                Comenzá a construir el camino escolar de tus hijos.
              </h1>
              <p className="text-white-50 fs-6 mb-4" style={{ lineHeight: '1.6' }}>
                Registrá tu cuenta de tutor en pocos minutos para gestionar vacantes, cargar documentación y hacer el seguimiento completo.
              </p>

              {/* Tarjetas Glassmorphism de Beneficios */}
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '14px' }}>Perfil Tutor Unificado</h6>
                    <small className="text-white-50" style={{ fontSize: '12px' }}>Administrá múltiples aspirantes desde una misma cuenta.</small>
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '14px' }}>Proceso Guiado en 3 Pasos</h6>
                    <small className="text-white-50" style={{ fontSize: '12px' }}>Carga rápida, revisión segura y confirmación inmediata.</small>
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
                  maxWidth: '450px',
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 25px 50px -12px rgba(0, 15, 34, 0.08), 0 0 0 1px rgba(91, 192, 235, 0.15)'
                }}
              >
                <Card.Body className="p-0">
                  <div className="mb-3">
                    <h2 className="fw-bold text-dark fs-3 mb-1" style={{ letterSpacing: '-0.4px', color: 'var(--pi-navy-deep, #000F22)' }}>
                      Creá tu espacio familiar
                    </h2>
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                      Gestioná las preinscripciones escolares de tus hijos de forma organizada.
                    </p>
                  </div>

                  {/* Indicador de Pasos Desktop */}
                  <div className="p-2.5 rounded-3 border-0 d-flex justify-content-between align-items-center mb-4" style={{ backgroundColor: '#F3F6F9' }}>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge rounded-pill text-white px-2.5 py-1 fw-semibold" style={{ fontSize: '11px', backgroundColor: 'var(--pi-navy-deep, #000F22)' }}>
                        Paso {paso} de 3
                      </span>
                      <span className="small fw-semibold text-muted" style={{ fontSize: '13px' }}>
                        {paso === 1 && 'Datos personales'}
                        {paso === 2 && 'Credenciales de acceso'}
                        {paso === 3 && 'Revisión y confirmación'}
                      </span>
                    </div>
                    <div className="d-flex gap-1" style={{ width: '70px' }}>
                      <div className="flex-grow-1 rounded-pill" style={{ height: '4px', backgroundColor: paso >= 1 ? 'var(--pi-sky, #5BC0EB)' : 'rgba(0,0,0,0.1)' }}></div>
                      <div className="flex-grow-1 rounded-pill" style={{ height: '4px', backgroundColor: paso >= 2 ? 'var(--pi-sky, #5BC0EB)' : 'rgba(0,0,0,0.1)' }}></div>
                      <div className="flex-grow-1 rounded-pill" style={{ height: '4px', backgroundColor: paso >= 3 ? 'var(--pi-sky, #5BC0EB)' : 'rgba(0,0,0,0.1)' }}></div>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="danger" className="py-2.5 px-3 small border-0 rounded-3 shadow-sm mb-4">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmitFinal}>
                    {paso === 1 && (
                      <div>
                        <h6 className="fw-bold text-dark mb-3 fs-6" style={{ color: 'var(--pi-navy-deep, #000F22)' }}>Información del Tutor responsable</h6>
                        <Row>
                          <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="nombreDesktop">
                              <Form.Label className="fw-semibold small text-dark mb-1">Nombre</Form.Label>
                              <Form.Control
                                type="text"
                                name="nombre"
                                maxLength={20}
                                placeholder="Ej: Mario"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="py-2 px-3 border-0"
                                style={{ 
                                  borderRadius: '12px', 
                                  fontSize: '14px', 
                                  height: '46px',
                                  backgroundColor: '#F3F6F9',
                                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} md={6} className="mb-3">
                            <Form.Group controlId="apellidoDesktop">
                              <Form.Label className="fw-semibold small text-dark mb-1">Apellido</Form.Label>
                              <Form.Control
                                type="text"
                                name="apellido"
                                maxLength={20}
                                placeholder="Ej: Gómez"
                                value={formData.apellido}
                                onChange={handleChange}
                                className="py-2 px-3 border-0"
                                style={{ 
                                  borderRadius: '12px', 
                                  fontSize: '14px', 
                                  height: '46px',
                                  backgroundColor: '#F3F6F9',
                                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                                }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group className="mb-4" controlId="dniDesktop">
                          <Form.Label className="fw-semibold small text-dark mb-1">Número de DNI</Form.Label>
                          <Form.Control
                            type="text"
                            name="dni"
                            maxLength={8}
                            placeholder="Sin puntos, ej: 32456789"
                            value={formData.dni}
                            onChange={handleChange}
                            className="py-2 px-3 border-0"
                            style={{ 
                              borderRadius: '12px', 
                              fontSize: '14px', 
                              height: '46px',
                              backgroundColor: '#F3F6F9',
                              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                            }}
                          />
                        </Form.Group>

                        <Button 
                          type="button" 
                          onClick={siguientePaso}
                          className="w-100 py-2.5 fw-bold text-white border-0 shadow-sm d-flex align-items-center justify-content-center gap-2"
                          style={{ 
                            backgroundColor: 'var(--pi-navy-deep, #000F22)', 
                            borderRadius: '12px', 
                            fontSize: '15px',
                            height: '46px'
                          }}
                        >
                          <span>Continuar al siguiente paso</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </Button>
                      </div>
                    )}

                    {paso === 2 && (
                      <div>
                        <h6 className="fw-bold text-dark mb-3 fs-6" style={{ color: 'var(--pi-navy-deep, #000F22)' }}>Datos de acceso a la plataforma</h6>
                        
                        <Form.Group className="mb-3" controlId="emailDesktop">
                          <Form.Label className="fw-semibold small text-dark mb-1">Correo electrónico</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            maxLength={30}
                            placeholder="nombre@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="py-2 px-3 border-0"
                            style={{ 
                              borderRadius: '12px', 
                              fontSize: '14px', 
                              height: '46px',
                              backgroundColor: '#F3F6F9',
                              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passwordDesktop">
                          <Form.Label className="fw-semibold small text-dark mb-1">Contraseña (mínimo 6 caracteres)</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            maxLength={20}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="py-2 px-3 border-0"
                            style={{ 
                              borderRadius: '12px', 
                              fontSize: '14px', 
                              height: '46px',
                              backgroundColor: '#F3F6F9',
                              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                            }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="confirmPasswordDesktop">
                          <Form.Label className="fw-semibold small text-dark mb-1">Confirmar contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            maxLength={20}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="py-2 px-3 border-0"
                            style={{ 
                              borderRadius: '12px', 
                              fontSize: '14px', 
                              height: '46px',
                              backgroundColor: '#F3F6F9',
                              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                            }}
                          />
                        </Form.Group>

                        <div className="d-flex gap-2">
                          <Button 
                            type="button" 
                            variant="light"
                            onClick={pasoAnterior}
                            className="w-50 py-2 fw-semibold border"
                            style={{ 
                              borderRadius: '12px', 
                              fontSize: '14px',
                              height: '46px',
                              borderColor: 'rgba(0, 15, 34, 0.12)'
                            }}
                          >
                            &larr; Volver
                          </Button>
                          <Button 
                            type="button" 
                            onClick={siguientePaso}
                            className="w-50 py-2 fw-bold text-white border-0 shadow-sm"
                            style={{ 
                              backgroundColor: 'var(--pi-navy-deep, #000F22)', 
                              borderRadius: '12px', 
                              fontSize: '14px',
                              height: '46px'
                            }}
                          >
                            Revisar datos &rarr;
                          </Button>
                        </div>
                      </div>
                    )}

                    {paso === 3 && (
                      <div>
                        <h6 className="fw-bold text-dark mb-3 fs-6" style={{ color: 'var(--pi-navy-deep, #000F22)' }}>Resumen de tu registro</h6>
                        <div className="p-3 rounded-3 mb-4 small" style={{ backgroundColor: '#F3F6F9' }}>
                          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                            <span className="text-muted">Tutor responsable:</span>
                            <span className="fw-semibold text-dark">{formData.nombre} {formData.apellido}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                            <span className="text-muted">DNI:</span>
                            <span className="fw-semibold text-dark">{formData.dni}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Correo electrónico:</span>
                            <span className="fw-semibold text-dark">{formData.email}</span>
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <Button 
                            type="button" 
                            variant="light"
                            onClick={pasoAnterior}
                            className="w-50 py-2 fw-semibold border"
                            style={{ 
                              borderRadius: '12px', 
                              fontSize: '14px',
                              height: '46px',
                              borderColor: 'rgba(0, 15, 34, 0.12)'
                            }}
                          >
                            &larr; Modificar
                          </Button>
                          <Button 
                            type="submit" 
                            className="w-50 py-2 fw-bold text-dark border-0 shadow-sm"
                            style={{ 
                              backgroundColor: 'var(--pi-amber, #F5A524)', 
                              borderRadius: '12px', 
                              fontSize: '14px',
                              height: '46px',
                              boxShadow: '0 8px 22px rgba(245, 165, 36, 0.32)'
                            }}
                          >
                            Completar registro
                          </Button>
                        </div>
                      </div>
                    )}
                  </Form>

                  <div className="text-center mt-4 pt-3 border-top small">
                    <span className="text-muted">¿Ya tenés una cuenta en PreInscribe? </span>
                    <Link to="/login" className="fw-bold text-decoration-none" style={{ color: 'var(--pi-navy-deep, #000F22)' }}>
                      Iniciá sesión acá
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* ==================================================================== */}
          {/* VISTA MÓVIL Y TABLET (Exclusiva para menos de lg)                   */}
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
                  
                  <div className="mb-3">
                    <h2 className="fw-bold text-dark fs-3 mb-1" style={{ letterSpacing: '-0.3px' }}>Creá tu espacio familiar</h2>
                    <p className="text-muted small mb-0">Gestioná las preinscripciones escolares de tus hijos.</p>
                  </div>

                  {/* Indicador de Pasos Móvil */}
                  <div className="p-2.5 rounded-3 border-0 d-flex justify-content-between align-items-center mb-4 bg-light">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge rounded-pill text-white px-2 py-1" style={{ fontSize: '11px', backgroundColor: 'var(--pi-navy-deep, #000F22)' }}>
                        Paso {paso} de 3
                      </span>
                      <span className="small fw-semibold text-muted" style={{ fontSize: '12px' }}>
                        {paso === 1 && 'Datos personales'}
                        {paso === 2 && 'Credenciales'}
                        {paso === 3 && 'Confirmación'}
                      </span>
                    </div>
                    <div className="d-flex gap-1" style={{ width: '60px' }}>
                      <div className="flex-grow-1 rounded-pill" style={{ height: '4px', backgroundColor: paso >= 1 ? 'var(--pi-sky, #0077B6)' : 'rgba(0,0,0,0.1)' }}></div>
                      <div className="flex-grow-1 rounded-pill" style={{ height: '4px', backgroundColor: paso >= 2 ? 'var(--pi-sky, #0077B6)' : 'rgba(0,0,0,0.1)' }}></div>
                      <div className="flex-grow-1 rounded-pill" style={{ height: '4px', backgroundColor: paso >= 3 ? 'var(--pi-sky, #0077B6)' : 'rgba(0,0,0,0.1)' }}></div>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="danger" className="py-2 small border-0 rounded-3 shadow-sm mb-4">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmitFinal}>
                    {paso === 1 && (
                      <div>
                        <Form.Group className="mb-3" controlId="nombreMobile">
                          <Form.Label className="fw-semibold small text-dark mb-1">Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            maxLength={20}
                            placeholder="Ej: Mario"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="py-2.5 px-3 border-0 bg-light"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="apellidoMobile">
                          <Form.Label className="fw-semibold small text-dark mb-1">Apellido</Form.Label>
                          <Form.Control
                            type="text"
                            name="apellido"
                            maxLength={20}
                            placeholder="Ej: Gómez"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="py-2.5 px-3 border-0 bg-light"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="dniMobile">
                          <Form.Label className="fw-semibold small text-dark mb-1">Número de DNI</Form.Label>
                          <Form.Control
                            type="text"
                            name="dni"
                            maxLength={8}
                            placeholder="Sin puntos, ej: 32456789"
                            value={formData.dni}
                            onChange={handleChange}
                            className="py-2.5 px-3 border-0 bg-light"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          />
                        </Form.Group>

                        <Button 
                          type="button" 
                          onClick={siguientePaso}
                          className="w-100 py-2.5 fw-bold text-white shadow-sm mt-1 border-0 d-flex align-items-center justify-content-center gap-2"
                          style={{ 
                            backgroundColor: 'var(--pi-navy-deep, #001233)', 
                            borderRadius: '10px', 
                            fontSize: '15px',
                            height: '46px' 
                          }}
                        >
                          Continuar al siguiente paso →
                        </Button>
                      </div>
                    )}

                    {paso === 2 && (
                      <div>
                        <Form.Group className="mb-3" controlId="emailMobile">
                          <Form.Label className="fw-semibold small text-dark mb-1">Correo electrónico</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            maxLength={30}
                            placeholder="nombre@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="py-2.5 px-3 border-0 bg-light"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passwordMobile">
                          <Form.Label className="fw-semibold small text-dark mb-1">Contraseña (mínimo 6 caracteres)</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            maxLength={20}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="py-2.5 px-3 border-0 bg-light"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="confirmPasswordMobile">
                          <Form.Label className="fw-semibold small text-dark mb-1">Confirmar contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            maxLength={20}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="py-2.5 px-3 border-0 bg-light"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          />
                        </Form.Group>

                        <div className="d-flex gap-2">
                          <Button 
                            type="button" 
                            variant="light"
                            onClick={pasoAnterior}
                            className="w-50 py-2 fw-semibold border"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          >
                            ← Volver
                          </Button>
                          <Button 
                            type="button" 
                            onClick={siguientePaso}
                            className="w-50 py-2 fw-bold text-white border-0 shadow-sm"
                            style={{ backgroundColor: 'var(--pi-navy-deep, #001233)', borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          >
                            Revisar datos →
                          </Button>
                        </div>
                      </div>
                    )}

                    {paso === 3 && (
                      <div>
                        <div className="bg-light p-3 rounded-3 mb-4 small">
                          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                            <span className="text-muted">Tutor:</span>
                            <span className="fw-semibold text-dark">{formData.nombre} {formData.apellido}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                            <span className="text-muted">DNI:</span>
                            <span className="fw-semibold text-dark">{formData.dni}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Email:</span>
                            <span className="fw-semibold text-dark">{formData.email}</span>
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <Button 
                            type="button" 
                            variant="light"
                            onClick={pasoAnterior}
                            className="w-50 py-2 fw-semibold border"
                            style={{ borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          >
                            ← Modificar
                          </Button>
                          <Button 
                            type="submit" 
                            className="w-50 py-2 fw-bold text-dark border-0 shadow-sm"
                            style={{ backgroundColor: 'var(--pi-amber, #F5A524)', borderRadius: '10px', fontSize: '14px', height: '44px' }}
                          >
                            Completar
                          </Button>
                        </div>
                      </div>
                    )}
                  </Form>

                  <div className="text-center mt-4 pt-3 border-top small">
                    <span className="text-muted">¿Ya tenés una cuenta? </span>
                    <Link to="/login" className="fw-bold text-decoration-none" style={{ color: 'var(--pi-navy-deep, #001233)' }}>
                      Iniciá sesión acá
                    </Link>
                  </div>

                </Card.Body>
              </Card>
            </div>

            {/* ILUSTRACIÓN COLORIDA DE LA ESCUELA INFERIOR EN MÓVIL */}
            <div className="w-100 mt-auto pt-2 text-center position-relative overflow-hidden pointer-events-none">
              <svg viewBox="0 0 500 130" preserveAspectRatio="none" className="w-100" style={{ maxHeight: '110px', display: 'block' }}>
                {/* Ondas con color de marca enriquecido */}
                <path d="M0,45 C160,100 340,-5 500,45 L500,130 L0,130 Z" fill="#CBD5E1" opacity="0.8" />
                <path d="M0,65 C220,15 280,100 500,55 L500,130 L0,130 Z" fill="#5BC0EB" opacity="0.45" />
                
                {/* Sol Ámbar Dorado Solido */}
                <circle cx="410" cy="40" r="15" fill="var(--pi-amber, #F5A524)" />

                {/* Escuela Ilustrada con colores vivos */}
                <g transform="translate(180, 22)">
                  <rect x="20" y="30" width="100" height="55" rx="4" fill="#0077B6" />
                  <polygon points="70,2 10,30 130,30" fill="#001233" />
                  <rect x="57" y="10" width="26" height="22" fill="#0077B6" />
                  <polygon points="70,0 52,10 88,10" fill="#001233" />
                  <line x1="70" y1="0" x2="70" y2="-10" stroke="#001233" strokeWidth="2.5" />
                  <polygon points="70,-10 85,-5 70,0" fill="var(--pi-amber, #F5A524)" />
                  <rect x="58" y="55" width="24" height="30" rx="12" fill="#FFFFFF" />
                  <rect x="32" y="42" width="16" height="16" rx="3" fill="#5BC0EB" />
                  <rect x="92" y="42" width="16" height="16" rx="3" fill="#5BC0EB" />
                </g>

                {/* Árboles en color azul corporativo fresco */}
                <g transform="translate(120, 52)">
                  <rect x="8" y="25" width="6" height="18" fill="#475569" />
                  <circle cx="11" cy="18" r="16" fill="#0077B6" />
                </g>
                <g transform="translate(330, 52)">
                  <rect x="8" y="25" width="6" height="18" fill="#475569" />
                  <circle cx="11" cy="18" r="16" fill="#0077B6" />
                </g>
              </svg>
            </div>

          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Registro;