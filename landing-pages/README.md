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

## Envio real com Netlify Forms

O HTML gerado contém o formulário completo `nodrah-nutricionistas`, com `method="POST"`, `action="/"`, `data-netlify="true"`, `form-name`, honeypot e todos os campos nomeados. Os atributos de detecção são inseridos somente no HTML final, evitando que o Netlify registre o parcial com um nome de template. Templates não são renderizados no navegador: o Netlify deve analisar `nutricionistas/index.html` após a geração, no deploy.

`lead-service.js` envia um POST AJAX URL-encoded para `/` no mesmo domínio da página. Preserva ocorrências de `canais[]`, normaliza `valor-consulta` para decimal com duas casas (ex.: `1250.50`), inclui `nicho`, origem sem query/fragmento, consentimento e um identificador da tentativa. Captura somente os parâmetros UTM previstos no HTML: source, medium, campaign, term, content, id, source_platform, creative_format e marketing_tactic, limitados a 500 caracteres cada. Sem parâmetros, envia valores vazios.

O controlador valida todas as seis etapas e o consentimento antes do POST. Durante o envio, bloqueia novas submissões e edição dos campos. Só apresenta sucesso após `response.ok`. Erros HTTP e de rede preservam as respostas e permitem nova tentativa. Não há retry automático, logs de informações pessoais ou armazenamento no navegador.

O bloqueio do controlador e do serviço impede cliques simultâneos e reenvio após sucesso na mesma página. O `submission-id` é preservado ao tentar novamente para facilitar a conferência no painel. Netlify Forms não oferece garantia de idempotência por esse campo: uma falha de conexão após o recebimento, seguida de retry manual, pode produzir duplicidade. Não há deduplicação entre abas ou após recarregar a página.

## Verificação no painel e notificações

A integração só deve ser considerada concluída depois de confirmar uma submissão no painel Netlify. HTTP 2xx e tela de sucesso, isoladamente, não comprovam armazenamento, classificação de spam ou entrega de e-mail.

No projeto `hilarious-cuchufli-5c9e7a`:

1. Abra **Forms** e confirme que a detecção de formulários está habilitada. Se precisar habilitá-la, faça um novo deploy do preview.
2. Confirme que `nodrah-nutricionistas` aparece em **Active forms**. O log do deploy também pode informar a detecção.
3. Envie uma única solicitação de teste autorizada, com dados fictícios; confira as abas **Verified submissions** e **Spam submissions**, incluindo canais múltiplos, valor decimal, origem, UTM e consentimento.
4. Em **Forms > Submission notifications > Add notification > Email notification**, escolha `nodrah-nutricionistas`, informe `contato@nodrah.com.br` e salve. A opção para todos os formulários também pode existir, mas prefira o formulário específico para esta configuração.
5. Confira o e-mail de notificação e a pasta de spam. `name="email"` permite que o Netlify use o endereço do solicitante como Reply-To.

Notificações não são ativadas pelo HTML e não foram presumidas como configuradas. Consulte a documentação oficial: https://docs.netlify.com/manage/forms/setup/ e https://docs.netlify.com/manage/forms/notifications/.

## Política de Privacidade

A página `/privacidade/` é uma minuta com identidade visual da Nodrah e pendências explicitadas. O link está integrado à etapa de contato e ao formulário institucional, sem mudar os campos, consentimento ou serviço de leads. A razão social/CNPJ, o acesso individual e a ausência de exportações foram confirmados pelo responsável. Provedor de e-mail, retenção e demais pendências estão em `landing-pages/PUBLICACAO.md`.

Em 26/10/2026, o responsável confirmou que o teste foi armazenado em Verified, com respostas completas e notificação recebida em contato@nodrah.com.br. Esta revisão não realiza novos envios reais. O recebimento e a notificação não são mais pendências desta integração.

## Deploy Preview e preservação

A branch `preview-lp-nutricionistas` usa `netlify.toml` somente em `deploy-preview`: Node.js 24, geração por `node scripts/build-landings.mjs` e publicação da raiz. Não há configuração global de produção ou fallback de SPA. Não mesclar o PR #1 durante esta avaliação.

A landing carrega o próprio `/intro.js` institucional e mantém o CSS original da intro. O fundo usa `hero-video.js`: vídeo original no desktop e MP4 violeta local no celular, silencioso, inline e em loop. Pausa quando fora da tela, com aba oculta ou movimento reduzido; mantém poster em falhas ou bloqueio de autoplay. A ativação do formulário não altera intro, vídeo, estilos, institucional ou projetos.

Os testes técnicos de envio devem interceptar o POST no navegador para simular HTTP 200, HTTP 500 e falha de rede, sem transmitir dados a serviços externos. Um envio real exige autorização e conferência no painel. Não use dados pessoais reais.
