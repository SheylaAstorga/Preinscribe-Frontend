import { useState, useEffect } from "react";
import { Modal, Form, Button, Badge, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdministradoresModal = ({
  mostrar,
  ocultar,
  escuela,
  usuarios,
  escuelas,
  asignarAdmin,
  quitarAdmin,
}) => {
  const [seleccionado, setSeleccionado] = useState("");

  useEffect(() => {
    setSeleccionado("");
  }, [escuela, mostrar]);

  if (!escuela) return null;

  const admins = usuarios.filter(
    (u) => u.rol === "ADMIN_ESCUELA" && u.escuelaId === escuela.id,
  );

  const candidatos = usuarios.filter(
    (u) =>
      u.rol === "ADMIN_ESCUELA" &&
      u.activo !== false &&
      u.escuelaId !== escuela.id,
  );

  const nombreEscuela = (id) => escuelas.find((e) => e.id === id)?.nombre;

  const manejarAsignar = () => {
    const usuario = candidatos.find((u) => String(u.id) === seleccionado);
    if (!usuario) return;

    const escuelaActual = nombreEscuela(usuario.escuelaId);
    if (escuelaActual) {
      const confirmacion = window.confirm(
        `"${usuario.nombre}" hoy administra "${escuelaActual}". ¿Querés pasarlo a "${escuela.nombre}"?`,
      );
      if (!confirmacion) return;
    }

    asignarAdmin(usuario.id);
    setSeleccionado("");
  };

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
            ADMINISTRADORES
          </span>
          <h5 className="fw-bold mb-0 text-white" style={{ fontSize: "20px" }}>
            {escuela.nombre}
          </h5>
        </div>

        <button
          type="button"
          className="btn-close btn-close-white shadow-none"
          aria-label="Cerrar"
          onClick={ocultar}
        />
      </div>

      <Modal.Body className="p-4 bg-white">
        <h6 className="fw-bold text-dark mb-3">Administradores actuales</h6>

        {admins.length === 0 ? (
          <p className="text-secondary small border rounded-3 p-3 mb-4">
            Esta escuela todavía no tiene administradores.
          </p>
        ) : (
          <ListGroup variant="flush" className="border rounded-3 mb-4">
            {admins.map((admin) => (
              <ListGroup.Item
                key={admin.id}
                className="d-flex justify-content-between align-items-center gap-2"
              >
                <div>
                  <span className="fw-semibold text-dark d-block">
                    {admin.nombre}
                  </span>
                  <small className="text-secondary">{admin.email}</small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  {admin.activo === false && (
                    <Badge bg="secondary" className="rounded-pill px-3 py-2">
                      De baja
                    </Badge>
                  )}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-3 fw-semibold"
                    onClick={() => quitarAdmin(admin.id)}
                  >
                    Quitar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        <h6 className="fw-bold text-dark mb-3">Asignar un administrador</h6>

        {candidatos.length === 0 ? (
          <p className="text-secondary small mb-0">
            No hay otras cuentas de administrador de escuela disponibles. Podés
            crear una desde{" "}
            <Link to="/admin/usuarios" className="fw-semibold">
              Usuarios
            </Link>
            .
          </p>
        ) : (
          <div className="d-flex flex-wrap gap-2">
            <Form.Select
              className="flex-grow-1 w-auto py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none"
              value={seleccionado}
              onChange={(e) => setSeleccionado(e.target.value)}
            >
              <option value="">Seleccioná una cuenta</option>
              {candidatos.map((usuario) => {
                const escuelaActual = nombreEscuela(usuario.escuelaId);
                return (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre} ({usuario.email})
                    {escuelaActual ? ` - hoy en ${escuelaActual}` : ""}
                  </option>
                );
              })}
            </Form.Select>

            <Button
              onClick={manejarAsignar}
              disabled={!seleccionado}
              className="px-4 py-2 fw-bold rounded-3 small border-0 shadow-sm text-dark"
              style={{ backgroundColor: "var(--pi-amber, #F5A524)" }}
            >
              Asignar
            </Button>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="px-4 py-3 bg-light border-top border-light">
        <Button
          variant="outline-secondary"
          onClick={ocultar}
          className="px-4 py-2 fw-semibold rounded-3 small border-secondary border-opacity-25 shadow-none"
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};