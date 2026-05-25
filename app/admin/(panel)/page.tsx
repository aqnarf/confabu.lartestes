import { BookMarked, Database, FileUp } from "lucide-react";

import { UploadDropzone } from "@/components/admin/upload-dropzone";
import { BookImageEditor } from "@/components/admin/book-image-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listPublishedBooks } from "@/lib/books";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const books = await listPublishedBooks();
  const localBooks = books.filter((book) => book.assets.pdf.storageKey?.startsWith("local:"));
  const stats = [
    { label: "Obras publicadas", value: String(books.length), icon: BookMarked },
    { label: "Uploads locais", value: String(localBooks.length), icon: FileUp },
    { label: "Storage", value: "local", icon: Database },
  ];

  return (
    <main className="container py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Painel simplificado</p>
          <h1 className="text-4xl font-semibold tracking-normal">Adicionar PDFs ilustrados sem atrito.</h1>
          <p className="text-base leading-7 text-muted-foreground">
            Primeira versao do admin para cadastrar obra, capa e arquivo principal em uma persistencia local de prototipo.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <UploadDropzone />
      <div className="mt-6">
        <BookImageEditor
          books={books.map((book) => ({
            slug: book.slug,
            title: book.title,
            hasBackCover: Boolean(book.assets.backCover),
          }))}
        />
      </div>
    </main>
  );
}
