'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useTimeout } from '@/hooks/use-timeout'

export type SVGPoint = { x: number; y: number }
export type SVGPath = {
  id: string
  points: SVGPoint[]
  strokeColor: string
  strokeWidth: number
  ended: boolean
}

type SVGLine = { length: number; angle: number }
const getVectorLine = (p0: SVGPoint, p1: SVGPoint): SVGLine => {
  const distanceX = p1.x - p0.x
  const distanceY = p1.y - p0.y

  const length = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
  const angle = Math.atan2(distanceY, distanceX)

  return { length, angle }
}

type SVGControlPoint = { x: number; y: number }
type SVGControlPoints = {
  current: SVGPoint
  previous?: SVGPoint
  next?: SVGPoint
  reverse?: boolean
}
const getControlPoint = (
  controlPoints: SVGControlPoints,
  curveSmoothing: number
): SVGControlPoint => {
  const { current, next, previous, reverse = false } = controlPoints

  const p0 = previous || current
  const p1 = next || current
  const vectorLine = getVectorLine(p0, p1)

  const angle = vectorLine.angle + (reverse ? Math.PI : 0)
  const length = vectorLine.length * curveSmoothing

  const x = current.x + Math.cos(angle) * length
  const y = current.y + Math.sin(angle) * length

  return { x, y }
}

const getCubicBezierCurve = (
  point: SVGPoint,
  index: number,
  points: SVGPoint[],
  curveSmoothing: number
): string => {
  let startControlPoint: SVGControlPoint

  if (index === 0) {
    startControlPoint = getControlPoint({ current: point }, curveSmoothing)
  } else if (index === 1) {
    startControlPoint = getControlPoint(
      {
        current: points[index - 1],
        next: point,
      },
      curveSmoothing
    )
  } else {
    startControlPoint = getControlPoint(
      {
        current: points[index - 1],
        previous: points[index - 2],
        next: point,
      },
      curveSmoothing
    )
  }

  const endControlPoint = getControlPoint(
    {
      current: point,
      previous: points[index - 1],
      next: points[index + 1],
      reverse: true,
    },
    curveSmoothing
  )

  return `C ${startControlPoint.x},${startControlPoint.y} ${endControlPoint.x},${endControlPoint.y} ${point.x},${point.y}`
}

export function SVGCanvasPath({
  id,
  points,
  strokeWidth,
  strokeColor,
  curveSmoothing,
  ended,
}: SVGPath & { curveSmoothing: number }) {
  const controls = useAnimationControls()

  useTimeout(
    (): void => {
      const disappearAnimation = async (): Promise<void> => {
        await controls.start({
          opacity: 0,
          transition: { duration: 1.5, ease: 'linear' },
        })
      }

      disappearAnimation().then((): void => {
        // TODO: remove from paths state
      })
    },
    ended ? 5000 : null
  )

  if (points.length === 1) {
    const point = points[0]
    const r = strokeWidth / 2

    return (
      <motion.circle
        id={id}
        cx={point.x}
        cy={point.y}
        r={r}
        stroke={strokeColor}
        fill={strokeColor}
        animate={controls}
        initial={{ opacity: 1 }}
      />
    )
  }

  const d = points.reduce<string>((d, point, index, points) => {
    return index === 0
      ? `M ${point.x},${point.y}`
      : `${d} ${getCubicBezierCurve(point, index, points, curveSmoothing)}`
  }, '')

  return (
    <motion.path
      id={id}
      d={d}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      fill='none'
      animate={controls}
      initial={{ opacity: 1 }}
    />
  )
}
