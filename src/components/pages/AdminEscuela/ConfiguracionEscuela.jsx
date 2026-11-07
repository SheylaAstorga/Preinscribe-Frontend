
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Alert,
  InputGroup,
} from "react-bootstrap";

import {
  Building,
  GeoAlt,
  Telephone,
  Envelope,
  Calendar3,
  Save,
  CheckCircle,
  InfoCircle,
  ClockHistory,
  ShieldCheck,
  Person,
} from "react-bootstrap-icons";

const ConfiguracionEscuela = () => {
  const [escuela, setEscuela] = useState({
    nombre: "ESEA Escuela 1",
    codigo: "ESEA-001",
    direccion: "San Miguel de Tucumán, Tucumán",
    telefono: "381 400-1234",
    email: "escuela1@esea.edu.ar",
    descripcion:
      "Institución educativa de formación artística y cultural.",
  });

  const [periodo, setPeriodo] = useState({
    fechaInicio: "2026-11-01",
    fechaFin: "2027-02-28",
    ciclo: "2027",
    activo: true,
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");

  const actualizarEscuela = (e) => {
    const { name, value } = e.target;

    setEscuela((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setMensaje("");
  };

  const actualizarPeriodo = (e) => {
    const { name, value, type, checked } = e.target;

    setPeriodo((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMensaje("");
  };

  const guardarConfiguracion = (e) => {
    e.preventDefault();

    if (
      !escuela.nombre.trim() ||
      !escuela.direccion.trim() ||
      !escuela.telefono.trim() ||
      !escuela.email.trim()
    ) {
      setTipoMensaje("danger");
      setMensaje("Completá todos los campos institucionales obligatorios.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(escuela.email)
    ) {
      setTipoMensaje("danger");
      setMensaje("Ingresá una dirección de correo electrónico válida.");
      return;
    }

    if (
      !periodo.ciclo.trim() ||
      !periodo.fechaInicio ||
      !periodo.fechaFin
    ) {
      setTipoMensaje("danger");
      setMensaje("Completá los datos del período de preinscripción.");
      return;
    }

    if (periodo.fechaFin < periodo.fechaInicio) {
      setTipoMensaje("danger");
      setMensaje("La fecha de finalización no puede ser anterior a la fecha de inicio.");
      return;
    }

    setTipoMensaje("success");
    setMensaje(
      "Los cambios se actualizaron en pantalla. Recordá que todavía no se guardan en la base de datos."
    );
  };

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* Encabezado */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Configuración de la escuela</h2>
        <p className="text-secondary mb-0">
          Administrá la información institucional y los períodos de preinscripción.
        </p>
      </div>

      {/* Información de demostración */}
      <Alert variant="info" className="border-0 d-flex gap-2 align-items-start">
        <InfoCircle className="mt-1 flex-shrink-0" />
        <div>
          <strong>Modo de demostración.</strong> Los cambios se mantienen
          solamente mientras la pantalla está abierta. La persistencia se
          implementará al conectar el backend.
        </div>
      </Alert>

      {/* Información institucional */}
      <Form onSubmit={guardarConfiguracion}>
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                <Building size={25} />
              </div>
              <div>
                <h5 className="fw-bold mb-1">Información institucional</h5>
                <p className="text-secondary small mb-0">
                  Datos generales de la institución educativa.
                </p>
              </div>
            </div>

            <Row className="g-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Nombre de la institución *
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Building />
                    </InputGroup.Text>
                    <Form.Control
                      name="nombre"
                      value={escuela.nombre}
                      onChange={actualizarEscuela}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Código institucional
                  </Form.Label>
                  <Form.Control
                    name="codigo"
                    value={escuela.codigo}
                    disabled
                  />
                  <Form.Text className="text-secondary">
                    Código de identificación.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Dirección *
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <GeoAlt />
                    </InputGroup.Text>
                    <Form.Control
                      name="direccion"
                      value={escuela.direccion}
                      onChange={actualizarEscuela}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Teléfono de contacto *
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Telephone />
                    </InputGroup.Text>
                    <Form.Control
                      name="telefono"
                      value={escuela.telefono}
                      onChange={actualizarEscuela}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Correo electrónico *
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Envelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={escuela.email}
                      onChange={actualizarEscuela}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Descripción institucional
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={escuela.descripcion}
                    onChange={actualizarEscuela}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Período de preinscripción */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                  <Calendar3 size={25} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">
                    Período de preinscripción
                  </h5>
                  <p className="text-secondary small mb-0">
                    Configurá las fechas habilitadas para recibir solicitudes.
                  </p>
                </div>
              </div>

              <Badge
                bg={periodo.activo ? "success" : "secondary"}
                className="align-self-start px-3 py-2"
              >
                {periodo.activo ? "Período habilitado" : "Período deshabilitado"}
              </Badge>
            </div>

            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Ciclo lectivo
                  </Form.Label>
                  <Form.Control
                    name="ciclo"
                    value={periodo.ciclo}
                    onChange={actualizarPeriodo}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Fecha de inicio
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={periodo.fechaInicio}
                    onChange={actualizarPeriodo}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Fecha de finalización
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={periodo.fechaFin}
                    onChange={actualizarPeriodo}
                    min={periodo.fechaInicio}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <div className="border rounded-3 p-3">
                  <Form.Check
                    type="switch"
                    id="periodo-activo"
                    name="activo"
                    label="Habilitar período de preinscripción"
                    checked={periodo.activo}
                    onChange={actualizarPeriodo}
                    className="fw-semibold"
                  />
                  <small className="text-secondary d-block mt-1">
                    Esta opción representa si la institución recibe nuevas
                    solicitudes durante el período configurado.
                  </small>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Estado de la institución */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                <ShieldCheck size={25} />
              </div>
              <div>
                <h5 className="fw-bold mb-1">Estado de la institución</h5>
                <p className="text-secondary small mb-0">
                  Información general de la cuenta administrativa.
                </p>
              </div>
            </div>

            <Row className="g-3">
              <Col md={6}>
                <div className="border rounded-3 p-3 h-100">
                  <div className="text-secondary small mb-2">
                    Estado de la institución
                  </div>
                  <Badge bg="success" className="px-3 py-2">
                    Activa
                  </Badge>
                </div>
              </Col>

              <Col md={6}>
                <div className="border rounded-3 p-3 h-100">
                  <div className="text-secondary small mb-2">
                    Perfil de acceso
                  </div>
                  <div className="fw-semibold">
                    <Person className="me-2 text-primary" />
                    Administrador de escuela
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Mensajes */}
        {mensaje && (
          <Alert variant={tipoMensaje} className="d-flex gap-2 align-items-start">
            {tipoMensaje === "success" ? (
              <CheckCircle className="mt-1 flex-shrink-0" />
            ) : (
              <InfoCircle className="mt-1 flex-shrink-0" />
            )}
            <div>{mensaje}</div>
          </Alert>
        )}

        {/* Guardar */}
        <div className="d-flex justify-content-end mb-4">
          <Button type="submit" variant="primary" size="lg">
            <Save className="me-2" />
            Guardar configuración
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ConfiguracionEscuela;
