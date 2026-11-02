# Nosso Processo — fileira interativa

A apresentação inicial usava a montagem nativa do DepthCarousel fornecido pelo responsável. Após revisão visual, o responsável solicitou as seis etapas simultaneamente em fileira, com sobreposição e destaque por hover no desktop, e rolagem por toque no mobile. Essa versão substitui a navegação anterior por setas; o código React Bits integral permanece preservado em `scripts/reference/DepthCarousel.jsx` e `DepthCarousel.css`.

- Desktop: as seis posições são distribuídas pela largura disponível. A primeira etapa começa na frente; hover, clique ou foco por teclado trazem outro cartão para cima. GSAP 3.15.0 anima a profundidade, a inclinação, a escala e o escurecimento. O z-index por distância ao cartão ativo mantém uma região de cada etapa alcançável pelo mouse.
- Mobile/tablet e ponteiros de toque: fileira com rolagem horizontal nativa, scroll snap e cartões legíveis sem escala reduzida. A rolagem vertical da página não é interceptada.
- Setas do teclado, Home, End e Tab permitem navegar pelas etapas sem depender do mouse. Todas permanecem disponíveis para tecnologias assistivas, sem aria-hidden nos cartões.
- Sem autoplay, botões de seta ou indicadores. A preferência por movimento reduzido desativa os tweens. Sem JavaScript, a fileira continua acessível por rolagem nativa.
- Número, título e descrição das seis etapas são mantidos no HTML. Nenhuma outra seção é alterada.

## Build

```sh
npm ci
npm run build:process
```

O HTML carrega `process-carousel.bundle.js` localmente. O bundle deve acompanhar a alteração no repositório, sem CDN nem novo comando de produção no Netlify.
