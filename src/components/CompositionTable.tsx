import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface CompletionProps {
  [key: string]: number;
}
export const CompositionTable = (props: {
  name: string;
  completion: CompletionProps;
  handleCombine: (unit: string) => void;
}) => {
  const { name, completion, handleCombine } = props;

  return (
    <Stack alignItems="center">
      <Typography variant="h5">{name}</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Stack sx={{ marginLeft: 9 }} direction="row" spacing={2}>
          <Typography variant="h6">유닛</Typography>
          <Typography variant="h6">완성도</Typography>
        </Stack>

        {Object.entries(completion).map(([unit, completeness]) => {
          const labelId = `checkbox-list-label-${unit}`;
          const percent = Math.floor(completeness);
          return (
            <ListItem key={unit} disablePadding>
              <ListItemButton dense>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ marginLeft: 3 }}>
                  <Grid item>
                    <ListItemText
                      id={labelId}
                      primary={`${unit}`}
                      sx={{ marginRight: 3 }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="flex-end">
                      <Grid item>
                        <ListItemText id={labelId} primary={`${percent}%`} />
                      </Grid>
                      <Grid item>
                        <ListItemIcon>
                          <IconButton
                            edge="end"
                            aria-label="조합"
                            onClick={() => handleCombine(unit)}>
                            <PersonAddIcon />
                          </IconButton>
                        </ListItemIcon>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};
