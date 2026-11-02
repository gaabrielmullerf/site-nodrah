import { motion } from "motion/react";
export function Solutions() {
 return (<motion.section initial={false} whileInView={{ opacity: [0.85, 1] }} transition={{ duration: 0.45 }} viewport={{ once: true, amount: 0.1 }} id="solucoes" className="service-catalog" aria-labelledby="solucoes-title">
<span className="section-label">{"Sobre NODRAH"}</span>
<div className="catalog-intro">
<h2 id="solucoes-title">{"Nossas "}<span className="solutions-accent">{"soluções."}</span></h2>
</div>
<div className="service-grid">
<article className="service-card">
<div className="service-card-surface">
<div className="service-card-heading">
<span className="service-number" aria-hidden="true">{"01"}</span>
<h3 id="service-1-title">{"Sites"}</h3>
</div>
<div className="service-details">
<p>{"Sites institucionais, páginas de campanha e portais digitais. Desenvolvidos para representar sua marca, oferecer uma navegação fluida e facilitar a gestão de conteúdo."}</p>
<ul className="service-tags" aria-label="Áreas de atuação em Sites"><li>{"Institucionais"}</li><li>{"Landing Pages"}</li><li>{"Portais"}</li><li>{"SEO"}</li></ul>
</div>
</div>
</article>
<article className="service-card">
<div className="service-card-surface">
<div className="service-card-heading">
<span className="service-number" aria-hidden="true">{"02"}</span>
<h3 id="service-2-title">{"Sistemas"}</h3>
</div>
<div className="service-details">
<p>{"Plataformas, painéis de gestão e sistemas sob medida para organizar processos, centralizar informações e conectar as ferramentas que sua empresa já utiliza."}</p>
<ul className="service-tags" aria-label="Áreas de atuação em Sistemas"><li>{"Plataformas"}</li><li>{"Gestão"}</li><li>{"APIs"}</li><li>{"Integrações"}</li></ul>
</div>
</div>
</article>
<article className="service-card">
<div className="service-card-surface">
<div className="service-card-heading">
<span className="service-number" aria-hidden="true">{"03"}</span>
<h3 id="service-3-title">{"Aplicativos"}</h3>
</div>
<div className="service-details">
<p>{"Aplicativos para iOS e Android, desenvolvidos para conectar pessoas, serviços e negócios. Da experiência do usuário à integração com sistemas e plataformas."}</p>
<ul className="service-tags" aria-label="Áreas de atuação em Aplicativos"><li>{"iOS"}</li><li>{"Android"}</li><li>{"Integrações"}</li><li>{"Experiência"}</li></ul>
</div>
</div>
</article>
<article className="service-card">
<div className="service-card-surface">
<div className="service-card-heading">
<span className="service-number" aria-hidden="true">{"04"}</span>
<h3 id="service-4-title">{"Lojas virtuais"}</h3>
</div>
<div className="service-details">
<p>{"Soluções de comércio digital com catálogos, pagamentos, gestão de pedidos e integração com estoque e logística."}</p>
<ul className="service-tags" aria-label="Áreas de atuação em Lojas virtuais"><li>{"E-commerce"}</li><li>{"Pagamentos"}</li><li>{"Estoque"}</li><li>{"Logística"}</li></ul>
</div>
</div>
</article>
<article className="service-card">
<div className="service-card-surface">
<div className="service-card-heading">
<span className="service-number" aria-hidden="true">{"05"}</span>
<h3 id="service-5-title">{"Inteligência Artificial"}</h3>
</div>
<div className="service-details">
<p>{"Agentes inteligentes, assistentes virtuais, automação de processos e soluções orientadas por dados, integradas às necessidades e operações do negócio."}</p>
<ul className="service-tags" aria-label="Áreas de atuação em Inteligência Artificial"><li>{"Agentes de IA"}</li><li>{"Automação"}</li><li>{"Dados"}</li><li>{"Integrações"}</li></ul>
</div>
</div>
</article>
</div>
</motion.section>);
}
