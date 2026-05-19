import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Client } = pg;
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL nao configurada.");
  process.exit(1);
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

try {
  await client.connect();
  const schema = await fs.readFile(path.join(root, "db", "schema.sql"), "utf8");
  const seed = await fs.readFile(path.join(root, "db", "seed.sql"), "utf8");

  await client.query(schema);
  await client.query(seed);

  console.log("Banco configurado com sucesso.");
} catch (error) {
  console.error("Falha ao configurar banco.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
