/* eslint-disable */
import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';

const Uncommon = () => {
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
        const totalConditions2 = Object.keys(unitConditions).length;
        let sum = 0;
        let temp = 0;
        let c = 0;
        Object.keys(unitConditions).forEach(condition => {
          if (count[condition] < unitConditions[condition]) {
            temp = count[condition] / unitConditions[condition];
          } else {
            sum++;
            c++;
          }
        });
        if (c < totalConditions2) {
          newCompletion[unit] = ((temp + sum) / totalConditions2) * 100;
        } else {
          let test = 100000;
          Object.keys(unitConditions).forEach(condition => {
            test = count[condition] < test ? count[condition] : test;
          });
          newCompletion[unit] = test * 100;
        }
      });
      setCompletion(newCompletion);
    };
    calculateCompletion();
  }, [count]);

  return (
    <div>
      <h2>안흔함 유닛</h2>
      {Object.entries(completion).map(([unit, completeness]) => (
        <div key={unit}>
          <p>{`${unit}: ${completeness}%`}</p> {/* 완성도 */}
        </div>
      ))}
    </div>
  );
};

export default Uncommon;
