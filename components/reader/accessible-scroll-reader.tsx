import Image from "next/image";

import type { ReaderPage } from "@/lib/books";

export function AccessibleScrollReader({ pages }: { pages: ReaderPage[] }) {
  return (
    <div className="mx-auto grid w-full max-w-[1312px] gap-8 px-4 py-8 lg:px-0">
      {pages.map((page, index) => (
        <article key={page.id} className="overflow-hidden border border-[#e4e4e7] bg-[#f4f4f5]">
          <div className="relative aspect-[2.16/1] bg-[#f4f4f5]">
            <Image
              src={page.image.url}
              alt={page.image.altText ?? `Página ${page.order}`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1312px, 96vw"
            />
          </div>
          <div className="bg-background p-5">
            <p className="text-sm font-semibold text-[#3f3f46]">Página {index + 1}</p>
            <p className="mt-2 text-base leading-7 text-[#52525b]">{page.transcript}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
