import { submitLead, parseCurrency } from './lead-service.js?v=netlify-forms-1';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const form = document.getElementById('lead-form');
if (form) {
  const steps = [...form.querySelectorAll('[data-step]')];
  const previous = document.getElementById('previous-step');
  const next = document.getElementById('next-step');
  const buttonLabel = next.querySelector('[data-button-label]');
  const progress = document.getElementById('lead-progress');
  const count = document.getElementById('step-count');
  const error = document.getElementById('step-error');
  const result = document.getElementById('lead-result');
  const currency = form.querySelector('[data-currency]');
  const email = form.elements.email;
  let current = 0;
  const status = document.getElementById('lead-status');
  let submitting = false;
  let submitted = false;

  function clearErrors() {
    form.querySelectorAll('.field-error').forEach(element => { element.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(element => element.removeAttribute('aria-invalid'));
  }
  function showStep(index, focus = true) {
    clearErrors();
    current = index;
    steps.forEach((step, i) => {
      step.hidden = i !== index;
      step.classList.remove('step-enter');
    });
    const step = steps[index];
    // Reinicia apenas a transição visual; as respostas continuam nos campos.
    void step.offsetWidth;
    step.classList.add('step-enter');
    previous.hidden = index === 0;
    buttonLabel.textContent = index === steps.length - 1 ? 'Enviar solicitação' : 'Continuar';
    next.querySelector('[aria-hidden]').textContent = index === steps.length - 1 ? '↗' : '→';
    progress.value = index + 1;
    count.textContent = `Etapa ${index + 1} de ${steps.length}`;
    if (focus) step.querySelector('legend').focus();
  }
  function invalidate(field, message, errorId = 'step-error') {
    field.setAttribute('aria-invalid', 'true');
    document.getElementById(errorId).textContent = message;
    return field;
  }
  function validate(step) {
    clearErrors();
    const kind = step.dataset.kind;
    if (kind === 'checkbox' || kind === 'radio') {
      if (!step.querySelector('input:checked')) return invalidate(step.querySelector('input'), kind === 'checkbox' ? 'Selecione pelo menos uma opção para continuar.' : 'Selecione uma opção para continuar.');
    } else if (kind === 'currency') {
      const value = parseCurrency(currency.value);
      if (value === null) return invalidate(currency, 'Informe um valor válido maior que zero, como R$ 150,00.');
      currency.value = money.format(value);
    } else if (kind === 'contact') {
      let first;
      const name = form.elements.nome;
      const consent = form.elements.consentimento;
      if (name.value.trim().length < 3) first = invalidate(name, 'Informe seu nome completo.', 'name-error');
      if (!email.value.trim()) first = invalidate(email, 'Informe seu e-mail profissional.', 'email-error') || first;
      else if (!email.validity.valid) first = invalidate(email, 'Informe um e-mail válido, como nome@exemplo.com.br.', 'email-error') || first;
      if (!consent.checked) { const invalid = invalidate(consent, 'Autorize o contato comercial para enviar sua solicitação.', 'consent-error'); first ||= invalid; }
      // Prioriza o primeiro campo inválido na ordem de leitura.
      return step.querySelector('[aria-invalid="true"]') || first;
    }
    return null;
  }
  currency.addEventListener('blur', () => {
    const value = parseCurrency(currency.value);
    if (value !== null) currency.value = money.format(value);
  });
  previous.addEventListener('click', () => { if (current > 0 && !submitting) showStep(current - 1); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || submitted) return;
    const invalid = validate(steps[current]);
    if (invalid) { invalid.focus(); return; }
    if (current < steps.length - 1) { showStep(current + 1); return; }
    // Revalida também as etapas anteriores antes da conclusão.
    for (let i = 0; i < steps.length; i++) {
      const invalid = validate(steps[i]);
      if (invalid) { showStep(i); validate(steps[i]); invalid.focus(); return; }
    }
    submitting = true;
    next.disabled = true;
    previous.disabled = true;
    form.setAttribute('aria-busy', 'true');
    buttonLabel.textContent = 'Enviando…';
    status.textContent = 'Enviando sua solicitação…';
    try {
      const request = submitLead(form);
      steps.forEach(step => { step.disabled = true; });
      const response = await request;
      if (!response.received) throw new Error('Envio não confirmado');
      submitted = true;
      status.textContent = 'Solicitação enviada com sucesso!';
      form.hidden = true;
      result.hidden = false;
      result.querySelector('h3').focus();
    } catch {
      error.textContent = 'O envio não foi confirmado. Suas respostas foram preservadas. Tente novamente ou escreva para contato@nodrah.com.br.';
      status.textContent = 'Falha no envio. Você pode tentar novamente.';
      buttonLabel.textContent = 'Tentar novamente';
    } finally {
      submitting = false;
      next.disabled = submitted;
      previous.disabled = submitted;
      steps.forEach(step => { step.disabled = submitted; });
      form.removeAttribute('aria-busy');
    }
  });
  // Sem JavaScript, os campos ficam bloqueados para evitar submissões parciais.
  // O listener de submit já está registrado antes da liberação dos campos.
  steps.forEach(step => { step.disabled = false; });
  form.elements['bot-field'].disabled = false;
  form.querySelector('.form-actions').hidden = false;
  document.querySelector('.form-progress').hidden = false;
  next.disabled = false;
  showStep(0, false);
}
