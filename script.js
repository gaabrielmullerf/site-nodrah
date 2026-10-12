(() => {
  const list = document.querySelector('.solution-tabs');
  if (!list) return;
  const tabs = Array.from(list.querySelectorAll('a'));
  const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
  if (panels.some(panel => !panel)) return;

  function activate(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus({ preventScroll: true });
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
    });
  });
  function selectFromHash() {
    const index = panels.findIndex(panel => '#' + panel.id === location.hash);
    activate(index >= 0 ? index : 0);
  }
  selectFromHash();
  window.addEventListener('hashchange', selectFromHash);
  window.addEventListener('resize', () => {
    const index = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    if (index >= 0) activate(index);
  });
})();

// A seção de tecnologias usa abas em dois níveis. Sem JS, tudo fica visível.
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

// Apenas validação local: nenhum envio ou armazenamento de dados do formulário.
(() => {
  const form = document.getElementById('project-form');
  if (!form) return;
  const fields = Array.from(form.querySelectorAll('[required]'));
  const touched = new Set();
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
  form.addEventListener('submit', event => {
    event.preventDefault();
    fields.forEach(field => { touched.add(field); validate(field, true); });
    const invalid = fields.find(field => !field.validity.valid);
    if (invalid) invalid.focus();
  });
})();

// Confirma a cópia apenas após a API concluir; falhas oferecem cópia manual.
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
