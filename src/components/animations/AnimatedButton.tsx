import React, { useRef } from "react";
import SmokyButton from "@/components/ui/SmokyButton";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  as?: "button" | "div";
  variant?: "primary" | "secondary" | "none";
}

const AnimatedButton = React.memo(function AnimatedButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  as = "button",
  variant = "none",
}: AnimatedButtonProps) {
  const Component = as as any;
  const extraProps = as === "button" ? { type, disabled } : {};
  
  const buttonRef = useRef<HTMLElement>(null);

  if (variant === "primary") {
    return (
      <SmokyButton
        variant="primary"
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
        as={as}
      >
        {children}
      </SmokyButton>
    );
  }

  let baseClass = "";
  if (variant === "secondary") {
    baseClass = "premium-glass text-white hover:bg-white/10";
  }

  return (
    <Component
      ref={buttonRef as any}
      {...extraProps}
      onClick={onClick}
      className={`font-sans font-medium tracking-wide relative group overflow-hidden rounded-full ${baseClass} ${className} inline-flex items-center justify-center focus:outline-none cursor-pointer border border-white/20 hover:scale-105 active:scale-95 transition-all duration-300`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
});

export default AnimatedButton;
