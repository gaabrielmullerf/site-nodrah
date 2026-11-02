import { motion } from "motion/react";
export function FAQ() {
 return (<motion.section initial={false} whileInView={{ opacity: [0.85, 1] }} transition={{ duration: 0.45 }} viewport={{ once: true, amount: 0.1 }} id="perguntas" aria-labelledby="perguntas-title">
<div className="faq-panel"><div className="faq-surface">
<span className="section-label">{"PERGUNTAS FREQUENTES"}</span>
<h2 id="perguntas-title">{"Antes do próximo passo"}<span className="accent">{"."}</span></h2>
<div className="faq-list">
<details>
<summary>{"Quanto custa um projeto? "}<svg className="ui-icon faq-plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-plus"></use></svg><svg className="ui-icon faq-minus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-minus"></use></svg></summary>
<p>{"O investimento depende do tipo de solução, das funcionalidades e do conteúdo. Após entender sua necessidade, apresentamos uma proposta com escopo e valores."}</p>
</details>
<details>
<summary>{"Quanto tempo leva? "}<svg className="ui-icon faq-plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-plus"></use></svg><svg className="ui-icon faq-minus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-minus"></use></svg></summary>
<p>{"O cronograma é definido na proposta, considerando a complexidade, o envio dos materiais e as etapas de revisão."}</p>
</details>
<details>
<summary>{"Preciso ter textos e imagens prontos? "}<svg className="ui-icon faq-plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-plus"></use></svg><svg className="ui-icon faq-minus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-minus"></use></svg></summary>
<p>{"Podemos avaliar os materiais existentes e combinar na proposta o que será fornecido por você e o que precisará ser produzido."}</p>
</details>
<details>
<summary>{"O site funciona no celular? "}<svg className="ui-icon faq-plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-plus"></use></svg><svg className="ui-icon faq-minus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-minus"></use></svg></summary>
<p>{"Os projetos são desenvolvidos para se adaptar a diferentes tamanhos de tela, com revisão da navegação e da leitura."}</p>
</details>
<details>
<summary>{"Vocês oferecem manutenção? "}<svg className="ui-icon faq-plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-plus"></use></svg><svg className="ui-icon faq-minus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-minus"></use></svg></summary>
<p>{"Sim. Oferecemos planos mensais com atividades, condições e canais de atendimento definidos no contrato."}</p>
</details>
<details>
<summary>{"Domínio e hospedagem estão incluídos? "}<svg className="ui-icon faq-plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-plus"></use></svg><svg className="ui-icon faq-minus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-minus"></use></svg></summary>
<p>{"A contratação e os custos de domínio, hospedagem e serviços de terceiros são definidos separadamente na proposta."}</p>
</details>
</div>
</div></div>
</motion.section>);
}
