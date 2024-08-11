/* eslint-disable */
import {
  Common,
  Etc,
  Hidden,
  Immortal,
  Legendary,
  Random,
  RandomLimited,
  Rare,
  Special,
  Transcendence,
  Uncommon,
} from '@_compositions'
import { Stack, ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import { UnitCountContextProvider } from 'src/context/UnitCountContext'

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
            <Stack>
              <Immortal />
              <RandomLimited />
            </Stack>
          </Stack>
          {/* <Stack>
            <Limited />
            <Changed />
          </Stack> */}
        </ThemeProvider>
      </UnitCountContextProvider>
    </div>
  )
}

export default App
