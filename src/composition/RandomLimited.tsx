import { Composition } from 'components';
import React from 'react';

export const RandomLimited = () => {
  const composition: { [key: string]: { [key: string]: number } } = {
    나미카제미나토: {
      나루토선인모드: 1,
      캐럿스론: 1,
      시노부: 1,
      행운의토큰: 1,
      목재: 7,
    },
    료우기시키: {
      이사야마요미: 1,
      비의시류: 1,
      류마: 1,
      나미: 1,
      행운의토큰: 1,
      목재: 7,
    },
    마운틴히그마: {
      센토이스즈: 1,
      랜덤전용유닛1기: 1,
      네코마무시: 1,
      샹크스: 1,
      행운의토큰: 1,
      목재: 7,
    },
    부릉냐: {
      이치의율자: 1,
      레이쥬: 1,
      써니호: 1,
      베이비5: 1,
      행운의토큰: 1,
      목재: 7,
    },
    아쿠모유카리: {
      야가미라이토: 1,
      랜덤전용유닛1기: 1,
      페로나고스트프린세스: 1,
      바솔로뮤쿠마: 1,
      행운의토큰: 1,
      목재: 7,
    },
    쿠죠죠타로: {
      쿠로사키이치고: 1,
      랜덤전용유닛1기: 1,
      에이스: 1,
      미호크: 1,
      행운의토큰: 1,
      목재: 7,
    },
    키쿄우: {
      하네카와츠바사: 1,
      로브루치: 1,
      레베카: 1,
      브룩음악가: 1,
      행운의토큰: 1,
      목재: 7,
    },
    타츠마키: {
      요츠바: 1,
      킹: 1,
      쿠마폭군: 1,
      행운의토큰: 1,
      목재: 7,
    },
  };
  return <Composition composition={composition} name={'랜덤제한됨'} />;
};