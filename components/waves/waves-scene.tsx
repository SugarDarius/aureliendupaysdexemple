'use client'

import { Canvas } from '@react-three/fiber'

export function WavesScene() {
  return (
    <div className='pointer-events-none fixed left-0 top-0 h-screen w-screen'>
      <Canvas camera={{ position: [0, 0.5, 1], fov: 75 }}>
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}
