/* eslint-disable */
import React from 'react';
import Uncommon from './composition/Uncommon';
import { UnitCountContextProvider } from 'context/UnitCountContext';
import Special from 'composition/Special';
import { Stack } from '@mui/material';

const App: React.FC = () => {
  return (
    <div className="App">
      <UnitCountContextProvider>
        <Uncommon />
        <Special />
      </UnitCountContextProvider>
    </div>
  );
};

export default App;
