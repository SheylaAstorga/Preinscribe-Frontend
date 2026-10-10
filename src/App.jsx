import Escuelas from "./components/pages/Escuela/Escuelas";
import { FamiliaLayout } from "./layouts/FamiliaLayout";
import { AlumnosView } from "./views/familia/AlumnosView";
// import Inicio from "./components/pages/Principal/Inicio";

function App() {
  return (
    <>
      {/* <Inicio></Inicio> */}
      <Escuelas></Escuelas>
      {/* <FamiliaLayout>
        <AlumnosView />
      </FamiliaLayout> */}
    </>
  );
}

export default App;
