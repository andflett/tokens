"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface TokenAnimation {
  name: string;
  value: string;
  delay: number;
  category: "color" | "spacing" | "typography" | "border" | "shadow";
}

const tokens: TokenAnimation[] = [
  { name: "primary", value: "hsl(262 83% 58%)", delay: 0, category: "color" },
  { name: "spacing-4", value: "16px", delay: 200, category: "spacing" },
  {
    name: "text-lg",
    value: "18px",
    delay: 400,
    category: "typography",
  },
  { name: "border-2", value: "2px", delay: 600, category: "border" },
  {
    name: "shadow-md",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    delay: 800,
    category: "shadow",
  },
  { name: "accent", value: "hsl(340 82% 52%)", delay: 1000, category: "color" },
];

const CategoryIcon = ({
  category,
}: {
  category: TokenAnimation["category"];
}) => {
  const icons = {
    color: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    spacing: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8h16M4 16h16"
        />
      </svg>
    ),
    typography: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    ),
    border: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM16 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1h-2a1 1 0 01-1-1V5z"
        />
      </svg>
    ),
    shadow: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  };
  return icons[category];
};

export function TokenShowcasePanel() {
  const [visibleTokens, setVisibleTokens] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timers = tokens.map((token, index) => {
      return setTimeout(() => {
        setVisibleTokens((prev) => prev + 1);
      }, token.delay);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="p-3 space-y-3">
        {/* Token Grid */}
        <div className="grid gap-1.5">
          {tokens.slice(0, visibleTokens).map((token, index) => (
            <div
              key={token.name}
              className="flex items-center justify-between gap-2 p-2 rounded-md bg-card border border-border/50 hover:border-border transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="flex-shrink-0 h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <CategoryIcon category={token.category} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium font-mono truncate">
                    {token.name}
                  </div>
                </div>
              </div>

              {/* Visual preview based on category */}
              <div className="flex-shrink-0">
                {token.category === "color" && (
                  <div
                    className="h-6 w-6 rounded border border-border shadow-sm"
                    style={{ backgroundColor: token.value }}
                  />
                )}
                {token.category === "spacing" && (
                  <div className="flex items-center justify-center h-6 w-6">
                    <div
                      className="bg-primary/20 rounded-sm"
                      style={{
                        width: token.value,
                        height: token.value,
                        maxWidth: "16px",
                        maxHeight: "16px",
                      }}
                    />
                  </div>
                )}
                {token.category === "typography" && (
                  <div className="font-bold text-foreground text-sm">Aa</div>
                )}
                {token.category === "border" && (
                  <div
                    className="h-6 w-6 rounded border-primary"
                    style={{ borderWidth: token.value }}
                  />
                )}
                {token.category === "shadow" && (
                  <div
                    className="h-6 w-6 rounded bg-card"
                    style={{ boxShadow: token.value }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl -z-10" />
    </Card>
  );
}
