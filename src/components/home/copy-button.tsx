"use client";

import { useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      intent="secondary"
      variant="ghost"
      onClick={handleCopy}
      className=""
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <ClipboardDocumentCheckIcon className="h-3.5 w-3.5" />
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="h-3.5 w-3.5" />
        </>
      )}
    </Button>
  );
}
