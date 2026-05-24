import { readLocalBooks, saveLocalBook } from "@/lib/catalog/local-store";
import type { BookRecord } from "@/lib/catalog/types";

export type CatalogStoreProvider = "local" | "postgres";

export type CatalogStore = {
  provider: CatalogStoreProvider;
  listBooks(): Promise<BookRecord[]>;
  saveBook(book: BookRecord): Promise<BookRecord>;
};

const localCatalogStore: CatalogStore = {
  provider: "local",
  listBooks: readLocalBooks,
  saveBook: saveLocalBook,
};

export function getCatalogStore(): CatalogStore {
  const provider = getCatalogStoreProvider();

  if (provider === "local") {
    return localCatalogStore;
  }

  throw new Error("Postgres catalog store is not configured yet. Use CATALOG_STORE_PROVIDER=local.");
}

function getCatalogStoreProvider(): CatalogStoreProvider {
  const provider = process.env.CATALOG_STORE_PROVIDER;

  if (provider === "postgres") {
    return provider;
  }

  return "local";
}
