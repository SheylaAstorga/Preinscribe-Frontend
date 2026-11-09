export const sembrarAdminEscuela = () => {
  if (!localStorage.getItem("adminEscuelaPrueba")) {
    localStorage.setItem(
      "adminEscuelaPrueba",
      JSON.stringify({
        nombre: "Administrador Escuela 1",
        email: "adminescuela@preinscribe.com",
        password: "Admin123",
        rol: "ADMIN_ESCUELA",
        escuelaId: 1,
      }),
    );
  }
};

export const sembrarAdminGeneral = () => {
  if (!localStorage.getItem("adminGeneralPrueba")) {
    localStorage.setItem(
      "adminGeneralPrueba",
      JSON.stringify({
        nombre: "Administrador General",
        email: "admingeneral@preinscribe.com",
        password: "Admin123",
        rol: "ADMIN_GENERAL",
      }),
    );
  }
};