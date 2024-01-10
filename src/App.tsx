/* eslint-disable */
import React from 'react';
import { UnitCountContextProvider } from 'context/UnitCountContext';
import { Stack, ThemeProvider, createTheme } from '@mui/material';
import { Common, Special, Uncommon } from 'composition';

const App: React.FC = () => {
  const theme = createTheme();
  return (
    <div className="App">
      <UnitCountContextProvider>
        <ThemeProvider theme={theme}>
          <Stack>
            <Common />
            <Uncommon />
          </Stack>
          <Special />
        </ThemeProvider>
      </UnitCountContextProvider>
    </div>
  );
};

export default App;
