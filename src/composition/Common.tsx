import { Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'ra-ui-materialui';
import { useCount } from 'context/UnitCountContext';
import React, { useEffect } from 'react';

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
  [key: string]: string; // 인덱스 시그니처 추가
}
export const Common = () => {
  const { commonCount, setCommonCount } = useCount();

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
  // 흔함 유닛에 해당하는 키를 누를 시 기존 개수에 1을 더함
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (characterKeys[key]) {
      setCommonCount((prevCount: Record<string, number>) => {
        const updatedCount: { [key: string]: number } = { ...prevCount };
        updatedCount[characterKeys[key]] =
          (prevCount[characterKeys[key]] || 0) + 1;
        return updatedCount as {
          루피: number;
          조로: number;
          나미: number;
          우솝: number;
          상디: number;
          쵸파: number;
          버기: number;
          총병: number;
          칼병: number;
        };
      });
    }
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
    setCommonCount(prevCount => ({
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
      headerName: ' ',
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
        sx={{ width: 350 }}
      />
    </Stack>
  );
};
