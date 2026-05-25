# Direcao visual publica

Este documento registra decisoes para retomar depois da primeira passagem visual desktop da Home.

## Home desktop validada

- Header publico presente no topo.
- Ao rolar, o header se reduz para uma pill flutuante centralizada.
- Ao continuar descendo, a pill se oculta; ao subir, reaparece.
- Hero em formato de luva com ilustracao, informacoes da obra e curvas flutuantes.
- Listagem de obras em grid, com `64px` de padding horizontal no desktop.
- Selecao de texto na area publica em `#C8B2F2`.

## Hero futuro como carrossel

A estrutura da luva deve permanecer fixa. O carrossel troca apenas o conteudo da obra em destaque:

- ilustracao;
- titulo e descricao;
- colecao e credito de ilustracao;
- marcador/personagem, quando aplicavel;
- reacao discreta das curvas durante a transicao.

Regras sugeridas:

- O admin escolhe quais obras sao destaque e define sua ordem.
- O hero comporta de 1 a 5 destaques.
- Os controles devem ser discretos, inspirados em abas ou lombadas de livros.
- Rotacao automatica pode ser opcional e lenta, pausando em hover ou foco.
- A transicao deve ser suave, sem deslocar a luva inteira.
- Cada destaque direciona para a pagina individual da obra.
- Com apenas uma obra destacada, os controles nao aparecem.

## Proxima rodada

- Pagina individual da obra.
- Leitor online.
