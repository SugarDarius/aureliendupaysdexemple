'use client'

import { Canvas } from '@react-three/fiber'
import { FBOParticles } from '@/components/particles/fbo-particles'

export function ParticlesScene() {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
      <ambientLight intensity={0.5} />
      <FBOParticles />
    </Canvas>
  )
}
