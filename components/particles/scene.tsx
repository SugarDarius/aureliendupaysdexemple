'use client'

import { Canvas } from '@react-three/fiber'

export function Scene() {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
      <ambientLight intensity={0.5} />
    </Canvas>
  )
}
