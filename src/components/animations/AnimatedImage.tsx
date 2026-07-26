import React from "react";

interface AnimatedImageProps {
  children: React.ReactNode;
  className?: string;
  enableHoverEffect?: boolean;
}

export default function AnimatedImage({
  children,
  className = "",
}: AnimatedImageProps) {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
