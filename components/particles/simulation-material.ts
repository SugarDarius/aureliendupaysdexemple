import type { IUniform } from 'three'
import {
  ShaderMaterial,
  MathUtils,
  DataTexture,
  RGBAFormat,
  FloatType,
} from 'three'

import {
  simulationVertexShader,
  simulationFragmentShader,
} from '@/components/particles/simulation-shaders'

const getRandomDataSphere = (size: number): Float32Array => {
  const length = size ** 2 * 4
  const data = new Float32Array(length)

  for (let i = 0; i < length; i += 1) {
    const stride = i * 4

    const distance = Math.sqrt(Math.random()) * 2
    const theta = MathUtils.randFloatSpread(360)
    const phi = MathUtils.randFloatSpread(360)

    data[stride] = distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi)
    data[stride + 2] = distance * Math.cos(theta)
    data[stride + 3] = 1 // NOTE: no impact
  }

  return data
}

const getRandomDataBox = (size: number): Float32Array => {
  const length = size ** 2 * 4
  const data = new Float32Array(length)

  for (let i = 0; i < length; i += 1) {
    const stride = i * 4

    data[stride] = (Math.random() - 0.5) * 2
    data[stride + 1] = (Math.random() - 0.5) * 2
    data[stride + 2] = (Math.random() - 0.5) * 2
    data[stride + 3] = 1 // NOTE: no impact
  }

  return data
}

export class SimulationMaterial extends ShaderMaterial {
  constructor(size: number) {
    const dataSphere = getRandomDataSphere(size)
    const positionsTextureA = new DataTexture(
      dataSphere,
      size,
      size,
      RGBAFormat,
      FloatType,
    )
    positionsTextureA.needsUpdate = true

    const dataBox = getRandomDataBox(size)
    const positionsTextureB = new DataTexture(
      dataBox,
      size,
      size,
      RGBAFormat,
      FloatType,
    )
    positionsTextureB.needsUpdate = true

    const simulationUniforms: Record<string, IUniform> = {
      positionsA: { value: positionsTextureA },
      positionsB: { value: positionsTextureB },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
    }

    super({
      fragmentShader: simulationFragmentShader,
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
    })
  }
}
