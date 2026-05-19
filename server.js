import "dotenv/config";
import express from "express";
import pg from "pg";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { authRealm, hasAuthConfig, validateBasicAuth } from "./auth.js";

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;
const root = path.dirname(fileURLToPath(import.meta.url));

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;

function basicAuth(request, response, next) {
  if (!hasAuthConfig() || validateBasicAuth(request.headers.authorization)) {
    next();
    return;
  }

  response.set("WWW-Authenticate", `Basic realm="${authRealm}", charset="UTF-8"`);
  response.status(401).send("Autenticacao necessaria.");
}

app.use(express.json());
app.use(basicAuth);
app.use(express.static(root));
app.get("/", (_request, response) => {
  response.sendFile(path.join(root, "index.html"));
});

function mapBook(row) {
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

app.get("/api/books", async (_request, response) => {
  if (!pool) {
    response.status(503).json({ error: "DATABASE_URL nao configurada." });
    return;
  }

  try {
    const result = await pool.query(`
      select
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
      from books
      order by featured desc, title asc
    `);

    response.json(result.rows.map(mapBook));
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Nao foi possivel carregar as obras." });
  }
});

app.get("/api/health", async (_request, response) => {
  if (!pool) {
    response.status(503).json({ ok: false, database: "missing" });
    return;
  }

  try {
    await pool.query("select 1");
    response.json({ ok: true, database: "connected" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ ok: false, database: "error" });
  }
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Estante Infantil em http://localhost:${port}`);
  });
}

export default app;
