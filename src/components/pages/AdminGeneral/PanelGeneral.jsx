import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button, ProgressBar, Alert } from "react-bootstrap";
import { Building, People, CheckCircle, ClipboardCheck, BarChartLine, ArrowRight, ExclamationTriangle, InfoCircle } from "react-bootstrap-icons";
import { obtenerEscuelas } from "../../../data/escuelasService";
import { obtenerUsuarios } from "../../../data/usuariosService";

// Datos de demostración: todavía no existe una fuente compartida de solicitudes.
const DEMANDA_DEMO = { Inicial: 34, Primario: 86, Secundario: 58 };
const NIVELES = Object.keys(DEMANDA_DEMO);

const accesos = [
  {
    titulo: "Escuelas",
    descripcion: "Registrá, editá y asigná administradores a las escuelas.",
    icono: <Building size={25} />,
    color: "text-primary",
    fondo: "bg-primary-subtle",
    ruta: "/admin/escuelas",
    accion: "Gestionar escuelas",
  },
  {
    titulo: "Usuarios",
    descripcion: "Administrá las cuentas, sus roles y su acceso.",
    icono: <People size={25} />,
    color: "text-info-emphasis",
    fondo: "bg-info-subtle",
    ruta: "/admin/usuarios",
    accion: "Gestionar usuarios",
  },
  {
    titulo: "Reportes",
    descripcion: "Consultá estadísticas globales de la plataforma.",
    icono: <BarChartLine size={25} />,
    color: "text-success",
    fondo: "bg-success-subtle",
    ruta: "/admin/reportes",
    accion: "Consultar reportes",
  },
];

const PanelGeneral = () => {
  const navigate = useNavigate();

  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null",
  );

  const [escuelas] = useState(() => obtenerEscuelas());
  const [usuarios] = useState(() => obtenerUsuarios());

  const escuelasActivas = escuelas.filter((e) => e.activa !== false);
  const escuelasAbiertas = escuelasActivas.filter((e) => e.abierta).length;
  const familias = usuarios.filter(
    (u) => u.rol === "FAMILIA" && u.activo !== false,
  ).length;
  const totalSolicitudes = Object.values(DEMANDA_DEMO).reduce(
    (suma, cantidad) => suma + cantidad,
    0,
  );

  const sinAdministrador = escuelasActivas.filter(
    (escuela) =>
      !usuarios.some(
        (u) =>
          u.rol === "ADMIN_ESCUELA" &&
          u.escuelaId === escuela.id &&
          u.activo !== false,
      ),
  );

  const demanda = NIVELES.map((nivel) => ({
    nivel,
    solicitudes: DEMANDA_DEMO[nivel],
    porcentaje: Math.round((DEMANDA_DEMO[nivel] / totalSolicitudes) * 100),
    escuelas: escuelasActivas.filter((e) => e.niveles.includes(nivel)).length,
  }));

  const nivelMasDemandado = [...demanda].sort(
    (a, b) => b.solicitudes - a.solicitudes,
  )[0];

  const indicadores = [
    {
      titulo: "Escuelas activas",
      valor: escuelasActivas.length,
      detalle: "Registradas en la plataforma",
      icono: <Building size={24} />,
      fondo: "bg-primary-subtle",
      color: "text-primary",
    },
    {
      titulo: "Preinscripción abierta",
      valor: escuelasAbiertas,
      detalle: "Escuelas que reciben solicitudes",
      icono: <CheckCircle size={24} />,
      fondo: "bg-success-subtle",
      color: "text-success",
    },
    {
      titulo: "Familias registradas",
      valor: familias,
      detalle: "Cuentas de familia activas",
      icono: <People size={24} />,
      fondo: "bg-info-subtle",
      color: "text-info-emphasis",
    },
    {
      titulo: "Solicitudes recibidas",
      valor: totalSolicitudes,
      detalle: "Datos de demostración",
      icono: <ClipboardCheck size={24} />,
      fondo: "bg-warning-subtle",
      color: "text-warning-emphasis",
    },
  ];

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* ENCABEZADO */}
      <div className="mb-4">
        <div className="mb-2">
          <Badge bg="primary" className="rounded-pill px-3 py-2">
            <Building className="me-1" />
            ADMINISTRACIÓN GENERAL
          </Badge>
        </div>
        <h2 className="fw-bold text-dark mb-1">Panel general</h2>
        <p className="text-secondary mb-0">
          Hola, {usuarioActivo?.nombre || "Administrador"}. Este es el resumen
          de toda la plataforma.
        </p>
      </div>

      {/* AVISO DE ESCUELAS SIN ADMINISTRADOR */}
      {sinAdministrador.length > 0 && (
        <Alert
          variant="warning"
          className="d-flex flex-wrap align-items-center justify-content-between gap-2 border-0 shadow-sm rounded-4 mb-4"
        >
          <span className="d-flex align-items-center gap-2">
            <ExclamationTriangle />
            {sinAdministrador.length === 1
              ? "1 escuela activa no tiene administrador asignado."
              : `${sinAdministrador.length} escuelas activas no tienen administrador asignado.`}
          </span>
          <Button
            variant="outline-dark"
            size="sm"
            className="rounded-3 fw-semibold"
            onClick={() => navigate("/admin/escuelas")}
          >
            Asignar administradores
          </Button>
        </Alert>
      )}

      {/* INDICADORES */}
      <Row className="g-3 mb-4">
        {indicadores.map((item) => (
          <Col xs={12} sm={6} xl={3} key={item.titulo}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="text-secondary fw-medium small">
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

      <Row className="g-4 mb-4">
        {/* DEMANDA POR NIVEL */}
        <Col xs={12} lg={7}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h5 className="fw-bold text-dark mb-1">Demanda por nivel</h5>
                  <p className="text-secondary small mb-0">
                    Solicitudes recibidas frente a las escuelas que ofrecen cada
                    nivel.
                  </p>
                </div>
                <div className="bg-primary-subtle text-primary rounded-3 p-2">
                  <BarChartLine size={22} />
                </div>
              </div>

              {demanda.map((item) => (
                <div className="mb-4" key={item.nivel}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-semibold text-secondary">
                      {item.nivel}
                    </span>
                    <span className="fw-bold text-dark">
                      {item.solicitudes}
                      <small className="text-secondary fw-normal ms-1">
                        solicitudes ({item.porcentaje}%)
                      </small>
                    </span>
                  </div>

                  <ProgressBar
                    now={item.porcentaje}
                    variant="primary"
                    style={{ height: "10px" }}
                    className="rounded-pill"
                  />

                  <small className="text-secondary">
                    {item.escuelas === 1
                      ? "1 escuela lo ofrece"
                      : `${item.escuelas} escuelas lo ofrecen`}
                  </small>
                </div>
              ))}

              <div className="border-top pt-3">
                <small className="text-secondary">Nivel con más demanda: </small>
                <strong>{nivelMasDemandado.nivel}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* ACCESOS RÁPIDOS */}
        <Col xs={12} lg={5}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">Accesos rápidos</h5>
                <p className="text-secondary small mb-0">
                  Herramientas principales de administración.
                </p>
              </div>

              <div className="d-flex flex-column gap-3">
                {accesos.map((acceso) => (
                  <div
                    key={acceso.titulo}
                    className="d-flex align-items-center gap-3 border rounded-4 p-3"
                  >
                    <div
                      className={`${acceso.fondo} ${acceso.color} rounded-3 p-3 flex-shrink-0`}
                    >
                      {acceso.icono}
                    </div>

                    <div className="flex-grow-1">
                      <h6 className="fw-bold text-dark mb-1">{acceso.titulo}</h6>
                      <p className="text-secondary small mb-2">
                        {acceso.descripcion}
                      </p>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="rounded-3 fw-semibold"
                        onClick={() => navigate(acceso.ruta)}
                      >
                        {acceso.accion}
                        <ArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* AVISO DE DEMOSTRACIÓN */}
      <div className="bg-info bg-opacity-10 rounded-3 p-3 mb-4 d-flex gap-2 align-items-start">
        <InfoCircle className="text-info mt-1 flex-shrink-0" />
        <div className="small">
          <strong>Solicitudes de demostración.</strong> Las escuelas, las
          familias y los administradores se calculan con datos reales de la
          plataforma. Las solicitudes y la demanda por nivel usan valores de
          ejemplo hasta que se conecte el backend.
        </div>
      </div>
    </Container>
  );
};

export default PanelGeneral;