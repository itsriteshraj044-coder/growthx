import { useLayoutEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { gsap } from '../animations/gsap';
import { revealUp } from '../animations/reveal';
import { Seo } from '../components/common/Seo';
import { Scene3D } from '../components/three/Scene3D';
import { RevealText } from '../components/ui/RevealText';
import { MagneticButton } from '../components/ui/MagneticButton';
import { SERVICE_OPTIONS, CONTACT_INFO } from '../utils/data';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { cn } from '../utils/cn';
import type { ContactFormData, FormStatus } from '../types';

const EMPTY_FORM: ContactFormData = { name: '', email: '', phone: '', service: '', message: '' };

const INPUT_CLASS =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 backdrop-blur-sm transition-colors duration-200 focus:border-mint/60 focus:outline-none focus:ring-1 focus:ring-mint/40';

const CONTACT_CARDS = [
  { icon: Mail, label: 'Email Us', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Phone, label: 'Call Us', value: CONTACT_INFO.phone, href: undefined },
  { icon: MapPin, label: 'Visit Us', value: CONTACT_INFO.address, href: undefined },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: undefined },
];

function validate(form: ContactFormData): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  if (form.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.';
  if (form.phone && !/^[+\d][\d\s()-]{6,17}$/.test(form.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!form.service) errors.service = 'Please select a service.';
  if (form.message.trim().length < 10) errors.message = 'Tell us a bit more (at least 10 characters).';
  return errors;
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealUp(el);
      gsap.fromTo(
        '[data-contact-hero]',
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1, delay: 0.4 },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.values(validation).some(Boolean)) return;

    setStatus('submitting');

    if (!isSupabaseConfigured) {
      setStatus('error');
      return;
    }

    const { error } = await supabase.from('submissions').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      service: form.service,
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setForm(EMPTY_FORM);
  };

  const fieldError = (key: keyof ContactFormData) =>
    errors[key] && (
      <p role="alert" className="mt-1.5 text-xs text-red-400">
        {errors[key]}
      </p>
    );

  return (
    <div ref={ref}>
      <Seo
        title="Contact Us — GrowthX Solution"
        description="Get in touch with GrowthX Solution. Book a free consultation for web development, e-commerce or digital marketing. We respond within 24 hours."
      />

      {/* Hero with 3D network background */}
      <section className="relative overflow-hidden pb-10 pt-44" aria-label="Contact hero">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#08213C_0%,#020910_60%)]" />
        <Scene3D scene="network" className="opacity-70" />
        <div className="container-x relative z-10 px-4 text-center sm:px-6 lg:px-10">
          <span data-contact-hero className="eyebrow" style={{ visibility: 'hidden' }}>
            Contact Us
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            <RevealText as="span" className="block" text="Let’s Build Something" immediate delay={0.6} />
            <RevealText as="span" className="text-gradient block" text="Extraordinary Together" immediate delay={0.85} />
          </h1>
          <p
            data-contact-hero
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ visibility: 'hidden' }}
          >
            Tell us about your project. We’ll get back within 24 hours with honest advice — even if
            we’re not the right fit.
          </p>
        </div>
      </section>

      {/* Info cards + form */}
      <section id="contact-form" className="section-pad relative scroll-mt-24" aria-label="Contact form and information">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact info */}
            <div className="space-y-4 lg:col-span-2" data-reveal-group>
              {CONTACT_CARDS.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint/10 ring-1 ring-mint/30 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-mint" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                        {label}
                      </span>
                      <span className="mt-1 block font-medium text-white">{value}</span>
                    </span>
                  </>
                );
                const cardClass =
                  'glass group flex w-full items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:border-mint/40 hover:-translate-y-0.5';
                return (
                  <div key={label} data-reveal>
                    {href ? (
                      <a href={href} className={cn(cardClass, 'cursor-pointer')}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cardClass}>{inner}</div>
                    )}
                  </div>
                );
              })}

              <div data-reveal className="glass-strong relative overflow-hidden rounded-2xl p-7">
                <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mint/15 blur-3xl" />
                <h3 className="font-display text-lg font-semibold text-white">
                  Prefer a quick call?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Book a free 30-minute strategy session. No pitch decks, no pressure — just
                  actionable advice for your business.
                </p>
              </div>
            </div>

            {/* Form */}
            <div data-reveal className="lg:col-span-3">
              <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex min-h-[420px] flex-col items-center justify-center text-center"
                      role="status"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
                      >
                        <CheckCircle2 className="h-20 w-20 text-mint" aria-hidden="true" />
                      </motion.div>
                      <h2 className="mt-6 text-2xl font-bold text-white">Message Sent!</h2>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                        Thanks for reaching out. Our team will get back to you within 24 hours with
                        next steps.
                      </p>
                      <div className="mt-8">
                        <MagneticButton variant="ghost" onClick={() => setStatus('idle')}>
                          Send Another Message
                        </MagneticButton>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      onSubmit={handleSubmit}
                      noValidate
                      aria-label="Contact form"
                    >
                      <h2 className="text-2xl font-bold text-white">Start Your Project</h2>
                      <p className="mt-2 text-sm text-slate-400">
                        Fill in the details below and we’ll take it from there.
                      </p>

                      <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                            Full Name <span className="text-mint">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Rahul Verma"
                            className={INPUT_CLASS}
                            aria-invalid={!!errors.name}
                          />
                          {fieldError('name')}
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                            Email <span className="text-mint">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            className={INPUT_CLASS}
                            aria-invalid={!!errors.email}
                          />
                          {fieldError('email')}
                        </div>
                        <div>
                          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-300">
                            Phone
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={INPUT_CLASS}
                            aria-invalid={!!errors.phone}
                          />
                          {fieldError('phone')}
                        </div>
                        <div>
                          <label htmlFor="service" className="mb-2 block text-sm font-medium text-slate-300">
                            Service <span className="text-mint">*</span>
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className={cn(INPUT_CLASS, 'cursor-pointer appearance-none', !form.service && 'text-slate-500')}
                            aria-invalid={!!errors.service}
                          >
                            <option value="" disabled className="bg-navy-800">
                              Select a service…
                            </option>
                            {SERVICE_OPTIONS.map((option) => (
                              <option key={option} value={option} className="bg-navy-800 text-white">
                                {option}
                              </option>
                            ))}
                          </select>
                          {fieldError('service')}
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                            Project Details <span className="text-mint">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell us about your goals, timeline and budget…"
                            className={cn(INPUT_CLASS, 'resize-none')}
                            aria-invalid={!!errors.message}
                          />
                          {fieldError('message')}
                        </div>
                      </div>

                      {status === 'error' && (
                        <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                          Something went wrong while sending your message. Please try again or email us
                          directly at {CONTACT_INFO.email}.
                        </p>
                      )}

                      <div className="mt-8">
                        <MagneticButton
                          type="submit"
                          disabled={status === 'submitting'}
                          className="w-full justify-center sm:w-auto"
                        >
                          {status === 'submitting' ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                            </>
                          )}
                        </MagneticButton>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
