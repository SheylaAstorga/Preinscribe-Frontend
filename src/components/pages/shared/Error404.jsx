import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
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
  { to: "/escuelas", Icono: Search, titulo: "Escuelas", texto: "Buscar una escuela" },
  { to: "/#como-funciona", Icono: QuestionCircle, titulo: "Cómo funciona", texto: "Los 3 pasos" },
  { to: "/login", Icono: BoxArrowInRight, titulo: "Ingresar", texto: "Acceder a mi cuenta" },
];

const estilos = `
.e404-pagina {
  min-height: 70vh;
  background-color: #F8FAFC;
  background-image: radial-gradient(rgba(29, 78, 137, .1) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
}
.e404-numero {
  gap: .04em;
  color: #0A2540;
  font-size: clamp(5.5rem, 22vw, 11rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -.04em;
}
.e404-numero > span:last-child { color: #1D4E89; }
.e404-cero {
  width: .82em;
  height: .82em;
  border-radius: 50%;
  background: linear-gradient(135deg, #1D4E89 0%, #5BC0EB 100%);
  box-shadow: 0 .08em .2em rgba(10, 37, 64, .25), inset 0 0 0 .06em rgba(255, 255, 255, .25);
  color: #fff;
  animation: e404-balanceo 3.5s ease-in-out infinite;
}
@keyframes e404-balanceo {
  0%, 100% { transform: rotate(-6deg); }
  50% { transform: rotate(6deg); }
}
.e404-atajo { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
.e404-atajo:hover {
  transform: translateY(-3px);
  border-color: #5BC0EB;
  box-shadow: 0 8px 16px rgba(10, 37, 64, .1);
}
.e404-burbuja { width: 44px; height: 44px; }
@media (prefers-reduced-motion: reduce) {
  .e404-cero { animation: none; }
  .e404-atajo { transition: none; }
  .e404-atajo:hover { transform: none; }
}
`;

const Error404 = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <style>{estilos}</style>

      <section className="e404-pagina d-flex align-items-center py-5">
        <Container>
          <div className="text-center">
            <div
              className="e404-numero d-inline-flex align-items-center justify-content-center"
              role="img"
              aria-label="Error 404"
            >
              <span>4</span>
              <span className="e404-cero d-inline-flex align-items-center justify-content-center">
                <Mortarboard size="0.5em" />
              </span>
              <span>4</span>
            </div>

            <h1 className="h2 mt-3 mb-2">Esta página se fue de recreo</h1>

            <p className="lead text-secondary mx-auto mb-3" style={{ maxWidth: 520 }}>
              No encontramos lo que buscabas. Puede que el enlace esté mal escrito o que la
              página ya no exista.
            </p>

            <Badge bg="light" text="dark" className="border fw-normal px-3 py-2 text-break">
              <span className="text-secondary">Dirección buscada: </span>
              <code>{pathname}</code>
            </Badge>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-4">
              <Button as={Link} to="/" size="lg">
                <House aria-hidden="true" className="me-lg-2 m-md-0" />
                Ir al inicio
              </Button>

              <Button variant="outline-primary" size="lg" onClick={() => navigate(-1)}>
                <ArrowLeft aria-hidden="true" />
                Volver atrás
              </Button>
            </div>
          </div>

          <p className="text-center text-secondary small text-uppercase fw-semibold mt-5 mb-3">
            O andá directo a
          </p>

          <Row xs={1} sm={2} lg={4} className="g-3">
            {ATAJOS.map(({ to, Icono, titulo, texto }) => (
              <Col key={to}>
                <Card
                  as={Link}
                  to={to}
                  className="e404-atajo h-100 text-decoration-none text-reset"
                >
                  <Card.Body className="d-flex align-items-center gap-3">
                    <span className="e404-burbuja d-flex align-items-center justify-content-center flex-shrink-0 rounded-3 bg-primary-subtle text-primary-emphasis">
                      <Icono size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="fw-semibold mb-0">{titulo}</p>
                      <p className="small text-secondary mb-0">{texto}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Error404;