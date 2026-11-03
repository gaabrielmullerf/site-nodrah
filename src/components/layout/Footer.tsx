export function Footer() {
 return (<footer className="site-footer">
<div className="footer-top">
<div className="footer-identity">
<a className="brand" href="#inicio" aria-label="Nodrah — início"><span className="brand-wordmark">NODRAH</span></a>
</div>
<nav className="footer-nav" aria-label="Navegação do rodapé">
<a href="#solucoes">{"Soluções"}</a>
<a href="#processo">{"Processo"}</a>
<a href="#portfolio">{"Projetos"}</a>
<a href="#contato">{"Contato"}</a>
<a href="https://www.instagram.com/nodrah.co/" target="_blank" rel="noopener noreferrer">{"Instagram"}</a>
</nav>
</div>
<div className="footer-bottom">
<a href="mailto:contato@nodrah.com.br">{"contato@nodrah.com.br"}</a>
<span className="footer-cnpj">{"CNPJ: 69.128.782/0001-45"}</span>
<span>{"© 2026 Nodrah."}</span>
</div>
</footer>);
}
