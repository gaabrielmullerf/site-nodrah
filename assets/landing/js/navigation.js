const header = document.querySelector('.site-header');
const toggle = header?.querySelector('.nodrah-menu-toggle');
const navigation = document.getElementById('landing-navigation');
if (header && toggle && navigation) {
  const mobile = matchMedia('(max-width: 768px)');
  let open = false;
  const update = () => {
    toggle.hidden = !mobile.matches;
    navigation.hidden = mobile.matches && !open;
    toggle.setAttribute('aria-expanded', String(mobile.matches && open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => { open = !open; update(); });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) { open = false; update(); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) { open = false; update(); toggle.focus(); }
  });
  mobile.addEventListener('change', () => { open = false; update(); });
  header.classList.add('menu-ready');
  update();
}
