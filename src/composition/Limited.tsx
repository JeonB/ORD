/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Composition } from 'components/Composition';

export const Limited = () => {
  const composition: { [key: string]: { [key: string]: number } } = {
    레베카콜로세움: {
      목재: 18,
      버기: 15,
      나미: 10,
      총병: 10,
      조로: 8,
      우솝: 8,
      쵸파: 8,
      칼병: 7,
      상디: 5,
      루피: 3,
    },
    마르코흰수염유산의수호자: {
      총병: 16,
      루피: 14,
      목재: 11,
      나미: 9,
      쵸파: 9,
      칼병: 9,
      조로: 8,
      상디: 7,
      버기: 6,
      우솝: 4,
    },
    샬롯카타쿠리: {
      상디: 12,
      조로: 10,
      나미: 9,
      목재: 8,
      루피: 7,
      쵸파: 7,
      총병: 7,
      버기: 7,
      우솝: 5,
      칼병: 5,
    },
    시노부뇌쇄: {
      조로: 12,
      칼병: 11,
      총병: 11,
      목재: 11,
      루피: 10,
      나미: 10,
      쵸파: 10,
      우솝: 5,
      상디: 5,
      버기: 4,
      해적선: 1,
    },
    아인: {
      우솝: 11,
      쵸파: 9,
      루피: 8,
      상디: 8,
      총병: 8,
      목재: 8,
      나미: 7,
      칼병: 7,
      조로: 3,
      버기: 3,
      행운의토큰: 2,
    },
    에넬: {
      칼병: 13,
      우솝: 10,
      나미: 8,
      버기: 8,
      목재: 8,
      루피: 7,
      상디: 7,
      쵸파: 7,
      총병: 6,
      조로: 3,
      해적선: 2,
    },
    크로커다일사막의악어: {
      목재: 15,
      우솝: 11,
      루피: 9,
      총병: 9,
      나미: 8,
      칼병: 7,
      조로: 6,
      버기: 6,
      상디: 5,
      쵸파: 5,
    },
    킹삼재해: {
      총병: 19,
      칼병: 16,
      버기: 12,
      목재: 11,
      쵸파: 9,
      루피: 7,
      나미: 7,
      상디: 6,
      우솝: 5,
      조로: 2,
      고대의배: 1,
    },
    패트릭레드필드: {
      총병: 13,
      루피: 12,
      나미: 12,
      조로: 11,
      목재: 11,
      우솝: 9,
      상디: 9,
      쵸파: 9,
      칼병: 9,
      버기: 7,
    },
  };

  return <Composition composition={composition} name={'제한됨'} />;
};
