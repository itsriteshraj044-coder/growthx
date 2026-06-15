import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 70;
const CONNECT_DISTANCE = 2.6;

/** Procedural constellation: nodes scattered in space, linked when close together. */
function Network() {
  const group = useRef<THREE.Group>(null);

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
        ),
      );
    }

    const lines: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DISTANCE) {
          lines.push(...nodes[i].toArray(), ...nodes[j].toArray());
        }
      }
    }

    const nodeArr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => n.toArray(nodeArr, i * 3));

    return {
      nodePositions: nodeArr,
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.25 + pointer.x * 0.18;
    group.current.rotation.x = Math.cos(clock.elapsedTime * 0.04) * 0.1 - pointer.y * 0.12;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#3CB98C"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1B5288" transparent opacity={0.28} />
      </lineSegments>
    </group>
  );
}

/** Interactive 3D network background for the Contact page. */
export default function NetworkScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Network />
    </Canvas>
  );
}
