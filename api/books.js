import { getPool, mapBook } from "./_db.js";

export default async function handler(_request, response) {
  const pool = getPool();

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

    response.status(200).json(result.rows.map(mapBook));
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Nao foi possivel carregar as obras." });
  }
}
