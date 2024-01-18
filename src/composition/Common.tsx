/* eslint-disable */
import { Stack, Typography } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Button } from 'ra-ui-materialui';
import { useCount } from 'context/UnitCountContext';
import React, { useEffect } from 'react';
import { unit } from 'context/UnitCountContext';

interface CharacterKeys {
  q: string;
  w: string;
  e: string;
  r: string;
  a: string;
  s: string;
  d: string;
  f: string;
  g: string;
  [key: string]: string;
}
//TODO: 성능 개선 필요
export const Common = () => {
  const { count, setCount } = useCount();
  const commonCount = {
    루피: count.루피,
    조로: count.조로,
    나미: count.나미,
    우솝: count.우솝,
    상디: count.상디,
    쵸파: count.쵸파,
    버기: count.버기,
    총병: count.총병,
    칼병: count.칼병,
  };
  const characterKeys: CharacterKeys = {
    q: '루피',
    w: '조로',
    e: '나미',
    r: '우솝',
    a: '상디',
    s: '쵸파',
    d: '버기',
    f: '총병',
    g: '칼병',
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (characterKeys[key]) {
      setCount(prevCount => {
        const updatedCount: unit = { ...prevCount };
        updatedCount[characterKeys[key]] =
          (prevCount[characterKeys[key]] || 0) + 1;
        return updatedCount;
      });
    }
  };
  const handleCellClick = (params: GridCellParams) => {
    // 클릭 이벤트 처리
    const clickedUnit = params.row.unit;
    const unitName = clickedUnit.replace(/[^가-힣]/g, '');
    if (unitName) {
      handleUnitClick(unitName);
    }
  };

  const handleUnitClick = (character: string) => {
    setCount(prevCount => {
      const updatedCount: unit = { ...prevCount };
      updatedCount[character] = (prevCount[character] || 0) + 1;
      return updatedCount;
    });
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [commonCount]);

  const handleCharacterReset = (character: string) => {
    setCount(prevCount => ({
      ...prevCount,
      [character]: 0,
    }));
  };

  const resetCharacter = (unit: string) => {
    const matchResult = unit.match(/[가-힣]+/);
    const characterToReset = matchResult ? matchResult[0] : undefined;

    if (characterToReset) {
      handleCharacterReset(characterToReset);
    } else {
      console.error('유효한 한글 문자열을 찾을 수 없습니다.');
    }
  };
  const findKeyByValue = (
    value: string,
    obj: CharacterKeys,
  ): string | undefined => {
    const entry = Object.entries(obj).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  };
  const rows = Object.entries(commonCount).map(([unit, count]) => ({
    unit: unit + findKeyByValue(unit, characterKeys),
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
          onClick={() => resetCharacter(params.row.unit)}
          label="리셋"
        />
      ),
    },
  ];
  return (
    <Stack>
      <Typography variant="h5">흔함 유닛</Typography>
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
