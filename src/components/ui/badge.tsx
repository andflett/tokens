import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring-subdued focus-visible:ring-[3px] aria-invalid:ring-destructive-subdued aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      intent: {
        default: "",
        secondary: "",
        destructive: "",
        warning: "",
        success: "",
      },
    },
    compoundVariants: [
      // Default variant with intents
      {
        variant: "default",
        intent: "default",
        className:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary-highlight",
      },
      {
        variant: "default",
        intent: "secondary",
        className:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary-highlight",
      },
      {
        variant: "default",
        intent: "destructive",
        className:
          "bg-destructive text-destructive-foreground [a&]:hover:bg-destructive-highlight focus-visible:ring-destructive-subdued",
      },
      {
        variant: "default",
        intent: "warning",
        className:
          "bg-warning text-warning-foreground [a&]:hover:bg-warning-highlight",
      },
      {
        variant: "default",
        intent: "success",
        className:
          "bg-success text-success-foreground [a&]:hover:bg-success-highlight",
      },
      // Outline variant with intents
      {
        variant: "outline",
        intent: "default",
        className:
          "border-primary text-primary [a&]:hover:bg-primary-subdued [a&]:hover:text-primary-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "secondary",
        className:
          "border-secondary text-secondary [a&]:hover:bg-secondary-subdued [a&]:hover:text-secondary-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "destructive",
        className:
          "border-destructive text-destructive [a&]:hover:bg-destructive-subdued [a&]:hover:text-destructive-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "warning",
        className:
          "border-warning text-warning [a&]:hover:bg-warning-subdued [a&]:hover:text-warning-subdued-foreground",
      },
      {
        variant: "outline",
        intent: "success",
        className:
          "border-success text-success [a&]:hover:bg-success-subdued [a&]:hover:text-success-subdued-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      intent: "default",
    },
  }
);

function Badge({
  className,
  variant,
  intent,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, intent }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
