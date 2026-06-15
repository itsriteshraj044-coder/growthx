import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  geometry: 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron';
  scale?: number;
  color?: string;
}

function Shape({ position, geometry, scale = 1, color = '#3CB98C' }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.12;
      ref.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[0.8, 0.3, 12, 36]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function ParallaxGroup() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.2 - group.current.rotation.y) * 0.03;
      group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <Shape position={[-4.5, 1.8, -2]} geometry="icosahedron" scale={1.1} />
      <Shape position={[4.6, -1.2, -3]} geometry="torus" scale={1.3} color="#1B5288" />
      <Shape position={[3.8, 2.4, -4]} geometry="octahedron" scale={0.9} />
      <Shape position={[-3.6, -2.2, -3]} geometry="dodecahedron" scale={0.8} color="#5ACDA3" />
      <Shape position={[0.5, 3.2, -5]} geometry="octahedron" scale={0.6} color="#1B5288" />
    </group>
  );
}

/** Ambient floating wireframe geometry used on the About page. */
export default function FloatingShapes() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <ParallaxGroup />
    </Canvas>
  );
}
