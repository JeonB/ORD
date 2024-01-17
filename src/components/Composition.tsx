import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';
import { CompositionTable } from './CompositionTable';

export const Composition = (props: {
  composition: { [key: string]: { [key: string]: number } };
  name: string;
}) => {
  const { composition, name } = props;
  const { commonCount, setCommonCount, etcCount, setEtcCount } = useCount();
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
        console.log(unit, totalUnitCount);
        let satisfiedConditionsCount = 0;

        const sameUnitValue = Object.keys(unitConditions).reduce(
          (accumulator, condition) => {
            if (commonCount[condition] < unitConditions[condition]) {
              return commonCount[condition];
            } else if (etcCount[condition] < unitConditions[condition]) {
              return etcCount[condition];
            } else {
              satisfiedConditionsCount++;
              return accumulator;
            }
          },
          0,
        );
        if (satisfiedConditionsCount < totalConditions) {
          newCompletion[unit] =
            ((sameUnitValue + satisfiedConditionsCount) / totalUnitCount) * 100;
        } else {
          const minConditionRatio = Object.keys(unitConditions).reduce(
            (accumulator, condition) => {
              {
                if (commonCount[condition] < accumulator) {
                  return commonCount[condition] / unitConditions[condition];
                } else if (etcCount[condition] < accumulator) {
                  return etcCount[condition] / unitConditions[condition];
                } else {
                  return accumulator;
                }
              }
            },
            Number.MAX_SAFE_INTEGER,
          );
          newCompletion[unit] = minConditionRatio * 100;
        }
      });

      setCompletion(newCompletion);
    };

    calculateCompletion();
  }, [commonCount, etcCount]);
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
