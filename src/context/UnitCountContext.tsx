import { Stack } from '@mui/material';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface UnitCountContextData {
  count: unit;
  setCount: Dispatch<SetStateAction<unit>>;
}
interface unit {
  루피: number;
  조로: number;
  나미: number;
  우솝: number;
  상디: number;
  쵸파: number;
  버기: number;
  총병: number;
  칼병: number;
  k: number;
  나루토선인모드: number;
  메구밍: number;
  뱀파이어: number;
  센토이스즈: number;
  야가미라이토: number;
  옌: number;
  요츠바: number;
  요미: number;
  율자: number;
  펭귄: number;
  토우마: number;
  이치고: number;
  츠바사: number;
  초월쿠마: number;
  해적선: number;
  고대의배: number;
  레일리: number;
  좀비: number;
  금: number;
  목재: number;
  랜덤전용유닛: number;
  행운의토큰: number;
  [key: string]: number; // 인덱스 시그니처 추가
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
    k: 0,
    나루토선인모드: 0,
    메구밍: 0,
    뱀파이어: 0,
    센토이스즈: 0,
    야가미라이토: 0,
    옌: 0,
    요츠바: 0,
    요미: 0,
    율자: 0,
    펭귄: 0,
    토우마: 0,
    이치고: 0,
    츠바사: 0,
    초월쿠마: 0,
    해적선: 0,
    고대의배: 0,
    레일리: 0,
    좀비: 0,
    금: 0,
    목재: 0,
    랜덤전용유닛: 0,
    행운의토큰: 0,
  };
  const [count, setCount] = useState(initialCount);
  return (
    <UnitCountContext.Provider
      value={{
        count,
        setCount,
      }}>
      <Stack direction={'row'}>{children}</Stack>
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
export type { unit };
