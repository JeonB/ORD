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
  commonCount: common;
  setCommonCount: Dispatch<SetStateAction<common>>;
  unCommonCount: uncommon;
  setUnCommonCount: Dispatch<SetStateAction<uncommon>>;
  specialCount: special;
  setSpecialCount: Dispatch<SetStateAction<special>>;
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
interface uncommon {
  후쿠로: number;
  블루노: number;
  니코로빈: number;
  베포: number;
  브룩: number;
  이나즈마: number;
  저격왕: number;
  타시기: number;
  럼블볼: number;
  페로나: number;
  에이스: number;
  프랑키: number;
  하찌: number;
  [key: string]: number;
}
interface special {
  드레이크: number;
  갓에넬: number;
  겟코모리아: number;
  크리마텍트: number;
  오하라: number;
  루치: number;
  귀기: number;
  마르코: number;
  기어세컨드: number;
  쿠마: number;
  호킨스: number;
  마기탄: number;
  봉쿠레: number;
  검은다리: number;
  스모커: number;
  스쿼드: number;
  아론: number;
  화염탄: number;
  키드: number;
  이나즈마혁명군: number;
  징베: number;
  챠카: number;
  갱벳지: number;
  캡틴크로: number;
  크로커다일: number;
  킬러: number;
  쵸파두뇌강화: number;
  쵸파가드포인트: number;
  로우: number;
  파이러츠도킹: number;
  에이스특별함: number;
  헤르메포: number;
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
  const initialCommonCount = {
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
  const initialUnCommonCount = {
    후쿠로: 0,
    블루노: 0,
    니코로빈: 0,
    베포: 0,
    브룩: 0,
    이나즈마: 0,
    저격왕: 0,
    타시기: 0,
    럼블볼: 0,
    페로나: 0,
    에이스: 0,
    프랑키: 0,
    하찌: 0,
  };

  const initialSpecialCount = {
    드레이크: 0,
    갓에넬: 0,
    겟코모리아: 0,
    크리마텍트: 0,
    오하라: 0,
    루치: 0,
    귀기: 0,
    마르코: 0,
    기어세컨드: 0,
    쿠마: 0,
    호킨스: 0,
    마기탄: 0,
    봉쿠레: 0,
    검은다리: 0,
    스모커: 0,
    스쿼드: 0,
    아론: 0,
    화염탄: 0,
    키드: 0,
    이나즈마혁명군: 0,
    징베: 0,
    챠카: 0,
    갱벳지: 0,
    캡틴크로: 0,
    크로커다일: 0,
    킬러: 0,
    쵸파두뇌강화: 0,
    쵸파가드포인트: 0,
    로우: 0,
    파이러츠도킹: 0,
    에이스특별함: 0,
    헤르메포: 0,
  };

  const [commonCount, setCommonCount] = useState(initialCommonCount);
  const [unCommonCount, setUnCommonCount] = useState(initialUnCommonCount);
  const [specialCount, setSpecialCount] = useState(initialSpecialCount);

  return (
    <UnitCountContext.Provider
      value={{
        commonCount,
        setCommonCount,
        unCommonCount,
        setUnCommonCount,
        specialCount,
        setSpecialCount,
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
