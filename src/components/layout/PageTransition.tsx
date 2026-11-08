import { useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Fades between routes. Opacity only: a transform on the wrapper would turn it into the
 * containing block for the pinned carousels (`position: sticky`) and break them.
 * `useOutlet()` is captured per keyed child, so the exiting page keeps rendering the OLD
 * route while it fades. Scroll resets once the exit finishes so the old page never visibly
 * jumps. With reduced motion there is no animation, so the outlet renders directly.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) window.scrollTo(0, 0);
  }, [pathname, reduceMotion]);

  if (reduceMotion) return <>{outlet}</>;

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.12 } }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}
