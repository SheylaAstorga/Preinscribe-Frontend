

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

import {
  ClipboardCheck,
  ClockHistory,
  CheckCircle,
  Building,
  People,
  FileEarmarkText,
  BarChartLine,
  Gear,
  ArrowRight,
  ArrowUpRight,
  Calendar3,
  Bell,
  Eye,
  Mortarboard,
} from "react-bootstrap-icons";

const PanelEscuela = () => {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null"
  );

  // Datos de demostración. Luego se reemplazarán por datos de la API.
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
      icono: <ClipboardCheck size={24} />,
      fondo: "bg-primary-subtle",
      color: "text-primary",
      variacion: "Registro general",
    },
    {
      titulo: "Pendientes",
      valor: "24",
      detalle: "Requieren revisión",
      icono: <ClockHistory size={24} />,
      fondo: "bg-warning-subtle",
      color: "text-warning-emphasis",
      variacion: "Necesitan atención",
    },
    {
      titulo: "Aprobadas",
      valor: "76",
      detalle: "Preinscripciones aceptadas",
      icono: <CheckCircle size={24} />,
      fondo: "bg-success-subtle",
      color: "text-success",
      variacion: "Solicitudes aceptadas",
    },
    {
      titulo: "Vacantes disponibles",
      valor: "32",
      detalle: "Cupos sin ocupar",
      icono: <Building size={24} />,
      fondo: "bg-info-subtle",
      color: "text-info-emphasis",
      variacion: "Disponibilidad actual",
    },
  ];

  const estados = [
    {
      nombre: "Pendientes",
      cantidad: 24,
      porcentaje: 19,
      color: "warning",
    },
    {
      nombre: "En revisión",
      cantidad: 18,
      porcentaje: 14,
      color: "info",
    },
    {
      nombre: "Aprobadas",
      cantidad: 76,
      porcentaje: 59,
      color: "success",
    },
    {
      nombre: "Rechazadas",
      cantidad: 10,
      porcentaje: 8,
      color: "danger",
    },
  ];

  const accesos = [
    {
      titulo: "Solicitudes",
      descripcion: "Revisá y administrá las preinscripciones recibidas.",
      icono: <ClipboardCheck size={25} />,
      color: "text-primary",
      fondo: "bg-primary-subtle",
      ruta: "/escuela/solicitudes",
      accion: "Gestionar solicitudes",
    },
    {
      titulo: "Vacantes",
      descripcion: "Consultá y actualizá los cupos de tu institución.",
      icono: <Building size={25} />,
      color: "text-info-emphasis",
      fondo: "bg-info-subtle",
      ruta: "/escuela/vacantes",
      accion: "Administrar vacantes",
    },
    {
      titulo: "Reportes",
      descripcion: "Visualizá estadísticas y datos de inscripción.",
      icono: <BarChartLine size={25} />,
      color: "text-success",
      fondo: "bg-success-subtle",
      ruta: "/escuela/reportes",
      accion: "Consultar reportes",
    },
    {
      titulo: "Configuración",
      descripcion: "Consultá la información de tu institución.",
      icono: <Gear size={25} />,
      color: "text-secondary",
      fondo: "bg-secondary-subtle",
      ruta: "/escuela/configuracion",
      accion: "Ver configuración",
    },
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
      <Badge
        bg={variantes[estado] || "secondary"}
        className="rounded-pill px-3 py-2 fw-semibold"
      >
        {etiquetas[estado] || estado}
      </Badge>
    );
  };

  return (
    <Container fluid className="px-3 px-lg-4 py-4">

      {/* ENCABEZADO PRINCIPAL */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge bg="primary" className="rounded-pill px-3 py-2">
              <Mortarboard className="me-1" />
              ADMINISTRACIÓN ESCOLAR
            </Badge>
          </div>

          <h2 className="fw-bold text-dark mb-1">
            Panel principal
          </h2>

          <p className="text-secondary mb-0">
            Hola, {usuario?.nombre || "Administrador"}.
            Gestioná las preinscripciones de tu institución desde aquí.
          </p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <div className="bg-white border rounded-3 px-3 py-2 shadow-sm">
            <small className="text-secondary d-block">
              <Calendar3 className="me-1" />
              Ciclo lectivo
            </small>
            <span className="fw-bold text-dark">2027</span>
          </div>

          <Button
            variant="primary"
            className="rounded-3 px-3 py-2 fw-semibold shadow-sm"
            onClick={() => navigate("/escuela/solicitudes")}
          >
            <ClipboardCheck className="me-2" />
            Ver solicitudes
          </Button>
        </div>
      </div>

      {/* TARJETAS DE INDICADORES */}
      <Row className="g-3 mb-4">
        {indicadores.map((item, index) => (
          <Col xs={12} sm={6} xl={3} key={index}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="text-secondary fw-medium small">
                    {item.titulo}
                  </span>

                  <div
                    className={`${item.fondo} ${item.color} rounded-3 p-3`}
                  >
                    {item.icono}
                  </div>
                </div>

                <h2 className="fw-bold text-dark mb-1">
                  {item.valor}
                </h2>

                <p className="text-secondary small mb-3">
                  {item.detalle}
                </p>

                <div className="border-top pt-3">
                  <small className="text-secondary">
                    {item.variacion}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* DISTRIBUCIÓN Y ACCESOS */}
      <Row className="g-4 mb-4">

        {/* ESTADO DE SOLICITUDES */}
        <Col xs={12} lg={5}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">

              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h5 className="fw-bold text-dark mb-1">
                    Estado de solicitudes
                  </h5>
                  <p className="text-secondary small mb-0">
                    Resumen general de preinscripciones.
                  </p>
                </div>

                <div className="bg-primary-subtle text-primary rounded-3 p-2">
                  <BarChartLine size={22} />
                </div>
              </div>

              <div className="bg-light rounded-4 p-3 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-secondary">
                      Total de solicitudes
                    </small>
                    <h3 className="fw-bold text-dark mb-0">128</h3>
                  </div>

                  <div className="bg-white rounded-circle p-3 shadow-sm">
                    <People size={26} className="text-primary" />
                  </div>
                </div>
              </div>

              {estados.map((estado) => (
                <div className="mb-4" key={estado.nombre}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-semibold text-secondary">
                      {estado.nombre}
                    </span>

                    <span className="fw-bold text-dark">
                      {estado.cantidad}
                      <small className="text-secondary fw-normal ms-1">
                        ({estado.porcentaje}%)
                      </small>
                    </span>
                  </div>

                  <ProgressBar
                    now={estado.porcentaje}
                    variant={estado.color}
                    style={{ height: "9px" }}
                    className="rounded-pill"
                  />
                </div>
              ))}

              <div className="border-top pt-3 mt-2">
                <div className="d-flex align-items-start gap-2">
                  <Bell className="text-primary mt-1" size={18} />
                  <small className="text-secondary">
                    Los datos son de demostración. Se actualizarán
                    automáticamente cuando conectemos el sistema con la API.
                  </small>
                </div>
              </div>

            </Card.Body>
          </Card>
        </Col>

        {/* ACCESOS RÁPIDOS */}
        <Col xs={12} lg={7}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">

              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">
                  Accesos rápidos
                </h5>
                <p className="text-secondary small mb-0">
                  Herramientas principales de administración.
                </p>
              </div>

              <Row className="g-3">
                {accesos.map((acceso) => (
                  <Col xs={12} sm={6} key={acceso.titulo}>
                    <Card
                      className="h-100 border rounded-4 shadow-none"
                    >
                      <Card.Body className="p-3 d-flex flex-column">

                        <div
                          className={`${acceso.fondo} ${acceso.color} rounded-3 p-3 mb-3 align-self-start`}
                        >
                          {acceso.icono}
                        </div>

                        <h6 className="fw-bold text-dark mb-2">
                          {acceso.titulo}
                        </h6>

                        <p className="text-secondary small mb-3 flex-grow-1">
                          {acceso.descripcion}
                        </p>

                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="rounded-3 fw-semibold text-start"
                          onClick={() => navigate(acceso.ruta)}
                        >
                          {acceso.accion}
                          <ArrowRight className="ms-2" />
                        </Button>

                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SOLICITUDES RECIENTES */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h5 className="fw-bold text-dark mb-1">
                Solicitudes recientes
              </h5>
              <p className="text-secondary small mb-0">
                Últimas preinscripciones recibidas por la institución.
              </p>
            </div>

            <Button
              variant="light"
              className="border rounded-3 fw-semibold"
              onClick={() => navigate("/escuela/solicitudes")}
            >
              Ver todas
              <ArrowUpRight className="ms-2" />
            </Button>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 text-secondary small">
                    ALUMNO/A
                  </th>
                  <th className="py-3 text-secondary small">
                    GRADO
                  </th>
                  <th className="py-3 text-secondary small">
                    FECHA
                  </th>
                  <th className="py-3 text-secondary small">
                    ESTADO
                  </th>
                  <th className="py-3 text-secondary small text-end">
                    ACCIÓN
                  </th>
                </tr>
              </thead>

              <tbody>
                {solicitudes.map((solicitud) => (
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
                        variant="light"
                        size="sm"
                        className="rounded-3 border"
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

          {solicitudes.length === 0 && (
            <div className="text-center py-5">
              <FileEarmarkText
                size={40}
                className="text-secondary mb-3"
              />
              <h6 className="fw-bold text-dark">
                No hay solicitudes registradas
              </h6>
              <p className="text-secondary small mb-0">
                Cuando recibas nuevas preinscripciones aparecerán aquí.
              </p>
            </div>
          )}

        </Card.Body>
      </Card>

      {/* PIE INFORMATIVO */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3">
        <small className="text-secondary">
          <Mortarboard className="me-1" />
          PreInscribe · Administración escolar
        </small>

        <small className="text-secondary">
          Ciclo lectivo 2027
        </small>
      </div>

    </Container>
  );
};

export default PanelEscuela;
