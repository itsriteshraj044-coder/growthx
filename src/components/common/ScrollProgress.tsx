import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the top of the viewport indicating scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-mint-600 via-mint to-mint-300"
      style={{ scaleX }}
    />
  );
}
