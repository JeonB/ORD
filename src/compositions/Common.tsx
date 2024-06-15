/* eslint-disable */
import { useCount, unit } from 'src/context/UnitCountContext'
import React, { useEffect } from 'react'
import { UnitCount } from '@_components/UnitCount'
import { useStore } from 'src/utils/zustandStore'
interface CharacterKeys {
  q: string
  w: string
  e: string
  r: string
  a: string
  s: string
  d: string
  f: string
  g: string
  [key: string]: string
}

export const Common = () => {
  // const { count, setCount } = useCount()
  const { unitCount, setUnitCount } = useStore()
  const commonCount = {
    루피: unitCount.루피,
    조로: unitCount.조로,
    나미: unitCount.나미,
    우솝: unitCount.우솝,
    상디: unitCount.상디,
    쵸파: unitCount.쵸파,
    버기: unitCount.버기,
    총병: unitCount.총병,
    칼병: unitCount.칼병,
  }
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
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase()
    if (characterKeys[key]) {
      setUnitCount(characterKeys[key], (unitCount[characterKeys[key]] || 0) + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [commonCount])

  return <UnitCount name={'흔함'} UnitCount={commonCount} />
}
