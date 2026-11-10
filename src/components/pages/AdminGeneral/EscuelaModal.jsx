import { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const NIVELES = ["Inicial", "Primario", "Secundario"];

const VACIO = {
  nombre: "",
  localidad: "",
  gestion: "Pública",
  niveles: [],
  jornadaExtendida: false,
  comedor: false,
  plurilingue: false,
};

export const EscuelaModal = ({
  mostrar,
  ocultar,
  guardarEscuela,
  escuelaAEditar,
  escuelas,
}) => {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setDatos(escuelaAEditar ? { ...VACIO, ...escuelaAEditar } : VACIO);
    setErrores({});
  }, [escuelaAEditar, mostrar]);

  const cambiar = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
    setErrores({ ...errores, [campo]: "" });
  };

  const alternarNivel = (nivel) => {
    const seleccionados = datos.niveles.includes(nivel)
      ? datos.niveles.filter((n) => n !== nivel)
      : NIVELES.filter((n) => n === nivel || datos.niveles.includes(n));
    cambiar("niveles", seleccionados);
  };

  const validar = () => {
    const nuevos = {};
    const nombre = datos.nombre.trim();

    if (!nombre) {
      nuevos.nombre = "El nombre es obligatorio";
    } else if (nombre.length < 3 || nombre.length > 60) {
      nuevos.nombre = "El nombre debe tener entre 3 y 60 caracteres";
    } else if (
      escuelas.some(
        (otra) =>
          otra.id !== escuelaAEditar?.id &&
          otra.nombre.trim().toLowerCase() === nombre.toLowerCase(),
      )
    ) {
      nuevos.nombre = "Ya existe una escuela con ese nombre";
    }

    if (!datos.localidad.trim()) {
      nuevos.localidad = "La localidad es obligatoria";
    }

    if (datos.niveles.length === 0) {
      nuevos.niveles = "Seleccioná al menos un nivel";
    }

    return nuevos;
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    guardarEscuela({
      ...datos,
      nombre: datos.nombre.trim(),
      localidad: datos.localidad.trim(),
    });
    ocultar();
  };

  const esEdicion = Boolean(escuelaAEditar);
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
            {esEdicion ? "MODIFICACIÓN DE ESCUELA" : "NUEVO REGISTRO"}
          </span>
          <h5 className="fw-bold mb-0 text-white" style={{ fontSize: "20px" }}>
            {esEdicion ? "Editar escuela" : "Registrar nueva escuela"}
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
            <Col xs={12}>
              <Form.Label className="fw-semibold text-dark small mb-1">
                Nombre
              </Form.Label>
              <Form.Control
                value={datos.nombre}
                onChange={(e) => cambiar("nombre", e.target.value)}
                isInvalid={Boolean(errores.nombre)}
                maxLength={60}
                placeholder="Ej: Colegio San Martín"
                className={estiloCampo}
              />
              <Form.Control.Feedback type="invalid">
                {errores.nombre}
              </Form.Control.Feedback>
            </Col>

            <Col md={7}>
              <Form.Label className="fw-semibold text-dark small mb-1">
                Localidad
              </Form.Label>
              <Form.Control
                value={datos.localidad}
                onChange={(e) => cambiar("localidad", e.target.value)}
                isInvalid={Boolean(errores.localidad)}
                placeholder="Ej: San Miguel de Tucumán"
                className={estiloCampo}
              />
              <Form.Control.Feedback type="invalid">
                {errores.localidad}
              </Form.Control.Feedback>
            </Col>

            <Col md={5}>
              <Form.Label className="fw-semibold text-dark small mb-1">
                Gestión
              </Form.Label>
              <Form.Select
                value={datos.gestion}
                onChange={(e) => cambiar("gestion", e.target.value)}
                className={estiloCampo}
              >
                <option value="Pública">Pública</option>
                <option value="Privada">Privada</option>
              </Form.Select>
            </Col>

            <Col xs={12}>
              <Form.Label className="fw-semibold text-dark small mb-1 d-block">
                Niveles que ofrece
              </Form.Label>
              {NIVELES.map((nivel) => (
                <Form.Check
                  inline
                  key={nivel}
                  type="checkbox"
                  id={`nivel-${nivel}`}
                  label={nivel}
                  checked={datos.niveles.includes(nivel)}
                  onChange={() => alternarNivel(nivel)}
                />
              ))}
              {errores.niveles && (
                <div className="text-danger small mt-1">{errores.niveles}</div>
              )}
            </Col>

            <Col xs={12}>
              <Form.Label className="fw-semibold text-dark small mb-1 d-block">
                Servicios
              </Form.Label>
              <Form.Check
                inline
                type="checkbox"
                id="jornadaExtendida"
                label="Jornada extendida"
                checked={datos.jornadaExtendida}
                onChange={(e) => cambiar("jornadaExtendida", e.target.checked)}
              />
              <Form.Check
                inline
                type="checkbox"
                id="comedor"
                label="Comedor"
                checked={datos.comedor}
                onChange={(e) => cambiar("comedor", e.target.checked)}
              />
              <Form.Check
                inline
                type="checkbox"
                id="plurilingue"
                label="Plurilingüe"
                checked={datos.plurilingue}
                onChange={(e) => cambiar("plurilingue", e.target.checked)}
              />
            </Col>
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
            {esEdicion ? "Guardar cambios" : "Registrar escuela"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};