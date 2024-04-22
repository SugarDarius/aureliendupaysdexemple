'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function ParticlesScene() {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
    </Canvas>
  )
}
