import type { Metadata } from "next";
import { Sora } from "next/font/google";

import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "confabu.lab biblioteca",
  description: "Biblioteca virtual de PDFs ilustrados para infancia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={sora.variable}>
        {children}
      </body>
    </html>
  );
}
