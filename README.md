# confabu.lab biblioteca

Biblioteca virtual de PDFs ilustrados para o projeto `confabu.lab`, voltada para leitura publica de obras e um fluxo simples de administracao para envio de arquivos.

Esta branch reinicia a estrutura do prototipo usando Next.js, Tailwind CSS e shadcn/ui. A intencao e manter uma base limpa para evoluir duas frentes principais:

- um e-reader publico com experiencia de livro folheavel usando `react-pageflip`;
- uma alternativa de leitura acessivel em rolagem continua;
- um painel `/admin` simplificado para upload de PDF, capa e metadados da obra.

## Stack

- Next.js 15 com App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- lucide-react
- react-pageflip
- react-pdf e pdfjs-dist

## Rotas

- `/`: acervo inicial da biblioteca.
- `/books/[slug]`: pagina individual da obra.
- `/read/[slug]`: leitor online com alternancia entre page flip e rolagem acessivel.
- `/admin`: painel simplificado para cadastro visual de uma obra.

## Estrutura

```text
app/
  admin/
  books/[slug]/
  read/[slug]/
  globals.css
  layout.tsx
  page.tsx
components/
  admin/
  reader/
  ui/
lib/
  books.ts
  utils.ts
```

## Como rodar

Instale as dependencias:

```bash
npm.cmd install
```

Inicie o servidor local:

```bash
npm.cmd run dev
```

Abra:

```text
http://localhost:3000
```

## Verificacoes

Antes de finalizar mudancas, rode:

```bash
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

## Estado atual

O projeto ainda usa dados locais de prototipo em `lib/books.ts`. O painel `/admin` ja tem a interface inicial de upload, mas ainda nao persiste arquivos nem metadados.

O modelo inicial de dados da obra esta documentado em `docs/data-model.md`.

O fluxo local de upload do admin esta documentado em `docs/local-upload-flow.md`.

O plano de persistencia de producao esta documentado em `docs/persistence-plan.md`.

O acesso protegido do admin esta documentado em `docs/admin-auth.md`.

O fluxo legal de termos e aceite esta documentado em `docs/legal-flow.md`.

A direcao visual publica e a proposta futura do hero estao documentadas em `docs/public-visual-roadmap.md`.

Proximos passos naturais:

- implementar o adapter Postgres do catalogo;
- implementar o adapter Vercel Blob para arquivos;
- definir o banco de dados do acervo;
- renderizar paginas reais a partir de PDFs enviados;
- adicionar autenticacao para `/admin`;
- criar aceite de termos antes de downloads publicos.
