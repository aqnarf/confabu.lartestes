import Link from "next/link";

export function LegalLinks({ className }: { className?: string }) {
  return (
    <span className={className}>
      <Link href="/termos" className="font-medium text-primary underline-offset-4 hover:underline">
        Termos de Uso
      </Link>
      {", "}
      <Link href="/privacidade" className="font-medium text-primary underline-offset-4 hover:underline">
        Politica de Privacidade
      </Link>
      {" e "}
      <Link href="/aviso-legal" className="font-medium text-primary underline-offset-4 hover:underline">
        Aviso Legal
      </Link>
    </span>
  );
}
