import { mountPatternWaves } from './PatternWaves.js';

const container = document.getElementById('nodrah-pattern-waves');
if (container) {
  try {
    const destroy = mountPatternWaves(container, {
      preset: 'silk',
      color: '#8B5CF6',
      backgroundColor: '#000000',
      fade: 'edges',
      interactive: true,
      cursorSize: 50,
      cursorStrength: 0.6
    });
    // The plain black CSS background keeps all content usable without WebGL2.
    if (destroy) {
      container.addEventListener('webglcontextlost', event => {
        event.preventDefault();
        destroy();
      }, { capture: true, once: true });
      window.addEventListener('pagehide', event => {
        if (!event.persisted) destroy();
      }, { once: true });
    }
  } catch {
    container.replaceChildren();
  }
}
