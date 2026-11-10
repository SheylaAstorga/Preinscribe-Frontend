import { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ETIQUETAS_ROL = {
  FAMILIA: "Familia",
  ADMIN_ESCUELA: "Admin de escuela",
  ADMIN_GENERAL: "Admin general",
};

const VACIO = {
  nombre: "",
  email: "",
  password: "",
  rol: "FAMILIA",
  dni: "",
  escuelaId: "",
};

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const UsuarioModal = ({
  mostrar,
  ocultar,
  guardarUsuario,
  usuarioAEditar,
  usuarios,
  escuelas,
}) => {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  const esEdicion = Boolean(usuarioAEditar);

  useEffect(() => {
    setDatos(
      usuarioAEditar
        ? {
            ...VACIO,
            ...usuarioAEditar,
            password: "",
            dni: usuarioAEditar.dni ?? "",
            escuelaId: usuarioAEditar.escuelaId ?? "",
          }
        : VACIO,
    );
    setErrores({});
  }, [usuarioAEditar, mostrar]);

  const cambiar = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
    setErrores({ ...errores, [campo]: "" });
  };

  const cambiarRol = (rol) => {
    setDatos({ ...datos, rol });
    setErrores({ ...errores, dni: "", escuelaId: "" });
  };

  const validar = () => {
    const nuevos = {};
    const nombre = datos.nombre.trim();
    const email = datos.email.trim();

    if (!nombre) {
      nuevos.nombre = "El nombre es obligatorio";
    } else if (nombre.length < 3 || nombre.length > 40) {
      nuevos.nombre = "El nombre debe tener entre 3 y 40 caracteres";
    }

    if (!email) {
      nuevos.email = "El correo es obligatorio";
    } else if (!FORMATO_EMAIL.test(email)) {
      nuevos.email = "Ingresá un correo válido";
    } else if (email.length > 30) {
      nuevos.email = "El correo no puede superar los 30 caracteres";
    } else if (
      usuarios.some(
        (otro) =>
          otro.id !== usuarioAEditar?.id &&
          otro.email?.trim().toLowerCase() === email.toLowerCase(),
      )
    ) {
      nuevos.email = "Ya existe una cuenta con ese correo";
    }

    if (!esEdicion && !datos.password) {
      nuevos.password = "La contraseña es obligatoria";
    } else if (
      datos.password &&
      (datos.password.length < 6 || datos.password.length > 20)
    ) {
      nuevos.password = "La contraseña debe tener entre 6 y 20 caracteres";
    }

    if (datos.rol === "FAMILIA" && !/^\d{7,8}$/.test(datos.dni)) {
      nuevos.dni = "El DNI debe tener 7 u 8 números";
    }

    if (datos.rol === "ADMIN_ESCUELA" && !datos.escuelaId) {
      nuevos.escuelaId = "Seleccioná la escuela que administra";
    }

    return nuevos;
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    if (esEdicion && datos.rol !== usuarioAEditar.rol) {
      const confirmacion = window.confirm(
        `¿Confirmás cambiar el rol de "${usuarioAEditar.nombre}" de ${ETIQUETAS_ROL[usuarioAEditar.rol]} a ${ETIQUETAS_ROL[datos.rol]}? Cambiarán los permisos de su cuenta.`,
      );
      if (!confirmacion) return;
    }

    guardarUsuario({
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      password: datos.password,
      rol: datos.rol,
      ...(datos.rol === "FAMILIA" ? { dni: datos.dni.trim() } : {}),
      ...(datos.rol === "ADMIN_ESCUELA"
        ? { escuelaId: Number(datos.escuelaId) }
        : {}),
    });
    ocultar();
  };

  const estiloCampo =
    "py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none";

  return (
    <Modal
      show={mostrar}
      onHide={ocultar}
      centered
      size="lg"
      contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
    >
      <div
        className="px-4 py-3 text-white d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#000F22" }}
      >
        <div>
          <span
            className="badge px-2 py-1 rounded-pill fw-semibold mb-1 text-dark"
            style={{
              backgroundColor: "var(--pi-amber, #F5A524)",
              fontSize: "11px",
            }}
          >
            {esEdicion ? "MODIFICACIÓN DE USUARIO" : "NUEVO REGISTRO"}
          </span>
          <h5 className="fw-bold mb-0 text-white" style={{ fontSize: "20px" }}>
            {esEdicion ? "Editar usuario" : "Registrar nuevo usuario"}
          </h5>
        </div>

        <button
          type="button"
          className="btn-close btn-close-white shadow-none"
          aria-label="Cerrar"
          onClick={ocultar}
        />
      </div>

      <Form onSubmit={manejarEnvio} noValidate>
        <Modal.Body className="p-4 bg-white">
          <Row className="g-3">
            <Col md={6}>
              <Form.Label className="fw-semibold text-dark small mb-1">
                Nombre
              </Form.Label>
              <Form.Control
                value={datos.nombre}
                onChange={(e) => cambiar("nombre", e.target.value)}
                isInvalid={Boolean(errores.nombre)}
                maxLength={40}
                placeholder="Ej: María Pérez"
                className={estiloCampo}
              />
              <Form.Control.Feedback type="invalid">
                {errores.nombre}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label className="fw-semibold text-dark small mb-1">
                Correo electrónico
              </Form.Label>
              <Form.Control
                type="email"
                value={datos.email}
                onChange={(e) => cambiar("email", e.target.value)}
                isInvalid={Boolean(errores.email)}
                placeholder="Ej: maria@correo.com"
                className={estiloCampo}
              />
              <Form.Control.Feedback type="invalid">
                {errores.email}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label className="fw-semibold text-dark small mb-1">
                Rol
              </Form.Label>
              <Form.Select
                value={datos.rol}
                onChange={(e) => cambiarRol(e.target.value)}
                className={estiloCampo}
              >
                <option value="FAMILIA">Familia</option>
                <option value="ADMIN_ESCUELA">Admin de escuela</option>
                <option value="ADMIN_GENERAL">Admin general</option>
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label className="fw-semibold text-dark small mb-1">
                Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                autoComplete="new-password"
                value={datos.password}
                onChange={(e) => cambiar("password", e.target.value)}
                isInvalid={Boolean(errores.password)}
                maxLength={20}
                placeholder={esEdicion ? "Sin cambios" : "Entre 6 y 20 caracteres"}
                className={estiloCampo}
              />
              <Form.Control.Feedback type="invalid">
                {errores.password}
              </Form.Control.Feedback>
              {esEdicion && !errores.password && (
                <Form.Text className="text-secondary">
                  Dejala vacía para mantener la contraseña actual.
                </Form.Text>
              )}
            </Col>

            {datos.rol === "FAMILIA" && (
              <Col md={6}>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  DNI
                </Form.Label>
                <Form.Control
                  value={datos.dni}
                  onChange={(e) =>
                    cambiar("dni", e.target.value.replace(/\D/g, ""))
                  }
                  isInvalid={Boolean(errores.dni)}
                  maxLength={8}
                  placeholder="Ej: 45123456"
                  className={estiloCampo}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.dni}
                </Form.Control.Feedback>
              </Col>
            )}

            {datos.rol === "ADMIN_ESCUELA" && (
              <Col md={6}>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Escuela que administra
                </Form.Label>
                <Form.Select
                  value={datos.escuelaId}
                  onChange={(e) => cambiar("escuelaId", e.target.value)}
                  isInvalid={Boolean(errores.escuelaId)}
                  className={estiloCampo}
                >
                  <option value="">Seleccioná una escuela</option>
                  {escuelas.map((escuela) => (
                    <option key={escuela.id} value={escuela.id}>
                      {escuela.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.escuelaId}
                </Form.Control.Feedback>
              </Col>
            )}
          </Row>
        </Modal.Body>

        <Modal.Footer className="px-4 py-3 bg-light border-top border-light d-flex justify-content-end gap-2">
          <Button
            variant="outline-secondary"
            onClick={ocultar}
            className="px-4 py-2 fw-semibold rounded-3 small border-secondary border-opacity-25 shadow-none"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            className="px-4 py-2 fw-bold rounded-3 small border-0 shadow-sm text-dark"
            style={{ backgroundColor: "var(--pi-amber, #F5A524)" }}
          >
            {esEdicion ? "Guardar cambios" : "Registrar usuario"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};