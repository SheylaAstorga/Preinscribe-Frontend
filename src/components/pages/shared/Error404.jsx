import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, ListGroup, Button, Badge, Spinner } from "react-bootstrap";
import {
  Mortarboard,
  House,
  Search,
  QuestionCircle,
  BoxArrowInRight,
  ArrowLeft,
} from "react-bootstrap-icons";

const ATAJOS = [
  { to: "/", Icono: House, titulo: "Inicio", texto: "Volver al comienzo" },
  {
    to: "/escuelas",
    Icono: Search,
    titulo: "Escuelas",
    texto: "Buscar una escuela",
  },
  {
    to: "/#como-funciona",
    Icono: QuestionCircle,
    titulo: "Cómo funciona",
    texto: "Los 3 pasos",
  },
  {
    to: "/login",
    Icono: BoxArrowInRight,
    titulo: "Ingresar",
    texto: "Acceder a mi cuenta",
  },
];

const FONDO = {
  minHeight: "70vh",
  backgroundImage:
    "radial-gradient(rgba(29,78,137,.1) 1.5px, transparent 1.5px)",
  backgroundSize: "24px 24px",
};
const NUMERO = { fontSize: "clamp(5.5rem, 22vw, 11rem)" };
const CIRCULO = {
  width: "0.8em",
  height: "0.8em",
};
const HALO = { width: "150%", height: "150%" };
const BURBUJA = { width: 44, height: 44 };

const Error404 = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section
      className="d-flex align-items-center bg-body-tertiary py-5"
      style={FONDO}
    >
      <Container>
        <div className="text-center">
          <div
            className="d-inline-flex align-items-center justify-content-center gap-1 fw-bold lh-1 text-primary"
            style={NUMERO}
            role="img"
            aria-label="Error 404"
          >
            <span>4</span>

            <span
              className="position-relative d-inline-flex align-items-center justify-content-center"
              style={CIRCULO}
            >
              <Spinner
                animation="grow"
                variant="info"
                className="position-absolute"
                style={HALO}
                aria-hidden="true"
              />
              <span className="position-relative z-1 d-flex align-items-center justify-content-center w-100 h-100 rounded-circle bg-primary text-white shadow">
                <Mortarboard size="0.5em" />
              </span>
            </span>

            <span className="text-primary-emphasis">4</span>
          </div>

          <h1 className="h2 mt-3 mb-2">Esta página se fue de recreo</h1>

          <p className="lead text-secondary mb-3">
            No encontramos lo que buscabas. Puede que el enlace esté mal escrito
            o que la página ya no exista.
          </p>

          <Badge
            bg="light"
            text="dark"
            className="border fw-normal px-3 py-2 text-break"
          >
            <span className="text-secondary">Dirección buscada: </span>
            <code>{pathname}</code>
          </Badge>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2 mt-4">
            <Button as={Link} to="/" size="sm" className="w-auto">
              <House aria-hidden="true" className="me-2" />
              Ir al inicio
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              className="w-auto"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft aria-hidden="true" className="me-2" />
              Volver atrás
            </Button>
          </div>
        </div>

        <p className="text-center text-secondary small text-uppercase fw-semibold mt-5 mb-3">
          O andá directo a
        </p>

        <ListGroup horizontal="lg" className="shadow-sm">
          {ATAJOS.map(({ to, Icono, titulo, texto }) => (
            <ListGroup.Item
              key={to}
              action
              as={Link}
              to={to}
              className="d-flex align-items-center gap-3 flex-fill py-3"
            >
              <span
                className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3 bg-primary-subtle text-primary-emphasis"
                style={BURBUJA}
              >
                <Icono size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="fw-semibold mb-0">{titulo}</p>
                <p className="small text-secondary mb-0">{texto}</p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </section>
  );
};

export default Error404;
