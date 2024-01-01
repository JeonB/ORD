/* eslint-disable */
import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';

interface UncommonProps {
  initialCount: Record<string, number>;
}
const Uncommon: React.FC<UncommonProps> = () => {
  const { count } = useCount();
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
        const totalConditions = Object.values(unitConditions).reduce(function (
          accumulator,
          currentValue,
        ) {
          return accumulator + currentValue;
        }, 0); // 안흔함 조합에 필요한 유닛의 수

        var sum = 0;
        const currentConditions = Object.keys(unitConditions).filter(
          condition => (sum += initialCount[condition]),
        );
        newCompletion[unit] = (sum / totalConditions) * 100;
        // Calculate completion percentage only if all conditions are satisfied
        // if (satisfiedConditions === totalConditions) {
        //   newCompletion[unit] = 100;
        // } else {
        //   newCompletion[unit] =
        //     (satisfiedConditions.length / totalConditions) * 100;
        // }
      });

      setCompletion(newCompletion);
    };

    calculateCompletion();
  }, [initialCount]);

  return (
    <div>
      <h2>안흔함 유닛</h2>
      {Object.entries(completion).map(([unit, completeness]) => (
        <div key={unit}>
          <p>{`${unit}: ${completeness}%`}</p>
        </div>
      ))}
    </div>
  );
};

export default Uncommon;
