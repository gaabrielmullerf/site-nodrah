import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFile(resolve(root, path), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(template, values) {
  return template.replace(/{{(\w+)}}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Variável de template ausente: ${key}`);
    return values[key];
  });
}
function questionMarkup(question, index) {
  const { name, type, title, hint, options } = question;
  if (!/^[a-z][a-z0-9-]*$/.test(name) || !['checkbox','radio','currency'].includes(type)) throw new Error('Pergunta inválida');
  const prefix = `question-${index}`;
  const choices = type === 'currency'
    ? `<div class="project-field currency-field"><label for="${name}" class="sr-only">Valor da consulta em reais</label><input id="${name}" name="${name}" type="text" inputmode="decimal" maxlength="20" placeholder="R$ 0,00" required autocomplete="off" data-currency aria-describedby="${prefix}-hint step-error"></div>`
    : `<div class="choice-list">${options.map((option, i) => `<label class="choice"><input type="${type}" name="${name}${type === 'checkbox' ? '[]' : ''}" value="${escape(option)}"${type === 'radio' ? ' required' : ''} aria-describedby="${prefix}-hint step-error"><span>${escape(option)}</span><svg class="choice-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg></label>`).join('\n')}</div>`;
  return `        <fieldset class="form-step" data-step data-kind="${type}" disabled${index ? ' hidden' : ''} aria-describedby="${prefix}-hint step-error"><legend tabindex="-1">${escape(title)}</legend><p class="step-hint" id="${prefix}-hint">${escape(hint)}</p>${choices}</fieldset>`;
}

const names = ['head','header','footer','lead-form'];
const partials = Object.fromEntries(await Promise.all(names.map(async name => [name, await read(`landing-pages/partials/${name}.html`)])));
const template = await read('landing-pages/templates/landing.html');
const slugs = new Set();
for (const file of (await readdir(resolve(root, 'landing-pages/content'))).filter(file => file.endsWith('.json')).sort()) {
  const content = JSON.parse(await read(`landing-pages/content/${file}`));
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(content.slug) || ['projetos','assets','scripts','landing-pages'].includes(content.slug) || slugs.has(content.slug)) throw new Error('Rota inválida ou duplicada');
  slugs.add(content.slug);
  if (!content.questions?.length || new Set(content.questions.map(q => q.name)).size !== content.questions.length) throw new Error('Perguntas ausentes ou duplicadas');
  if (content.privacyUrl && !/^\/(?!\/)|^https:\/\//.test(content.privacyUrl)) throw new Error('URL de privacidade inválida');
  const values = Object.fromEntries(Object.entries(content).filter(([,v]) => typeof v === 'string').map(([k,v]) => [k, escape(v)]));
  // Só o HTML final deve ser registrado; parciais publicados não são formulários.
  values.netlifyAttributes = 'data-netlify="true" data-netlify-honeypot="bot-field"';
  values.stepCount = String(content.questions.length + 1);
  values.questions = content.questions.map(questionMarkup).join('\n');
  values.privacyReference = content.privacyUrl
    ? `Consulte a <a href="${escape(content.privacyUrl)}">Política de Privacidade</a>.`
    : 'A Política de Privacidade ainda não foi disponibilizada.';
  const html = '<!-- Gerado por scripts/build-landings.mjs. Edite templates e conteúdo, não este arquivo. -->\n' + render(template, {
    ...values,
    ...Object.fromEntries(names.filter(name => name !== 'lead-form').map(name => [name, render(partials[name], values)])),
    form: render(partials['lead-form'], values)
  });
  const output = resolve(root, content.slug);
  await mkdir(output, { recursive: true });
  await writeFile(resolve(output, 'index.html'), html);
  console.log(`Gerado: /${content.slug}/index.html`);
}
