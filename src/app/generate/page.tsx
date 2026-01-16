"use client";

import { TokenGenerator } from "@/components/token-generator";
import { Term } from "@/components/term";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function GeneratorContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as string | undefined;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="py-10">
        <h1 className="text-4xl font-serif tracking-tight mb-6">Token Designer</h1>
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
