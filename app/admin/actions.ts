"use server";

import { revalidatePath } from "next/cache";

import { mockBooks } from "@/lib/catalog/mock-books";
import { createUniqueSlug } from "@/lib/catalog/slug";
import { getCatalogStore } from "@/lib/catalog/store";
import type { BookRecord } from "@/lib/catalog/types";
import { getAssetStorage } from "@/lib/storage";

export type UploadBookState = {
  status: "idle" | "success" | "error";
  message: string;
  slug?: string;
};

export async function uploadBookAction(
  _previousState: UploadBookState,
  formData: FormData,
): Promise<UploadBookState> {
  const title = readText(formData, "title");
  const author = readText(formData, "author");
  const illustrator = readText(formData, "illustrator");
  const ageRange = readText(formData, "ageRange");
  const category = readText(formData, "category");
  const description = readText(formData, "description");
  const tags = readText(formData, "tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const coverFile = readFileInput(formData, "cover");
  const pdfFile = readFileInput(formData, "pdf");

  if (!title || !author || !ageRange || !category || !description) {
    return {
      status: "error",
      message: "Preencha titulo, autoria, faixa etaria, categoria e descricao.",
    };
  }

  if (!coverFile || !pdfFile) {
    return {
      status: "error",
      message: "Selecione uma capa e um PDF para publicar a obra.",
    };
  }

  if (pdfFile.type !== "application/pdf") {
    return {
      status: "error",
      message: "O arquivo principal precisa ser um PDF.",
    };
  }

  if (!coverFile.type.startsWith("image/")) {
    return {
      status: "error",
      message: "A capa precisa ser uma imagem.",
    };
  }

  const catalogStore = getCatalogStore();
  const assetStorage = getAssetStorage();
  const existingBooks = [...mockBooks, ...(await catalogStore.listBooks())];
  const slug = createUniqueSlug(
    title,
    existingBooks.map((book) => book.slug),
  );
  const coverAsset = await assetStorage.storeAsset({
    file: coverFile,
    bookSlug: slug,
    kind: "cover",
    preferredName: "cover",
    altText: `Capa de ${title}.`,
  });
  const pdfAsset = await assetStorage.storeAsset({
    file: pdfFile,
    bookSlug: slug,
    kind: "pdf",
    preferredName: "book",
  });

  const now = new Date().toISOString();
  const book: BookRecord = {
    id: `book-${crypto.randomUUID()}`,
    slug,
    status: "published",
    title,
    description,
    language: "pt-BR",
    ageRange,
    categories: [category],
    tags,
    contributors: [
      { id: `contributor-${crypto.randomUUID()}`, name: author, role: "author" },
      ...(illustrator
        ? [{ id: `contributor-${crypto.randomUUID()}`, name: illustrator, role: "illustrator" as const }]
        : []),
    ],
    assets: {
      cover: {
        id: `asset-${crypto.randomUUID()}`,
        kind: "cover",
        url: coverAsset.url,
        altText: coverAsset.altText,
        storageKey: coverAsset.storageKey,
        mimeType: coverAsset.mimeType,
        sizeBytes: coverAsset.sizeBytes,
      },
      pdf: {
        id: `asset-${crypto.randomUUID()}`,
        kind: "pdf",
        url: pdfAsset.url,
        storageKey: pdfAsset.storageKey,
        mimeType: pdfAsset.mimeType,
        sizeBytes: pdfAsset.sizeBytes,
      },
    },
    readerPages: [
      {
        id: `page-${crypto.randomUUID()}`,
        order: 1,
        image: {
          id: `asset-${crypto.randomUUID()}`,
          kind: "reader-page",
          url: coverAsset.url,
          altText: `Previa visual de ${title}.`,
          storageKey: coverAsset.storageKey,
          mimeType: coverAsset.mimeType,
          sizeBytes: coverAsset.sizeBytes,
        },
        transcript: description,
      },
    ],
    rights: {
      licenseLabel: "Uso educacional mediante aceite dos termos",
      allowDownload: true,
      requireTermsAcceptance: true,
    },
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  };

  await catalogStore.saveBook(book);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/books/${slug}`);
  revalidatePath(`/read/${slug}`);

  return {
    status: "success",
    message: "Obra publicada no catalogo.",
    slug,
  };
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readFileInput(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : undefined;
}
