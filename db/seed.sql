insert into books (
  slug,
  title,
  author,
  category,
  age_range,
  format,
  reading_time,
  featured,
  colors,
  ink,
  pdf_url,
  description,
  excerpt
) values
(
  'jardim-das-perguntas',
  'O Jardim das Perguntas',
  'Lia Moreno',
  'Imaginação',
  '6 a 8 anos',
  'Ilustrado',
  '12 min',
  true,
  '["#d8f0e4", "#ff8e78"]',
  '#16382f',
  null,
  'Uma menina descobre que cada pergunta plantada no quintal vira uma flor diferente.',
  '[
    "No fim da rua havia um portão pequeno, sempre encostado. Nina achava que ele guardava um jardim comum, com folhas comuns e caminhos comuns. Mas bastou perguntar em voz alta por que o céu mudava de cor para uma flor azul se abrir diante dela.",
    "A flor não respondeu com palavras. Ela balançou devagar e soltou um brilho macio, como se dissesse que algumas respostas precisam crescer antes de aparecer.",
    "Naquele dia, Nina voltou para casa com terra nos sapatos e uma vontade enorme de fazer perguntas novas."
  ]'
)
on conflict (slug) do update set
  title = excluded.title,
  author = excluded.author,
  category = excluded.category,
  age_range = excluded.age_range,
  format = excluded.format,
  reading_time = excluded.reading_time,
  featured = excluded.featured,
  colors = excluded.colors,
  ink = excluded.ink,
  pdf_url = excluded.pdf_url,
  description = excluded.description,
  excerpt = excluded.excerpt,
  updated_at = now();
