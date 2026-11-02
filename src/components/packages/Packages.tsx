import { motion } from "motion/react";
export function Packages() {
 return (<motion.section initial={false} whileInView={{ opacity: [0.85, 1] }} transition={{ duration: 0.45 }} viewport={{ once: true, amount: 0.1 }} id="pacotes" className="packages-section" aria-labelledby="pacotes-title">
<div className="bespoke-panel">
<div className="bespoke-surface">
<h2 id="pacotes-title">{"Seu projeto não precisa caber em um pacote."}</h2>
<div className="bespoke-copy">
<p>{"Na Nodrah, cada solução começa com uma análise do negócio, dos seus objetivos e dos desafios que precisam ser resolvidos. Não trabalhamos com estruturas prontas nas quais o cliente precisa se adaptar. Definimos o escopo, as funcionalidades e a arquitetura do projeto de acordo com o que realmente faz sentido para cada operação."}</p>
<p>{"Desenvolvemos sites, sistemas, aplicativos, plataformas digitais e soluções inteligentes com uma abordagem personalizada. Isso significa pensar além da aparência: consideramos a experiência do usuário, a organização das informações, a integração entre ferramentas, a segurança, o desempenho e a possibilidade de evolução da solução."}</p>
<p>{"Do planejamento à entrega, cada etapa é construída com critério técnico e atenção aos detalhes. Utilizamos tecnologias adequadas a cada cenário, evitando complexidade desnecessária e priorizando soluções que sejam eficientes, fáceis de utilizar e sustentáveis ao longo do tempo."}</p>
<p className="bespoke-statement">{"A proposta é simples: entender o que seu negócio precisa e desenvolver a tecnologia certa para isso."}</p>
</div>
</div>
</div>
</motion.section>);
}
