import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "rounded-md bg-action px-5 py-3 text-action-foreground hover:bg-action-hover",
        ghost: "rounded-md text-foreground hover:bg-header-hover",
        icon: "size-10 rounded-full text-foreground hover:bg-header-hover",
        chip: "rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground",
        "chip-active": "rounded-full border border-primary bg-primary px-4 py-2 text-sm text-primary-foreground",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}