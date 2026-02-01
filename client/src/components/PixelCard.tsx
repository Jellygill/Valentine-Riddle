import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "pink" | "white";
}

export function PixelCard({ children, className, variant = "default" }: PixelCardProps) {
  return (
    <div className={cn(
      "relative p-6 border-4 border-black",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      variant === "default" && "bg-white",
      variant === "pink" && "bg-primary/20",
      variant === "white" && "bg-white",
      className
    )}>
      {/* Decorative corners to simulate rounded pixel corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-background z-10" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-background z-10" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-background z-10" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-background z-10" />
      
      {/* Inner border for depth */}
      <div className="absolute inset-0 border-2 border-black/10 pointer-events-none m-1" />
      
      {children}
    </div>
  );
}
