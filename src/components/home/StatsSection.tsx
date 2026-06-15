import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import { STATS } from '../../utils/data';
import { Counter } from '../ui/Counter';

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-stat]',
        { autoAlpha: 0, scale: 0.92, y: 36 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-navy-900 to-navy-950"
      aria-label="Our track record"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-mint/60 to-transparent"
      />
      <div className="container-x grid grid-cols-2 gap-px px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-4 lg:px-10">
        {STATS.map((stat) => (
          <div key={stat.label} data-stat className="px-4 py-6 text-center">
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-5xl font-bold text-white tabular-nums sm:text-6xl"
            />
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-mint">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
