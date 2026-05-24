import Link from "next/link";
import { BookOpen, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-normal">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen className="size-5" />
            </span>
            <span>confabu.lab</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Acervo</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin">
                <UploadCloud className="size-4" />
                Admin
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t bg-card">
        <div className="container flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>confabu.lab biblioteca</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/termos" className="hover:text-foreground">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-foreground">
              Privacidade
            </Link>
            <Link href="/aviso-legal" className="hover:text-foreground">
              Aviso Legal
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
