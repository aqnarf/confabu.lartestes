# AGENTS.md

## Projeto

Este repositório contém a estante virtual do projeto `confabu.lab`, voltada para literatura para infância. O site apresenta obras, busca por categorias, página individual do livro, leitor online e download com termos de uso.

O projeto ainda está em fase de protótipo visual. Ao fazer mudanças, preserve a direção de design definida no Figma e evite refatorações grandes sem necessidade.

## Estrutura Principal

- `index.html`: página inicial da estante.
- `busca.html`: página de busca e filtros.
- `livro.html`: página individual da obra.
- `leitor.html`: leitor online, preparado para PDFs.
- `termos.html`: modelo de Termos de Uso e Direitos Autorais.
- `styles.css`: estilos globais.
- `app.js`: dados locais de fallback e comportamento do front-end.
- `server.js`: servidor local Express.
- `api/`: funções serverless usadas na Vercel.
- `db/schema.sql`: estrutura da tabela `books`.
- `db/seed.sql`: dados iniciais de exemplo.
- `scripts/setup-db.js`: aplica schema e seed no Neon.

## Comandos

Use `npm.cmd` no Windows se o PowerShell bloquear `npm`.

```bash
npm.cmd install
npm.cmd start
npm.cmd run dev
npm.cmd run db:setup
```

- `npm.cmd start`: inicia o servidor local em `http://localhost:3000`.
- `npm.cmd run dev`: inicia em modo desenvolvimento.
- `npm.cmd run db:setup`: aplica `schema.sql` e `seed.sql` no Neon.

Também existe `start-local.cmd` para iniciar o servidor local com duplo clique.

## Banco de Dados

O banco usa Neon/PostgreSQL. A connection string deve ficar apenas no `.env` local e nas variáveis de ambiente da Vercel.

Nunca versionar:

- `.env`
- senhas
- connection strings reais

O `.env.example` deve conter apenas placeholders.

## Vercel

O deploy usa arquivos estáticos para as páginas e funções serverless em `api/`.

Variável obrigatória na Vercel:

```text
DATABASE_URL
```

Se a API não conectar, testar:

```text
/api/health
/api/books
```

## Design e UX

- Manter a linguagem visual moderna, simples e lúdica, sem perder organização.
- A home deve focar na estante virtual, não no projeto institucional completo.
- A página individual deve priorizar: informações da obra, capa, ações de leitura/download e recomendações.
- O leitor online deve ficar em página própria.
- Considerar que capas e PDFs terão formatos variados; não esticar capas.
- Downloads devem passar por aceite de Termos de Uso e Direitos Autorais.

## Cuidados Técnicos

- O site deve continuar funcionando com dados locais de fallback em `app.js` quando aberto sem API.
- Quando rodando via servidor, o front tenta carregar `/api/books`.
- Antes de finalizar mudanças em JavaScript, rodar:

```bash
node --check app.js
node --check server.js
```

Se editar funções da Vercel:

```bash
node --check api/books.js
node --check api/health.js
```

## Git

Não reverter alterações de outras pessoas sem autorização. O projeto pode receber alterações visuais vindas do Figma/MCP.

Commits devem ser pequenos e descrever a intenção da mudança.
