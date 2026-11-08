
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
  FileEarmarkBarGraph,
  ClipboardCheck,
  ClockHistory,
  CheckCircle,
  XCircle,
  People,
  Mortarboard,
  Calendar3,
  Download,
  BarChartLine,
  PieChart,
  InfoCircle,
} from "react-bootstrap-icons";

// Datos de demostración.
// Más adelante se obtendrán desde la API.
const solicitudesDemo = [
  { id: 1, alumno: "Lucía Fernández", grado: "1° año", estado: "PENDIENTE", fecha: "05/11/2026" },
  { id: 2, alumno: "Mateo González", grado: "2° año", estado: "EN_REVISION", fecha: "05/11/2026" },
  { id: 3, alumno: "Valentina López", grado: "1° año", estado: "APROBADA", fecha: "04/11/2026" },
  { id: 4, alumno: "Tomás Herrera", grado: "3° año", estado: "PENDIENTE", fecha: "03/11/2026" },
  { id: 5, alumno: "Camila Rodríguez", grado: "2° año", estado: "RECHAZADA", fecha: "02/11/2026" },
  { id: 6, alumno: "Santiago Morales", grado: "1° año", estado: "APROBADA", fecha: "01/11/2026" },
  { id: 7, alumno: "Martina Díaz", grado: "3° año", estado: "EN_REVISION", fecha: "01/11/2026" },
  { id: 8, alumno: "Joaquín Pérez", grado: "4° año", estado: "APROBADA", fecha: "31/10/2026" },
  { id: 9, alumno: "Sofía Ramírez", grado: "5° año", estado: "PENDIENTE", fecha: "30/10/2026" },
  { id: 10, alumno: "Benjamín Torres", grado: "4° año", estado: "APROBADA", fecha: "29/10/2026" },
  { id: 11, alumno: "Emma Castillo", grado: "5° año", estado: "EN_REVISION", fecha: "28/10/2026" },
  { id: 12, alumno: "Thiago Romero", grado: "2° año", estado: "APROBADA", fecha: "27/10/2026" },
];

const grados = [
  "1° año",
  "2° año",
  "3° año",
  "4° año",
  "5° año",
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
    default:
      return "secondary";
  }
};

const obtenerTextoEstado = (estado) => estado.replaceAll("_", " ");

const ReportesEscuela = () => {
  const [periodo, setPeriodo] = useState("TODOS");

  // Filtrado de solicitudes por período.
  // Las fechas son de demostración.
  const solicitudesFiltradas = useMemo(() => {
    if (periodo === "TODOS") {
      return solicitudesDemo;
    }

    const dias = Number(periodo);

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias);

    return solicitudesDemo.filter((solicitud) => {
      const [dia, mes, anio] = solicitud.fecha.split("/");
      const fechaSolicitud = new Date(
        Number(anio),
        Number(mes) - 1,
        Number(dia)
      );

      return fechaSolicitud >= fechaLimite;
    });
  }, [periodo]);

  // Totales generales.
  const totalSolicitudes = solicitudesFiltradas.length;

  const contarEstado = (estado) =>
    solicitudesFiltradas.filter(
      (solicitud) => solicitud.estado === estado
    ).length;

  const pendientes = contarEstado("PENDIENTE");
  const enRevision = contarEstado("EN_REVISION");
  const aprobadas = contarEstado("APROBADA");
  const rechazadas = contarEstado("RECHAZADA");

  const porcentaje = (cantidad) =>
    totalSolicitudes > 0
      ? Math.round((cantidad / totalSolicitudes) * 100)
      : 0;

  // Distribución por grado.
  const distribucionGrados = grados.map((grado) => {
    const cantidad = solicitudesFiltradas.filter(
      (solicitud) => solicitud.grado === grado
    ).length;

    return {
      grado,
      cantidad,
      porcentaje: porcentaje(cantidad),
    };
  });

  const gradoConMasSolicitudes = [...distribucionGrados].sort(
    (a, b) => b.cantidad - a.cantidad
  )[0];

  // Descargar un reporte sencillo en formato CSV.
  const descargarReporte = () => {
    const encabezado = [
      "ID",
      "Alumno",
      "Grado",
      "Estado",
      "Fecha",
    ];

    const filas = solicitudesFiltradas.map((solicitud) => [
      solicitud.id,
      solicitud.alumno,
      solicitud.grado,
      solicitud.estado,
      solicitud.fecha,
    ]);

    const contenido = [
      encabezado,
      ...filas,
    ]
      .map((fila) =>
        fila
          .map((valor) => `"${String(valor).replaceAll('"', '""')}"`)
          .join(";")
      )
      .join("\n");

    const archivo = new Blob(
      ["\uFEFF" + contenido],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "reporte-preinscripciones-2027.csv";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    URL.revokeObjectURL(url);
  };

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Reportes y estadísticas</h2>
          <p className="text-secondary mb-0">
            Consultá el estado y la distribución de las preinscripciones.
          </p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <Badge bg="primary" className="px-3 py-2">
            <Calendar3 className="me-2" />
            Ciclo lectivo 2027
          </Badge>

          <Button
            variant="outline-primary"
            onClick={descargarReporte}
          >
            <Download className="me-2" />
            Descargar CSV
          </Button>
        </div>
      </div>

      {/* Aviso */}
      <div className="bg-info bg-opacity-10 rounded-3 p-3 mb-4 d-flex gap-2 align-items-start">
        <InfoCircle className="text-info mt-1 flex-shrink-0" />
        <div className="small">
          <strong>Datos de demostración.</strong> Las estadísticas se calculan
          utilizando solicitudes ficticias. Al conectar el backend se
          mostrarán los datos reales de la institución.
        </div>
      </div>

      {/* Filtro de período */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-3">
          <Row className="align-items-center g-3">
            <Col md={6}>
              <div className="d-flex align-items-center gap-2">
                <Calendar3 className="text-primary fs-5" />
                <div>
                  <div className="fw-semibold">Período de consulta</div>
                  <small className="text-secondary">
                    Seleccioná el rango de fechas del reporte.
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

      {/* Indicadores principales */}
      <Row className="g-3 mb-4">
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  Total de solicitudes
                </span>
                <span className="bg-primary bg-opacity-10 text-primary rounded-3 p-2">
                  <ClipboardCheck size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{totalSolicitudes}</h2>
              <small className="text-secondary">
                Preinscripciones registradas
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  En revisión
                </span>
                <span className="bg-info bg-opacity-10 text-info rounded-3 p-2">
                  <ClockHistory size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{enRevision}</h2>
              <small className="text-secondary">
                {porcentaje(enRevision)}% del total
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  Aprobadas
                </span>
                <span className="bg-success bg-opacity-10 text-success rounded-3 p-2">
                  <CheckCircle size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{aprobadas}</h2>
              <small className="text-secondary">
                {porcentaje(aprobadas)}% del total
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  Rechazadas
                </span>
                <span className="bg-danger bg-opacity-10 text-danger rounded-3 p-2">
                  <XCircle size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{rechazadas}</h2>
              <small className="text-secondary">
                {porcentaje(rechazadas)}% del total
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Distribución por estado */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <PieChart className="text-primary fs-5" />
                <div>
                  <h5 className="fw-bold mb-0">
                    Solicitudes por estado
                  </h5>
                  <small className="text-secondary">
                    Distribución de las preinscripciones.
                  </small>
                </div>
              </div>

              {[
                { nombre: "Pendientes", cantidad: pendientes, color: "warning" },
                { nombre: "En revisión", cantidad: enRevision, color: "info" },
                { nombre: "Aprobadas", cantidad: aprobadas, color: "success" },
                { nombre: "Rechazadas", cantidad: rechazadas, color: "danger" },
              ].map((item) => (
                <div className="mb-4" key={item.nombre}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">{item.nombre}</span>
                    <span className="text-secondary">
                      {item.cantidad} ({porcentaje(item.cantidad)}%)
                    </span>
                  </div>

                  <ProgressBar
                    now={porcentaje(item.cantidad)}
                    variant={item.color}
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

        {/* Distribución por grado */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-2 mb-4">
                <BarChartLine className="text-primary fs-5" />
                <div>
                  <h5 className="fw-bold mb-0">
                    Solicitudes por grado
                  </h5>
                  <small className="text-secondary">
                    Cantidad de aspirantes por año.
                  </small>
                </div>
              </div>

              {distribucionGrados.map((item) => (
                <div className="mb-4" key={item.grado}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">{item.grado}</span>
                    <span className="text-secondary">
                      {item.cantidad} solicitudes
                    </span>
                  </div>

                  <ProgressBar
                    now={item.porcentaje}
                    variant="primary"
                    style={{ height: "10px" }}
                  />
                </div>
              ))}

              <div className="border-top pt-3">
                <small className="text-secondary">
                  Grado con más solicitudes:{" "}
                </small>
                <strong>
                  {totalSolicitudes > 0
                    ? gradoConMasSolicitudes.grado
                    : "Sin registros"}
                </strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Resumen general */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                  <People size={26} />
                </div>
                <div>
                  <h6 className="text-secondary mb-1">
                    Solicitudes pendientes
                  </h6>
                  <h4 className="fw-bold mb-0">{pendientes}</h4>
                </div>
              </div>
              <p className="text-secondary small mt-3 mb-0">
                Preinscripciones que todavía no comenzaron su proceso de revisión.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                  <Mortarboard size={26} />
                </div>
                <div>
                  <h6 className="text-secondary mb-1">
                    Solicitudes aprobadas
                  </h6>
                  <h4 className="fw-bold mb-0">{aprobadas}</h4>
                </div>
              </div>
              <p className="text-secondary small mt-3 mb-0">
                Preinscripciones que finalizaron satisfactoriamente su revisión.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabla de registros */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-4">
            <div>
              <h5 className="fw-bold mb-1">Detalle de preinscripciones</h5>
              <p className="text-secondary small mb-0">
                Registros incluidos en el reporte actual.
              </p>
            </div>

            <Badge bg="light" text="dark" className="align-self-start px-3 py-2">
              {totalSolicitudes} registros
            </Badge>
          </div>

          <div className="table-responsive">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3">Alumno</th>
                  <th className="py-3">Grado</th>
                  <th className="py-3">Fecha</th>
                  <th className="py-3">Estado</th>
                </tr>
              </thead>

              <tbody>
                {solicitudesFiltradas.length > 0 ? (
                  solicitudesFiltradas.map((solicitud) => (
                    <tr key={solicitud.id}>
                      <td className="fw-semibold">{solicitud.alumno}</td>
                      <td>{solicitud.grado}</td>
                      <td>{solicitud.fecha}</td>
                      <td>
                        <Badge bg={obtenerColorEstado(solicitud.estado)}>
                          {obtenerTextoEstado(solicitud.estado)}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <FileEarmarkBarGraph className="text-secondary fs-3 mb-2" />
                      <p className="fw-semibold mb-1">
                        No hay registros para este período
                      </p>
                      <small className="text-secondary">
                        Seleccioná otro rango de fechas para consultar.
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReportesEscuela;
