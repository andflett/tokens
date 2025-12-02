import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        outline: "bg-background text-foreground",
      },
      intent: {
        default:
          "border-primary bg-primary-subdued text-primary-subdued-foreground [&>svg]:text-primary",
        secondary:
          "border-secondary bg-secondary-subdued text-secondary-subdued-foreground [&>svg]:text-secondary",
        destructive:
          "border-destructive bg-destructive-subdued text-destructive-subdued-foreground [&>svg]:text-destructive",
        warning:
          "border-warning bg-warning-subdued text-warning-subdued-foreground [&>svg]:text-warning",
        success:
          "border-success bg-success-subdued text-success-subdued-foreground [&>svg]:text-success",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        intent: "default",
        className:
          "border-primary bg-transparent text-foreground [&>svg]:text-primary",
      },
      {
        variant: "outline",
        intent: "secondary",
        className:
          "border-secondary bg-transparent text-foreground [&>svg]:text-secondary",
      },
      {
        variant: "outline",
        intent: "destructive",
        className:
          "border-destructive bg-transparent text-foreground [&>svg]:text-destructive",
      },
      {
        variant: "outline",
        intent: "warning",
        className:
          "border-warning bg-transparent text-foreground [&>svg]:text-warning",
      },
      {
        variant: "outline",
        intent: "success",
        className:
          "border-success bg-transparent text-foreground [&>svg]:text-success",
      },
    ],
    defaultVariants: {
      variant: "default",
      intent: "default",
    },
  }
);

function Alert({
  className,
  variant,
  intent,
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    icon?: React.ReactNode;
  }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, intent }), className)}
      {...props}
    >
      {icon}
      {children}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
