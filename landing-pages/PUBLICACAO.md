# Preparação da publicação — 26/10/2026

## Confirmações do responsável

- Controladora: SUPER MIDIA SOLUCOES LTDA, CNPJ 69.128.782/0001-45, responsável pela Nodrah. Razão social e vínculo confirmados pelo responsável após consulta pública secundária; não houve emissão de comprovante pela Receita nesta sessão.
- Apenas o responsável pela Nodrah acessa os leads; não há exportação para planilhas/CRM.
- Responsável confirmou submissão em Verified, respostas completas e notificação recebida em contato@nodrah.com.br. Não houve novo envio real nesta revisão.

## Minuta de privacidade

`privacidade/index.html` usa as cores, fontes, logo, header e footer existentes. É uma minuta explícita, com `noindex, nofollow`, atualizada em 26/10/2026. Não declara conformidade integral. O link na LP abre nova aba para preservar as respostas; o consentimento obrigatório permanece intacto. O institucional recebe apenas uma nota/link no formulário, sem novos campos ou mudanças de envio.

Antes da publicação oficial, confirmar e incorporar:

1. Identidade do provedor da caixa contato@nodrah.com.br.
2. Critérios e prazos de retenção, revisão e exclusão, incluindo notificações e cópias/backups sob controle da empresa.
3. Controles efetivos de segurança e procedimento de atendimento aos direitos e incidentes.
4. Contratos, países de destino e mecanismos aplicáveis ao tratamento internacional pelos prestadores, conforme LGPD e regulamento da ANPD.
5. Eventuais cookies técnicos dos prestadores; não há analytics, pixel ou cookies de publicidade implementados no código revisado.
6. Aprovação final do texto pelo responsável e avaliação jurídica das práticas efetivas. Depois, remover o aviso de minuta e revisar a indexação da política.

Bases consultadas: LGPD (https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm), direitos dos titulares (https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares), transferência internacional (https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados), Netlify Forms (https://docs.netlify.com/manage/forms/submissions/) e política Netlify (https://www.netlify.com/privacy/).

## Publicação técnica

- `nutricionistas/index.html` é gerado e versionado; `privacidade/index.html` é uma página estática versionada. Ambas têm canonical para o domínio oficial.
- A LP possui `index, follow`; Deploy Previews recebem `X-Robots-Tag: noindex` do Netlify. A política mantém noindex enquanto minuta.
- `netlify.toml` permanece restrito ao contexto deploy-preview, com geração e publicação da raiz. Nenhuma configuração de produção foi alterada.
- Se a produção continuar publicando a raiz do repositório, ambas as rotas estão incluídas sem precisar de rewrite ou framework. A API pública confirmou o domínio nodrah.com.br e o deploy de produção na branch master, commit 05789a9bc068c3d2ed3ad9788162e066b691f086. Ela não expõe as configurações de build: confirmar no painel que o diretório publicado é a raiz e que não há comando de build/rewrite global incompatível. Essas configurações não podem ser presumidas como verificadas.
- Validar o PR #1 (base master), diff, ausência de conflitos/segredos e Deploy Preview. Manter sem merge até a aprovação do texto e autorização explícita de publicação.
