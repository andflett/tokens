import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring-subdued focus-visible:ring-[3px] aria-invalid:ring-destructive-subdued aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline",
      },
      intent: {
        default: "",
        secondary: "",
        destructive: "",
        warning: "",
        success: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      // Default variant with intents
      {
        variant: "default",
        intent: "default",
        className:
          "bg-primary text-primary-foreground hover:bg-primary-highlight",
      },
      {
        variant: "default",
        intent: "secondary",
        className:
          "bg-secondary text-secondary-foreground hover:bg-secondary-highlight",
      },
      {
        variant: "default",
        intent: "destructive",
        className:
          "bg-destructive text-destructive-foreground hover:bg-destructive-highlight focus-visible:ring-destructive-subdued",
      },
      {
        variant: "default",
        intent: "warning",
        className:
          "bg-warning text-warning-foreground hover:bg-warning-highlight",
      },
      {
        variant: "default",
        intent: "success",
        className:
          "bg-success text-success-foreground hover:bg-success-highlight",
      },
      // Outline variant with intents
      {
        variant: "outline",
        intent: "default",
        className:
          "border-primary text-primary hover:bg-primary-subdued hover:text-primary-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "secondary",
        className:
          "border-secondary text-secondary hover:bg-secondary-subdued hover:text-secondary-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "destructive",
        className:
          "border-destructive text-destructive hover:bg-destructive-subdued hover:text-destructive-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "warning",
        className:
          "border-warning text-warning hover:bg-warning-subdued hover:text-warning-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "success",
        className:
          "border-success text-success hover:bg-success-subdued hover:text-success-subdued-foreground",
      },
      // Ghost variant with intents
      {
        variant: "ghost",
        intent: "default",
        className:
          "text-primary hover:bg-primary-subdued hover:text-primary-subdued-foreground",
      },
      {
        variant: "ghost",
        intent: "secondary",
        className:
          "text-secondary hover:bg-secondary-subdued hover:text-secondary-subdued-foreground",
      },
      {
        variant: "ghost",
        intent: "destructive",
        className:
          "text-destructive hover:bg-destructive-subdued hover:text-destructive-subdued-foreground",
      },
      {
        variant: "ghost",
        intent: "warning",
        className:
          "text-warning hover:bg-warning-subdued hover:text-warning-subdued-foreground",
      },
      {
        variant: "ghost",
        intent: "success",
        className:
          "text-success hover:bg-success-subdued hover:text-success-subdued-foreground",
      },
      // Link variant with intents
      {
        variant: "link",
        intent: "default",
        className: "text-primary",
      },
      {
        variant: "link",
        intent: "secondary",
        className: "text-secondary",
      },
      {
        variant: "link",
        intent: "destructive",
        className: "text-destructive",
      },
      {
        variant: "link",
        intent: "warning",
        className: "text-warning",
      },
      {
        variant: "link",
        intent: "success",
        className: "text-success",
      },
    ],
    defaultVariants: {
      variant: "default",
      intent: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  intent,
  size,
  loading = false,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, intent, size, className }))}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2Icon className="size-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
