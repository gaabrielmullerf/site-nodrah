# Progresso do site Nodrah

Atualizado em 13/10/2026. Projeto local em HTML, CSS e JavaScript, sem framework e sem publicação.

## Pronto

- Identidade grafite/violeta, fontes Manrope e Inter, cabeçalho e apresentação com peça de profundidade em CSS.
- Logo definitiva aplicada no cabeçalho e rodapé com o arquivo assets-logo/nodrah-logo.png, preservando desenho, cores, transparência e proporção original (1315 × 440). Substituiu integralmente a marca provisória; os links levam a #inicio e a imagem usa alt="Nodrah".
- Favicon configurado no site principal: assets-logo/favicon.ico com 16, 32 e 48 px, favicon-32x32.png e apple-touch-icon.png de 180 × 180 px. Símbolo extraído da logo original sobre fundo grafite; identidades das demonstrações preservadas.
- Título da aba principal atualizado para “N O D R A H”.
- Símbolo oficial animado na apresentação, extraído em 391 × 378 px para assets-logo/nodrah-symbol.png. Flutuação discreta e inclinação por mouse em elementos separados, com pausa fora da tela ou na aba oculta e respeito ao movimento reduzido. Composição estática sem JavaScript.
- Entradas suaves nas seções de soluções, tecnologias, processo, portfólio, FAQ e contato: 20 px, 600 ms e atrasos sequenciais limitados a 200 ms, apenas na primeira entrada. Cabeçalho, apresentação e animação do símbolo permanecem independentes. Âncoras, foco e seleção de abas revelam o conteúdo imediatamente; sem JavaScript, sem IntersectionObserver ou com movimento reduzido, o conteúdo fica visível.
- Cores de assinatura centralizadas: violeta elétrico #8B5CF6 e versão clara #C4B5FD.
- Quatro soluções por abas: sites institucionais, landing pages, automações e manutenção e evolução. Demonstrações identificadas como ilustrativas.
- Seção de tecnologias com três grupos, 14 opções, exemplos de código e visuais demonstrativos, sem execução de servidor ou banco de dados.
- Processo em quatro etapas, numeração única e layouts de quatro, duas ou uma coluna.
- Portfólio com dois projetos conceituais e capturas reais estáticas, sem barras de rolagem nas imagens.
- Energia solar: paleta neutra/azul/âmbar, soluções, benefícios, FAQ e simulador percentual com premissas e limites explícitos.
- Vértice Motors: marca fictícia, seis anúncios demonstrativos, busca, filtros combinados, ordenação, detalhes, galeria e resumo local de interesse. Fotografias licenciadas, locais e creditadas; as galerias usam foto completa e recortes identificados.
- Demonstração antiga de eventos removida após verificar que seus arquivos não eram compartilhados.
- Perguntas frequentes com interação nativa por details/summary, indicadores +/−, foco violeta e espaçamento responsivo.
- Contato com nome, e-mail, empresa, tipo de projeto, faixa de investimento e descrição. Labels visíveis e validação local; botão de envio desabilitado com aviso de configuração.
- Alternativa de contato por mailto e cópia de e-mail com confirmação após sucesso ou seleção manual em caso de falha.
- Rodapé com navegação, e-mail, CNPJ fornecido e copyright de 2026.

## Verificações realizadas

- Chrome headless: layouts em 1440, 1024, 768, 390 e 320 px e ausência de rolagem horizontal nas verificações realizadas.
- Todos os testes de celular foram emulados no navegador; não foram realizados em aparelhos físicos. A revisão em aparelho físico continua pendente.
- Ícones: inspeção visual em 16, 32 e 180 px, validação das três resoluções internas do ICO e carregamento dos arquivos e referências no Chrome.
- Símbolo: movimento observado por amostras de aproximadamente 73 quadros em 1440, 1024, 390 e 320 px; mouse e retorno no desktop, ausência de inclinação na emulação de toque, pausa fora da tela e modo estático com movimento reduzido. A pausa por aba oculta foi testada com evento de visibilidade simulado. O carregamento sem JavaScript também foi verificado.
- Entradas: rolagem nativa por eventos de roda em 1440, 390 e 320 px, com opacidades intermediárias observadas; duração e limites dos atrasos, primeira entrada, âncoras, Tab, foco e abas verificados. Conteúdo visível com JavaScript desativado, IntersectionObserver indisponível e movimento reduzido.
- Logo: carregamento, proporção e tamanhos computados conferidos em 1440, 390 e 320 px, com capturas visuais e sem rolagem horizontal. Cabeçalho com 160 px no desktop e 135 px no celular; rodapé com 180 px. Os links contêineres têm as mesmas larguras. A URL do CSS foi versionada para evitar cache antigo; a aba de prévia do usuário não foi inspecionada diretamente.
- Navegação local entre Nodrah e demonstrações, carregamento das fotos e prévias.
- Abas, filtros, busca, ordenação, galerias, simulador solar, FAQ e resumos locais.
- Teclas reais em testes específicos de FAQ, contato e formulário; foco visível e movimento reduzido nos componentes verificados.
- Contraste calculado em aplicações de texto e controles, em etapas anteriores. Esses checks não substituem uma auditoria completa de acessibilidade.
- Formulário: obrigatoriedade, formato de e-mail, correção de erros e bloqueio de envio mesmo com dados válidos. Não há integração nem armazenamento dos dados preenchidos.
- Cópia de e-mail: cenários controlados de operação pendente, sucesso, falha e API indisponível. A área de transferência do visitante não foi validada em todos os navegadores.
- Nenhum teste em aparelho físico e nenhuma medição completa de desempenho foi realizada.

## Pendências

### Identidade e apresentação

- Preparar a imagem de compartilhamento e seus metadados.

### Integração real do formulário

- Definir e implementar o mecanismo de envio e o destino das mensagens.
- Preparar validação no servidor, tratamento de falhas e proteção contra abuso conforme a solução escolhida.
- Definir o tratamento dos dados pessoais e as informações de privacidade aplicáveis.
- Habilitar o botão somente após a integração estar pronta e testada. Mostrar confirmação de envio apenas após resposta real de sucesso.
- Até lá, manter o botão desabilitado e a alternativa por e-mail.

### Teste do e-mail

- Confirmar que contato@nodrah.com.br está operacional e pode enviar e receber mensagens.
- Testar o link mailto e seu assunto em aplicativos reais de e-mail, em desktop e celular.
- Testar a cópia em navegadores reais e no contexto de hospedagem definitivo, incluindo a alternativa manual.
- Não houve envio de e-mail de teste nem verificação da caixa postal nesta etapa.

### Revisão para publicação

- Revisar os conteúdos e os dados institucionais fornecidos, mantendo conceitos distintos de trabalhos contratados.
- Revisar acessibilidade, teclado, contrastes, formulários e responsividade em aparelhos físicos e diferentes navegadores.
- Medir desempenho e avaliar o peso das imagens, fontes e carregamento.
- Finalizar imagem e metadados de compartilhamento e demais ajustes de apresentação em buscadores.
- Definir domínio/hospedagem e verificar HTTPS, rotas, links e imagens no ambiente definitivo quando a publicação for autorizada.
- Não publicar antes da autorização. Nenhum serviço novo foi configurado.
