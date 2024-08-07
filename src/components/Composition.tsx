import { useCount } from 'src/context/UnitCountContext'
import React, { useState, useEffect, useCallback } from 'react'
import { CompositionTable } from './CompositionTable'
import { useStore } from 'src/utils/zustandStore'

export const Composition = React.memo(
  (props: {
    composition: { [key: string]: { [key: string]: number } }
    name: string
  }) => {
    const { composition, name } = props
    //useCount()에 정의된 count(흔함유닛 개수) 호출
    // const { count, setCount } = useCount()
    const count = useStore(state => state.unitCount)
    const setCount = useStore(state => state.setUnitCount)
    const [completion, setCompletion] = useState<{ [key: string]: number }>(
      Object.fromEntries(Object.keys(composition).map(unit => [unit, 0])),
    )

    const calculateCompletion = useCallback(() => {
      Object.keys(composition).forEach(unit => {
        const unitConditions = composition[unit]
        const totalConditions = Object.keys(unitConditions).length
        const totalUnitCount = Object.keys(unitConditions).reduce(
          (accumulator, unit) => accumulator + unitConditions[unit],
          0,
        )
        let satisfiedConditions = 0
        const checkUnitCondition = Object.keys(unitConditions).reduce(
          (accumulator, condition) => {
            const isSameUnitCondition =
              count[condition] < unitConditions[condition]
            if (isSameUnitCondition) {
              return accumulator + count[condition]
            } else {
              satisfiedConditions++
              return accumulator + unitConditions[condition]
            }
          },
          0,
        )
        if (satisfiedConditions < totalConditions) {
          completion[unit] = (checkUnitCondition / totalUnitCount) * 100
        } else {
          //조건식을 만족하는 조합 유닛의 최소 조합 유닛을 기준으로 조합도 산출
          const minSatisfiedCondition = Object.keys(unitConditions).reduce(
            (accumulator, condition) => {
              const conditionRatio =
                count[condition] / unitConditions[condition]

              return Math.min(accumulator, conditionRatio)
            },
            Infinity,
          )
          completion[unit] = minSatisfiedCondition * 100
        }
      })

      return { ...completion }
    }, [count, composition])

    const [memoizedCompletion, setMemoizedCompletion] = useState<{
      [key: string]: number
    }>(() => calculateCompletion())

    useEffect(() => {
      setMemoizedCompletion(calculateCompletion())
    }, [count])

    const handleCombine = (unit: string) => {
      const unitCondition = composition[unit]

      if (memoizedCompletion[unit] >= 100) {
        const newCompletion = { ...completion }
        newCompletion[unit] -= 100
        setCompletion(newCompletion) // 리렌더링함으로써 UI업데이트

        Object.keys(unitCondition).forEach(condition => {
          const currentCount = count[condition]
          const decrement = unitCondition[condition]
          setCount(condition, currentCount - decrement)
        })
      }
    }
    return (
      <CompositionTable
        name={name}
        completion={memoizedCompletion}
        handleCombine={handleCombine}
      />
    )
  },
)
Composition.displayName = 'Composition'
