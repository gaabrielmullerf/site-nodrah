// Mesmo princípio do institucional: conteúdo visível sem JS e movimento opcional.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('step-enter');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.form-intro, .form-card').forEach(element => observer.observe(element));
  reduced.addEventListener('change', () => observer.disconnect(), { once: true });
}
