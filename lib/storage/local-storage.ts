import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { AssetStorage, StoreAssetInput } from "@/lib/storage/types";

export const localAssetStorage: AssetStorage = {
  provider: "local",
  async storeAsset(input) {
    const fileName = createStoredFileName(input);
    const uploadDirectory = path.join(process.cwd(), "public", "uploads", input.bookSlug);
    const destination = path.join(uploadDirectory, fileName);

    await mkdir(uploadDirectory, { recursive: true });

    const bytes = await input.file.arrayBuffer();
    await writeFile(destination, Buffer.from(bytes));

    return {
      url: `/uploads/${input.bookSlug}/${fileName}`,
      storageKey: `local:${input.bookSlug}/${fileName}`,
      mimeType: input.file.type,
      sizeBytes: input.file.size,
      altText: input.altText,
    };
  },
};

function createStoredFileName(input: StoreAssetInput) {
  const extension = extensionForFile(input.file, input.kind === "pdf" ? "pdf" : "jpg");
  const safeName = input.preferredName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${safeName || input.kind}.${extension}`;
}

function extensionForFile(file: File, fallback: string) {
  const extensionFromName = file.name.split(".").pop()?.toLowerCase();

  if (extensionFromName && extensionFromName.length <= 8) {
    return extensionFromName;
  }

  return file.type.split("/").pop() ?? fallback;
}
