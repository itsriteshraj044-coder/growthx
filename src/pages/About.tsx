import { useLayoutEffect, useRef } from 'react';
import { Target, Eye, ArrowRight } from 'lucide-react';
import { gsap } from '../animations/gsap';
import { revealUp } from '../animations/reveal';
import { Seo } from '../components/common/Seo';
import { Scene3D } from '../components/three/Scene3D';
import { SectionHeading } from '../components/ui/SectionHeading';
import { RevealText } from '../components/ui/RevealText';
import { MagneticButton } from '../components/ui/MagneticButton';
import { CTASection } from '../components/sections/CTASection';
import { TIMELINE, VALUES, WHY_US } from '../utils/data';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealUp(el);

      // Hero entrance
      gsap.fromTo(
        '[data-about-hero]',
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1, delay: 0.4 },
      );

      // Story image parallax
      gsap.fromTo(
        '[data-story-img]',
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: '[data-story]', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );

      // Timeline: line grows while items slide in from alternating sides
      gsap.fromTo(
        '[data-timeline-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '[data-timeline]',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>('[data-timeline-item]').forEach((item, i) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: i % 2 === 0 ? -56 : 56 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            scrollTrigger: { trigger: item, start: 'top 82%' },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <Seo
        title="About Us — GrowthX Solution"
        description="Meet GrowthX Solution: a full-service digital agency blending engineering craft with growth marketing. Our story, mission, values and journey."
      />

      {/* Hero */}
      <section className="relative flex min-h-[78vh] items-center overflow-hidden" aria-label="About hero">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#08213C_0%,#020910_60%)]" />
        <Scene3D scene="shapes" className="opacity-80" />
        <div className="container-x relative z-10 px-4 pb-20 pt-40 sm:px-6 lg:px-10">
          <span data-about-hero className="eyebrow" style={{ visibility: 'hidden' }}>
            About GrowthX Solution
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            <RevealText as="span" className="block" text="We Turn Ambition" immediate delay={0.6} />
            <RevealText as="span" className="text-gradient block" text="into Market Leadership" immediate delay={0.85} />
          </h1>
          <p
            data-about-hero
            className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ visibility: 'hidden' }}
          >
            A team of engineers, designers and growth marketers united by one obsession: building
            digital experiences that move business metrics.
          </p>
        </div>
      </section>

      {/* Company story */}
      <section data-story id="story" className="section-pad relative scroll-mt-24" aria-label="Our story">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal-group>
            <span data-reveal className="eyebrow">Our Story</span>
            <h2 data-reveal className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Born from a Simple Belief: <span className="text-gradient">Great Work Wins</span>
            </h2>
            <div data-reveal className="mt-6 space-y-5 text-base leading-relaxed text-slate-400">
              <p>
                GrowthX Solution started in 2021 with one laptop, one client and an uncomfortable
                observation — most businesses were paying premium prices for template websites and
                copy-paste marketing that simply didn't perform.
              </p>
              <p>
                We decided to do it differently. Every website we build is engineered for speed and
                conversion. Every ad campaign is grounded in data, not guesswork. Every design
                decision serves a business goal.
              </p>
              <p>
                Five years and 100+ projects later, that founding obsession hasn't changed. We've
                just gotten much, much better at it.
              </p>
            </div>
            <div data-reveal className="mt-8">
              <MagneticButton to="/services" variant="ghost">
                See How We Work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
          <div data-reveal className="relative overflow-hidden rounded-3xl">
            <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            <img
              data-story-img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="The GrowthX Solution team collaborating around a table"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="glass-strong absolute bottom-5 left-5 z-20 rounded-2xl px-5 py-4">
              <p className="font-display text-2xl font-bold text-mint">Since 2021</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Building Growth Engines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="section-pad relative bg-navy-900/40 scroll-mt-24" aria-label="Mission and vision">
        <div className="container-x">
          <SectionHeading
            eyebrow="Purpose"
            title="Mission &"
            highlight="Vision"
          />
          <div className="grid gap-6 md:grid-cols-2" data-reveal-group>
            {[
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To make world-class digital experiences accessible to ambitious businesses of every size — combining engineering excellence with marketing science to deliver measurable, compounding growth.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                text: 'A world where every great business idea gets the digital presence it deserves. We aim to be India’s most trusted growth partner — known not for our awards, but for our clients’ results.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                data-reveal
                className="glass group relative overflow-hidden rounded-3xl p-10 transition-all duration-300 hover:border-mint/40"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-mint/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-mint/10 ring-1 ring-mint/30">
                  <Icon className="h-6 w-6 text-mint" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="mt-4 leading-relaxed text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why GrowthX */}
      <section id="why-us" className="section-pad relative scroll-mt-24" aria-label="Why GrowthX Solution">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why GrowthX Solution"
            title="What Makes Us"
            highlight="Different"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {WHY_US.slice(0, 6).map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                data-reveal
                className="glass group cursor-pointer rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/40"
              >
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 ring-1 ring-mint/30 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5 text-mint" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Animated timeline */}
      <section data-timeline id="journey" className="section-pad relative overflow-hidden bg-navy-900/40 scroll-mt-24" aria-label="Our journey">
        <div className="container-x">
          <SectionHeading eyebrow="Our Journey" title="From One Laptop to" highlight="100+ Launches" />
          <div className="relative mx-auto max-w-4xl">
            <div
              data-timeline-line
              aria-hidden="true"
              className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-mint via-mint/60 to-navy-500 md:left-1/2"
            />
            <ol className="space-y-14">
              {TIMELINE.map((item, i) => (
                <li
                  key={item.year}
                  data-timeline-item
                  className={`relative flex md:w-1/2 ${
                    i % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
                  } pl-14 md:pl-0 ${i % 2 !== 0 ? 'md:pl-14' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-navy-800 ring-2 ring-mint left-5 ${
                      i % 2 === 0 ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-mint" />
                  </span>
                  <div className="glass w-full rounded-2xl p-7 transition-colors duration-300 hover:border-mint/40">
                    <span className="font-display text-sm font-bold tracking-[0.2em] text-mint">{item.year}</span>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Team values */}
      <section id="values" className="section-pad relative scroll-mt-24" aria-label="Team values">
        <div className="container-x">
          <SectionHeading
            eyebrow="Team Values"
            title="The Principles"
            highlight="We Build On"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {VALUES.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                data-reveal
                className="glass group cursor-pointer rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/40"
              >
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-mint/10 ring-1 ring-mint/30 transition-all duration-500 group-hover:rotate-6 group-hover:bg-mint/20">
                  <Icon className="h-6 w-6 text-mint" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Be Our"
        highlight="Next Success Story?"
        description="Join 50+ brands that trusted GrowthX Solution with their growth. Your first strategy session is on us."
      />
    </div>
  );
}
