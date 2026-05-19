import pg from "pg";

const { Pool } = pg;

let pool;

export function getPool() {
  if (!process.env.DATABASE_URL) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }

  return pool;
}

export function mapBook(row) {
  return {
    id: row.slug,
    title: row.title,
    author: row.author,
    category: row.category,
    age: row.age_range,
    format: row.format,
    time: row.reading_time,
    featured: row.featured,
    colors: row.colors,
    ink: row.ink,
    pdfUrl: row.pdf_url || "",
    description: row.description,
    excerpt: row.excerpt
  };
}
