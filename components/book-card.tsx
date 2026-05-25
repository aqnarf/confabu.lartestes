import Image from "next/image";
import Link from "next/link";

import type { BookRecord as Book } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

export function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  const authors = book.contributors
    .filter((contributor) => contributor.role === "author")
    .map((contributor) => contributor.name)
    .join(", ");

  return (
    <Link
      href={`/books/${book.slug}`}
      className={cn(
        "group flex min-w-0 flex-col overflow-hidden bg-[#f4f4f5] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        compact ? "min-h-[454px]" : "min-h-[456px]",
      )}
    >
      <div className="relative flex h-[360px] items-center justify-center overflow-hidden px-6 py-14">
        <div className="relative size-full">
          <Image
            src={book.assets.cover.url}
            alt={book.assets.cover.altText ?? `Capa de ${book.title}`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.025]"
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 25vw, 90vw"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1 p-6">
        <h2
          className={cn(
            "line-clamp-2 font-semibold text-[#3f3f46]",
            compact ? "text-base leading-6" : "text-[18px] leading-[26px]",
          )}
        >
          {book.title}
        </h2>
        <p className="truncate text-sm leading-5 text-[#52525b]">{authors || "Autoria em revisão"}</p>
      </div>
    </Link>
  );
}
