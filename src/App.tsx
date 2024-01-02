/* eslint-disable */
import React from 'react';
import Uncommon from './composition/Uncommon';
import { UnitCountContextProvider } from 'context/UnitCountContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <UnitCountContextProvider>
        <Uncommon />
      </UnitCountContextProvider>
    </div>
  );
};

export default App;
