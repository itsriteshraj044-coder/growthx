import { useRef, type ReactNode, type MouseEvent } from 'react';
import { gsap } from '../../animations/gsap';
import { cn } from '../../utils/cn';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Glass card with 3D perspective tilt that tracks the cursor, plus a
 * radial glow that follows the pointer position.
 */
export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(hover: none)').matches) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    gsap.to(card, {
      rotateY: (px - 0.5) * maxTilt * 2,
      rotateX: (0.5 - py) * maxTilt * 2,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        x: e.clientX - rect.left - 128,
        y: e.clientY - rect.top - 128,
        duration: 0.3,
      });
    }
  };

  const onLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div className="perspective-1000">
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          'glass preserve-3d relative cursor-pointer overflow-hidden rounded-2xl transition-colors duration-300 hover:border-mint/40',
          className,
        )}
      >
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-mint/15 opacity-0 blur-3xl"
        />
        {children}
      </div>
    </div>
  );
}
