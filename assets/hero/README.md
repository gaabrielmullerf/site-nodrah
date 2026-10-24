# Poster violeta do hero móvel

`nodrah-hero-violet.jpg` é o poster original com o tratamento violeta já incorporado aos pixels. É um JPEG RGB de 1536 × 1024 px, otimizado/progressivo, qualidade 90, amostragem 4:4:4 e perfil sRGB incorporado. Tamanho: 365.578 bytes; original: 568.789 bytes (redução aproximada de 36%). A composição e a proporção originais foram mantidas; o enquadramento continua sendo definido pelo CSS existente.

## Originais preservados

Poster:
https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/130837c4-0244-4f37-9c61-8d801d93fd29.jpg

SHA-256 da cópia usada para gerar o poster:
`1f2c12b40ac28c20dfa8d14c24ab2b1d4847eab1ba52bda34d5b5d9f303ea66c`

Vídeo:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104303_0c6d60b2-9353-408e-9449-585108a22fb5.mp4

O desktop continua usando esses recursos remotos. Os arquivos originais não foram regravados ou removidos. As cópias baixadas para análise e as ferramentas de conversão ficaram em /tmp, fora do projeto.

## Tratamento incorporado

Transformação determinística, sem geração de imagem por IA:

1. Luminância do poster: `0,2126 R + 0,7152 G + 0,0722 B`.
2. Contraste 1,12 e brilho 0,88, equivalentes aos filtros já usados no desktop.
3. Operação de luminosidade sobre a base #8B5CF6, com recorte de gama para manter os canais RGB válidos.
4. Exportação JPEG/sRGB com o violeta incorporado, sem texto, sobreposições escuras ou mudanças de enquadramento gravados na imagem.

Na comparação isolada em 390 × 844, a diferença média por canal em relação ao poster original com o CSS do desktop ficou abaixo de 1,1 em uma escala de 0–255 no Chrome e abaixo de 2,3 no WebKit para macOS, aguardando decode e pintura completos. Há pequenas diferenças de arredondamento, compressão e reamostragem; não se trata de uma cópia matematicamente sem perdas.

## Uso e limite da correção

O picture, o CSS e o JavaScript usam a mesma condição: largura até 768 px **ou** dispositivo com ponteiro primário coarse e sem hover. Isso cobre celular em paisagem e dispositivos móveis de toque. Nesses casos o vídeo não recebe src, o poster é local e a mídia não usa filtros nem mix-blend-mode.

A escolha é preventiva, independentemente do evento error do vídeo. Não foi possível reproduzir as manchas verdes no WebKit para macOS nem validar um iPhone físico. O fallback estático evita os caminhos de decodificação de vídeo e composição de cores suspeitos, sem escurecer mais o hero ou alterar seu sticky.
