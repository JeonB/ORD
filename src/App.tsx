/* eslint-disable */
import React from 'react';
import { UnitCountContextProvider } from 'context/UnitCountContext';
import { Stack, ThemeProvider, createTheme } from '@mui/material';
import {
  Common,
  Etc,
  Hidden,
  Legendary,
  Random,
  Rare,
  Special,
  Uncommon,
} from 'composition';

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
          <Rare />
          <Stack>
            <Random />
            <Etc />
          </Stack>
          <Stack direction={'row'}>
            <Legendary />
            <Hidden />
          </Stack>
        </ThemeProvider>
      </UnitCountContextProvider>
    </div>
  );
};

export default App;
