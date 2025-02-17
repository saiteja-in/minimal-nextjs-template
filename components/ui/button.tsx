import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader,type LoaderVariant } from "./ui/loader";
import {type IconVariants } from "./ui/icons";


const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      isLoading: {
        true: "flex gap-2 items-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariant = VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithRef<"button"> &
    ButtonVariant & {
      asChild?: boolean;
    }
>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      asChild,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const loaderVariant =
      variant === undefined || variant === "default" ? "primary" : variant;
    const loaderSize = size === "icon" ? "lg" : size;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, isLoading, className }))}
        disabled={Boolean(isLoading) || disabled}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader
              variant={loaderVariant as LoaderVariant["variant"]}
              size={loaderSize as IconVariants["size"]}
            />
            {size !== "icon" && children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
