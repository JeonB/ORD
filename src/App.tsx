/* eslint-disable */
import React from 'react'
import { UnitCountContextProvider } from 'src/context/UnitCountContext'
import { Stack, ThemeProvider, createTheme } from '@mui/material'
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
} from '@_compositions'

const App: React.FC = () => {
  const theme = createTheme()
  return (
    <div className="App">
      <UnitCountContextProvider>
        <ThemeProvider theme={theme}>
          <Stack>
            <Common />
            <Uncommon />
          </Stack>
          {/* <Special />
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
            <Stack>
              <Immortal />
              <RandomLimited />
            </Stack>
          </Stack>
          <Stack>
            <Limited />
            <Changed />
          </Stack> */}
        </ThemeProvider>
      </UnitCountContextProvider>
    </div>
  )
}

export default App
