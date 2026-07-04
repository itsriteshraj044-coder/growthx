import { lazy, Suspense } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn } from '../../utils/cn';

const HeroScene = lazy(() => import('./HeroScene'));
const FloatingShapes = lazy(() => import('./FloatingShapes'));
const NetworkScene = lazy(() => import('./NetworkScene'));

const SCENES = {
  hero: HeroScene,
  shapes: FloatingShapes,
  network: NetworkScene,
} as const;

interface Scene3DProps {
  scene: keyof typeof SCENES;
  className?: string;
}

/**
 * Lazy-loaded, code-split Three.js scene host. Renders a static gradient
 * fallback while loading and skips WebGL entirely for reduced-motion users.
 */
export function Scene3D({ scene, className }: Scene3DProps) {
  const reducedMotion = usePrefersReducedMotion();
  // WebGL is the heaviest thing on the page — skip it on phones and let the
  // static gradient stand in. Tablets/desktops keep the full scene.
  const isMobile = useMediaQuery('(max-width: 767px)');
  const skip3D = reducedMotion || isMobile;
  const Scene = SCENES[scene];

  const fallback = (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(60,185,140,0.12),transparent_60%)]"
    />
  );

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {skip3D ? fallback : (
        <Suspense fallback={fallback}>
          <Scene />
        </Suspense>
      )}
    </div>
  );
}
