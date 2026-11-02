import { useEffect, type RefObject } from 'react';

type RGB = [number, number, number];
const lightText: RGB = [238, 234, 248];
const darkText: RGB = [40, 35, 48];
function luminance(rgb: RGB) {
 const linear = rgb.map(value => value / 255 <= 0.04045 ? value / 255 / 12.92 : ((value / 255 + 0.055) / 1.055) ** 2.4);
 return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(a: RGB, b: RGB) {
 const x = luminance(a), y = luminance(b);
 return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
function parseColor(value: string): RGB | undefined {
 const hex = value.trim().match(/^#([0-9a-f]{3,8})$/i)?.[1];
 if (hex) {
  const expanded = hex.length <= 4 ? [...hex].map(char => char + char).join('') : hex;
  if (expanded.length !== 6 && expanded.length !== 8) return;
  if (expanded.length === 8 && parseInt(expanded.slice(6), 16) < 204) return;
  return [0, 2, 4].map(index => parseInt(expanded.slice(index, index + 2), 16)) as RGB;
 }
 const parts = value.match(/[\d.]+/g)?.map(Number);
 if (!parts || parts.length < 3 || (parts.length > 3 && parts[3] < 0.8)) return;
 return parts.slice(0, 3) as RGB;
}

export function useHeaderContrast(ref: RefObject<HTMLElement | null>) {
 useEffect(() => {
  const header = ref.current;
  if (!header) return;
  const targets = [...header.querySelectorAll<HTMLElement>('.brand-wordmark, #nodrah-navigation > a, .nodrah-menu-toggle')];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  let frame = 0;
  let disposed = false;
  let movingBehind = false;

  const sample = (x: number, y: number): RGB => {
   for (const hit of document.elementsFromPoint(x, y)) {
    if (header.contains(hit)) continue;
    const playing = hit instanceof HTMLImageElement ? hit.parentElement?.querySelector('video') : null;
    const element = playing && playing.readyState >= 2 && getComputedStyle(playing).visibility !== 'hidden' ? playing : hit;
    // Same-origin preview media can change beneath a stationary transparent header.
    if (context && (element instanceof HTMLVideoElement || element instanceof HTMLImageElement)) {
     const width = element instanceof HTMLVideoElement ? element.videoWidth : element.naturalWidth;
     const height = element instanceof HTMLVideoElement ? element.videoHeight : element.naturalHeight;
     if (element instanceof HTMLVideoElement && !element.paused) movingBehind = true;
     if (width && height) {
      const rect = element.getBoundingClientRect();
      const scale = getComputedStyle(element).objectFit === 'cover'
       ? Math.max(rect.width / width, rect.height / height)
       : Math.min(rect.width / width, rect.height / height);
      const sx = (x - rect.left - (rect.width - width * scale) / 2) / scale;
      const sy = (y - rect.top - (rect.height - height * scale) / 2) / scale;
      if (sx >= 0 && sy >= 0 && sx < width && sy < height) {
       try {
        context.clearRect(0, 0, 1, 1);
        context.drawImage(element, sx, sy, 1, 1, 0, 0, 1, 1);
        const pixel = context.getImageData(0, 0, 1, 1).data;
        if (pixel[3] > 200) return [pixel[0], pixel[1], pixel[2]];
       } catch { canvas.width = 1; /* Unreadable media falls back to its section surface. */ }
      }
     }
    }
    const style = getComputedStyle(element);
    const background = parseColor(style.backgroundColor);
    if (background) return background;
    const declared = parseColor(style.getPropertyValue('--header-surface-color'));
    if (declared) return declared;
   }
   return [16, 17, 19];
  };
  const update = () => {
   frame = 0;
   movingBehind = false;
   targets.forEach(target => {
    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const backgrounds = [0.25, 0.5, 0.75].map(position => sample(rect.left + rect.width * position, rect.top + rect.height / 2));
    const logo = target.classList.contains('brand-wordmark');
    const original: RGB = logo ? [139, 92, 246] : lightText;
    const alternate: RGB = logo ? [91, 33, 182] : darkText;
    const threshold = logo ? 3 : 4.5;
    const originalContrast = Math.min(...backgrounds.map(color => contrast(color, original)));
    const alternateContrast = Math.min(...backgrounds.map(color => contrast(color, alternate)));
    const value = originalContrast < threshold && alternateContrast > originalContrast ? 'dark' : 'light';
    if (target.dataset.contrast !== value) target.dataset.contrast = value;
   });
  };
  const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(update); };
  const resize = new ResizeObserver(schedule);
  resize.observe(header);
  const main = document.querySelector('main');
  if (main) resize.observe(main);
  const menu = new MutationObserver(schedule);
  menu.observe(header, { subtree: true, attributes: true, attributeFilter: ['hidden', 'aria-expanded'] });
  const interval = setInterval(() => { if (!document.hidden && movingBehind) schedule(); }, 200);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  document.addEventListener('visibilitychange', schedule);
  document.addEventListener('playing', schedule, true);
  document.addEventListener('loadeddata', schedule, true);
  void document.fonts.ready.then(schedule);
  update();
  return () => {
   disposed = true;
   cancelAnimationFrame(frame); clearInterval(interval);
   resize.disconnect(); menu.disconnect();
   window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
   window.removeEventListener('load', schedule); document.removeEventListener('visibilitychange', schedule);
   document.removeEventListener('playing', schedule, true); document.removeEventListener('loadeddata', schedule, true);
  };
 }, [ref]);
}
