# Progresso do site Nodrah

Atualizado em 17/10/2026. Projeto em HTML, CSS e JavaScript, sem framework. Repositório privado no GitHub; conexão com o Netlify e deploy automático por origin/master informados pelo responsável pelo site.

## Pronto

- Identidade grafite/violeta, fontes Manrope e Inter, cabeçalho e apresentação com peça de profundidade em CSS.
- Logo definitiva aplicada no cabeçalho e rodapé com o arquivo assets-logo/nodrah-logo.png, preservando desenho, cores, transparência e proporção original (1315 × 440). Substituiu integralmente a marca provisória; os links levam a #inicio e a imagem usa alt="Nodrah".
- Favicon configurado no site principal: assets-logo/favicon.ico com 16, 32 e 48 px, favicon-32x32.png e apple-touch-icon.png de 180 × 180 px. Símbolo extraído da logo original sobre fundo grafite; identidades das demonstrações preservadas.
- Título da aba principal atualizado para “N O D R A H”.
- Imagem de compartilhamento preparada em assets-logo/nodrah-social.png (1200 × 630), com a logo oficial, textos renderizados e identidade grafite/violeta. Description, canonical, Open Graph e Twitter Card configurados no site principal; a prévia real nas redes ainda depende da publicação autorizada.
- Símbolo oficial animado na apresentação, extraído em 391 × 378 px para assets-logo/nodrah-symbol.png. Flutuação discreta e inclinação por mouse em elementos separados, com pausa fora da tela ou na aba oculta e respeito ao movimento reduzido. Composição estática sem JavaScript.
- Entradas suaves nas seções de soluções, tecnologias, processo, portfólio, FAQ e contato: 20 px, 600 ms e atrasos sequenciais limitados a 200 ms, apenas na primeira entrada. Cabeçalho, apresentação e animação do símbolo permanecem independentes. Âncoras, foco e seleção de abas revelam o conteúdo imediatamente; sem JavaScript, sem IntersectionObserver ou com movimento reduzido, o conteúdo fica visível.
- Cores de assinatura centralizadas: violeta elétrico #8B5CF6 e versão clara #C4B5FD.
- Quatro soluções por abas: sites institucionais, landing pages, automações e manutenção e evolução. Demonstrações identificadas como ilustrativas.
- Seção de tecnologias com três grupos, 14 opções, exemplos de código e visuais demonstrativos, sem execução de servidor ou banco de dados.
- Processo em quatro etapas, numeração única e layouts de quatro, duas ou uma coluna.
- Portfólio com dois projetos conceituais e capturas reais estáticas das demonstrações locais.
- Energia solar: identidade grafite/violeta, fotografia real local de painéis em telhado (Kindel Media / Pexels, fonte e licença em projetos/energia-solar/CREDITOS.md), prévia regenerada, soluções, benefícios, FAQ e simulador percentual com premissas e limites explícitos.
- Vértice Motors: marca fictícia, seis anúncios demonstrativos, busca, filtros combinados, ordenação, detalhes, galeria e resumo local de interesse. Fotografias licenciadas, locais e creditadas; as galerias usam foto completa e recortes identificados.
- Demonstração antiga de eventos removida após verificar que seus arquivos não eram compartilhados.
- Perguntas frequentes com interação nativa por details/summary, indicadores +/−, foco violeta e espaçamento responsivo.
- Contato com nome, e-mail, empresa, tipo de projeto, faixa de investimento e descrição. Labels, opções e obrigatoriedade preservados. Integração com Netlify Forms implementada, com validação local, honeypot, envio por fetch e alternativa HTML nativa; recebimento real ainda pendente.
- Alternativa de contato por mailto e cópia de e-mail com confirmação após sucesso ou seleção manual em caso de falha.
- Rodapé com navegação, e-mail, CNPJ fornecido e copyright de 2026.
- Link Instagram no rodapé principal: https://www.instagram.com/nodrah.co/, aberto em nova aba com rel="noopener noreferrer".

- Prévia de landing page com composição própria centrada na oferta e no CTA, usando grafite e violeta, sem os tons verdes anteriores.
- Prévia institucional com captura real da primeira dobra atual da Nodrah em assets-preview/nodrah-desktop.png (2560 × 1560), incluindo cabeçalho, apresentação, CTA e quadro do símbolo animado. Imagem local, proporção preservada e sem iframe.
- Organização didática concluída nos nove arquivos HTML, CSS e JavaScript próprios do site principal e das duas demonstrações. Seções identificadas por comentários, indentação de quatro espaços e CSS com uma declaração por linha. Estrutura, textos, atributos, regras, valores e lógica preservados.
- Ordem original de regras CSS, duplicações, @media, @keyframes e complementos mantida para preservar a cascata. Ordem de inicialização dos scripts, escopos e eventos mantida. Exemplos em pre e marcação da fotografia solar preservados onde a formatação poderia afetar a exibição.

## Verificações realizadas

- Chrome headless: layouts em 1440, 1024, 768, 390 e 320 px e ausência de rolagem horizontal nas verificações realizadas.
- Todos os testes de celular foram emulados no navegador; não foram realizados em aparelhos físicos. A revisão em aparelho físico continua pendente.
- Ícones: inspeção visual em 16, 32 e 180 px, validação das três resoluções internas do ICO e carregamento dos arquivos e referências no Chrome.
- Símbolo: movimento observado por amostras de aproximadamente 73 quadros em 1440, 1024, 390 e 320 px; mouse e retorno no desktop, ausência de inclinação na emulação de toque, pausa fora da tela e modo estático com movimento reduzido. A pausa por aba oculta foi testada com evento de visibilidade simulado. O carregamento sem JavaScript também foi verificado.
- Entradas: rolagem nativa por eventos de roda em 1440, 390 e 320 px, com opacidades intermediárias observadas; duração e limites dos atrasos, primeira entrada, âncoras, Tab, foco e abas verificados. Conteúdo visível com JavaScript desativado, IntersectionObserver indisponível e movimento reduzido.
- Logo: carregamento, proporção e tamanhos computados conferidos em 1440, 390 e 320 px, com capturas visuais e sem rolagem horizontal. Cabeçalho com 160 px no desktop e 135 px no celular; rodapé com 180 px. Os links contêineres têm as mesmas larguras. A URL do CSS foi versionada para evitar cache antigo; a aba de prévia do usuário não foi inspecionada diretamente.
- Navegação local entre Nodrah e demonstrações, carregamento das fotos e prévias.
- Revisão dos links e referências: âncoras e caminhos locais sem destinos ausentes nas três páginas; CSS, scripts e imagens carregados no Chrome. Links dos dois cartões e retornos das demonstrações acionados no navegador. Instagram conferido quanto ao endereço e atributos, sem validar a disponibilidade do perfil. Formulário principal confirmado desabilitado.
- Abas, filtros, busca, ordenação, galerias, simulador solar, FAQ e resumos locais.
- Teclas reais em testes específicos de FAQ, contato e formulário; foco visível e movimento reduzido nos componentes verificados.
- Contraste calculado em aplicações de texto e controles, em etapas anteriores. Esses checks não substituem uma auditoria completa de acessibilidade.
- Na verificação anterior à integração: obrigatoriedade, formato de e-mail, correção de erros e bloqueio de envio mesmo com dados válidos. A implementação atual do Netlify Forms e seus testes estão registrados abaixo.
- Cópia de e-mail: cenários controlados de operação pendente, sucesso, falha e API indisponível. A área de transferência do visitante não foi validada em todos os navegadores.
- Nenhum teste em aparelho físico e nenhuma medição completa de desempenho foi realizada.

### Revisão de desempenho por HTTP local — 13/10/2026

- Lighthouse não estava disponível: comandos lighthouse, node e npm não encontrados. Não houve instalação de dependências. As notas de desempenho, acessibilidade, boas práticas e SEO não foram medidas e não devem ser inferidas dos testes alternativos.
- Servidor HTTP apenas em localhost; Chrome headless com emulação mobile de 390 × 844, escala 1 e coleta por PerformanceObserver/CDP. Sem simulação de rede lenta ou redução de CPU. Uma execução inicial por página; os tempos dependem do ambiente e do cache de fontes/conexões e não representam Lighthouse mobile nem uma melhoria percentual de velocidade.

| Página / execução | FCP observado | LCP observado | CLS observado |
| --- | --- | --- | --- |
| Nodrah, inicial | 1416 ms | 1416 ms | 0 |
| Energia solar, inicial | 336 ms | 336 ms | 0 |
| Veículos, inicial | 448 ms | 448 ms | 0 |
| Veículos, após correções | 204 ms | 204 ms | 0 |

- Rolagem pelas três páginas: largura real e scrollWidth de 390 px, sem rolagem horizontal; CSS, scripts, imagens e fontes carregados. Nenhum erro de JavaScript ou carregamento de imagens capturado. A imagem do diálogo de veículos agora fica intencionalmente adiada enquanto ele está fechado.
- Identificadas fotos pesadas: Porsche 495.939 bytes, BMW M4 1.025.784 bytes e BMW 320i 865.413 bytes. Criadas variantes de 800 px com 133.339, 322.163 e 237.761 bytes, respectivamente, mantendo enquadramento e proporção e inspecionando-as visualmente. Originais preservados para a galeria e telas maiores; srcset/sizes selecionaram as variantes na emulação. O conjunto dessas três variantes reduz os bytes de 2.387.136 para 693.263 (aproximadamente 71%); a transferência das seis fotos durante a rolagem, antes de abrir galerias, passou de 2.816.706 para 1.122.833 bytes de conteúdo.
- Corrigidas dimensões declaradas das fotos no HTML e atualizadas as dimensões ao trocar o veículo no diálogo. Nenhuma imagem de conteúdo sem width/height foi encontrada. Repetidas as verificações afetadas: carregamento responsivo, CLS, largura da página e abertura das seis galerias; todas carregaram os arquivos originais e apresentaram dimensões declaradas correspondentes aos arquivos.
- Imagens principais permanecem sem lazy loading. Catálogo e prévias já usavam loading="lazy"; acrescentado ao diálogo fechado. Logos, símbolo oficial e prévias PNG do portfólio não foram recomprimidos nem redimensionados.
- Símbolo observado em execução: transform mudou enquanto visível e animation-play-state ficou paused fora da tela. Com movimento reduzido emulado, animation-name ficou none e o transform permaneceu estático; nenhum bloco ficou oculto por reveal-pending. Nas três páginas, as transições dos botões ficaram em 0s com essa preferência. As demonstrações não têm animação contínua. Não foi repetido nesta revisão o teste de aba oculta.
- Checagens básicas nas três páginas: lang pt-BR, um h1, título e meta description presentes; nenhuma imagem sem atributo alt e nenhum campo sem label/nome acessível encontrado. Formulário principal confirmado desabilitado. Essas checagens não equivalem a auditoria de acessibilidade, boas práticas ou SEO.
- CSS principal (45.964 bytes) e folhas CSS das demonstrações continuam bloqueando a renderização por serem estilos essenciais. A folha externa do Google Fonts também é bloqueante; preconnect e display=swap estão presentes, e os scripts locais usam defer. A dependência de fontes externas e o comportamento em rede lenta ainda precisam de medição; não houve alteração na tipografia aprovada.
- Não medidos: notas Lighthouse, INP/TBT, desempenho em aparelho físico/rede móvel, comportamento sob carga e HTTPS/cache/compressão da hospedagem definitiva. Um CLS zero nesta execução não garante ausência de deslocamentos em todas as condições.

### Comparação da organização — 17/10/2026

- Comparação com cópia do estado local imediatamente anterior à organização, preservando as alterações já existentes; nenhuma comparação se limitou ao último commit antigo.
- Chrome em 1280 e 390 px: 30 comparações de estrutura HTML, regras CSS interpretadas pelo navegador (CSSOM), estilos calculados e dimensões, resultados das interações e capturas. As seis capturas das três páginas ficaram idênticas às anteriores.
- Abas de soluções e tecnologias, seleção de etapas, animação do símbolo, validação e bloqueio do formulário, FAQ, simulador solar, filtros e ordenação de veículos, diálogo, galeria e resumo local de interesse conferidos antes e depois.
- Confirmado por comparação de código que CSS e JavaScript mudaram apenas em espaços, indentação e comentários; nenhuma regra nem bloco de execução foi movido. git diff --check concluído sem erros de espaços.
- Nenhuma dependência instalada. Arquivos temporários de verificação removidos do projeto. Capturas e fotografias existentes preservadas nesta organização.

### Versionamento no GitHub — 17/10/2026

- Histórico Git local preservado; branch master. Nenhum remoto ou tag estava configurado no início desta etapa.
- Conta gaabrielmullerf confirmada pela API do GitHub com a credencial do Windows, sem registrar segredos no projeto.
- Destino solicitado: gaabrielmullerf/site-nodrah, privado, descrição “SITE NODRAH — Site institucional e projetos demonstrativos.”. O envio ao GitHub é um backup versionado; não habilita hospedagem nem publica o site.
- Revisados códigos, imagens locais, capturas e arquivos de créditos. Nenhum .env, credencial, temporário ou diretório de dependências instalado foi encontrado no projeto. As fontes Manrope e Inter continuam referenciadas pelo Google Fonts, conforme o código existente; não há arquivos de fonte locais adicionais.

### Integração com Netlify Forms — 17/10/2026

- Implementação concluída no formulário existente em #contato: name="projeto-nodrah", method="POST", action="/", data-netlify="true", campo oculto form-name, atributos name nos seis campos existentes e honeypot bot-field oculto e fora da navegação por teclado.
- Envio JavaScript por fetch para "/", com corpo application/x-www-form-urlencoded incluindo form-name, honeypot e todos os campos. Validação preservada; estado “Enviando…” e bloqueio temporário de solicitações duplicadas.
- Mensagem de sucesso e limpeza dos campos somente após response.ok. Erro HTTP ou de conexão preserva os dados, reabilita o botão e oferece nova tentativa e contato@nodrah.com.br. Região de status acessível anuncia espera, sucesso e erro. Sem credenciais ou chaves no código.
- Sem JavaScript, o formulário mantém POST HTML nativo. Avisos antigos de envio em configuração removidos. CSS alterado apenas no comentário que descrevia o bloqueio antigo; nenhuma regra visual modificada. Nenhuma outra seção ou demonstração alterada.
- Testes simulados no Chrome em 1280 e 390 px: obrigatórios, e-mail inválido, campo com apenas espaços, envio por Enter, URL/POST/content-type e codificação dos oito campos (incluindo caracteres acentuados, & e +), espera, duplicidade, resposta HTTP 503, rejeição de conexão e HTTP 200. Confirmadas preservação dos dados no erro, possibilidade de nova tentativa, sucesso apenas após resposta OK e limpeza somente no sucesso.
- Alternativa nativa conferida com JavaScript desativado: POST real do navegador para um endpoint local simulado, com os campos codificados e form-name preservado. O destino foi substituído apenas na sessão de teste para o servidor local; o HTML de produção permanece com action="/". Nenhum dado de teste foi enviado ao Netlify ou ao e-mail real.
- Enquadramento do formulário inspecionado em desktop e celular, sem rolagem horizontal. Fontes externas não foram validadas nesta etapa; foram bloqueadas apenas na sessão de testes para evitar dependência de rede. git diff --check executado e diff revisado.
- Segundo o responsável, a detecção de formulários está ativa e a notificação para contato@nodrah.com.br está configurada no Netlify. Essas configurações não foram verificadas pelo agente no painel.
- Recebimento real pelo Netlify, classificação de spam e entrega da notificação por e-mail NÃO confirmados. Após o deploy automático acionado pelo push, realizar o teste real e conferir o painel e a caixa de entrada.

## Pendências

### Identidade e apresentação

- Validar a prévia real da imagem de compartilhamento nas redes depois que domínio e imagem estiverem públicos. Arquivo e metadados já preparados; nenhum teste real nas redes foi realizado.

### Validação real do formulário após o deploy

- Aguardar o deploy automático do commit de integração e confirmar a detecção do formulário projeto-nodrah no Netlify.
- Fazer um envio real pelo site publicado e conferir o registro no painel de Forms, inclusive a classificação de spam.
- Confirmar a entrega da notificação em contato@nodrah.com.br, incluindo spam/lixo eletrônico; a configuração informada não comprova recebimento.
- Validar no site publicado o envio com e sem JavaScript e a nova tentativa após falha, sem confundir os testes locais simulados com operação real.
- Definir o tratamento dos dados pessoais, retenção e informações de privacidade aplicáveis.
- Manter a alternativa por e-mail. Não declarar recebimento real até conferir o painel e a caixa de entrada.

### Teste do e-mail

- Pendente: contato@nodrah.com.br ainda não foi confirmado. Verificar sua existência e capacidade de enviar e receber mensagens; não considerar a caixa operacional apenas porque o link mailto está correto.
- Testar o link mailto e seu assunto em aplicativos reais de e-mail, em desktop e celular.
- Testar a cópia em navegadores reais e no contexto de hospedagem definitivo, incluindo a alternativa manual.
- Não houve envio de e-mail de teste nem verificação da caixa postal nesta etapa.

### Revisão para publicação

- Revisar os conteúdos e os dados institucionais fornecidos, mantendo conceitos distintos de trabalhos contratados.
- Revisar acessibilidade, teclado, contrastes, formulários e responsividade em aparelhos físicos e diferentes navegadores.
- Executar Lighthouse mobile quando a ferramenta estiver disponível e medir desempenho em aparelho físico/rede móvel. Avaliar fontes externas e cache/compressão na hospedagem; a revisão alternativa por HTTP local está registrada acima.
- Revisar a apresentação em buscadores e validar os metadados e a imagem de compartilhamento no ambiente público autorizado.
- Verificar HTTPS, rotas, links e imagens no ambiente Netlify após o deploy, sem alterar DNS ou domínio nesta integração.
- O responsável autorizou commit e push desta integração para acionar o deploy automático já conectado ao GitHub. Nenhuma configuração de DNS, domínio ou hospedagem foi alterada nesta etapa.

### Novo hero imersivo — 23/10/2026

- Implementação para revisão local na branch `feat/novo-hero`; sem commit, push ou publicação. Estado inicial sem alterações locais.
- Alterados `index.html`, `style.css`, `script.js` e este registro. Adicionados `assets/fonts/sora-variable.ttf` e `assets/fonts/OFL-Sora.txt`, obtidos do repositório oficial google/fonts (Sora variável, eixo 100–800, font-display: swap). Fonte aplicada somente ao hero; fontes das outras seções preservadas.
- Removidos do hero o layout dividido, rótulo antigo, símbolo de quatro faces, giro, flutuação, inclinação por mouse, órbitas, coordenadas e chão decorativo, com seus seletores e bloco JavaScript exclusivo. Arquivos de identidade existentes preservados.
- Vídeo e poster mantêm as URLs remotas solicitadas. Ambos recebem grayscale, contraste e brilho na camada de mídia; luminosidade sobre base #8B5CF6 converte as cores originais em violeta com luzes claras. Sobreposições escuras protegem o texto e fazem a transição para o grafite. Texto, logo e botões não recebem filtros. CTA translúcido com borda em gradiente, seta SVG e referências #8B5CF6/#C4B5FD.
- Conteúdo solicitado, CTA #contato e link #portfolio (ID confirmado). Cabeçalho único com logo e WhatsApp oficial; menu móvel com botão, aria-expanded, fechamento por Escape/seleção e links ocultos fora do foco. Sem JavaScript a navegação permanece aberta.
- Vídeo sem áudio, loop, playsinline e preload=none; fonte atribuída somente quando as condições permitem. Poster independente permanece disponível em pausa/rejeição de autoplay; falhas de mídia exibem aviso discreto e composição estática. Observação de interseção, visibilitychange e movimento reduzido controlam pausa e retomada. Sem IntersectionObserver, mantém apresentação estática.
- Entrada sequencial acompanha a remoção de intro-pending pela abertura existente, sem modificar intro.js ou adicionar loading. Sem JS o conteúdo permanece visível; movimento reduzido desativa as entradas e mantém o poster.
- Chrome headless: verificados 1440×900, 1280×720, 768×1024, 390×844, 320×640 e 844×390, todos sem rolagem horizontal. Capturas inspecionadas em desktop e celular; cabeçalho móvel corrigido após detectar regra antiga que empilhava logo e botão. Telas baixas rolam naturalmente.
- Confirmados carregamento real do vídeo (readyState 4), poster e Sora local, menu aberto e Escape com retorno de foco, seleção da aba de landing pages, cópias do carrossel presentes e atributos do formulário Netlify preservados (POST, data-netlify e campos obrigatórios). Nenhum formulário ou mensagem enviado. Modo sem JavaScript conferido com título, poster e navegação visíveis; movimento reduzido e falha de vídeo simulada conferidos.
- Limites: emulação no Chrome, sem aparelhos físicos ou outros navegadores. Sem auditoria completa de contraste/desempenho; disponibilidade futura das URLs remotas depende do fornecedor. A integração real com Netlify não foi acionada. As demonstrações e a imagem histórica da prévia institucional não foram alteradas.
- Prévia: executar `python3 -m http.server 8000 --bind 127.0.0.1` na raiz e abrir http://127.0.0.1:8000. Servidor iniciado para esta revisão. `git diff --check` sem erros.
- Verificação complementar com viewport explícita 1440×900 e rolagem instantânea: vídeo pausado no rodapé e retomado no topo; passagem por um ciclo completo de 10,04 s confirmada pelo relógio de reprodução. Pausa e retomada por aba oculta verificadas com document.hidden/visibilitychange simulados; não equivale a trocar de aba manualmente. A leitura foi inspecionada por capturas, sem auditoria quadro a quadro do ciclo.

### Refinamento do hero — 23/10/2026

- Removidos a descrição de serviços, a lista inferior e o link “Conheça nossos projetos”, incluindo seus estilos e entradas sem uso. Mantidos título e CTA de contato.
- Botão afastado do título por espaçamento responsivo de 64–100 px, com fundo mais transparente e desfoque reduzido. Sem commit ou publicação. Verificação: git diff --check.

- Refinamento adicional: menu móvel somente com ícone de três linhas e nome acessível dinâmico; CTA menor (mínimo de 46 px de altura), no final do hero com respiro de 40 px no desktop e 32 px no celular. Conteúdo em flex mantém o título com espaço livre e o botão no fluxo. git diff --check sem erros.

### Sobreposição entre hero e soluções — 23/10/2026

- Adicionado um único contêiner neutro em `index.html`, envolvendo somente #inicio e #solucoes, sem mudar a ordem ou a semântica das seções. CSS em `style.css`: hero sticky limitado ao contêiner; soluções acima dele com fundo opaco `var(--bg)` (#101113), estendido às bordas por pseudo-elemento. Conteúdo e espaçamentos internos preservados. Nenhum JavaScript novo, dependência, efeito adicional ou rolagem artificial.
- Ancestrais body/main/contêiner não têm overflow de rolagem ou transform interferindo no sticky. O overflow:clip permanece restrito ao próprio hero. Em viewports abaixo de 740 px de altura, o topo negativo deixa rolar o excedente do hero antes de prender a borda inferior, mantendo o CTA acessível. Movimento reduzido desativa sticky e mantém o fluxo normal.
- Chrome headless em 1440×900, 390×844, 320×640 e 844×390: coordenadas conferidas no início, durante a sobreposição, após cobertura completa e no retorno. Hero permanece no topo (ou no limite negativo em telas baixas), enquanto Soluções sobe diretamente com scrollY. Posição permanece estável com rolagem parada; nenhuma rolagem horizontal nos tamanhos testados. Capturas inspecionadas em desktop e celular.
- Hit testing no centro do CTA coberto retorna #solucoes, sem clique através da camada. No portfólio, o hero já está inteiramente fora da viewport; retorno ao topo restaura o cabeçalho. Menu móvel e Escape, seleção de aba e destino #contato conferidos; marcação Netlify Forms preservada. Não houve envio de formulário nem mensagens. Formulário, vídeo, abertura e demais funcionalidades JavaScript não foram alterados nesta etapa.
- Limites: testes emulados no Chrome, sem aparelhos físicos ou outros navegadores. Sem novo teste de envio real ou auditoria completa. `git diff --check` sem erros. Prévia local em http://127.0.0.1:8000; sem commit, push ou publicação.

### Catálogo de serviços — 23/10/2026

- Substituída integralmente a antiga seção de abas por “Catálogo de serviços”, mantendo #solucoes, a posição na página e o contêiner da sobreposição do hero. Esta etapa substitui a apresentação de quatro soluções registrada anteriormente.
- Alterados nesta etapa: `index.html`, `style.css`, `script.js` e `PROGRESSO.md`. Sem React/Vite/Tailwind, novas bibliotecas ou instalação de dependências; a referência foi adaptada em HTML/CSS/JS existentes. CSS do catálogo agrupado junto à seção, com URL versionada para atualização de cache.
- Incluídos cabeçalho solicitado, 12 cartões com títulos e descrições conferidos literalmente contra o anexo, ícones SVG decorativos de 32 px no sistema existente e encerramento com CTA aprovado para #contato. Cards informativos sem tabindex, link, botão ou cursor de clique.
- Visual: interior #1A1A1C, borda transparente de 2 px com dois backgrounds (padding-box e border-box), gradientes apenas violetas, cantos de 28 px, halo independente com blur e pointer-events:none. Hover aumenta halo/borda e eleva a superfície em até 4 px, sem movimento contínuo. Altura mínima com crescimento conforme o conteúdo, sem cortar descrições.
- Grade de 3 colunas no desktop amplo, 2 até 1050 px e 1 até 600 px. Reutilizadas as entradas progressivas existentes: uma vez por cartão, atrasos de 0/70/140 ms reiniciados a cada linha conforme a grade real. Movimento reduzido remove entradas/deslocamentos e mantém conteúdo visível; sem JS, HTML completo permanece visível.
- Removidos markup das abas, painéis, demonstrações internas e alternância automática, seu bloco JavaScript e evento nodrah:panel-selected exclusivo. Removidos seletores exclusivos de solution, miniaturas, fluxos e manutenção após comparar classes da seção removida com o restante do documento. Preservados seletores compartilhados, inclusive o aviso de projetos conceituais do portfólio. Nenhum arquivo de imagem, ícone ou demonstração externa foi excluído.
- Chrome headless: verificados 1440, 1024, 768, 390 e 320 px; 12 cards em todas as larguras, grade 3/2/2/1/1, descrições sem cortes, ícones de 32 px e nenhuma rolagem horizontal. Conferidos atrasos por linha, visibilidade do último cartão, referências dos 12 símbolos, destino do CTA e ausência de controles focáveis nos cards. Capturas inspecionadas em desktop e celular. Após corrigir a precedência do tamanho dos ícones sobre .ui-icon, repetidos os checks afetados nas cinco larguras.
- Teste adicional em 320 px com títulos e descrições ampliados para o dobro do tamanho: cards cresceram sem cortes ou rolagem horizontal. Conteúdo visível com JS desativado e movimento reduzido; nenhum erro de JavaScript ou console capturado nos testes principais.
- Transição preservada: catálogo opaco subindo sobre hero sticky nas cinco larguras; em 320×640 o hero alcança o limite negativo previsto para telas baixas. Confirmados dois projetos no portfólio, cópias ativas do carrossel e atributos Netlify Forms. Comparação normalizada do HTML de tecnologias, processo, portfólio, FAQ e contato com HEAD confirmou essas seções preservadas. Sem envio de formulário ou mensagens; não foi repetido teste real de Netlify nem testes completos das demonstrações nesta etapa.
- Limites: emulação no Chrome, sem aparelhos físicos, outros navegadores ou auditoria completa de acessibilidade/desempenho. Prévia: http://127.0.0.1:8000 (na raiz, `python3 -m http.server 8000 --bind 127.0.0.1`). `git diff --check` sem erros. Branch feat/novo-hero, sem commit, push ou publicação.

- Ajuste do cabeçalho do catálogo: “Da primeira página aos processos da operação, desenvolvemos soluções para cada etapa do seu negócio.” passa a ser a única frase de destaque. Removidas a frase anterior e a descrição duplicada, com seu estilo exclusivo. git diff --check sem erros.

### Remoção do CTA do hero — 23/10/2026

- Removido somente o botão “Conte seu projeto” da abertura e seu contêiner, incluindo estilos e entrada exclusivos de nodrah-hero-actions. CTA do catálogo para #contato e seus estilos compartilhados preservados.
- Conferidas ausência de links em #inicio e permanência do CTA em .catalog-closing; git diff --check sem erros. Commit e push solicitados pelo responsável; o envio depende da autenticação GitHub disponível no Git local.

### Catálogo compacto — 23/10/2026

- Ícones e títulos reunidos em uma linha de cabeçalho por card, com descrição logo abaixo. Removidos altura mínima e espaço vazio entre ícone e conteúdo; padding reduzido, cantos de 24 px e intervalos menores. Conteúdo dos 12 serviços preservado.
- Grade ajustada para 4 colunas no desktop amplo, 3 até 1100 px, 2 até 850 px e 1 até 600 px. Em 1440 px, os 12 cards ocupam três linhas, com grade de 632 px de altura. Entradas por linha continuam acompanhando automaticamente o número de colunas.
- Alterados index.html, style.css e este registro. Chrome headless em 1440, 1024, 768, 390 e 320 px: 12 cards, sem texto cortado e sem rolagem horizontal; capturas inspecionadas em desktop e celular. git diff --check sem erros. Alteração preparada localmente para revisão.

- Texto de encerramento do catálogo atualizado para “Conte-nos sobre seu projeto pelo formulário. Entraremos em contato com você.”, mantendo o botão para #contato. git diff --check sem erros.

### Seção de pacotes — 23/10/2026

- Inserida #pacotes imediatamente após o catálogo compacto #solucoes e antes de #tecnologias, fora do contêiner que limita o sticky do hero. Link “Pacotes” incluído no cabeçalho existente, preservando seu menu móvel. Nenhuma seção antiga de pacotes existia.
- Quatro combinações sem preços, descontos ou níveis: Presença profissional, Captação de oportunidades, Operação inteligente e Projeto personalizado. Textos, itens, CTAs e nota fornecidos no anexo; cada campo dos cards foi conferido contra a referência textual. Somente o último recebe etiqueta “Sob medida” e borda violeta discretamente mais presente.
- Arquivos alterados: index.html (conteúdo, navegação e versões de CSS/JS), style.css (bloco agrupado antes de Tecnologias), script.js (integração com entradas existentes e comportamentos exclusivos dos pacotes) e este registro. Mantidos HTML/CSS/JS e fontes atuais, sem instalação de dependências.
- Grade de duas colunas e duas linhas; uma coluna até 650 px. Moldura externa e superfície interna arredondadas, divisórias, listas com ícones #ui-check existentes e botões na base. Alturas livres para crescimento; botões de mínimo 48 px podem quebrar linha.
- Spotlight: anéis mascarados na moldura e superfície com coordenadas relativas ao cartão, atualizados em requestAnimationFrame. Uma leitura geométrica por quadro antes das escritas, sem inclinação, zoom ou halo global novo. Saída desvanece a luz e cancela o quadro pendente. Borda estática permanece sem JS, máscara, ponteiro preciso ou com movimento reduzido. O halo global anterior do projeto foi preservado.
- CTAs nativos para #contato selecionam apenas valores já existentes em #project-type: Site institucional, Landing page, Automação e Outro, respectivamente. Sem novos campos, alterações no envio, preenchimento da descrição ou envio automático. Sem JS, conservam a navegação pelo link.
- Entradas reaproveitam o observador existente: cada card entra uma vez, com intervalo de 70 ms reiniciado a cada linha. Cabeçalho e nota entram como blocos, sem animar cada item da lista. Redução de movimento conserva o conteúdo estático visível.
- Chrome headless em 1440, 1024, 768, 390 e 320 px: posição anterior/posterior confirmada, quatro cards e vinte itens, grade 2/2/2/1/1, sem cortes ou rolagem horizontal. CTAs alinhados por linha no desktop/tablet; 48 px de altura nas quatro primeiras larguras e até 65 px em 320 px para acomodar o texto. Capturas inspecionadas em desktop e celular.
- Conferidos os quatro destinos e seleções de formulário em todas as larguras, navegação “Pacotes” com fechamento do menu móvel, iluminação seguindo coordenadas do mouse e retorno a opacidade zero ao sair. Testes com movimento reduzido e JS desativado conservaram o conteúdo. Nenhum erro de JavaScript ou console capturado no roteiro corrigido; um erro de aspas no próprio roteiro inicial foi corrigido antes de repetir os testes.
- Comparação normalizada com HEAD confirma conteúdo preservado em hero, catálogo, tecnologias, processo, portfólio, FAQ e contato. Carrossel ativo, dois projetos e atributos Netlify Forms também conferidos. Nenhum formulário ou mensagem enviado.
- Limites: testes emulados no Chrome; sem aparelho físico, outros navegadores, auditoria completa de acessibilidade/desempenho ou simulação de navegador sem suporte nativo a máscaras. Fallback de borda convencional implementado em CSS. Prévia local: http://127.0.0.1:8000. git diff --check sem erros. Sem commit, push ou publicação nesta etapa.
- Verificação complementar: emulação de toque confirmou ponteiro coarse, ausência de spotlight ativo e anéis ocultos; Tab navegou entre CTAs com outline visível e Enter abriu #contato com a opção correta. Sem JS e sem movimento reduzido também foram confirmados quatro cards visíveis. Transição do catálogo sobre o hero conferida novamente em 390 px.

- Removida a descrição “Combinamos desenvolvimento, integração e divulgação conforme o que seu negócio precisa.” do cabeçalho de pacotes, com seus estilos exclusivos. Título, etiqueta e cartões preservados. git diff --check sem erros.
