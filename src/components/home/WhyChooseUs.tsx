import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap';
import { revealUp } from '../../animations/reveal';
import { WHY_US } from '../../utils/data';
import { SectionHeading } from '../ui/SectionHeading';

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealUp(el);
      gsap.fromTo(
        '[data-why-card]',
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          scrollTrigger: { trigger: '[data-why-grid]', start: 'top 82%' },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" aria-label="Why choose us">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-mint/5 blur-[140px]"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Why GrowthX"
          title="The Unfair Advantage"
          highlight="Your Business Deserves"
          description="We're not another agency. We're the growth partner that treats your revenue like our own."
        />

        <div data-why-grid className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6">
          {WHY_US.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              data-why-card
              className="glass group relative cursor-pointer overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/40 hover:shadow-[0_20px_60px_-20px_rgba(60,185,140,0.25)]"
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mint/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 ring-1 ring-mint/30 transition-transform duration-500 group-hover:scale-110">
                <Icon className="h-5 w-5 text-mint" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
