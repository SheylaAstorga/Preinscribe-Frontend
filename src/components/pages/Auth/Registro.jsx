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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const siguientePaso = () => {
    setError('');
    if (paso === 1) {
      if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.dni.trim()) {
        setError('Por favor, completá tu nombre, apellido y DNI.');
        return;
      }
    }
    if (paso === 2) {
      if (!formData.email.trim() || !formData.password || !formData.confirmPassword) {
        setError('Por favor, completá el correo y las contraseñas.');
        return;
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
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

    // Guardamos las credenciales del usuario en localStorage sin iniciar sesión activa
    const nuevoUsuario = {
      nombre: nombreCompleto,
      email: formData.email.trim(),
      password: formData.password,
      dni: formData.dni.trim(),
      rol: 'Tutor',
    };

    localStorage.setItem('usuarioPreinscribe', JSON.stringify(nuevoUsuario));

    // Redirigimos al Login enviando el mensaje de confirmación
    navigate('/login', {
      state: { mensaje: '¡Cuenta creada con éxito! Por favor, ingresá tus datos para iniciar sesión.' }
    });
  };

  return (
    <div 
      className="min-vh-100 d-flex flex-column justify-content-between py-4"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <Container className="my-auto">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            
            <div className="text-center mb-4">
              <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-3">
                <div className="p-2 rounded-3 shadow-sm bg-dark d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <img src="/Logo.jpg" alt="Logo PreInscribe" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <span className="fs-5 fw-bold text-dark">
                  Pre<span style={{ color: 'var(--pi-sky, #5BC0EB)' }}>Inscribe</span>
                </span>
              </Link>
              <h2 className="fw-bold text-dark fs-3">Creá tu espacio familiar</h2>
              <p className="text-muted small">Gestioná las preinscripciones escolares de tus hijos de forma organizada.</p>
            </div>

            <Card className="shadow-lg border-0 rounded-4 overflow-hidden bg-white">
              <div className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center px-4">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge rounded-pill bg-dark text-white px-2.5 py-1" style={{ fontSize: '12px' }}>
                    Paso {paso} de 3
                  </span>
                  <span className="small fw-semibold text-muted">
                    {paso === 1 && 'Datos personales'}
                    {paso === 2 && 'Credenciales de acceso'}
                    {paso === 3 && 'Revisión y confirmación'}
                  </span>
                </div>
                <div className="d-flex gap-1" style={{ width: '80px' }}>
                  <div className={`flex-grow-1 rounded-pill ${paso >= 1 ? 'bg-primary' : 'bg-secondary bg-opacity-25'}`} style={{ height: '4px' }}></div>
                  <div className={`flex-grow-1 rounded-pill ${paso >= 2 ? 'bg-primary' : 'bg-secondary bg-opacity-25'}`} style={{ height: '4px' }}></div>
                  <div className={`flex-grow-1 rounded-pill ${paso >= 3 ? 'bg-primary' : 'bg-secondary bg-opacity-25'}`} style={{ height: '4px' }}></div>
                </div>
              </div>

              <Card.Body className="p-4 p-md-5">
                {error && (
                  <Alert variant="danger" className="py-2 small border-0 rounded-3 shadow-sm mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmitFinal}>
                  {paso === 1 && (
                    <div>
                      <h5 className="fw-bold text-dark mb-3 fs-6">Información del Tutor responsable</h5>
                      <Row>
                        <Col xs={12} md={6} className="mb-3">
                          <Form.Group controlId="nombre">
                            <Form.Label className="fw-semibold small text-dark">Nombre</Form.Label>
                            <Form.Control
                              type="text"
                              name="nombre"
                              placeholder="Ej: Mario"
                              value={formData.nombre}
                              onChange={handleChange}
                              className="py-2 px-3 border-0 bg-light"
                              style={{ borderRadius: '10px', fontSize: '14px' }}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} className="mb-3">
                          <Form.Group controlId="apellido">
                            <Form.Label className="fw-semibold small text-dark">Apellido</Form.Label>
                            <Form.Control
                              type="text"
                              name="apellido"
                              placeholder="Ej: Gómez"
                              value={formData.apellido}
                              onChange={handleChange}
                              className="py-2 px-3 border-0 bg-light"
                              style={{ borderRadius: '10px', fontSize: '14px' }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-4" controlId="dni">
                        <Form.Label className="fw-semibold small text-dark">Número de DNI</Form.Label>
                        <Form.Control
                          type="text"
                          name="dni"
                          placeholder="Sin puntos, ej: 32456789"
                          value={formData.dni}
                          onChange={handleChange}
                          className="py-2 px-3 border-0 bg-light"
                          style={{ borderRadius: '10px', fontSize: '14px' }}
                        />
                      </Form.Group>

                      <Button 
                        type="button" 
                        onClick={siguientePaso}
                        className="w-100 py-2.5 fw-bold text-white border-0 shadow-sm"
                        style={{ backgroundColor: 'var(--pi-navy-deep, #000F22)', borderRadius: '10px', fontSize: '15px' }}
                      >
                        Continuar al siguiente paso &rarr;
                      </Button>
                    </div>
                  )}

                  {paso === 2 && (
                    <div>
                      <h5 className="fw-bold text-dark mb-3 fs-6">Datos de acceso a la plataforma</h5>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="fw-semibold small text-dark">Correo electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="nombre@ejemplo.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="py-2 px-3 border-0 bg-light"
                          style={{ borderRadius: '10px', fontSize: '14px' }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fw-semibold small text-dark">Contraseña (mínimo 6 caracteres)</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="py-2 px-3 border-0 bg-light"
                          style={{ borderRadius: '10px', fontSize: '14px' }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label className="fw-semibold small text-dark">Confirmar contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="py-2 px-3 border-0 bg-light"
                          style={{ borderRadius: '10px', fontSize: '14px' }}
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          type="button" 
                          variant="light"
                          onClick={pasoAnterior}
                          className="w-50 py-2.5 fw-semibold border"
                          style={{ borderRadius: '10px', fontSize: '15px' }}
                        >
                          &larr; Volver
                        </Button>
                        <Button 
                          type="button" 
                          onClick={siguientePaso}
                          className="w-50 py-2.5 fw-bold text-white border-0 shadow-sm"
                          style={{ backgroundColor: 'var(--pi-navy-deep, #000F22)', borderRadius: '10px', fontSize: '15px' }}
                        >
                          Revisar datos &rarr;
                        </Button>
                      </div>
                    </div>
                  )}

                  {paso === 3 && (
                    <div>
                      <h5 className="fw-bold text-dark mb-3 fs-6">Resumen de tu registro</h5>
                      <div className="bg-light p-3 rounded-3 mb-4 small">
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
                          className="w-50 py-2.5 fw-semibold border"
                          style={{ borderRadius: '10px', fontSize: '15px' }}
                        >
                          &larr; Modificar
                        </Button>
                        <Button 
                          type="submit" 
                          className="w-50 py-2.5 fw-bold text-dark border-0 shadow-sm"
                          style={{ backgroundColor: 'var(--pi-amber, #F5A524)', borderRadius: '10px', fontSize: '15px' }}
                        >
                          Completar registro
                        </Button>
                      </div>
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4 small">
              <span className="text-muted">¿Ya tenés una cuenta en PreInscribe? </span>
              <Link to="/login" className="fw-bold text-decoration-none" style={{ color: 'var(--pi-navy-deep, #000F22)' }}>
                Iniciá sesión acá
              </Link>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registro;