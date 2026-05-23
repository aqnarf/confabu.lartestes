import { Search, SlidersHorizontal } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { books } from "@/lib/books";

export default function HomePage() {
  return (
    <main>
      <section className="border-b bg-card">
        <div className="container grid gap-8 py-12 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Biblioteca virtual</p>
            <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">PDFs ilustrados para ler, folhear e compartilhar.</h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Uma nova base para o acervo do confabu.lab, com leitor publico em modo livro e alternativa acessivel em rolagem.
            </p>
          </div>
          <div className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Buscar titulo, autoria ou tema" />
              </div>
              <Button variant="outline" size="icon" aria-label="Abrir filtros">
                <SlidersHorizontal className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">Acervo em destaque</h2>
            <p className="text-sm text-muted-foreground">Estrutura inicial com dados locais para prototipagem.</p>
          </div>
          <Button variant="secondary">Ver categorias</Button>
        </div>
        <div className="shelf-grid grid gap-5">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}
