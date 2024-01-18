/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Composition } from 'components/Composition';
import { unit, useCount } from 'context/UnitCountContext';
import { Button } from 'ra-ui-materialui';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

export const Random = () => {
  const { count, setCount } = useCount();
  const etcCount = {
    k: count.k,
    나루토선인모드: count.나루토선인모드,
    메구밍: count.메구밍,
    뱀파이어: count.뱀파이어,
    센토이스즈: count.센토이스즈,
    야가미라이토: count.야가미라이토,
    옌: count.옌,
    요츠바: count.요츠바,
    요미: count.요미,
    율자: count.율자,
    펭귄: count.펭귄,
    토우마: count.토우마,
    이치고: count.이치고,
    츠바사: count.츠바사,
  };

  const handleCharacterReset = (character: string) => {
    setCount(prevCount => ({
      ...prevCount,
      [character]: 0,
    }));
  };

  const handleCellClick = (params: GridCellParams) => {
    // 클릭 이벤트 처리
    const clickedUnit = params.row.unit;
    if (clickedUnit) {
      handleUnitClick(clickedUnit);
    }
  };

  const handleUnitClick = (character: string) => {
    setCount(prevCount => {
      const updatedCount: unit = { ...prevCount };
      updatedCount[character] = (prevCount[character] || 0) + 1;
      return updatedCount;
    });
  };
  const rows = Object.entries(etcCount).map(([unit, count]) => ({
    unit: unit,
    count: count,
    button: (
      <button
        style={{ marginLeft: 20 }}
        onClick={() => handleCharacterReset(unit)}>
        리셋
      </button>
    ),
  }));

  const columns = [
    { field: 'unit', headerName: '유닛' },
    { field: 'count', headerName: '개수' },
    {
      field: 'action',
      renderCell: (params: { row: { unit: string } }) => (
        <Button
          style={{ marginLeft: 20 }}
          onClick={() => handleCharacterReset(params.row.unit)}
          label="리셋"
        />
      ),
    },
  ];

  return (
    <Stack>
      <Typography variant="h5">랜덤 유닛</Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={row => row.unit}
        sx={{ width: 350, cursor: 'pointer' }}
        onCellClick={handleCellClick}
      />
    </Stack>
  );
};
