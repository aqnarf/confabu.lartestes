# Persistencia de producao - etapa 3

Esta etapa prepara contratos para trocar a persistencia local por servicos reais sem reescrever as telas.

## Decisao recomendada

- Banco: Postgres, mantendo compatibilidade com Neon.
- Arquivos: Vercel Blob para PDFs, capas e paginas renderizadas.
- Desenvolvimento local: `.data/books.json` e `public/uploads/`.

O projeto ainda nao instala nem usa os SDKs de producao. Isso fica para a etapa em que as credenciais forem definidas.

## Contratos criados

### CatalogStore

Arquivo: `lib/catalog/store.ts`

Responsavel por:

- listar obras persistidas;
- salvar uma obra;
- esconder se os dados estao em JSON local ou Postgres.

Providers planejados:

- `local`: implementado.
- `postgres`: reservado para a proxima etapa de banco.

### AssetStorage

Arquivos:

- `lib/storage/types.ts`
- `lib/storage/local-storage.ts`
- `lib/storage/index.ts`

Responsavel por:

- receber um `File`;
- salvar o arquivo no destino correto;
- devolver `url`, `storageKey`, `mimeType` e `sizeBytes`.

Providers planejados:

- `local`: implementado.
- `vercel-blob`: reservado para a proxima etapa de storage.

## Variaveis

```text
CATALOG_STORE_PROVIDER=local
ASSET_STORAGE_PROVIDER=local
DATABASE_URL=postgresql://usuario:senha@host.neon.tech/database?sslmode=require
BLOB_READ_WRITE_TOKEN=vercel_blob_token_placeholder
```

## Schema SQL

O schema inicial esta em `db/schema.sql`.

Tabelas:

- `books`
- `book_contributors`
- `book_assets`
- `reader_pages`

## Proxima etapa sugerida

Implementar o adapter Postgres do `CatalogStore`, instalar o cliente escolhido e criar um script para aplicar `db/schema.sql`.
