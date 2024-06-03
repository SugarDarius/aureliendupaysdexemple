'use client'

export type SVGPoint = { x: number; y: number }
export type SVGPath = {
  id: string
  points: SVGPoint[]
  strokeColor: string
  strokeWidth: number
  opacity: number
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
const getControlPoint = (controlPoints: SVGControlPoints): SVGControlPoint => {
  const { current, next, previous, reverse = false } = controlPoints

  const p0 = previous || current
  const p1 = next || current

  const smoothing = 0.4
  const vectorLine = getVectorLine(p0, p1)

  const angle = vectorLine.angle + (reverse ? Math.PI : 0)
  const length = vectorLine.length * smoothing

  const x = current.x + Math.cos(angle) * length
  const y = current.y + Math.sin(angle) * length

  return { x, y }
}

const getCubicBezierCurve = (
  point: SVGPoint,
  index: number,
  points: SVGPoint[]
): string => {
  let startControlPoint: SVGControlPoint

  if (index === 0) {
    startControlPoint = getControlPoint({ current: point })
  } else if (index === 1) {
    startControlPoint = getControlPoint({
      current: points[index - 1],
      next: point,
    })
  } else {
    startControlPoint = getControlPoint({
      current: points[index - 1],
      previous: points[index - 2],
      next: point,
    })
  }

  const endControlPoint = getControlPoint({
    current: point,
    previous: points[index - 1],
    next: points[index + 1],
    reverse: true,
  })

  return `C ${startControlPoint.x},${startControlPoint.y} ${endControlPoint.x},${endControlPoint.y} ${point.x},${point.y}`
}

export function SVGCanvasPath({
  id,
  points,
  strokeWidth,
  strokeColor,
  opacity,
}: SVGPath) {
  if (points.length === 1) {
    const point = points[0]
    const r = strokeWidth / 2

    return (
      <circle
        id={id}
        cx={point.x}
        cy={point.y}
        r={r}
        stroke={strokeColor}
        fill={strokeColor}
        opacity={opacity}
      />
    )
  }

  const d = points.reduce<string>((d, point, index, points) => {
    return index === 0
      ? `M ${point.x},${point.y}`
      : `${d} ${getCubicBezierCurve(point, index, points)}`
  }, '')

  return (
    <path
      id={id}
      d={d}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeOpacity={opacity}
      strokeLinecap='round'
      fill='none'
    />
  )
}
