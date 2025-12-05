"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CopyButton } from "@/components/home/copy-button";
import { TerminalIcon } from "@/components/animate-ui/icons/terminal";
import { Term } from "@/components/term";
import { cn } from "@/lib/utils";

export function FrameworkDiscoveryPanel({
  darkBg = false,
}: {
  darkBg?: boolean;
}) {
  const prompt =
    "What frontend framework and styling system are you using? Are you using Tailwind CSS and shadcn/ui components?";

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="bg-gradient-to-b from-muted/30 to-muted/10 border-b border-border px-6 py-4">
          <p className="text-base leading-relaxed text-foreground">
            These examples use <Term term="tailwind">Tailwind CSS</Term> and{" "}
            <Term term="shadcn">shadcn/ui</Term>, the defaults for most AI
            generators, like Lovable. Same principles apply to any{" "}
            <Term term="styling-system">styling system</Term>.
          </p>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-3">
            Not sure what jargon <Term term="framework">your AI is using?</Term>{" "}
            Ask it:
          </p>
          <div
            className={cn(
              "relative flex items-start gap-4 backdrop-blur-sm border rounded-lg p-4",
              darkBg
                ? "bg-black border-neutral-800"
                : "bg-card/50 border-border"
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mt-0.5">
                <TerminalIcon size={16} className="text-primary" animate loop />
              </div>
            </div>
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <div
                className={cn(
                  "text-xs leading-relaxed break-words font-mono flex-1",
                  darkBg ? "text-neutral-300" : "text-foreground"
                )}
              >
                {prompt}
              </div>
              <div className="flex-shrink-0">
                <CopyButton text={prompt} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
