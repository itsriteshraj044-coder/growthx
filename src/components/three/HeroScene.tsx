import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const GLOBE_RADIUS = 1.6;

/** Evenly distributes points on a sphere surface using the fibonacci spiral. */
function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

/** Random point on the globe surface. */
function randomSurfacePoint(radius: number): THREE.Vector3 {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Glowing arcs travelling between random points on the globe — data routes. */
function ConnectionArcs({ count = 10 }: { count?: number }) {
  const lines = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: '#3CB98C',
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return Array.from({ length: count }, () => {
      const start = randomSurfacePoint(GLOBE_RADIUS);
      const end = randomSurfacePoint(GLOBE_RADIUS);
      const mid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(GLOBE_RADIUS * (1.25 + Math.random() * 0.45));
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      return new THREE.Line(geometry, material);
    });
  }, [count]);

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

/** Inner halo of particles orbiting the globe. */
function ParticleHalo({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random points in a spherical shell between r=2.6 and r=4.8
      const r = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.035;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3CB98C"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Digital dot globe: lit navy core, dotted surface, atmosphere glow, rings and arcs. */
function Globe({ mobile = false }: { mobile?: boolean }) {
  const parallax = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  const dots = useMemo(
    () => fibonacciSphere(mobile ? 1200 : 2400, GLOBE_RADIUS * 1.01),
    [mobile],
  );

  useFrame(({ pointer }, delta) => {
    if (parallax.current) {
      // Lerp toward pointer for soft mouse-follow parallax.
      parallax.current.rotation.y += (pointer.x * 0.45 - parallax.current.rotation.y) * 0.04;
      parallax.current.rotation.x += (-pointer.y * 0.28 - parallax.current.rotation.x) * 0.04;
    }
    if (spinner.current) spinner.current.rotation.y += delta * 0.12;
    if (ring.current) ring.current.rotation.z += delta * 0.18;
  });

  return (
    <group ref={parallax}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.5}>
        {/* Auto-rotating globe body */}
        <group ref={spinner}>
          {/* Lit core — deep blue, not black */}
          <mesh>
            <sphereGeometry args={[GLOBE_RADIUS * 0.985, 48, 48]} />
            <meshStandardMaterial
              color="#0F3A66"
              emissive="#0B2C4F"
              emissiveIntensity={0.55}
              roughness={0.45}
              metalness={0.35}
            />
          </mesh>
          {/* Dotted digital surface */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dots, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.03}
              color="#5ACDA3"
              transparent
              opacity={0.95}
              sizeAttenuation
              depthWrite={false}
            />
          </points>
          {/* Sparse wireframe graticule */}
          <mesh>
            <sphereGeometry args={[GLOBE_RADIUS * 1.002, 18, 12]} />
            <meshBasicMaterial color="#3CB98C" wireframe transparent opacity={0.08} />
          </mesh>
          <ConnectionArcs count={mobile ? 5 : 10} />
        </group>

        {/* Atmosphere glow */}
        <mesh scale={1.18}>
          <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
          <meshBasicMaterial
            color="#3CB98C"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Orbit rings */}
        <mesh ref={ring} rotation={[Math.PI / 2.3, 0.2, 0]}>
          <torusGeometry args={[GLOBE_RADIUS * 1.65, 0.012, 16, 128]} />
          <meshBasicMaterial color="#3CB98C" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 1.9, -0.4, 0.5]}>
          <torusGeometry args={[GLOBE_RADIUS * 1.95, 0.006, 16, 128]} />
          <meshBasicMaterial color="#1B5288" transparent opacity={0.4} />
        </mesh>
      </Float>
      <ParticleHalo count={mobile ? 450 : 1100} />
    </group>
  );
}

/** Full hero canvas — rotating digital globe with particles and soft lighting. */
export default function HeroScene() {
  // Lighter render + pulled-back camera on phones so the globe stays smooth and
  // fits inside the narrow viewport instead of getting clipped at the edges.
  const mobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  return (
    <Canvas
      dpr={mobile ? [1, 1] : [1, 1.5]}
      camera={{ position: [0, 0, mobile ? 10 : 6.5], fov: 42 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#dceeff" />
      <pointLight position={[-5, -3, -4]} intensity={16} color="#3CB98C" />
      <pointLight position={[5, 2, 3]} intensity={12} color="#1B5288" />
      <Globe mobile={mobile} />
    </Canvas>
  );
}
