"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

import { readLocalBooks, saveLocalBook } from "@/lib/catalog/local-store";
import { mockBooks } from "@/lib/catalog/mock-books";
import { createUniqueSlug } from "@/lib/catalog/slug";
import type { BookRecord } from "@/lib/catalog/types";

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

  const existingBooks = [...mockBooks, ...(await readLocalBooks())];
  const slug = createUniqueSlug(
    title,
    existingBooks.map((book) => book.slug),
  );
  const uploadDirectory = path.join(process.cwd(), "public", "uploads", slug);
  const publicDirectory = `/uploads/${slug}`;

  await mkdir(uploadDirectory, { recursive: true });

  const coverExtension = extensionForFile(coverFile, "jpg");
  const pdfExtension = extensionForFile(pdfFile, "pdf");
  const coverFileName = `cover.${coverExtension}`;
  const pdfFileName = `book.${pdfExtension}`;

  await writeUploadedFile(coverFile, path.join(uploadDirectory, coverFileName));
  await writeUploadedFile(pdfFile, path.join(uploadDirectory, pdfFileName));

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
        url: `${publicDirectory}/${coverFileName}`,
        altText: `Capa de ${title}.`,
        storageKey: `local:${slug}/${coverFileName}`,
        mimeType: coverFile.type,
        sizeBytes: coverFile.size,
      },
      pdf: {
        id: `asset-${crypto.randomUUID()}`,
        kind: "pdf",
        url: `${publicDirectory}/${pdfFileName}`,
        storageKey: `local:${slug}/${pdfFileName}`,
        mimeType: pdfFile.type,
        sizeBytes: pdfFile.size,
      },
    },
    readerPages: [
      {
        id: `page-${crypto.randomUUID()}`,
        order: 1,
        image: {
          id: `asset-${crypto.randomUUID()}`,
          kind: "reader-page",
          url: `${publicDirectory}/${coverFileName}`,
          altText: `Previa visual de ${title}.`,
          storageKey: `local:${slug}/${coverFileName}`,
          mimeType: coverFile.type,
          sizeBytes: coverFile.size,
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

  await saveLocalBook(book);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/books/${slug}`);
  revalidatePath(`/read/${slug}`);

  return {
    status: "success",
    message: "Obra publicada no catalogo local.",
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

function extensionForFile(file: File, fallback: string) {
  const extensionFromName = file.name.split(".").pop()?.toLowerCase();

  if (extensionFromName && extensionFromName.length <= 8) {
    return extensionFromName;
  }

  return file.type.split("/").pop() ?? fallback;
}

async function writeUploadedFile(file: File, destination: string) {
  const bytes = await file.arrayBuffer();
  await writeFile(destination, Buffer.from(bytes));
}
