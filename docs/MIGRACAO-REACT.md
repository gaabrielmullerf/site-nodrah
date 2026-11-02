# Modernização local da NODRAH

## Estado da entrega

Institucional migrado para React 19, TypeScript strict e Vite, com HTML pré-renderizado. Layout, fontes, estilos e conteúdo comercial preservados. O título e os dois CTAs do hero seguem o texto solicitado. Nenhum deploy ou push foi realizado.

A abertura foi removida a pedido do usuário. A entrada usa agora uma abertura de marca com preenchimento das letras e porcentagem. O material original fornecido pelo usuário foi preservado, sem vínculo com a aplicação.

## Auditoria e estratégia

O projeto inicial tinha uma página institucional HTML/CSS/JS, navegação por âncoras, cinco serviços, apresentação de projetos personalizados, carrossel de seis etapas GSAP, faixa de tecnologias, portfólio, FAQ, formulário Netlify Forms, cópia de e-mail, navegação mobile e fundo OGL/WebGL2. Dependências existentes: GSAP 3.15.0, OGL 1.0.11 e esbuild 0.28.2. Foram preservadas.

Havia numerosas alterações locais antes desta tarefa. O ponto de restauração `refs/nodrah/pre-react` aponta para `b8d7900ff1b0a3f31944484b924c494d81ac0922`, criado com `git stash create` e sem retirar alterações da árvore de trabalho. Ele preserva os arquivos rastreados. Uma cópia integral, incluindo arquivos não rastreados, está em `/tmp/nodrah-before-react.tar.gz`; o diff original está em `/tmp/nodrah-before-react.patch`. Arquivos em `/tmp` são temporários e podem ser movidos para um local permanente pelo proprietário.

Riscos tratados: perda de conteúdo sem JavaScript, alteração das rotas independentes, perda da detecção do formulário Netlify, duplicação de efeitos no StrictMode, vazamentos de listeners/observadores e bloqueio do visitante pela intro. A migração foi dividida em componentes sem alterar o CSS aprovado.

## Arquitetura

- `src/app/App.tsx`: composição das seções e política de movimento reduzido.
- `src/components/layout/`: Header, Navigation, Footer e símbolos SVG.
- `src/components/hero/`: Hero e HeroParticles.
- `src/components/solutions/`, `packages/`, `contact/`, `sections/`: conteúdo existente em JSX.
- `src/lib/useSiteEffects.ts`: ciclo de vida e carregamento sob demanda do carrossel.
- `src/lib/legacyInteractions.js`: ponte incremental para as interações existentes; centraliza limpeza de eventos, observadores, temporizadores, RAFs, animações e cancelamento de envio. É JavaScript preservado, excluído da checagem de tipos; os novos módulos TypeScript usam strict. Uma próxima etapa pode migrar essa ponte por funcionalidade, sem reescrever tudo ao mesmo tempo.
- `src/styles/hero-actions.css`: estilos isolados dos CTAs. Os estilos existentes continuam em seus arquivos originais.

O WebGL é importado quando se aproxima da área visível. Seu código original já possui ResizeObserver, IntersectionObserver e pausa com a aba oculta; o adaptador React acrescenta controle de montagem/desmontagem, prevenção de instâncias duplicadas, tratamento de perda de contexto e fallback preto. Movimento reduzido evita a inicialização da GPU. O carrossel GSAP também é importado sob demanda e libera seus recursos.

Motion trata revelações discretas e microinterações. O conteúdo pré-renderizado permanece visível por padrão.

## SEO, rotas e build

`npm run build` executa Vite, renderiza a mesma árvore React com `renderToString` e injeta o HTML em `dist/index.html`. O cliente usa `hydrateRoot`; o desenvolvimento usa `createRoot` quando não há HTML pré-renderizado. Isso mantém texto, links, headings e formulário no HTML recebido pelo crawler, sem depender de uma SPA vazia.

Metadados, canonical, Open Graph, Twitter, favicon, sitemap e robots foram preservados. `/nutricionistas/`, `/privacidade/`, `/projetos/veiculos/` e `/projetos/energia-solar/` são copiados como documentos estáticos, com seus assets, sem refatoração ou rewrite global de SPA. O formulário institucional permanece no HTML final com os atributos e campos de detecção Netlify.

`netlify.toml` agora declara `npm run build` e `dist` para futuros builds, incluindo Deploy Previews, com Node 24. **Isto altera a configuração de uma publicação futura; não realizou publicação.** Os scripts antigos de geração de landings e bundles permanecem disponíveis.

Referências técnicas consultadas: [React renderToString](https://react.dev/reference/react-dom/server/renderToString), [build Vite](https://vite.dev/guide/build), [movimento reduzido no Motion](https://motion.dev/docs/react-use-reduced-motion).

## Execução local

Requer Node >=22.12; Node 24 recomendado. Nesta sessão o Node foi baixado para `/tmp/node-v24.11.0-darwin-arm64`, sem instalar globalmente.

```sh
npm ci
npm run dev
npm run check
npx playwright install chromium
npm run test:e2e
```

## Dependências adicionadas

Runtime: React 19, React DOM 19 e Motion. OGL e GSAP existentes foram mantidos.

Desenvolvimento: TypeScript, Vite, plugin React do Vite, tipos React/React DOM/Node, ESLint, configuração JS do ESLint, typescript-eslint, plugin de hooks React e Playwright. Versões exatas resolvidas estão em `package-lock.json`.

## Validação e limites

TypeScript strict, ESLint e build de produção passam. A suíte Playwright cobre hidratação, canvas único, navegação mobile, teclado no carrossel, validação do select obrigatório, envio simulado de formulário, rotas, preservação byte a byte de documentos independentes, conteúdo sem JavaScript e movimento reduzido.

Console sem erros relevantes nos testes do institucional. O formulário foi testado com resposta simulada: recebimento real no Netlify não foi exercitado. Nenhuma mensagem ou lead real foi enviado.

O bundle inicial medido tem aproximadamente 407 kB minificados / 127 kB gzip; WebGL e carrossel são chunks separados de aproximadamente 72 kB cada. CSS aproximadamente 39 kB / 9 kB gzip. Os valores não são uma medição de Core Web Vitals. LCP, CLS e INP em campo ainda exigem ambiente hospedado e dispositivos reais; não foi prometida pontuação Lighthouse. Validação foi feita em Chromium, com viewport mobile emulado; Safari/iOS e dispositivos reais permanecem pendentes.

A consulta npm audit identificou 11 alertas moderados na cadeia de ferramentas de desenvolvimento (minimatch/ESLint/typescript-eslint), sem alertas de runtime. Não foi aplicado `audit fix --force`, pois a sugestão envolvia downgrades incompatíveis. Monitorar correções compatíveis antes de publicar.

Os recursos possuem cleanup e o StrictMode exercita remontagens em desenvolvimento. Isso não substitui um perfil prolongado de memória/GPU em dispositivos reais.

## Arquivos

Preexistentes modificados nesta tarefa: `index.html`, `package.json`, `package-lock.json`, `netlify.toml`, `.gitignore`.

Novos: `src/**`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `playwright.config.ts`, `tests/site.spec.ts`, `scripts/build-site.mjs`, este relatório.

`style.css`, `script.js`, `intro.js`, as páginas independentes e os demais assets preexistentes não foram alterados por esta tarefa. Diferenças desses arquivos contra HEAD já existiam antes do início e foram preservadas.

## Abertura atual da marca

`src/components/loading/BrandLoader.tsx` e `src/styles/brand-loader.css` mostram NODRAH em contorno, com preenchimento violeta de baixo para cima dentro das letras e porcentagem abaixo. Quatro marcos acompanham as fontes Montserrat e Sora, o módulo visual do hero e o evento de carregamento da página. O número suaviza a apresentação desses marcos; não representa bytes transferidos pela rede. Recursos indisponíveis são tratados como concluídos com fallback.

Ao alcançar 100%, a abertura se dissolve e revela o hero. Há limite de 4,5 s para falhas ou recursos lentos, opção de pular, saída por teclado, respeito a movimento reduzido e limpeza dos listeners/timers/RAF. Entradas por âncora ou rolagem restaurada pulam a abertura. A camada é ocultada por padrão no HTML sem JavaScript, preservando acesso ao conteúdo e SEO. Não há vídeo ou dependência do material removido.

## Portfólio publicado

A seção de portfólio agora apresenta os quatro projetos indicados pelo usuário: Sphere Yachts, BYD Seal, Maryane Cavalcanti e Thays Assis. Prévias locais em `assets/portfolio/` foram capturadas dos sites reais. Os projetos conceito deixaram de aparecer na seção; seus arquivos e URLs antigos foram preservados.

O portfólio usa agora uma grade 2×2 no desktop e uma coluna no celular. Os cards têm acabamento de vidro neutro, moldura de navegador e destaque sutil com elevação e inclinação 3D ao passar o mouse. Os links continuam abrindo os projetos publicados em nova aba.

As prévias são gravações locais dos próprios sites em loop (8 segundos, 960×720, H.264, 24 fps, sem áudio). Sphere e Maryane preservam seus vídeos de fundo; BYD inclui a sequência de vídeo acionada pela rolagem; Thays mostra a página e seus elementos animados. São prévias gravadas, não incorporações navegáveis de quatro sites completos. Não foi usado o vídeo floral do exemplo Bloom, nem houve mudança de fontes ou da identidade global da NODRAH.

Os vídeos recebem uma fonte somente quando entram na área visível e pausam fora dela ou com a aba oculta. Movimento reduzido e economia de dados mantêm as imagens estáticas. Há fallback para falha de reprodução. Nenhuma dependência adicional foi instalada. A suíte de 7 testes verifica os links, o layout 2×2, o mobile sem overflow, o destaque do card, o avanço do vídeo e a pausa fora da tela, além das verificações já existentes do institucional.

## Header transparente e contraste local

O header não tem mais película escura fixa. `useHeaderContrast` avalia o fundo atrás de cada item individualmente, nas posições reais do texto, e aplica a cor alternativa apenas quando a original perde contraste. O portfólio claro e o painel cinza dos pacotes declaram sua cor de superfície; vídeos e imagens locais nas prévias também podem ser amostrados. A cor original retorna ao sair da sobreposição. A marca mantém o violeta quando há contraste suficiente e usa violeta mais escuro se necessário.

A leitura acompanha rolagem, resize, abertura do menu e fontes. Vídeos em movimento atrás do header são reavaliados a cada 200 ms; recursos ilegíveis usam a superfície da seção como fallback. Os eventos, observadores, RAF e temporizador são liberados ao desmontar. O menu mobile usa vidro transparente com desfoque discreto, sem painel de cor fixa. O teste de produção verifica a troca apenas no cruzamento efetivo e o retorno após sair, incluindo pacotes e mobile.
