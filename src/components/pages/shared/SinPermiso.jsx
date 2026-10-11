import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import {
  LockFill,
  House,
  BoxArrowInRight,
  ArrowLeft,
} from "react-bootstrap-icons";

const OPCIONES = [
  "Volver al inicio y seguir navegando por la plataforma.",
  "Ingresar con otra cuenta que tenga acceso a esta sección.",
  "Si creés que es un error, comunicate con el administrador de tu escuela.",
];

const FONDO = {
  minHeight: "70vh",
  backgroundImage:
    "radial-gradient(circle at 90% 8%, rgba(245,165,36,.14) 0, transparent 32%), radial-gradient(rgba(29,78,137,.1) 1.5px, transparent 1.5px)",
  backgroundSize: "auto, 24px 24px",
};
const NUMERO = { fontSize: "clamp(5.5rem, 22vw, 11rem)" };
const CIRCULO = { width: ".82em", height: ".82em" };
const HALO = { width: "150%", height: "150%" };

const SinPermiso = () => {
  const navigate = useNavigate();

  return (
    <section
      className="d-flex align-items-center bg-body-tertiary py-5"
      style={FONDO}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={10} lg={8} xl={7}>
            <Badge
              pill
              bg="warning-subtle"
              text="warning-emphasis"
              className="border border-warning-subtle text-uppercase px-3 py-2 mb-3"
            >
              Acceso restringido
            </Badge>

            <div
              className="d-flex align-items-center justify-content-center gap-1 fw-bold lh-1 text-primary"
              style={NUMERO}
              role="img"
              aria-label="Error 403"
            >
              <span>4</span>

              <span
                className="position-relative d-inline-flex align-items-center justify-content-center"
                style={CIRCULO}
              >
                <Spinner
                  animation="grow"
                  variant="warning"
                  className="position-absolute"
                  style={HALO}
                  aria-hidden="true"
                />
                <span className="position-relative z-1 d-flex align-items-center justify-content-center w-100 h-100 rounded-circle bg-warning text-primary shadow">
                  <LockFill size="0.45em" />
                </span>
              </span>

              <span className="text-primary-emphasis">3</span>
            </div>

            <h1 className="h2 mt-3 mb-2">
              Esta sección tiene la puerta cerrada
            </h1>

            <p className="lead text-secondary mb-4">
              Tu cuenta no tiene permiso para ver esta página, o necesitás
              iniciar sesión para continuar.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
              <Button as={Link} to="/" size="sm" className="w-auto">
                <House aria-hidden="true" className="me-2" />
                Ir al inicio
              </Button>

              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                size="sm"
                className="w-auto"
              >
                <BoxArrowInRight aria-hidden="true" className="me-2" />
                Ingresar con otra cuenta
              </Button>
            </div>

            <Button
              variant="link"
              className="text-decoration-none mt-2 "
              onClick={() => navigate(-1)}
            >
              <ArrowLeft aria-hidden="true" />
              Volver a la página anterior
            </Button>

            <Card className="mt-4 text-start">
              <Card.Body>
                <h2 className="h6 mb-2">¿Qué podés hacer?</h2>
                <ListGroup as="ol" numbered variant="flush" className="small">
                  {OPCIONES.map((texto) => (
                    <ListGroup.Item
                      as="li"
                      key={texto}
                      className="px-0 text-secondary"
                    >
                      {texto}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SinPermiso;
