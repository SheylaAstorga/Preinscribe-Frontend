
import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";

export const BarraNavegacion = ({ usuario, cerrarSesion }) => {
  const [menuExpandido, setMenuExpandido] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ruta = location.pathname;

  const handleCerrarSesion = () => {
    if (cerrarSesion) {
      cerrarSesion();
    }

    setMenuExpandido(false);
    navigate("/", { replace: true });
  };

  const esAdminEscuela = usuario?.rol === "ADMIN_ESCUELA";
  const esFamilia = usuario?.rol === "FAMILIA";

  const enlacesAdmin = [
    { nombre: "Panel", ruta: "/escuela/panel" },
    { nombre: "Solicitudes", ruta: "/escuela/solicitudes" },
    { nombre: "Vacantes", ruta: "/escuela/vacantes" },
    { nombre: "Reportes", ruta: "/escuela/reportes" },
    { nombre: "Configuración", ruta: "/escuela/configuracion" },
  ];

  const enlacesFamilia = [
    { nombre: "Escuelas", ruta: "/familia/escuelas" },
    { nombre: "Mis hijos", ruta: "/familia/alumnos" },
    { nombre: "Mis solicitudes", ruta: "/familia/solicitudes" },
  ];

  const obtenerClaseEnlace = (rutaEnlace) => {
    const activo =
      ruta === rutaEnlace ||
      (rutaEnlace === "/escuela/solicitudes" &&
        ruta.startsWith("/escuela/solicitudes/"));

    return `px-3 py-2 fw-medium ${
      activo ? "text-white fw-bold" : "text-white-50"
    }`;
  };

  const cerrarMenu = () => setMenuExpandido(false);

  return (
    <Navbar
      expand="lg"
      variant="dark"
      expanded={menuExpandido}
      className="shadow-sm py-3 sticky-top border-bottom"
      style={{
        backgroundColor: "var(--pi-navy-deep, #000F22)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
    >
      <Container>
        {/* LOGO Y MARCA */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center gap-3 text-white text-decoration-none py-0"
        >
          <div
            className="d-flex align-items-center justify-content-center shadow-sm overflow-hidden"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            <img
              src="/Logo.jpg"
              alt="Logo PreInscribe"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <span
            className="fs-4 tracking-tight"
            style={{ fontWeight: 700, letterSpacing: "-0.5px" }}
          >
            Pre
            <span style={{ color: "var(--pi-sky, #5BC0EB)" }}>
              Inscribe
            </span>
          </span>
        </Navbar.Brand>

        {/* BOTÓN MENÚ RESPONSIVE */}
        <Navbar.Toggle
          aria-controls="menu-navegacion"
          className="border-0 shadow-none text-white"
          onClick={() => setMenuExpandido(!menuExpandido)}
        />

        <Navbar.Collapse id="menu-navegacion">
          {/* NAVEGACIÓN SEGÚN ROL */}
          <Nav className="mx-auto my-2 my-lg-0 gap-lg-2">
            {!usuario ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={cerrarMenu}
                  className={obtenerClaseEnlace("/")}
                >
                  Inicio
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/escuelas"
                  onClick={cerrarMenu}
                  className={obtenerClaseEnlace("/escuelas")}
                >
                  Escuelas
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/#como-funciona"
                  onClick={(e) => {
                    cerrarMenu();

                    if (location.pathname === "/") {
                      e.preventDefault();

                      const seccion =
                        document.getElementById("como-funciona");

                      if (seccion) {
                        seccion.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="px-3 py-2 fw-medium text-white-50"
                >
                  Cómo funciona
                </Nav.Link>
              </>
            ) : esAdminEscuela ? (
              enlacesAdmin.map((item) => (
                <Nav.Link
                  key={item.ruta}
                  as={Link}
                  to={item.ruta}
                  onClick={cerrarMenu}
                  className={obtenerClaseEnlace(item.ruta)}
                >
                  {item.nombre}
                </Nav.Link>
              ))
            ) : esFamilia ? (
              enlacesFamilia.map((item) => (
                <Nav.Link
                  key={item.ruta}
                  as={Link}
                  to={item.ruta}
                  onClick={cerrarMenu}
                  className={obtenerClaseEnlace(item.ruta)}
                >
                  {item.nombre}
                </Nav.Link>
              ))
            ) : null}
          </Nav>

          {/* CUENTA Y CIERRE DE SESIÓN */}
          <Nav className="align-items-lg-center">
            {!usuario ? (
              <div className="d-flex gap-2 align-items-center mt-3 mt-lg-0">
                <Link
                  to="/login"
                  className="btn btn-outline-light btn-sm px-4 fw-semibold"
                  style={{ borderRadius: "8px" }}
                >
                  Ingresar
                </Link>

                <Link
                  to="/registro"
                  className="btn btn-sm px-4 fw-bold text-dark"
                  style={{
                    backgroundColor: "var(--pi-amber, #F5A524)",
                    borderRadius: "8px",
                  }}
                >
                  Registrarse
                </Link>
              </div>
            ) : (
              <>
                {/* MENÚ DE USUARIO EN ESCRITORIO */}
                <div className="d-none d-lg-block">
                  <NavDropdown
                    title={
                      <span
                        className="text-white d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "var(--pi-blue, #1D4E89)",
                            fontSize: "13px",
                          }}
                        >
                          {usuario?.nombre
                            ? usuario.nombre.charAt(0).toUpperCase()
                            : "U"}
                        </div>

                        <span className="fw-semibold small pe-1">
                          {usuario?.nombre || "Mi Cuenta"}
                        </span>
                      </span>
                    }
                    id="desplegable-usuario"
                    align="end"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/perfil"
                      className="fw-medium py-2"
                    >
                      Mi perfil
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      onClick={handleCerrarSesion}
                      className="text-danger fw-semibold py-2"
                    >
                      Cerrar sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>

                {/* MENÚ DE USUARIO EN CELULAR */}
                <div className="d-lg-none mt-3 pt-3 border-top border-secondary">
                  <div className="d-flex align-items-center gap-2 px-2 mb-2 text-white">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "var(--pi-blue, #1D4E89)",
                        fontSize: "12px",
                      }}
                    >
                      {usuario?.nombre
                        ? usuario.nombre.charAt(0).toUpperCase()
                        : "U"}
                    </div>

                    <div>
                      <span className="fw-semibold small d-block">
                        {usuario?.nombre || "Mi Cuenta"}
                      </span>

                      <small className="text-white-50">
                        {esAdminEscuela
                          ? "Administrador de escuela"
                          : esFamilia
                            ? "Familia"
                            : "Usuario"}
                      </small>
                    </div>
                  </div>

                  <Nav.Link
                    as={Link}
                    to="/perfil"
                    onClick={cerrarMenu}
                    className="text-white-50 px-2 py-1"
                  >
                    Mi perfil
                  </Nav.Link>

                  <Nav.Link
                    onClick={handleCerrarSesion}
                    className="text-danger px-2 py-1 fw-semibold"
                  >
                    Cerrar sesión
                  </Nav.Link>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;
