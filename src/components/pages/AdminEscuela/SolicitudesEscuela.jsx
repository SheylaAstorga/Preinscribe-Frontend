import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

import {
  ClipboardCheck,
  ClockHistory,
  CheckCircle,
  Search,
  Funnel,
  Eye,
  People,
  ArrowRight,
  FileEarmarkText,
  XCircle,
} from "react-bootstrap-icons";

const SolicitudesEscuela = () => {
  const navigate = useNavigate();

  // DATOS DE DEMOSTRACIÓN
  const [solicitudes] = useState([
    {
      id: 1,
      alumno: "Lucía Fernández",
      documento: "48.235.671",
      grado: "1° año",
      fecha: "05/11/2026",
      estado: "PENDIENTE",
    },
    {
      id: 2,
      alumno: "Mateo González",
      documento: "47.892.314",
      grado: "2° año",
      fecha: "05/11/2026",
      estado: "EN_REVISION",
    },
    {
      id: 3,
      alumno: "Valentina López",
      documento: "48.103.925",
      grado: "1° año",
      fecha: "04/11/2026",
      estado: "APROBADA",
    },
    {
      id: 4,
      alumno: "Tomás Herrera",
      documento: "46.721.839",
      grado: "3° año",
      fecha: "03/11/2026",
      estado: "PENDIENTE",
    },
    {
      id: 5,
      alumno: "Camila Rodríguez",
      documento: "48.542.109",
      grado: "2° año",
      fecha: "02/11/2026",
      estado: "RECHAZADA",
    },
    {
      id: 6,
      alumno: "Santiago Morales",
      documento: "47.316.842",
      grado: "1° año",
      fecha: "01/11/2026",
      estado: "APROBADA",
    },
    {
      id: 7,
      alumno: "Martina Díaz",
      documento: "48.672.301",
      grado: "3° año",
      fecha: "01/11/2026",
      estado: "EN_REVISION",
    },
  ]);

  // FILTROS
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [filtroGrado, setFiltroGrado] = useState("TODOS");

  // INDICADORES
  const total = solicitudes.length;

  const pendientes = solicitudes.filter((s) => s.estado === "PENDIENTE").length;

  const enRevision = solicitudes.filter(
    (s) => s.estado === "EN_REVISION",
  ).length;

  const aprobadas = solicitudes.filter((s) => s.estado === "APROBADA").length;

  const rechazadas = solicitudes.filter((s) => s.estado === "RECHAZADA").length;

  // BÚSQUEDA Y FILTRADO
  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const coincideBusqueda =
      solicitud.alumno.toLowerCase().includes(busqueda.toLowerCase()) ||
      solicitud.documento.includes(busqueda);

    const coincideEstado =
      filtroEstado === "TODOS" || solicitud.estado === filtroEstado;

    const coincideGrado =
      filtroGrado === "TODOS" || solicitud.grado === filtroGrado;

    return coincideBusqueda && coincideEstado && coincideGrado;
  });

  // ESTADOS
  const obtenerEstado = (estado) => {
    const variantes = {
      PENDIENTE: "warning",
      EN_REVISION: "info",
      APROBADA: "success",
      RECHAZADA: "danger",
    };

    const etiquetas = {
      PENDIENTE: "Pendiente",
      EN_REVISION: "En revisión",
      APROBADA: "Aprobada",
      RECHAZADA: "Rechazada",
    };

    return (
      <Badge
        bg={variantes[estado] || "secondary"}
        className="rounded-pill px-3 py-2"
      >
        {etiquetas[estado] || estado}
      </Badge>
    );
  };

  // TARJETAS DE INDICADORES
  const indicadores = [
    {
      titulo: "Total recibidas",
      valor: total,
      detalle: "Preinscripciones registradas",
      icono: <ClipboardCheck size={23} />,
      fondo: "bg-primary-subtle",
      color: "text-primary",
    },
    {
      titulo: "Pendientes",
      valor: pendientes,
      detalle: "Esperando revisión",
      icono: <ClockHistory size={23} />,
      fondo: "bg-warning-subtle",
      color: "text-warning-emphasis",
    },
    {
      titulo: "En revisión",
      valor: enRevision,
      detalle: "En proceso de evaluación",
      icono: <FileEarmarkText size={23} />,
      fondo: "bg-info-subtle",
      color: "text-info-emphasis",
    },
    {
      titulo: "Aprobadas",
      valor: aprobadas,
      detalle: "Preinscripciones aceptadas",
      icono: <CheckCircle size={23} />,
      fondo: "bg-success-subtle",
      color: "text-success",
    },
  ];

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroEstado("TODOS");
    setFiltroGrado("TODOS");
  };

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* ENCABEZADO */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="mb-2">
            <Badge bg="primary" className="rounded-pill px-3 py-2">
              <ClipboardCheck className="me-1" />
              GESTIÓN ESCOLAR
            </Badge>
          </div>

          <h2 className="fw-bold text-dark mb-1">
            Solicitudes de preinscripción
          </h2>

          <p className="text-secondary mb-0">
            Consultá, buscá y gestioná las solicitudes de tu institución.
          </p>
        </div>

        <Button
          variant="outline-primary"
          className="rounded-3 fw-semibold"
          onClick={() => navigate("/escuela/panel")}
        >
          Volver al panel
        </Button>
      </div>

      {/* INDICADORES */}
      <Row className="g-3 mb-4">
        {indicadores.map((item) => (
          <Col xs={12} sm={6} xl={3} key={item.titulo}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="text-secondary small fw-medium">
                    {item.titulo}
                  </span>

                  <div className={`${item.fondo} ${item.color} rounded-3 p-3`}>
                    {item.icono}
                  </div>
                </div>

                <h2 className="fw-bold text-dark mb-1">{item.valor}</h2>

                <small className="text-secondary">{item.detalle}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* BUSCADOR Y FILTROS */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <Funnel className="text-primary" size={20} />
            <h5 className="fw-bold text-dark mb-0">
              Buscar y filtrar solicitudes
            </h5>
          </div>

          <Row className="g-3">
            <Col xs={12} lg={5}>
              <Form.Label className="small fw-semibold text-secondary">
                Buscar alumno o documento
              </Form.Label>

              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <Search className="text-secondary" />
                </InputGroup.Text>

                <Form.Control
                  className="border-start-0 bg-light"
                  placeholder="Ingresá un nombre o DNI..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={6} lg={3}>
              <Form.Label className="small fw-semibold text-secondary">
                Estado
              </Form.Label>

              <Form.Select
                className="bg-light"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="TODOS">Todos los estados</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="EN_REVISION">En revisión</option>
                <option value="APROBADA">Aprobada</option>
                <option value="RECHAZADA">Rechazada</option>
              </Form.Select>
            </Col>

            <Col xs={12} sm={6} lg={2}>
              <Form.Label className="small fw-semibold text-secondary">
                Grado
              </Form.Label>

              <Form.Select
                className="bg-light"
                value={filtroGrado}
                onChange={(e) => setFiltroGrado(e.target.value)}
              >
                <option value="TODOS">Todos</option>
                <option value="1° año">1° año</option>
                <option value="2° año">2° año</option>
                <option value="3° año">3° año</option>
              </Form.Select>
            </Col>

            <Col xs={12} lg={2} className="d-flex align-items-end">
              <Button
                variant="outline-secondary"
                className="w-100 rounded-3"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* TABLA DE SOLICITUDES */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div>
              <h5 className="fw-bold text-dark mb-1">Listado de solicitudes</h5>

              <p className="text-secondary small mb-0">
                Mostrando {solicitudesFiltradas.length} de {total} solicitudes.
              </p>
            </div>

            <Badge
              bg="light"
              text="dark"
              className="border rounded-pill px-3 py-2"
            >
              <People className="me-1" />
              Ciclo lectivo 2027
            </Badge>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 text-secondary small">ALUMNO/A</th>
                  <th className="py-3 text-secondary small">DOCUMENTO</th>
                  <th className="py-3 text-secondary small">GRADO</th>
                  <th className="py-3 text-secondary small">FECHA</th>
                  <th className="py-3 text-secondary small">ESTADO</th>
                  <th className="py-3 text-secondary small text-end">ACCIÓN</th>
                </tr>
              </thead>

              <tbody>
                {solicitudesFiltradas.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td className="py-3">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-primary-subtle text-primary rounded-circle p-2">
                          <People size={17} />
                        </div>

                        <span className="fw-semibold text-dark">
                          {solicitud.alumno}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 text-secondary">
                      {solicitud.documento}
                    </td>

                    <td className="py-3 text-secondary">{solicitud.grado}</td>

                    <td className="py-3 text-secondary">{solicitud.fecha}</td>

                    <td className="py-3">{obtenerEstado(solicitud.estado)}</td>

                    <td className="py-3 text-end">
                      <Button
                        variant="light"
                        size="sm"
                        className="border rounded-3 fw-semibold"
                        onClick={() =>
                          navigate(`/escuela/solicitudes/${solicitud.id}`)
                        }
                      >
                        <Eye className="me-1" />
                        Revisar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* SIN RESULTADOS */}
          {solicitudesFiltradas.length === 0 && (
            <div className="text-center py-5">
              <div className="bg-light rounded-circle p-3 d-inline-flex mb-3">
                <Search size={30} className="text-secondary" />
              </div>

              <h6 className="fw-bold text-dark">No encontramos solicitudes</h6>

              <p className="text-secondary small mb-3">
                Probá modificando los criterios de búsqueda.
              </p>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* RESUMEN INFERIOR */}
      <Row className="g-3 mb-3">
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-3 d-flex align-items-center gap-3">
              <div className="bg-danger-subtle text-danger rounded-3 p-3">
                <XCircle size={23} />
              </div>

              <div>
                <small className="text-secondary">Solicitudes rechazadas</small>
                <h5 className="fw-bold text-dark mb-0">{rechazadas}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-3 d-flex align-items-center gap-3">
              <div className="bg-primary-subtle text-primary rounded-3 p-3">
                <ClipboardCheck size={23} />
              </div>

              <div>
                <small className="text-secondary">Total de registros</small>
                <h5 className="fw-bold text-dark mb-0">{total}</h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between flex-wrap gap-2 pb-3">
        <small className="text-secondary">
          PreInscribe · Gestión de solicitudes
        </small>

        <small className="text-secondary">Datos de demostración</small>
      </div>
    </Container>
  );
};

export default SolicitudesEscuela;
