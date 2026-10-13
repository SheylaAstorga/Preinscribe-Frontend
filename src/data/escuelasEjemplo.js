
import colegioSM from "../img/ColegioSM.webp";
import nuevaEsperanza from "../img/NuevaEsperanza.webp";
import colegioNorte from "../img/ColegioNorte.webp";
import jardinSemillita from "../img/JardinSemillita.webp";
import escuelaBelgrano from "../img/EscuelaBelgrano.webp";
import colegioNacional from "../img/ColegioNacional.webp";

export const escuelasEjemplo = [
  {
    id: 1,
    nombre: "Colegio San Martín",
    localidad: "San Miguel de Tucumán",
    gestion: "Pública",
    niveles: ["Primario", "Secundario"],
    abierta: true,
    jornadaExtendida: true,
    comedor: true,
    plurilingue: false,
    imagen: colegioSM,
  },
 
  {
    id: 2,
    nombre: "Colegio Nacional",
    localidad: "San Miguel de Tucumán",
    gestion: "Pública",
    niveles: ["Primario", "Secundario"],
    abierta: true,
    jornadaExtendida: true,
    comedor: true,
    plurilingue: false,
    imagen: colegioNacional,
  },
  {
    id: 3,
    nombre: "Escuela Nueva Esperanza",
    localidad: "Tafí Viejo",
    gestion: "Pública",
    niveles: ["Primario"],
    abierta: false,
    jornadaExtendida: true,
    comedor: true,
    plurilingue: false,
    imagen: nuevaEsperanza,
  },
  {
    id: 4,
    nombre: "Colegio del Norte",
    localidad: "San Miguel de Tucumán",
    gestion: "Privada",
    niveles: ["Secundario"],
    abierta: true,
    jornadaExtendida: false,
    comedor: false,
    plurilingue: true,
    imagen: colegioNorte,
  },
  {
    id: 5,
    nombre: "Jardín Maternal Semillitas",
    localidad: "San Miguel de Tucumán",
    gestion: "Privada",
    niveles: ["Inicial"],
    abierta: true,
    jornadaExtendida: false,
    comedor: false,
    plurilingue: false,
    imagen: jardinSemillita,
  },
  {
    id: 6,
    nombre: "Escuela Belgrano",
    localidad: "Banda del Río Salí",
    gestion: "Pública",
    niveles: ["Primario", "Secundario"],
    abierta: false,
    jornadaExtendida: true,
    comedor: false,
    plurilingue: false,
    imagen: escuelaBelgrano,
  },
];
