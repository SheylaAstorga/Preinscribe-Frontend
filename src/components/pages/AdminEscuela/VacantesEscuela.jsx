
import { useMemo, useState } from "react";
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
  Modal,
  Alert,
  ProgressBar,
} from "react-bootstrap";

import {
  People,
  Mortarboard,
  Search,
  PencilSquare,
  PlusCircle,
  ExclamationTriangle,
  CheckCircle,
  Building,
  Calendar3,
  InfoCircle,
} from "react-bootstrap-icons";

// Datos de demostración.
// Más adelante se obtendrán desde la API.
const vacantesIniciales = [
  {
    id: 1,
    grado: "1° año",
    nivel: "Ciclo básico",
    capacidad: 40,
    ocupadas: 32,
  },
  {
    id: 2,
    grado: "2° año",
    nivel: "Ciclo básico",
    capacidad: 35,
    ocupadas: 28,
  },
  {
    id: 3,
    grado: "3° año",
    nivel: "Ciclo básico",
    capacidad: 35,
    ocupadas: 30,
  },
  {
    id: 4,
    grado: "4° año",
    nivel: "Ciclo orientado",
    capacidad: 30,
    ocupadas: 22,
  },
  {
    id: 5,
    grado: "5° año",
    nivel: "Ciclo orientado",
    capacidad: 30,
    ocupadas: 18,
  },
];

const VacantesEscuela = () => {
  const [vacantes, setVacantes] = useState(vacantesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("TODOS");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [nuevaCapacidad, setNuevaCapacidad] = useState("");
  const [error, setError] = useState("");

  // Cálculos generales
  const totalCapacidad = vacantes.reduce(
    (total, item) => total + item.capacidad,
    0
  );

  const totalOcupadas = vacantes.reduce(
    (total, item) => total + item.ocupadas,
    0
  );

  const totalDisponibles = totalCapacidad - totalOcupadas;

  const porcentajeOcupacion =
    totalCapacidad > 0
      ? Math.round((totalOcupadas / totalCapacidad) * 100)
      : 0;

  // Filtros
  const vacantesFiltradas = useMemo(() => {
    return vacantes.filter((item) => {
      const coincideBusqueda = item.grado
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideNivel =
        filtroNivel === "TODOS" || item.nivel === filtroNivel;

      return coincideBusqueda && coincideNivel;
    });
  }, [vacantes, busqueda, filtroNivel]);

  // Abrir modal para editar
  const abrirEdicion = (vacante) => {
    setVacanteSeleccionada(vacante);
    setNuevaCapacidad(String(vacante.capacidad));
    setError("");
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setVacanteSeleccionada(null);
    setNuevaCapacidad("");
    setError("");
  };

  // Guardar nueva capacidad
  const guardarCapacidad = () => {
    const capacidad = Number(nuevaCapacidad);

    if (
      nuevaCapacidad.trim() === "" ||
      !Number.isInteger(capacidad) ||
      capacidad < 0
    ) {
      setError("Ingresá una capacidad válida, usando un número entero mayor o igual a cero.");
      return;
    }

    if (capacidad < vacanteSeleccionada.ocupadas) {
      setError(
        `No podés establecer una capacidad menor a las ${vacanteSeleccionada.ocupadas} vacantes ocupadas.`
      );
      return;
    }

    setVacantes((anteriores) =>
      anteriores.map((item) =>
        item.id === vacanteSeleccionada.id
          ? { ...item, capacidad }
          : item
      )
    );

    cerrarModal();
  };

  // Apariencia según disponibilidad
  const obtenerEstado = (disponibles) => {
    if (disponibles === 0) {
      return { texto: "Sin vacantes", color: "danger" };
    }

    if (disponibles <= 5) {
      return { texto: "Pocas vacantes", color: "warning" };
    }

    return { texto: "Disponible", color: "success" };
  };

  const obtenerPorcentaje = (ocupadas, capacidad) => {
    if (capacidad === 0) return 0;

    return Math.round((ocupadas / capacidad) * 100);
  };

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Gestión de vacantes</h2>
          <p className="text-secondary mb-0">
            Consultá y administrá la disponibilidad de cupos por grado.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Badge bg="primary" className="px-3 py-2">
            <Calendar3 className="me-2" />
            Ciclo lectivo 2027
          </Badge>
        </div>
      </div>

      {/* Aviso de demostración */}
      <Alert variant="info" className="border-0 d-flex align-items-start gap-2">
        <InfoCircle className="mt-1 flex-shrink-0" />
        <div>
          <strong>Modo de demostración.</strong> Los cambios realizados en esta
          pantalla son temporales y no se guardan en la base de datos.
        </div>
      </Alert>

      {/* Indicadores */}
      <Row className="g-3 mb-4">
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  Capacidad total
                </span>
                <span className="bg-primary bg-opacity-10 text-primary rounded-3 p-2">
                  <People size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{totalCapacidad}</h2>
              <small className="text-secondary">Cupos disponibles en total</small>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  Cupos ocupados
                </span>
                <span className="bg-warning bg-opacity-10 text-warning rounded-3 p-2">
                  <Mortarboard size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{totalOcupadas}</h2>
              <small className="text-secondary">Preinscripciones contabilizadas</small>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  Vacantes libres
                </span>
                <span className="bg-success bg-opacity-10 text-success rounded-3 p-2">
                  <CheckCircle size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{totalDisponibles}</h2>
              <small className="text-secondary">Cupos aún disponibles</small>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-secondary fw-medium">
                  Ocupación general
                </span>
                <span className="bg-info bg-opacity-10 text-info rounded-3 p-2">
                  <Building size={21} />
                </span>
              </div>
              <h2 className="fw-bold mb-1">{porcentajeOcupacion}%</h2>
              <small className="text-secondary">Porcentaje de ocupación</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Resumen general */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
            <div>
              <h5 className="fw-bold mb-1">Ocupación de la institución</h5>
              <p className="text-secondary small mb-0">
                Relación entre cupos ocupados y capacidad total.
              </p>
            </div>
            <h4 className="fw-bold mb-0">{porcentajeOcupacion}%</h4>
          </div>

          <ProgressBar
            now={porcentajeOcupacion}
            variant={porcentajeOcupacion >= 90 ? "warning" : "primary"}
            style={{ height: "12px" }}
          />

          <div className="d-flex justify-content-between mt-2">
            <small className="text-secondary">
              {totalOcupadas} ocupados
            </small>
            <small className="text-secondary">
              {totalDisponibles} disponibles
            </small>
          </div>
        </Card.Body>
      </Card>

      {/* Tabla de vacantes */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
            <div>
              <h5 className="fw-bold mb-1">Vacantes por grado</h5>
              <p className="text-secondary small mb-0">
                Administrá la capacidad de cada año de la institución.
              </p>
            </div>
          </div>

          {/* Filtros */}
          <Row className="g-3 mb-4">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar por grado..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col md={6}>
              <Form.Select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value)}
              >
                <option value="TODOS">Todos los niveles</option>
                <option value="Ciclo básico">Ciclo básico</option>
                <option value="Ciclo orientado">Ciclo orientado</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3">Grado</th>
                  <th className="py-3">Nivel</th>
                  <th className="py-3">Capacidad</th>
                  <th className="py-3">Ocupadas</th>
                  <th className="py-3">Disponibles</th>
                  <th className="py-3" style={{ minWidth: "150px" }}>
                    Ocupación
                  </th>
                  <th className="py-3">Estado</th>
                  <th className="py-3 text-end">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {vacantesFiltradas.length > 0 ? (
                  vacantesFiltradas.map((item) => {
                    const disponibles = item.capacidad - item.ocupadas;
                    const porcentaje = obtenerPorcentaje(
                      item.ocupadas,
                      item.capacidad
                    );
                    const estado = obtenerEstado(disponibles);

                    return (
                      <tr key={item.id}>
                        <td className="fw-semibold">{item.grado}</td>
                        <td>
                          <Badge bg="light" text="dark">
                            {item.nivel}
                          </Badge>
                        </td>
                        <td>{item.capacidad}</td>
                        <td>{item.ocupadas}</td>
                        <td className="fw-bold">{disponibles}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <ProgressBar
                              now={porcentaje}
                              variant={porcentaje >= 90 ? "warning" : "primary"}
                              style={{ height: "7px", flex: 1 }}
                            />
                            <small className="text-secondary">
                              {porcentaje}%
                            </small>
                          </div>
                        </td>
                        <td>
                          <Badge bg={estado.color}>{estado.texto}</Badge>
                        </td>
                        <td className="text-end">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => abrirEdicion(item)}
                          >
                            <PencilSquare className="me-1" />
                            Editar
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-5">
                      <Search className="text-secondary fs-3 mb-2" />
                      <p className="fw-semibold mb-1">
                        No se encontraron grados
                      </p>
                      <small className="text-secondary">
                        Probá modificando los filtros de búsqueda.
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-3">
            <small className="text-secondary">
              Mostrando {vacantesFiltradas.length} de {vacantes.length} grados
            </small>
            <small className="text-secondary">
              Ciclo lectivo 2027
            </small>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para editar capacidad */}
      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Modificar capacidad
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {vacanteSeleccionada && (
            <>
              <p className="text-secondary">
                Estás modificando la capacidad de{" "}
                <strong>{vacanteSeleccionada.grado}</strong>.
              </p>

              <div className="bg-light rounded-3 p-3 mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Cupos ocupados</span>
                  <strong>{vacanteSeleccionada.ocupadas}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Capacidad actual</span>
                  <strong>{vacanteSeleccionada.capacidad}</strong>
                </div>
              </div>

              <Form.Group>
                <Form.Label className="fw-semibold">
                  Nueva capacidad total
                </Form.Label>
                <Form.Control
                  type="number"
                  min={vacanteSeleccionada.ocupadas}
                  value={nuevaCapacidad}
                  onChange={(e) => {
                    setNuevaCapacidad(e.target.value);
                    setError("");
                  }}
                  placeholder="Ingresá la cantidad de cupos"
                />
                <Form.Text className="text-secondary">
                  La capacidad no puede ser menor a la cantidad de cupos ocupados.
                </Form.Text>
              </Form.Group>

              {error && (
                <Alert variant="danger" className="mt-3 mb-0">
                  <ExclamationTriangle className="me-2" />
                  {error}
                </Alert>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={guardarCapacidad}
            disabled={!vacanteSeleccionada}
          >
            <CheckCircle className="me-2" />
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VacantesEscuela;
