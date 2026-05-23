import { BookMarked, Database, FileUp } from "lucide-react";

import { UploadDropzone } from "@/components/admin/upload-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Obras no prototipo", value: "3", icon: BookMarked },
  { label: "Fila de uploads", value: "0", icon: FileUp },
  { label: "Storage", value: "local", icon: Database },
];

export default function AdminPage() {
  return (
    <main className="container py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Painel simplificado</p>
          <h1 className="text-4xl font-semibold tracking-normal">Adicionar PDFs ilustrados sem atrito.</h1>
          <p className="text-base leading-7 text-muted-foreground">
            Primeira versao do admin para cadastrar obra, capa e arquivo principal. A camada de persistencia pode ser conectada ao storage e banco na proxima etapa.
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
    </main>
  );
}
