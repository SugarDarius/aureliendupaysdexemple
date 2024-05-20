import { useEffect, useLayoutEffect } from 'react'

type UseIsomorphicLayoutEffectReturnType =
  | typeof useLayoutEffect
  | typeof useEffect

export const useIsomorphicLayoutEffect: UseIsomorphicLayoutEffectReturnType =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
