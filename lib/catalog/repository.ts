import { mockBooks } from "@/lib/catalog/mock-books";
import { getCatalogStore } from "@/lib/catalog/store";
import type { BookRecord, ContributorRole } from "@/lib/catalog/types";

export async function listPublishedBooks(): Promise<BookRecord[]> {
  const books = await listAllBooks();

  return books
    .filter((book) => book.status === "published")
    .sort((first, second) => first.title.localeCompare(second.title, "pt-BR"));
}

export async function getPublishedBookBySlug(slug: string): Promise<BookRecord | undefined> {
  const books = await listAllBooks();
  return books.find((book) => book.slug === slug && book.status === "published");
}

export async function listBookSlugs() {
  const books = await listAllBooks();

  return books
    .filter((book) => book.status === "published")
    .map((book) => ({ slug: book.slug }));
}

export async function listAllBooks(): Promise<BookRecord[]> {
  const localBooks = await getCatalogStore().listBooks();
  const localSlugs = new Set(localBooks.map((book) => book.slug));

  return [...localBooks, ...mockBooks.filter((book) => !localSlugs.has(book.slug))];
}

export function getPrimaryCategory(book: BookRecord) {
  return book.categories[0] ?? "Sem categoria";
}

export function getContributorNames(book: BookRecord, role: ContributorRole) {
  return book.contributors
    .filter((contributor) => contributor.role === role)
    .map((contributor) => contributor.name);
}

export function getContributorLine(book: BookRecord) {
  const authors = getContributorNames(book, "author").join(", ");
  const illustrators = getContributorNames(book, "illustrator").join(", ");

  if (authors && illustrators) {
    return `${authors} - ilustrações de ${illustrators}`;
  }

  return authors || illustrators || "Autoria em revisão";
}
