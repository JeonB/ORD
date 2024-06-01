/* eslint-disable */
import { useCount, unit } from 'src/context/UnitCountContext'
import React, { useEffect } from 'react'
import { UnitCount } from '@_components/UnitCount'
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
  const { count, setCount } = useCount()
  const commonCount = {
    루피: count.루피,
    조로: count.조로,
    나미: count.나미,
    우솝: count.우솝,
    상디: count.상디,
    쵸파: count.쵸파,
    버기: count.버기,
    총병: count.총병,
    칼병: count.칼병,
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
      setCount(prevCount => {
        const updatedCount: unit = { ...prevCount }
        updatedCount[characterKeys[key]] =
          (prevCount[characterKeys[key]] || 0) + 1
        return updatedCount
      })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [commonCount])

  // const resetCharacter = (unit: string) => {
  //   const matchResult = unit.match(/[가-힣]+/);
  //   const characterToReset = matchResult ? matchResult[0] : undefined;
  //   console.log(characterToReset);
  //   if (characterToReset) {
  //     handleCharacterReset(characterToReset);
  //   } else {
  //     console.error('유효한 한글 문자열을 찾을 수 없습니다.');
  //   }
  // };
  // const findKeyByValue = (
  //   value: string,
  //   obj: CharacterKeys,
  // ): string | undefined => {
  //   const entry = Object.entries(obj).find(([key, val]) => val === value);
  //   return entry ? entry[0] : undefined;
  // };

  return <UnitCount name={'흔함'} UnitCount={commonCount} />
}
