# Progresso do site Nodrah

Atualizado em 17/10/2026. Projeto local em HTML, CSS e JavaScript, sem framework e sem publicação.

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
- Contato com nome, e-mail, empresa, tipo de projeto, faixa de investimento e descrição. Labels visíveis e validação local; botão de envio desabilitado com aviso de configuração.
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
- Formulário: obrigatoriedade, formato de e-mail, correção de erros e bloqueio de envio mesmo com dados válidos. Não há integração nem armazenamento dos dados preenchidos.
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

## Pendências

### Identidade e apresentação

- Validar a prévia real da imagem de compartilhamento nas redes depois que domínio e imagem estiverem públicos. Arquivo e metadados já preparados; nenhum teste real nas redes foi realizado.

### Integração real do formulário

- Definir e implementar o mecanismo de envio e o destino das mensagens.
- Preparar validação no servidor, tratamento de falhas e proteção contra abuso conforme a solução escolhida.
- Definir o tratamento dos dados pessoais e as informações de privacidade aplicáveis.
- Habilitar o botão somente após a integração estar pronta e testada. Mostrar confirmação de envio apenas após resposta real de sucesso.
- Até lá, manter o botão desabilitado e a alternativa por e-mail.

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
- Definir domínio/hospedagem e verificar HTTPS, rotas, links e imagens no ambiente definitivo quando a publicação for autorizada.
- Não publicar antes da autorização. Nenhum serviço de hospedagem foi configurado nesta etapa; o repositório privado no GitHub não constitui publicação do site.
