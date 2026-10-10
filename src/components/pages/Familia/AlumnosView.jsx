import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { AlumnoModal } from './AlumnoModal';

export const AlumnosView = () => {
  // Estado local con los datos de ejemplo solicitados
  const [listaAlumnos, setListaAlumnos] = useState([
    { id: 1, nombre: 'Martina', apellido: 'González', dni: '45123876', edad: 8, nivel: 'Primario' },
    { id: 2, nombre: 'Tomás', apellido: 'Rodríguez', dni: '47256189', edad: 12, nivel: 'Secundario' },
    { id: 3, nombre: 'Sofía', apellido: 'Fernández', dni: '48912345', edad: 6, nivel: 'Primario' }
  ]);

  // Estados para controlar los modales y las selecciones
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alumnoAEditar, setAlumnoAEditar] = useState(null);
  
  // Estado para el modal de "Ver detalles"
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const abrirModalParaCrear = () => {
    setAlumnoAEditar(null);
    setMostrarModal(true);
  };

  const abrirModalParaEditar = (alumno) => {
    setAlumnoAEditar(alumno);
    setMostrarModal(true);
  };

  const abrirModalDetalles = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setMostrarModalDetalles(true);
  };

  const ocultarModal = () => {
    setMostrarModal(false);
    setAlumnoAEditar(null);
  };

  // Función para guardar el alumno (crea uno nuevo o actualiza uno existente)
  const guardarAlumno = (alumnoFormulario) => {
    if (alumnoAEditar) {
      const alumnosActualizados = listaAlumnos.map((alumnoActual) => {
        if (alumnoActual.id === alumnoFormulario.id) {
          return alumnoFormulario;
        } else {
          return alumnoActual;
        }
      });
      setListaAlumnos(alumnosActualizados);
    } else {
      setListaAlumnos([...listaAlumnos, alumnoFormulario]);
    }
  };

  // Función para eliminar un alumno de la lista con confirmación previa
  const eliminarAlumno = (idAlumno) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este alumno?');
    
    if (confirmacion) {
      const alumnosFiltrados = listaAlumnos.filter((alumnoActual) => {
        return alumnoActual.id !== idAlumno;
      });
      setListaAlumnos(alumnosFiltrados);
    }
  };

  return (
    <Container className="py-5">
      {/* Breadcrumb y Cabecera de la sección estilo PreInscribe */}
      <div className="mb-2">
        <span className="text-muted small fw-semibold">Familia / Mis hijos</span>
      </div>

      <Row className="align-items-center mb-5">
        <Col md={8}>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--pi-navy, #0A2540)' }}>
            Mis hijos
          </h2>
          <p className="text-muted mb-0 small">
            Gestioná la información de los alumnos asociados a tu familia.
          </p>
        </Col>
        <Col md={4} className="text-md-end mt-3 mt-md-0">
          <Button 
            onClick={abrirModalParaCrear} 
            className="fw-bold px-4 py-2 shadow-sm border-0 d-inline-flex align-items-center gap-2"
            style={{ 
              backgroundColor: 'var(--pi-amber, #F5A524)', 
              color: 'var(--pi-navy-deep, #000F22)',
              borderRadius: '8px'
            }}
          >
            <span>+ Agregar alumno</span>
          </Button>
        </Col>
      </Row>

      {/* Listado en Tarjetas modernas con diseño institucional */}
      {listaAlumnos.length === 0 ? (
        <Card className="text-center p-5 border-0 shadow-sm rounded-4 bg-white">
          <Card.Body>
            <div className="mb-3 display-5">👨‍👩‍👧‍👦</div>
            <h5 className="fw-bold text-secondary mb-2">No hay alumnos cargados</h5>
            <p className="text-muted small mb-4">Todavía no registraste a ningún alumno en tu cuenta familiar.</p>
            <Button 
              onClick={abrirModalParaCrear}
              className="fw-semibold px-4 text-dark border-0"
              style={{ backgroundColor: 'var(--pi-amber, #F5A524)', borderRadius: '8px' }}
            >
              + Agregar alumno
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {listaAlumnos.map((alumno) => (
            <Col key={alumno.id}>
              <Card 
                className="shadow-sm h-100 border-0 rounded-4 bg-white position-relative overflow-hidden"
                style={{ borderLeft: '4px solid var(--pi-blue, #1D4E89)' }}
              >
                <Card.Body className="d-flex flex-column p-4">
                  
                  {/* Encabezado de la tarjeta con inicial y nivel */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                        style={{ 
                          width: '46px', 
                          height: '46px', 
                          backgroundColor: 'var(--pi-blue, #1D4E89)',
                          fontSize: '16px'
                        }}
                      >
                        {alumno.nombre ? alumno.nombre.charAt(0) : 'A'}
                      </div>
                      <div>
                        <Card.Title className="fw-bold mb-0" style={{ color: 'var(--pi-navy, #0A2540)', fontSize: '1.1rem' }}>
                          {alumno.nombre} {alumno.apellido}
                        </Card.Title>
                      </div>
                    </div>
                    {alumno.nivel && (
                      <Badge 
                        className="px-3 py-2 fw-semibold rounded-pill text-white" 
                        style={{ backgroundColor: 'var(--pi-blue, #1D4E89)' }}
                      >
                        {alumno.nivel}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Datos del alumno */}
                  <div className="text-secondary small mb-4 ps-1">
                    <p className="mb-1 d-flex align-items-center gap-2">
                      <span></span> DNI: <strong className="text-dark">{alumno.dni}</strong>
                    </p>
                    <p className="mb-0 d-flex align-items-center gap-2">
                      <span></span> Edad: <strong className="text-dark">{alumno.edad} años</strong>
                    </p>
                  </div>

                  {/* Acciones de la tarjeta (Ver detalles, Editar, Eliminar) */}
                  <div className="mt-auto d-flex flex-column gap-2 pt-2 border-top border-light">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="w-100 fw-semibold rounded-pill py-2"
                      onClick={() => abrirModalDetalles(alumno)}
                    >
                       Ver detalles
                    </Button>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="w-100 fw-semibold rounded-pill py-2"
                        onClick={() => abrirModalParaEditar(alumno)}
                      >
                         Editar
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="w-100 fw-semibold rounded-pill py-2"
                        onClick={() => eliminarAlumno(alumno.id)}
                      >
                         Eliminar
                      </Button>
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Componente del Modal de Alta y Edición */}
      <AlumnoModal 
        mostrar={mostrarModal} 
        ocultar={ocultarModal} 
        guardarAlumno={guardarAlumno} 
        alumnoAEditar={alumnoAEditar} 
      />

      {/* Modal para Ver Detalles */}
      <Modal show={mostrarModalDetalles} onHide={() => setMostrarModalDetalles(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ color: 'var(--pi-navy, #0A2540)' }}>
            Detalles del Alumno
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          {alumnoSeleccionado && (
            <div className="text-center">
              <div 
                className="rounded-circle mx-auto d-flex align-items-center justify-content-center text-white fw-bold shadow-sm mb-3"
                style={{ width: '64px', height: '64px', backgroundColor: 'var(--pi-blue, #1D4E89)', fontSize: '20px' }}
              >
                {alumnoSeleccionado.nombre.charAt(0)}{alumnoSeleccionado.apellido.charAt(0)}
              </div>
              <h4 className="fw-bold mb-1" style={{ color: 'var(--pi-navy, #0A2540)' }}>
                {alumnoSeleccionado.nombre} {alumnoSeleccionado.apellido}
              </h4>
              <p className="text-muted small mb-4">Información registrada en el sistema familiar</p>
              
              <div className="bg-light p-3 rounded-4 text-start d-flex flex-column gap-2">
                <div><strong>DNI:</strong> {alumnoSeleccionado.dni}</div>
                <div><strong>Edad:</strong> {alumnoSeleccionado.edad} años</div>
                {alumnoSeleccionado.nivel && <div><strong>Nivel:</strong> {alumnoSeleccionado.nivel}</div>}
                <div><strong>Estado:</strong> <Badge bg="success">Habilitado para preinscripción</Badge></div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 pb-4 justify-content-center">
          <Button variant="secondary" onClick={() => setMostrarModalDetalles(false)} className="px-4 fw-semibold rounded-pill">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};