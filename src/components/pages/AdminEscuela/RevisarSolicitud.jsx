
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Table,
  ListGroup,
} from "react-bootstrap";

import {
  ArrowLeft,
  Person,
  PersonBadge,
  Mortarboard,
  Calendar3,
  FileEarmarkText,
  ClockHistory,
  CheckCircle,
  XCircle,
  Building,
  InfoCircle,
} from "react-bootstrap-icons";

// Datos de demostración.
// Más adelante estos datos vendrán desde la API.
const solicitudesDemo = [
  {
    id: 1,
    alumno: "Lucía Fernández",
    dni: "48.235.671",
    fechaNacimiento: "15/03/2015",
    grado: "1° año",
    fecha: "05/11/2026",
    estado: "PENDIENTE",
    tutor: "María Fernández",
    dniTutor: "25.456.789",
    email: "maria.fernandez@email.com",
    telefono: "381 555-1234",
    escuela: "ESEA Escuela 1",
    ciclo: "2027",
    observaciones: "Sin observaciones registradas.",
  },
  {
    id: 2,
    alumno: "Mateo González",
    dni: "47.892.314",
    fechaNacimiento: "20/08/2014",
    grado: "2° año",
    fecha: "05/11/2026",
    estado: "EN_REVISION",
    tutor: "Carlos González",
    dniTutor: "24.321.654",
    email: "carlos.gonzalez@email.com",
    telefono: "381 555-2345",
    escuela: "ESEA Escuela 1",
    ciclo: "2027",
    observaciones: "Solicitud pendiente de revisión.",
  },
  {
    id: 3,
    alumno: "Valentina López",
    dni: "48.103.925",
    fechaNacimiento: "10/01/2015",
    grado: "1° año",
    fecha: "04/11/2026",
    estado: "APROBADA",
    tutor: "Laura López",
    dniTutor: "26.123.456",
    email: "laura.lopez@email.com",
    telefono: "381 555-3456",
    escuela: "ESEA Escuela 1",
    ciclo: "2027",
    observaciones: "Documentación revisada correctamente.",
  },
  {
    id: 4,
    alumno: "Tomás Herrera",
    dni: "46.721.839",
    fechaNacimiento: "12/06/2013",
    grado: "3° año",
    fecha: "03/11/2026",
    estado: "PENDIENTE",
    tutor: "Gabriel Herrera",
    dniTutor: "23.456.789",
    email: "gabriel.herrera@email.com",
    telefono: "381 555-4567",
    escuela: "ESEA Escuela 1",
    ciclo: "2027",
    observaciones: "Sin observaciones registradas.",
  },
  {
    id: 5,
    alumno: "Camila Rodríguez",
    dni: "48.542.109",
    fechaNacimiento: "02/12/2015",
    grado: "2° año",
    fecha: "02/11/2026",
    estado: "RECHAZADA",
    tutor: "Andrea Rodríguez",
    dniTutor: "27.654.321",
    email: "andrea.rodriguez@email.com",
    telefono: "381 555-5678",
    escuela: "ESEA Escuela 1",
    ciclo: "2027",
    observaciones: "Solicitud rechazada en la revisión administrativa.",
  },
  {
    id: 6,
    alumno: "Santiago Morales",
    dni: "47.316.842",
    fechaNacimiento: "18/04/2014",
    grado: "1° año",
    fecha: "01/11/2026",
    estado: "APROBADA",
    tutor: "Roberto Morales",
    dniTutor: "22.345.678",
    email: "roberto.morales@email.com",
    telefono: "381 555-6789",
    escuela: "ESEA Escuela 1",
    ciclo: "2027",
    observaciones: "Solicitud aprobada.",
  },
  {
    id: 7,
    alumno: "Martina Díaz",
    dni: "48.672.301",
    fechaNacimiento: "25/09/2015",
    grado: "3° año",
    fecha: "01/11/2026",
    estado: "EN_REVISION",
    tutor: "Sofía Díaz",
    dniTutor: "28.765.432",
    email: "sofia.diaz@email.com",
    telefono: "381 555-7890",
    escuela: "ESEA Escuela 1",
    ciclo: "2027",
    observaciones: "Se está verificando la información presentada.",
  },
];

const obtenerColorEstado = (estado) => {
  switch (estado) {
    case "PENDIENTE":
      return "warning";
    case "EN_REVISION":
      return "info";
    case "APROBADA":
      return "success";
    case "RECHAZADA":
      return "danger";
    case "LISTA_ESPERA":
      return "secondary";
    case "CANCELADA":
      return "dark";
    default:
      return "secondary";
  }
};

const obtenerTextoEstado = (estado) => {
  return estado.replaceAll("_", " ");
};

const SeccionInformacion = ({ titulo, icono, children }) => {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="text-primary fs-5">{icono}</span>
          <h5 className="fw-bold mb-0">{titulo}</h5>
        </div>
        {children}
      </Card.Body>
    </Card>
  );
};

const Dato = ({ etiqueta, valor }) => {
  return (
    <div className="mb-3">
      <div className="text-secondary small mb-1">{etiqueta}</div>
      <div className="fw-semibold">{valor || "No informado"}</div>
    </div>
  );
};

const RevisarSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const solicitud = solicitudesDemo.find(
    (item) => item.id === Number(id)
  );

  if (!solicitud) {
    return (
      <Container className="py-5">
        <Card className="border-0 shadow-sm text-center p-5">
          <InfoCircle className="text-secondary fs-1 mb-3" />
          <h4 className="fw-bold">Solicitud no encontrada</h4>
          <p className="text-secondary">
            No se encontró una solicitud con el identificador indicado.
          </p>
          <div>
            <Button
              variant="primary"
              onClick={() => navigate("/escuela/solicitudes")}
            >
              Volver a solicitudes
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <Button
            variant="link"
            className="text-decoration-none text-secondary p-0 mb-3"
            onClick={() => navigate("/escuela/solicitudes")}
          >
            <ArrowLeft className="me-2" />
            Volver a solicitudes
          </Button>

          <h2 className="fw-bold mb-1">Detalle de solicitud</h2>
          <p className="text-secondary mb-0">
            Consultá la información y documentación del aspirante.
          </p>
        </div>

        <div className="text-md-end">
          <div className="text-secondary small mb-2">
            Solicitud N.º {solicitud.id}
          </div>
          <Badge
            bg={obtenerColorEstado(solicitud.estado)}
            className="px-3 py-2"
          >
            {obtenerTextoEstado(solicitud.estado)}
          </Badge>
        </div>
      </div>

      {/* Información principal */}
      <Row className="g-4">
        <Col lg={8}>
          <SeccionInformacion
            titulo="Información del alumno"
            icono={<Person />}
          >
            <Row>
              <Col md={6}>
                <Dato etiqueta="Nombre completo" valor={solicitud.alumno} />
              </Col>
              <Col md={6}>
                <Dato etiqueta="DNI" valor={solicitud.dni} />
              </Col>
              <Col md={6}>
                <Dato
                  etiqueta="Fecha de nacimiento"
                  valor={solicitud.fechaNacimiento}
                />
              </Col>
              <Col md={6}>
                <Dato etiqueta="Grado solicitado" valor={solicitud.grado} />
              </Col>
            </Row>
          </SeccionInformacion>

          <SeccionInformacion
            titulo="Información del responsable"
            icono={<PersonBadge />}
          >
            <Row>
              <Col md={6}>
                <Dato etiqueta="Nombre del tutor" valor={solicitud.tutor} />
              </Col>
              <Col md={6}>
                <Dato etiqueta="DNI del tutor" valor={solicitud.dniTutor} />
              </Col>
              <Col md={6}>
                <Dato etiqueta="Correo electrónico" valor={solicitud.email} />
              </Col>
              <Col md={6}>
                <Dato etiqueta="Teléfono" valor={solicitud.telefono} />
              </Col>
            </Row>
          </SeccionInformacion>

          <SeccionInformacion
            titulo="Datos de la preinscripción"
            icono={<Mortarboard />}
          >
            <Row>
              <Col md={6}>
                <Dato etiqueta="Institución" valor={solicitud.escuela} />
              </Col>
              <Col md={6}>
                <Dato etiqueta="Ciclo lectivo" valor={solicitud.ciclo} />
              </Col>
              <Col md={6}>
                <Dato
                  etiqueta="Fecha de presentación"
                  valor={solicitud.fecha}
                />
              </Col>
              <Col md={6}>
                <Dato
                  etiqueta="Estado actual"
                  valor={obtenerTextoEstado(solicitud.estado)}
                />
              </Col>
            </Row>
          </SeccionInformacion>

          <SeccionInformacion
            titulo="Documentación presentada"
            icono={<FileEarmarkText />}
          >
            <div className="border rounded-3 p-3 d-flex align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <FileEarmarkText className="text-secondary fs-3" />
                <div>
                  <div className="fw-semibold">Documentación del alumno</div>
                  <small className="text-secondary">
                    La carga de archivos estará disponible próximamente.
                  </small>
                </div>
              </div>
              <Badge bg="secondary">No disponible</Badge>
            </div>
          </SeccionInformacion>

          <SeccionInformacion
            titulo="Observaciones"
            icono={<InfoCircle />}
          >
            <p className="text-secondary mb-0">
              {solicitud.observaciones}
            </p>
          </SeccionInformacion>
        </Col>

        {/* Panel lateral */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">Resumen de la solicitud</h5>

              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-primary">
                      <Calendar3 />
                    </div>
                    <div>
                      <div className="text-secondary small">
                        Fecha de inscripción
                      </div>
                      <div className="fw-semibold">{solicitud.fecha}</div>
                    </div>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="px-0 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-primary">
                      <Building />
                    </div>
                    <div>
                      <div className="text-secondary small">Institución</div>
                      <div className="fw-semibold">{solicitud.escuela}</div>
                    </div>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="px-0 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-primary">
                      <Mortarboard />
                    </div>
                    <div>
                      <div className="text-secondary small">Grado</div>
                      <div className="fw-semibold">{solicitud.grado}</div>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3">
                <ClockHistory className="me-2 text-primary" />
                Seguimiento
              </h5>

              <div className="d-flex gap-3 mb-3">
                <CheckCircle className="text-success fs-5 mt-1" />
                <div>
                  <div className="fw-semibold">Solicitud registrada</div>
                  <small className="text-secondary">
                    {solicitud.fecha}
                  </small>
                </div>
              </div>

              <div className="d-flex gap-3">
                <ClockHistory className="text-primary fs-5 mt-1" />
                <div>
                  <div className="fw-semibold">Estado actual</div>
                  <Badge
                    bg={obtenerColorEstado(solicitud.estado)}
                    className="mt-1"
                  >
                    {obtenerTextoEstado(solicitud.estado)}
                  </Badge>
                </div>
              </div>

              <p className="small text-secondary mt-3 mb-0">
                El historial completo de cambios de estado se incorporará
                cuando se conecte el backend.
              </p>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-2">Acciones administrativas</h5>
              <p className="text-secondary small">
                Las acciones de aprobación y rechazo estarán disponibles
                cuando se conecte la API.
              </p>

              <Button
                variant="outline-secondary"
                className="w-100"
                disabled
              >
                <CheckCircle className="me-2" />
                Aprobar solicitud
              </Button>

              <Button
                variant="outline-danger"
                className="w-100 mt-2"
                disabled
              >
                <XCircle className="me-2" />
                Rechazar solicitud
              </Button>

              <small className="text-secondary d-block mt-3">
                Funcionalidad pendiente de conexión con el backend.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RevisarSolicitud;
