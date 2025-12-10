"use client";

import { useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant={"ghost"}
      intent="secondary"
      onClick={handleCopy}
      className={cn(
        " transition-all",
        copied ? "bg-success-subdued text-success-subdued-foreground" : "",
        className
      )}
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5" />
          <span>Copied!</span>
        </>
      ) : (
        <ClipboardDocumentIcon className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}
