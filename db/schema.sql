create table if not exists books (
  id text primary key,
  slug text not null unique,
  status text not null check (status in ('draft', 'published', 'archived')),
  title text not null,
  subtitle text,
  description text not null,
  language text not null default 'pt-BR',
  age_range text not null,
  categories text[] not null default '{}',
  tags text[] not null default '{}',
  rights jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists books_status_idx on books (status);
create index if not exists books_slug_idx on books (slug);

create table if not exists book_contributors (
  id text primary key,
  book_id text not null references books(id) on delete cascade,
  name text not null,
  role text not null check (role in ('author', 'illustrator', 'editor', 'translator')),
  display_order integer not null default 0
);

create index if not exists book_contributors_book_id_idx on book_contributors (book_id);

create table if not exists book_assets (
  id text primary key,
  book_id text not null references books(id) on delete cascade,
  kind text not null check (kind in ('cover', 'pdf', 'reader-page')),
  url text not null,
  alt_text text,
  storage_key text,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index if not exists book_assets_book_id_idx on book_assets (book_id);
create index if not exists book_assets_kind_idx on book_assets (kind);

create table if not exists reader_pages (
  id text primary key,
  book_id text not null references books(id) on delete cascade,
  image_asset_id text not null references book_assets(id) on delete restrict,
  page_order integer not null,
  transcript text not null default '',
  unique (book_id, page_order)
);

create index if not exists reader_pages_book_id_idx on reader_pages (book_id);
