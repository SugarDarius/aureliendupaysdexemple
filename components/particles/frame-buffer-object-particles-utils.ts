import type { IUniform } from 'three'
import { Scene, OrthographicCamera } from 'three'

export const SIZE = 128

export const scene = new Scene()
export const camera = new OrthographicCamera(-1, 1, 1, -1, 1 / 2 ** 53, 1)

export const positions = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
])
export const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])

const getParticlesPosition = (): Float32Array => {
  const length = SIZE ** 2
  const particles = new Float32Array(length * 3)

  for (let i = 0; i < length; i += 1) {
    const i3 = i * 3
    particles[i3 + 0] = (i % SIZE) / SIZE
    particles[i3 + 1] = i / SIZE / SIZE
  }

  return particles
}

export const particlesPosition = getParticlesPosition()
export const uniforms: Record<string, IUniform> = {
  uPositions: {
    value: null,
  },
}
