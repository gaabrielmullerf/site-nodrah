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
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const element = targets.get(entry.target);
            if (entry.isIntersecting) visible.add(element);
            else visible.delete(element);
        });
        update();
    });
    elements.forEach(element => element.classList.add('effect-ready'));
    targets.forEach((element, target) => observer.observe(target));
    document.addEventListener('visibilitychange', update);
    reduced.addEventListener('change', update);
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
    reduced.addEventListener('change', configureMotion);
    const resize = new ResizeObserver(measureTrack);
    resize.observe(list);
    resize.observe(viewport);
    configureMotion();
})();

// Seções compartilhadas — entradas progressivas: o estado padrão do conteúdo é sempre visível.
(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || reduced.matches) return;
    let observer;
    const blocks = [];
    const show = (block, immediate = false) => {
        if (!block.classList.contains('reveal-pending')) return;
        if (immediate) block.classList.add('reveal-immediate');
        block.classList.remove('reveal-pending');
        observer?.unobserve(block);
    };
    const showWithin = target => {
        blocks.forEach(block => {
            if (block === target || block.contains(target) || target.contains(block)) show(block, true);
        });
    };
    const showAll = () => {
        blocks.forEach(block => show(block, true));
        observer?.disconnect();
    };
    try {
        observer = new IntersectionObserver(entries => {
            try {
                entries.forEach(entry => { if (entry.isIntersecting) show(entry.target); });
            } catch { showAll(); }
        }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
        const sections = document.querySelectorAll('#solucoes, #pacotes, #tecnologias, #processo, #portfolio, #perguntas, #contato');
        const selector = '.section-label, .section-intro, .catalog-intro, .service-card, .catalog-closing, .bespoke-panel, .technology-carousel, .process-depth-frame, .lista-projetos > .projeto, .faq-list > details, :scope > h2, :scope > .contact-description, :scope > .project-form, :scope > .contact-alternative';
        sections.forEach(section => {
            section.querySelectorAll(selector).forEach(block => {
                block.classList.add('reveal-block');
                blocks.push(block);
                const rect = block.getBoundingClientRect();
                const visible = rect.height > 0 && rect.top < innerHeight && rect.bottom > 0;
                if (!visible) {
                    observer.observe(block);
                    block.classList.add('reveal-pending');
                }
            });
        });
        document.querySelectorAll('.lista-projetos, .faq-list').forEach(group => {
            const items = Array.from(group.children).filter(child => child.classList.contains('reveal-block'));
            items.forEach((item, index) => item.style.setProperty('--reveal-delay', Math.min(index * 50, 200) + 'ms'));
        });
        // O atraso reinicia em cada linha, acompanhando as colunas reais das grades.
        document.querySelectorAll('.service-grid').forEach(catalog => {
            const staggerCards = () => {
                const columns = getComputedStyle(catalog).gridTemplateColumns.split(' ').length;
                [...catalog.children].forEach((card, index) => {
                    card.style.setProperty('--reveal-delay', (index % columns) * 70 + 'ms');
                });
            };
            staggerCards();
            if ('ResizeObserver' in window) new ResizeObserver(staggerCards).observe(catalog);
            else window.addEventListener('resize', staggerCards);
        });
        document.addEventListener('focusin', event => showWithin(event.target));
        document.addEventListener('click', event => {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;
            const target = document.getElementById(link.hash.slice(1));
            if (target) showWithin(target);
        });
        const revealHash = () => {
            const target = document.getElementById(location.hash.slice(1));
            if (target) showWithin(target);
        };
        window.addEventListener('hashchange', revealHash);
        window.addEventListener('error', showAll);
        window.addEventListener('unhandledrejection', showAll);
        reduced.addEventListener('change', () => { if (reduced.matches) showAll(); });
        revealHash();
        if (document.activeElement !== document.body && document.activeElement !== document.documentElement) showWithin(document.activeElement);
    } catch { showAll(); }
})();

// Painel de apresentação — borda contínua somente quando visível e com a aba ativa.
(() => {
    const panel = document.querySelector('#pacotes .bespoke-panel');
    if (!panel || !('IntersectionObserver' in window)) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => panel.classList.toggle('panel-motion-active', visible && !document.hidden && !reduced.matches);
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        update();
    }).observe(panel);
    document.addEventListener('visibilitychange', update);
    reduced.addEventListener('change', update);
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
        field.addEventListener('blur', () => {
            touched.add(field);
            validate(field, true);
        });
        field.addEventListener('input', () => validate(field, touched.has(field)));
        field.addEventListener('change', () => validate(field, touched.has(field)));
    });
    form.addEventListener('submit', async event => {
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
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(form)).toString()
            });
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
            status.textContent = 'O envio não foi confirmado. Tente novamente ou entre em contato pelo e-mail contato@nodrah.com.br.';
        } finally {
            submitting = false;
            button.disabled = false;
            buttonLabel.textContent = idleLabel;
            button.removeAttribute('aria-busy');
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
    button.addEventListener('click', async () => {
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
    toggle.addEventListener('click', () => { open = !open; update(); });
    navigation.addEventListener('click', event => {
        if (event.target.closest('a')) { open = false; update(); }
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && open) {
            open = false;
            update();
            toggle.focus();
        }
    });
    mobile.addEventListener('change', () => { open = false; update(); });
    update();
})();

// Entrada do título preservada, independente do fundo WebGL.
(() => {
    const hero = document.querySelector('.nodrah-hero');
    // Observa a abertura existente sem mudar seu arquivo ou introduzir outro loading.
    const root = document.documentElement;
    const enter = () => {
        if (root.classList.contains('intro-pending')) return;
        hero.classList.add('hero-entering');
        observer.disconnect();
        setTimeout(() => hero.classList.remove('hero-entering'), 1600);
    };
    const observer = new MutationObserver(enter);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    enter();
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
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(schedule, { threshold: [0, .1, .25, .5, .75, 1] });
    sections.forEach(section => observer.observe(section));
    // Scroll cobre também seções maiores que a viewport entre notificações do observer.
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    const offset = () => {
        document.documentElement.style.setProperty('--nodrah-nav-offset', `${Math.ceil(header.getBoundingClientRect().height) + 16}px`);
        schedule();
    };
    if ('ResizeObserver' in window) new ResizeObserver(offset).observe(header);
    offset();
    update();
})();

// Mede o bloco anterior para prendê-lo apenas após o último serviço entrar em vista.
(() => {
    const wrapper = document.querySelector('.solutions-panel-transition');
    const stage = wrapper?.querySelector('.nodrah-hero-transition');
    if (!stage || !('ResizeObserver' in window)) return;
    const measure = () => wrapper.style.setProperty('--solutions-stage-height', `${stage.getBoundingClientRect().height}px`);
    new ResizeObserver(measure).observe(stage);
    measure();
})();
