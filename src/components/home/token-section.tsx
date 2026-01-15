"use client";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ExamplePrompt } from "../example-prompt";

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
  generateTab,
  index,
}: {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  prompt: string;
  /** The tab name to link to on the generate page */
  generateTab?: string;
  /** The index of the section for alternating order */
  index?: number;
}) {
  const tabLink = generateTab || id;
  const isReversed = typeof index === "number" && index % 2 === 1;
  const gridCols = isReversed
    ? "lg:grid-cols-[1fr_1.5fr]"
    : "lg:grid-cols-[1.5fr_1fr]";

  return (
    <section id={id} className="">
      <div className={`grid gap-4 md:gap-12 ${gridCols} items-start`}>
        <div className={`space-y-4 p-4 ${isReversed ? "lg:order-2" : ""}`}>
          <h2 className="text-3xl font-serif">{title}</h2>
          <p className="leading-relaxed text-md text-foreground/85">
            {description}
          </p>

          <ExamplePrompt prompt={prompt} className="mt-2" />
        </div>

        <div className={`${isReversed ? "lg:order-1" : ""}`}>
          <BrowserWindow>{visual}</BrowserWindow>
        </div>
      </div>
    </section>
  );
}
