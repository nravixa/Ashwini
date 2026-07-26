import React from "react";

interface MouseParallaxProps {
  children: React.ReactNode;
  className?: string;
  factor?: number;
}

export default function MouseParallax({
  children,
  className = "",
}: MouseParallaxProps) {
  return (
    <div
      className={`${className}`}
    >
      {children}
    </div>
  );
}
