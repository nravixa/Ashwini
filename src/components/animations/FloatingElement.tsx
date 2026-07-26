import React from "react";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
  delay?: number;
}

export default function FloatingElement({
  children,
  className = "",
}: FloatingElementProps) {
  return (
    <div
      className={`${className}`}
    >
      {children}
    </div>
  );
}
