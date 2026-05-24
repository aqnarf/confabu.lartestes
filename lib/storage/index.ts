import { localAssetStorage } from "@/lib/storage/local-storage";
import type { AssetStorage, StorageProvider } from "@/lib/storage/types";

export function getAssetStorage(): AssetStorage {
  const provider = getStorageProvider();

  if (provider === "local") {
    return localAssetStorage;
  }

  throw new Error("Vercel Blob storage is not configured yet. Use ASSET_STORAGE_PROVIDER=local.");
}

function getStorageProvider(): StorageProvider {
  const provider = process.env.ASSET_STORAGE_PROVIDER;

  if (provider === "vercel-blob") {
    return provider;
  }

  return "local";
}
