create table if not exists books (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  author text not null,
  category text not null,
  age_range text not null,
  format text not null,
  reading_time text not null,
  featured boolean not null default false,
  colors jsonb not null default '["#d8f0e4", "#ff8e78"]',
  ink text not null default '#101113',
  pdf_url text,
  description text not null,
  excerpt jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists books_category_idx on books (category);
create index if not exists books_age_range_idx on books (age_range);
create index if not exists books_format_idx on books (format);
create index if not exists books_featured_idx on books (featured);
