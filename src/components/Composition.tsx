import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';
import { CompositionTable } from './CompositionTable';

export const Composition = (props: {
  composition: { [key: string]: { [key: string]: number } };
  name: string;
}) => {
  const { composition, name } = props;
  const { count, setCount } = useCount();
  const [completion, setCompletion] = useState<{ [key: string]: number }>(
    Object.fromEntries(Object.keys(composition).map(unit => [unit, 0])),
  );

  useEffect(() => {
    const calculateCompletion = () => {
      const newCompletion = { ...completion };
      Object.keys(composition).forEach(unit => {
        const unitConditions = composition[unit];
        const totalConditions = Object.keys(unitConditions).length;
        const totalUnitCount = Object.keys(unitConditions).reduce(
          (accumulator, unit) => accumulator + unitConditions[unit],
          0,
        );
        let satisfiedConditions = 0;
        const checkUnitCondition = Object.keys(unitConditions).reduce(
          (accumulator, condition) => {
            const isSameUnitCondition =
              count[condition] < unitConditions[condition];
            if (isSameUnitCondition) {
              return accumulator + count[condition];
            } else {
              satisfiedConditions++;
              return accumulator + unitConditions[condition];
            }
          },
          0,
        );
        if (satisfiedConditions < totalConditions) {
          newCompletion[unit] = (checkUnitCondition / totalUnitCount) * 100;
        } else {
          //조건식을 만족하는 조합 유닛의 최소 조합 유닛을 기준으로 조합도 산출
          const minSatisfiedCondition = Object.keys(unitConditions).reduce(
            (accumulator, condition) => {
              const conditionRatio =
                count[condition] / unitConditions[condition];

              return Math.min(accumulator, conditionRatio);
            },
            Infinity,
          );
          newCompletion[unit] = minSatisfiedCondition * 100;
        }
      });

      setCompletion(newCompletion);
    };

    calculateCompletion();
  }, [count]);

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
  return (
    <CompositionTable
      name={name}
      completion={completion}
      handleCombine={handleCombine}
    />
  );
};
