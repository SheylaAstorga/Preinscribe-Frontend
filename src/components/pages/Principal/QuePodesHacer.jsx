import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Search,
  ClipboardCheck,
  CheckCircle,
  ArrowRight,
  ArrowDown,
} from "react-bootstrap-icons";

const acciones = [
  {
    numero: "01",
    icono: <Search size={28} />,
    titulo: "Encontrá tu escuela",
    descripcion:
      "Explorá las instituciones disponibles y encontrá la que mejor se adapte a lo que estás buscando.",
    boton: "Explorar instituciones",
  },
  {
    numero: "02",
    icono: <ClipboardCheck size={28} />,
    titulo: "Iniciá tu preinscripción",
    descripcion:
      "Completá tus datos de manera sencilla y comenzá tu proceso de preinscripción online.",
    boton: "Comenzar preinscripción",
  },
  {
    numero: "03",
    icono: <CheckCircle size={28} />,
    titulo: "Consultá tu estado",
    descripcion:
      "Realizá el seguimiento de tu solicitud y consultá el estado de tu preinscripción cuando quieras.",
    boton: "Consultar solicitud",
  },
];

function QuePodesHacer() {
  return (
    <section
      style={{
        backgroundColor: "#0A2540",
        padding: "clamp(40px, 8vw, 10px) 0",
      }}
      className="mb-5 position-relative overflow-hidden "
    >
      <div
        style={{
          position: "absolute",
          width: "clamp(180px, 30vw, 380px)",
          height: "clamp(180px, 30vw, 380px)",
          borderRadius: "50%",
          backgroundColor: "rgba(91, 192, 235, 0.07)",
          top: "-180px",
          right: "-100px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "clamp(150px, 25vw, 280px)",
          height: "clamp(150px, 25vw, 280px)",
          borderRadius: "50%",
          backgroundColor: "rgba(29, 78, 137, 0.2)",
          bottom: "-130px",
          left: "-100px",
          pointerEvents: "none",
        }}
      />

      <Container
        fluid="lg"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >

        <Row className="justify-content-center text-center">
          <Col xs={12} md={10} lg={8}>
            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
              <span
                style={{
                  width: "clamp(20px, 5vw, 38px)",
                  height: "3px",
                  backgroundColor: "#5BC0EB",
                  borderRadius: "20px",
                  flexShrink: 0,
                }}
              />

              <span
                style={{
                  color: "#5BC0EB",
                  fontSize: "clamp(0.68rem, 1.5vw, 0.8rem)",
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Todo en un solo lugar
              </span>

              <span
                style={{
                  width: "clamp(20px, 5vw, 38px)",
                  height: "3px",
                  backgroundColor: "#5BC0EB",
                  borderRadius: "20px",
                  flexShrink: 0,
                }}
              />
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                lineHeight: "1.7",
                maxWidth: "650px",
                margin: "0 auto",
              }}
            >
              Desde encontrar una institución hasta consultar el estado de tu
              solicitud. Todo el proceso, de forma simple y desde un mismo
              lugar.
            </p>
          </Col>
        </Row>


        <div
          className="position-relative"
          style={{
            marginTop: "clamp(45px, 7vw, 75px)",
          }}
        >
          <div
            className="d-none d-lg-block"
            style={{
              position: "absolute",
              top: "38px",
              left: "16%",
              right: "16%",
              height: "2px",
              backgroundColor: "rgba(91, 192, 235, 0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-3px",
                left: "0",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#5BC0EB",
                boxShadow: "0 0 0 6px rgba(91, 192, 235, 0.08)",
                animation: "recorrido 4s ease-in-out infinite",
              }}
            />
          </div>

          <Row className="justify-content-center g-4">
            {acciones.map((accion, index) => (
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={4}
                key={accion.numero}
                className="mx-auto"
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center mx-auto"
                    style={{
                      width: "clamp(62px, 10vw, 76px)",
                      height: "clamp(62px, 10vw, 76px)",
                      borderRadius: "20px",
                      backgroundColor: "#FFFFFF",
                      color: "#1D4E89",
                      position: "relative",
                      zIndex: 3,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                      animation: `flotar 3s ease-in-out ${
                        index * 0.3
                      }s infinite`,
                    }}
                  >
                    {accion.icono}
                  </div>


                  <div
                    className="text-center d-flex flex-column"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "24px",
                      padding: "clamp(24px, 4vw, 32px) clamp(18px, 3vw, 28px)",
                      marginTop: "-12px",
                      minHeight: "80%",
                    }}
                  >
                    <div
                      style={{
                        color: "#5BC0EB",
                        fontSize: "0.72rem",
                        fontWeight: "800",
                        letterSpacing: "1px",
                        marginBottom: "12px",
                      }}
                    >
                      PASO {accion.numero}
                    </div>

                    <h3
                      style={{
                        color: "#FFFFFF",
                        fontSize: "clamp(1.15rem, 3vw, 1.35rem)",
                        fontWeight: "750",
                        lineHeight: "1.3",
                        marginBottom: "14px",
                      }}
                    >
                      {accion.titulo}
                    </h3>

                    <p
                      style={{
                        color: "rgba(255,255,255,0.68)",
                        fontSize: "clamp(0.87rem, 2vw, 0.92rem)",
                        lineHeight: "1.7",
                        marginBottom: "24px",
                      }}
                    >
                      {accion.descripcion}
                    </p>

                    <div className="mt-2">
                      <Button
                        variant="link"
                        className="text-decoration-none p-0"
                        style={{
                          color: "#5BC0EB",
                          fontWeight: "700",
                          fontSize: "0.9rem",
                        }}
                      >
                        {accion.boton}
                        <ArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </div>


                  {index < acciones.length - 1 && (
                    <div
                      className="d-flex d-lg-none justify-content-center align-items-center"
                      style={{
                        height: "45px",
                      }}
                    >
                      <ArrowDown
                        size={22}
                        style={{
                          color: "#5BC0EB",
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <Row className="justify-content-center text-center">
          <Col xs={12} md={8} lg={6}>
            <div
              style={{
                marginTop: "clamp(40px, 6vw, 60px)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "15px",
                  fontSize: "0.9rem",
                }}
              >
                ¿Ya sabés qué institución estás buscando?
              </p>

              <Button
                size="lg"
                className="rounded-pill px-4 py-3"
                style={{
                  backgroundColor: "#5BC0EB",
                  border: "none",
                  color: "#0A2540",
                  fontWeight: "750",
                  fontSize: "clamp(0.88rem, 2vw, 1rem)",
                  maxWidth: "100%",
                }}
              >
                Buscar una institución
                <ArrowRight className="ms-2" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          @keyframes flotar {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes recorrido {
            0% {
              left: 0%;
              opacity: 0;
            }

            10% {
              opacity: 1;
            }

            45% {
              opacity: 1;
            }

            90% {
              opacity: 1;
            }

            100% {
              left: 100%;
              opacity: 0;
            }
          }

          @media (max-width: 575.98px) {
            .que-podes-hacer-button {
              width: 100%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms ;
              animation-iteration-count: 1 ;
              transition-duration: 0.01ms ;
              scroll-behavior: auto ;
            }
          }
        `}
      </style>
    </section>
  );
}

export default QuePodesHacer;