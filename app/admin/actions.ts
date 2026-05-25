"use server";

import { revalidatePath } from "next/cache";

import { mockBooks } from "@/lib/catalog/mock-books";
import { createUniqueSlug } from "@/lib/catalog/slug";
import { getCatalogStore } from "@/lib/catalog/store";
import type { BookAsset, BookRecord } from "@/lib/catalog/types";
import { getPublishedBookBySlug } from "@/lib/books";
import { getAssetStorage } from "@/lib/storage";
import type { StoredAsset } from "@/lib/storage/types";

export type UploadBookState = {
  status: "idle" | "success" | "error";
  message: string;
  slug?: string;
};

export type UpdateBookImagesState = {
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
  const backCoverFile = readFileInput(formData, "backCover");
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

  if (backCoverFile && !backCoverFile.type.startsWith("image/")) {
    return {
      status: "error",
      message: "A contracapa precisa ser uma imagem.",
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
  const backCoverAsset = backCoverFile
    ? await assetStorage.storeAsset({
        file: backCoverFile,
        bookSlug: slug,
        kind: "back-cover",
        preferredName: "back-cover",
        altText: `Contracapa de ${title}.`,
      })
    : undefined;

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
        ...toBookAsset(coverAsset, "cover"),
      },
      ...(backCoverAsset ? { backCover: toBookAsset(backCoverAsset, "back-cover") } : {}),
      pdf: {
        ...toBookAsset(pdfAsset, "pdf"),
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

export async function updateBookImagesAction(
  _previousState: UpdateBookImagesState,
  formData: FormData,
): Promise<UpdateBookImagesState> {
  const slug = readText(formData, "slug");
  const coverFile = readFileInput(formData, "replacementCover");
  const backCoverFile = readFileInput(formData, "replacementBackCover");

  if (!slug) {
    return { status: "error", message: "Selecione uma obra para atualizar." };
  }

  if (!coverFile && !backCoverFile) {
    return { status: "error", message: "Selecione uma nova capa ou contracapa." };
  }

  if ((coverFile && !coverFile.type.startsWith("image/")) || (backCoverFile && !backCoverFile.type.startsWith("image/"))) {
    return { status: "error", message: "Capa e contracapa precisam ser imagens." };
  }

  const book = await getPublishedBookBySlug(slug);

  if (!book) {
    return { status: "error", message: "A obra selecionada não foi encontrada." };
  }

  const assetStorage = getAssetStorage();
  const catalogStore = getCatalogStore();
  const coverAsset = coverFile
    ? await assetStorage.storeAsset({
        file: coverFile,
        bookSlug: slug,
        kind: "cover",
        preferredName: "cover",
        altText: `Capa de ${book.title}.`,
      })
    : undefined;
  const backCoverAsset = backCoverFile
    ? await assetStorage.storeAsset({
        file: backCoverFile,
        bookSlug: slug,
        kind: "back-cover",
        preferredName: "back-cover",
        altText: `Contracapa de ${book.title}.`,
      })
    : undefined;

  const updatedBook: BookRecord = {
    ...book,
    assets: {
      ...book.assets,
      ...(coverAsset ? { cover: toBookAsset(coverAsset, "cover") } : {}),
      ...(backCoverAsset ? { backCover: toBookAsset(backCoverAsset, "back-cover") } : {}),
    },
    updatedAt: new Date().toISOString(),
  };

  await catalogStore.saveBook(updatedBook);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/books/${slug}`);
  revalidatePath(`/read/${slug}`);

  return {
    status: "success",
    message: "Imagens da obra atualizadas.",
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

function toBookAsset(asset: StoredAsset, kind: BookAsset["kind"]): BookAsset {
  return {
    id: `asset-${crypto.randomUUID()}`,
    kind,
    url: asset.url,
    altText: asset.altText,
    storageKey: asset.storageKey,
    mimeType: asset.mimeType,
    sizeBytes: asset.sizeBytes,
  };
}
