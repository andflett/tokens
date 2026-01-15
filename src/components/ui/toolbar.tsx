"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export interface ToolbarItem {
  value: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface ResponsiveToolbarProps {
  /** Currently active item value (for tabs) */
  value?: string;
  /** Callback when an item is clicked (for tabs) */
  onValueChange?: (value: string) => void;
  /** Tab items (left side) */
  tabs?: ToolbarItem[];
  /** Action items (right side) */
  actions?: ToolbarItem[];
  /** Additional CSS classes */
  className?: string;
  /** Number of visible tabs on mobile before overflow (default: 3) */
  mobileVisibleTabs?: number;
}

/**
 * ResponsiveToolbar - A unified toolbar that combines tabs and actions
 * 
 * Features:
 * - Desktop: tabs on left, actions on right, all styled consistently
 * - Mobile: tabs with text labels, overflow items move to "More" dropdown
 * - Full keyboard navigation with Radix dropdown
 * - Accessible with proper ARIA attributes
 */
const CONTAINER_PADDING = 6; // px value matching p-1.5 (6px) in container

export function ResponsiveToolbar({
  value,
  onValueChange,
  tabs = [],
  actions = [],
  className,
  mobileVisibleTabs = 3,
}: ResponsiveToolbarProps) {
  const [activeIndex, setActiveIndex] = React.useState(() => {
    const idx = tabs.findIndex((item) => item.value === value);
    return idx !== -1 ? idx : 0;
  });
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = React.useState({ left: 0, width: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [overflowTabIndices, setOverflowTabIndices] = React.useState<number[]>([]);

  // Find active tab index
  React.useEffect(() => {
    const idx = tabs.findIndex((item) => item.value === value);
    if (idx !== -1) setActiveIndex(idx);
  }, [value, tabs]);

  // Update pill position for animated background on desktop
  React.useEffect(() => {
    const updatePillPosition = () => {
      const activeTab = tabsRef.current[activeIndex];
      if (activeTab && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        setPillStyle({
          left: tabRect.left - containerRect.left - CONTAINER_PADDING,
          width: tabRect.width,
        });
      }
    };

    updatePillPosition();
    
    // Update on resize
    window.addEventListener("resize", updatePillPosition);
    return () => window.removeEventListener("resize", updatePillPosition);
  }, [activeIndex, tabs]);

  // Calculate which tabs should overflow on mobile
  React.useEffect(() => {
    const overflowIndices = tabs
      .slice(mobileVisibleTabs)
      .map((_, idx) => idx + mobileVisibleTabs);
    setOverflowTabIndices(overflowIndices);
  }, [tabs, mobileVisibleTabs]);

  const handleTabClick = (item: ToolbarItem, index: number) => {
    setActiveIndex(index);
    onValueChange?.(item.value);
    item.onClick?.();
  };

  const handleActionClick = (item: ToolbarItem) => {
    item.onClick?.();
  };

  // Visible tabs on mobile (first N tabs)
  const visibleTabs = tabs.slice(0, mobileVisibleTabs);
  const overflowTabs = tabs.slice(mobileVisibleTabs);
  const hasOverflow = overflowTabs.length > 0 || actions.length > 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        "border border-border/50 dark:border-border dark:shadow-none p-1.5 bg-card text-muted-foreground relative flex w-full items-center justify-between rounded-xl",
        className
      )}
      role="toolbar"
      aria-label="Token designer toolbar"
    >
      {/* Left side: Tabs */}
      <div className="relative flex items-center">
        {/* Animated pill background - desktop only */}
        <div
          className="hidden md:block absolute h-8 rounded-lg bg-primary-subdued transition-all duration-200 ease-out pointer-events-none"
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
          }}
          aria-hidden="true"
        />

        {/* Tab buttons */}
        {tabs.map((item, index) => {
          const isActive = activeIndex === index;
          const isOverflow = overflowTabIndices.includes(index);

          return (
            <button
              key={item.value}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={item.ariaLabel || item.label}
              data-state={isActive ? "active" : "inactive"}
              onClick={() => handleTabClick(item, index)}
              className={cn(
                "cursor-pointer relative z-10 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                isActive
                  ? "text-primary-subdued-foreground"
                  : "text-foreground/80 hover:text-foreground",
                // Hide overflow tabs on mobile
                isOverflow && "hidden md:inline-flex",
                // Show only icons on mobile for visible tabs
                "md:gap-1.5"
              )}
            >
              <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right side: Actions and More dropdown */}
      <div className="flex items-center gap-1">
        {/* Action buttons - hidden on mobile, shown in dropdown */}
        {actions.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => handleActionClick(item)}
            aria-label={item.ariaLabel || item.label}
            className={cn(
              "hidden md:inline-flex cursor-pointer relative z-10 h-8 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
              "text-foreground/80 hover:text-foreground hover:bg-primary-subdued/50"
            )}
          >
            <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        {/* More dropdown - shows on mobile or when there are actions */}
        {hasOverflow && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More options"
                className={cn(
                  "cursor-pointer relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                  "text-foreground/80 hover:text-foreground hover:bg-primary-subdued/50"
                )}
              >
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              {/* Overflow tabs on mobile */}
              {overflowTabs.length > 0 && (
                <>
                  {overflowTabs.map((item, idx) => {
                    const originalIndex = idx + mobileVisibleTabs;
                    const isActive = activeIndex === originalIndex;
                    return (
                      <DropdownMenuItem
                        key={item.value}
                        onClick={() => handleTabClick(item, originalIndex)}
                        className={cn(
                          "flex items-center gap-2 md:hidden",
                          isActive && "bg-primary-subdued text-primary-subdued-foreground"
                        )}
                      >
                        <span className="[&_svg]:size-4">{item.icon}</span>
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                  {/* Separator between tabs and actions on mobile */}
                  {actions.length > 0 && (
                    <DropdownMenuSeparator className="md:hidden" />
                  )}
                </>
              )}

              {/* All actions in dropdown on mobile, desktop if present */}
              {actions.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => handleActionClick(item)}
                  className="flex items-center gap-2"
                >
                  <span className="[&_svg]:size-4">{item.icon}</span>
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
