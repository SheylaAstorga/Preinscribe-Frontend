const CLAVE = "usuarios";

// Los dos administradores de prueba que antes creaban los seeds
const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: "Administrador General",
    email: "admingeneral@preinscribe.com",
    password: "Admin123",
    rol: "ADMIN_GENERAL",
    activo: true,
  },
  {
    id: 2,
    nombre: "Administrador Escuela 1",
    email: "adminescuela@preinscribe.com",
    password: "Admin123",
    rol: "ADMIN_ESCUELA",
    escuelaId: 1,
    activo: true,
  },
];

export const guardarUsuarios = (lista) => {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
};

export const obtenerUsuarios = () => {
  const guardados = JSON.parse(localStorage.getItem(CLAVE) || "null");
  if (guardados) return guardados;

  // Primera vez: arranco con los admins y rescato la familia que ya estuviera registrada
  const familiaAnterior = JSON.parse(
    localStorage.getItem("usuarioPreinscribe") || "null",
  );

  const familiaValida =
    familiaAnterior &&
    !USUARIOS_INICIALES.some(
      (u) => u.email.toLowerCase() === familiaAnterior.email?.toLowerCase(),
    );

  const lista = familiaValida
    ? [...USUARIOS_INICIALES, { ...familiaAnterior, id: Date.now(), activo: true }]
    : USUARIOS_INICIALES;

  guardarUsuarios(lista);
  return lista;
};