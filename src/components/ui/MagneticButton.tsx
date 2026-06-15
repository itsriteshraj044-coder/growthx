import { useRef, type ReactNode, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap';
import { cn } from '../../utils/cn';

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

const BASE =
  'group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS = {
  primary:
    'bg-mint text-navy-950 hover:bg-mint-400 shadow-[0_0_30px_-8px_rgba(60,185,140,0.7)]',
  ghost:
    'glass text-white hover:border-mint/50 hover:text-mint',
};

/** Button that magnetically follows the cursor and springs back on leave. */
export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power3.out' });
  };

  const onLeave = () => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    }
  };

  const classes = cn(BASE, VARIANTS[variant], className);
  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
    </>
  );

  const shared = {
    className: classes,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    'aria-label': ariaLabel,
  };

  if (to) {
    return (
      <Link to={to} ref={(n) => void (ref.current = n)} {...shared}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} ref={(n) => void (ref.current = n)} {...shared}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} ref={(n) => void (ref.current = n)} {...shared}>
      {content}
    </button>
  );
}
