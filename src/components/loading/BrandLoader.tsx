import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function BrandLoader() {
 const [visible, setVisible] = useState(true);
 const [progress, setProgress] = useState(0);
 const skip = useRef<HTMLButtonElement>(null);
 const restoreFocus = useRef(false);
 const finish = () => {
  restoreFocus.current = document.activeElement === skip.current;
  setVisible(false);
 };

 useLayoutEffect(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || location.hash || scrollY > 0) return;
  document.documentElement.classList.add('brand-loading-active');
  return () => document.documentElement.classList.remove('brand-loading-active');
 }, []);

 useEffect(() => {
  if (!visible) return;
  if (!document.documentElement.classList.contains('brand-loading-active')) {
   const timer = setTimeout(() => setVisible(false), 0);
   return () => clearTimeout(timer);
  }
  let disposed = false;
  let completed = 0;
  let current = 0;
  let previous = performance.now();
  let frame = 0;
  let release: ReturnType<typeof setTimeout> | undefined;
  const settle = () => { if (!disposed) completed++; };
  let removeLoadListener = () => {};
  const tasks = [
   document.fonts.load('600 64px Montserrat'),
   document.fonts.load('650 64px Sora'),
   import('../../../assets/hero/PatternWaves.js'),
   new Promise<void>(resolve => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', loaded, { once: true });
    function loaded() { resolve(); }
    removeLoadListener = () => window.removeEventListener('load', loaded);
   })
  ];
  // Milestones track critical resources; RAF only smooths their displayed progress.
  tasks.forEach(task => task.then(settle, settle));
  const tick = (now: number) => {
   if (disposed) return;
   const target = completed / tasks.length * 100;
   current = Math.min(target, current + Math.min(now - previous, 64) * 0.085);
   previous = now;
   setProgress(Math.floor(current));
   if (current >= 100) release = setTimeout(() => setVisible(false), 350);
   else frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  const deadline = setTimeout(() => setVisible(false), 4500);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const stop = () => setVisible(false);
  const key = (event: KeyboardEvent) => { if (event.key === 'Escape' || event.key === 'Tab') stop(); };
  reduced.addEventListener('change', stop);
  window.addEventListener('keydown', key);
  return () => {
   disposed = true; cancelAnimationFrame(frame);
   clearTimeout(deadline); clearTimeout(release);
   removeLoadListener();
   reduced.removeEventListener('change', stop);
   window.removeEventListener('keydown', key);
  };
 }, [visible]);

 return <AnimatePresence onExitComplete={() => {
  document.documentElement.classList.remove('brand-loading-active');
  if (restoreFocus.current) document.getElementById('inicio')?.focus({ preventScroll: true });
 }}>
  {visible && <motion.div className="brand-loader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
   <div className="brand-loader-content" role="progressbar" aria-label="Carregando Nodrah" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
    <div className="brand-loader-wordmark" aria-hidden="true">
     <span className="brand-loader-outline">NODRAH</span>
     <span className="brand-loader-fill" style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}>NODRAH</span>
    </div>
    <span className="brand-loader-percentage" aria-hidden="true">{progress}<span>%</span></span>
   </div>
   <button ref={skip} className="brand-loader-skip" onClick={finish}>Pular abertura <span aria-hidden="true">↗</span></button>
  </motion.div>}
 </AnimatePresence>;
}
