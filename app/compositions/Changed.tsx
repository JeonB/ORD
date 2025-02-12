/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Composition } from '@_components/Composition'

export const Changed = () => {
  const composition: { [key: string]: { [key: string]: number } } = {
    어둠의브로커: { 도플라밍고: 1, 목재: 10 },
    초토화모드: { 베이비5: 1, 목재: 10 },
    알라바스타의왕녀: { 비비: 1, 목재: 10 },
    캐럿: { 캐럿: 1, 목재: 10 },
    타시기: { 골D에이스: 1, 목재: 10 },
  }

  return <Composition composition={composition} name={'변화된'} />
}
