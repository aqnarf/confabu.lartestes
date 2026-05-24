import { LegalDocumentPage } from "@/components/legal/legal-document";
import { legalNoticeDocument } from "@/lib/legal/content";

export default function LegalNoticePage() {
  return <LegalDocumentPage document={legalNoticeDocument} />;
}
