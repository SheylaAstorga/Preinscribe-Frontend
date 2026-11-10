import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, } from "react-bootstrap";
import { Building, Search, PlusLg, Pencil } from "react-bootstrap-icons";
import { obtenerEscuelas, guardarEscuelas } from "../../../data/escuelasService";
import { EscuelaModal } from "./EscuelaModal";

const EscuelasAdmin = () => {
  const [escuelas, setEscuelas] = useState(() => obtenerEscuelas());

  useEffect(() => {
    guardarEscuelas(escuelas);
  }, [escuelas]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODAS");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [escuelaAEditar, setEscuelaAEditar] = useState(null);

  const cambiarEstado = (escuela, activa) => {
    if (!activa) {
      const confirmacion = window.confirm(
        `¿Seguro que querés dar de baja "${escuela.nombre}"? Dejará de mostrarse en el sitio público y podés reactivarla cuando quieras.`,
      );
      if (!confirmacion) return;
    }

    setEscuelas(
      escuelas.map((e) => (e.id === escuela.id ? { ...e, activa } : e)),
    );
  };

  const abrirModalParaCrear = () => {
    setEscuelaAEditar(null);
    setMostrarModal(true);
  };

  const abrirModalParaEditar = (escuela) => {
    setEscuelaAEditar(escuela);
    setMostrarModal(true);
  };

  const ocultarModal = () => {
    setMostrarModal(false);
    setEscuelaAEditar(null);
  };

  const guardarEscuela = (datos) => {
    if (escuelaAEditar) {
      setEscuelas(
        escuelas.map((e) =>
          e.id === escuelaAEditar.id ? { ...e, ...datos } : e,
        ),
      );
    } else {
      setEscuelas([
        ...escuelas,
        { ...datos, id: Date.now(), abierta: false, activa: true, imagen: null },
      ]);
    }
  };

  const escuelasFiltradas = escuelas.filter((escuela) => {
    const texto = busqueda.trim().toLowerCase();

    const coincideBusqueda =
      escuela.nombre.toLowerCase().includes(texto) ||
      escuela.localidad.toLowerCase().includes(texto);

    const coincideEstado =
      filtroEstado === "TODAS" ||
      (filtroEstado === "ACTIVA" && escuela.activa !== false) ||
      (filtroEstado === "BAJA" && escuela.activa === false);

    return coincideBusqueda && coincideEstado;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroEstado("TODAS");
  };

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* ENCABEZADO */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="mb-2">
            <Badge bg="primary" className="rounded-pill px-3 py-2">
              <Building className="me-1" />
              ADMINISTRACIÓN GENERAL
            </Badge>
          </div>
          <h2 className="fw-bold text-dark mb-1">Escuelas</h2>
          <p className="text-secondary mb-0">
            Registrá, editá y dá de baja las escuelas de la plataforma.
          </p>
        </div>

        <Button
          onClick={abrirModalParaCrear}
          className="fw-bold px-4 py-2 border-0 shadow-sm text-dark rounded-3"
          style={{ backgroundColor: "var(--pi-amber, #F5A524)" }}
        >
          <PlusLg className="me-2" />
          Registrar escuela
        </Button>
      </div>

      {/* BUSCADOR Y FILTROS */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <Row className="g-3">
            <Col xs={12} lg={6}>
              <Form.Label className="small fw-semibold text-secondary">
                Buscar escuela o localidad
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <Search className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  className="border-start-0 bg-light"
                  placeholder="Ingresá un nombre o una localidad..."
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
                <option value="TODAS">Todas</option>
                <option value="ACTIVA">Activas</option>
                <option value="BAJA">De baja</option>
              </Form.Select>
            </Col>

            <Col xs={12} sm={6} lg={3} className="d-flex align-items-end">
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

      {/* TABLA */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <div className="mb-4">
            <h5 className="fw-bold text-dark mb-1">Listado de escuelas</h5>
            <p className="text-secondary small mb-0">
              Mostrando {escuelasFiltradas.length} de {escuelas.length} escuelas.
            </p>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 text-secondary small">ESCUELA</th>
                  <th className="py-3 text-secondary small">LOCALIDAD</th>
                  <th className="py-3 text-secondary small">GESTIÓN</th>
                  <th className="py-3 text-secondary small">NIVELES</th>
                  <th className="py-3 text-secondary small">ESTADO</th>
                  <th className="py-3 text-secondary small text-end">
                    ACCIONES
                  </th>
                </tr>
              </thead>

              <tbody>
                {escuelasFiltradas.map((escuela) => {
                  const activa = escuela.activa !== false;

                  return (
                    <tr key={escuela.id}>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-primary-subtle text-primary rounded-circle p-2">
                            <Building size={17} />
                          </div>
                          <span className="fw-semibold text-dark">
                            {escuela.nombre}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 text-secondary">
                        {escuela.localidad}
                      </td>

                      <td className="py-3 text-secondary">{escuela.gestion}</td>

                      <td className="py-3">
                        {escuela.niveles.map((nivel) => (
                          <Badge
                            key={nivel}
                            bg="info-subtle"
                            text="info-emphasis"
                            className="me-1 rounded-pill px-2 py-1"
                          >
                            {nivel}
                          </Badge>
                        ))}
                      </td>

                      <td className="py-3">
                        <Badge
                          bg={activa ? "success" : "secondary"}
                          className="rounded-pill px-3 py-2"
                        >
                          {activa ? "Activa" : "De baja"}
                        </Badge>
                      </td>

                      <td className="py-3 text-end text-nowrap">
                        <Button
                          variant="light"
                          size="sm"
                          className="border rounded-3 fw-semibold me-2"
                          onClick={() => abrirModalParaEditar(escuela)}
                        >
                          <Pencil className="me-1" />
                          Editar
                        </Button>

                        {activa ? (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="rounded-3 fw-semibold"
                            onClick={() => cambiarEstado(escuela, false)}
                          >
                            Dar de baja
                          </Button>
                        ) : (
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="rounded-3 fw-semibold"
                            onClick={() => cambiarEstado(escuela, true)}
                          >
                            Reactivar
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {escuelasFiltradas.length === 0 && (
            <div className="text-center py-5">
              <div className="bg-light rounded-circle p-3 d-inline-flex mb-3">
                <Search size={30} className="text-secondary" />
              </div>
              <h6 className="fw-bold text-dark">No encontramos escuelas</h6>
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
      <EscuelaModal
        mostrar={mostrarModal}
        ocultar={ocultarModal}
        guardarEscuela={guardarEscuela}
        escuelaAEditar={escuelaAEditar}
        escuelas={escuelas}
      />
    </Container>
  );
};

export default EscuelasAdmin;