import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { gsap } from '../../animations/gsap';
import { revealUp } from '../../animations/reveal';
import { TESTIMONIALS } from '../../utils/data';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../utils/cn';

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);

  const paginate = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + TESTIMONIALS.length) % TESTIMONIALS.length, dir]);
  }, []);

  useEffect(() => {
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paginate, index]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => revealUp(el), el);
    return () => ctx.revert();
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section ref={ref} className="section-pad relative overflow-hidden bg-navy-900/40" aria-label="Client testimonials">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-80 w-80 rounded-full bg-mint/5 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by Founders,"
          highlight="Trusted by Brands"
        />

        <div data-reveal className="relative mx-auto max-w-3xl">
          <Quote
            className="absolute -top-6 left-0 h-16 w-16 text-mint/15"
            aria-hidden="true"
          />
          <div className="glass relative min-h-[280px] overflow-hidden rounded-3xl p-8 sm:min-h-[250px] sm:p-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-lg leading-relaxed text-slate-200 sm:text-xl">“{t.quote}”</p>
                <footer className="mt-8 flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-navy-500 to-navy-700 font-display font-bold text-mint ring-1 ring-mint/40"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="block font-display text-sm font-semibold not-italic text-white">
                      {t.name}
                    </cite>
                    <span className="text-xs text-slate-400">
                      {t.role}, <span className="text-mint">{t.company}</span>
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${item.name}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={cn(
                    'h-1.5 cursor-pointer rounded-full transition-all duration-400',
                    i === index ? 'w-10 bg-mint' : 'w-4 bg-white/15 hover:bg-white/30',
                  )}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="glass flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:border-mint/50 hover:text-mint"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="glass flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:border-mint/50 hover:text-mint"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
