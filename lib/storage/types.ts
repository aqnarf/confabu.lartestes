import type { AssetKind } from "@/lib/catalog/types";

export type StorageProvider = "local" | "vercel-blob";

export type StoreAssetInput = {
  file: File;
  bookSlug: string;
  kind: AssetKind;
  preferredName: string;
  altText?: string;
};

export type StoredAsset = {
  url: string;
  storageKey: string;
  mimeType: string;
  sizeBytes: number;
  altText?: string;
};

export type AssetStorage = {
  provider: StorageProvider;
  storeAsset(input: StoreAssetInput): Promise<StoredAsset>;
};
