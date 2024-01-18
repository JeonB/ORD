/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Composition } from 'components/Composition';
import { unit, useCount } from 'context/UnitCountContext';
import { Button } from 'ra-ui-materialui';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

export const Etc = () => {
  const { count, setCount } = useCount();
  const etcCount = {
    초월쿠마: count.초월쿠마,
    해적선: count.해적선,
    고대의배: count.고대의배,
    레일리: count.레일리,
    좀비: count.좀비,
    금: count.금,
    목재: count.목재,
    랜덤전용유닛: count.랜덤전용유닛,
    행운의토큰: count.행운의토큰,
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
      <Typography variant="h5">기타 유닛</Typography>
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
