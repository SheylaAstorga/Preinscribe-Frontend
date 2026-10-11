import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Pagination,
  Badge,
} from "react-bootstrap";

import { Search, X } from "react-bootstrap-icons";
import { useSearchParams } from "react-router-dom";

import FiltrosEscuelas from "./FiltrosEscuelas";
import TarjetaEscuela from "./TarjetaEscuela";
import { Footer } from "../../common/Footer";
import { escuelasEjemplo } from "../../../data/escuelasEjemplo";

const Escuelas = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Valores iniciales recibidos desde el buscador de Inicio
  const [busqueda, setBusqueda] = useState(
    searchParams.get("escuela") || ""
  );

  const [localidad, setLocalidad] = useState(
    searchParams.get("localidad") || ""
  );

  const [gestion, setGestion] = useState("");

  const [nivel, setNivel] = useState(
    searchParams.get("nivel") || ""
  );

  const [estado, setEstado] = useState(
    searchParams.get("abierta") === "true"
      ? "abierta"
      : searchParams.get("abierta") === "false"
        ? "cerrada"
        : ""
  );

  const [jornadaExtendida, setJornadaExtendida] = useState(
    searchParams.get("jornadaExtendida") === "true"
  );

  const [comedor, setComedor] = useState(
    searchParams.get("comedor") === "true"
  );

  const [plurilingue, setPlurilingue] = useState(
    searchParams.get("plurilingue") === "true"
  );

  const [pagina, setPagina] = useState(1);

  const porPagina = 6;

  // Actualiza un filtro y vuelve a la primera página
  const cambiarFiltro = (setter, valor) => {
    setter(valor);
    setPagina(1);
  };

  // Filtra las escuelas según los criterios seleccionados
  const escuelasFiltradas = escuelasEjemplo.filter((escuela) => {
    const texto = busqueda.trim().toLowerCase();
    const textoLocalidad = localidad.trim().toLowerCase();

    const coincideBusqueda =
      escuela.nombre.toLowerCase().includes(texto) ||
      escuela.localidad.toLowerCase().includes(texto);

    const coincideLocalidad =
      !textoLocalidad ||
      escuela.localidad.toLowerCase().includes(textoLocalidad);

    const coincideGestion =
      !gestion || escuela.gestion === gestion;

    const coincideNivel =
      !nivel || nivel === "Todos" || escuela.niveles.includes(nivel);

    const coincideEstado =
      !estado ||
      (estado === "abierta" && escuela.abierta) ||
      (estado === "cerrada" && !escuela.abierta);

    const coincideJornada =
      !jornadaExtendida || escuela.jornadaExtendida === true;

    const coincideComedor =
      !comedor || escuela.comedor === true;

    const coincidePlurilingue =
      !plurilingue || escuela.plurilingue === true;

    return (
      coincideBusqueda &&
      coincideLocalidad &&
      coincideGestion &&
      coincideNivel &&
      coincideEstado &&
      coincideJornada &&
      coincideComedor &&
      coincidePlurilingue
    );
  });

  // Paginación de resultados
  const totalPaginas = Math.ceil(
    escuelasFiltradas.length / porPagina
  );

  const escuelasVisibles = escuelasFiltradas.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  // Comprueba si hay algún filtro activo
  const hayFiltrosActivos = Boolean(
    busqueda ||
    localidad ||
    gestion ||
    (nivel && nivel !== "Todos") ||
    estado ||
    jornadaExtendida ||
    comedor ||
    plurilingue
  );

  // Limpia todos los filtros
  const limpiarFiltros = () => {
    setBusqueda("");
    setLocalidad("");
    setGestion("");
    setNivel("");
    setEstado("");
    setJornadaExtendida(false);
    setComedor(false);
    setPlurilingue(false);
    setPagina(1);
    setSearchParams({});
  };

  // Actualiza la búsqueda por nombre o localidad
  const handleBuscar = (e) => {
    e.preventDefault();
    setPagina(1);

    const params = new URLSearchParams(searchParams);

    if (busqueda.trim()) {
      params.set("escuela", busqueda.trim());
    } else {
      params.delete("escuela");
    }

    setSearchParams(params);
  };

  return (
    <>
      <main className="pagina-escuelas">
        <Container className="py-5">
          <div className="encabezado-escuelas mb-4">
            <Badge bg="light" text="primary" className="mb-3">
              DIRECTORIO EDUCATIVO
            </Badge>

            <h1>Encontrá tu próxima escuela</h1>

            <p>
              Explorá las instituciones educativas de Tucumán
              y encontrá la opción adecuada para tu familia.
            </p>
          </div>

          <Form onSubmit={handleBuscar}>
            <InputGroup className="buscador-escuelas mb-4">
              <InputGroup.Text>
                <Search size={20} />
              </InputGroup.Text>

              <Form.Control
                type="search"
                placeholder="Buscá por nombre o localidad..."
                value={busqueda}
                onChange={(e) =>
                  cambiarFiltro(setBusqueda, e.target.value)
                }
                aria-label="Buscar por nombre o localidad"
              />

              {busqueda && (
                <Button
                  variant="light"
                  aria-label="Limpiar búsqueda"
                  onClick={() => cambiarFiltro(setBusqueda, "")}
                >
                  <X />
                </Button>
              )}

              <Button type="submit" className="boton-buscar">
                Buscar
              </Button>
            </InputGroup>
          </Form>

          <Row className="g-4">
            <Col xs={12} lg={3}>
              <FiltrosEscuelas
                localidad={localidad}
                gestion={gestion}
                nivel={nivel}
                estado={estado}
                onLocalidadChange={(valor) =>
                  cambiarFiltro(setLocalidad, valor)
                }
                onGestionChange={(valor) =>
                  cambiarFiltro(setGestion, valor)
                }
                onNivelChange={(valor) =>
                  cambiarFiltro(setNivel, valor)
                }
                onEstadoChange={(valor) =>
                  cambiarFiltro(setEstado, valor)
                }
                onLimpiar={limpiarFiltros}
                hayFiltrosActivos={hayFiltrosActivos}
              />
            </Col>

            <Col xs={12} lg={9}>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <div>
                  <h2 className="titulo-resultados mb-1">
                    Escuelas disponibles
                  </h2>

                  <p className="texto-resultados mb-0">
                    {escuelasFiltradas.length === 1
                      ? "Encontramos 1 institución"
                      : `Encontramos ${escuelasFiltradas.length} instituciones`}
                  </p>
                </div>

                {hayFiltrosActivos && (
                  <Button
                    variant="link"
                    className="p-0 limpiar-enlace"
                    onClick={limpiarFiltros}
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>

              {escuelasVisibles.length > 0 ? (
                <>
                  <Row className="g-3">
                    {escuelasVisibles.map((escuela) => (
                      <Col
                        key={escuela.id}
                        xs={12}
                        sm={6}
                        xl={4}
                      >
                        <TarjetaEscuela escuela={escuela} />
                      </Col>
                    ))}
                  </Row>

                  {totalPaginas > 1 && (
                    <Pagination className="justify-content-center mt-4">
                      <Pagination.Prev
                        disabled={pagina === 1}
                        onClick={() =>
                          setPagina((paginaActual) => paginaActual - 1)
                        }
                        aria-label="Página anterior"
                      />

                      {Array.from(
                        { length: totalPaginas },
                        (_, i) => i + 1
                      ).map((numero) => (
                        <Pagination.Item
                          key={numero}
                          active={pagina === numero}
                          onClick={() => setPagina(numero)}
                        >
                          {numero}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        disabled={pagina === totalPaginas}
                        onClick={() =>
                          setPagina((paginaActual) => paginaActual + 1)
                        }
                        aria-label="Página siguiente"
                      />
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="sin-resultados text-center p-5">
                  <Search size={38} className="mb-3" />

                  <h3>No encontramos escuelas</h3>

                  <p>
                    Probá con otro nombre o modificá los filtros
                    para encontrar más instituciones.
                  </p>

                  <Button
                    className="boton-buscar"
                    onClick={limpiarFiltros}
                  >
                    Limpiar búsqueda y filtros
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    <Footer />
    </>
  );
};

export default Escuelas;