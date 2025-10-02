import { BulkMatrixPreview } from "../../components/bulk/bulk-matrix-preview";
import { Card } from "../../components/ui/card";

export default function BulkPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Bulk ad creation</h1>
        <p className="text-slate-600">
          Generate combinations of creatives, audiences, and placements with macro-driven naming conventions. The live preview
          shows how permutations are expanded before they are handed off to the API.
        </p>
      </header>
      <Card className="p-6">
        <BulkMatrixPreview />
      </Card>
    </div>
  );
}
