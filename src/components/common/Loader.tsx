import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

/** Cinematic preloader: counts to 100 while the brand mark reveals, then lifts away. */
export function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out so the counter decelerates near 100.
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-navy-950"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          aria-label="Loading GrowthX Solution"
          role="status"
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }}
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              GrowthX<span className="text-mint"> Solution</span>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            className="mt-4 text-sm uppercase tracking-[0.35em] text-slate-500"
          >
            Digital Innovation Studio
          </motion.p>
          <div className="absolute bottom-10 right-10 font-display text-7xl font-bold text-white/10 tabular-nums sm:text-8xl">
            {count}
          </div>
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-mint-700 to-mint transition-[width] duration-100 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
