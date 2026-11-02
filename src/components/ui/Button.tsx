import React from "react";
import { DripLink } from "@/components/animorio/drip/DripLink";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  href?: string;
  showArrow?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      showArrow = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-pill tracking-tight transition-all duration-300 ease-editorial select-none relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px] min-w-[44px]";

    const sizeStyles = {
      sm: "text-xs px-5 py-2.5 gap-1.5",
      md: "text-sm px-6 py-3 gap-2",
      lg: "text-base px-8 py-4 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-lime text-ink font-bold hover:bg-lime-soft active:scale-[0.98] shadow-soft-sm hover:shadow-lime-glow",
      accent:
        "bg-lime text-ink font-bold hover:bg-lime-soft active:scale-[0.98] shadow-lime-glow",
      secondary:
        "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper active:scale-[0.98]",
      glass:
        "bg-paper-2/90 text-ink border border-ink/10 hover:bg-paper-2 active:scale-[0.98] shadow-soft-sm",
      ghost:
        "bg-transparent text-ink hover:text-lime-ink active:scale-[0.98] hover:bg-paper-2",
    };

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : null}
        <span className="relative z-10">{children}</span>
        {showArrow && !isLoading && (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-current" />
        )}
      </>
    );

    if (href) {
      return (
        <DripLink
          href={href}
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        >
          {content}
        </DripLink>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          (disabled || isLoading) && "opacity-60 cursor-not-allowed active:scale-100",
          className
        )}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
