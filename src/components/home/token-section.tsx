"use client";

import React from "react";
import { ExamplePrompt } from "../example-prompt";
import { AnimatedTabsList, Tabs } from "../ui/tabs";
import { motion, AnimatePresence } from "motion/react";

function BrowserWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 mx-2">
          <div className=" rounded-md px-0 py-1 text-[10px] text-muted-foreground font-mono text-right">
            token.generator
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 bg-background">{children}</div>
    </div>
  );
}

export function TokenSection({
  id,
  title,
  description,
  visual,
  prompt,
  index,
}: {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  prompt: string;
  /** The index of the section for alternating order */
  index?: number;
}) {
  const [activeTab, setActiveTab] = React.useState<"demo" | "prompt">("demo");
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = React.useState<number>(0);

  // Measure content height on mount and tab change to prevent layout shift
  React.useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setMinHeight((prev) => Math.max(prev, height));
    }
  }, [activeTab]);

  return (
    <section id={id} className="">
      <div className="grid gap-4 md:gap-12 lg:grid-cols-[1fr_1.5fr] items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-serif">{title}</h2>
          <p className="leading-relaxed text-md text-foreground/85">
            {description}
          </p>
        </div>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Tabs for Demo / Prompt */}
            <div className="flex justify-center mb-4">
              <AnimatedTabsList
                value={activeTab}
                onValueChange={setActiveTab}
                items={[
                  { value: "demo", label: "Demo" },
                  { value: "prompt", label: "Prompt" },
                ]}
              />
            </div>

            {/* Animated tab content */}
            <div
              ref={contentRef}
              style={{ minHeight: minHeight > 0 ? `${minHeight}px` : undefined }}
            >
              <AnimatePresence mode="wait">
                {activeTab === "demo" ? (
                  <motion.div
                    key="demo"
                    initial={{ opacity: 0.8, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.8, y: -20 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                  >
                    <BrowserWindow>{visual}</BrowserWindow>
                  </motion.div>
                ) : (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0.8, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.8, y: -20 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                  >
                    <ExamplePrompt prompt={prompt} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
