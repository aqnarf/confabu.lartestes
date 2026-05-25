import Link from "next/link";

import { PublicHeader } from "@/components/site/public-header";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="public-theme min-h-screen overflow-x-hidden">
      <PublicHeader />
      {children}
      <footer className="border-t bg-background">
        <div className="flex w-full flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
