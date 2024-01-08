/* eslint-disable */
import { DataGrid } from '@mui/x-data-grid';
import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-admin';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

const Uncommon = () => {
  const theme = createTheme();
  const { count, setCount } = useCount();
  const composition: { [key: string]: { [key: string]: number } } = {
    후쿠로: { 칼병: 2 },
    블루노: { 총병: 2 },
    니코로빈: { 나미: 1, 상디: 1 },
    베포: { 루피: 1, 쵸파: 1 },
    브룩: { 조로: 1, 쵸파: 1 },
    이나즈마: { 조로: 1, 상디: 1 },
    저격왕: { 우솝: 2 },
    타시기: { 총병: 1, 칼병: 1 },
    럼블볼: { 쵸파: 2 },
    페로나: { 나미: 1, 버기: 1 },
    에이스: { 루피: 1, 총병: 1 },
    프랑키: { 루피: 1, 우솝: 1 },
    하찌: { 나미: 1, 총병: 1 },
  };

  const [completion, setCompletion] = useState<{ [key: string]: number }>(
    Object.fromEntries(Object.keys(composition).map(unit => [unit, 0])),
  );

  useEffect(() => {
    const calculateCompletion = () => {
      const newCompletion = { ...completion }; // 갱신된 유닛 수

      Object.keys(composition).forEach(unit => {
        const unitConditions = composition[unit]; // 안흔함 유닛의 조합식
        const totalConditions = Object.keys(unitConditions).length; // 안흔함 조합에 필요한 유닛
        let sameValue = 0; // 조합식에서 동일한 유닛만 있는 경우의 값
        let c = 0; // 조합식에서 세부 조건을 만족할 시 증가하는 값
        Object.keys(unitConditions).forEach(condition => {
          if (count[condition] < unitConditions[condition]) {
            sameValue = count[condition] / unitConditions[condition];
          } else {
            c++;
          }
        });
        if (c < totalConditions) {
          newCompletion[unit] = ((sameValue + c) / totalConditions) * 100;
        } else {
          let test = Number.MAX_SAFE_INTEGER;
          Object.keys(unitConditions).forEach(condition => {
            test =
              count[condition] < test
                ? count[condition] / unitConditions[condition]
                : test;
          });
          newCompletion[unit] = test * 100;
        }
      });
      setCompletion(newCompletion);
    };
    calculateCompletion();
  }, [count]);

  // 함수형 업데이트
  const handleCombine = (unit: string) => {
    setCount(prevCount => {
      const newCount = { ...prevCount };
      const unitCondition = composition[unit];

      if (completion[unit] >= 100) {
        const newCompletion = { ...completion };
        newCompletion[unit] -= 100;
        setCompletion({ ...newCompletion }); // 리렌더링함으로써 UI업데이트
        Object.keys(unitCondition).forEach(condition => {
          newCount[condition] -= unitCondition[condition];
        });
      }

      return newCount;
    });
  };

  // 비동기적 업데이트
  /* const handleCombine = (unit: string) => {
    const ncompletion = { ...completion };
    const unitCondition = composition[unit];
    if (ncompletion[unit] >= 100) {
      ncompletion[unit] -= 100;
      setCompletion(ncompletion);
      Object.keys(unitCondition).forEach(condition => {
        count[condition] -= unitCondition[condition];
      });
    }
    setCount(count);
  }; */
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
    // <div>
    //   <h2>안흔함 유닛</h2>
    //   {Object.entries(completion).map(([unit, completeness]) => (
    //     <div key={unit}>
    //       <p>
    //         {`${unit}: ${completeness}%`}
    //         <button
    //           style={{ marginLeft: 20 }}
    //           onClick={() => handleCombine(unit)}>
    //           조합
    //         </button>
    //       </p>{' '}
    //       {/* 완성도 */}
    //     </div>
    //   ))}
    // </div>
    <Stack>
      <Typography variant="h5">안흔함 유닛</Typography>
      <DataGrid
        columns={[
          { field: 'unit', headerName: '유닛' },
          { field: 'completeness', headerName: '완성도' },
          {
            field: 'action',
            headerName: ' ',
            renderCell: params => (
              <ThemeProvider theme={theme}>
                <Button
                  style={{ marginLeft: 20 }}
                  onClick={() => handleCombine(params.row.unit)}
                  label="조합"></Button>
              </ThemeProvider>
            ),
          },
        ]}
        rows={rows}
        getRowId={row => row.unit}
      />
    </Stack>
  );
};

export default Uncommon;
