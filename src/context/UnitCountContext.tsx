import { Stack } from '@mui/material';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

interface UnitCountContextData {
  handleReset: () => void;
  handleCharacterReset: (character: string) => void;
  count: common;
  setCount: Dispatch<SetStateAction<common>>;
}
interface common {
  루피: number;
  조로: number;
  나미: number;
  우솝: number;
  상디: number;
  쵸파: number;
  버기: number;
  총병: number;
  칼병: number;
  [key: string]: number; // 인덱스 시그니처 추가
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
interface UnitCountContextProviderProps {
  children: ReactNode;
}

const UnitCountContext = createContext<UnitCountContextData | undefined>(
  undefined,
);

const UnitCountContextProvider: React.FC<UnitCountContextProviderProps> = ({
  children,
}) => {
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
        };
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
  }, [count, initialCount]);

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
    <UnitCountContext.Provider
      value={{
        handleReset,
        handleCharacterReset,
        count,
        setCount,
      }}>
      <Stack direction={'row'}>
        <Stack>
          {Object.entries(characterKeys).map(([key, character]) => (
            <div key={key}>
              <p>
                {`${character} ${key}: ${
                  count[character as keyof typeof count]
                }`}

                <button
                  style={{ marginLeft: 20 }}
                  onClick={() => handleCharacterReset(character)}>
                  초기화
                </button>
              </p>
            </div>
          ))}
        </Stack>
        {children}
      </Stack>
      <button onClick={handleReset}>모두 초기화</button>
    </UnitCountContext.Provider>
  );
};

const useCount = (): UnitCountContextData => {
  const context = useContext(UnitCountContext);
  if (!context) {
    throw new Error('프로바이더 내부에서 생성해야 돼요 님아');
  }
  return context;
};

export { UnitCountContextProvider, useCount };
