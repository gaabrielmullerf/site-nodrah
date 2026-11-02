import { useEffect, useRef } from 'react';
export function HeroParticles() {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const node = ref.current;
  if (!node) return;
  let cancelled = false;
  let destroy: (() => void) | undefined;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const stop = () => { destroy?.(); destroy = undefined; };
  const lost = (event: Event) => { event.preventDefault(); stop(); };
  const observer = new IntersectionObserver(async ([entry]) => {
   if (!entry.isIntersecting || destroy || motion.matches) return;
   try {
    const { mountPatternWaves } = await import('../../../assets/hero/PatternWaves.js');
    if (cancelled || destroy || motion.matches) return;
    destroy = mountPatternWaves(node, { preset: 'silk', color: '#8B5CF6', backgroundColor: '#000000', fade: 'edges', interactive: true, cursorSize: 50, cursorStrength: 0.6 });
   } catch { node.replaceChildren(); }
  }, { rootMargin: '100px' });
  const configure = () => { if (motion.matches) stop(); else { observer.unobserve(node); observer.observe(node); } };
  node.addEventListener('webglcontextlost', lost, true);
  motion.addEventListener('change', configure);
  observer.observe(node);
  return () => { cancelled = true; observer.disconnect(); motion.removeEventListener('change', configure); node.removeEventListener('webglcontextlost', lost, true); stop(); };
 }, []);
 return <div ref={ref} className="pattern-waves" id="nodrah-pattern-waves" />;
}
