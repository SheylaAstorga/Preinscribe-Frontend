import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from "react-bootstrap";
import { People, Search, PlusLg, Pencil } from "react-bootstrap-icons";
import { obtenerUsuarios, guardarUsuarios } from "../../../data/usuariosService";
import { obtenerEscuelas } from "../../../data/escuelasService";
import { UsuarioModal } from "./UsuarioModal";

const ROLES = {
  FAMILIA: {
    etiqueta: "Familia",
    bg: "info-subtle",
    text: "info-emphasis",
  },
  ADMIN_ESCUELA: {
    etiqueta: "Admin de escuela",
    bg: "primary-subtle",
    text: "primary-emphasis",
  },
  ADMIN_GENERAL: {
    etiqueta: "Admin general",
    bg: "dark",
    text: "white",
  },
};

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());

  useEffect(() => {
    guardarUsuarios(usuarios);
  }, [usuarios]);

  const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo") || "null",
  );

  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("TODOS");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [escuelas] = useState(() => obtenerEscuelas());

  const esMiCuenta = (usuario) =>
    usuario.email?.toLowerCase() === usuarioActivo?.email?.toLowerCase();

  const cambiarEstado = (usuario, activo) => {
    if (!activo) {
      const confirmacion = window.confirm(
        `¿Seguro que querés dar de baja a "${usuario.nombre}"? No podrá iniciar sesión hasta que reactives su cuenta.`,
      );
      if (!confirmacion) return;
    }

    setUsuarios(
      usuarios.map((u) => (u.id === usuario.id ? { ...u, activo } : u)),
    );
  };

  const abrirModalParaCrear = () => {
    setUsuarioAEditar(null);
    setMostrarModal(true);
  };

  const abrirModalParaEditar = (usuario) => {
    setUsuarioAEditar(usuario);
    setMostrarModal(true);
  };

  const ocultarModal = () => {
    setMostrarModal(false);
    setUsuarioAEditar(null);
  };

  const guardarUsuario = (datos) => {
    if (usuarioAEditar) {
      setUsuarios(
        usuarios.map((u) => {
          if (u.id !== usuarioAEditar.id) return u;

          // Quito los campos propios del rol anterior antes de aplicar los nuevos
          const base = { ...u };
          delete base.dni;
          delete base.escuelaId;

          return {
            ...base,
            ...datos,
            password: datos.password || u.password,
          };
        }),
      );
    } else {
      setUsuarios([...usuarios, { ...datos, id: Date.now(), activo: true }]);
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.trim().toLowerCase();

    const coincideBusqueda =
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto);

    const coincideRol = filtroRol === "TODOS" || usuario.rol === filtroRol;

    const coincideEstado =
      filtroEstado === "TODOS" ||
      (filtroEstado === "ACTIVO" && usuario.activo !== false) ||
      (filtroEstado === "BAJA" && usuario.activo === false);

    return coincideBusqueda && coincideRol && coincideEstado;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroRol("TODOS");
    setFiltroEstado("TODOS");
  };

  return (
    <Container fluid className="px-3 px-lg-4 py-4">
      {/* ENCABEZADO */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="mb-2">
            <Badge bg="primary" className="rounded-pill px-3 py-2">
              <People className="me-1" />
              ADMINISTRACIÓN GENERAL
            </Badge>
          </div>
          <h2 className="fw-bold text-dark mb-1">Usuarios</h2>
          <p className="text-secondary mb-0">
            Consultá las cuentas de la plataforma y gestioná su acceso.
          </p>
        </div>

        <Button
          onClick={abrirModalParaCrear}
          className="fw-bold px-4 py-2 border-0 shadow-sm text-dark rounded-3"
          style={{ backgroundColor: "var(--pi-amber, #F5A524)" }}
        >
          <PlusLg className="me-2" />
          Registrar usuario
        </Button>
      </div>

      {/* BUSCADOR Y FILTROS */}
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-4">
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Label className="small fw-semibold text-secondary">
                Buscar por nombre o correo
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <Search className="text-secondary" />
                </InputGroup.Text>
                <Form.Control
                  className="border-start-0 bg-light"
                  placeholder="Ingresá un nombre o un correo..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={6} lg={3}>
              <Form.Label className="small fw-semibold text-secondary">
                Rol
              </Form.Label>
              <Form.Select
                className="bg-light"
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
              >
                <option value="TODOS">Todos los roles</option>
                <option value="FAMILIA">Familia</option>
                <option value="ADMIN_ESCUELA">Admin de escuela</option>
                <option value="ADMIN_GENERAL">Admin general</option>
              </Form.Select>
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
                <option value="TODOS">Todos los estados</option>
                <option value="ACTIVO">Activos</option>
                <option value="BAJA">De baja</option>
              </Form.Select>
            </Col>

            <Col xs={12} lg={2} className="d-flex align-items-end">
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
            <h5 className="fw-bold text-dark mb-1">Listado de usuarios</h5>
            <p className="text-secondary small mb-0">
              Mostrando {usuariosFiltrados.length} de {usuarios.length}{" "}
              usuarios.
            </p>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 text-secondary small">USUARIO</th>
                  <th className="py-3 text-secondary small">ROL</th>
                  <th className="py-3 text-secondary small">ESTADO</th>
                  <th className="py-3 text-secondary small text-end">
                    ACCIONES
                  </th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltrados.map((usuario) => {
                  const activo = usuario.activo !== false;
                  const rol = ROLES[usuario.rol];

                  return (
                    <tr key={usuario.id}>
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                            style={{
                              width: "38px",
                              height: "38px",
                              backgroundColor: "var(--pi-blue, #1D4E89)",
                            }}
                          >
                            {usuario.nombre.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="fw-semibold text-dark d-block">
                              {usuario.nombre}
                            </span>
                            <small className="text-secondary">
                              {usuario.email}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td className="py-3">
                        <Badge
                          bg={rol?.bg ?? "secondary"}
                          text={rol?.text}
                          className="rounded-pill px-3 py-2"
                        >
                          {rol?.etiqueta ?? usuario.rol}
                        </Badge>
                        {usuario.rol === "ADMIN_ESCUELA" && (
                          <small className="d-block text-secondary mt-1">
                            {escuelas.find((e) => e.id === usuario.escuelaId)
                              ?.nombre ?? "Sin escuela asignada"}
                          </small>
                        )}
                      </td>

                      <td className="py-3">
                        <Badge
                          bg={activo ? "success" : "secondary"}
                          className="rounded-pill px-3 py-2"
                        >
                          {activo ? "Activo" : "De baja"}
                        </Badge>
                      </td>

                                            <td className="py-3 text-end text-nowrap">
                        {esMiCuenta(usuario) ? (
                          <Badge
                            bg="light"
                            text="dark"
                            className="border rounded-pill px-3 py-2"
                          >
                            Tu cuenta
                          </Badge>
                        ) : (
                          <>
                            <Button
                              variant="light"
                              size="sm"
                              className="border rounded-3 fw-semibold me-2"
                              onClick={() => abrirModalParaEditar(usuario)}
                            >
                              <Pencil className="me-1" />
                              Editar
                            </Button>

                            {activo ? (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                className="rounded-3 fw-semibold"
                                onClick={() => cambiarEstado(usuario, false)}
                              >
                                Dar de baja
                              </Button>
                            ) : (
                              <Button
                                variant="outline-success"
                                size="sm"
                                className="rounded-3 fw-semibold"
                                onClick={() => cambiarEstado(usuario, true)}
                              >
                                Reactivar
                              </Button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {usuariosFiltrados.length === 0 && (
            <div className="text-center py-5">
              <div className="bg-light rounded-circle p-3 d-inline-flex mb-3">
                <Search size={30} className="text-secondary" />
              </div>
              <h6 className="fw-bold text-dark">No encontramos usuarios</h6>
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
      <UsuarioModal
        mostrar={mostrarModal}
        ocultar={ocultarModal}
        guardarUsuario={guardarUsuario}
        usuarioAEditar={usuarioAEditar}
        usuarios={usuarios}
        escuelas={escuelas.filter((e) => e.activa !== false)}
      />
    </Container>
  );
};

export default UsuariosAdmin;