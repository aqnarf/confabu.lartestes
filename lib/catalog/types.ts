export type BookStatus = "draft" | "published" | "archived";

export type ContributorRole = "author" | "illustrator" | "editor" | "translator";

export type AssetKind = "cover" | "pdf" | "reader-page";

export type BookAsset = {
  id: string;
  kind: AssetKind;
  url: string;
  altText?: string;
  storageKey?: string;
  mimeType?: string;
  sizeBytes?: number;
};

export type BookContributor = {
  id: string;
  name: string;
  role: ContributorRole;
};

export type ReaderPage = {
  id: string;
  order: number;
  image: BookAsset;
  transcript: string;
};

export type BookRights = {
  licenseLabel: string;
  allowDownload: boolean;
  requireTermsAcceptance: boolean;
};

export type BookRecord = {
  id: string;
  slug: string;
  status: BookStatus;
  title: string;
  subtitle?: string;
  description: string;
  language: "pt-BR";
  ageRange: string;
  categories: string[];
  tags: string[];
  contributors: BookContributor[];
  assets: {
    cover: BookAsset;
    pdf: BookAsset;
  };
  readerPages: ReaderPage[];
  rights: BookRights;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type BookCreateInput = {
  title: string;
  subtitle?: string;
  description: string;
  ageRange: string;
  categories: string[];
  tags?: string[];
  contributors: Array<Omit<BookContributor, "id">>;
  coverFile: File;
  pdfFile: File;
  rights: BookRights;
};
