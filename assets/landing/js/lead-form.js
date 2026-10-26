import { submitLead } from './lead-service.js';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export function parseCurrency(value) {
  const raw = value.trim().replace(/^R\$\s*/, '').replace(/\s/g, '');
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(raw)) return null;
  const [whole, decimal = ''] = raw.replace(/\./g, '').split(',');
  const cents = Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 ? cents / 100 : null;
}
const form = document.getElementById('lead-form');
if (form) {
  const steps = [...form.querySelectorAll('[data-step]')];
  const previous = document.getElementById('previous-step');
  const next = document.getElementById('next-step');
  const buttonLabel = next.querySelector('[data-button-label]');
  const progress = document.getElementById('lead-progress');
  const count = document.getElementById('step-count');
  const error = document.getElementById('step-error');
  const result = document.getElementById('demo-result');
  const currency = form.querySelector('[data-currency]');
  const email = form.elements.email;
  let current = 0;
  let submitting = false;

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
    buttonLabel.textContent = index === steps.length - 1 ? 'Concluir demonstração' : 'Continuar';
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
      if (!consent.checked) { const invalid = invalidate(consent, 'Marque a autorização para concluir a demonstração.', 'consent-error'); first ||= invalid; }
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
    if (submitting) return;
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
    try {
      const response = await submitLead(form);
      if (response.mode !== 'demo' || response.received) throw new Error('Esta versão permite apenas demonstração.');
      form.hidden = true;
      result.hidden = false;
      result.querySelector('h3').focus();
    } catch {
      error.textContent = 'Não foi possível concluir a prévia. Nenhum recebimento foi confirmado. Tente novamente.';
    } finally {
      submitting = false;
      next.disabled = false;
      previous.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
  document.getElementById('restart-form').addEventListener('click', () => {
    form.reset();
    result.hidden = true;
    form.hidden = false;
    showStep(0);
  });
  // O HTML chega bloqueado: falhas de carregamento ou JS desativado não enviam dados.
  // O listener de submit já está registrado antes da liberação dos campos.
  steps.forEach(step => { step.disabled = false; });
  form.elements['bot-field'].disabled = false;
  form.querySelector('.form-actions').hidden = false;
  document.querySelector('.form-progress').hidden = false;
  next.disabled = false;
  showStep(0, false);
}
