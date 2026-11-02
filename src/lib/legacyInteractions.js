// Compatibility bridge: existing interactions retain approved behavior during migration.
// Every resource belongs to this mount; no global prototypes are modified.
export function mountSiteInteractions() {
 const cleanups = [];
 const abort = new AbortController();
 let alive = true;
 const timers = new Set();
 const frames = new Set();
 const on = (target, name, listener, options) => {
  target.addEventListener(name, listener, options);
  cleanups.push(() => target.removeEventListener(name, listener, options));
 };
 const observeResource = (Type, callback, options) => {
  const observer = new Type(callback, options);
  cleanups.push(() => observer.disconnect());
  return observer;
 };
 const later = (callback, delay) => {
  const id = setTimeout(() => { timers.delete(id); callback(); }, delay);
  timers.add(id); return id;
 };
 const nextFrame = callback => {
  const id = requestAnimationFrame(time => { frames.delete(id); callback(time); });
  frames.add(id); return id;
 };
// Ordem de inicialização preservada: observadores e efeitos compartilham eventos.
// Cabeçalho, apresentação e contato — efeitos decorativos só executam quando visíveis e com a aba ativa.
(() => {
    if (!('IntersectionObserver' in window)) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = [...document.querySelectorAll('.nav-contact, .mobile-whatsapp, #contato')];
    const visible = new Set();
    // O contato é posicionado fora da área dos links; observe o cabeçalho fixo para ele.
    const targets = new Map(elements.map(element => [element.closest('.site-header') || element, element]));
    const update = () => elements.forEach(element => element.classList.toggle('effect-active', visible.has(element) && !document.hidden && !reduced.matches));
    const observer = observeResource(IntersectionObserver, entries => {
        entries.forEach(entry => {
            const element = targets.get(entry.target);
            if (entry.isIntersecting) visible.add(element);
            else visible.delete(element);
        });
        update();
    });
    elements.forEach(element => element.classList.add('effect-ready'));
    targets.forEach((element, target) => observer.observe(target));
    on(document, 'visibilitychange', update);
    on(reduced, 'change', update);
})();

// Tecnologias — faixa contínua; aprimoramento isolado da lista semântica.
(() => {
    const section = document.getElementById('tecnologias');
    const carousel = section?.querySelector('.technology-carousel');
    if (!carousel || !Element.prototype.animate || !('ResizeObserver' in window)) return;
    const viewport = carousel.querySelector('.technology-viewport');
    const track = carousel.querySelector('.technology-track');
    const list = track.querySelector('.technology-list');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const speed = 37.5; // Pixels por segundo, independente da largura da tela.
    let animation;
    let distance = 0;
    let viewportWidth = 0;

    function removeCopies() {
        track.querySelectorAll('.technology-copy-list').forEach(copy => copy.remove());
    }

    // A largura inclui o espaço final: o primeiro item da cópia fecha o loop exatamente.
    function measureTrack() {
        if (reduced.matches) return;
        const nextDistance = list.getBoundingClientRect().width;
        const nextViewportWidth = viewport.clientWidth;
        if (!nextDistance || (distance === nextDistance && viewportWidth === nextViewportWidth)) return;
        const progress = animation && distance ? (Number(animation.currentTime) % (distance / speed * 1000)) / (distance / speed * 1000) : 0;
        animation?.cancel();
        removeCopies();
        distance = nextDistance;
        viewportWidth = nextViewportWidth;
        for (let i = 0; i < Math.ceil(viewportWidth / distance); i++) {
            const copy = list.cloneNode(true);
            copy.classList.add('technology-copy-list');
            copy.removeAttribute('aria-label');
            copy.setAttribute('aria-hidden', 'true');
            copy.inert = true;
            track.append(copy);
        }
        const duration = distance / speed * 1000;
        animation = track.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(-${distance}px)` }
        ], { duration, iterations: Infinity, easing: 'linear' });
        animation.currentTime = progress * duration;
    }

    function configureMotion() {
        animation?.cancel();
        animation = undefined;
        removeCopies();
        distance = 0;
        carousel.classList.toggle('is-enhanced', !reduced.matches);
        if (!reduced.matches) measureTrack();
    }

    // Movimento contínuo, sem pausas por interação ou visibilidade.
    on(reduced, 'change', configureMotion);
    const resize = observeResource(ResizeObserver, measureTrack);
    resize.observe(list);
    resize.observe(viewport);
    configureMotion();
})();

// Painel de apresentação — borda contínua somente quando visível e com a aba ativa.
(() => {
    if (!('IntersectionObserver' in window)) return;
    document.querySelectorAll('#pacotes .bespoke-panel, #perguntas .faq-panel').forEach(panel => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => panel.classList.toggle('panel-motion-active', visible && !document.hidden && !reduced.matches);
    observeResource(IntersectionObserver, ([entry]) => {
        visible = entry.isIntersecting;
        update();
    }).observe(panel);
    on(document, 'visibilitychange', update);
    on(reduced, 'change', update);
    });
})();

// Contato — validação local e envio ao Netlify Forms, com alternativa HTML nativa.
(() => {
    const form = document.getElementById('project-form');
    if (!form) return;
    const fields = Array.from(form.querySelectorAll('[required]'));
    const touched = new Set();
    const button = form.querySelector('[type="submit"]');
    const buttonLabel = button.firstChild;
    const idleLabel = buttonLabel.textContent;
    const status = document.getElementById('project-form-note');
    let submitting = false;
    const messages = {
        'project-name': 'Informe seu nome.',
        'project-email': 'Informe seu e-mail.',
        'project-type': 'Selecione o tipo de projeto.',
        'project-description': 'Descreva o que você precisa construir ou melhorar.'
    };
    function validate(field, showError) {
        field.setCustomValidity('');
        let message = '';
        if (!field.value.trim()) message = messages[field.id];
        else if (field.validity.typeMismatch) message = 'Informe um e-mail válido, como nome@empresa.com.br.';
        else if (field.validity.tooLong) message = 'Reduza o texto para o limite deste campo.';
        field.setCustomValidity(message);
        if (showError) {
            document.getElementById(field.id + '-error').textContent = message;
            field.setAttribute('aria-invalid', String(Boolean(message)));
        }
        return !message;
    }
    fields.forEach(field => {
        on(field, 'blur', () => {
            touched.add(field);
            validate(field, true);
        });
        on(field, 'input', () => validate(field, touched.has(field)));
        on(field, 'change', () => validate(field, touched.has(field)));
    });
    on(form, 'submit', async event => {
        event.preventDefault();
        if (submitting) return;
        fields.forEach(field => { touched.add(field); validate(field, true); });
        const invalid = fields.find(field => !field.validity.valid);
        if (invalid) { invalid.focus(); return; }

        submitting = true;
        button.disabled = true;
        buttonLabel.textContent = 'Enviando… ';
        button.setAttribute('aria-busy', 'true');
        status.textContent = 'Enviando seu projeto…';
        try {
            const response = await fetch('/', {
                method: 'POST',
                signal: abort.signal,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(form)).toString()
            });
            if (!alive) return;
            if (!response.ok) throw new Error('Envio não confirmado');
            form.reset();
            touched.clear();
            fields.forEach(field => {
                field.setCustomValidity('');
                field.removeAttribute('aria-invalid');
                document.getElementById(field.id + '-error').textContent = '';
            });
            status.textContent = 'Projeto enviado! Recebemos suas informações e entraremos em contato.';
        } catch {
            if (!alive) return;
            status.textContent = 'O envio não foi confirmado. Tente novamente ou entre em contato pelo e-mail contato@nodrah.com.br.';
        } finally {
            if (alive) {
            submitting = false;
            button.disabled = false;
            buttonLabel.textContent = idleLabel;
            button.removeAttribute('aria-busy');
            }
        }
    });
})();

// Contato — cópia do e-mail. Confirma a cópia apenas após a API concluir; falhas oferecem cópia manual.
(() => {
    const button = document.getElementById('copy-email');
    if (!button) return;
    const status = document.getElementById('copy-status');
    const fallback = document.getElementById('copy-fallback');
    const address = document.getElementById('manual-email');
    button.hidden = false;
    on(button, 'click', async () => {
        button.disabled = true;
        status.textContent = '';
        try {
            if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Cópia indisponível');
            await navigator.clipboard.writeText(address.value);
            fallback.hidden = true;
            status.textContent = 'E-mail copiado: ' + address.value;
        } catch {
            fallback.hidden = false;
            status.textContent = 'Não foi possível copiar automaticamente. Selecione o endereço abaixo para copiar manualmente.';
            address.focus();
            address.select();
        } finally {
            button.disabled = false;
        }
    });
})();

// Menu compacto — links fechados fora do foco; sem JS a navegação permanece aberta.
(() => {
    const header = document.querySelector('.site-header');
    const toggle = header.querySelector('.nodrah-menu-toggle');
    const navigation = document.getElementById('nodrah-navigation');
    const mobile = matchMedia('(max-width: 768px)');
    let open = false;
    const update = () => {
        toggle.hidden = !mobile.matches;
        navigation.hidden = mobile.matches && !open;
        toggle.setAttribute('aria-expanded', String(mobile.matches && open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    header.classList.add('menu-ready');
    on(toggle, 'click', () => { open = !open; update(); });
    on(navigation, 'click', event => {
        if (event.target.closest('a')) { open = false; update(); }
    });
    on(document, 'keydown', event => {
        if (event.key === 'Escape' && open) {
            open = false;
            update();
            toggle.focus();
        }
    });
    on(mobile, 'change', () => { open = false; update(); });
    update();
})();

// Navegação por seção: predominância visível com margem de estabilidade nas transições.
(() => {
    const header = document.querySelector('.site-header');
    const links = [...document.querySelectorAll('#nodrah-navigation > a[href^="#"]')];
    const sections = [...document.querySelectorAll('main section[id]')];
    if (!header || !('IntersectionObserver' in window)) return;
    let active = null;
    let frame = 0;
    const update = () => {
        frame = 0;
        const headerStyle = getComputedStyle(header);
        const inset = headerStyle.position === 'fixed' || headerStyle.position === 'sticky'
            ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
        const scores = sections.map((section, index) => {
            const rect = section.getBoundingClientRect();
            // Conta somente a área visível abaixo do cabeçalho e antes da próxima seção.
            const nextTop = sections[index + 1]?.getBoundingClientRect().top ?? Infinity;
            return { section, height: Math.max(0, Math.min(rect.bottom, nextTop, innerHeight) - Math.max(rect.top, inset)) };
        });
        const best = scores.reduce((a, b) => b.height > a.height ? b : a, { section: null, height: 0 });
        const previous = scores.find(item => item.section === active);
        if (!previous || previous.height === 0 || best.height > previous.height + 32) active = best.section;
        links.forEach(link => {
            if (active?.id === link.hash.slice(1)) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };
    const schedule = () => { if (!frame) frame = nextFrame(update); };
    const observer = observeResource(IntersectionObserver, schedule, { threshold: [0, .1, .25, .5, .75, 1] });
    sections.forEach(section => observer.observe(section));
    // Scroll cobre também seções maiores que a viewport entre notificações do observer.
    on(window, 'scroll', schedule, { passive: true });
    on(window, 'resize', schedule);
    on(window, 'hashchange', schedule);
    const offset = () => {
        document.documentElement.style.setProperty('--nodrah-nav-offset', `${Math.ceil(header.getBoundingClientRect().height) + 16}px`);
        schedule();
    };
    if ('ResizeObserver' in window) observeResource(ResizeObserver, offset).observe(header);
    offset();
    update();
})();

// Mede o bloco anterior para prendê-lo apenas após o último serviço entrar em vista.
(() => {
    const wrapper = document.querySelector('.solutions-panel-transition');
    const stage = wrapper?.querySelector('.nodrah-hero-transition');
    if (!stage || !('ResizeObserver' in window)) return;
    const measure = () => wrapper.style.setProperty('--solutions-stage-height', `${stage.getBoundingClientRect().height}px`);
    observeResource(ResizeObserver, measure).observe(stage);
    measure();
})();

 return () => {
  alive = false; abort.abort();
  cleanups.reverse().forEach(cleanup => cleanup());
  timers.forEach(clearTimeout);
  frames.forEach(cancelAnimationFrame);
  document.querySelector('.technology-track')?.getAnimations().forEach(animation => animation.cancel());
  document.querySelectorAll('.technology-copy-list').forEach(copy => copy.remove());
 };
}
