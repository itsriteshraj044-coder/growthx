import { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { gsap } from '../animations/gsap';
import { revealUp } from '../animations/reveal';
import { Seo } from '../components/common/Seo';
import { RevealText } from '../components/ui/RevealText';
import { MagneticButton } from '../components/ui/MagneticButton';
import { CTASection } from '../components/sections/CTASection';
import { Particles } from '../components/common/Particles';
import { SERVICES } from '../utils/data';
import { cn } from '../utils/cn';

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealUp(el);

      gsap.fromTo(
        '[data-services-hero]',
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1, delay: 0.4 },
      );

      // Parallax drift on each service image
      gsap.utils.toArray<HTMLElement>('[data-service-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.12 },
          {
            yPercent: 7,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <Seo
        title="Our Services — GrowthX Solution"
        description="WordPress, Shopify and custom web development plus lead generation, Meta Ads, Google Ads, graphics design and digital marketing — engineered for growth."
      />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden" aria-label="Services hero">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#08213C_0%,#020910_60%)]" />
        <div aria-hidden="true" className="absolute right-10 top-32 h-80 w-80 animate-pulse-glow rounded-full bg-mint/10 blur-[120px]" />
        <Particles count={28} />
        <div className="container-x relative z-10 px-4 pb-20 pt-40 sm:px-6 lg:px-10">
          <span data-services-hero className="eyebrow" style={{ visibility: 'hidden' }}>
            Our Services
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            <RevealText as="span" className="block" text="Everything You Need" immediate delay={0.6} />
            <RevealText as="span" className="text-gradient block" text="to Win Online" immediate delay={0.85} />
          </h1>
          <p
            data-services-hero
            className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ visibility: 'hidden' }}
          >
            Eight specialized services, one accountable team. From the first pixel to the last
            conversion, we own the entire growth journey.
          </p>
        </div>
      </section>

      {/* Detailed service sections */}
      {SERVICES.map((service, index) => {
        const { id, title, tagline, description, features, benefits, process, image, icon: Icon } = service;
        const flipped = index % 2 === 1;

        return (
          <section
            key={id}
            id={id}
            className={cn(
              'section-pad relative scroll-mt-24 overflow-hidden',
              index % 2 === 1 && 'bg-navy-900/40',
            )}
            aria-label={title}
          >
            <div className="container-x">
              <div className={cn('grid items-center gap-12 lg:grid-cols-2 3xl:gap-20', flipped && 'lg:[&>*:first-child]:order-2')}>
                {/* Copy */}
                <div data-reveal-group>
                  <span data-reveal className="eyebrow">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    Service {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 data-reveal className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {title}
                  </h2>
                  <p data-reveal className="mt-2 font-medium text-mint">{tagline}</p>
                  <p data-reveal className="mt-5 max-w-2xl leading-relaxed text-slate-400">{description}</p>

                  <ul data-reveal className="mt-7 grid gap-3 sm:grid-cols-2" aria-label={`${title} features`}>
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div data-reveal className="mt-9">
                    <MagneticButton to="/contact">
                      Start Your Project
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </MagneticButton>
                  </div>
                </div>

                {/* Visual + benefits */}
                <div data-reveal-group>
                  <div data-reveal className="relative overflow-hidden rounded-3xl">
                    <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                    <img
                      data-service-img
                      src={image}
                      alt={`${title} illustration`}
                      className="aspect-[16/10] w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-5 left-5 right-5 z-20">
                      <div className="glass-strong rounded-2xl p-5">
                        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
                          <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                          Key Benefits
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {benefits.map((benefit) => (
                            <li key={benefit} className="text-xs leading-relaxed text-slate-300">
                              • {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Process steps */}
                  <ol data-reveal className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label={`${title} process`}>
                    {process.map((step, i) => (
                      <li
                        key={step.step}
                        className="glass group cursor-default rounded-xl p-4 transition-colors duration-300 hover:border-mint/40"
                      >
                        <span className="font-display text-xs font-bold text-mint">0{i + 1}</span>
                        <p className="mt-1.5 text-sm font-semibold text-white">{step.step}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{step.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        title="Not Sure Which"
        highlight="Service You Need?"
        description="Tell us your goal — we’ll map the fastest route to it. Free consultation, zero obligation."
      />
    </div>
  );
}
