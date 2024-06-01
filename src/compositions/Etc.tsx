/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { unit, useCount } from 'context/UnitCountContext';
import { UnitCount } from 'components';

export const Etc = () => {
  const { count, setCount } = useCount();
  const etcCount = {
    초월쿠마: count.초월쿠마,
    해적선: count.해적선,
    고대의배: count.고대의배,
    레일리: count.레일리,
    좀비: count.좀비,
    금: count.금,
    목재: count.목재,
    랜덤전용유닛: count.랜덤전용유닛,
    행운의토큰: count.행운의토큰,
  };

  return <UnitCount name={'기타'} UnitCount={etcCount} />;
};
