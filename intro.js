// Abertura da marca — independente das funcionalidades e animações do site.
(() => {
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    // Exibe a cada carregamento; respeita a preferência por movimento reduzido.
    if (reduced.matches) return;

    let ended = false;
    let overlay;
    const animations = [];
    const interruptions = ['keydown', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'resize', 'pagehide'];

    // Não bloqueia eventos, não altera foco ou rolagem e funciona mesmo sem a logo.
    function finish() {
        if (ended) return;
        ended = true;
        clearTimeout(deadline);
        animations.forEach(animation => animation.cancel());
        root.classList.remove('intro-pending', 'intro-revealing');
        (overlay || document.querySelector('.brand-intro'))?.remove();
        interruptions.forEach(event => window.removeEventListener(event, finish, true));
        reduced.removeEventListener('change', finish);
    }

    root.classList.add('intro-pending');
    // Limite contado desde a ativação, sem esperar imagens secundárias ou fontes.
    const deadline = setTimeout(finish, 3000);
    interruptions.forEach(event => window.addEventListener(event, finish, { capture: true, passive: true }));
    reduced.addEventListener('change', finish);

    function animate(element, frames, options) {
        const animation = element.animate(frames, { fill: 'forwards', ...options });
        animations.push(animation);
        return animation.finished;
    }

    // Cada peça mantém a palavra inteira; clip-path recorta só sua região.
    function createFragments(logo, width, height) {
        overlay.style.width = width + 'px';
        overlay.style.height = height + 'px';
        overlay.style.left = (innerWidth - width) / 2 + 'px';
        overlay.style.top = (innerHeight - height) / 2 + 'px';
        overlay.style.fontSize = (parseFloat(getComputedStyle(logo).fontSize) * width / logo.getBoundingClientRect().width) + 'px';
        const fragments = [];
        for (let row = 0; row < 2; row++) {
            for (let column = 0; column < 3; column++) {
                const piece = document.createElement('div');
                piece.className = 'brand-intro-piece';
                piece.style.clipPath = `inset(${row * 50}% ${100 - (column + 1) * 100 / 3}% ${50 - row * 50}% ${column * 100 / 3}%)`;
                const wordmark = logo.cloneNode(true);
                piece.append(wordmark);
                overlay.append(piece);
                fragments.push({ piece, row, column });
            }
        }
        return fragments;
    }

    async function start() {
        if (ended) return;
        overlay = document.querySelector('.brand-intro');
        const logo = document.querySelector('.site-header > .brand > .brand-wordmark');
        try {
            if (!overlay || !logo || !Element.prototype.animate) return finish();
            // Mede a nova marca na fonte carregada; o limite independente libera em caso de falha.
            await document.fonts.load('600 24px Montserrat');
            if (ended) return;
            const target = logo.getBoundingClientRect();
            // Âncoras e restauração de rolagem permanecem intactas; destino fora da tela pula a abertura.
            if (target.top < 0 || target.bottom > innerHeight || scrollY > 0) return finish();
            const width = Math.min(640, innerWidth * 0.78);
            const height = width * target.height / target.width;
            const pieces = createFragments(logo, width, height);
            await Promise.all(pieces.map(({ piece }) => animate(piece.firstElementChild, [
                { clipPath: 'inset(0 100% 0 0)' },
                { clipPath: 'inset(0 0% 0 0)' }
            ], { duration: 850, easing: 'cubic-bezier(.4,0,.2,1)' })));
            if (ended) return;
            const origin = overlay.getBoundingClientRect();
            // Destino medido novamente após o preenchimento, sem coordenadas fixas.
            const destination = logo.getBoundingClientRect();
            const transform = `translate(${destination.left - origin.left}px, ${destination.top - origin.top}px) scale(${destination.width / width}, ${destination.height / height})`;
            root.classList.add('intro-revealing');
            await Promise.all(pieces.map(({ piece, row, column }) => {
                const x = (column - 1) * 24;
                const y = (row ? 1 : -1) * 19;
                return animate(piece, [
                    { transform: 'translate(0, 0) scale(1)', offset: 0 },
                    { transform: `translate(${x}px, ${y}px) rotate(${(column - 1) * (row ? -3 : 3)}deg)`, offset: 0.2 },
                    { transform, offset: 1 }
                ], { duration: 1050, easing: 'cubic-bezier(.4,0,.2,1)' });
            }));
            finish();
        } catch {
            finish();
        }
    }

    document.addEventListener('DOMContentLoaded', start, { once: true });
})();
