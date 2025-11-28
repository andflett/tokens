import { SparkleIcon } from "lucide-react";
import { CopyButton } from "./copy-button";
import { AnimatedTokenVisual } from "./animated-token-visual";

export function TokenSection({
  id,
  title,
  description,
  visual,
  prompt,
}: {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  prompt: string;
}) {
  return (
    <section id={id} className="py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>

          <div className="space-y-4">
            {/* ChatGPT-style conversation */}
            <div className="rounded-md border bg-card overflow-hidden shadow-lg">
              {/* File header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SparkleIcon className="h-4 w-4" />
                  <span className="font-mono text-xs">Try something like...</span>
                </div>
                <CopyButton text={prompt} />
              </div>
              
              {/* Chat messages */}
              <div className="p-4 space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl bg-neutral-100 px-4 py-2.5 text-foreground/70 text-sm">
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {prompt}
                    </div>
                  </div>
                </div>
                
                {/* AI thinking indicator */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary/60" />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-muted/50">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatedTokenVisual>
          <div className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm">
            {visual}
          </div>
        </AnimatedTokenVisual>
      </div>
    </section>
  );
}
