"use client";

import { useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-2 cursor-pointer rounded-md bg-primary/5 hover:bg-primary/10 text-primary font-medium text-xs transition-all hover:scale-105 active:scale-95"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <ClipboardDocumentCheckIcon className="h-3.5 w-3.5 text-emerald-600" />
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="h-3.5 w-3.5" />
        </>
      )}
    </button>
  );
}
