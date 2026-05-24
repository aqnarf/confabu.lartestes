# Fluxo local de upload - etapa 2

Esta etapa conecta o painel `/admin` a uma persistencia local de prototipo.

## O que acontece no cadastro

1. O formulario envia capa, PDF e metadados para uma server action.
2. A action valida campos obrigatorios e tipos de arquivo.
3. A capa e o PDF sao salvos em `public/uploads/[slug]/`.
4. Os metadados da obra sao salvos em `.data/books.json`.
5. As rotas do acervo sao revalidadas.
6. A obra passa a aparecer na home, na pagina individual e no leitor.

## Arquivos locais gerados

```text
.data/books.json
public/uploads/[slug]/cover.*
public/uploads/[slug]/book.pdf
```

Esses caminhos estao no `.gitignore`, porque sao dados de runtime e nao devem entrar no repositorio.

## Limites conhecidos

- O PDF ainda nao e processado em paginas reais.
- O leitor usa a capa como pagina provisoria da obra cadastrada.
- A persistencia local funciona para desenvolvimento, mas nao e adequada para deploy serverless.
- A proxima etapa deve escolher storage e banco reais antes de usar em producao.
