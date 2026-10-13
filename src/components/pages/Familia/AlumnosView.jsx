import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";
import { AlumnoModal } from "./AlumnoModal";

const AlumnosView = () => {
  const [listaAlumnos, setListaAlumnos] = useState([
    {
      id: 1,
      nombre: "Lucas",
      apellido: "Gómez",
      dni: "48.123.456",
      edad: 11,
      nivel: "Primario",
      gradoAno: "6° Grado",
    },
    {
      id: 2,
      nombre: "Sofía",
      apellido: "Gómez",
      dni: "50.987.654",
      edad: 8,
      nivel: "Primario",
      gradoAno: "3° Grado",
    },
    {
      id: 3,
      nombre: "Mateo",
      apellido: "Gómez",
      dni: "52.345.678",
      edad: 5,
      nivel: "Inicial",
      gradoAno: "Sala de 5",
    },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [alumnoAEditar, setAlumnoAEditar] = useState(null);
  const [mostrarModalDetalles, setMostrarModalDetalles] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const abrirModalParaCrear = () => {
    setAlumnoAEditar(null);
    setMostrarModal(true);
  };

  const abrirModalParaEditar = (alumno) => {
    setAlumnoAEditar(alumno);
    setMostrarModal(true);
  };

  const abrirModalDetalles = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setMostrarModalDetalles(true);
  };

  const ocultarModal = () => {
    setMostrarModal(false);
    setAlumnoAEditar(null);
  };

  const guardarAlumno = (alumnoFormulario) => {
    if (alumnoAEditar) {
      const alumnosActualizados = listaAlumnos.map((alumnoActual) => {
        if (alumnoActual.id === alumnoFormulario.id) {
          return alumnoFormulario;
        } else {
          return alumnoActual;
        }
      });
      setListaAlumnos(alumnosActualizados);
    } else {
      setListaAlumnos([
        ...listaAlumnos,
        { ...alumnoFormulario, id: Date.now() },
      ]);
    }
  };

  const eliminarAlumno = (idAlumno) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este alumno?",
    );
    if (confirmacion) {
      const alumnosFiltrados = listaAlumnos.filter(
        (alumnoActual) => alumnoActual.id !== idAlumno,
      );
      setListaAlumnos(alumnosFiltrados);
    }
  };

  const getBadgeEstilo = (nivel) => {
    switch (nivel) {
      case "Inicial":
        return { bg: "#E6F4EA", color: "#137333", border: "1px solid #CEEAD6" };
      case "Primario":
        return { bg: "#E8F0FE", color: "#1A73E8", border: "1px solid #D2E3FC" };
      case "Secundario":
        return { bg: "#FEF7E0", color: "#B06000", border: "1px solid #FDE293" };
      default:
        return { bg: "#F1F3F4", color: "#3C4043", border: "1px solid #E8EAED" };
    }
  };

  return (
    <div
      className="py-5"
      style={{ backgroundColor: "#F1F5F9", minHeight: "calc(100vh - 140px)" }}
    >
      <Container>
        <div
          className="p-4 p-md-5 rounded-4 shadow-sm text-white mb-5 position-relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #000F22 0%, #1D4E89 100%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className="position-relative"
            style={{ zIndex: 2, maxWidth: "700px" }}
          >
            <span
              className="badge px-3 py-2 rounded-pill fw-semibold mb-3 text-dark shadow-sm"
              style={{
                backgroundColor: "var(--pi-amber, #F5A524)",
                fontSize: "12px",
              }}
            >
              Núcleo Familiar
            </span>
            <h1 className="fw-bold display-6 mb-2">Gestión de Alumnos</h1>
            <p
              className="text-white-50 mb-4 small lead"
              style={{ fontSize: "15px" }}
            >
              Administrá los datos personales y académicos de tus hijos. Esta
              información se utilizará de forma automática al generar nuevas
              preinscripciones escolares.
            </p>
            <Button
              onClick={abrirModalParaCrear}
              className="fw-bold px-4 py-2.5 border-0 shadow-sm d-inline-flex align-items-center gap-2 text-dark"
              style={{
                backgroundColor: "var(--pi-amber, #F5A524)",
                borderRadius: "10px",
              }}
            >
              <span>+ Registrar nuevo alumno</span>
            </Button>
          </div>

          <div
            className="position-absolute rounded-circle"
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "rgba(91, 192, 235, 0.08)",
              bottom: "-100px",
              right: "-50px",
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3
            className="fw-bold mb-0"
            style={{ color: "#0A2540", fontSize: "20px" }}
          >
            Alumnos vinculados a la cuenta ({listaAlumnos.length})
          </h3>
        </div>

        {listaAlumnos.length === 0 ? (
          <Card className="text-center p-5 border-0 shadow-sm rounded-4 bg-white">
            <Card.Body>
              <h5 className="fw-bold text-secondary mb-2">
                No hay alumnos registrados
              </h5>
              <p className="text-muted small mb-4">
                Comenzá agregando a tus hijos para realizar preinscripciones con
                un solo clic.
              </p>
              <Button
                onClick={abrirModalParaCrear}
                className="fw-semibold px-4 text-dark border-0 shadow-sm"
                style={{
                  backgroundColor: "var(--pi-amber, #F5A524)",
                  borderRadius: "8px",
                }}
              >
                + Registrar nuevo alumno
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {listaAlumnos.map((alumno) => {
              const iniciales = `${alumno.nombre?.charAt(0) || ""}${alumno.apellido?.charAt(0) || ""}`;
              const badgeEstilo = getBadgeEstilo(alumno.nivel);

              return (
                <Col lg={4} md={6} key={alumno.id}>
                  <Card
                    className="rounded-4 h-100 bg-white overflow-hidden shadow-sm d-flex flex-column justify-content-between"
                    style={{ border: "1px solid #E2E8F0" }}
                  >
                    <Card.Body className="p-4 d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div
                            className="rounded-3 d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#0A2540",
                              fontSize: "17px",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {iniciales}
                          </div>

                          <span
                            className="px-3 py-1.5 fw-semibold rounded-pill"
                            style={{
                              backgroundColor: badgeEstilo.bg,
                              color: badgeEstilo.color,
                              border: badgeEstilo.border,
                              fontSize: "12px",
                            }}
                          >
                            {alumno.nivel}
                            {alumno.gradoAno ? ` • ${alumno.gradoAno}` : ""}
                          </span>
                        </div>
                        <h4
                          className="fw-bold mb-3"
                          style={{ color: "#000F22", fontSize: "20px" }}
                        >
                          {alumno.nombre} {alumno.apellido}
                        </h4>
                        <div
                          className="p-3 rounded-3 mb-4 d-flex flex-column gap-2"
                          style={{
                            backgroundColor: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted small fw-medium">
                              Documento (DNI):
                            </span>
                            <span className="fw-bold text-dark small">
                              {alumno.dni}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted small fw-medium">
                              Edad registrada:
                            </span>
                            <span className="fw-bold text-dark small">
                              {alumno.edad} años
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-top border-light d-flex flex-column gap-2">
                        <Button
                          variant="primary"
                          className="w-100 py-2 fw-semibold small rounded-3 border-0 shadow-sm"
                          style={{ backgroundColor: "#1D4E89" }}
                          onClick={() => abrirModalDetalles(alumno)}
                        >
                          Ver perfil completo
                        </Button>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-secondary"
                            className="w-50 py-1.5 fw-medium small rounded-3 text-dark border-secondary border-opacity-25"
                            onClick={() => abrirModalParaEditar(alumno)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="w-50 py-1.5 fw-medium small rounded-3 border-danger border-opacity-25 bg-danger bg-opacity-10 text-danger"
                            onClick={() => eliminarAlumno(alumno.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        <AlumnoModal
          mostrar={mostrarModal}
          ocultar={ocultarModal}
          guardarAlumno={guardarAlumno}
          alumnoAEditar={alumnoAEditar}
        />

        <Modal
          show={mostrarModalDetalles}
          onHide={() => setMostrarModalDetalles(false)}
          centered
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold" style={{ color: "#000F22" }}>
              Ficha del Alumno
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            {alumnoSeleccionado && (
              <div className="text-center">
                <div
                  className="rounded-circle mx-auto d-flex align-items-center justify-content-center text-white fw-bold shadow-sm mb-3"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#0A2540",
                    fontSize: "20px",
                  }}
                >
                  {alumnoSeleccionado.nombre?.charAt(0)}
                  {alumnoSeleccionado.apellido?.charAt(0)}
                </div>
                <h3 className="fw-bold mb-1" style={{ color: "#000F22" }}>
                  {alumnoSeleccionado.nombre} {alumnoSeleccionado.apellido}
                </h3>
                <p className="text-muted small mb-4">
                  Legajo escolar familiar verificado
                </p>

                <div
                  className="p-4 rounded-4 text-start d-flex flex-column gap-3"
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="text-muted small">Documento (DNI):</span>
                    <span className="fw-bold text-dark small">
                      {alumnoSeleccionado.dni}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="text-muted small">Edad:</span>
                    <span className="fw-bold text-dark small">
                      {alumnoSeleccionado.edad} años
                    </span>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-2">
                    <span className="text-muted small">Nivel educativo:</span>
                    <span className="fw-bold text-dark small">
                      {alumnoSeleccionado.nivel}
                    </span>
                  </div>
                  {alumnoSeleccionado.gradoAno && (
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <span className="text-muted small">Grado / Año:</span>
                      <span className="fw-bold text-dark small">
                        {alumnoSeleccionado.gradoAno}
                      </span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Estado del legajo:</span>
                    <Badge
                      bg="success"
                      className="fw-normal px-3 py-1.5 rounded-pill"
                    >
                      Activo para preinscripción
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 justify-content-center">
            <Button
              variant="secondary"
              onClick={() => setMostrarModalDetalles(false)}
              className="px-5 fw-semibold rounded-pill"
            >
              Cerrar ficha
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AlumnosView;
