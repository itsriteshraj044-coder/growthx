import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '../../animations/gsap';
import { revealUp } from '../../animations/reveal';
import { SERVICES } from '../../utils/data';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';

export function ServicesPreview() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealUp(el);
      gsap.fromTo(
        '[data-service-card]',
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-services-grid]', start: 'top 82%' },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad relative" aria-label="Our services">
      <div
        aria-hidden="true"
        className="absolute right-0 top-32 h-96 w-96 rounded-full bg-navy-500/10 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Built for"
          highlight="Serious Growth"
          description="Eight specialized capabilities, one integrated team. Everything your business needs to dominate online."
        />

        <div data-services-grid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ id, title, tagline, icon: Icon }) => (
            <div key={id} data-service-card>
              <TiltCard className="h-full">
                <Link
                  to={`/services#${id}`}
                  className="group flex h-full flex-col p-7"
                  aria-label={`Learn more about ${title}`}
                >
                  <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-mint/10 ring-1 ring-mint/30 transition-all duration-500 group-hover:bg-mint/20 group-hover:shadow-[0_0_28px_-6px_rgba(60,185,140,0.8)]">
                    <Icon className="h-6 w-6 text-mint transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-mint">
                    {title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">{tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-mint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
