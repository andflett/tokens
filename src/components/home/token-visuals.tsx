"use client";

import { useState, useEffect } from "react";

export function ColorVisual() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative">
      {/* Stylized page mockup showing color layers */}
      <div className="relative rounded-lg border bg-background p-6 min-h-[300px]">
        {/* Background layer */}
        <div className="space-y-4">
          {/* Card layer */}
          <div className={`relative rounded-lg bg-card border p-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-24 rounded bg-card-foreground/80" />
              <div className="h-8 w-20 rounded bg-primary flex items-center justify-center">
                <div className="h-2 w-12 rounded bg-primary-foreground/90" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-card-foreground/40" />
              <div className="h-2 w-4/5 rounded bg-card-foreground/40" />
            </div>
            
            {/* Popover layer */}
            <div className={`absolute top-2 right-2 rounded-lg bg-popover border shadow-lg p-3 w-40 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-popover-foreground/60" />
                <div className="h-2 w-3/4 rounded bg-popover-foreground/60" />
                <div className="h-2 w-1/2 rounded bg-popover-foreground/60" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating token badges */}
        <div className={`absolute top-4 left-4 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          bg-background
        </div>
        <div className={`absolute top-20 left-8 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          bg-card
        </div>
        <div className={`absolute top-16 right-48 rounded-full bg-background border border-accent/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          bg-popover
        </div>
        <div className={`absolute top-24 right-24 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          bg-primary
        </div>
      </div>
    </div>
  );
}

export function TypographyVisual() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative">
      {/* Stylized page mockup showing typography hierarchy */}
      <div className="relative rounded-lg border bg-card p-6 min-h-[280px]">
        <div className="space-y-4">
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-3xl font-bold">Page Title</div>
          </div>
          <div className={`transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-xl font-semibold">Section Heading</div>
          </div>
          <div className={`space-y-2 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-2 w-full rounded bg-foreground/60" />
            <div className="h-2 w-11/12 rounded bg-foreground/60" />
            <div className="h-2 w-10/12 rounded bg-foreground/60" />
          </div>
          <div className={`text-sm text-muted-foreground transition-all duration-500 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Small caption text
          </div>
        </div>
        
        {/* Floating token badges */}
        <div className={`absolute top-6 -right-2 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          text-3xl font-bold
        </div>
        <div className={`absolute top-20 -right-2 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          text-xl font-semibold
        </div>
        <div className={`absolute bottom-20 -left-2 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          text-base
        </div>
        <div className={`absolute bottom-8 -right-2 rounded-full bg-background border border-accent/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          text-sm text-muted-foreground
        </div>
      </div>
    </div>
  );
}

export function SpacingVisual() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative">
      {/* Stylized page mockup showing spacing */}
      <div className="relative rounded-lg border bg-card p-8 min-h-[280px]">
        <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded bg-primary/20" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 rounded bg-foreground/60" />
              <div className="h-2 w-1/2 rounded bg-foreground/40" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 rounded bg-muted" />
            <div className="h-20 rounded bg-muted" />
          </div>
        </div>
        
        {/* Floating token badges with lines */}
        <div className={`absolute top-6 -left-2 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          p-8
        </div>
        <div className={`absolute top-24 left-1/2 -translate-x-1/2 rounded-full bg-background border border-accent/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          space-y-6
        </div>
        <div className={`absolute top-32 right-1/2 translate-x-1/2 rounded-full bg-background border border-secondary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          gap-4
        </div>
      </div>
    </div>
  );
}

export function LayoutVisual() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative">
      {/* Stylized responsive page mockup */}
      <div className="relative rounded-lg border bg-background p-6 min-h-[280px]">
        <div className="space-y-4">
          {/* Mobile view */}
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-16 rounded bg-muted-foreground/40" />
              <span className="text-[10px] font-mono text-muted-foreground">Mobile</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
            </div>
          </div>
          
          {/* Tablet view */}
          <div className={`transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-20 rounded bg-muted-foreground/40" />
              <span className="text-[10px] font-mono text-muted-foreground">Tablet (md:)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
            </div>
          </div>
          
          {/* Desktop view */}
          <div className={`transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-24 rounded bg-muted-foreground/40" />
              <span className="text-[10px] font-mono text-muted-foreground">Desktop (lg:)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
              <div className="h-12 rounded bg-muted" />
            </div>
          </div>
        </div>
        
        {/* Floating token badges */}
        <div className={`absolute top-8 -right-2 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          grid-cols-1
        </div>
        <div className={`absolute top-1/2 -translate-y-1/2 -right-2 rounded-full bg-background border border-accent/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          md:grid-cols-2
        </div>
        <div className={`absolute bottom-8 -right-2 rounded-full bg-background border border-secondary/30 px-2 py-1 text-[10px] font-mono shadow-md transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          lg:grid-cols-3
        </div>
      </div>
    </div>
  );
}

export function BorderVisual() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative">
      {/* Stylized UI elements showing borders */}
      <div className="relative rounded-lg border bg-card p-6 min-h-[240px]">
        <div className="space-y-4">
          {[
            { width: 'border', label: 'border (1px)' },
            { width: 'border-2', label: 'border-2 (2px)' },
            { width: 'border-4', label: 'border-4 (4px)' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={`h-16 flex-1 rounded ${item.width} border-primary/60`} />
              <div className="rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShadowVisual() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative">
      {/* Stylized cards showing shadow levels */}
      <div className="relative rounded-lg border bg-background p-6 min-h-[280px]">
        <div className="grid grid-cols-3 gap-4 items-center justify-items-center py-8">
          {[
            { name: 'sm', shadow: 'shadow-sm' },
            { name: 'md', shadow: 'shadow-md' },
            { name: 'lg', shadow: 'shadow-lg' },
          ].map((item, i) => (
            <div key={i} className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className={`h-24 w-24 bg-card rounded-lg ${item.shadow} flex items-center justify-center`}>
                <div className="h-8 w-8 rounded bg-primary/20" />
              </div>
              <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background border border-primary/30 px-2 py-1 text-[10px] font-mono shadow-md whitespace-nowrap transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 150 + 100}ms` }}>
                shadow-{item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
