"use client";

import { TokenGenerator } from "@/components/token-generator";
import { Term } from "@/components/term";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function GeneratorContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as string | undefined;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="py-10">
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
