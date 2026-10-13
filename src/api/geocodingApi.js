
import axios from "axios";

const GEOCODING_API_URL = import.meta.env.VITE_GEOCODING_API_URL;

export const buscarLocalidades = async (nombre) => {
  const respuesta = await axios.get(GEOCODING_API_URL, {
    params: {
      name: nombre,
      count: 6,
      language: "es",
      countryCode: "AR",
    },
  });

  return respuesta.data.results ?? [];
};
