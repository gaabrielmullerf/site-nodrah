// Ativação real exige alteração de código e validação no Netlify. Não lê URL,
// localStorage ou atributos HTML para habilitar envios.
const LIVE_SUBMISSION_ENABLED = false;

export async function submitLead(form) {
  if (!LIVE_SUBMISSION_ENABLED) return { mode: 'demo', received: false };
  return submitToNetlify(form);
}

// Preparado para ativação posterior. Nunca chamado no modo demonstração.
async function submitToNetlify(form) {
  const payload = new FormData(form);
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(payload).toString()
  });
  if (!response.ok) throw new Error('Envio não confirmado');
  return { mode: 'live', received: true };
}
