import { Object3DNode } from '@react-three/fiber'
import { SimulationMaterial } from './components/particles/simulation-material'

declare module '@react-three/fiber' {
  interface ThreeElements {
    simulationMaterial: Object3DNode<
      SimulationMaterial,
      typeof SimulationMaterial
    >
  }
}
