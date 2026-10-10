import { useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

// Datos de prueba integrados con el listado oficial de escuelas
const SOLICITUDES_INICIALES = [
  {
    id: 101,
    alumno: "Lucas Gómez",
    dniAlumno: "48.123.456",
    escuela: "Colegio San Martín",
    nivel: "Primario",
    grado: "1° Grado",
    fecha: "10/03/2026",
    estado: "Pendiente",
  },
  {
    id: 102,
    alumno: "Sofía Gómez",
    dniAlumno: "50.987.654",
    escuela: "Instituto Los Lapachos",
    nivel: "Secundario",
    grado: "1° Año",
    fecha: "08/03/2026",
    estado: "Aprobada",
  },
  {
    id: 103,
    alumno: "Lucas Gómez",
    dniAlumno: "48.123.456",
    escuela: "Escuela Nueva Esperanza",
    nivel: "Primario",
    grado: "1° Grado",
    fecha: "25/02/2026",
    estado: "Rechazada",
  },
  {
    id: 104,
    alumno: "Mateo Gómez",
    dniAlumno: "52.333.111",
    escuela: "Colegio del Norte",
    nivel: "Inicial",
    grado: "Sala de 4",
    fecha: "12/03/2026",
    estado: "En Revisión",
  },
];

const MisSolicitudesView = () => {
  const [solicitudes] = useState(SOLICITUDES_INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Helper para asignar la clase y estilo accesible de la etiqueta de estado
  const renderBadgeEstado = (estado) => {
    switch (estado) {
      case "Aprobada":
        return <Badge bg="success-subtle" className="text-success border border-success-subtle px-2.5 py-1.5 rounded-pill fw-semibold">Aprobada</Badge>;
      case "Pendiente":
        return <Badge bg="warning-subtle" className="text-warning-emphasis border border-warning-subtle px-2.5 py-1.5 rounded-pill fw-semibold">Pendiente</Badge>;
      case "En Revisión":
        return <Badge bg="info-subtle" className="text-info-emphasis border border-info-subtle px-2.5 py-1.5 rounded-pill fw-semibold">En Revisión</Badge>;
      case "Rechazada":
        return <Badge bg="danger-subtle" className="text-danger border border-danger-subtle px-2.5 py-1.5 rounded-pill fw-semibold">Rechazada</Badge>;
      default:
        return <Badge bg="secondary-subtle" className="text-secondary border px-2.5 py-1.5 rounded-pill fw-semibold">{estado}</Badge>;
    }
  };

  // Filtrado dinámico por texto y por combo de estado
  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const coincideTexto =
      sol.alumno.toLowerCase().includes(busqueda.toLowerCase()) ||
      sol.escuela.toLowerCase().includes(busqueda.toLowerCase()) ||
      sol.dniAlumno.includes(busqueda);
    const coincideEstado = filtroEstado === "Todos" || sol.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  return (
    <Container className="py-2" style={{ maxWidth: "1100px" }}>
      {/* 1. Encabezado de la página */}
      <header className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center pb-3 mb-4 border-bottom gap-3">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h2 className="h4 fw-bold text-dark mb-0">Mis Solicitudes de Preinscripción</h2>
            <Badge bg="primary-subtle" className="text-primary rounded-circle px-2 py-1 fs-6">
              {solicitudes.length}
            </Badge>
          </div>
          <p className="text-muted small mb-0 mt-1">
            Consultá y gestioná el estado de las vacantes escolares solicitadas para tus hijos.
          </p>
        </div>
        <div>
          <Button variant="primary" className="fw-medium shadow-sm px-3">
            + Nueva solicitud
          </Button>
        </div>
      </header>

      {/* 2. Barra de Búsqueda y Filtros */}
      <Card className="border-0 shadow-sm mb-4 bg-white rounded-3">
        <Card.Body className="p-2.5">
          <Row className="g-2 align-items-center">
            <Col xs={12} md={7} lg={8}>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0 text-muted ps-3">
                  🔍
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Buscar por alumno, DNI o escuela..."
                  className="border-start-0 ps-0 shadow-none"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={5} lg={4}>
              <Form.Select
                className="shadow-none border"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="Todos">Todos los estados</option>
                <option value="Pendiente">Pendientes</option>
                <option value="En Revisión">En Revisión</option>
                <option value="Aprobada">Aprobadas</option>
                <option value="Rechazada">Rechazadas</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Resumen de resultados dinámicos */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <span className="text-muted small fw-semibold">
          Mostrando {solicitudesFiltradas.length} de {solicitudes.length} solicitudes
        </span>
        {(busqueda || filtroEstado !== "Todos") && (
          <Button
            variant="link"
            size="sm"
            className="p-0 text-decoration-none text-primary small"
            onClick={() => {
              setBusqueda("");
              setFiltroEstado("Todos");
            }}
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* 3. Listado en Formato de Tarjetas Individiales (Grid 2 Columnas) */}
      {solicitudesFiltradas.length > 0 ? (
        <Row className="g-3">
          {solicitudesFiltradas.map((sol) => (
            <Col xs={12} lg={6} key={sol.id}>
              <Card className="h-100 border-0 shadow-sm rounded-3 hover-shadow transition-all">
                <Card.Body className="d-flex flex-column p-3.5">
                  {/* Nivel 1: Alumno y Estado */}
                  <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center"
                        style={{ width: "36px", height: "36px", fontSize: "0.9rem" }}
                      >
                        {sol.alumno.charAt(0)}
                      </div>
                      <div>
                        <h3 className="h6 fw-bold text-dark mb-0">{sol.alumno}</h3>
                        <span className="text-muted extra-small d-block">DNI {sol.dniAlumno}</span>
                      </div>
                    </div>
                    <div>{renderBadgeEstado(sol.estado)}</div>
                  </div>

                  <hr className="my-2.5 text-muted opacity-25" />

                  {/* Nivel 2: Escuela y Nivel/Grado */}
                  <div className="my-1 flex-grow-1">
                    <div className="d-flex align-items-center gap-1.5 text-dark fw-semibold mb-1">
                      <span className="text-primary small">🏫</span>
                      <span>{sol.escuela}</span>
                    </div>
                    <div className="text-muted small ms-4">
                      {sol.nivel} • <span className="text-body-secondary">{sol.grado}</span>
                    </div>
                  </div>

                  <hr className="my-2.5 text-muted opacity-25" />

                  {/* Nivel 3 y 4: Metadata y Acción */}
                  <div className="d-flex justify-content-between align-items-center pt-1 mt-auto">
                    <div>
                      <div className="text-muted extra-small">Solicitud #{sol.id}</div>
                      <div className="text-muted extra-small">Presentado: {sol.fecha}</div>
                    </div>
                    <Link to={`/familia/solicitudes/${sol.id}`}>
                      <Button variant="outline-primary" size="sm" className="fw-medium px-3 rounded-2">
                        Ver detalle
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        /* Estado vacío / Búsqueda sin coincidencias */
        <Card className="border-0 shadow-sm text-center py-5 my-3 rounded-3 bg-white">
          <Card.Body>
            <div className="fs-1 mb-2 text-muted">📋</div>
            <h3 className="h6 fw-bold text-dark">No se encontraron solicitudes</h3>
            <p className="text-muted small mx-auto mb-3" style={{ maxWidth: "380px" }}>
              No hay preinscripciones que coincidan con los criterios de búsqueda o filtro aplicados.
            </p>
            {(busqueda || filtroEstado !== "Todos") && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  setBusqueda("");
                  setFiltroEstado("Todos");
                }}
              >
                Restablecer filtros
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MisSolicitudesView;