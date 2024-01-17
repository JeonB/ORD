import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';
import { CompositionTable } from './CompositionTable';

export const UniqueComposition = (props: {
  composition: { [key: string]: { [key: string]: number } };
  name: string;
}) => {
  const { composition, name } = props;
  const { commonCount, setCommonCount } = useCount();
  const [completion, setCompletion] = useState<{ [key: string]: number }>(
    Object.fromEntries(Object.keys(composition).map(unit => [unit, 0])),
  );

  useEffect(() => {
    const calculateCompletion = () => {
      const newCompletion = { ...completion };
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
          const minConditionRatio = Object.keys(unitConditions).reduce(
            (accumulator, condition) => {
              return commonCount[condition] < accumulator
                ? commonCount[condition] / unitConditions[condition]
                : accumulator;
            },
            Number.MAX_SAFE_INTEGER,
          );
          newCompletion[unit] = minConditionRatio * 100;
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
      name={name}
      completion={completion}
      handleCombine={handleCombine}
    />
  );
};
