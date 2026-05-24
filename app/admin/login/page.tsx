import { LockKeyhole } from "lucide-react";

import { loginAdminAction } from "@/app/admin/auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="container grid min-h-[calc(100vh-4rem)] place-items-center py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <span className="flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LockKeyhole className="size-5" />
          </span>
          <div>
            <CardTitle>Acesso administrativo</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Entre com as credenciais internas para gerenciar o acervo.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form action={loginAdminAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Login</Label>
              <Input id="username" name="username" autoComplete="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{getErrorMessage(error)}</p> : null}
            <Button className="w-full">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

function getErrorMessage(error: string) {
  if (error === "missing-config") {
    return "Credenciais do admin ainda nao foram configuradas no ambiente.";
  }

  return "Login ou senha invalidos.";
}
