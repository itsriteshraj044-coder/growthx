import { gsap, ScrollTrigger } from './gsap';

/** Fade-and-rise reveal for elements matching the selector inside a scope. */
export function revealUp(
  scope: HTMLElement,
  selector = '[data-reveal]',
  options: { stagger?: number; y?: number; once?: boolean } = {},
): void {
  const { stagger = 0.12, y = 48 } = options;
  const groups = new Map<Element, Element[]>();

  scope.querySelectorAll(selector).forEach((el) => {
    const trigger = (el.closest('[data-reveal-group]') ?? el) as Element;
    const list = groups.get(trigger) ?? [];
    list.push(el);
    groups.set(trigger, list);
  });

  groups.forEach((elements, trigger) => {
    gsap.fromTo(
      elements,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    );
  });
}

/** Splits text into word spans for staggered reveal animations. */
export function splitWords(element: HTMLElement, wordClass?: string): HTMLElement[] {
  const text = element.textContent ?? '';
  element.textContent = '';
  element.setAttribute('aria-label', text);

  return text.split(' ').map((word) => {
    const outer = document.createElement('span');
    outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
    outer.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    if (wordClass) inner.className = wordClass;
    inner.textContent = word + ' ';
    outer.appendChild(inner);
    element.appendChild(outer);
    return inner;
  });
}

export { gsap, ScrollTrigger };
