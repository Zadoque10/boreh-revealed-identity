import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg rounded-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
        // BOREH Custom Variants
        hero: "bg-foreground text-background border-2 border-foreground hover:bg-transparent hover:text-foreground transition-all duration-500 rounded-editorial-lg text-base md:text-lg font-semibold hover:scale-[1.02] hover:shadow-elevated active:scale-[0.98]",
        "hero-outline": "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-500 rounded-editorial-lg text-base md:text-lg font-semibold hover:scale-[1.02] active:scale-[0.98]",
        gold: "bg-gold text-gold-foreground hover:shadow-[0_0_30px_hsl(38_65%_50%/0.4)] transition-all duration-500 uppercase tracking-[0.2em] font-semibold rounded-2xl",
        terracota: "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(15_55%_45%/0.4)] transition-all duration-500 uppercase tracking-[0.2em] font-semibold rounded-2xl",
        minimal: "bg-transparent text-foreground border-b-2 border-foreground rounded-none hover:border-primary hover:text-primary transition-all duration-300 uppercase tracking-[0.15em]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
        hero: "h-14 px-10 py-4",
        "hero-lg": "h-16 px-12 py-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
