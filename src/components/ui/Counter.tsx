import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../animations/gsap';

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Number that counts up from 0 when scrolled into view. */
export function Counter({ value, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(counter.n)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      0{suffix}
    </span>
  );
}

export { ScrollTrigger };
