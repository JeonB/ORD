/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Uncommon from './composition/Uncommon';
import Common from 'composition/Common';

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

const KeyboardCounter: React.FC = () => {
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
  const initialCount = {
    루피: 0,
    조로: 0,
    나미: 0,
    우솝: 0,
    상디: 0,
    쵸파: 0,
    버기: 0,
    총병: 0,
    칼병: 0,
  };

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
    <div>
      <p>원랜디 조합식 - 키를 눌러 흔함의 개수 증가</p>
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
      <Uncommon initialCount={count} />
      <button onClick={handleReset}>모두 초기화</button>
    </div>
  );
};
//TODO: context로 유닛수 관리하기
const App: React.FC = () => {
  const initialCount = {
    루피: 0,
    조로: 0,
    나미: 0,
    우솝: 0,
    상디: 0,
    쵸파: 0,
    버기: 0,
    총병: 0,
    칼병: 0,
  };
  return (
    <div className="App">
      <header className="App-header">
        <Common initialCount={initialCount}>
          <Uncommon initialCount={initialCount} />
        </Common>
        {/* <KeyboardCounter /> */}
      </header>
    </div>
  );
};

export default App;
