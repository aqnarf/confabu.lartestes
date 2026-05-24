import Image from "next/image";

import type { ReaderPage } from "@/lib/books";

export function AccessibleScrollReader({ pages }: { pages: ReaderPage[] }) {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6 py-6">
      {pages.map((page, index) => (
        <article key={page.id} className="overflow-hidden rounded-lg border bg-card shadow-sm">
          <div className="relative aspect-[4/3] bg-muted">
            <Image
              src={page.image.url}
              alt={page.image.altText ?? `Pagina ${page.order}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 760px, 94vw"
            />
          </div>
          <div className="space-y-2 p-5">
            <p className="text-sm font-medium text-primary">Pagina {index + 1}</p>
            <p className="text-lg leading-8">{page.transcript}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
