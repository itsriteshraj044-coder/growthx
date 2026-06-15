import { useLayoutEffect, useRef, type ElementType } from 'react';
import { gsap, ScrollTrigger, splitWords } from '../../animations/reveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate immediately instead of waiting for scroll-into-view. */
  immediate?: boolean;
}

/** Splits text into words and reveals them with a staggered rise animation. */
export function RevealText({
  text,
  as: Tag = 'div',
  className,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // background-clip:text breaks in Chrome when descendants are transformed,
  // so gradient classes move from the wrapper onto each word span.
  const hasGradient = className?.includes('text-gradient') ?? false;
  const wrapperClass = hasGradient && !reducedMotion
    ? className?.replace('text-gradient', '').trim()
    : className;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const words = splitWords(el, hasGradient ? 'text-gradient' : undefined);
    const tween = gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.045,
        delay,
        ease: 'power3.out',
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = text;
    };
  }, [text, delay, immediate, reducedMotion, hasGradient]);

  // Cast to a concrete tag so TypeScript accepts the polymorphic ref.
  const Component = Tag as 'span';

  return (
    <Component ref={ref as React.Ref<HTMLSpanElement>} className={wrapperClass}>
      {text}
    </Component>
  );
}

export { ScrollTrigger };
