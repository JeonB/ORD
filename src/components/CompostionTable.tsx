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
  //   const handleCombine = (unit: string) => {
  //     setCount(prevCount => {
  //       const newCount = { ...prevCount };
  //       const unitCondition = composition[unit];

  //       if (completion[unit] >= 100) {
  //         const newCompletion = { ...completion };
  //         newCompletion[unit] -= 100;
  //         setCompletion({ ...newCompletion }); // 리렌더링함으로써 UI업데이트
  //         Object.keys(unitCondition).forEach(condition => {
  //           newCount[condition] -= unitCondition[condition];
  //         });
  //       }

  //       return newCount;
  //     });
  //   };

  const rows = Object.entries(completion).map(([unit, completeness]) => ({
    unit: unit,
    completeness: completeness,
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
            renderCell: params => (
              <Button
                style={{ marginLeft: 20 }}
                onClick={() => handleCombine(params.row.unit)}
                label="조합"></Button>
            ),
          },
        ]}
        rows={rows}
        getRowId={row => row.unit}
      />
    </Stack>
  );
};
