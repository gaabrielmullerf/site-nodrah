// Netlify Forms nativo: nenhuma credencial, log de dados pessoais ou armazenamento local.
const pending = new WeakMap();
const completed = new WeakSet();
const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic'];

export function buildLeadPayload(form) {
  if (!form.elements.consentimento?.checked) throw new Error('Consentimento obrigatório');
  if (form.elements['bot-field']?.value) throw new Error('Envio não permitido');
  const amount = parseCurrency(form.querySelector('[data-currency]').value);
  if (amount === null) throw new Error('Valor inválido');
  const payload = new URLSearchParams(new FormData(form));
  // URLSearchParams preserva todas as ocorrências de canais[], sem Object.fromEntries.
  payload.set('form-name', form.name);
  payload.set('valor-consulta', amount.toFixed(2));
  payload.set('email', form.elements.email.value.trim());
  payload.set('nome', form.elements.nome.value.trim());
  payload.set('instagram', form.elements.instagram.value.trim());
  payload.set('origem', location.origin + location.pathname);
  if (!form.elements['submission-id'].value) form.elements['submission-id'].value = crypto.randomUUID();
  payload.set('submission-id', form.elements['submission-id'].value);
  const campaign = new URLSearchParams(location.search);
  for (const name of utmFields) {
    const value = (campaign.get(name) || '').trim().slice(0, 500);
    form.elements[name].value = value;
    payload.set(name, value);
  }
  return payload;
}

export function submitLead(form) {
  if (completed.has(form)) return Promise.resolve({ received: true });
  if (pending.has(form)) return pending.get(form);
  let body;
  try { body = buildLeadPayload(form).toString(); }
  catch (error) { return Promise.reject(error); }
  const request = (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Envio não confirmado');
      completed.add(form);
      return { received: true };
    } finally {
      clearTimeout(timeout);
    }
  })();
  pending.set(form, request);
  // Limpa também após falhas, permitindo nova tentativa explícita com o mesmo ID.
  request.then(() => pending.delete(form), () => pending.delete(form));
  return request;
}

export function parseCurrency(value) {
  const raw = value.trim().replace(/^R\$\s*/, '').replace(/\s/g, '');
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(raw)) return null;
  const [whole, decimal = ''] = raw.replace(/\./g, '').split(',');
  const cents = Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
  return Number.isSafeInteger(cents) && cents > 0 ? cents / 100 : null;
}
