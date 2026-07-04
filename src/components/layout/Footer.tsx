import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  ArrowUpRight,
} from 'lucide-react';
import { gsap } from '../../animations/gsap';
import { SERVICES, CONTACT_INFO } from '../../utils/data';

const SOCIALS = [
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
];

// Each link points to a specific page and, where relevant, a section anchor.
const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about#story' },
  { label: 'Our Journey', to: '/about#journey' },
  { label: 'Why Choose Us', to: '/#why-choose-us' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Contact Us', to: '/contact#contact-form' },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-footer-col]',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/5 bg-navy-900">
      {/* Animated aurora background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 animate-aurora rounded-full bg-mint/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 animate-aurora rounded-full bg-navy-500/20 blur-3xl [animation-delay:-7s]" />
      </div>

      <div className="container-x relative px-4 py-16 sm:px-6 md:py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div data-footer-col>
            <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-700 ring-1 ring-mint/40">
                <TrendingUp className="h-5 w-5 text-mint" aria-hidden="true" />
              </span>
              GrowthX<span className="text-mint">Solution</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              We build high-converting websites and powerful digital marketing strategies that
              accelerate business growth.
            </p>
            <ul className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:border-mint/50 hover:text-mint hover:shadow-[0_0_20px_-6px_rgba(60,185,140,0.7)]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav data-footer-col aria-label="Quick links">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav data-footer-col aria-label="Services">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.id}`}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-footer-col>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Get In Touch</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <Link
                  to="/contact#contact-form"
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {CONTACT_INFO.address}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} GrowthX Solution. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Crafted with precision in <span className="text-mint">India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
