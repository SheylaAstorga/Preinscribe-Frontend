import React from 'react';
import { FamiliaLayout } from './layouts/FamiliaLayout';
import { AlumnosView } from './views/familia/AlumnosView';

function App() {
  return (
    <FamiliaLayout>
      <AlumnosView />
    </FamiliaLayout>
  );
}

export default App;