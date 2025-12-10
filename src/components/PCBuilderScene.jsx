import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, Environment, OrbitControls, PerspectiveCamera, RandomizedLight } from '@react-three/drei'
import PCCase from './PCCase'

function PCBuilderScene({ components, panelOverlay, placeholderTexture }) {
  return (
    <Canvas shadows gl={{ antialias: true }} dpr={[1, 1.5]}>
      <PerspectiveCamera makeDefault position={[5.5, 3, 5.5]} fov={48} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={3}
        maxDistance={12}
        target={[0, 1.4, 0]}
      />

      <Environment preset="city" background={false} />

      <ambientLight intensity={0.45} />
      <directionalLight
        position={[6, 8, 2]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <gridHelper args={[20, 20, '#1e293b', '#1e293b']} position={[0, -1, 0]} />

      <AccumulativeShadows frames={60} alphaTest={0.85} opacity={0.6} color="#0f172a" position={[0, -1, 0]}>
        <RandomizedLight amount={6} position={[5, 8, -5]} radius={8} intensity={1.6} bias={0.002} />
      </AccumulativeShadows>

      <PCCase
        caseSpec={components.case}
        motherboardSpec={components.motherboard}
        gpuSpec={components.gpu}
        panelOverlay={panelOverlay}
        placeholderTexture={placeholderTexture}
      />
    </Canvas>
  )
}

export default PCBuilderScene
