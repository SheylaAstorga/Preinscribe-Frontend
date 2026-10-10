
import {
  Card,
  Form,
  Button,
  Accordion,
} from "react-bootstrap";

import { Sliders } from "react-bootstrap-icons";

const FiltrosEscuelas = ({
  localidad,
  gestion,
  nivel,
  estado,
  onLocalidadChange,
  onGestionChange,
  onNivelChange,
  onEstadoChange,
  onLimpiar,
  hayFiltrosActivos,
}) => {
  return (
    <Card className="panel-filtros">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="titulo-filtros mb-0">
            <Sliders className="me-2" />
            Filtros
          </h2>

          {hayFiltrosActivos && (
            <Button
              variant="link"
              className="p-0 limpiar-enlace"
              onClick={onLimpiar}
            >
              Limpiar
            </Button>
          )}
        </div>

        <Accordion
          defaultActiveKey={["0", "1", "2", "3"]}
          alwaysOpen
          flush
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Localidad</Accordion.Header>

            <Accordion.Body>
              <Form.Select
                value={localidad}
                onChange={(e) => onLocalidadChange(e.target.value)}
                aria-label="Filtrar por localidad"
              >
                <option value="">Todas las localidades</option>
                <option value="San Miguel de Tucumán">
                  San Miguel de Tucumán
                </option>
                <option value="Yerba Buena">Yerba Buena</option>
                <option value="Tafí Viejo">Tafí Viejo</option>
                <option value="Banda del Río Salí">
                  Banda del Río Salí
                </option>
              </Form.Select>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Tipo de gestión</Accordion.Header>

            <Accordion.Body>
              {["Pública", "Privada"].map((opcion) => (
                <Form.Check
                  key={opcion}
                  type="radio"
                  name="gestion"
                  label={opcion}
                  value={opcion}
                  checked={gestion === opcion}
                  onChange={() => onGestionChange(opcion)}
                  className="mb-2"
                />
              ))}

              <Button
                variant="link"
                className="p-0 limpiar-enlace"
                onClick={() => onGestionChange("")}
              >
                Todas
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Nivel educativo</Accordion.Header>

            <Accordion.Body>
              {["Inicial", "Primario", "Secundario"].map((opcion) => (
                <Form.Check
                  key={opcion}
                  type="radio"
                  name="nivel"
                  label={opcion}
                  value={opcion}
                  checked={nivel === opcion}
                  onChange={() => onNivelChange(opcion)}
                  className="mb-2"
                />
              ))}

              <Button
                variant="link"
                className="p-0 limpiar-enlace"
                onClick={() => onNivelChange("")}
              >
                Todos los niveles
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Preinscripción</Accordion.Header>

            <Accordion.Body>
              {[
                { valor: "abierta", texto: "Abierta" },
                { valor: "cerrada", texto: "Cerrada" },
              ].map((opcion) => (
                <Form.Check
                  key={opcion.valor}
                  type="radio"
                  name="estado"
                  label={opcion.texto}
                  value={opcion.valor}
                  checked={estado === opcion.valor}
                  onChange={() => onEstadoChange(opcion.valor)}
                  className="mb-2"
                />
              ))}

              <Button
                variant="link"
                className="p-0 limpiar-enlace"
                onClick={() => onEstadoChange("")}
              >
                Todos los estados
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default FiltrosEscuelas;