import { useState } from "react";
import {
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
  Offcanvas,
  Badge,
} from "react-bootstrap";
import {
  Sliders,
  X,
  Puzzle,
  Backpack,
  Mortarboard,
} from "react-bootstrap-icons";

const LOCALIDADES = [
  "San Miguel de Tucumán",
  "Yerba Buena",
  "Tafí Viejo",
  "Banda del Río Salí",
];

const MAX_LOCALIDADES_EN_PILDORAS = 6;

const GESTION = [
  { valor: "", texto: "Todas" },
  { valor: "Pública", texto: "Pública" },
  { valor: "Privada", texto: "Privada" },
];

const ESTADOS = [
  { valor: "", texto: "Todas" },
  { valor: "abierta", texto: "Abierta" },
  { valor: "cerrada", texto: "Cerrada" },
];

const NIVELES = [
  { valor: "", texto: "Todos" },
  { valor: "Inicial", texto: "Inicial", Icono: Puzzle },
  { valor: "Primario", texto: "Primario", Icono: Backpack },
  { valor: "Secundario", texto: "Secundario", Icono: Mortarboard },
];

const ALTURA_NAVBAR = 96;
const TOP_STICKY = ALTURA_NAVBAR + 16;

const estilos = `
@media (min-width: 992px) {
  .ff-panel {
    padding: 1.25rem;
    border: 1px solid var(--pi-border, #E2E8F0);
    border-radius: 12px;
    background: #fff;
    box-shadow: var(--pi-shadow-1, 0 1px 3px rgba(10, 37, 64, .06));
  }
}
`;

const Grupo = ({ etiqueta, children }) => (
  <fieldset className="mb-4">
    <legend className="label-sm text-secondary text-uppercase mb-2">
      {etiqueta}
    </legend>
    {children}
  </fieldset>
);

const Segmentado = ({ nombre, valor, opciones, onChange }) => (
  <ButtonGroup className="w-100">
    {opciones.map((op) => (
      <ToggleButton
        key={op.valor || "todos"}
        id={`${nombre}-${op.valor || "todos"}`}
        type="radio"
        variant="outline-primary"
        name={nombre}
        value={op.valor}
        checked={valor === op.valor}
        onChange={() => onChange(op.valor)}
      >
        {op.texto}
      </ToggleButton>
    ))}
  </ButtonGroup>
);

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
  totalResultados,
  localidades = LOCALIDADES,
}) => {
  const [show, setShow] = useState(false);

  const activos = [
    localidad && {
      clave: "localidad",
      texto: localidad,
      quitar: () => onLocalidadChange(""),
    },
    gestion && {
      clave: "gestion",
      texto: `Gestión ${gestion.toLowerCase()}`,
      quitar: () => onGestionChange(""),
    },
    nivel && {
      clave: "nivel",
      texto: `Nivel ${nivel.toLowerCase()}`,
      quitar: () => onNivelChange(""),
    },
    estado && {
      clave: "estado",
      texto:
        estado === "abierta"
          ? "Preinscripción abierta"
          : "Preinscripción cerrada",
      quitar: () => onEstadoChange(""),
    },
  ].filter(Boolean);

  const hay = hayFiltrosActivos ?? activos.length > 0;

  const textoVerResultados =
    typeof totalResultados === "number"
      ? `Ver ${totalResultados} ${totalResultados === 1 ? "escuela" : "escuelas"}`
      : "Ver resultados";

  return (
    <>
      <style>{estilos}</style>

      <div
        className="sticky-lg-top"
        style={{
          top: TOP_STICKY,
          zIndex: 1,
          maxHeight: `calc(100vh - ${TOP_STICKY + 16}px)`,
          overflowY: "auto",
        }}
      >
        <Button
          variant="outline-primary"
          style={{ backgroundColor: "var(--pi-blue,)", color: "white" }}
          className="d-lg-none w-50 d-flex align-items-center justify-content-center gap-2"
          onClick={() => setShow(true)}
        >
          <Sliders aria-hidden="true" />
          Filtros
          {activos.length > 0 && (
            <Badge pill bg="primary">
              {activos.length}
            </Badge>
          )}
        </Button>

        <Offcanvas
          responsive="lg"
          placement="bottom"
          show={show}
          onHide={() => setShow(false)}
          className="rounded-top-4"
          style={{ height: "auto", maxHeight: "85vh" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              as="h2"
              className="h5 d-flex align-items-center gap-2"
            >
              <Sliders aria-hidden="true" />
              Filtros
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <div className="ff-panel w-100">
              <div className="d-none d-lg-flex align-items-center justify-content-between mb-3">
                <h2 className="h5 d-flex align-items-center gap-2 mb-0">
                  <Sliders aria-hidden="true" />
                  Filtros
                  {activos.length > 0 && (
                    <Badge pill bg="primary">
                      {activos.length}
                    </Badge>
                  )}
                </h2>

                {hay && (
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 text-decoration-none"
                    onClick={onLimpiar}
                  >
                    Limpiar todo
                  </Button>
                )}
              </div>

              {activos.length > 0 && (
                <div
                  className="d-flex flex-wrap gap-2 mb-4"
                  aria-label="Filtros aplicados"
                >
                  {activos.map((f) => (
                    <Button
                      key={f.clave}
                      variant="outline-primary"
                      size="sm"
                      className="rounded-pill d-inline-flex align-items-center gap-1"
                      style={{ background: "var(--pi-blue)", color: "white" }}
                      onClick={f.quitar}
                      aria-label={`Quitar filtro: ${f.texto}`}
                    >
                      {f.texto}
                      <X size={18} aria-hidden="true" />
                    </Button>
                  ))}
                </div>
              )}

              <Grupo etiqueta="Localidad">
                {localidades.length <= MAX_LOCALIDADES_EN_PILDORAS ? (
                  <div className="d-flex flex-wrap gap-2">
                    {["", ...localidades].map((l, i) => (
                      <ToggleButton
                        key={l || "todas"}
                        id={`localidad-${i}`}
                        type="radio"
                        variant="outline-primary"
                        style={{ background: "var(--pi-blue)", color: "white" }}
                        name="localidad"
                        value={l}
                        checked={localidad === l}
                        onChange={() => onLocalidadChange(l)}
                        className="rounded-pill"
                      >
                        {l || "Todas"}
                      </ToggleButton>
                    ))}
                  </div>
                ) : (
                  <Form.Select
                    value={localidad}
                    onChange={(e) => onLocalidadChange(e.target.value)}
                    aria-label="Filtrar por localidad"
                  >
                    <option value="">Todas las localidades</option>
                    {localidades.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Grupo>

              <Grupo etiqueta="Nivel educativo">
                <div className="d-flex flex-wrap gap-2">
                  {NIVELES.map(({ valor, texto, Icono }) => (
                    <ToggleButton
                      key={valor || "todos"}
                      id={`nivel-${valor || "todos"}`}
                      type="radio"
                      variant="outline-primary"
                      style={{ background: "var(--pi-blue)", color: "white" }}
                      name="nivel"
                      value={valor}
                      checked={nivel === valor}
                      onChange={() => onNivelChange(valor)}
                      className="rounded-pill"
                    >
                      {Icono && (
                        <Icono size={14} className="me-2" aria-hidden="true" />
                      )}
                      {texto}
                    </ToggleButton>
                  ))}
                </div>
              </Grupo>

              <Grupo etiqueta="Tipo de gestión">
                <Segmentado
                  nombre="gestion"
                  valor={gestion}
                  opciones={GESTION}
                  onChange={onGestionChange}
                />
              </Grupo>

              <Grupo etiqueta="Preinscripción">
                <Segmentado
                  nombre="estado"
                  valor={estado}
                  opciones={ESTADOS}
                  onChange={onEstadoChange}
                />
              </Grupo>
              <div className="sticky-bottom bg-white pt-3 d-lg-none">
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    style={{ background: "var(--pi-blue)", color: "white" }}
                    className="flex-fill"
                    onClick={onLimpiar}
                    disabled={!hay}
                  >
                    Limpiar
                  </Button>
                  <Button className="flex-fill" onClick={() => setShow(false)}>
                    {textoVerResultados}
                  </Button>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default FiltrosEscuelas;
