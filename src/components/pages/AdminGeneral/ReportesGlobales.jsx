import { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  Table,
  ProgressBar,
} from "react-bootstrap";
import {
  Building,
  People,
  ClipboardCheck,
  CheckCircle,
  Calendar3,
  Download,
  BarChartLine,
  PieChart,
  InfoCircle,
  FileEarmarkBarGraph,
} from "react-bootstrap-icons";
import { obtenerEscuelas } from "../../../data/escuelasService";
import { obtenerUsuarios } from "../../../data/usuariosService";

// Datos de demostración: todavía no existe una fuente compartida de solicitudes.
// "diasAtras" evita que las fechas queden vencidas con el paso del tiempo.
const SOLICITUDES_DEMO = [
  { id: 1, alumno: "Lucía Fernández", escuelaId: 1, nivel: "Primario", estado: "PENDIENTE", diasAtras: 2 },
  { id: 2, alumno: "Mateo González", escuelaId: 1, nivel: "Secundario", estado: "EN_REVISION", diasAtras: 3 },
  { id: 3, alumno: "Valentina López", escuelaId: 2, nivel: "Primario", estado: "APROBADA", diasAtras: 5 },
  { id: 4, alumno: "Tomás Herrera", escuelaId: 2, nivel: "Secundario", estado: "PENDIENTE", diasAtras: 6 },
  { id: 5, alumno: "Camila Rodríguez", escuelaId: 3, nivel: "Primario", estado: "RECHAZADA", diasAtras: 9 },
  { id: 6, alumno: "Santiago Morales", escuelaId: 4, nivel: "Secundario", estado: "APROBADA", diasAtras: 12 },
  { id: 7, alumno: "Martina Díaz", escuelaId: 5, nivel: "Inicial", estado: "EN_REVISION", diasAtras: 14 },
  { id: 8, alumno: "Joaquín Pérez", escuelaId: 1, nivel: "Primario", estado: "APROBADA", diasAtras: 18 },
  { id: 9, alumno: "Sofía Ramírez", escuelaId: 5, nivel: "Inicial", estado: "PENDIENTE", diasAtras: 21 },
  { id: 10, alumno: "Benjamín Torres", escuelaId: 6, nivel: "Primario", estado: "APROBADA", diasAtras: 25 },
  { id: 11, alumno: "Emma Castillo", escuelaId: 4, nivel: "Secundario", estado: "EN_REVISION", diasAtras: 33 },
  { id: 12, alumno: "Thiago Romero", escuelaId: 2, nivel: "Primario", estado: "APROBADA", diasAtras: 41 },
  { id: 13, alumno: "Olivia Benítez", escuelaId: 5, nivel: "Inicial", estado: "APROBADA", diasAtras: 48 },
  { id: 14, alumno: "Lautaro Acosta", escuelaId: 6, nivel: "Secundario", estado: "RECHAZADA", diasAtras: 57 },
  { id: 15, alumno: "Renata Silva", escuelaId: 1, nivel: "Secundario", estado: "APROBADA", diasAtras: 66 },
  { id: 16, alumno: "Bautista Luna", escuelaId: 3, nivel: "Primario", estado: "APROBADA", diasAtras: 74 },
  { id: 17, alumno: "Julieta Ortiz", escuelaId: 4, nivel: "Secundario", estado: "PENDIENTE", diasAtras: 83 },
  { id: 18, alumno: "Dante Ríos", escuelaId: 2, nivel: "Primario", estado: "EN_REVISION", diasAtras: 95 },
];

const NIVELES = ["Inicial", "Primario", "Secundario"];

const ROLES = {
  FAMILIA: "Familia",
  ADMIN_ESCUELA: "Admin de escuela",
  ADMIN_GENERAL: "Admin general",
};

const ESTADOS = {
  PENDIENTE: { texto: "Pendientes", color: "warning" },
  EN_REVISION: { texto: "En revisión", color: "info" },
  APROBADA: { texto: "Aprobadas", color: "success" },
  RECHAZADA: { texto: "Rechazadas", color: "danger" },
};

const porcentaje = (cantidad, total) =>
  total > 0 ? Math.round((cantidad / total) * 100) : 0;

const formatearFecha = (diasAtras) => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - diasAtras);
  return fecha.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Descarga un archivo CSV compatible con Excel
const descargarCsv = (nombreArchivo, encabezado, filas) => {
  const contenido = [encabezado, ...filas]
    .map((fila) =>
      fila
        .map((valor) => `"${String(valor).replaceAll('"', '""')}"`)
        .join(";"),
    )
    .join("\n");

  const archivo = new Blob(["\uFEFF" + contenido], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(archivo);
  const enlace = document.createElement("a");

  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  URL.revokeObjectURL(url);
};

const DatosReales = () => (
  <Badge bg="success-subtle" text="success-emphasis" className="rounded-pill px-3 py-2">
    Datos reales
  </Badge>
);

const DatosDemo = () => (
  <Badge bg="warning-subtle" text="warning-emphasis" className="rounded-pill px-3 py-2">
    Demostración
  </Badge>
);

const ReportesGlobales = () => {
  const [escuelas] = useState(() => obtenerEscuelas());
  const [usuarios] = useState(() => obtenerUsuarios());
  const [periodo, setPeriodo] = useState("TODOS");

  const escuelasActivas = escuelas.filter((e) => e.activa !== false);
  const usuariosActivos = usuarios.filter((u) => u.activo !== false);

  const nombreEscuela = (id) =>
    escuelas.find((e) => e.id === id)?.nombre ?? "Escuela no encontrada";

  // Escuelas (datos reales)
  const porLocalidad = Object.entries(
    escuelasActivas.reduce(
      (acc, e) => ({ ...acc, [e.localidad]: (acc[e.localidad] ?? 0) + 1 }),
      {},
    ),
  ).sort((a, b) => b[1] - a[1]);

  const porNivel = NIVELES.map((nivel) => ({
    nivel,
    cantidad: escuelasActivas.filter((e) => e.niveles.includes(nivel)).length,
  }));

  const publicas = escuelasActivas.filter((e) => e.gestion === "Pública").length;
  const privadas = escuelasActivas.filter((e) => e.gestion === "Privada").length;

  // Usuarios (datos reales)
  const usuariosPorRol = Object.entries(ROLES).map(([rol, etiqueta]) => ({
    etiqueta,
    activos: usuarios.filter((u) => u.rol === rol && u.activo !== false).length,
    deBaja: usuarios.filter((u) => u.rol === rol && u.activo === false).length,
  }));

  // Solicitudes (demostración), filtradas por período
  const solicitudes = useMemo(
    () =>
      SOLICITUDES_DEMO.filter(
        (s) => periodo === "TODOS" || s.diasAtras <= Number(periodo),
      ),
    [periodo],
  );

  const totalSolicitudes = solicitudes.length;
  const contarEstado = (estado) =>
    solicitudes.filter((s) => s.estado === estado).length;
  const aprobadas = contarEstado("APROBADA");

  const solicitudesPorEscuela = Object.values(
    solicitudes.reduce((acc, s) => {
      const fila = acc[s.escuelaId] ?? {
        escuelaId: s.escuelaId,
        total: 0,
        enProceso: 0,
        aprobadas: 0,
        rechazadas: 0,
      };

      fila.total += 1;
      if (s.estado === "APROBADA") fila.aprobadas += 1;
      else if (s.estado === "RECHAZADA") fila.rechazadas += 1;
      else fila.enProceso += 1;

      acc[s.escuelaId] = fila;
      return acc;
    }, {}),
  ).sort((a, b) => b.total - a.total);

  const descargarEscuelas = () => {
    const filas = escuelas.map((e) => [
      e.id,
      e.nombre,
      e.localidad,
      e.gestion,
      e.niveles.join(" / "),
      e.abierta ? "Abierta" : "Cerrada",
      e.activa !== false ? "Activa" : "De baja",
      usuarios
        .filter((u) => u.rol === "ADMIN_ESCUELA" && u.escuelaId === e.id)
        .map((u) => u.nombre)
        .join(" / ") || "Sin asignar",
    ]);

    descargarCsv(
      "reporte-escuelas.csv",
      ["ID", "Escuela", "Localidad", "Gestión", "Niveles", "Preinscripción", "Estado", "Administradores"],
      filas,
    );
  };

  const descargarSolicitudes = () => {
    const filas = solicitudes.map((s) => [
      s.id,
      s.alumno,
      nombreEscuela(s.escuelaId),
      s.nivel,
      ESTADOS[s.estado].texto,
      formatearFecha(s.diasAtras),
    ]);

    descargarCsv(
      "reporte-solicitudes.csv",
      ["ID", "Alumno", "Escuela", "Nivel", "Estado", "Fecha"],
      filas,
    );
  };

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
      titulo: "Usuarios activos",
      valor: usuariosActivos.length,
      detalle: "Cuentas con acceso habilitado",
      icono: <People size={24} />,
      fondo: "bg-info-subtle",
      color: "text-info-emphasis",
    },
    {
      titulo: "Solicitudes del período",
      valor: totalSolicitudes,
      detalle: "Datos de demostración",
      icono: <ClipboardCheck size={24} />,
      fondo: "bg-warning-subtle",
      color: "text-warning-emphasis",
    },
    {
      titulo: "Tasa de aprobación",
      valor: `${porcentaje(aprobadas, totalSolicitudes)}%`,
      detalle: "Aprobadas sobre el total (demostración)",
      icono: <CheckCircle size={24} />,
      fondo: "bg-success-subtle",
      color: "text-success",
    },
  ];

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* ENCABEZADO */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
        <div>
          <div className="mb-2">
            <Badge bg="primary" className="rounded-pill px-3 py-2">
              <FileEarmarkBarGraph className="me-1" />
              ADMINISTRACIÓN GENERAL
            </Badge>
          </div>
          <h2 className="fw-bold text-dark mb-1">Reportes globales</h2>
          <p className="text-secondary mb-0">
            Consultá la situación de las escuelas, los usuarios y las
            preinscripciones de toda la plataforma.
          </p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <Badge bg="light" text="dark" className="border px-3 py-2">
            <Calendar3 className="me-2" />
            Ciclo lectivo 2027
          </Badge>

          <Button variant="outline-primary" onClick={descargarEscuelas}>
            <Download className="me-2" />
            Escuelas (CSV)
          </Button>

          <Button
            variant="outline-primary"
            onClick={descargarSolicitudes}
            disabled={totalSolicitudes === 0}
          >
            <Download className="me-2" />
            Solicitudes (CSV)
          </Button>
        </div>
      </div>

      {/* AVISO */}
      <div className="bg-info bg-opacity-10 rounded-3 p-3 mb-4 d-flex gap-2 align-items-start">
        <InfoCircle className="text-info mt-1 flex-shrink-0" />
        <div className="small">
          <strong>Datos mixtos.</strong> Las escuelas y los usuarios se
          calculan con los datos reales de la plataforma. Las solicitudes son
          de demostración y se reemplazarán cuando se conecte el backend.
        </div>
      </div>

      {/* FILTRO DE PERÍODO */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-3">
          <Row className="align-items-center g-3">
            <Col md={6}>
              <div className="d-flex align-items-center gap-2">
                <Calendar3 className="text-primary fs-5" />
                <div>
                  <div className="fw-semibold">Período de las solicitudes</div>
                  <small className="text-secondary">
                    Solo afecta a las solicitudes, no a escuelas ni usuarios.
                  </small>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <Form.Select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <option value="TODOS">Todos los registros</option>
                <option value="7">Últimos 7 días</option>
                <option value="30">Últimos 30 días</option>
                <option value="90">Últimos 90 días</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

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

      {/* ESCUELAS: LOCALIDAD, NIVEL Y GESTIÓN */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-2">
                  <Building className="text-primary fs-5" />
                  <div>
                    <h5 className="fw-bold mb-0">Escuelas por localidad</h5>
                    <small className="text-secondary">
                      Escuelas activas según su ubicación.
                    </small>
                  </div>
                </div>
                <DatosReales />
              </div>

              {porLocalidad.length === 0 ? (
                <p className="text-secondary small mb-0">
                  No hay escuelas activas.
                </p>
              ) : (
                porLocalidad.map(([localidad, cantidad]) => (
                  <div className="mb-4" key={localidad}>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-medium">{localidad}</span>
                      <span className="text-secondary">
                        {cantidad} ({porcentaje(cantidad, escuelasActivas.length)}%)
                      </span>
                    </div>
                    <ProgressBar
                      now={porcentaje(cantidad, escuelasActivas.length)}
                      variant="primary"
                      style={{ height: "10px" }}
                    />
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-2">
                  <BarChartLine className="text-primary fs-5" />
                  <div>
                    <h5 className="fw-bold mb-0">Escuelas por nivel y gestión</h5>
                    <small className="text-secondary">
                      Cuántas escuelas ofrecen cada nivel.
                    </small>
                  </div>
                </div>
                <DatosReales />
              </div>

              {porNivel.map((item) => (
                <div className="mb-4" key={item.nivel}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">{item.nivel}</span>
                    <span className="text-secondary">
                      {item.cantidad} ({porcentaje(item.cantidad, escuelasActivas.length)}%)
                    </span>
                  </div>
                  <ProgressBar
                    now={porcentaje(item.cantidad, escuelasActivas.length)}
                    variant="info"
                    style={{ height: "10px" }}
                  />
                </div>
              ))}

              <Row className="g-3 border-top pt-3">
                <Col xs={6}>
                  <div className="bg-light rounded-3 p-3">
                    <small className="text-secondary d-block">Públicas</small>
                    <h4 className="fw-bold mb-0">{publicas}</h4>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="bg-light rounded-3 p-3">
                    <small className="text-secondary d-block">Privadas</small>
                    <h4 className="fw-bold mb-0">{privadas}</h4>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* USUARIOS Y ESTADO DE SOLICITUDES */}
      <Row className="g-4 mb-4">
        <Col lg={5}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-2">
                  <People className="text-primary fs-5" />
                  <div>
                    <h5 className="fw-bold mb-0">Usuarios por rol</h5>
                    <small className="text-secondary">
                      Cuentas activas y dadas de baja.
                    </small>
                  </div>
                </div>
                <DatosReales />
              </div>

              <Table hover className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 text-secondary small">ROL</th>
                    <th className="py-3 text-secondary small text-end">ACTIVOS</th>
                    <th className="py-3 text-secondary small text-end">DE BAJA</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosPorRol.map((fila) => (
                    <tr key={fila.etiqueta}>
                      <td className="fw-semibold">{fila.etiqueta}</td>
                      <td className="text-end">{fila.activos}</td>
                      <td className="text-end text-secondary">{fila.deBaja}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="h-100 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-2">
                  <PieChart className="text-primary fs-5" />
                  <div>
                    <h5 className="fw-bold mb-0">Solicitudes por estado</h5>
                    <small className="text-secondary">
                      Distribución de las preinscripciones del período.
                    </small>
                  </div>
                </div>
                <DatosDemo />
              </div>

              {Object.entries(ESTADOS).map(([estado, { texto, color }]) => (
                <div className="mb-4" key={estado}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">{texto}</span>
                    <span className="text-secondary">
                      {contarEstado(estado)} ({porcentaje(contarEstado(estado), totalSolicitudes)}%)
                    </span>
                  </div>
                  <ProgressBar
                    now={porcentaje(contarEstado(estado), totalSolicitudes)}
                    variant={color}
                    style={{ height: "10px" }}
                  />
                </div>
              ))}

              <div className="border-top pt-3 d-flex justify-content-between">
                <span className="text-secondary">Total</span>
                <strong>{totalSolicitudes} solicitudes</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SOLICITUDES POR ESCUELA */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-4">
            <div>
              <h5 className="fw-bold mb-1">Solicitudes por escuela</h5>
              <p className="text-secondary small mb-0">
                Escuelas con solicitudes en el período seleccionado.
              </p>
            </div>
            <DatosDemo />
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 text-secondary small">ESCUELA</th>
                  <th className="py-3 text-secondary small text-end">RECIBIDAS</th>
                  <th className="py-3 text-secondary small text-end">EN PROCESO</th>
                  <th className="py-3 text-secondary small text-end">APROBADAS</th>
                  <th className="py-3 text-secondary small text-end">RECHAZADAS</th>
                </tr>
              </thead>

              <tbody>
                {solicitudesPorEscuela.map((fila) => (
                  <tr key={fila.escuelaId}>
                    <td className="fw-semibold">
                      {nombreEscuela(fila.escuelaId)}
                      {escuelas.find((e) => e.id === fila.escuelaId)?.activa ===
                        false && (
                        <Badge bg="secondary" className="ms-2 rounded-pill">
                          De baja
                        </Badge>
                      )}
                    </td>
                    <td className="text-end fw-semibold">{fila.total}</td>
                    <td className="text-end">{fila.enProceso}</td>
                    <td className="text-end">{fila.aprobadas}</td>
                    <td className="text-end">{fila.rechazadas}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {solicitudesPorEscuela.length === 0 && (
            <div className="text-center py-5">
              <FileEarmarkBarGraph className="text-secondary fs-3 mb-2" />
              <p className="fw-semibold mb-1">No hay registros para este período</p>
              <small className="text-secondary">
                Seleccioná otro rango de fechas para consultar.
              </small>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReportesGlobales;