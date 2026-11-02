/*! Nodrah process row: GSAP depth and hover layering; the supplied DepthCarousel reference remains in scripts/reference/. */
import gsap from 'gsap';

export function mountDepthCarousel(root) {
  if (!root) return;
  const cards = [...root.querySelectorAll('.depth-carousel__card')];
  const status = root.querySelector('.process-carousel-status');
  const mobile = matchMedia('(max-width: 900px), (hover: none), (pointer: coarse)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = [];
  let active = 0, frame = 0;
  const on = (target, name, fn, options) => {
    target.addEventListener(name, fn, options);
    listeners.push(() => target.removeEventListener(name, fn, options));
  };

  const render = (animate = true) => {
    const scrolling = mobile.matches;
    const cardWidth = Math.min(300, root.clientWidth * 0.34);
    const spread = (root.clientWidth - cardWidth) / Math.max(1, cards.length - 1);
    cards.forEach((card, index) => {
      const focused = index === active;
      card.classList.toggle('is-active', focused);
      if (focused) card.setAttribute('aria-current', 'step');
      else card.removeAttribute('aria-current');
      if (scrolling) return;
      card.style.width = `${cardWidth}px`;
      card.style.zIndex = String(focused ? 100 : 50 - Math.abs(index - active));
      gsap.to(card, {
        x: index * spread,
        y: focused ? 0 : 12,
        z: focused ? 0 : -40,
        rotationY: focused ? 0 : -8,
        scale: focused ? 1 : 0.96,
        filter: focused ? 'brightness(1) blur(0px)' : 'brightness(0.76) blur(0.3px)',
        duration: animate && !reduced.matches ? 0.45 : 0,
        ease: 'power3.out',
        overwrite: true
      });
    });
  };

  const select = (index, animate = true) => {
    const next = Math.max(0, Math.min(cards.length - 1, index));
    if (next === active) return;
    active = next;
    render(animate);
    status.textContent = `Etapa ${active + 1} de ${cards.length}: ${cards[active].querySelector('h3').textContent}`;
  };

  const configure = () => {
    gsap.killTweensOf(cards);
    gsap.set(cards, { clearProps: 'transform,filter,width,zIndex' });
    root.dataset.layout = mobile.matches ? 'scroll' : 'row';
    render(false);
  };

  cards.forEach((card, index) => {
    card.removeAttribute('aria-hidden');
    card.tabIndex = 0;
    on(card, 'pointerenter', event => {
      if (!mobile.matches && event.pointerType === 'mouse') select(index);
    });
    on(card, 'focus', () => select(index));
    on(card, 'click', () => select(index));
  });
  on(root, 'pointerleave', event => {
    if (!mobile.matches && event.pointerType === 'mouse' && !root.contains(document.activeElement)) {
      select(0);
    }
  });
  on(root, 'keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = active + 1;
    else if (event.key === 'ArrowLeft') next = active - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = cards.length - 1;
    else return;
    event.preventDefault();
    next = Math.max(0, Math.min(cards.length - 1, next));
    cards[next].focus({ preventScroll: true });
    if (mobile.matches) cards[next].scrollIntoView({
      behavior: reduced.matches ? 'instant' : 'smooth', block: 'nearest', inline: 'center'
    });
  });
  on(root, 'scroll', () => {
    if (!mobile.matches || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      let nearest = 0, distance = Infinity;
      cards.forEach((card, index) => {
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - center);
        if (d < distance) { distance = d; nearest = index; }
      });
      select(nearest, false);
    });
  }, { passive: true });
  on(mobile, 'change', configure);
  on(reduced, 'change', () => render(false));
  const resize = new ResizeObserver(() => render(false));
  root.tabIndex = 0;
  root.dataset.depthReady = 'true';
  configure();
  resize.observe(root);
  return () => {
    resize.disconnect();
    cancelAnimationFrame(frame);
    gsap.killTweensOf(cards);
    listeners.forEach(remove => remove());
  };
}
