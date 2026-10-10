import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  GeoAlt,
  ArrowRight,
  Building,
  Puzzle,
  Backpack,
  Mortarboard,
  CheckCircleFill,
  XCircleFill,
} from "react-bootstrap-icons";

const NIVELES = {
  Inicial: {
    Icono: Puzzle,
    gradiente: "linear-gradient(135deg, #1D4E89 0%, #5BC0EB 100%)",
  },
  Primario: {
    Icono: Backpack,
    gradiente: "linear-gradient(135deg, #0A2540 0%, #1D4E89 100%)",
  },
  Secundario: {
    Icono: Mortarboard,
    gradiente: "linear-gradient(135deg, #000F22 0%, #0A2540 60%, #325F9B 100%)",
  },
};
const GRADIENTE_MIXTO =
  "linear-gradient(135deg, #0A2540 0%, #1D4E89 55%, #5BC0EB 100%)";

const PATRON = `
  radial-gradient(circle at 15% 20%, rgba(255,255,255,.22) 0, transparent 38%),
  radial-gradient(circle at 88% 85%, rgba(91,192,235,.45) 0, transparent 42%),
  repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 2px, transparent 2px 14px)`;
const OVERLAY_FOTO =
  "linear-gradient(180deg, rgba(10,37,64,.5) 0%, rgba(10,37,64,.15) 50%, rgba(10,37,64,.4) 100%)";

const CAPA = "position-absolute top-0 start-0 w-100 h-100";
const MARCA_AGUA = {
  right: -6,
  bottom: -14,
  opacity: 0.16,
  transform: "rotate(-10deg)",
  pointerEvents: "none",
};
const cuadrado = (px) => ({ width: px, height: px });

const DOS_LINEAS = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  minHeight: "2.7em",
};

const PALABRAS_GENERICAS = new Set([
  "escuela",
  "jardín",
  "jardin",
  "colegio",
  "instituto",
  "primaria",
  "secundaria",
  "infantes",
  "de",
  "del",
  "la",
  "las",
  "los",
  "el",
  "y",
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

const TarjetaEscuela = ({ escuela }) => {
  const {
    id,
    nombre,
    localidad,
    gestion,
    abierta,
    niveles = [],
    vacantes,
    imagen,
  } = escuela;

  const unNivel = niveles.length === 1 ? NIVELES[niveles[0]] : null;
  const gradiente = unNivel ? unNivel.gradiente : GRADIENTE_MIXTO;
  const IconoPortada = unNivel ? unNivel.Icono : Building;
  const mostrarVacantes = abierta && typeof vacantes === "number";

  return (
    <Card as="article" className="card-hover h-100 overflow-hidden">
      <div className="position-relative">
        <div
          className="position-relative overflow-hidden text-white"
          style={{ height: 140, background: gradiente }}
        >
          {imagen ? (
            <>
              <img
                className={`${CAPA} object-fit-cover`}
                src={imagen}
                alt=""
                loading="lazy"
              />
              <div className={CAPA} style={{ background: OVERLAY_FOTO }} />
            </>
          ) : (
            <>
              <div className={CAPA} style={{ backgroundImage: PATRON }} />
              <IconoPortada
                className="position-absolute"
                size={120}
                style={MARCA_AGUA}
                aria-hidden="true"
              />
            </>
          )}

          <div className="position-absolute top-0 start-0 end-0 p-3 d-flex flex-wrap justify-content-between align-items-start gap-2">
            <Badge
              pill
              bg={abierta ? "success" : "secondary"}
              className="d-inline-flex align-items-center gap-1"
            >
              {abierta ? (
                <CheckCircleFill size={11} aria-hidden="true" />
              ) : (
                <XCircleFill size={11} aria-hidden="true" />
              )}
              {abierta ? "Preinscripción abierta" : "Preinscripción cerrada"}
            </Badge>

            <Badge pill bg="light" text="primary" className="text-uppercase">
              {gestion}
            </Badge>
          </div>
        </div>
        <div
          className="position-absolute start-0 ms-3 d-flex align-items-center justify-content-center bg-white text-primary fw-bold rounded-4 border shadow-sm"
          style={{ ...cuadrado(56), bottom: -28, fontSize: "1.125rem" }}
          aria-hidden="true"
        >
          {obtenerIniciales(nombre)}
        </div>
      </div>

      <Card.Body className="d-flex flex-column pt-5">
        <Card.Title as="h3" className="h5" style={DOS_LINEAS}>
          <Link
            to={`/escuelas/${id}`}
            className="stretched-link text-reset text-decoration-none"
          >
            {nombre}
          </Link>
        </Card.Title>

        <p className="d-flex align-items-center gap-2 small text-secondary mb-3">
          <GeoAlt aria-hidden="true" />
          {localidad}
        </p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {niveles.map((nivel) => {
            const Icono = NIVELES[nivel]?.Icono;
            return (
              <Badge
                key={nivel}
                pill
                bg="primary-subtle"
                text="primary-emphasis"
                className="d-inline-flex align-items-center gap-1 border border-primary-subtle"
              >
                {Icono && <Icono size={12} aria-hidden="true" />}
                {nivel}
              </Badge>
            );
          })}
        </div>

        {mostrarVacantes && (
          <div className="d-flex align-items-baseline gap-2 mt-auto">
            {vacantes > 0 ? (
              <>
                <span className="fs-3 fw-bold lh-1 text-success tabular">
                  {vacantes}
                </span>
                <span className="small text-secondary">
                  {vacantes === 1
                    ? "vacante disponible"
                    : "vacantes disponibles"}
                </span>
              </>
            ) : (
              <span className="small fw-semibold text-info">
                Solo lista de espera
              </span>
            )}
          </div>
        )}
      </Card.Body>

      <Card.Footer className="bg-light d-flex flex-wrap align-items-center justify-content-between gap-2">
        <span
          className="d-inline-flex align-items-center gap-2 small fw-semibold text-primary"
          aria-hidden="true"
        >
          Ver institución <ArrowRight />
        </span>

        {abierta && (
          <Button
            as={Link}
            to={`/familia/preinscripcion/nueva?escuela=${id}`}
            size="sm"
            className="btn-cta position-relative z-2"
          >
            Preinscribirse
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default TarjetaEscuela;
