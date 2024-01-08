import { useCount } from 'context/UnitCountContext';
import React, { useState, useEffect } from 'react';
const Special = () => {
  const { count, setCount } = useCount();
  const composition: { [key: string]: { [key: string]: number } } = {
    드레이크: { 타시기: 1, 후쿠로: 1, 쵸파: 1 },
    갓에넬: { 저격왕: 1, 베포: 1, 상디: 1 },
    겟코모리아: { 브룩: 2, 상디: 1 },
    크리마텍트: { 나미: 3 },
    오하라: { 로빈: 2, 쵸파: 1 },
    루치: { 후쿠로: 1, 로빈: 1, 루피: 1 },
    귀기: { 조로: 3 },
    마르코: { 블루노: 1, 에이스: 1, 상디: 1 },
    기어세컨드: { 루피: 3 },
    쿠마: { 베포: 1, 프랑키: 1, 조로: 1 },
    호킨스: { 페로나: 1, 블루노: 1, 우솝: 1 },
    마기탄: { 버기: 3 },
    봉쿠레: { 이나즈마: 1, 로빈: 1, 나미: 1 },
    검은다리: { 상디: 3 },
    스모커: { 총병: 1, 타시기: 1, 칼병: 1 },
    스쿼드: { 럼블볼: 1, 프랑키: 1, 나미: 1 },
    아론: { 하찌: 2, 루피: 1 },
    화염탄: { 저격왕: 2 },
    키드: { 페로나: 1, 베포: 1, 버기: 1 },
    이나즈마혁명군: { 이나즈마: 2 },
    징베: { 에이스: 1, 후쿠로: 1, 버기: 1 },
    챠카: { 블루노: 1, 후쿠로: 1, 쵸파: 1 },
    갱벳지: { 후쿠로: 1, 총병: 1, 버기: 1 },
    캡틴크로: { 하찌: 1, 칼병: 1, 조로: 1 },
    크로커다일: { 프랑키: 1, 저격왕: 1, 버기: 1 },
    킬러: { 타시기: 1, 브룩: 1, 버기: 1 },
    쵸파두뇌강화: { 럼블볼: 1, 로빈: 1, 버기: 1 },
    쵸파가드포인트: { 럼블볼: 1, 이나즈마: 1, 칼병: 1 },
    로우: { 베포: 1, 타시기: 1, 버기: 1 },
    파이러츠도킹: { 프랑키: 2, 조로: 1 },
    에이스특별함: { 에이스: 2, 우솝: 1 },
    헤르메포: { 브룩: 1, 조로: 1, 상디: 1 },
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
  return (
    <div>
      <h2>특별함 유닛</h2>
      {Object.entries(completion).map(([unit, completeness]) => (
        <div key={unit}>
          <p>
            {`${unit}: ${completeness}%`}
            <button
              style={{ marginLeft: 20 }}
              onClick={() => handleCombine(unit)}>
              조합
            </button>
          </p>{' '}
          {/* 완성도 */}
        </div>
      ))}
    </div>
  );
};
export default Special;
