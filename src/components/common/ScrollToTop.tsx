import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../../animations/gsap';
import { getLenis } from '../../hooks/useLenis';

// Leave room for the fixed navbar when landing on a section (matches scroll-mt-24).
const NAV_OFFSET = 96;

/**
 * On navigation: deep-links to a `#section` when the URL has a hash,
 * otherwise resets to the top. Scrolling is driven through Lenis (when active)
 * so it doesn't get overridden by the smooth-scroll loop.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (hash) {
      // Wait for the destination page to mount before locating the section.
      const id = window.setTimeout(() => {
        const target = document.getElementById(hash.slice(1));
        if (!target) return;
        if (lenis) {
          lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 1.1 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        ScrollTrigger.refresh();
      }, 450);
      return () => window.clearTimeout(id);
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    // Allow the new page to paint before recalculating trigger positions.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);

  return null;
}
