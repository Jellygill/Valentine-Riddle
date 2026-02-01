import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "nes-btn font-sans", // Using the utility class defined in CSS
          variant === "primary" && "is-primary",
          variant === "secondary" && "bg-secondary text-secondary-foreground border-black",
          size === "sm" && "text-xs px-4 py-2",
          size === "lg" && "text-xl px-8 py-4",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

PixelButton.displayName = "PixelButton";
