import { Suspense } from "react";
import { EditorContent } from "./editor-content";

function LoadingEditor() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
    </div>
  );
}

export default function PortfolioEditorPage() {
  return (
    <Suspense fallback={<LoadingEditor />}>
      <EditorContent />
    </Suspense>
  );
}
