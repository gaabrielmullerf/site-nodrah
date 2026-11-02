import { useEffect } from 'react';
import { mountSiteInteractions } from './legacyInteractions.js';
export function useSiteEffects() {
 useEffect(() => mountSiteInteractions(), []);
 useEffect(() => {
  let cancelled = false;
  let destroy: (() => void) | undefined;
  const root = document.getElementById('process-depth-carousel');
  if (!root) return;
  const observer = new IntersectionObserver(async ([entry]) => {
   if (!entry.isIntersecting) return;
   observer.disconnect();
   const { mountDepthCarousel } = await import('../../assets/process/DepthCarousel.js');
   if (!cancelled) destroy = mountDepthCarousel(root);
  }, { rootMargin: '200px' });
  observer.observe(root);
  return () => { cancelled = true; observer.disconnect(); destroy?.(); };
 }, []);
}
