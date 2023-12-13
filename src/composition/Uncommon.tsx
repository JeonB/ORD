/* eslint-disable */
import React, { useState, useEffect } from 'react';

interface UncommonProps {
  initialCount: Record<string, number>;
}
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
        const totalConditions = Object.keys(unitConditions).length;
        const satisfiedConditions = Object.keys(unitConditions).filter(
          (condition) =>
            (initialCount[condition] || 0) >= unitConditions[condition],
        );

        // Calculate completion percentage only if all conditions are satisfied
        if (satisfiedConditions.length === totalConditions) {
          newCompletion[unit] = 100;
        } else {
          newCompletion[unit] =
            (satisfiedConditions.length / totalConditions) * 100;
        }
      });

      setCompletion(newCompletion);
    };

    calculateCompletion();
  }, [initialCount, completion]); // Include 'initialCount' and 'completion' in the dependency array

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
