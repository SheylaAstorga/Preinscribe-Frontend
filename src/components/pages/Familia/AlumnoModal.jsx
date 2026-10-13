import { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Badge } from "react-bootstrap";

export const AlumnoModal = ({
  mostrar,
  ocultar,
  guardarAlumno,
  alumnoAEditar,
}) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [edad, setEdad] = useState("");
  const [nivel, setNivel] = useState("Primario");
  const [gradoAno, setGradoAno] = useState("1° Grado");

  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorDni, setErrorDni] = useState("");
  const [errorEdad, setErrorEdad] = useState("");

  const [tocoNombre, setTocoNombre] = useState(false);
  const [tocoApellido, setTocoApellido] = useState(false);
  const [tocoDni, setTocoDni] = useState(false);
  const [tocoEdad, setTocoEdad] = useState(false);

  useEffect(() => {
    if (alumnoAEditar) {
      setNombre(alumnoAEditar.nombre || "");
      setApellido(alumnoAEditar.apellido || "");
      setDni(alumnoAEditar.dni || "");
      setEdad(
        alumnoAEditar.edad !== undefined ? String(alumnoAEditar.edad) : "",
      );
      setNivel(alumnoAEditar.nivel || "Primario");
      setGradoAno(alumnoAEditar.gradoAno || "1° Grado");
    } else {
      setNombre("");
      setApellido("");
      setDni("");
      setEdad("");
      setNivel("Primario");
      setGradoAno("1° Grado");
    }
    setErrorNombre("");
    setErrorApellido("");
    setErrorDni("");
    setErrorEdad("");
    setTocoNombre(false);
    setTocoApellido(false);
    setTocoDni(false);
    setTocoEdad(false);
  }, [alumnoAEditar, mostrar]);

  const formatearTexto = (texto) => {
    const palabras = texto.trim().toLowerCase().split(/\s+/);
    let textoFormateado = "";

    for (let indice = 0; indice < palabras.length; indice++) {
      const palabraActual = palabras[indice];
      if (palabraActual.length > 0) {
        const palabraCapitalizada =
          palabraActual.charAt(0).toUpperCase() + palabraActual.slice(1);
        if (textoFormateado === "") {
          textoFormateado = palabraCapitalizada;
        } else {
          textoFormateado = textoFormateado + " " + palabraCapitalizada;
        }
      }
    }
    return textoFormateado;
  };

  const validarNombre = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valorLimpio === "") {
      return "El nombre es obligatorio";
    } else if (!letrasRegex.test(valorLimpio)) {
      return "El nombre solo puede contener letras y espacios";
    }
    return "";
  };

  const validarApellido = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valorLimpio === "") {
      return "El apellido es obligatorio";
    } else if (!letrasRegex.test(valorLimpio)) {
      return "El apellido solo puede contener letras y espacios";
    }
    return "";
  };

  const validarDni = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const numerosRegex = /^\d+$/;

    if (valorLimpio === "") {
      return "El DNI es obligatorio";
    } else if (!numerosRegex.test(valorLimpio)) {
      return "El DNI solo puede contener números";
    } else if (valorLimpio.length !== 8) {
      return "El DNI debe contener exactamente 8 dígitos";
    }
    return "";
  };

  const validarEdad = (valorActual) => {
    const valorLimpio = valorActual.trim();
    const numerosRegex = /^\d+$/;

    if (valorLimpio === "") {
      return "La edad es obligatoria";
    } else if (!numerosRegex.test(valorLimpio)) {
      return "La edad solo puede contener números";
    } else {
      const edadNumerica = Number(valorLimpio);
      if (edadNumerica < 3 || edadNumerica > 20) {
        return "La edad debe ser entre 3 y 20 años";
      }
    }
    return "";
  };

  const cambiarNombre = (evento) => {
    const nuevoValor = evento.target.value;
    setNombre(nuevoValor);
    if (tocoNombre) setErrorNombre(validarNombre(nuevoValor));
  };

  const perderFocoNombre = () => {
    setTocoNombre(true);
    setErrorNombre(validarNombre(nombre));
  };

  const cambiarApellido = (evento) => {
    const nuevoValor = evento.target.value;
    setApellido(nuevoValor);
    if (tocoApellido) setErrorApellido(validarApellido(nuevoValor));
  };

  const perderFocoApellido = () => {
    setTocoApellido(true);
    setErrorApellido(validarApellido(apellido));
  };

  const cambiarDni = (evento) => {
    const nuevoValor = evento.target.value;
    if (nuevoValor.length <= 8) {
      setDni(nuevoValor);
      if (tocoDni) setErrorDni(validarDni(nuevoValor));
    }
  };

  const perderFocoDni = () => {
    setTocoDni(true);
    setErrorDni(validarDni(dni));
  };

  const cambiarEdad = (evento) => {
    const nuevoValor = evento.target.value;
    setEdad(nuevoValor);
    if (tocoEdad) setErrorEdad(validarEdad(nuevoValor));
  };

  const perderFocoEdad = () => {
    setTocoEdad(true);
    setErrorEdad(validarEdad(edad));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    setTocoNombre(true);
    setTocoApellido(true);
    setTocoDni(true);
    setTocoEdad(true);

    const errorNombreActual = validarNombre(nombre);
    const errorApellidoActual = validarApellido(apellido);
    const errorDniActual = validarDni(dni);
    const errorEdadActual = validarEdad(edad);

    setErrorNombre(errorNombreActual);
    setErrorApellido(errorApellidoActual);
    setErrorDni(errorDniActual);
    setErrorEdad(errorEdadActual);

    if (
      errorNombreActual ||
      errorApellidoActual ||
      errorDniActual ||
      errorEdadActual
    ) {
      return;
    }

    const identificador = alumnoAEditar ? alumnoAEditar.id : Date.now();
    const nombreFormateado = formatearTexto(nombre);
    const apellidoFormateado = formatearTexto(apellido);

    const datosAlumno = {
      id: identificador,
      nombre: nombreFormateado,
      apellido: apellidoFormateado,
      dni: dni.trim(),
      edad: Number(edad),
      nivel: nivel,
      gradoAno: gradoAno || "1° Grado",
    };

    guardarAlumno(datosAlumno);
    ocultar();
  };

  const esEdicion = Boolean(alumnoAEditar);

  return (
    <Modal
      show={mostrar}
      onHide={ocultar}
      centered
      size="lg"
      contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
    >
      <div
        className="px-4 py-3 text-white d-flex justify-content-between align-items-center position-relative"
        style={{
          backgroundColor: "#000F22",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div>
          <span
            className="badge px-2.5 py-1 rounded-pill fw-semibold mb-1 text-dark"
            style={{
              backgroundColor: "var(--pi-amber, #F5A524)",
              fontSize: "11px",
            }}
          >
            {esEdicion ? "MODIFICACIÓN DE LEGAJO" : "NUEVO REGISTRO"}
          </span>
          <h5 className="fw-bold mb-0 text-white" style={{ fontSize: "20px" }}>
            {esEdicion ? "Editar datos del Alumno" : "Registrar Nuevo Alumno"}
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
          <p className="text-muted small mb-4">
            Completá los datos del alumno de manera precisa. Las validaciones
            aseguran que la información del legajo familiar sea correcta.
          </p>

          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Nombre
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Juan Carlos"
                  value={nombre}
                  onChange={cambiarNombre}
                  onBlur={perderFocoNombre}
                  isInvalid={Boolean(tocoNombre && errorNombre)}
                  className="py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none"
                />
                <Form.Control.Feedback type="invalid">
                  {errorNombre}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Apellido
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Gómez"
                  value={apellido}
                  onChange={cambiarApellido}
                  onBlur={perderFocoApellido}
                  isInvalid={Boolean(tocoApellido && errorApellido)}
                  className="py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none"
                />
                <Form.Control.Feedback type="invalid">
                  {errorApellido}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  DNI (8 dígitos)
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 45123456"
                  value={dni}
                  onChange={cambiarDni}
                  onBlur={perderFocoDni}
                  maxLength={8}
                  isInvalid={Boolean(tocoDni && errorDni)}
                  className="py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none"
                />
                <Form.Control.Feedback type="invalid">
                  {errorDni}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Edad
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 14"
                  value={edad}
                  onChange={cambiarEdad}
                  onBlur={perderFocoEdad}
                  min={3}
                  max={20}
                  isInvalid={Boolean(tocoEdad && errorEdad)}
                  className="py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none"
                />
                <Form.Control.Feedback type="invalid">
                  {errorEdad}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Nivel Educativo
                </Form.Label>
                <Form.Select
                  value={nivel}
                  onChange={(evento) => setNivel(evento.target.value)}
                  className="py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none"
                >
                  <option value="Inicial">Inicial</option>
                  <option value="Primario">Primario</option>
                  <option value="Secundario">Secundario</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark small mb-1">
                  Grado / Año Académico
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 6° Grado / 1° Año"
                  value={gradoAno}
                  onChange={(e) => setGradoAno(e.target.value)}
                  className="py-2 px-3 rounded-3 border-secondary border-opacity-25 text-dark small shadow-none"
                />
              </Form.Group>
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
            {esEdicion ? "Guardar Cambios" : "Registrar Alumno"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
