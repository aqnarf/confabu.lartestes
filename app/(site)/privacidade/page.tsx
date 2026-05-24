import { LegalDocumentPage } from "@/components/legal/legal-document";
import { privacyDocument } from "@/lib/legal/content";

export default function PrivacyPage() {
  return <LegalDocumentPage document={privacyDocument} />;
}
