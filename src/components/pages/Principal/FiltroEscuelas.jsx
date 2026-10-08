import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ToggleButton,
  ToggleButtonGroup,
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

  const handleBuscar = () => {
    console.log({
      nivel,
      localidad,
      escuela,
    });
  };

  return (
    <section
      style={{
        padding: "40px 0",
      }}
    >
     <Container className="text-center mb-4 mt-4" style={{ color: "var(--pi-navy)", }}>
        <h2>Explorá las escuelas disponibles:</h2>
     </Container>
      <Container>
       
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "clamp(18px, 4vw, 30px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          }}
        >
          <div className="mb-4">
            <div
              className="d-flex flex-wrap align-items-center gap-2"
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6c757d",
                  marginRight: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                NIVEL EDUCATIVO:
              </span>

              <ToggleButtonGroup
                type="radio"
                name="nivel"
                value={nivel}
                onChange={(value) => setNivel(value)}
                className="d-flex flex-wrap gap-1"
              >
                <ToggleButton
                  id="nivel-todos"
                  value="Todos"
                  variant="outline-secondary"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                    fontWeight: "600",
                    padding: "6px 14px",
                    background:
                      nivel === "Todos"
                        ? "var(--pi-blue)"
                        : "#f1f3f5",
                    color:
                      nivel === "Todos"
                        ? "white"
                        : "var(--pi-navy)",
                  }}
                >
                  Todos
                </ToggleButton>

                <ToggleButton
                  id="nivel-inicial"
                  value="Inicial"
                  variant="outline-secondary"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                    fontWeight: "600",
                    padding: "6px 14px",
                    background:
                      nivel === "Inicial"
                        ? "var(--pi-blue)"
                        : "#f1f3f5",
                    color:
                      nivel === "Inicial"
                        ? "white"
                        : "var(--pi-navy)",
                  }}
                >
                  Inicial (Jardín)
                </ToggleButton>

                <ToggleButton
                  id="nivel-primario"
                  value="Primario"
                  variant="outline-secondary"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                    fontWeight: "600",
                    padding: "6px 14px",
                    background:
                      nivel === "Primario"
                        ? "var(--pi-blue)"
                        : "#f1f3f5",
                    color:
                      nivel === "Primario"
                        ? "white"
                        : "var(--pi-navy)",
                  }}
                >
                  Primario
                </ToggleButton>

                <ToggleButton
                  id="nivel-secundario"
                  value="Secundario"
                  variant="outline-secondary"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                    fontWeight: "600",
                    padding: "6px 14px",
                    background:
                      nivel === "Secundario"
                        ? "var(--pi-blue)"
                        : "#f1f3f5",
                    color:
                      nivel === "Secundario"
                        ? "white"
                        : "var(--pi-navy)",
                  }}
                >
                  Secundario
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <Row className="g-3">
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
                  <GeoAlt size={15} />

                  <span>LOCALIDAD O BARRIO</span>
                </div>

                <Form.Control
                  type="text"
                  placeholder="Ej: San Miguel, Yerba Buena..."
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
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

          <div
            className="d-flex flex-wrap align-items-center gap-2 mt-4"
          >
            <span
              style={{
                fontSize: "12px",
                color: "#6c757d",
                marginRight: "4px",
              }}
            >
              Búsquedas sugeridas:
            </span>

            <Button
              variant="light"
              size="sm"
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