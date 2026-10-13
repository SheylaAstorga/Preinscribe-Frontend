import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Badge,
  Alert,
  ListGroup,
  Stack,
} from "react-bootstrap";
import {
  ArrowLeft,
  GeoAlt,
  Building,
  Mortarboard,
  Puzzle,
  Backpack,
  Signpost,
  Telephone,
  Envelope,
  CheckCircleFill,
  XCircleFill,
  InfoCircle,
} from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import { escuelasEjemplo } from "../../../data/escuelasEjemplo";


const NIVELES = {
  Inicial: {
    Icono: Puzzle,
    detalle: "Salas de 3 a 5 años",
    gradiente: "linear-gradient(135deg, #1D4E89 0%, #5BC0EB 100%)",
    burbuja: "bg-info-subtle text-info-emphasis",
  },
  Primario: {
    Icono: Backpack,
    detalle: "1.º a 6.º grado",
    gradiente: "linear-gradient(135deg, #0A2540 0%, #1D4E89 100%)",
    burbuja: "bg-primary-subtle text-primary-emphasis",
  },
  Secundario: {
    Icono: Mortarboard,
    detalle: "1.º a 6.º año",
    gradiente: "linear-gradient(135deg, #000F22 0%, #0A2540 60%, #325F9B 100%)",
    burbuja: "bg-primary text-white",
  },
};
const GRADIENTE_MIXTO = "linear-gradient(135deg, #0A2540 0%, #1D4E89 55%, #5BC0EB 100%)";

const PATRON = `
  radial-gradient(circle at 12% 15%, rgba(255,255,255,.2) 0, transparent 35%),
  radial-gradient(circle at 90% 90%, rgba(91,192,235,.4) 0, transparent 40%),
  repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 2px, transparent 2px 16px)`;
const OVERLAY_FOTO = "linear-gradient(180deg, rgba(10,37,64,.55) 0%, rgba(10,37,64,.8) 100%)";

const CAPA = "position-absolute top-0 start-0 w-100 h-100"; 
const MARCA_AGUA = { right: "4%", bottom: -40, opacity: 0.12, transform: "rotate(-10deg)", pointerEvents: "none" };
const cuadrado = (px) => ({ width: px, height: px });

const DOCUMENTOS = [
  { nombre: "DNI del alumno", obligatorio: true },
  { nombre: "Partida de nacimiento", obligatorio: true },
  { nombre: "DNI del tutor", obligatorio: false },
  { nombre: "Certificado de nivel anterior", obligatorio: false },
  { nombre: "Libreta de vacunación", obligatorio: false },
];

const PASOS = [
  "Ingresá o creá tu cuenta",
  "Elegí al alumno y el grado",
  "Adjuntá la documentación",
  "Enviá la solicitud y seguila desde tu panel",
];

const PALABRAS_GENERICAS = new Set([
  "escuela", "jardín", "jardin", "colegio", "instituto", "primaria", "secundaria",
  "infantes", "de", "del", "la", "las", "los", "el", "y",
]);

function obtenerIniciales(nombre) {
  const palabras = nombre
    .replace(/\bN\s?[°º]\s*\d+/gi, "")
    .split(/\s+/)
    .filter((p) => p && !PALABRAS_GENERICAS.has(p.toLowerCase()));

  if (palabras.length === 0) return nombre.slice(0, 2).toUpperCase();
  if (palabras.length === 1) {
    const p = palabras[0];
    return p[0].toUpperCase() + (p[1] ?? "").toLowerCase();
  }
  return (palabras[0][0] + palabras[1][0]).toUpperCase();
}

const Seccion = ({ Icono, titulo, children }) => (
  <Card>
    <Card.Body className="p-4">
      <h2 className="h4 d-flex align-items-center gap-2 mb-4">
        <Icono size={20} className="text-primary" aria-hidden="true" />
        {titulo}
      </h2>
      {children}
    </Card.Body>
  </Card>
);

const Dato = ({ Icono, etiqueta, children }) => (
  <Col>
    <div className="d-flex align-items-start gap-3 p-3 border rounded-3 bg-light h-100">
      <span
        className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3 bg-primary-subtle text-primary-emphasis"
        style={cuadrado(40)}
      >
        <Icono size={20} aria-hidden="true" />
      </span>
      <div>
        <p className="label-sm text-secondary text-uppercase mb-1">{etiqueta}</p>
        <div className="fw-semibold text-break">{children}</div>
      </div>
    </div>
  </Col>
);

const DetalleEscuela = () => {
  const { id } = useParams();
  const escuela = escuelasEjemplo.find((item) => String(item.id) === id);

  if (!escuela) {
    return (
      <main className="py-5">
        <Container>
          <Card className="text-center mx-auto" style={{ maxWidth: 520 }}>
            <Card.Body className="p-4 p-md-5">
              <span
                className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-4 bg-primary-subtle text-primary-emphasis"
                style={cuadrado(72)}
              >
                <Building size={32} aria-hidden="true" />
              </span>
              <h1 className="h2 mb-2">Institución no encontrada</h1>
              <p className="text-secondary mb-4">
                No encontramos una escuela con ese identificador. Puede que el enlace esté
                incompleto o que la institución ya no figure en la plataforma.
              </p>
              <Button as={Link} to="/escuelas">
                <ArrowLeft aria-hidden="true" />
                Volver a escuelas
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </main>
    );
  }

  const {
    nombre,
    localidad,
    gestion,
    abierta,
    niveles = [],
    vacantes,
    imagen,
    direccion,
    telefono,
    email,
  } = escuela;

  const unNivel = niveles.length === 1 ? NIVELES[niveles[0]] : null;
  const gradiente = unNivel ? unNivel.gradiente : GRADIENTE_MIXTO;
  const IconoHero = unNivel ? unNivel.Icono : Building;
  const mostrarVacantes = abierta && typeof vacantes === "number";

  return (
    <main className="pb-5">
      <header
        data-bs-theme="dark"
        className="position-relative overflow-hidden text-white pt-3"
        style={{ background: gradiente, paddingBottom: "5.5rem" }}
      >
        {imagen ? (
          <>
            <img className={`${CAPA} object-fit-cover`} src={imagen} alt="" />
            <div className={CAPA} style={{ background: OVERLAY_FOTO }} />
          </>
        ) : (
          <>
            <div className={CAPA} style={{ backgroundImage: PATRON }} />
            <IconoHero className="position-absolute" size={280} style={MARCA_AGUA} aria-hidden="true" />
          </>
        )}

        <Container className="position-relative z-1">
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/escuelas" }}>
              Escuelas
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{nombre}</Breadcrumb.Item>
          </Breadcrumb>

          <div className="d-flex align-items-center flex-wrap gap-3 gap-md-4 mt-3">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 bg-white text-primary fw-bold rounded-4 shadow"
              style={{ ...cuadrado(80), fontSize: "1.75rem" }}
              aria-hidden="true"
            >
              {obtenerIniciales(nombre)}
            </div>

            <div>
              <div className="d-flex flex-wrap gap-2">
                <span className={`chip ${abierta ? "chip-aprobada" : "chip-pendiente"}`}>
                  {abierta ? "Preinscripción abierta" : "Preinscripción cerrada"}
                </span>
                <Badge pill bg="light" text="primary" className="text-uppercase">
                  {gestion}
                </Badge>
              </div>

              <h1 className="text-white mt-3 mb-2">{nombre}</h1>

              <p className="d-flex align-items-center gap-2 mb-0">
                <GeoAlt aria-hidden="true" />
                {localidad}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <Container className="position-relative z-2" style={{ marginTop: "-3rem" }}>
        <Row className="g-4">

          <Col lg={4} className="order-1 order-lg-2">
            <aside className="sticky-lg-top" style={{ top: 88 }} aria-label="Preinscripción">
              <Card>
                <Card.Body className="p-4">
                  {abierta ? (
                    <CheckCircleFill size={36} className="text-success mb-3" aria-hidden="true" />
                  ) : (
                    <XCircleFill size={36} className="text-secondary mb-3" aria-hidden="true" />
                  )}

                  <h2 className="h4">
                    {abierta ? "Preinscripción abierta" : "Preinscripción cerrada"}
                  </h2>

                  <p className="text-secondary mb-0">
                    {abierta
                      ? "Ya podés iniciar la preinscripción de tu hijo/a en esta institución."
                      : "Esta institución no recibe solicitudes por el momento."}
                  </p>

                  {mostrarVacantes && (
                    <div className="d-flex align-items-baseline gap-2 my-3">
                      {vacantes > 0 ? (
                        <>
                          <span className="fs-1 fw-bold lh-1 text-success tabular">{vacantes}</span>
                          <span className="text-secondary">
                            {vacantes === 1 ? "vacante disponible" : "vacantes disponibles"}
                          </span>
                        </>
                      ) : (
                        <span className="text-info fw-semibold">Solo lista de espera</span>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    {abierta ? (
                      <Button
                        as={Link}
                        to={`/familia/preinscripcion/nueva?escuela=${escuela.id}`}
                        size="lg"
                        className="btn-cta w-100"
                        style={{backgroundColor:"var(--pi-amber)", borderColor: "var(--pi-amber-hover)"}}
                      >
                        Preinscribir a mi hijo/a
                      </Button>
                    ) : (
                      <Button variant="outline-primary" size="lg" className="w-100" disabled>
                        Preinscripción cerrada
                      </Button>
                    )}
                  </div>

                  {abierta && (
                    <ListGroup as="ol" numbered variant="flush" className="small mt-4">
                      {PASOS.map((paso) => (
                        <ListGroup.Item as="li" key={paso} className="px-0 text-secondary">
                          {paso}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}

                  <Alert variant="primary" className="d-flex gap-2 small mb-0 mt-3">
                    <InfoCircle className="flex-shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      {abierta
                        ? "Tené a mano el DNI del alumno y su partida de nacimiento: son obligatorios."
                        : "Podés consultar nuevamente más adelante para conocer futuras convocatorias."}
                    </span>
                  </Alert>
                </Card.Body>
              </Card>
            </aside>
          </Col>

          <Col lg={8} className="order-2 order-lg-1">
            <Stack gap={4}>
              <Seccion Icono={Building} titulo="Datos de la institución">
                <Row xs={1} sm={2} className="g-3">
                  <Dato Icono={Building} etiqueta="Tipo de gestión">
                    {gestion}
                  </Dato>
                  <Dato Icono={GeoAlt} etiqueta="Localidad">
                    {localidad}
                  </Dato>
                  {direccion && (
                    <Dato Icono={Signpost} etiqueta="Dirección">
                      {direccion}
                    </Dato>
                  )}
                  {telefono && (
                    <Dato Icono={Telephone} etiqueta="Teléfono">
                      <a href={`tel:${telefono}`} className="link-body-emphasis text-decoration-none">
                        {telefono}
                      </a>
                    </Dato>
                  )}
                  {email && (
                    <Dato Icono={Envelope} etiqueta="Email">
                      <a href={`mailto:${email}`} className="link-body-emphasis text-decoration-none">
                        {email}
                      </a>
                    </Dato>
                  )}
                </Row>
              </Seccion>

              <Seccion Icono={Mortarboard} titulo="Niveles educativos">
                <Stack gap={3}>
                  {niveles.map((nivel) => {
                    const config = NIVELES[nivel];
                    const Icono = config?.Icono ?? Mortarboard;
                    return (
                      <div key={nivel} className="d-flex align-items-center gap-3 p-3 border rounded-3">
                        <span
                          className={`d-flex align-items-center justify-content-center flex-shrink-0 rounded-3 ${
                            config?.burbuja ?? "bg-primary-subtle text-primary-emphasis"
                          }`}
                          style={cuadrado(48)}
                        >
                          <Icono size={24} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="h5 mb-0">Nivel {nivel}</h3>
                          {config && <p className="small text-secondary mb-0">{config.detalle}</p>}
                        </div>
                      </div>
                    );
                  })}
                </Stack>
              </Seccion>

              <Seccion Icono={InfoCircle} titulo="Documentación para preinscribir">
                <Row xs={1} md={2} className="g-2">
                  {DOCUMENTOS.map((doc) => (
                    <Col key={doc.nombre}>
                      <div className="d-flex justify-content-between align-items-center gap-2 border rounded-3 px-3 py-2">
                        <span>{doc.nombre}</span>
                        <Badge
                          pill
                          bg={doc.obligatorio ? "warning-subtle" : "secondary-subtle"}
                          text={doc.obligatorio ? "warning-emphasis" : "secondary-emphasis"}
                          className="text-uppercase flex-shrink-0"
                        >
                          {doc.obligatorio ? "Obligatorio" : "Opcional"}
                        </Badge>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Seccion>
            </Stack>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default DetalleEscuela;