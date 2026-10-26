// Vídeo decorativo — poster permanente, reprodução condicionada e falhas legíveis.
(() => {
    const hero = document.querySelector('.landing-hero');
    if (!hero) return;
    const video = hero.querySelector('video');
    const poster = hero.querySelector('.hero-media');
    const status = hero.querySelector('.hero-status');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    // No celular usamos MP4 leve com a cor incorporada, sem filtros ou mistura em tempo real.
    const mobileMedia = matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)');
    const selectedSource = () => mobileMedia.matches ? video.dataset.mobileSrc : video.dataset.src;
    let visible = false;
    let failed = false;
    let rejected = false;
    let pending = false;
    const permitted = () => visible && !document.hidden && !reduced.matches && !failed && !rejected;
    const report = message => { status.textContent = message; status.hidden = false; };
    poster.addEventListener('error', () => {
        poster.hidden = true;
        hero.classList.add('media-unavailable');
        report('A imagem de fundo não carregou. Você pode continuar navegando normalmente.');
    });
    if (poster.complete && !poster.naturalWidth) poster.dispatchEvent(new Event('error'));
    video.addEventListener('error', () => {
        failed = true;
        hero.classList.remove('is-playing');
        report('O vídeo de fundo não carregou. A apresentação está em modo estático.');
    });
    video.addEventListener('playing', () => {
        if (permitted() && video.getAttribute('src') === selectedSource()) hero.classList.add('is-playing');
        else video.pause();
    });
    async function update() {
        if (!permitted()) {
            video.pause();
            hero.classList.remove('is-playing');
            return;
        }
        if (pending || !video.paused) return;
        const source = selectedSource();
        if (video.getAttribute('src') !== source) {
            hero.classList.remove('is-playing');
            video.poster = mobileMedia.matches ? video.dataset.mobilePoster : video.dataset.poster;
            video.src = source;
        }
        pending = true;
        try {
            await video.play();
            if (!permitted()) video.pause();
        } catch (error) {
            // Uma pausa enquanto play() aguarda não é rejeição de autoplay.
            if (error.name !== 'AbortError' && video.getAttribute('src') === source) {
                rejected = true;
                hero.classList.remove('is-playing');
                report('Reprodução automática indisponível. A apresentação está em modo estático.');
            }
        } finally {
            pending = false;
            if (permitted() && video.paused) requestAnimationFrame(update);
        }
    }
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting;
            update();
        }).observe(hero);
    } else {
        visible = true;
        update();
    }
    document.addEventListener('visibilitychange', update);
    reduced.addEventListener('change', update);
    mobileMedia.addEventListener('change', () => {
        // Pausa antes de trocar a fonte, evitando exibir o original sem tratamento no celular.
        video.pause();
        hero.classList.remove('is-playing');
        failed = false;
        rejected = false;
        update();
    });

})();
