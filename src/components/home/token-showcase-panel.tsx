"use client";

import { useState, useEffect, useRef } from "react";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import {
  SquareDashedTopSolid,
  SquareRoundCorner,
  SwatchBookIcon,
  TextInitial,
} from "lucide-react";

const tokenCategories = [
  { value: "colors", label: "Colors", icon: SwatchBookIcon },
  { value: "typography", label: "Typography", icon: TextInitial },
  { value: "space", label: "Space", icon: ArrowsPointingOutIcon },
  { value: "radius", label: "Radius", icon: SquareRoundCorner },
  { value: "shadows", label: "Shadows", icon: Square3Stack3DIcon },
  { value: "borders", label: "Borders", icon: SquareDashedTopSolid },
];

export function TokenShowcasePanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // Auto-cycle through items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tokenCategories.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Update pill position for grid
  useEffect(() => {
    const activeItem = itemsRef.current[activeIndex];
    if (activeItem) {
      setPillStyle({
        top: activeItem.offsetTop,
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
        height: activeItem.offsetHeight,
      });
    }
  }, [activeIndex]);

  return (
    <div className="p-1.5 relative">
      {/* Animated pill background */}
      <div
        className="absolute rounded-lg bg-primary-subdued transition-all duration-200 ease-out"
        style={{
          top: pillStyle.top,
          left: pillStyle.left,
          width: pillStyle.width,
          height: pillStyle.height,
        }}
      />

      {/* Items in grid */}
      <div className="relative z-10 grid grid-cols-2 grid-rows-3 gap-1">
        {tokenCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={category.value}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors",
                activeIndex === index
                  ? "text-primary-subdued-foreground"
                  : "text-foreground"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap">
                {category.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
