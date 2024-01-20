/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { unit, useCount } from 'context/UnitCountContext';
import { UnitCount } from 'components';

export const Random = () => {
  const { count, setCount } = useCount();
  const randomCount = {
    k: count.k,
    나루토선인모드: count.나루토선인모드,
    메구밍: count.메구밍,
    뱀파이어: count.뱀파이어,
    센토이스즈: count.센토이스즈,
    야가미라이토: count.야가미라이토,
    옌: count.옌,
    요츠바: count.요츠바,
    요미: count.요미,
    율자: count.율자,
    펭귄: count.펭귄,
    토우마: count.토우마,
    이치고: count.이치고,
    츠바사: count.츠바사,
  };

  return <UnitCount name={'랜덤'} UnitCount={randomCount} />;
};
