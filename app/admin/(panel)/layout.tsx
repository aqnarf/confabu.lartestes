import Link from "next/link";
import { LibraryBig, LogOut } from "lucide-react";

import { logoutAdminAction } from "@/app/admin/auth-actions";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold tracking-normal">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LibraryBig className="size-5" />
            </span>
            <span>Admin confabu.lab</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Ver site</Link>
            </Button>
            <form action={logoutAdminAction}>
              <Button variant="outline" size="sm">
                <LogOut className="size-4" />
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
