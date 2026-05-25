"use client";

import Link from "next/link";
import { useActionState, useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, FileUp, ImagePlus, UploadCloud } from "lucide-react";

import { uploadBookAction, type UploadBookState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

type UploadState = {
  pdf?: File;
  cover?: File;
  backCover?: File;
};

const initialState: UploadBookState = {
  status: "idle",
  message: "",
};

export function UploadDropzone() {
  const [files, setFiles] = useState<UploadState>({});
  const [state, formAction, isPending] = useActionState(uploadBookAction, initialState);

  const completion = useMemo(() => {
    const fields = [files.pdf, files.cover].filter(Boolean).length;
    return fields * 50;
  }, [files]);

  return (
    <Card>
      <CardContent className="p-6">
        <form action={formAction} className="grid gap-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <FileInput
              id="pdf"
              name="pdf"
              title="PDF ilustrado"
              description={files.pdf?.name ?? "Arraste ou selecione o arquivo principal"}
              accept="application/pdf"
              icon={<FileUp className="size-5" />}
              onChange={(file) => setFiles((current) => ({ ...current, pdf: file }))}
            />
            <FileInput
              id="cover"
              name="cover"
              title="Capa"
              description={files.cover?.name ?? "Imagem de capa em JPG, PNG ou WebP"}
              accept="image/png,image/jpeg,image/webp"
              icon={<ImagePlus className="size-5" />}
              onChange={(file) => setFiles((current) => ({ ...current, cover: file }))}
            />
            <FileInput
              id="backCover"
              name="backCover"
              title="Contracapa (opcional)"
              description={files.backCover?.name ?? "Imagem do verso para visualização em giro"}
              accept="image/png,image/jpeg,image/webp"
              icon={<ImagePlus className="size-5" />}
              onChange={(file) => setFiles((current) => ({ ...current, backCover: file }))}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titulo</Label>
              <Input id="title" name="title" placeholder="Nome da obra" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Autoria</Label>
              <Input id="author" name="author" placeholder="Pessoa autora" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="illustrator">Ilustracao</Label>
              <Input id="illustrator" name="illustrator" placeholder="Pessoa ilustradora" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageRange">Faixa etaria</Label>
              <Input id="ageRange" name="ageRange" placeholder="Ex.: 6 a 9 anos" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" name="category" placeholder="Ex.: Conto ilustrado" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" name="tags" placeholder="Separe por virgulas" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descricao curta</Label>
              <Textarea id="description" name="description" placeholder="Resumo para a pagina da obra" required />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Preparacao do upload</p>
                <p className="text-sm text-muted-foreground">Arquivos serao salvos localmente para validar o fluxo.</p>
              </div>
              <span className="text-sm font-medium">{completion}%</span>
            </div>
            <Progress value={completion} />
          </div>

          {state.status !== "idle" ? (
            <div
              className={
                state.status === "success"
                  ? "rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm"
                  : "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm"
              }
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 font-medium">
                  {state.status === "success" ? <CheckCircle2 className="size-4" /> : null}
                  {state.message}
                </p>
                {state.slug ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/books/${state.slug}`}>Ver obra</Link>
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="flex justify-end">
            <Button disabled={completion < 100 || isPending}>
              <UploadCloud className="size-4" />
              {isPending ? "Publicando..." : "Publicar obra"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function FileInput({
  id,
  name,
  title,
  description,
  accept,
  icon,
  onChange,
}: {
  id: string;
  name: string;
  title: string;
  description: string;
  accept: string;
  icon: ReactNode;
  onChange: (file: File | undefined) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-40 cursor-pointer flex-col justify-between rounded-lg border border-dashed bg-background p-5 transition-colors hover:border-primary hover:bg-accent/20"
    >
      <input
        id={id}
        name={name}
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
