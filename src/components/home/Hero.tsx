import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { gsap } from '../../animations/gsap';
import { Scene3D } from '../three/Scene3D';
import { MagneticButton } from '../ui/MagneticButton';
import { RevealText } from '../ui/RevealText';
import { Particles } from '../common/Particles';

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-fade]',
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1, delay: 0.9, ease: 'power3.out' },
      );
      // Subtle parallax: content drifts up as the user scrolls past the hero.
      gsap.to('[data-hero-content]', {
        yPercent: -18,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Ambient gradient + 3D sphere + particles */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#08213C_0%,#020910_55%)]" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 animate-pulse-glow rounded-full bg-mint/10 blur-[80px] sm:blur-[140px]" />
      <Scene3D scene="hero" className="opacity-90" allowMobile />
      <Particles count={34} />

      <div data-hero-content className="container-x relative z-10 px-4 pb-24 pt-36 sm:px-6 lg:px-10">
        <div className="max-w-4xl">
          <div data-hero-fade className="eyebrow mb-7" style={{ visibility: 'hidden' }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" aria-hidden="true" />
            Web Development · Digital Marketing · Growth
          </div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            <RevealText as="span" className="block" text="Transform Your Business" immediate delay={1.1} />
            <RevealText
              as="span"
              className="text-gradient block"
              text="with Digital Innovation"
              immediate
              delay={1.35}
            />
          </h1>

          <p
            data-hero-fade
            className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ visibility: 'hidden' }}
          >
            We build high-converting websites and powerful digital marketing strategies that
            accelerate business growth.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4" style={{ visibility: 'hidden' }}>
            <MagneticButton to="/contact">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton to="/services" variant="ghost">
              <Play className="h-4 w-4 text-mint" aria-hidden="true" />
              View Services
            </MagneticButton>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}
