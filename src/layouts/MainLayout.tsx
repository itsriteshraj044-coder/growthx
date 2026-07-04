import type { ReactNode } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { CursorFollower } from '../components/common/CursorFollower';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import { useLenis } from '../hooks/useLenis';

/** Global chrome: smooth scrolling, cursor, progress bar, navbar and footer. */
export function MainLayout({ children }: { children: ReactNode }) {
  useLenis();

  return (
    <div className="noise relative min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-mint focus:px-5 focus:py-2 focus:text-navy-950"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <CursorFollower />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
