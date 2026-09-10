import PagePlaceholder from "@/components/layout/PagePlaceholder";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Projeler",
  path: "/projeler",
});

export default function ProjelerPage() {
  return (
    <PagePlaceholder
      title="Projeler"
      description="Referans projelerimiz çok yakında bu sayfada paylaşılacak."
    />
  );
}
