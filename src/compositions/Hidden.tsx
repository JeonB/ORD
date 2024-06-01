import { Composition } from '@_components/Composition'
import React from 'react'

export const Hidden = () => {
  const composition: { [key: string]: { [key: string]: number } } = {
    갓에넬방주맥심: {
      우솝: 10,
      상디: 4,
      칼병: 4,
      나미: 3,
      총병: 2,
      버기: 2,
      루피: 1,
      쵸파: 1,
      해적선: 1,
    },
    검호류마: {
      조로: 11,
      쵸파: 5,
      칼병: 3,
      우솝: 2,
      상디: 2,
      총병: 2,
      나미: 1,
      버기: 1,
    },
    베르고: {
      총병: 6,
      루피: 5,
      칼병: 5,
      나미: 4,
      상디: 4,
      쵸파: 4,
      조로: 3,
      버기: 3,
      우솝: 2,
    },
    레드포스호: {
      우솝: 10,
      버기: 8,
      루피: 5,
      상디: 5,
      쵸파: 4,
      칼병: 3,
      목재: 3,
      총병: 2,
      조로: 1,
      나미: 1,
      해적선: 1,
    },
    레베카: {
      버기: 6,
      총병: 5,
      조로: 3,
      나미: 3,
      우솝: 2,
      상디: 2,
      쵸파: 2,
      루피: 1,
    },
    료쿠규: {
      조로: 10,
      우솝: 8,
      루피: 6,
      나미: 6,
      상디: 5,
      쵸파: 4,
      총병: 3,
      칼병: 2,
      버기: 2,
    },
    모비딕호: {
      총병: 6,
      루피: 3,
      칼병: 3,
      나미: 2,
      쵸파: 2,
      조로: 1,
      우솝: 1,
      상디: 1,
      버기: 1,
      해적선: 1,
    },
    반더데켄히든: {
      총병: 8,
      루피: 6,
      나미: 5,
      칼병: 5,
      쵸파: 4,
      조로: 2,
      우솝: 2,
      상디: 1,
      버기: 1,
      해적선: 1,
    },
    발라티에: {
      상디: 4,
      루피: 3,
      조로: 3,
      나미: 3,
      총병: 2,
      우솝: 1,
      버기: 1,
      해적선: 1,
    },
    봉쿠레히든: { 나미: 7, 루피: 4, 상디: 4, 조로: 3, 버기: 3, 총병: 2 },
    사보용조권: {
      루피: 9,
      조로: 8,
      쵸파: 8,
      상디: 6,
      총병: 4,
      우솝: 3,
      버기: 2,
      나미: 1,
      칼병: 1,
    },
    사우전드써니호: {
      나미: 7,
      칼병: 5,
      쵸파: 4,
      상디: 3,
      총병: 3,
      버기: 3,
      루피: 2,
      조로: 1,
      해적선: 1,
    },
    시류부선장: {
      칼병: 9,
      우솝: 7,
      총병: 7,
      버기: 5,
      루피: 4,
      상디: 4,
      쵸파: 2,
    },
    아카이누붉은개: {
      루피: 6,
      총병: 6,
      조로: 5,
      우솝: 5,
      쵸파: 4,
      나미: 3,
      상디: 3,
      칼병: 3,
      버기: 3,
    },
    엠포리오이완코브: {
      우솝: 6,
      상디: 6,
      버기: 6,
      나미: 4,
      루피: 3,
      조로: 3,
      칼병: 2,
      쵸파: 1,
      총병: 1,
    },
    미호크매의눈: {
      칼병: 7,
      조로: 5,
      우솝: 5,
      루피: 4,
      총병: 4,
      버기: 4,
      나미: 3,
      쵸파: 3,
    },
    캐럿: {
      좀비: 6,
      쵸파: 5,
      조로: 3,
      상디: 3,
      루피: 2,
      나미: 2,
      우솝: 2,
      칼병: 2,
      총병: 1,
      버기: 1,
      레일리: 1,
    },
    코알라혁명군: {
      루피: 9,
      우솝: 9,
      총병: 8,
      나미: 7,
      조로: 5,
      상디: 5,
      쵸파: 5,
      칼병: 5,
      버기: 5,
      목재: 3,
    },
    쿠잔푸른꿩: {
      쵸파: 7,
      칼병: 7,
      나미: 5,
      총병: 5,
      루피: 4,
      우솝: 4,
      상디: 4,
      조로: 3,
      버기: 2,
    },
    킨에몬사무라이: {
      조로: 7,
      총병: 6,
      쵸파: 4,
      칼병: 4,
      루피: 3,
      버기: 3,
      나미: 2,
      우솝: 1,
      상디: 1,
    },

    킬러초신성살육무사: {
      나미: 5,
      버기: 5,
      조로: 4,
      쵸파: 4,
      총병: 4,
      칼병: 2,
      루피: 1,
      우솝: 1,
      상디: 1,
    },
    페로나고스트프린세스: {
      조로: 13,
      쵸파: 9,
      나미: 7,
      상디: 7,
      좀비: 6,
      칼병: 5,
      우솝: 4,
      버기: 4,
      루피: 3,
      목재: 3,
      총병: 2,
    },
    피셔타이거: {
      루피: 8,
      나미: 7,
      총병: 5,
      조로: 3,
      우솝: 2,
      칼병: 2,
      상디: 1,
      쵸파: 1,
      버기: 1,
      레일리: 1,
    },
  }
  return <Composition composition={composition} name={'히든'} />
}
