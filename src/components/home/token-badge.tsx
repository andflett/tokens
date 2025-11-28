// Floating token badge component with line pointer
export function TokenBadge({
  children,
  className,
  pointer = "bottom",
  style,
  pointerLength = "2rem",
}: {
  children: React.ReactNode;
  className?: string;
  pointer?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties;
  pointerLength?: string;
}) {
  return (
    <div className={`absolute z-10 ${className}`} style={style}>
      <div className="relative border border-purple-300 border-dashed inline-flex items-center rounded-full bg-purple-200 px-3 py-1 text-xs font-mono whitespace-nowrap text-foreground shadow-lg animate-in fade-in zoom-in duration-700">
        {children}
      </div>

      {/* Line pointer with dot */}
      {pointer === "bottom" && (
        <div className="absolute top-full left-1/2 -translate-x-1/2">
          <div
            className="w-px bg-purple-300"
            style={{ height: pointerLength }}
          />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300" />
        </div>
      )}
      {pointer === "top" && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2">
          <div
            className="w-px bg-purple-300"
            style={{ height: pointerLength }}
          />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300" />
        </div>
      )}
      {pointer === "left" && (
        <div className="absolute right-full top-1/2 -translate-y-1/2">
          <div
            className="h-px bg-purple-300 absolute right-0 top-1/2 -translate-y-1/2"
            style={{ width: pointerLength }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-300"
            style={{ right: pointerLength, marginRight: "-3px" }}
          />
        </div>
      )}
      {pointer === "right" && (
        <div className="absolute left-full top-1/2 -translate-y-1/2">
          <div
            className="h-px bg-purple-300 absolute left-0 top-1/2 -translate-y-1/2"
            style={{ width: pointerLength }}
          />
          <div
            className="absolute top-1/2 -translate-y-  1/2 w-1.5 h-1.5 rounded-full bg-purple-500/60"
            style={{ left: pointerLength, marginLeft: "-3px" }}
          />
        </div>
      )}
    </div>
  );
}
