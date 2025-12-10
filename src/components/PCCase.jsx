import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'

function PCCase({ caseSpec, motherboardSpec, gpuSpec, panelOverlay, placeholderTexture }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06
    }
  })

  const dimensions = useMemo(() => {
    if (!caseSpec) return { width: 2, height: 2.4, depth: 2 }
    if (caseSpec.size === 'sff') return { width: 1.4, height: 1.7, depth: 1.6 }
    if (caseSpec.size === 'tower') return { width: 1.9, height: 2.3, depth: 2 }
    return { width: 1.8, height: 2, depth: 1.8 }
  }, [caseSpec])

  const panelTexture = useTexture(panelOverlay?.image || placeholderTexture)
  const configuredTexture = useMemo(() => {
    if (!panelTexture) return null
    const clone = panelTexture.clone()
    clone.wrapS = clone.wrapT = RepeatWrapping
    clone.repeat.set(panelOverlay.scale, panelOverlay.scale)
    clone.needsUpdate = true
    return clone
  }, [panelOverlay.scale, panelTexture])

  const motherboardWidth = motherboardSpec?.formFactor === 'microatx' ? 0.9 : 1.1
  const motherboardDepth = motherboardSpec?.formFactor === 'microatx' ? 0.9 : 1.1

  const gpuLength = gpuSpec?.length === 'long' ? 1.2 : 0.95
  const gpuColor = gpuSpec?.hasRender ? '#111827' : '#334155'

  return (
    <group ref={groupRef} position={[0, dimensions.height / 2, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
        <meshStandardMaterial
          color={caseSpec?.hasRender ? '#0b1221' : '#1f2937'}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0, dimensions.depth / 2 + 0.01]} castShadow>
        <boxGeometry args={[dimensions.width * 0.82, dimensions.height * 0.9, 0.05]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh position={[0, dimensions.height / 2 - 0.18, dimensions.depth / 2 + 0.03]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.6} />
      </mesh>

      {[...Array(5)].map((_, i) => (
        <mesh
          key={`vent-${i}`}
          position={[dimensions.width / 2 + 0.01, dimensions.height / 4 + (i - 2) * 0.2, 0]}
        >
          <boxGeometry args={[0.02, 0.1, dimensions.depth * 0.6]} />
          <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {motherboardSpec && (
        <group position={[0, -0.25, -dimensions.depth / 3]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[motherboardWidth, 0.06, motherboardDepth]} />
            <meshStandardMaterial
              color={motherboardSpec.hasRender ? '#111827' : '#334155'}
              metalness={0.35}
              roughness={0.65}
            />
          </mesh>

          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.3]} />
            <meshStandardMaterial color="#6b7280" metalness={0.6} roughness={0.4} />
          </mesh>

          {[0, 1].map((i) => (
            <mesh key={`ram-${i}`} position={[-0.35 + i * 0.25, 0.08, 0.32]}>
              <boxGeometry args={[0.16, 0.08, 0.02]} />
              <meshStandardMaterial color="#8b5cf6" metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}

      {gpuSpec && (
        <group position={[0, -0.15, -dimensions.depth / 6]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[gpuLength, 0.2, 0.35]} />
            <meshStandardMaterial color={gpuColor} metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[gpuLength * 0.8, 0.05, 0.2]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      )}

      <mesh position={[dimensions.width / 2 + 0.03 + panelOverlay.position.x, 0, 0]} castShadow>
        <planeGeometry args={[dimensions.height * 0.9 * panelOverlay.scale, dimensions.height * 0.9 * panelOverlay.scale]} />
        <meshStandardMaterial map={configuredTexture} transparent opacity={panelOverlay.opacity} side={2} />
      </mesh>

      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh
            key={`foot-${x}-${z}`}
            position={[x * (dimensions.width / 2 - 0.1), -dimensions.height / 2 - 0.05, z * (dimensions.depth / 2 - 0.1)]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        )),
      )}
    </group>
  )
}

export default PCCase
