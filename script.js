// Ordem de inicialização preservada: observadores, abas e efeitos compartilham eventos.
// Processo — seleção das etapas. Inicialização mantida na posição original.
(() => {
    const steps = [...document.querySelectorAll('#processo .etapas-processo > li')];
    const buttons = steps.map((step, index) => {
        const title = step.querySelector('h3');
        const description = step.querySelector('p');
        title.id = 'processo-etapa-' + (index + 1);
        description.id = title.id + '-descricao';
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'processo-select';
        button.setAttribute('aria-label', 'Selecionar etapa ' + (index + 1) + ': ' + title.textContent);
        button.setAttribute('aria-describedby', description.id);
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => {
            steps.forEach((item, i) => {
                item.classList.toggle('is-selected', i === index);
                buttons[i].setAttribute('aria-pressed', String(i === index));
            });
        });
        step.append(button);
        return button;
    });
})();

// Estilos compartilhados — halo decorativo: uma atualização por quadro, somente após movimento do mouse.
(() => {
    const mouse = matchMedia('(hover: hover) and (pointer: fine)');
    const touch = matchMedia('(any-pointer: coarse)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let halo, frame = 0, x = 0, y = 0;
    const enabled = () => mouse.matches && !touch.matches && !reduced.matches;
    const hide = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        halo?.classList.remove('is-visible');
    };
    const move = event => {
        if (!enabled() || document.hidden || event.pointerType !== 'mouse') { hide(); return; }
        if (!halo) {
            halo = document.createElement('div');
            halo.className = 'cursor-halo';
            halo.setAttribute('aria-hidden', 'true');
            document.body.prepend(halo);
        }
        x = event.clientX; y = event.clientY;
        if (frame) return;
        frame = requestAnimationFrame(() => {
            frame = 0;
            halo.style.setProperty('--halo-x', x + 'px');
            halo.style.setProperty('--halo-y', y + 'px');
            halo.classList.add('is-visible');
        });
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', hide);
    mouse.addEventListener('change', hide);
    touch.addEventListener('change', hide);
    reduced.addEventListener('change', hide);
})();

// Soluções — navegação por abas e ciclo automático.
(() => {
    const list = document.querySelector('.solution-tabs');
    if (!list) return;
    const tabs = Array.from(list.querySelectorAll('a'));
    const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
    if (panels.some(panel => !panel)) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const stop = () => clearTimeout(timer);
    const paused = () => document.hidden || reduced.matches;
    const schedule = () => {
        stop();
        if (paused()) return;
        timer = setTimeout(() => {
            if (paused()) { schedule(); return; }
            const index = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
            activate((index + 1) % tabs.length, false, true);
            schedule();
        }, 4000);
    };

    function activate(index, focus = false, automatic = false) {
        // Ao ocultar um painel focado, mantém o foco acessível na nova opção.
        if (automatic && panels.some(panel => panel.contains(document.activeElement))) focus = true;
        tabs.forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(i === index));
            tab.tabIndex = i === index ? 0 : -1;
            panels[i].hidden = i !== index;
        });
        if (focus) tabs[index].focus({ preventScroll: true });
        panels[index].dispatchEvent(new CustomEvent('nodrah:panel-selected', { bubbles: true }));
        const box = list.getBoundingClientRect();
        const item = tabs[index].getBoundingClientRect();
        if (item.left < box.left + 6) list.scrollLeft -= box.left + 6 - item.left;
        if (item.right > box.right - 6) list.scrollLeft += item.right - box.right + 6;
    }

    list.setAttribute('role', 'tablist');
    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', panels[index].id);
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', tab.id);
        panels[index].tabIndex = 0;
        tab.addEventListener('click', event => {
            event.preventDefault();
            activate(index);
            schedule();
        });
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = tabs.length - 1;
            if (event.key === ' ' || event.key === 'Enter') next = index;
            if (next === undefined) return;
            event.preventDefault();
            activate(next, true);
            schedule();
        });
    });
    function selectFromHash() {
        const index = panels.findIndex(panel => '#' + panel.id === location.hash);
        activate(index >= 0 ? index : 0);
        schedule();
    }
    selectFromHash();
    // Clique e teclado reiniciam o intervalo; hover e foco não bloqueiam o ciclo.
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', schedule);
    window.addEventListener('hashchange', selectFromHash);
    window.addEventListener('resize', () => {
        const index = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
        if (index >= 0) activate(index);
    });
})();

// Cabeçalho, apresentação e contato — efeitos decorativos só executam quando visíveis e com a aba ativa.
(() => {
    if (!('IntersectionObserver' in window)) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = [...document.querySelectorAll('.nav-contact, #inicio .button-primary, #contato')];
    const visible = new Set();
    const update = () => elements.forEach(element => element.classList.toggle('effect-active', visible.has(element) && !document.hidden && !reduced.matches));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
        update();
    });
    elements.forEach(element => { element.classList.add('effect-ready'); observer.observe(element); });
    document.addEventListener('visibilitychange', update);
    reduced.addEventListener('change', update);
})();

// Tecnologias — abas em dois níveis. Sem JS, tudo fica visível.
(() => {
    const sets = Array.from(document.querySelectorAll('[data-tabset]')).reverse();
    sets.forEach(set => {
        const list = set.querySelector(':scope > [data-tabs]');
        if (!list) return;
        const tabs = Array.from(list.querySelectorAll('a'));
        const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
        if (panels.some(panel => !panel)) return;
        const keepVisible = tab => {
            const box = list.getBoundingClientRect();
            const item = tab.getBoundingClientRect();
            if (item.left < box.left + 6) list.scrollLeft -= box.left + 6 - item.left;
            if (item.right > box.right - 6) list.scrollLeft += item.right - box.right + 6;
        };
        const activate = (index, focus = false) => {
            tabs.forEach((tab, i) => {
                tab.setAttribute('aria-selected', String(i === index));
                tab.tabIndex = i === index ? 0 : -1;
                panels[i].hidden = i !== index;
            });
            if (focus) tabs[index].focus({ preventScroll: true });
            panels[index].dispatchEvent(new CustomEvent('nodrah:panel-selected', { bubbles: true }));
            keepVisible(tabs[index]);
            // Uma aba interna pode ter sido selecionada enquanto seu grupo estava oculto.
            const inner = panels[index].querySelector(':scope > [data-tabs]');
            if (inner) {
                const selected = inner.querySelector('[aria-selected="true"]');
                if (selected) {
                    const box = inner.getBoundingClientRect();
                    const item = selected.getBoundingClientRect();
                    inner.scrollLeft += Math.max(0, item.right - box.right + 6);
                    if (item.left < box.left) inner.scrollLeft -= box.left - item.left + 6;
                }
            }
        };
        list.setAttribute('role', 'tablist');
        tabs.forEach((tab, index) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-controls', panels[index].id);
            panels[index].setAttribute('role', 'tabpanel');
            panels[index].setAttribute('aria-labelledby', tab.id);
            panels[index].tabIndex = 0;
            tab.addEventListener('click', event => {
                event.preventDefault();
                activate(index);
            });
            tab.addEventListener('keydown', event => {
                let next;
                if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
                if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
                if (event.key === 'Home') next = 0;
                if (event.key === 'End') next = tabs.length - 1;
                if (event.key === 'Enter' || event.key === ' ') next = index;
                if (next === undefined) return;
                event.preventDefault();
                activate(next, true);
            });
        });
        function selectHash(initial = false) {
            const target = document.getElementById(location.hash.slice(1));
            const index = target ? panels.findIndex(panel => panel === target || panel.contains(target)) : -1;
            if (index >= 0) activate(index);
            else if (initial) activate(0);
        }
        selectHash(true);
        window.addEventListener('hashchange', () => selectHash());
        window.addEventListener('resize', () => {
            const tab = tabs.find(tab => tab.getAttribute('aria-selected') === 'true');
            if (tab && list.getClientRects().length) keepVisible(tab);
        });
        set.classList.add('tabs-enhanced');
    });
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
        const sections = document.querySelectorAll('#solucoes, #tecnologias, #processo, #portfolio, #perguntas, #contato');
        const selector = '.section-label, .section-intro, .solution-tabs, .solution-panel, .technology-explorer, .etapas-processo > li, .lista-projetos > .projeto, .faq-list > details, :scope > h2, :scope > .contact-description, :scope > .project-form, :scope > .contact-alternative';
        sections.forEach(section => {
            section.querySelectorAll(selector).forEach(block => {
                // Painéis ocultos por abas são revelados imediatamente na seleção.
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
        document.querySelectorAll('.etapas-processo, .lista-projetos, .faq-list').forEach(group => {
            const items = Array.from(group.children).filter(child => child.classList.contains('reveal-block'));
            items.forEach((item, index) => item.style.setProperty('--reveal-delay', Math.min(index * 50, 200) + 'ms'));
        });
        document.addEventListener('focusin', event => showWithin(event.target));
        document.addEventListener('nodrah:panel-selected', event => showWithin(event.target));
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

// Apresentação inicial — símbolo. O visual é estático sem JS; movimento depende da visibilidade e preferência.
(() => {
    const art = document.querySelector('.hero-art');
    if (!art) return;
    const tilt = art.querySelector('.symbol-tilt');
    const floating = art.querySelector('.symbol-float');
    const sizeSymbol = () => art.style.setProperty('--symbol-depth', floating.offsetWidth / 2 + 'px');
    sizeSymbol();
    if ('ResizeObserver' in window) new ResizeObserver(sizeSymbol).observe(floating);
    else window.addEventListener('resize', sizeSymbol);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = matchMedia('(hover: hover) and (pointer: fine)');
    let inView = false;
    let frame = 0;
    let x = 0, y = 0;
    const reset = () => {
        cancelAnimationFrame(frame); frame = 0;
        tilt.style.removeProperty('--tilt-x'); tilt.style.removeProperty('--tilt-y');
    };
    const update = () => {
        const active = inView && !document.hidden && !reduced.matches;
        art.classList.toggle('motion-active', active);
        if (!active || !mouse.matches) reset();
    };
    if ('IntersectionObserver' in window) {
        art.classList.add('motion-ready');
        new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
            update();
        }, { threshold: 0 }).observe(art);
    }
    art.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse' || !mouse.matches || reduced.matches || !inView || document.hidden) return;
        const bounds = art.getBoundingClientRect();
        x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)) * 4;
        y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)) * -3;
        if (!frame) frame = requestAnimationFrame(() => {
            tilt.style.setProperty('--tilt-x', x + 'deg');
            tilt.style.setProperty('--tilt-y', y + 'deg');
            frame = 0;
        });
    });
    art.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', update);
    reduced.addEventListener('change', update);
    mouse.addEventListener('change', update);
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
