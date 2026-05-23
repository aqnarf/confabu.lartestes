import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BookOpen, UploadCloud } from "lucide-react";

import "./globals.css";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "confabu.lab biblioteca",
  description: "Biblioteca virtual de PDFs ilustrados para infancia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
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
        </div>
      </body>
    </html>
  );
}
