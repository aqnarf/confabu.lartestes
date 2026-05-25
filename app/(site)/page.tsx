import Image from "next/image";
import Link from "next/link";

import { BookCard } from "@/components/book-card";
import { HeroFloatingCurves } from "@/components/site/hero-floating-curves";
import { listPublishedBooks } from "@/lib/books";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const books = await listPublishedBooks();

  return (
    <main className="bg-background">
      <section className="px-4 py-8" aria-label="Destaque da coleção">
        <div className="relative hidden h-[576px] w-full overflow-visible lg:block">
          <div className="absolute inset-y-4 left-[48.75%] right-0 overflow-hidden rounded-r-[24px]">
            <Image
              src="/assets/figma/home-hero-image.png"
              alt="Ilustração de um galho com uma joaninha sob o céu azul."
              fill
              priority
              className="object-cover"
              sizes="52vw"
            />
            <div className="absolute bottom-4 right-8 flex flex-col items-end text-sm font-semibold leading-5">
              <span className="rounded-xl bg-[#c8b2f2] px-3 py-1 text-[#171026]">Ilustração por</span>
              <span className="rounded-xl bg-[#171026] px-3 py-1 text-[#c8b2f2]">Fulano da Silva</span>
            </div>
            <div className="absolute right-8 top-0 h-[120px] w-20 overflow-hidden border-8 border-white bg-[#171026]">
              <div className="absolute bottom-[-40px] right-[-48px] flex h-[137px] w-[175px] items-center justify-center">
                <div className="-scale-y-100 rotate-180">
                  <Image
                    src="/assets/figma/hero-bookmark-character.svg"
                    alt=""
                    width={175}
                    height={137}
                    className="-scale-x-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <Image
            src="/assets/figma/hero-sleeve.svg"
            alt=""
            width={928}
            height={576}
            priority
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-[65.88%]"
          />
          <HeroFloatingCurves />

          <div className="absolute left-14 top-1/2 flex h-[448px] w-[544px] -translate-y-1/2 flex-col justify-between text-white">
            <Image src="/assets/figma/confabulab-logo.svg" alt="confabu.lab" width={162} height={56} />
            <div className="space-y-4">
              <div className="flex items-center gap-6 text-base leading-6">
                <span>2026.1</span>
                <span className="h-6 w-px bg-white/70" aria-hidden="true" />
                <span className="rounded-xl bg-[#c8b2f2] px-3 py-1 text-sm font-semibold text-[#171026]">
                  Coleção verão
                </span>
              </div>
              <h1 className="text-[88px] font-extrabold leading-[96px] tracking-normal">
                A menina
                <br />
                descabida
              </h1>
              <p className="max-w-[420px] text-base leading-6">
                Uma menina descobre que cada pergunta plantada
                <br />
                no quintal vira uma flor diferente.
              </p>
            </div>
          </div>
        </div>
        <div className="relative min-w-0 overflow-hidden rounded-lg bg-[#35130f] text-white lg:hidden">
          <div className="relative h-64">
            <Image
              src="/assets/figma/home-hero-image.png"
              alt="Ilustração de um galho com uma joaninha sob o céu azul."
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="min-w-0 space-y-5 p-6">
            <Image src="/assets/figma/confabulab-logo.svg" alt="confabu.lab" width={145} height={50} />
            <div className="flex items-center gap-4 text-sm">
              <span>2026.1</span>
              <span className="h-5 w-px bg-white/70" aria-hidden="true" />
              <span className="rounded-xl bg-[#c8b2f2] px-3 py-1 font-semibold text-[#171026]">Coleção verão</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight">
              <span className="block">A menina</span>
              <span className="block">descabida</span>
            </h1>
            <p className="max-w-full text-sm leading-6">Uma menina descobre que cada pergunta plantada no quintal vira uma flor diferente.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f5] px-4 py-8 lg:px-16">
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="max-w-full text-2xl font-semibold leading-8 text-[#18181b] lg:text-[32px] lg:leading-10">Confira as últimas novidades</h2>
            <Link
              href="#acervo"
              className="rounded-2xl border-2 border-[#c8b2f2] bg-white px-4 py-2 text-base font-semibold leading-6 text-[#171026] transition-colors hover:bg-[#c8b2f2]"
            >
              Ver acervo completo
            </Link>
          </div>
          <div id="acervo" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
