/* eslint-disable */
import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';
import { CompositionTable } from 'components/CompostionTable';

export const Uncommon = () => {
  const { commonCount, setCommonCount, unCommonCount, setUnCommonCount } =
    useCount();
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

  // useEffect(() => {
  //   const calculateCompletion = () => {
  //     const newCompletion = { ...completion };

  //     Object.keys(composition).forEach(unit => {
  //       const unitConditions = composition[unit]; // 안흔함 유닛의 조합식 조건 ex)  니코로빈(unit): { 나미: 1, 상디: 1 }(unitConditions)
  //       const totalConditions = Object.keys(unitConditions).length; // 안흔함 조합에 필요한 조건 수
  //       let sameUnitValue = 0;
  //       let satisfiedConditionsCount = 0;
  //       Object.keys(unitConditions).forEach(condition => {
  //         if (commonCount[condition] < unitConditions[condition]) {
  //           sameUnitValue = commonCount[condition] / unitConditions[condition];
  //         } else {
  //           satisfiedConditionsCount++;
  //         }
  //       });
  //       if (satisfiedConditionsCount < totalConditions) {
  //         newCompletion[unit] =
  //           ((sameUnitValue + satisfiedConditionsCount) / totalConditions) *
  //           100;
  //       } else {
  //         let test = Number.MAX_SAFE_INTEGER;
  //         Object.keys(unitConditions).forEach(condition => {
  //           test =
  //             commonCount[condition] < test
  //               ? commonCount[condition] / unitConditions[condition]
  //               : test;
  //         });
  //         newCompletion[unit] = test * 100;
  //       }
  //     });
  //     setCompletion(newCompletion);
  //   };
  //   calculateCompletion();
  // }, [commonCount, unCommonCount]);

  useEffect(() => {
    const calculateCompletion = () => {
      const newCompletion = { ...completion };
      const unCommonCounts = { ...unCommonCount };
      Object.keys(composition).forEach(unit => {
        const unitConditions = composition[unit];
        const totalConditions = Object.keys(unitConditions).length;
        let satisfiedConditionsCount = 0;

        const sameUnitValue = Object.keys(unitConditions).reduce(
          (accumulator, condition) => {
            if (commonCount[condition] < unitConditions[condition]) {
              return commonCount[condition] / unitConditions[condition];
            } else {
              satisfiedConditionsCount++;
              return accumulator;
            }
          },
          0,
        );

        if (satisfiedConditionsCount < totalConditions) {
          newCompletion[unit] =
            ((sameUnitValue + satisfiedConditionsCount) / totalConditions) *
            100;
        } else {
          const test = Object.keys(unitConditions).reduce(
            (accumulator, condition) => {
              return commonCount[condition] < accumulator
                ? commonCount[condition] / unitConditions[condition]
                : accumulator;
            },
            Number.MAX_SAFE_INTEGER,
          );
          newCompletion[unit] = test * 100;
        }

        if (completion[unit] >= 100) {
          unCommonCounts[unit] = Math.floor(completion[unit] / 100);
          setUnCommonCount(unCommonCounts);
        }
      });

      setCompletion(newCompletion);
    };

    calculateCompletion();
  }, [commonCount]);

  // 함수형 업데이트
  const handleCombine = (unit: string) => {
    setCommonCount(prevCount => {
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

  return (
    <CompositionTable
      name={'안흔함'}
      completion={completion}
      handleCombine={handleCombine}
    />
  );
};
