import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Spinner,
} from "react-bootstrap";

import {
  GeoAlt,
  Mortarboard,
  Search,
  CheckCircle,
  Clock,
  CupHot,
  Translate,
} from "react-bootstrap-icons";

const FiltroEscuelas = () => {
  const [nivel, setNivel] = useState("Todos");
  const [localidad, setLocalidad] = useState("");
  const [escuela, setEscuela] = useState("");

  // Estados para la búsqueda de localidades
  const [localidadesEncontradas, setLocalidadesEncontradas] = useState([]);
  const [cargandoLocalidades, setCargandoLocalidades] = useState(false);
  const [errorLocalidades, setErrorLocalidades] = useState("");
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState(false);

  const navigate = useNavigate();

  // Consulta la API cuando se escribe una localidad
  useEffect(() => {
    const nombreLocalidad = localidad.trim();

    // No consultamos si hay menos de 3 caracteres
    // o si ya se seleccionó una sugerencia.
    if (nombreLocalidad.length < 3 || localidadSeleccionada) {
      setLocalidadesEncontradas([]);
      setCargandoLocalidades(false);
      setErrorLocalidades("");
      return;
    }

    // Esperamos un momento antes de consultar la API
    const temporizador = setTimeout(async () => {
      try {
        setCargandoLocalidades(true);
        setErrorLocalidades("");

        const respuesta = await axios.get(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            params: {
              name: nombreLocalidad,
              count: 6,
              language: "es",
              countryCode: "AR",
            },
          },
        );

        setLocalidadesEncontradas(respuesta.data.results || []);
      } catch (error) {
        console.error("Error al buscar localidades:", error);
        setLocalidadesEncontradas([]);
        setErrorLocalidades(
          "No pudimos cargar las localidades. Intentá nuevamente.",
        );
      } finally {
        setCargandoLocalidades(false);
      }
    }, 400);

    // Cancelamos el temporizador si cambia el texto
    return () => clearTimeout(temporizador);
  }, [localidad, localidadSeleccionada]);

  // Selecciona una localidad sugerida
  const handleSeleccionarLocalidad = (resultado) => {
    setLocalidad(resultado.name);
    setLocalidadSeleccionada(true);
    setLocalidadesEncontradas([]);
    setErrorLocalidades("");
  };

  const handleBuscar = (filtrosExtra = {}) => {
    const params = new URLSearchParams();

    if (nivel !== "Todos") {
      params.set("nivel", nivel);
    }

    if (localidad.trim()) {
      params.set("localidad", localidad.trim());
    }

    if (escuela.trim()) {
      params.set("escuela", escuela.trim());
    }

    // Agregamos filtros adicionales, como comedor o vacantes.
    Object.entries(filtrosExtra).forEach(([clave, valor]) => {
      params.set(clave, valor);
    });

    const consulta = params.toString();

    navigate(consulta ? `/escuelas?${consulta}` : "/escuelas");
  };

  return (
    <section
      style={{
        padding: "40px 0",
        backgroundColor: "#f8fafc",
      }}
    >
      <Container
        className="text-center mb-4"
        style={{ color: "var(--pi-navy)" }}
      >
        <h2 className="fw-bold">Explorá las escuelas disponibles</h2>
        <p className="text-secondary mb-0">
          Encontrá instituciones según tus necesidades y ubicación.
        </p>
      </Container>

      <Container>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "clamp(18px, 4vw, 30px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.10)",
          }}
        >
          {/* Nivel educativo */}
          <div className="mb-4">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6c757d",
                }}
              >
                NIVEL EDUCATIVO:
              </span>

              <ToggleButtonGroup
                type="radio"
                name="nivel"
                value={nivel}
                onChange={setNivel}
                className="d-flex flex-wrap gap-1"
              >
                {["Todos", "Inicial", "Primario", "Secundario"].map(
                  (opcion) => (
                    <ToggleButton
                      key={opcion}
                      id={`nivel-${opcion.toLowerCase()}`}
                      value={opcion}
                      variant="outline-secondary"
                      style={{
                        borderRadius: "20px",
                        border: "none",
                        fontWeight: "600",
                        padding: "6px 14px",
                        background:
                          nivel === opcion ? "var(--pi-blue)" : "#f1f3f5",
                        color: nivel === opcion ? "white" : "var(--pi-navy)",
                      }}
                    >
                      {opcion === "Inicial" ? "Inicial (Jardín)" : opcion}
                    </ToggleButton>
                  ),
                )}
              </ToggleButtonGroup>
            </div>
          </div>

          <Row className="g-3">
            {/* Localidad con API pública */}
            <Col xs={12} md={4}>
              <div
                style={{
                  background: "#f1f3f5",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  minHeight: "60px",
                  position: "relative",
                }}
              >
                <div
                  className="d-flex align-items-center gap-2"
                  style={{
                    color: "var(--pi-blue)",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  <GeoAlt size={15} />
                  <span>LOCALIDAD O BARRIO</span>
                </div>

                <Form.Control
                  type="text"
                  placeholder="Ej: San Miguel, Yerba Buena..."
                  value={localidad}
                  autoComplete="off"
                  onChange={(e) => {
                    setLocalidad(e.target.value);
                    setLocalidadSeleccionada(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setLocalidadesEncontradas([]);
                    }
                  }}
                  style={{
                    border: "none",
                    background: "transparent",
                    boxShadow: "none",
                    padding: "2px 0 0 24px",
                    fontSize: "14px",
                  }}
                />

                {/* Estado de carga */}
                {cargandoLocalidades && (
                  <div className="small text-secondary mt-2">
                    <Spinner size="sm" animation="border" className="me-2" />
                    Buscando localidades...
                  </div>
                )}

                {/* Sugerencias de la API */}
                {localidadesEncontradas.length > 0 && (
                  <div
                    className="bg-white rounded-3 shadow border mt-2"
                    role="listbox"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      zIndex: 1050,
                      overflow: "hidden",
                    }}
                  >
                    {localidadesEncontradas.map((resultado) => (
                      <Button
                        key={resultado.id}
                        variant="light"
                        className="w-100 text-start rounded-0 border-0"
                        role="option"
                        aria-selected={false}
                        onClick={() => handleSeleccionarLocalidad(resultado)}
                        style={{ padding: "10px 14px" }}
                      >
                        <GeoAlt className="me-2" color="#1D4E89" />
                        <span>{resultado.name}</span>

                        {resultado.admin1 && (
                          <small className="text-secondary ms-1">
                            · {resultado.admin1}
                          </small>
                        )}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Sin resultados */}
                {!cargandoLocalidades &&
                  localidad.trim().length >= 3 &&
                  !localidadSeleccionada &&
                  localidadesEncontradas.length === 0 &&
                  !errorLocalidades && (
                    <div className="small text-secondary mt-2">
                      No se encontraron localidades.
                    </div>
                  )}

                {/* Error de conexión */}
                {errorLocalidades && (
                  <div className="small text-danger mt-2">
                    {errorLocalidades}
                  </div>
                )}
              </div>
            </Col>

            {/* Nombre de la escuela */}
            <Col xs={12} md={4}>
              <div
                style={{
                  background: "#f1f3f5",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  minHeight: "60px",
                }}
              >
                <div
                  className="d-flex align-items-center gap-2"
                  style={{
                    color: "var(--pi-blue)",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  <Mortarboard size={15} />
                  <span>NOMBRE DE LA ESCUELA</span>
                </div>

                <Form.Control
                  type="text"
                  placeholder="Ej: Colegio San Martín..."
                  value={escuela}
                  onChange={(e) => setEscuela(e.target.value)}
                  style={{
                    border: "none",
                    background: "transparent",
                    boxShadow: "none",
                    padding: "2px 0 0 24px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </Col>

            {/* Botón de búsqueda */}
            <Col xs={12} md={4}>
              <Button
                onClick={handleBuscar}
                className="w-100"
                style={{
                  background: "var(--pi-amber)",
                  border: "none",
                  borderRadius: "10px",
                  color: "var(--pi-navy-deep)",
                  fontWeight: "700",
                  minHeight: "60px",
                }}
              >
                <Search size={18} className="me-2" />
                Buscar escuelas
              </Button>
            </Col>
          </Row>

          {/* Búsquedas sugeridas */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-4">
            <span
              style={{
                fontSize: "12px",
                color: "#6c757d",
              }}
            >
              Búsquedas sugeridas:
            </span>

            <Button
              variant="light"
              size="sm"
              onClick={() => handleBuscar()}
              style={{
                borderRadius: "20px",
                color: "var(--pi-blue)",
                border: "1px solid #dee2e6",
                fontSize: "12px",
              }}
            >
              <CheckCircle size={13} className="me-1" />
              Con vacantes abiertas
            </Button>

            <Button
              variant="light"
              size="sm"
              onClick={() => handleBuscar()}
              style={{
                borderRadius: "20px",
                color: "var(--pi-blue)",
                border: "1px solid #dee2e6",
                fontSize: "12px",
              }}
            >
              <Clock size={13} className="me-1" />
              Jornada extendida
            </Button>

            <Button
              variant="light"
              size="sm"
              onClick={() => handleBuscar()}
              style={{
                borderRadius: "20px",
                color: "var(--pi-blue)",
                border: "1px solid #dee2e6",
                fontSize: "12px",
              }}
            >
              <CupHot size={13} className="me-1" />
              Comedor escolar
            </Button>

            <Button
              variant="light"
              size="sm"
              onClick={() => handleBuscar()}
              style={{
                borderRadius: "20px",
                color: "var(--pi-blue)",
                border: "1px solid #dee2e6",
                fontSize: "12px",
              }}
            >
              <Translate size={13} className="me-1" />
              Plurilingüe / Idiomas
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FiltroEscuelas;
