/* eslint-disable */
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useCount, unit } from 'src/context/UnitCountContext'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import React, { useState, useEffect } from 'react'
import { useStore } from 'src/utils/zustandStore'
interface completionProps {
  [key: string]: number
}
export const UnitCount = (props: {
  name: string
  UnitCount: completionProps
}) => {
  const { setUnitCount } = useStore()
  const { UnitCount, name } = props

  const handleUnitClick = (character: string) => {
    setUnitCount(character, (UnitCount[character] || 0) + 1)
  }

  const handleCharacterReset = (character: string) => {
    setUnitCount(character, 0)
  }

  return (
    <Stack alignItems={'center'}>
      <Typography variant="h5">{name}</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Stack sx={{ marginLeft: 9 }} direction={'row'} spacing={2}>
          {' '}
          <Typography variant="h6">유닛</Typography>
          <Typography variant="h6">개수</Typography>
        </Stack>

        {Object.entries(UnitCount).map(([unit, count]) => {
          const labelId = `checkbox-list-label-${unit}`

          return (
            <ListItem
              key={unit}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="리셋"
                  onClick={() => handleCharacterReset(unit)}>
                  <RestartAltIcon />
                </IconButton>
              }
              disablePadding>
              <ListItemButton onClick={() => handleUnitClick(unit)} dense>
                <ListItemIcon></ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${unit}`}
                  sx={{ marginRight: 3 }}
                />
                <ListItemText id={labelId} primary={`${count}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Stack>
  )
}
