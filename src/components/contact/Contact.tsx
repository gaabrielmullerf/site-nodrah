import { motion } from "motion/react";
export function Contact() {
 return (<motion.section initial={false} whileInView={{ opacity: [0.85, 1] }} transition={{ duration: 0.45 }} viewport={{ once: true, amount: 0.1 }} id="contato" aria-labelledby="contato-title">
<span className="section-label">{"SEU PRÓXIMO PASSO"}</span>
<h2 id="contato-title">{"Vamos dar forma ao seu próximo projeto."}</h2>
<p className="contact-description">{"Conte o que você precisa construir ou melhorar. Vamos conversar sobre uma solução para o seu negócio."}</p>
<form id="project-form" className="project-form" name="projeto-nodrah" method="POST" action="/" data-netlify="true" data-netlify-honeypot="bot-field" autoComplete="off" aria-describedby="project-form-note">
<input type="hidden" name="form-name" defaultValue="projeto-nodrah" />

<p hidden={true}>
<label>{"Não preencha este campo: "}<input type="text" name="bot-field" tabIndex={-1} autoComplete="off" /></label>
</p>
<p className="form-instructions">{"Campos com * são obrigatórios."}</p>
<div className="project-field">
<label htmlFor="project-name">{"Nome "}<span aria-hidden="true">{"*"}</span></label>
<input id="project-name" name="nome" type="text" required={true} maxLength={120} autoComplete="off" aria-describedby="project-name-error" />
<p className="field-error" id="project-name-error" aria-live="polite"></p>
</div>
<div className="project-field">
<label htmlFor="project-email">{"E-mail "}<span aria-hidden="true">{"*"}</span></label>
<input id="project-email" name="email" type="email" required={true} maxLength={254} autoComplete="off" aria-describedby="project-email-error" />
<p className="field-error" id="project-email-error" aria-live="polite"></p>
</div>
<div className="project-field">
<label htmlFor="project-company">{"Empresa "}<span className="field-optional">{"(opcional)"}</span></label>
<input id="project-company" name="empresa" type="text" maxLength={160} autoComplete="off" />
</div>
<div className="project-field">
<label htmlFor="project-type">{"Tipo de projeto "}<span aria-hidden="true">{"*"}</span></label>
<select id="project-type" name="tipo-projeto" required={true} aria-describedby="project-type-error">
<option value="">{"Selecione uma opção"}</option>
<option>{"Site institucional"}</option>
<option>{"Landing page"}</option>
<option>{"Automação"}</option>
<option>{"Manutenção e evolução"}</option>
<option>{"Outro"}</option>
</select>
<p className="field-error" id="project-type-error" aria-live="polite"></p>
</div>
<div className="project-field field-full">
<label htmlFor="project-budget">{"Faixa de investimento "}<span className="field-optional">{"(opcional)"}</span></label>
<input id="project-budget" name="investimento" type="text" maxLength={160} placeholder="Informe um valor aproximado, se já tiver" autoComplete="off" />
</div>
<div className="project-field field-full">
<label htmlFor="project-description">{"Descrição do projeto "}<span aria-hidden="true">{"*"}</span></label>
<textarea id="project-description" name="descricao" rows={5} required={true} maxLength={5000} autoComplete="off" aria-describedby="project-description-error"></textarea>
<p className="field-error" id="project-description-error" aria-live="polite"></p>
</div>
<p className="form-instructions field-full">{"Ao enviar, suas informações serão usadas pela Nodrah para avaliar a solicitação e responder ao seu contato. Consulte a "}<a href="/privacidade/" target="_blank" rel="noopener" aria-label="Política de Privacidade (abre em nova aba)">{"Política de Privacidade"}</a>{"."}</p>
<div className="project-submit field-full">
<button className="contact-primary" type="submit" aria-describedby="project-form-note">{"Enviar projeto "}<span aria-hidden="true"><svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-arrow-up-right"></use></svg></span></button>
<p id="project-form-note" role="status" aria-live="polite" aria-atomic="true"></p>
</div>
</form>
<div className="contact-alternative">
<a className="contact-email" id="contact-email" href="mailto:contato@nodrah.com.br?subject=Projeto%20com%20a%20Nodrah">{"contato@nodrah.com.br"}</a>
<div className="contact-actions">
<button className="contact-copy" id="copy-email" type="button" hidden={true}>{"Copiar e-mail"}</button>
</div>
<p className="copy-status" id="copy-status" role="status" aria-live="polite" aria-atomic="true"></p>
<div className="copy-fallback" id="copy-fallback" hidden={true}>
<label htmlFor="manual-email">{"Selecione o endereço e use a opção de copiar do seu dispositivo:"}</label>
<input id="manual-email" type="text" defaultValue="contato@nodrah.com.br" readOnly={true} autoComplete="off" spellCheck="false" />
</div>
</div>
</motion.section>);
}
