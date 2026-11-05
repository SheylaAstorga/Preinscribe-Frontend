import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MisSolicitudesView = () => {
  const navigate = useNavigate();

  // Recuperar la sesión del usuario
  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null",
  );

  // Recuperar las solicitudes guardadas
  const [solicitudes] = useState(() => {
    const guardadas = JSON.parse(
      localStorage.getItem("preinscripciones") || "[]",
    );

    // Mostrar las solicitudes correspondientes a la familia que inició sesión
    const solicitudesUsuario = usuarioActivo?.email
      ? guardadas.filter(
          (solicitud) => solicitud.usuarioEmail === usuarioActivo.email,
        )
      : guardadas;

    return solicitudesUsuario.map((solicitud) => ({
      ...solicitud,
      alumno:
        solicitud.alumnoNombre || solicitud.alumno || "Alumno sin identificar",
      dniAlumno: solicitud.alumnoDni || solicitud.dniAlumno || "No informado",
      escuela:
        solicitud.escuelaNombre || `Escuela N.º ${solicitud.escuelaId || "-"}`,
      localidad: solicitud.localidad || "No especificada",
      grado: solicitud.gradoAno || solicitud.grado || "No especificado",
      fecha: solicitud.fechaSolicitud || solicitud.fecha || "-",
      estado: normalizarEstado(solicitud.estado),
      documentos: convertirDocumentos(solicitud.documentos),
      tutor: usuarioActivo?.nombre || "Familia responsable",
    }));
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [showModalDetalle, setShowModalDetalle] = useState(false);

  function normalizarEstado(estado) {
    const estados = {
      PENDIENTE: "Pendiente",
      EN_REVISION: "En Revisión",
      LISTA_ESPERA: "En Lista de Espera",
      APROBADA: "Aprobada",
      RECHAZADA: "Rechazada",
      CANCELADA: "Cancelada",
    };

    return estados[estado] || estado || "Pendiente";
  }

  function convertirDocumentos(documentos) {
    if (!documentos) return [];

    if (Array.isArray(documentos)) {
      return documentos;
    }

    return Object.entries(documentos).map(([tipo, archivo]) => {
      const nombres = {
        dniFrente: "DNI del Alumno (Frente)",
        dniDorso: "DNI del Alumno (Dorso)",
        partidaNacimiento: "Partida de Nacimiento",
      };

      return {
        nombre: nombres[tipo] || tipo,
        archivo: archivo,
        estado: archivo ? "Entregado" : "Pendiente",
      };
    });
  }

  const handleAbrirDetalle = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setShowModalDetalle(true);
  };

  const handleCerrarDetalle = () => {
    setShowModalDetalle(false);
    setSolicitudSeleccionada(null);
  };

  const getIniciales = (nombre) => {
    const partes = nombre.split(" ");

    if (partes.length >= 2) {
      return `${partes[0].charAt(0)}${partes[1].charAt(0)}`.toUpperCase();
    }

    return nombre.slice(0, 2).toUpperCase();
  };

  const renderBadgeEstado = (estado) => {
    switch (estado) {
      case "Aprobada":
        return <Badge bg="success">Aprobada</Badge>;

      case "Pendiente":
        return (
          <Badge
            style={{
              backgroundColor: "var(--pi-amber)",
              color: "#fff",
            }}
          >
            Pendiente
          </Badge>
        );

      case "En Revisión":
        return (
          <Badge
            style={{
              backgroundColor: "var(--pi-sky)",
              color: "#000",
            }}
          >
            En Revisión
          </Badge>
        );

      case "En Lista de Espera":
        return <Badge bg="info">En Lista de Espera</Badge>;

      case "Rechazada":
        return <Badge bg="danger">Rechazada</Badge>;

      case "Cancelada":
        return <Badge bg="secondary">Cancelada</Badge>;

      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  // Búsqueda y filtros
  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const texto = busqueda.toLowerCase();

    const coincideTexto =
      sol.alumno.toLowerCase().includes(texto) ||
      sol.escuela.toLowerCase().includes(texto) ||
      String(sol.dniAlumno).includes(texto);

    const coincideEstado =
      filtroEstado === "Todos" || sol.estado === filtroEstado;

    return coincideTexto && coincideEstado;
  });

  return (
    <Container fluid className="px-4 py-3" style={{ maxWidth: "1300px" }}>
      {/* ENCABEZADO */}
      <div className="mb-4">
        <span
          className="label-md text-uppercase"
          style={{ color: "var(--pi-blue)" }}
        >
          GESTIÓN FAMILIAR
        </span>

        <h1 className="h2 mb-1" style={{ color: "var(--pi-navy)" }}>
          Mis solicitudes de preinscripción
        </h1>

        <p className="text-muted mb-0">
          Consultá el estado y avance de las solicitudes de tus hijos.
        </p>
      </div>

      {/* BUSCADOR */}
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
              <Button
                variant="link"
                className="text-muted text-decoration-none"
                onClick={() => setBusqueda("")}
              >
                Limpiar
              </Button>
            )}
          </InputGroup>
        </Card.Body>
      </Card>

      {/* CONTENIDO PRINCIPAL */}
      <Row className="g-4">
        {/* FILTROS */}
        <Col xs={12} lg={3}>
          <Card className="border-0 shadow-sm rounded-3 p-3">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <h5 className="h6 mb-0" style={{ color: "var(--pi-navy)" }}>
                Filtros de búsqueda
              </h5>
            </div>

            <div className="mb-3">
              <label className="small text-uppercase text-muted d-block mb-2">
                Estado de la solicitud
              </label>

              <div className="d-flex flex-wrap gap-2">
                {[
                  { label: "Todas", value: "Todos" },
                  { label: "Pendientes", value: "Pendiente" },
                  { label: "En Revisión", value: "En Revisión" },
                  { label: "Aprobadas", value: "Aprobada" },
                  { label: "Rechazadas", value: "Rechazada" },
                  {
                    label: "En Lista de Espera",
                    value: "En Lista de Espera",
                  },
                ].map((item) => {
                  const activo = filtroEstado === item.value;

                  return (
                    <Button
                      key={item.value}
                      size="sm"
                      style={{
                        backgroundColor: activo
                          ? "var(--pi-blue)"
                          : "transparent",
                        borderColor: "var(--pi-blue)",
                        color: activo ? "#fff" : "var(--pi-blue)",
                      }}
                      className="rounded-pill px-3"
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
              className="w-100 mt-2"
              onClick={() => {
                setBusqueda("");
                setFiltroEstado("Todos");
              }}
            >
              Restablecer filtros
            </Button>
          </Card>
        </Col>

        {/* LISTADO DE SOLICITUDES */}
        <Col xs={12} lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div>
              <h2 className="h4 mb-0" style={{ color: "var(--pi-navy)" }}>
                Solicitudes registradas
              </h2>

              <span className="text-muted small">
                Se encontraron {solicitudesFiltradas.length} solicitudes
              </span>
            </div>

            <Button
              style={{
                backgroundColor: "var(--pi-amber)",
                borderColor: "var(--pi-amber)",
                color: "#fff",
              }}
              className="fw-semibold px-3 shadow-sm border-0"
              onClick={() => navigate("/escuelas")}
            >
              + Nueva preinscripción
            </Button>
          </div>

          {solicitudesFiltradas.length > 0 ? (
            <Row className="g-3">
              {solicitudesFiltradas.map((sol) => (
                <Col xs={12} md={6} xl={4} key={sol.id}>
                  <Card className="h-100 border shadow-sm rounded-3 overflow-hidden bg-white">
                    <div
                      className="p-3 text-white position-relative d-flex justify-content-between align-items-start"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--pi-navy) 0%, var(--pi-blue) 100%)",
                        minHeight: "95px",
                      }}
                    >
                      <div>{renderBadgeEstado(sol.estado)}</div>

                      <Badge bg="light" text="dark">
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
                          color: "var(--pi-blue)",
                        }}
                      >
                        {getIniciales(sol.alumno)}
                      </div>
                    </div>

                    <Card.Body className="pt-4 px-3 pb-3 d-flex flex-column">
                      <div className="mt-2 mb-2">
                        <h3
                          className="h5 mb-0"
                          style={{ color: "var(--pi-navy)" }}
                        >
                          {sol.alumno}
                        </h3>

                        <span className="text-muted small">
                          DNI {sol.dniAlumno}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="fw-semibold small">{sol.escuela}</div>

                        <small className="text-muted d-block">
                          {sol.localidad}
                        </small>
                      </div>

                      <div className="d-flex flex-wrap gap-1 mb-3 mt-auto">
                        <Badge
                          style={{
                            backgroundColor: "var(--pi-blue)",
                            color: "#fff",
                          }}
                        >
                          {sol.nivel}
                        </Badge>

                        <Badge bg="secondary">{sol.grado}</Badge>
                      </div>

                      <hr className="my-2 text-muted opacity-25" />

                      <div className="d-flex justify-content-between align-items-center pt-1">
                        <span className="text-muted small">
                          Fecha: {sol.fecha}
                        </span>

                        <Button
                          size="sm"
                          style={{
                            backgroundColor: "var(--pi-blue)",
                            borderColor: "var(--pi-blue)",
                            color: "#fff",
                          }}
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
                <h3 className="h5 fw-bold text-dark">
                  {solicitudes.length === 0
                    ? "Todavía no tenés solicitudes"
                    : "No se encontraron solicitudes"}
                </h3>

                <p className="text-muted small mb-3">
                  {solicitudes.length === 0
                    ? "Cuando realices una preinscripción, podrás consultar su estado desde esta sección."
                    : "No existen resultados que coincidan con los filtros seleccionados."}
                </p>

                {solicitudes.length === 0 ? (
                  <Button
                    variant="primary"
                    onClick={() => navigate("/escuelas")}
                  >
                    Explorar escuelas
                  </Button>
                ) : (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setBusqueda("");
                      setFiltroEstado("Todos");
                    }}
                  >
                    Restablecer búsqueda
                  </Button>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* MODAL: DETALLE DE SOLICITUD */}
      <Modal
        show={showModalDetalle}
        onHide={handleCerrarDetalle}
        centered
        size="lg"
      >
        {solicitudSeleccionada && (
          <>
            <Modal.Header
              closeButton
              className="border-bottom bg-light px-4 py-3"
            >
              <Modal.Title
                className="h5 fw-bold"
                style={{ color: "var(--pi-navy)" }}
              >
                Detalle de solicitud
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4 bg-white">
              <div
                className="p-3 rounded-3 text-white mb-3 d-flex justify-content-between align-items-center shadow-sm gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--pi-navy) 0%, var(--pi-blue) 100%)",
                }}
              >
                <div>
                  <span className="small text-uppercase d-block text-white-50">
                    Establecimiento educativo
                  </span>

                  <h4 className="h5 fw-bold mb-0 text-white">
                    {solicitudSeleccionada.escuela}
                  </h4>

                  <small className="text-white-50">
                    {solicitudSeleccionada.localidad} • Presentado el{" "}
                    {solicitudSeleccionada.fecha}
                  </small>
                </div>

                <div>{renderBadgeEstado(solicitudSeleccionada.estado)}</div>
              </div>

              <div className="p-3 border rounded-3 mb-3 bg-light">
                <h5
                  className="h6 fw-bold mb-3 border-bottom pb-2"
                  style={{ color: "var(--pi-blue)" }}
                >
                  Información del alumno
                </h5>

                <Row className="g-3">
                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block">
                      Alumno postulante
                    </small>

                    <span className="fw-bold">
                      {solicitudSeleccionada.alumno}
                    </span>
                  </Col>

                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block">DNI del alumno</small>

                    <span className="fw-semibold">
                      {solicitudSeleccionada.dniAlumno}
                    </span>
                  </Col>

                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block">
                      Nivel educativo y grado
                    </small>

                    <span className="fw-semibold">
                      {solicitudSeleccionada.nivel} •{" "}
                      {solicitudSeleccionada.grado}
                    </span>
                  </Col>

                  <Col xs={12} sm={6}>
                    <small className="text-muted d-block">Ciclo lectivo</small>

                    <span className="fw-semibold">
                      {solicitudSeleccionada.cicloLectivo || "-"}
                    </span>
                  </Col>

                  <Col xs={12}>
                    <small className="text-muted d-block">
                      Número de solicitud
                    </small>

                    <span className="fw-semibold">
                      {solicitudSeleccionada.numeroSolicitud ||
                        solicitudSeleccionada.id}
                    </span>
                  </Col>
                </Row>
              </div>

              <div className="p-3 border rounded-3 bg-white">
                <h5
                  className="h6 fw-bold mb-2"
                  style={{ color: "var(--pi-navy)" }}
                >
                  Documentación adjuntada
                </h5>

                {solicitudSeleccionada.documentos.length > 0 ? (
                  <Table
                    size="sm"
                    borderless
                    hover
                    className="align-middle mb-0"
                  >
                    <tbody>
                      {solicitudSeleccionada.documentos.map((doc, i) => (
                        <tr key={i} className="border-bottom">
                          <td className="py-2 text-dark small">
                            {doc.nombre}
                            {doc.archivo && (
                              <small className="d-block text-muted">
                                {doc.archivo}
                              </small>
                            )}
                          </td>

                          <td className="py-2 text-end">
                            <Badge
                              bg={
                                doc.estado === "Entregado"
                                  ? "success"
                                  : "warning"
                              }
                              text={
                                doc.estado === "Entregado" ? "white" : "dark"
                              }
                            >
                              {doc.estado}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-muted small mb-0">
                    No hay documentos registrados.
                  </p>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer className="border-top bg-light px-4 py-3">
              <Button
                style={{
                  backgroundColor: "var(--pi-blue)",
                  borderColor: "var(--pi-blue)",
                  color: "#fff",
                }}
                onClick={handleCerrarDetalle}
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
