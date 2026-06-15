import { Hexagon } from 'lucide-react';
import { TRUSTED_BRANDS } from '../../utils/data';

/** Infinite marquee of client wordmarks. Duplicated list creates the seamless loop. */
export function TrustedBy() {
  return (
    <section className="relative border-y border-white/5 bg-navy-900/50 py-12" aria-label="Trusted by">
      <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
        Trusted by ambitious brands
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-16 pr-16">
          {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold text-slate-500 transition-colors duration-300 hover:text-mint"
              aria-hidden={i >= TRUSTED_BRANDS.length}
            >
              <Hexagon className="h-4 w-4 text-mint/50" aria-hidden="true" />
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
