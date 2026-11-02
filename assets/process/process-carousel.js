import { mountDepthCarousel } from './DepthCarousel.js';
const root = document.getElementById('process-depth-carousel');
if (root) {
  const destroy = mountDepthCarousel(root);
  window.addEventListener('pagehide', event => {
    if (!event.persisted) destroy?.();
  }, { once: true });
}
