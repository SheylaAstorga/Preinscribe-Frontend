
import {
  Card,
  Badge,
  Button,
} from "react-bootstrap";

import {
  GeoAlt,
  Building,
  ArrowRight,
  Mortarboard,
} from "react-bootstrap-icons";

const TarjetaEscuela = ({ escuela }) => {
  return (
    <Card className="tarjeta-escuela h-100">
      <Card.Body className="d-flex flex-column p-3">
        <div className="icono-escuela mb-3">
          <Mortarboard size={27} />
        </div>

        <div className="mb-2">
          <Badge
            bg={escuela.gestion === "Pública" ? "primary" : "secondary"}
            className="me-1"
          >
            {escuela.gestion}
          </Badge>

          <Badge bg={escuela.abierta ? "success" : "light"} text={escuela.abierta ? undefined : "dark"}>
            {escuela.abierta
              ? "Preinscripción abierta"
              : "Preinscripción cerrada"}
          </Badge>
        </div>

        <Card.Title className="nombre-escuela">
          {escuela.nombre}
        </Card.Title>

        <Card.Text className="ubicacion-escuela">
          <GeoAlt className="me-2" />
          {escuela.localidad}
        </Card.Text>

        <div className="mb-3">
          <p className="etiqueta-niveles mb-2">
            Niveles educativos
          </p>

          <div className="d-flex flex-wrap gap-1">
            {escuela.niveles.map((nivel) => (
              <Badge
                key={nivel}
                bg="light"
                text="dark"
                className="etiqueta-nivel"
              >
                {nivel}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-3 border-top">
          <Button
            variant="link"
            style={{ backgroundColor: "var(--pi-amber)" }}
            className="boton-detalle p-1 text-decoration-none text-white  w-100 d-flex align-items-center justify-content-between"
            onClick={() =>
              console.log("Ver institución:", escuela.id)
            }
          >
            Ver institución
            <ArrowRight />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TarjetaEscuela;
