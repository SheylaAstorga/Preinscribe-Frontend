import { BarraNavegacion } from "../../common/Navbar";
import {Footer} from "../../common/Footer";
import Banner from "./Banner";
import ComoFunciona from "./ComoFunciona";
import FiltroEscuelas from "./FiltroEscuelas";
import QuePodesHacer from "./QuePodesHacer";

const Inicio = () => {
  return (
    <>
      <BarraNavegacion></BarraNavegacion>
      <Banner></Banner>
      <FiltroEscuelas> </FiltroEscuelas>
      <ComoFunciona> </ComoFunciona>
      <QuePodesHacer></QuePodesHacer>
      <Footer></Footer>
    </>
  );
};

export default Inicio;
