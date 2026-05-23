"use client";

import { useMemo, useState } from "react";
import { FileUp, ImagePlus, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

type UploadState = {
  pdf?: File;
  cover?: File;
};

export function UploadDropzone() {
  const [files, setFiles] = useState<UploadState>({});

  const completion = useMemo(() => {
    const fields = [files.pdf, files.cover].filter(Boolean).length;
    return fields * 50;
  }, [files]);

  return (
    <Card>
      <CardContent className="grid gap-6 p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <FileInput
            id="pdf"
            title="PDF ilustrado"
            description={files.pdf?.name ?? "Arraste ou selecione o arquivo principal"}
            accept="application/pdf"
            icon={<FileUp className="size-5" />}
            onChange={(file) => setFiles((current) => ({ ...current, pdf: file }))}
          />
          <FileInput
            id="cover"
            title="Capa"
            description={files.cover?.name ?? "Imagem de capa em JPG, PNG ou WebP"}
            accept="image/png,image/jpeg,image/webp"
            icon={<ImagePlus className="size-5" />}
            onChange={(file) => setFiles((current) => ({ ...current, cover: file }))}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titulo</Label>
            <Input id="title" placeholder="Nome da obra" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Autoria</Label>
            <Input id="author" placeholder="Pessoa autora" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="illustrator">Ilustracao</Label>
            <Input id="illustrator" placeholder="Pessoa ilustradora" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ageRange">Faixa etaria</Label>
            <Input id="ageRange" placeholder="Ex.: 6 a 9 anos" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Descricao curta</Label>
            <Textarea id="description" placeholder="Resumo para a pagina da obra" />
          </div>
        </div>

        <div className="space-y-3 rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Preparacao do upload</p>
              <p className="text-sm text-muted-foreground">Base visual para ligar depois ao storage e banco.</p>
            </div>
            <span className="text-sm font-medium">{completion}%</span>
          </div>
          <Progress value={completion} />
        </div>

        <div className="flex justify-end">
          <Button disabled={completion < 100}>
            <UploadCloud className="size-4" />
            Publicar obra
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FileInput({
  id,
  title,
  description,
  accept,
  icon,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  accept: string;
  icon: React.ReactNode;
  onChange: (file: File | undefined) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-40 cursor-pointer flex-col justify-between rounded-lg border border-dashed bg-background p-5 transition-colors hover:border-primary hover:bg-accent/20"
    >
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => onChange(event.target.files?.[0])}
      />
      <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
        {icon}
      </span>
      <span>
        <span className="block font-medium">{title}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}
