"use client";

import { TokenGenerator } from "@/components/token-generator";
import { Term } from "@/components/term";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function GeneratorContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as string | undefined;

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="py-10">
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl font-bold">Token Designer</h1>
        </div>

        <TokenGenerator initialTab={tab} />
      </div>
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={null}>
      <GeneratorContent />
    </Suspense>
  );
}
