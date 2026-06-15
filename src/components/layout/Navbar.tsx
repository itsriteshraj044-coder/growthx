import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, TrendingUp } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/data';
import { MagneticButton } from '../ui/MagneticButton';
import { cn } from '../../utils/cn';

const menuVariants = {
  closed: { opacity: 0, y: '-100%' },
  open: { opacity: 1, y: 0 },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className={cn(
          'fixed inset-x-0 top-0 z-[70] transition-all duration-500',
          scrolled
            ? 'border-b border-white/5 bg-navy-950/75 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(2,9,16,0.45)]'
            : 'bg-transparent py-5',
        )}
      >
        <nav className="container-x flex items-center justify-between px-4 sm:px-6 lg:px-10" aria-label="Main">
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white"
            aria-label="GrowthX Solution — Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-700 ring-1 ring-mint/40 transition-shadow duration-300 group-hover:shadow-[0_0_24px_-4px_rgba(60,185,140,0.8)]">
              <TrendingUp className="h-5 w-5 text-mint" aria-hidden="true" />
            </span>
            GrowthX<span className="text-mint">Solution</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                      isActive ? 'text-mint' : 'text-slate-300 hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-mint/10 ring-1 ring-mint/30"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <MagneticButton to="/contact" ariaLabel="Book a consultation">
              Book a Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="glass flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:text-mint lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-navy-950/95 px-8 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block py-3 font-display text-4xl font-bold tracking-tight transition-colors sm:text-5xl',
                          isActive ? 'text-mint' : 'text-white hover:text-mint',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-10"
            >
              <MagneticButton to="/contact" onClick={() => setOpen(false)} className="w-full justify-center sm:w-auto">
                Book a Consultation
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
