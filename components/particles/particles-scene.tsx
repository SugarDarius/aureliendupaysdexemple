'use client'

import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { SimulationMaterial } from '@/components/particles/simulation-material'

extend({ SimulationMaterial })

export function ParticlesScene() {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
    </Canvas>
  )
}
