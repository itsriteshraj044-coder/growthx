import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';

/**
 * Custom cursor: a small dot that tracks the pointer instantly plus a soft
 * glow ring that follows with lag. Scales up over interactive elements.
 * Hidden on touch devices via CSS (.custom-cursor).
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const glowX = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3' });
    const glowY = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3' });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      glowX(e.clientX);
      glowY(e.clientY);
    };

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element &&
      !!target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');

    const over = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 2.2, opacity: 0.9, duration: 0.3 });
        gsap.to(dot, { scale: 0.4, duration: 0.3 });
      }
    };
    const out = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseout', out, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <div
        ref={glowRef}
        className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-mint/10 blur-3xl"
      />
      <div
        ref={ringRef}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-mint/60 opacity-60"
      />
      <div ref={dotRef} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-mint" />
    </div>
  );
}
