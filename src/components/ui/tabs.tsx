"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

// Animated pill tabs with sliding effect
interface AnimatedTabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List> {
  value?: string;
  items: { value: string; label: React.ReactNode }[];
  onValueChange?: (value: string) => void;
}

function AnimatedTabsList({
  className,
  value,
  items,
  onValueChange,
  ...props
}: AnimatedTabsListProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = React.useState({ left: 0, width: 0 });

  React.useEffect(() => {
    const idx = items.findIndex((item) => item.value === value);
    if (idx !== -1) setActiveIndex(idx);
  }, [value, items]);

  React.useEffect(() => {
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab) {
      setPillStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeIndex]);

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "border shadow-md p-1.5 bg-muted/60 text-muted-foreground relative inline-flex w-fit items-center justify-center rounded-full border-border/70",
        className
      )}
      {...props}
    >
      {/* Animated pill background */}
      <div
        className="cursor-pointer absolute h-8 rounded-full bg-card border border-border/60 shadow-sm transition-all duration-200 ease-out"
        style={{
          left: pillStyle.left,
          width: pillStyle.width,
        }}
      />
      {items.map((item, index) => (
        <button
          key={item.value}
          ref={(el) => {
            tabsRef.current[index] = el;
          }}
          type="button"
          role="tab"
          aria-selected={activeIndex === index}
          data-state={activeIndex === index ? "active" : "inactive"}
          onClick={() => {
            setActiveIndex(index);
            onValueChange?.(item.value);
          }}
          className={cn(
            "cursor-pointer relative z-10 font-medium inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 pr-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
            activeIndex === index
              ? "text-foreground/80"
              : "text-foreground/80 hover:text-foreground"
          )}
        >
          {item.label}
        </button>
      ))}
    </TabsPrimitive.List>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, AnimatedTabsList };
