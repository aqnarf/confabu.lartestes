"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CheckCircle2, ImagePlus, RefreshCw } from "lucide-react";

import { updateBookImagesAction, type UpdateBookImagesState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditableBook = {
  slug: string;
  title: string;
  hasBackCover: boolean;
};

const initialState: UpdateBookImagesState = {
  status: "idle",
  message: "",
};

export function BookImageEditor({ books }: { books: EditableBook[] }) {
  const [state, formAction, isPending] = useActionState(updateBookImagesAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImagePlus className="size-5 text-primary" />
          Atualizar capa e contracapa
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Escolha uma obra já publicada para testar a visualização em giro na página pública.
        </p>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="image-editor-slug">Obra publicada</Label>
            <select
              id="image-editor-slug"
              name="slug"
              required
              defaultValue=""
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>
                Selecione uma obra
              </option>
              {books.map((book) => (
                <option key={book.slug} value={book.slug}>
                  {book.title} {book.hasBackCover ? "(com contracapa)" : "(sem contracapa)"}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="replacementCover">Nova capa (opcional)</Label>
              <Input id="replacementCover" name="replacementCover" type="file" accept="image/png,image/jpeg,image/webp" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="replacementBackCover">Nova contracapa (opcional)</Label>
              <Input
                id="replacementBackCover"
                name="replacementBackCover"
                type="file"
                accept="image/png,image/jpeg,image/webp"
              />
            </div>
          </div>

          {state.status !== "idle" ? (
            <div
              className={
                state.status === "success"
                  ? "rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm"
                  : "rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm"
              }
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 font-medium">
                  {state.status === "success" ? <CheckCircle2 className="size-4" /> : null}
                  {state.message}
                </p>
                {state.slug ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/books/${state.slug}`}>Testar giro</Link>
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="flex justify-end">
            <Button disabled={isPending}>
              <RefreshCw className="size-4" />
              {isPending ? "Atualizando..." : "Atualizar imagens"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
