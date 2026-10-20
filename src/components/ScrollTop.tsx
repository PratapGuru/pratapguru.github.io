import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useScrolled } from '../hooks/useScrolled';

export function ScrollTop() {
  const show = useScrolled(700);
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Move focus to the top so keyboard users continue from the start.
    document.getElementById('top-anchor')?.focus({ preventScroll: true });
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="to-top"
          onClick={toTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
