import { LegalDocumentPage } from "@/components/legal/legal-document";
import { termsDocument } from "@/lib/legal/content";

export default function TermsPage() {
  return <LegalDocumentPage document={termsDocument} />;
}
