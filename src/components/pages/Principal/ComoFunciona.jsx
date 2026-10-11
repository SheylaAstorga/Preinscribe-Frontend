import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Search,
  Building,
  ClipboardCheck,
  CheckCircle,
  ArrowRight,
} from "react-bootstrap-icons";

const pasos = [
  {
    numero: "01",
    titulo: "Buscar",
    descripcion: "Encontrá la institución que estás buscando.",
    icono: <Search />,
  },
  {
    numero: "02",
    titulo: "Conocer",
    descripcion: "Consultá la información de cada institución.",
    icono: <Building />,
  },
  {
    numero: "03",
    titulo: "Completar",
    descripcion:
      "Ingresá los datos necesarios para realizar la preinscripción.",
    icono: <ClipboardCheck />,
  },
  {
    numero: "04",
    titulo: "Confirmar",
    descripcion: "Recibí la confirmación de tu preinscripción.",
    icono: <CheckCircle />,
  },
];

const ComoFunciona = () => {
  return (
    <section
      id="como-funciona"
      style={{
        backgroundColor: "#f8fafc",
        padding: "90px 0",
      }}
    >
      <Container>
        <div
          className="text-center mx-auto"
          style={{
            maxWidth: "720px",
            marginBottom: "60px",
          }}
        >
          <span
            style={{
              color: "#1D4E89",
              fontSize: "0.8rem",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            CÓMO FUNCIONA
          </span>

          <h2
            className="fw-bold mt-3 mb-3"
            style={{
              color: "#0A2540",
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
            }}
          >
            Un proceso simple, de principio a fin.
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#64748B",
              lineHeight: "1.7",
              fontSize: "1.05rem",
            }}
          >
            Encontrá la institución que buscás, conocé sus opciones y completá
            tu preinscripción de manera rápida y sencilla.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {pasos.map((paso, index) => (
            <Col key={paso.numero} xs={12} sm={6} lg={3}>
              <div
                className="h-100 text-center position-relative"
                style={{
                  padding: "10px 15px 30px",
                }}
              >
                <div
                  className="mx-auto d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "90px",
                    height: "90px",
                    backgroundColor: "#ffffff",
                    border: "2px solid #dbe7f3",
                    color: "#1D4E89",
                    fontSize: "1.15rem",
                    fontWeight: "700",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {paso.numero}
                </div>

                <div
                  className="mx-auto d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "46px",
                    height: "46px",
                    backgroundColor: "#EAF3FB",
                    color: "#1D4E89",
                    fontSize: "1.15rem",
                    marginTop: "-8px",
                    position: "relative",
                    zIndex: 3,
                  }}
                >
                  {paso.icono}
                </div>

                <div
                  style={{
                    maxWidth: "230px",
                    margin: "25px auto 0",
                  }}
                >
                  <h3
                    className="fw-bold mb-2"
                    style={{
                      color: "#0A2540",
                      fontSize: "1.25rem",
                    }}
                  >
                    {paso.titulo}
                  </h3>

                  <p
                    className="mb-0"
                    style={{
                      color: "#64748B",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {paso.descripcion}
                  </p>
                </div>

                {index < pasos.length - 1 && (
                  <div
                    className="d-none d-lg-block"
                    style={{
                      position: "absolute",
                      top: "45px",
                      right: "-10px",
                      color: "#5BC0EB",
                      fontSize: "1rem",
                    }}
                  >
                    <ArrowRight />
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5 pt-3">
          <p
            className="mb-3"
            style={{
              color: "#64748B",
              fontSize: "0.95rem",
            }}
          >
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ComoFunciona;
