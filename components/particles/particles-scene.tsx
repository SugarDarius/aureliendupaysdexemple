'use client'

import { Canvas } from '@react-three/fiber'
import { FrameBufferObjectParticles } from '@/components/particles/frame-buffer-object-particles'

export function ParticlesScene() {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
      <ambientLight intensity={0.5} />
      <FrameBufferObjectParticles />
    </Canvas>
  )
}
