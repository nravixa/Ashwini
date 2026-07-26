import React from "react";

interface AnimatedIconProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedIcon({
  children,
  className = "",
}: AnimatedIconProps) {
  return (
    <span
      className={`inline-block ${className}`}
    >
      {children}
    </span>
  );
}
