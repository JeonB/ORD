/* eslint-disable */
import React from 'react';
import { UnitCountContextProvider } from 'context/UnitCountContext';
import { Stack, ThemeProvider, createTheme } from '@mui/material';
import {
  Changed,
  Common,
  Etc,
  Hidden,
  Immortal,
  Legendary,
  Limited,
  Random,
  RandomLimited,
  Rare,
  Special,
  Transcendence,
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
          <Stack direction={'row'}>
            <Transcendence />
            <Immortal />
          </Stack>
          <Stack direction={'row'}>
            <RandomLimited />
            <Changed />
          </Stack>
          <Stack direction={'row'}>
            <Limited />
          </Stack>
        </ThemeProvider>
      </UnitCountContextProvider>
    </div>
  );
};

export default App;
