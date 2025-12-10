import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function PCCase({ caseType, motherboard }) {
  const groupRef = useRef()
  
  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })
  
  // Case dimensions based on type
  const dimensions = caseType === 'compact' 
    ? { width: 1.5, height: 2, depth: 1.5 }
    : { width: 2, height: 2.5, depth: 2 }
  
  return (
    <group ref={groupRef} position={[0, dimensions.height / 2, 0]}>
      {/* Main case body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
        <meshStandardMaterial 
          color={caseType === 'compact' ? '#2a2a2a' : '#1a1a1a'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Front panel accent */}
      <mesh position={[0, 0, dimensions.depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[dimensions.width * 0.8, dimensions.height * 0.9, 0.05]} />
        <meshStandardMaterial 
          color="#667eea"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Power button */}
      <mesh position={[0, dimensions.height / 2 - 0.2, dimensions.depth / 2 + 0.03]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial 
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Side panel vents */}
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={`vent-${i}`}
          position={[dimensions.width / 2 + 0.01, dimensions.height / 4 + (i - 2) * 0.2, 0]}
        >
          <boxGeometry args={[0.02, 0.1, dimensions.depth * 0.6]} />
          <meshStandardMaterial 
            color="#3a3a3a"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      ))}
      
      {/* Motherboard inside (if selected) */}
      {motherboard && (
        <group position={[0, -0.3, -dimensions.depth / 3]}>
          <mesh>
            <boxGeometry args={[dimensions.width * 0.7, 0.05, dimensions.depth * 0.6]} />
            <meshStandardMaterial 
              color="#1e3a1e"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
          
          {/* CPU socket representation */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.3]} />
            <meshStandardMaterial 
              color="#4a4a4a"
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
          
          {/* RAM slots */}
          {[0, 1].map((i) => (
            <mesh 
              key={`ram-${i}`}
              position={[-0.4 + i * 0.2, 0.05, 0.3]}
            >
              <boxGeometry args={[0.15, 0.08, 0.02]} />
              <meshStandardMaterial 
                color={motherboard === 'atx' ? '#667eea' : '#764ba2'}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Bottom feet */}
      {[-1, 1].map((x) => ([-1, 1].map((z) => (
        <mesh 
          key={`foot-${x}-${z}`}
          position={[
            x * (dimensions.width / 2 - 0.1), 
            -dimensions.height / 2 - 0.05, 
            z * (dimensions.depth / 2 - 0.1)
          ]}
        >
          <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
      ))))}
    </group>
  )
}

export default PCCase
