import Link from "next/link";

import type { LegalDocument } from "@/lib/legal/content";

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <main className="container max-w-3xl py-10">
      <div className="mb-8 space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Documento legal</p>
        <h1 className="text-4xl font-semibold tracking-normal">{document.title}</h1>
        <p className="text-base leading-8 text-muted-foreground">{document.intro}</p>
      </div>

      <div className="space-y-8">
        {document.sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-xl font-semibold tracking-normal">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {section.items ? (
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-lg border bg-card p-5 text-sm text-muted-foreground">
        <p>
          Estes textos foram adaptados dos documentos fornecidos pelo projeto. Antes de publicação definitiva, recomenda-se
          revisão jurídica e preenchimento de dados institucionais finais.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/termos" className="font-medium text-primary">
            Termos de Uso
          </Link>
          <Link href="/privacidade" className="font-medium text-primary">
            Política de Privacidade
          </Link>
          <Link href="/aviso-legal" className="font-medium text-primary">
            Aviso Legal
          </Link>
        </div>
      </div>
    </main>
  );
}
