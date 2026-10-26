# Landing pages comerciais da Nodrah

Implementação estática, independente do institucional. Não altera o deploy.

## Executar localmente

Requisito para gerar: Node.js 20 ou superior. Não há dependências para instalar.

```sh
npm run build:landings
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra http://127.0.0.1:8000/nutricionistas/.
O HTML gerado já está incluído no projeto: para apenas visualizar, basta o servidor Python.
Execute o servidor na raiz do repositório, pois os recursos usam caminhos absolutos a partir da raiz do domínio.

Neste Mac, o terminal não possui `node`/`npm` no PATH. A geração também foi validada com o runtime Node.js do VS Code:

```sh
ELECTRON_RUN_AS_NODE=1 '/Applications/Visual Studio Code.app/Contents/MacOS/Code' scripts/build-landings.mjs
```

## Editar e adicionar nichos

- Textos e perguntas: `landing-pages/content/nutricionistas.json`.
- Estrutura: `landing-pages/templates/landing.html`.
- Partes compartilhadas: `landing-pages/partials/`.
- Identidade, componentes e layout: `assets/landing/css/`.
- Navegação, animações, formulário e envio: `assets/landing/js/`.
- Gerador: `scripts/build-landings.mjs`.
- Saída: `nutricionistas/index.html`. Não editar manualmente.

Para outro nicho, adicione um JSON em `content/`, com um slug exclusivo (por exemplo, `medicos`), nome de formulário exclusivo, metadados, textos e perguntas. Execute a geração novamente. Os tipos de pergunta disponíveis são `checkbox`, `radio` e `currency`; o contato é uma etapa final compartilhada. O número de etapas é calculado automaticamente. O gerador escapa os textos inseridos no HTML.

A saída é HTML completo, inclusive campos do formulário, sem renderização por framework. Os recursos existentes de logo, Sora e imagem violeta são referenciados, não copiados. Inter e Manrope usam os mesmos recursos Google Fonts do institucional. O CSS institucional não é importado para evitar efeitos da cascata histórica.

## Demonstração e futura integração

O formulário está preparado com `data-netlify="true"`, nome próprio, `form-name`, identificação do nicho/origem, campos nomeados e honeypot. Isso prepara a detecção estática futura; não comprova funcionamento do recebimento.

`lead-service.js` mantém `LIVE_SUBMISSION_ENABLED = false`. Em demonstração, `submitLead` retorna antes de construir ou transmitir um payload. Não existe persistência por cookies, localStorage, sessionStorage ou logs. As respostas permanecem apenas nos campos da página durante a navegação entre etapas.

Sem JavaScript, os campos e o botão chegam bloqueados. O controlador só os libera após registrar a interceptação de submit. O formulário nunca faz POST durante a demonstração. A tela final informa que nada foi enviado nem armazenado.

Antes de uma futura ativação, após autorização:

1. Publicar a Política de Privacidade e preencher `privacyUrl` no conteúdo. O gerador cria o link quando a URL estiver disponível.
2. Revisar o texto e a versão do consentimento, estados de envio, erro e confirmação real; o controlador atual aceita somente o resultado demonstrativo.
3. Ativar explicitamente o adaptador no código, revisar a política de retenção de dados e regenerar o HTML.
4. Confirmar detecção e recebimento no Netlify em ambiente autorizado. Testar resposta de erro, falha de rede e bloqueio de duplo envio. Não inferir persistência apenas de uma resposta HTTP genérica.
5. Revisar `noindex, nofollow`, metadados de compartilhamento e canonical antes do lançamento. Esta prévia está intencionalmente fora da indexação.

Nenhum pixel, analytics, função de backend, configuração Netlify, commit, push ou publicação foi adicionado nesta etapa.

## Verificação realizada

- Geração executada com Node.js v24.21.0, sem dependências externas.
- Chrome headless: fluxo de seis etapas, múltipla escolha, escolha única, validação, formatação BRL, e-mail profissional obrigatório (validação nativa de formato), consentimento, voltar e reiniciar.
- Conclusão demonstrativa sem requisições POST nem gravação em localStorage/sessionStorage.
- Menu móvel, Escape e retorno de foco; ausência de rolagem horizontal em 1440×1000, 390×844, 320×640 e 844×390.
- Respeito a movimento reduzido; bloqueio do formulário com JavaScript desativado.
- HTTP 200 para `/nutricionistas/` e redirecionamento local de `/nutricionistas` para `/nutricionistas/`.
- Comparação SHA-256 dos quatro arquivos institucionais e dos 20 arquivos de demonstrações: preservados.

Limites: validação de navegador feita no Chrome para macOS com emulação de viewport, sem aparelho físico, Safari/Firefox, auditoria completa de acessibilidade ou teste de recebimento no Netlify. A aprovação visual, a política de privacidade, a integração real e a publicação estão pendentes.

## Ajuste da abertura — 25/10/2026

A landing carrega o próprio `/intro.js` institucional, sem modificá-lo. `assets/landing/css/intro.css` reproduz exatamente o bloco original da abertura em `style.css`, incluindo os seis recortes, a máscara da logo, a camada decorativa sem bloqueio de interação e a saída suave. A preferência por movimento reduzido continua sendo respeitada pelo código original.

O formulário foi movido para o conteúdo principal do hero. A primeira pergunta aparece após a abertura, sem botão intermediário; o título é NODRAH PARA NUTRICIONISTAS. O subtítulo comercial foi removido. O elemento da mídia de fundo, os arquivos de mídia e suas regras CSS existentes permanecem intactos. O formulário mantém os mesmos scripts, campos, validações e envio demonstrativo.

Arquivos ajustados: template, parcial de head, conteúdo do nicho, CSS de layout, HTML gerado e esta documentação. Criado apenas o CSS da intro. Não houve mudança no institucional, integração ou hospedagem.

## Deploy Preview para avaliação

A branch `preview-lp-nutricionistas` usa `netlify.toml` somente no contexto `deploy-preview`: Node.js 24, comando `node scripts/build-landings.mjs` e publicação da raiz (`.`), incluindo o institucional e todos os recursos referenciados. Não há seção global de build, alteração de produção ou fallback de SPA.

O HTML gerado também é versionado. As configurações do painel Netlify precisam permitir Deploy Previews para Pull Requests com destino à branch de produção (`master` neste repositório). O PR não deve ser mesclado durante a avaliação. A URL a compartilhar é a URL efetivamente informada pelo Netlify, acrescida de `/nutricionistas/`.

O formulário continua em demonstração. Nenhum envio real deve ser ativado para a avaliação visual.

## Reprodução do fundo

A landing usa `hero-video.js` com a lógica de reprodução do institucional: fonte original no desktop e MP4 violeta local em telas de até 768 px ou dispositivos sem hover e com ponteiro coarse. O vídeo é decorativo, silencioso, inline e em loop. Pausa fora da tela, com a aba oculta ou movimento reduzido; poster permanece disponível em pausa, bloqueio de autoplay ou falha. Nenhum arquivo do institucional ou de mídia foi alterado.
