import { getPool } from "./_db.js";

export default async function handler(_request, response) {
  const pool = getPool();

  if (!pool) {
    response.status(503).json({ ok: false, database: "missing" });
    return;
  }

  try {
    await pool.query("select 1");
    response.status(200).json({ ok: true, database: "connected" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ ok: false, database: "error" });
  }
}
