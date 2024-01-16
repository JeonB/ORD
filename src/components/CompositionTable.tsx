import { Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'ra-ui-materialui';
import React from 'react';

interface completionProps {
  [key: string]: number;
}
export const CompositionTable = (props: {
  name: string;
  completion: completionProps;
  handleCombine: (unit: string) => void;
}) => {
  const { name, completion, handleCombine } = props;

  const rows = Object.entries(completion).map(([unit, completeness]) => ({
    unit: unit,
    completeness: Math.floor(completeness) + '%',
    button: (
      <button style={{ marginLeft: 20 }} onClick={() => handleCombine(unit)}>
        조합
      </button>
    ),
  }));
  return (
    <Stack>
      <Typography variant="h5">{name}</Typography>
      <DataGrid
        columns={[
          { field: 'unit', headerName: '유닛' },
          { field: 'completeness', headerName: '완성도' },
          {
            field: 'action',
            headerName: ' ',
            renderCell: (params: { row: { unit: string } }) => (
              <Button
                style={{ marginLeft: 20 }}
                onClick={() => handleCombine(params.row.unit)}
                label="조합"></Button>
            ),
          },
        ]}
        rows={rows}
        getRowId={(row: { unit: string }) => row.unit}
        sx={{ width: 350 }}
      />
    </Stack>
  );
};
