import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { BookRecord } from "@/lib/catalog/types";

const dataDirectory = path.join(process.cwd(), ".data");
const booksFile = path.join(dataDirectory, "books.json");

export async function readLocalBooks(): Promise<BookRecord[]> {
  try {
    const contents = await readFile(booksFile, "utf8");
    return JSON.parse(contents) as BookRecord[];
  } catch (error) {
    if (isFileNotFound(error)) {
      return [];
    }

    throw error;
  }
}

export async function saveLocalBook(book: BookRecord) {
  const books = await readLocalBooks();
  const nextBooks = [book, ...books.filter((currentBook) => currentBook.id !== book.id)];

  await mkdir(dataDirectory, { recursive: true });
  await writeFile(booksFile, `${JSON.stringify(nextBooks, null, 2)}\n`, "utf8");

  return book;
}

function isFileNotFound(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
