import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import PCCase from './PCCase'

function PCBuilderScene({ components }) {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -5]} intensity={0.5} />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* PC Components */}
      <PCCase caseType={components.case} motherboard={components.motherboard} />
    </Canvas>
  )
}

export default PCBuilderScene
