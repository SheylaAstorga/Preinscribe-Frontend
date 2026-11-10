import { escuelasEjemplo } from "./escuelasEjemplo";

const CLAVE = "escuelas";

// Guardo las imágenes de ejemplo aparte, para no guardarlas en localStorage
const imagenes = Object.fromEntries(
  escuelasEjemplo.map((e) => [e.id, e.imagen]),
);

export const obtenerEscuelas = () => {
  const guardadas = JSON.parse(localStorage.getItem(CLAVE) || "null");
  const base = guardadas ?? escuelasEjemplo.map((e) => ({ ...e, activa: true }));
  return base.map((e) => ({ ...e, imagen: e.imagen ?? imagenes[e.id] ?? null }));
};

export const guardarEscuelas = (lista) => {
  const sinImagenDeEjemplo = lista.map((e) =>
    e.imagen === imagenes[e.id] ? { ...e, imagen: undefined } : e,
  );
  localStorage.setItem(CLAVE, JSON.stringify(sinImagenDeEjemplo));
};