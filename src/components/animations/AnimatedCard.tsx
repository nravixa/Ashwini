import React from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  index?: number;
  delay?: number;
  onClick?: () => void;
}

export default React.memo(function AnimatedCard({
  children,
  className = "",
  innerClassName = "",
  onClick,
}: AnimatedCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative group ${className} overflow-visible`}
    >
      <div 
        className={`h-full w-full relative z-10 rounded-[inherit] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
});
