'use client'

import { useRef } from 'react'
import {
  type RootState,
  extend,
  useFrame,
  createPortal,
} from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import * as THREE from 'three'

import { SimulationMaterial } from '@/components/particles/simulation-material'
import { vertexShader, fragmentShader } from '@/components/particles/shaders'
import {
  scene,
  camera,
  positions,
  uvs,
  uniforms,
  particlesPosition,
  SIZE,
} from '@/components/particles/frame-buffer-object-particles-utils'

extend({ SimulationMaterial: SimulationMaterial })

export function FrameBufferObjectParticles() {
  const points = useRef<THREE.Points>(null)
  const simulationMaterialRef = useRef<SimulationMaterial>(null)

  const renderTarget = useFBO(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  })

  useFrame((state: RootState): void => {
    const { gl, clock } = state

    gl.setRenderTarget(renderTarget)
    gl.clear()
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    if (points.current) {
      ;(
        points.current.material as THREE.ShaderMaterial
      ).uniforms.uPositions.value = renderTarget.texture
    }

    if (simulationMaterialRef.current) {
      simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial ref={simulationMaterialRef} args={[SIZE]} />
          <bufferGeometry>
            <bufferAttribute
              attach='attributes-position'
              count={positions.length / 3}
              array={positions}
              itemSize={3}
              args={[positions, 3]}
            />
            <bufferAttribute
              attach='attributes-uv'
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
              args={[uvs, 2]}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
            args={[particlesPosition, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  )
}
