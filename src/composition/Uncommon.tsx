/* eslint-disable */
import React, { useState, useEffect } from 'react';

interface UncommonProps {
  initialCount: Record<string, number>;
}
//TODO - 후쿠로, 브루노 등 단일 흔함 유닛 2개의 조합에 대한 오류 해결
const Uncommon: React.FC<UncommonProps> = ({ initialCount }) => {
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
    Object.fromEntries(Object.keys(composition).map((unit) => [unit, 0])),
  );

  useEffect(() => {
    // 각 유닛의 개수가 증가할 때마다 완성도를 계산
    const calculateCompletion = () => {
      const newCompletion = { ...completion };

      Object.keys(composition).forEach((unit) => {
        const unitConditions = composition[unit];
        var totalConditions = Object.values(unitConditions);
        const satisfiedConditions = Object.keys(unitConditions).filter(
          (condition) =>
            (initialCount[condition] || 0) >= unitConditions[condition],
        ).values;
        if (Array.isArray(totalConditions)) {
          // totalConditions 배열의 값의 합을 계산
          const sumOfValues = totalConditions.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          );

          // 값의 합이 0보다 큰 경우에만 totalConditions 배열에 추가
          if (sumOfValues > 0) {
            newCompletion[unit] = (1 / sumOfValues) * 100;
          }

          console.log(totalConditions);
        } else {
          const satisfiedConditions = Object.keys(unitConditions).filter(
            (condition) =>
              (initialCount[condition] || 0) >= unitConditions[condition],
          ).values;
        }
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
  }, [initialCount]); // Include 'initialCount' and 'completion' in the dependency array

  // 키보드 이벤트 핸들러 등을 추가

  return (
    <div>
      <p>유닛 완성도</p>
      {Object.entries(completion).map(([unit, completeness]) => (
        <div key={unit}>
          <p>{`${unit}: ${completeness.toFixed(2)}%`}</p>
        </div>
      ))}
    </div>
  );
};

export default Uncommon;
