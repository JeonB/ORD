import React, { ReactNode, useEffect, useState } from 'react';

interface CommonProps {
  children: ReactNode;
  initialCount: Record<string, number>;
}
interface CharacterKeys {
  q: string;
  w: string;
  e: string;
  r: string;
  a: string;
  s: string;
  d: string;
  f: string;
  g: string;
  [key: string]: string; // 인덱스 시그니처 추가
}

const Common: React.FC<CommonProps> = ({ children, initialCount }) => {
  const characterKeys: CharacterKeys = {
    q: '루피',
    w: '조로',
    e: '나미',
    r: '우솝',
    a: '상디',
    s: '쵸파',
    d: '버기',
    f: '총병',
    g: '칼병',
  };

  // 흔함 유닛 수
  //   const initialCount = {
  //     루피: 0,
  //     조로: 0,
  //     나미: 0,
  //     우솝: 0,
  //     상디: 0,
  //     쵸파: 0,
  //     버기: 0,
  //     총병: 0,
  //     칼병: 0,
  //   };

  const [count, setCount] = useState(initialCount);

  // 흔함 유닛에 해당하는 키를 누를 시 기존 개수에 1을 더함
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (characterKeys[key]) {
      setCount((prevCount: Record<string, number>) => {
        const updatedCount: { [key: string]: number } = { ...prevCount };
        updatedCount[characterKeys[key]] =
          (prevCount[characterKeys[key]] || 0) + 1;
        return updatedCount as {
          루피: number;
          조로: number;
          나미: number;
          우솝: number;
          상디: number;
          쵸파: number;
          버기: number;
          총병: number;
          칼병: number;
        }; // 타입 단언 추가
      });
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [count, initialCount]); // Include 'initialCount' and 'completion' in the dependency array

  const handleReset = () => {
    setCount(initialCount);
  };

  const handleCharacterReset = (character: string) => {
    setCount(prevCount => ({
      ...prevCount,
      [character]: 0,
    }));
  };
  return (
    <>
      {Object.entries(characterKeys).map(([key, character]) => (
        <div key={key}>
          <p>
            {`${character} ${key}: ${count[character as keyof typeof count]}`}

            <button
              style={{ marginLeft: 20 }}
              onClick={() => handleCharacterReset(character)}>
              초기화
            </button>
          </p>
        </div>
      ))}
      {children}
      <button onClick={handleReset}>모두 초기화</button>
    </>
  );
};

export default Common;
