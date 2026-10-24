# Mídia violeta do hero móvel

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

## Vídeo móvel otimizado

`nodrah-hero-violet-mobile.mp4` restaura o movimento no celular sem filtros de cor em tempo real.

- Derivado do vídeo original preservado acima, com o mesmo tratamento violeta incorporado por LUT RGB de 33³ pontos.
- 1280 × 720, 24 fps, duração de 10,04 s, sem áudio.
- H.264 Constrained Baseline, nível 3.1, avc1, 8 bits, yuv420p, BT.709 explícito e faixa limitada.
- MP4 com faststart (moov antes de mdat), CRF 22, limite de 2,5 Mb/s e buffer de 5 Mb.
- 3.022.742 bytes, contra aproximadamente 36,5 milhões de bytes do original (redução aproximada de 92%).
- Decodificação integral conferida sem erros com FFmpeg. Ferramentas e LUT de conversão ficaram em /tmp, sem dependência de execução no site.

## Seleção e fallback

O picture, o CSS e o JavaScript usam a mesma condição: largura até 768 px **ou** dispositivo com ponteiro primário coarse e sem hover. Isso cobre celular em paisagem e dispositivos móveis de toque. Nesses casos o vídeo usa o MP4 local e o poster local, sem filtros nem mix-blend-mode. No desktop, o vídeo original e seu tratamento permanecem.

O JPEG fica visível antes da reprodução e em pausa, com movimento reduzido, bloqueio de autoplay, ausência de JavaScript ou falha de carregamento. A preferência inicial pelo poster estático em todo celular foi substituída pelo vídeo otimizado após o responsável solicitar a volta do movimento.

Chrome e WebKit para macOS reproduziram a versão otimizada em emulação de toque, com loop e pausas fora da tela. Esses testes não garantem a reprodução em um iPhone físico; a conferência no aparelho continua necessária.
