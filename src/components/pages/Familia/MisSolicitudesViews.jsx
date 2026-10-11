import { useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup, Modal, Table } from "react-bootstrap";

// Hijos registrados del tutor (sincronizados con la sección Mis Hijos)
const ALUMNOS_DISPONIBLES = [
  { nombre: "Lucas Gómez", dni: "48.123.456" },
  { nombre: "Sofía Gómez", dni: "50.987.654" },
  { nombre: "Mateo Gómez", dni: "52.333.111" }
];

// Escuelas oficiales disponibles
const ESCUELAS_DISPONIBLES = [
  { nombre: "Colegio San Martín", localidad: "San Miguel de Tucumán" },
  { nombre: "Instituto Los Lapachos", localidad: "Yerba Buena" },
  { nombre: "Escuela Nueva Esperanza", localidad: "Tafí Viejo" },
  { nombre: "Colegio del Norte", localidad: "San Miguel de Tucumán" }
];

const SOLICITUDES_INICIALES = [
  {
    id: 101,
    alumno: "Lucas Gómez",
    dniAlumno: "48.123.456",
    escuela: "Colegio San Martín",
    localidad: "San Miguel de Tucumán",
    nivel: "Primario",
    grado: "1° Grado",
    fecha: "10/03/2026",
    estado: "Pendiente",
    tutor: "Facundo Gómez",
    documentos: [
      { nombre: "DNI del Alumno", estado: "Entregado" },
      { nombre: "Partida de Nacimiento", estado: "Entregado" },
      { nombre: "Ficha de Salud", estado: "Pendiente" }
    ]
  },
  {
    id: 102,
    alumno: "Sofía Gómez",
    dniAlumno: "50.987.654",
    escuela: "Instituto Los Lapachos",
    localidad: "Yerba Buena",
    nivel: "Secundario",
    grado: "1° Año",
    fecha: "08/03/2026",
    estado: "Aprobada",
    tutor: "Facundo Gómez",
    documentos: [
      { nombre: "DNI del Alumno", estado: "Entregado" },
      { nombre: "Partida de Nacimiento", estado: "Entregado" },
      { nombre: "Boletín del Nivel Anterior", estado: "Entregado" }
    ]
  },
  {
    id: 103,
    alumno: "Lucas Gómez",
    dniAlumno: "48.123.456",
    escuela: "Escuela Nueva Esperanza",
    localidad: "Tafí Viejo",
    nivel: "Primario",
    grado: "1° Grado",
    fecha: "25/02/2026",
    estado: "Rechazada",
    tutor: "Facundo Gómez",
    documentos: [
      { nombre: "DNI del Alumno", estado: "Entregado" },
      { nombre: "Partida de Nacimiento", estado: "Entregado" },
      { nombre: "Certificado de Vacunación", estado: "Pendiente" }
    ]
  },
  {
    id: 104,
    alumno: "Mateo Gómez",
    dniAlumno: "52.333.111",
    escuela: "Colegio del Norte",
    localidad: "San Miguel de Tucumán",
    nivel: "Inicial",
    grado: "Sala de 4",
    fecha: "12/03/2026",
    estado: "En Revisión",
    tutor: "Facundo Gómez",
    documentos: [
      { nombre: "DNI del Alumno", estado: "Entregado" },
      { nombre: "Partida de Nacimiento", estado: "Entregado" }
    ]
  }
];

const MisSolicitudesView = () => {
  const [solicitudes, setSolicitudes] = useState(SOLICITUDES_INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  
  // Modal de Detalle
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [showModalDetalle, setShowModalDetalle] = useState(false);

  // Modal de Nueva Solicitud
  const [showModalNueva, setShowModalNueva] = useState(false);
  const [formNueva, setFormNueva] = useState({
    alumnoIndex: "",
    escuelaIndex: "",
    nivel: "Primario",
    grado: "1° Grado"
  });

  const handleAbrirDetalle = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setShowModalDetalle(true);
  };

  const handleCerrarDetalle = () => {
    setShowModalDetalle(false);
    setSolicitudSeleccionada(null);
  };

  // Manejo de Formulario de Nueva Solicitud
  const handleCrearSolicitud = (e) => {
    e.preventDefault();
    if (formNueva.alumnoIndex === "" || formNueva.escuelaIndex === "") {
      alert("Por favor seleccioná el alumno y la escuela.");
      return;
    }

    const alumnoSel = ALUMNOS_DISPONIBLES[parseInt(formNueva.alumnoIndex)];
    const escuelaSel = ESCUELAS_DISPONIBLES[parseInt(formNueva.escuelaIndex)];

    const nuevaSolicitud = {
      id: 100 + solicitudes.length + 1,
      alumno: alumnoSel.nombre,
      dniAlumno: alumnoSel.dni,
      escuela: escuelaSel.nombre,
      localidad: escuelaSel.localidad,
      nivel: formNueva.nivel,
      grado: formNueva.grado,
      fecha: new Date().toLocaleDateString("es-AR"),
      estado: "Pendiente",
      tutor: "Facundo Gómez",
      documentos: [
        { nombre: "DNI del Alumno", estado: "Entregado" },
        { nombre: "Partida de Nacimiento", estado: "Pendiente" }
      ]
    };

    setSolicitudes([nuevaSolicitud, ...solicitudes]);
    setShowModalNueva(false);
    setFormNueva({ alumnoIndex: "", escuelaIndex: "", nivel: "Primario", grado: "1° Grado" });
  };

  const getIniciales = (nombre) => {
    const partes = nombre.split(" ");
    if (partes.length >= 2) {
      return `${partes[0].charAt(0)}${partes[1].charAt(0)}`.toUpperCase();
    }
    return nombre.slice(0, 2).toUpperCase();
  };

  const renderBadgeEstadoHeader = (estado) => {
    switch (estado) {
      case "Aprobada":
        return <Badge bg="success" className="px-2.5 py-1 label-md">Aprobada</Badge>;
      case "Pendiente":
        return <Badge style={{ backgroundColor: "var(--pi-amber)", color: "#fff" }} className="px-2.5 py-1 label-md">Pendiente</Badge>;
      case "En Revisión":
        return <Badge style={{ backgroundColor: "var(--pi-sky)", color: "#000" }} className="px-2.5 py-1 label-md">En Revisión</Badge>;
      case "Rechazada":
        return <Badge bg="danger" className="px-2.5 py-1 label-md">Rechazada</Badge>;
      default:
        return <Badge bg="secondary" className="label-md">{estado}</Badge>;
    }
  };

  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const coincideTexto =
      sol.alumno.toLowerCase().includes(busqueda.toLowerCase()) ||
      sol.escuela.toLowerCase().includes(busqueda.toLowerCase()) ||
      sol.dniAlumno.includes(busqueda);
    const coincideEstado = filtroEstado === "Todos" || sol.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  return (
    <Container fluid className="px-4 py-3" style={{ maxWidth: "1300px" }}>
      {/* HEADER DE SECCIÓN */}
      <div className="mb-4">
        <span className="label-md text-uppercase" style={{ color: "var(--pi-blue)" }}>GESTIÓN FAMILIAR</span>
        <h1 className="h2 mb-1" style={{ color: "var(--pi-navy)" }}>Mis solicitudes de preinscripción</h1>
        <p className="text-muted mb-0 body-sm">Consultá el estado y avance de las vacantes escolares de tus hijos.</p>
      </div>

      {/* BUSCADOR SUPERIOR */}
      <Card className="border shadow-sm mb-4 rounded-3">
        <Card.Body className="p-2">
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Buscá por alumno, DNI o escuela..."
              className="border-0 shadow-none ps-3"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <Button variant="link" className="text-muted text-decoration-none body-sm" onClick={() => setBusqueda("")}>
                Limpiar
              </Button>
            )}
            <Button style={{ backgroundColor: "var(--pi-blue)", borderColor: "var(--pi-blue)" }} className="px-4 fw-semibold rounded-2 ms-2 text-white">
              Buscar
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>

      {/* LAYOUT PRINCIPAL */}
      <Row className="g-4">
        {/* PANEL DE FILTROS LATERAL */}
        <Col xs={12} lg={3}>
          <Card className="border-0 shadow-sm rounded-3 p-3">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <h5 className="h6 mb-0" style={{ color: "var(--pi-navy)" }}>Filtros de búsqueda</h5>
            </div>

            <div className="mb-3">
              <label className="label-sm text-uppercase text-muted d-block mb-2">
                Estado de la solicitud
              </label>
              <div className="d-flex flex-wrap gap-1.5">
                {[
                  { label: "Todas", value: "Todos" },
                  { label: "Pendientes", value: "Pendiente" },
                  { label: "En Revisión", value: "En Revisión" },
                  { label: "Aprobadas", value: "Aprobada" },
                  { label: "Rechazadas", value: "Rechazada" },
                ].map((item) => {
                  const isActive = filtroEstado === item.value;
                  return (
                    <Button
                      key={item.value}
                      size="sm"
                      style={{
                        backgroundColor: isActive ? "var(--pi-blue)" : "transparent",
                        borderColor: "var(--pi-blue)",
                        color: isActive ? "#fff" : "var(--pi-blue)"
                      }}
                      className="rounded-pill px-3 py-1 label-md"
                      onClick={() => setFiltroEstado(item.value)}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <Button
              variant="outline-secondary"
              size="sm"
              className="w-100 mt-2 label-md"
              onClick={() => {
                setBusqueda("");
                setFiltroEstado("Todos");
              }}
            >
              Restablecer filtros
            </Button>
          </Card>
        </Col>

        {/* LISTADO DE TARJETAS */}
        <Col xs={12} lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="h4 mb-0" style={{ color: "var(--pi-navy)" }}>Solicitudes registradas</h2>
              <span className="text-muted small">Se encontraron {solicitudesFiltradas.length} solicitudes</span>
            </div>
            <Button
              style={{ backgroundColor: "var(--pi-amber)", borderColor: "var(--pi-amber)", color: "#fff" }}
              className="fw-semibold px-3 shadow-sm border-0 label-md"
              onClick={() => setShowModalNueva(true)}
            >
              + Nueva solicitud
            </Button>
          </div>

          {solicitudesFiltradas.length > 0 ? (
            <Row className="g-3">
              {solicitudesFiltradas.map((sol) => (
                <Col xs={12} md={6} xl={4} key={sol.id}>
                  <Card className="h-100 border shadow-sm rounded-3 overflow-hidden d-flex flex-column bg-white">
                    <div 
                      className="p-3 text-white position-relative d-flex justify-content-between align-items-start"
                      style={{
                        background: "linear-gradient(135deg, var(--pi-navy) 0%, var(--pi-blue) 100%)",
                        minHeight: "95px"
                      }}
                    >
                      <div>{renderBadgeEstadoHeader(sol.estado)}</div>
                      <Badge bg="light" text="dark" className="label-md px-2 py-1">
                        #{sol.id}
                      </Badge>

                      <div 
                        className="position-absolute bg-white fw-bold shadow-sm d-flex align-items-center justify-content-center rounded-circle border border-2 border-white"
                        style={{
                          width: "48px",
                          height: "48px",
                          bottom: "-24px",
                          left: "16px",
                          fontSize: "1rem",
                          color: "var(--pi-blue)"
                        }}
                      >
                        {getIniciales(sol.alumno)}
                      </div>
                    </div>

                    <Card.Body className="pt-4 px-3 pb-3 d-flex flex-column flex-grow-1">
                      <div className="mt-2 mb-2">
                        <h3 className="h5 mb-0" style={{ color: "var(--pi-navy)" }}>{sol.alumno}</h3>
                        <span className="text-muted body-sm">DNI {sol.dniAlumno}</span>
                      </div>

                      <div className="mb-3">
                        <div className="fw-semibold small" style={{ color: "var(--pi-navy-deep)" }}>
                          {sol.escuela}
                        </div>
                        <small className="text-muted d-block">{sol.localidad}</small>
                      </div>

                      <div className="d-flex flex-wrap gap-1 mb-3 mt-auto">
                        <Badge style={{ backgroundColor: "var(--pi-blue)", color: "#fff" }} className="border-0 label-md">
                          {sol.nivel}
                        </Badge>
                        <Badge bg="secondary-subtle" className="text-secondary border label-md">
                          {sol.grado}
                        </Badge>
                      </div>

                      <hr className="my-2 text-muted opacity-25" />

                      <div className="d-flex justify-content-between align-items-center pt-1">
                        <span className="text-muted body-sm">Fecha: {sol.fecha}</span>
                        <Button
                          size="sm"
                          style={{ backgroundColor: "var(--pi-blue)", borderColor: "var(--pi-blue)", color: "#fff" }}
                          className="fw-semibold px-3 rounded-2 label-md"
                          onClick={() => handleAbrirDetalle(sol)}
                        >
                          Ver detalle →
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="border text-center py-5 rounded-3 bg-white">
              <Card.Body>
                <h3 className="h6 fw-bold text-dark">No se encontraron solicitudes</h3>
                <p className="text-muted small mb-3">No existen resultados que coincidan con los filtros seleccionados.</p>
                <Button variant="outline-primary" size="sm" onClick={() => { setBusqueda(""); setFiltroEstado("Todos"); }}>
                  Restablecer búsqueda
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* MODAL 1: NUEVA SOLICITUD DE PREINSCRIPCIÓN (REDISEÑADO CON BLOQUES Y MARCA) */}
    <Modal show={showModalNueva} onHide={() => setShowModalNueva(false)} centered size="lg">
        <Form onSubmit={handleCrearSolicitud}>
            {/* Banner Header Institucional */}
            <Modal.Header 
            closeButton 
            closeVariant="white"
            className="p-4 text-white border-0"
            style={{ background: "linear-gradient(135deg, var(--pi-navy) 0%, var(--pi-blue) 100%)" }}
            >
            <div>
                <span className="label-sm text-uppercase d-block text-white-50">PROCESO DE REGISTRO</span>
                <Modal.Title className="h5 fw-bold mb-0 text-white">
                Nueva Solicitud de Preinscripción
                </Modal.Title>
                <small className="text-white-50 body-sm">Completá los datos del alumno y la escuela para iniciar el trámite.</small>
            </div>
            </Modal.Header>

            <Modal.Body className="p-4" style={{ backgroundColor: "#f8fafc" }}>
            {/* BLOQUE 1: DATOS DEL ALUMNO */}
            <Card className="border-0 shadow-sm rounded-3 mb-3 bg-white">
                <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <span className="fw-bold" style={{ color: "var(--pi-blue)" }}>1. Datos del Postulante</span>
                </div>

                <div>
                    <Form.Label className="label-sm text-uppercase text-muted fw-bold">
                    Seleccionar Hijo / Alumno
                    </Form.Label>
                    <Form.Select
                    required
                    className="shadow-none border py-2"
                    style={{ backgroundColor: "var(--pi-tint)", borderColor: "var(--pi-sky)" }}
                    value={formNueva.alumnoIndex}
                    onChange={(e) => setFormNueva({ ...formNueva, alumnoIndex: e.target.value })}
                    >
                    <option value="">-- Seleccioná un alumno de tu familia --</option>
                    {ALUMNOS_DISPONIBLES.map((alum, idx) => (
                        <option key={idx} value={idx}>
                        {alum.nombre} (DNI: {alum.dni})
                        </option>
                    ))}
                    </Form.Select>
                </div>
                </Card.Body>
            </Card>

            {/* BLOQUE 2: DATOS DE LA ESCUELA Y ACADÉMICOS */}
            <Card className="border-0 shadow-sm rounded-3 bg-white">
                <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <span className="fw-bold" style={{ color: "var(--pi-blue)" }}>2. Destino Educativo</span>
                </div>

                <div className="mb-3">
                    <Form.Label className="label-sm text-uppercase text-muted fw-bold">
                    Escuela de Destino
                    </Form.Label>
                    <Form.Select
                    required
                    className="shadow-none border py-2"
                    value={formNueva.escuelaIndex}
                    onChange={(e) => setFormNueva({ ...formNueva, escuelaIndex: e.target.value })}
                    >
                    <option value="">-- Seleccioná la institución --</option>
                    {ESCUELAS_DISPONIBLES.map((esc, idx) => (
                        <option key={idx} value={idx}>
                        {esc.nombre} ({esc.localidad})
                        </option>
                    ))}
                    </Form.Select>
                </div>

                <Row className="g-3">
                    <Col xs={12} sm={6}>
                    <Form.Label className="label-sm text-uppercase text-muted fw-bold">
                        Nivel Educativo
                    </Form.Label>
                    <Form.Select
                        className="shadow-none border"
                        value={formNueva.nivel}
                        onChange={(e) => setFormNueva({ ...formNueva, nivel: e.target.value })}
                    >
                        <option value="Inicial">Inicial</option>
                        <option value="Primario">Primario</option>
                        <option value="Secundario">Secundario</option>
                    </Form.Select>
                    </Col>
                    <Col xs={12} sm={6}>
                    <Form.Label className="label-sm text-uppercase text-muted fw-bold">
                        Grado / Sala / Año
                    </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Ej: 1° Grado / Sala 4"
                        className="shadow-none border"
                        value={formNueva.grado}
                        onChange={(e) => setFormNueva({ ...formNueva, grado: e.target.value })}
                    />
                    </Col>
                </Row>
                </Card.Body>
            </Card>
            </Modal.Body>

            {/* Footer de Acciones */}
            <Modal.Footer className="border-top bg-light px-4 py-3">
            <Button 
                variant="outline-secondary" 
                onClick={() => setShowModalNueva(false)} 
                className="px-3 label-md"
            >
                Cancelar
            </Button>
            <Button
                type="submit"
                style={{ backgroundColor: "var(--pi-amber)", borderColor: "var(--pi-amber)", color: "#fff" }}
                className="px-4 label-md fw-semibold shadow-sm border-0"
            >
                Confirmar Solicitud
            </Button>
            </Modal.Footer>
        </Form>
    </Modal>

      {/* MODAL 2: DETALLE DE SOLICITUD */}
      <Modal show={showModalDetalle} onHide={handleCerrarDetalle} centered size="lg">
        {solicitudSeleccionada && (
          <>
            <Modal.Header closeButton className="border-bottom bg-light px-4 py-3">
              <Modal.Title className="h5 fw-bold" style={{ color: "var(--pi-navy)" }}>
                Detalle de Solicitud <span style={{ color: "var(--pi-blue)" }}>#{solicitudSeleccionada.id}</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 bg-white">
              <div 
                className="p-3 rounded-3 text-white mb-3 d-flex justify-content-between align-items-center shadow-sm"
                style={{ background: "linear-gradient(135deg, var(--pi-navy) 0%, var(--pi-blue) 100%)" }}
              >
                <div>
                  <span className="label-sm text-uppercase d-block text-white-50">Establecimiento Educativo</span>
                  <h4 className="h5 fw-bold mb-0 text-white">{solicitudSeleccionada.escuela}</h4>
                  <small className="text-white-50">{solicitudSeleccionada.localidad} • Presentado el {solicitudSeleccionada.fecha}</small>
                </div>
                <div>{renderBadgeEstadoHeader(solicitudSeleccionada.estado)}</div>
              </div>

              <div className="p-3 border rounded-3 mb-3 bg-light">
                <h5 className="h6 fw-bold mb-3 border-bottom pb-2" style={{ color: "var(--pi-blue)" }}>Información del Alumno y Tutor</h5>
                <Row className="g-3">
                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block label-sm text-uppercase">Alumno Postulante</small>
                    <span className="fw-bold" style={{ color: "var(--pi-navy)" }}>{solicitudSeleccionada.alumno}</span>
                  </Col>
                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block label-sm text-uppercase">DNI del Alumno</small>
                    <span className="fw-semibold text-dark">{solicitudSeleccionada.dniAlumno}</span>
                  </Col>
                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block label-sm text-uppercase">Nivel Educativo y Grado</small>
                    <span className="fw-semibold text-dark">{solicitudSeleccionada.nivel} • {solicitudSeleccionada.grado}</span>
                  </Col>
                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block label-sm text-uppercase">Tutor Responsable</small>
                    <span className="fw-semibold text-dark">{solicitudSeleccionada.tutor}</span>
                  </Col>
                </Row>
              </div>

              <div className="p-3 border rounded-3 bg-white">
                <h5 className="h6 fw-bold mb-2" style={{ color: "var(--pi-navy)" }}>Estado de Documentación</h5>
                <Table size="sm" borderless hover className="align-middle mb-0">
                  <tbody>
                    {solicitudSeleccionada.documentos?.map((doc, i) => (
                      <tr key={i} className="border-bottom">
                        <td className="py-2 text-dark small fw-medium">{doc.nombre}</td>
                        <td className="py-2 text-end">
                          <Badge bg={doc.estado === "Entregado" ? "success" : "warning"} text={doc.estado === "Entregado" ? "white" : "dark"} className="label-md">
                            {doc.estado}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-top bg-light px-4 py-3">
              <Button 
                style={{ backgroundColor: "var(--pi-blue)", borderColor: "var(--pi-blue)", color: "#fff" }} 
                onClick={handleCerrarDetalle} 
                className="px-4 label-md fw-semibold"
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default MisSolicitudesView;