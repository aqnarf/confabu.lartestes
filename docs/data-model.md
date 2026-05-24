# Modelo de dados - etapa 1

Esta etapa cria o contrato interno da biblioteca antes de conectar banco, storage ou upload real.

## Entidades principais

### BookRecord

Representa uma obra cadastrada no acervo.

Campos principais:

- `id`: identificador interno estavel.
- `slug`: caminho publico da obra.
- `status`: `draft`, `published` ou `archived`.
- `title` e `subtitle`: nome da obra.
- `description`: resumo usado nas paginas publicas.
- `language`: idioma da obra, inicialmente `pt-BR`.
- `ageRange`: faixa etaria exibida no acervo.
- `categories` e `tags`: filtros editoriais.
- `contributors`: autoria, ilustracao, edicao ou traducao.
- `assets.cover`: imagem de capa.
- `assets.pdf`: arquivo PDF original.
- `readerPages`: paginas renderizadas para leitura visual.
- `rights`: regras de download e aceite de termos.
- `createdAt`, `updatedAt`, `publishedAt`: datas editoriais.

### BookAsset

Representa um arquivo associado a uma obra.

Campos principais:

- `id`: identificador interno do asset.
- `kind`: `cover`, `pdf` ou `reader-page`.
- `url`: endereco publico ou assinado do arquivo.
- `altText`: texto alternativo quando o asset for imagem.
- `storageKey`: chave futura no storage.
- `mimeType` e `sizeBytes`: metadados tecnicos.

### ReaderPage

Representa uma pagina preparada para o leitor.

Campos principais:

- `id`: identificador interno da pagina.
- `order`: posicao da pagina no livro.
- `image`: imagem renderizada da pagina.
- `transcript`: texto usado no modo de rolagem acessivel.

## Arquivos criados

- `lib/catalog/types.ts`: tipos centrais do dominio.
- `lib/catalog/mock-books.ts`: dados temporarios no novo formato.
- `lib/catalog/repository.ts`: funcoes de consulta usadas pelas telas.
- `lib/books.ts`: fachada publica para o restante do app.

## Decisoes desta etapa

- O app ainda nao escolhe banco nem storage.
- O upload real ainda nao foi ligado ao admin.
- As telas publicas ja leem por um repositorio assincrono, facilitando trocar mock por banco depois.
- Downloads ja possuem campo de regra em `rights`, mas o aceite de termos ainda sera implementado em etapa futura.
