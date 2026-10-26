const header = document.querySelector('.site-header');
const toggle = header?.querySelector('.nodrah-menu-toggle');
const navigation = document.getElementById('landing-navigation');
if (header && toggle && navigation) {
  const mobile = matchMedia('(max-width: 768px)');
  const compact = header.classList.contains('site-header--compact');
  const collapsed = () => compact || mobile.matches;
  let open = false;
  const update = () => {
    toggle.hidden = !collapsed();
    navigation.hidden = collapsed() && !open;
    toggle.setAttribute('aria-expanded', String(collapsed() && open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => { open = !open; update(); });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) { open = false; update(); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) { open = false; update(); toggle.focus(); }
  });
  if (compact) {
    document.addEventListener('pointerdown', event => {
      if (open && !header.contains(event.target)) { open = false; update(); }
    });
    header.addEventListener('focusout', event => {
      if (open && !header.contains(event.relatedTarget)) { open = false; update(); }
    });
  }
  mobile.addEventListener('change', () => { open = false; update(); });
  header.classList.add('menu-ready');
  update();
}
