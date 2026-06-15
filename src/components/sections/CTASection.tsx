import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { gsap } from '../../animations/gsap';
import { revealUp } from '../../animations/reveal';
import { MagneticButton } from '../ui/MagneticButton';
import { Particles } from '../common/Particles';

interface CTASectionProps {
  title?: string;
  highlight?: string;
  description?: string;
}

/** Reusable closing call-to-action band with animated gradient + particles. */
export function CTASection({
  title = 'Ready to Grow',
  highlight = 'Your Business?',
  description = 'Book a free strategy call. We’ll audit your digital presence and show you exactly where the growth is hiding.',
}: CTASectionProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => revealUp(el), el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" aria-label="Call to action">
      <div className="container-x relative">
        <div
          data-reveal-group
          className="glass-strong relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-16 md:py-24"
        >
          {/* Animated gradient orbs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-72 w-72 animate-aurora rounded-full bg-mint/15 blur-[100px]" />
            <div className="absolute -bottom-24 -right-16 h-80 w-80 animate-aurora rounded-full bg-navy-400/25 blur-[110px] [animation-delay:-6s]" />
          </div>
          <Particles count={22} />

          <div className="relative">
            <span data-reveal className="eyebrow">
              <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Free Strategy Session
            </span>
            <h2
              data-reveal
              className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
            >
              {title} <span className="text-gradient">{highlight}</span>
            </h2>
            <p data-reveal className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {description}
            </p>
            <div data-reveal className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton to="/contact">
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton to="/services" variant="ghost">
                Explore Services
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
