
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  ProgressBar,
} from "react-bootstrap";

const PanelEscuela = () => {
  const navigate = useNavigate();

  // Datos de demostración. Luego se reemplazarán por datos de la API.
  const usuario = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null"
  );

  const solicitudes = [
    {
      id: 1,
      alumno: "Lucía Fernández",
      grado: "1° año",
      fecha: "05/11/2026",
      estado: "PENDIENTE",
    },
    {
      id: 2,
      alumno: "Mateo González",
      grado: "2° año",
      fecha: "05/11/2026",
      estado: "EN_REVISION",
    },
    {
      id: 3,
      alumno: "Valentina López",
      grado: "1° año",
      fecha: "04/11/2026",
      estado: "APROBADA",
    },
    {
      id: 4,
      alumno: "Tomás Herrera",
      grado: "3° año",
      fecha: "03/11/2026",
      estado: "PENDIENTE",
    },
  ];

  const indicadores = [
    {
      titulo: "Solicitudes recibidas",
      valor: "128",
      detalle: "Total del ciclo lectivo",
      icono: "▤",
      color: "#2463A6",
      fondo: "#EAF2FC",
    },
    {
      titulo: "Pendientes",
      valor: "24",
      detalle: "Requieren revisión",
      icono: "◷",
      color: "#D58A21",
      fondo: "#FFF5E5",
    },
    {
      titulo: "Aprobadas",
      valor: "76",
      detalle: "Preinscripciones aceptadas",
      icono: "✓",
      color: "#26966D",
      fondo: "#E8F6EF",
    },
    {
      titulo: "Vacantes disponibles",
      valor: "32",
      detalle: "Cupos sin ocupar",
      icono: "⌂",
      color: "#168C96",
      fondo: "#E6F6F6",
    },
  ];

  const estados = [
    { nombre: "Pendientes", cantidad: 24, porcentaje: 19, color: "warning" },
    { nombre: "En revisión", cantidad: 18, porcentaje: 14, color: "info" },
    { nombre: "Aprobadas", cantidad: 76, porcentaje: 59, color: "success" },
    { nombre: "Rechazadas", cantidad: 10, porcentaje: 8, color: "danger" },
  ];

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
      <Badge bg={variantes[estado] || "secondary"} className="fw-medium px-3 py-2">
        {etiquetas[estado] || estado}
      </Badge>
    );
  };

  return (
    <Container fluid className="px-0">

      {/* ENCABEZADO */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <p
            className="mb-1 fw-semibold"
            style={{ color: "#168C96", fontSize: "13px" }}
          >
            ADMINISTRACIÓN ESCOLAR
          </p>

          <h2 className="fw-bold mb-1" style={{ color: "#18344F" }}>
            Panel principal
          </h2>

          <p className="text-secondary mb-0">
            Bienvenido/a, {usuario?.nombre || "Administrador"}.
            Aquí podés gestionar las preinscripciones de tu institución.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-3 px-3 py-2 bg-white border"
            style={{ color: "#18344F" }}
          >
            <small className="text-secondary d-block">Ciclo lectivo</small>
            <strong>2027</strong>
          </div>

          <Button
            onClick={() => navigate("/escuela/solicitudes")}
            style={{
              backgroundColor: "#168C96",
              border: "none",
              padding: "12px 18px",
            }}
          >
            + Ver solicitudes
          </Button>
        </div>
      </div>

      {/* INDICADORES */}
      <Row className="g-3 mb-4">
        {indicadores.map((item, index) => (
          <Col xs={12} sm={6} xl={3} key={index}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-secondary mb-2 small">
                      {item.titulo}
                    </p>

                    <h2 className="fw-bold mb-1" style={{ color: "#18344F" }}>
                      {item.valor}
                    </h2>

                    <small className="text-secondary">
                      {item.detalle}
                    </small>
                  </div>

                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: item.fondo,
                      color: item.color,
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.icono}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CONTENIDO PRINCIPAL */}
      <Row className="g-4 mb-4">

        {/* ESTADOS */}
        <Col xs={12} lg={5}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-1" style={{ color: "#18344F" }}>
                Estado de las solicitudes
              </h5>

              <p className="text-secondary small mb-4">
                Distribución de las preinscripciones recibidas.
              </p>

              {estados.map((estado) => (
                <div className="mb-4" key={estado.nombre}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="small fw-medium text-secondary">
                      {estado.nombre}
                    </span>

                    <strong style={{ color: "#18344F" }}>
                      {estado.cantidad}
                    </strong>
                  </div>

                  <ProgressBar
                    now={estado.porcentaje}
                    variant={estado.color}
                    style={{ height: "9px", borderRadius: "10px" }}
                  />
                </div>
              ))}

              <div
                className="rounded-3 p-3 mt-2"
                style={{ backgroundColor: "#F1F7F8" }}
              >
                <p className="small mb-0" style={{ color: "#31566B" }}>
                  <strong>Información:</strong> los datos mostrados son de
                  demostración y se conectarán posteriormente con la base
                  de datos.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* ACCESOS RAPIDOS */}
        <Col xs={12} lg={7}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-1" style={{ color: "#18344F" }}>
                Accesos rápidos
              </h5>

              <p className="text-secondary small mb-4">
                Accedé directamente a las herramientas de gestión.
              </p>

              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <div
                    className="h-100 p-3 rounded-4 border"
                    style={{ backgroundColor: "#F8FBFD" }}
                  >
                    <div className="fs-3 mb-2">▤</div>
                    <h6 className="fw-bold" style={{ color: "#18344F" }}>
                      Solicitudes
                    </h6>
                    <p className="small text-secondary">
                      Revisá y administrá las preinscripciones.
                    </p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate("/escuela/solicitudes")}
                    >
                      Gestionar solicitudes →
                    </Button>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div
                    className="h-100 p-3 rounded-4 border"
                    style={{ backgroundColor: "#F8FBFD" }}
                  >
                    <div className="fs-3 mb-2">⌂</div>
                    <h6 className="fw-bold" style={{ color: "#18344F" }}>
                      Vacantes
                    </h6>
                    <p className="small text-secondary">
                      Consultá y actualizá los cupos disponibles.
                    </p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate("/escuela/vacantes")}
                    >
                      Administrar vacantes →
                    </Button>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div
                    className="h-100 p-3 rounded-4 border"
                    style={{ backgroundColor: "#F8FBFD" }}
                  >
                    <div className="fs-3 mb-2">▥</div>
                    <h6 className="fw-bold" style={{ color: "#18344F" }}>
                      Reportes
                    </h6>
                    <p className="small text-secondary">
                      Visualizá estadísticas de tu institución.
                    </p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate("/escuela/reportes")}
                    >
                      Consultar reportes →
                    </Button>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div
                    className="h-100 p-3 rounded-4 border"
                    style={{ backgroundColor: "#F8FBFD" }}
                  >
                    <div className="fs-3 mb-2">⚙</div>
                    <h6 className="fw-bold" style={{ color: "#18344F" }}>
                      Configuración
                    </h6>
                    <p className="small text-secondary">
                      Consultá los datos de tu institución.
                    </p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate("/escuela/configuracion")}
                    >
                      Ver configuración →
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SOLICITUDES RECIENTES */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: "#18344F" }}>
                Solicitudes recientes
              </h5>
              <p className="text-secondary small mb-0">
                Últimas preinscripciones recibidas por la institución.
              </p>
            </div>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate("/escuela/solicitudes")}
            >
              Ver todas →
            </Button>
          </div>

          <div className="table-responsive">
            <Table hover responsive="sm" className="align-middle mb-0">
              <thead>
                <tr className="text-secondary small">
                  <th className="py-3">ALUMNO/A</th>
                  <th className="py-3">GRADO</th>
                  <th className="py-3">FECHA</th>
                  <th className="py-3">ESTADO</th>
                  <th className="py-3 text-end">ACCIÓN</th>
                </tr>
              </thead>

              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td className="py-3 fw-semibold" style={{ color: "#18344F" }}>
                      {solicitud.alumno}
                    </td>
                    <td className="py-3 text-secondary">
                      {solicitud.grado}
                    </td>
                    <td className="py-3 text-secondary">
                      {solicitud.fecha}
                    </td>
                    <td className="py-3">
                      {obtenerEstado(solicitud.estado)}
                    </td>
                    <td className="py-3 text-end">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none"
                        onClick={() =>
                          navigate(`/escuela/solicitudes/${solicitud.id}`)
                        }
                      >
                        Revisar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default PanelEscuela;
